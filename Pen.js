var pen;

pen = (function() {
  var atribs, dir, error, evs, funcoso, log, vrs;
  vrs = {};
  vrs.type = (function() {
    var class2Type, i, len, name, ref;
    class2Type = {};
    ref = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split(/\s+/gi);
    for (i = 0, len = ref.length; i < len; i++) {
      name = ref[i];
      class2Type[`[object ${name}]`] = name.toLowerCase();
    }
    return function(obj) {
      var strType;
      strType = Object.prototype.toString.call(obj);
      return class2Type[strType] || 'object';
    };
  })();
  vrs.parser = function(regs, flags, num1, num2) {
    var resg;
    if (flags == null) {
      flags = 'gi';
    }
    if (num1 == null) {
      num1 = 1;
    }
    if (num2 == null) {
      num2 = 2;
    }
    if (vrs.type(regs) === 'string') {
      resg = regs;
      regs = new RegExp(regs, flags);
    }
    return (str) => {
      var i, len, match, retsi, returns;
      if (str != null) {
        returns = str.match(regs);
        retsi = {};
        for (i = 0, len = returns.length; i < len; i++) {
          match = returns[i];
          match.trim().replace(regs, function(...args) {
            if (vrs.type(resg) === 'string') {
              retsi[args[num1]] = args[num2];
            } else {
              retsi[args[flags]] = args[num1];
            }
          });
        }
        return retsi;
      } else {
        return null;
      }
    };
  };
  vrs.empty = (obj) => {
    if (obj == null) {
      return true;
    } else {
      return false;
    }
  };
  ({log, error, dir} = console);
  vrs.log = log;
  vrs.error = error;
  vrs.dir = dir;
  document.addEventListener("DOMContentLoaded", function(ev) {
    window['body'] = document.body;
    return window['head'] = document.head;
  });
  vrs.detectAndReturn = function(ting, ev) {
    if (ev.hasAttribute(ting) === true) {
      return ev.getAttribute(ting);
    }
  };
  vrs.def = (prop, str, it, ops) => {
    var app, parse;
    if (ops != null) {
      app = ops.app != null ? ops.app : false;
      parse = ops.parse != null ? ops.parse : false;
    } else {
      app = it.options.global.html.app != null ? it.options.global.html.app : false;
      parse = it.options.global.html.parse != null ? it.options.global.html.parse : false;
    }
    it.text = str;
    if (str != null) {
      if (app === true) {
        it.element[prop] += str;
      } else {
        it.element[prop] = str;
      }
      return it;
    } else {
      return it.element[prop];
    }
  };
  pen = function(element, options) {
    var prop;
    if (!(this instanceof pen)) {
      return new pen(element, options);
    }
    this.events = {};
    this.attributes = {};
    this.style = {};
    this.options = {
      autoAttach: false,
      autoAttachTo: window['body'],
      global: {
        parseIt: false,
        create: {
          retneh: 'return child'
        },
        html: {
          app: false,
          parse: false
        }
      }
    };
    this.element = this.el = element;
    if (element instanceof Document) {
      this.body = element.body;
      this.head = element.head;
      pen.prototype.ready = function(cb, cp) {
        var it;
        it = this;
        it.on('DOMContentLoaded', cb, cp);
        return it;
      };
    } else if (element instanceof pen) {
      for (prop in element) {
        this[prop] = element[prop];
      }
    } else {
      this.setup(element);
    }
    if (this.options.autoAttach === true) {
      this.options.autoAttachTo.append(element);
    }
  };
  pen.ink = pen.prototype = {};
  pen.prototype.toString = () => {
    return this.el.outerHTML;
  };
  pen.define = function(...toDefs) {
    var cps, i, len, toDef;
    cps = {'type': 'type', 'parser': 'parser', 'empty': 'empty', 'log': 'log', 'error': 'error', 'dir': 'dir'};
    for (i = 0, len = toDefs.length; i < len; i++) {
      toDef = toDefs[i];
      if (cps[toDef] === toDef) {
        window[toDef] = vrs[toDef];
      }
    }
  };
  pen.$ = function(element, parseIt) {
    if (parseIt == null) {
      parseIt = false;
    }
    if (parseIt === true) {
      return pen(document.querySelector(element));
    } else {
      return document.querySelector(element);
    }
  };
  pen.$$ = function(element) {
    return document.querySelectorAll(element);
  };
  pen.crt = function(element, parseIt) {
    if (parseIt == null) {
      parseIt = false;
    }
    if (parseIt === true) {
      return pen(document.createElement(element));
    } else {
      return document.createElement(element);
    }
  };
  pen.prototype.setup = function(el) {
    var attribute, ev, prop, reu, soc, tag;
    this.text = null;
    tag = /<([^\n]*?)>/gi;
    attribute = /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi;
    if (vrs.type(el) === 'string') {
      if (tag.test(el) === true) {
        el = el.replace(/<|>/gi, '');
        soc = attribute.test(el);
        if (soc === true) {
          reu = pen.parseAttributes(el);
          el = el.replace(attribute, '').trim();
        }
        ev = pen.crt(el);
        if (soc === true) {
          for (prop in reu) {
            ev.setAttribute(prop, reu[prop]);
            this.attributes[prop] = reu[prop];
          }
        }
      } else {
        ev = pen.$(el);
      }
    } else {
      ev = el;
    }
    this.element = this.el = ev;
    this.tag = ev.tagName != null ? ev.tagName.toLowerCase() : 'ios-element';
    this.partialSetup(ev);
    return ev;
  };
  pen.prototype.partialSetup = function(ev) {
    var attr, attrs, str, sty, stys;
    this.Id = vrs.detectAndReturn('id', ev);
    this.Class = vrs.detectAndReturn('class', ev);
    this.Children = this.tag === 'template' ? ev.content.children : ev.children;
    this.Parent = ev.parentNode != null ? ev.parentNode : null;
    str = ev.outerHTML;
    attrs = pen.parseAttributes(str);
    stys = pen.parseCss(attrs != null ? attrs.style : void 0);
    for (sty in stys) {
      this.style[sty] = stys[sty];
    }
    for (attr in attrs) {
      this.attributes[attr] = attrs[attr];
    }
    this.inits();
    switch (this.tag) {
      case 'template':
        this.content = ev.content;
        pen.prototype.clone = function() {
          var args;
          args = Array.prototype.slice.call(arguments);
          return document.importNode([...args]);
        };
        break;
      case 'canvas':
        this.ctx = this.context = this.element.getContext('2d');
    }
  };
  pen.parseAttributes = vrs.parser(/([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi, 1, 3);
  pen.parseCss = vrs.parser(/([^\n\ ;:]*?):([^\n]*?);/gi, 1, 2);
  pen.prototype.initLocalName = function() {
    var it2, res1, res2, str;
    it2 = this;
    res1 = it2.Id != null ? `#${it2.Id}` : '';
    res2 = it2.Class != null ? `.${Array.prototype.slice.call(it2.element.classList).join('.')}` : '';
    str = `${it2.tag}${res1}${res2}`;
    this.localName = str;
    return str;
  };
  pen.prototype.initClases = function() {
    var it2, res;
    it2 = this;
    res = Array.prototype.slice.call(it2.element.classList);
    this.Classes = res;
    return res;
  };
  pen.prototype.inits = function() {
    this.initLocalName();
    this.initClases();
    return this;
  };
  pen.prototype.selfInstance = function(obj, cb) {
    if (obj instanceof pen) {
      cb(obj, this);
    }
    return this;
  };
  pen.prototype.html = function(str, ops) {
    var app, parse;
    if (ops != null) {
      app = ops.app != null ? ops.app : false;
      parse = ops.parse != null ? ops.parse : false;
    } else {
      app = this.options.global.html.app != null ? this.options.global.html.app : false;
      parse = this.options.global.html.parse != null ? this.options.global.html.parse : false;
    }
    switch (this.tag) {
      case 'input':
      case 'textarea':
        return vrs.def('value', str, this, ops);
      case 'option':
        def('value', str, this, ops);
        return vrs.def('innerText', str, this, ops);
      case 'template':
        log("Please use pen.append");
        return;
      default:
        return vrs.def((parse === true ? 'innerHTML' : 'innerText'), str, this, ops);
    }
  };
  funcoso = function(it, typeso, typesi) {
    var chk1, funcso;
    if (typesi == null) {
      typesi = typeso;
    }
    chk1 = function(whl, propz, prop) {
      if (vrs.type(it.element[typesi]) === 'function') {
        it.element[typesi](whl, propz[prop]);
      } else {
        it.element[typesi][whl] = propz[prop];
      }
    };
    funcso = function(propz, nm) {
      var prop;
      for (prop in propz) {
        if (vrs.type(propz[prop]) === 'object') {
          funcso(propz[prop], prop);
        } else {
          if (nm != null) {
            it[typeso][`${nm}-${prop}`] = propz[prop];
            chk1(`${nm}-${prop}`, propz, prop);
          } else {
            it[typeso][prop] = propz[prop];
            chk1(prop, propz, prop);
          }
        }
      }
      return it;
    };
    return funcso;
  };
  pen.prototype.attr = function(attribute, value) {
    var attr, attrs, func, res, rescls, resid, vl;
    func = funcoso(this, 'attributes', 'setAttribute');
    res = attribute === 'id' ? 'id' : attribute === 'class' ? 'class' : void 0;
    vl = (value != null) && attribute === ('id' || 'class') ? value : void 0;
    if (attribute != null) {
      if (vrs.type(attribute) === 'object') {
        resid = attribute != null ? attribute.id : void 0;
        rescls = attribute != null ? attribute.class : void 0;
        this.Id = resid;
        this.Class = rescls;
        this.attributes['class'] = rescls;
        this.attributes['id'] = resid;
        return func(attribute);
      } else if (value != null) {
        this[res] = vl;
        this.element.setAttribute(attribute, value);
        this.attributes[attribute] = value;
        this.inits();
        return this;
      } else if (vrs.type(attribute) === 'string') {
        attrs = this.parseAttributes(attribute);
        for (attr in attrs) {
          this[res] = (attrs[attr] != null) && attr === ('id' || 'class') ? attrs[attr] : void 0;
          this.element.setAttribute(attr, attrs[attr]);
          this.attributes[attr] = attrs[attr];
        }
        this.inits();
        return this;
      } else {
        this.inits();
        return this.element.getAttribute(attribute);
      }
    } else {
      return this.attributes;
    }
  };
  pen.prototype.css = function(rule, rules) {
    var func, st, style, styles;
    func = funcoso(this, 'style');
    if (rule != null) {
      switch (vrs.type(rule)) {
        case 'object':
          return func(rule);
        case 'string':
          styles = this.parseCss(rule);
          for (style in styles) {
            st = styles[style];
            this.style[style] = st;
            this.element.style[style] = st;
          }
          return this;
        default:
          return this.element.style[rule];
      }
    } else {
      return this.style;
    }
  };
  pen.prototype.on = function(evtp, cb, cp) {
    var typeEvent;
    if (cp == null) {
      cp = false;
    }
    this.events[evtp] = {};
    this.events[evtp].capture = cp;
    typeEvent = this.el.addEventListener != null ? 'addEventListener' : this.el.attachEvent != null ? 'attachEvent' : `on${evtp}`;
    switch (typeEvent) {
      case 'addEventListener':
        this.el[typeEvent](evtp, cb, cp);
        break;
      case 'attachEvent':
        this.el[typeEvent](evtp, cb);
        break;
      default:
        this.el[typeEvent] = cb;
    }
    return this;
  };
  pen.prototype.off = function(evtp, cb) {
    var typeEvent;
    typeEvent = this.el.addEventListener != null ? 'removeEventListener' : this.el.attachEvent != null ? 'detachEvent' : `on${evtp}`;
    switch (typeEvent) {
      case 'removeEventListener':
        this.el[typeEvent](evtp, cb);
        break;
      case 'detachEvent':
        this.el[typeEvent](evtp, cb);
        break;
      default:
        this.el[typeEvent] = cb;
    }
    delete this.events[evtp];
    return this;
  };
  pen.prototype.is = (tag) => {
    return this.tag === tag;
  };
  pen.prototype.append = function(...elements) {
    var element, elu, i, len;
    for (i = 0, len = elements.length; i < len; i++) {
      element = elements[i];
      if (vrs.type(element) === 'string') {
        element = pen.$(element);
      }
      this.selfInstance(element, function(emt, it) {
        emt.Parent = it.element;
      });
      elu = (element instanceof pen ? element.el : element);
      if (this.tag === 'template') {
        this.element.content.appendChild(elu);
      } else {
        this.element.appendChild(elu);
      }
    }
    return this;
  };
  pen.prototype.appendTo = function(element) {
    if (vrs.type(element) === 'string') {
      element = pen.$(element);
    }
    pen(element).append(this.element);
    return this;
  };
  pen.prototype.remove = function() {
    var check;
    check = this.Parent != null ? 'Parent' : this.element.parentNode != null ? 'parentNode' : null;
    if (check != null) {
      this[check].removeChild(this.element);
      this.Parent = null;
    } else {
      log(`Pen-remove-error: There's no parent to remove child: ${this.localName} from`);
    }
    return this;
  };
  pen.prototype.$ = function(element, parseIt) {
    var result;
    result = this.tag === 'template' ? this.element.content : this.element;
    if (this.options.global.parseIt === true || parseIt === true) {
      return pen(result.querySelector(element));
    } else {
      return result.querySelector(element);
    }
  };
  pen.prototype.$$ = function(element) {
    var result;
    result = this.tag === 'template' ? this.element.content : this.element;
    return result.querySelectorAll(element);
  };
  pen.prototype.create = pen.prototype.createElement = function(element, ret) {
    var result;
    element = pen(`<${element}>`);
    this.append(element);
    if (/child|parent/gi.test(ret) === true) {
      result = `return ${ret}`;
      if (result.endsWith("parent") === true) {
        return this;
      } else {
        return element;
      }
    } else {

    }
  };
  pen.prototype.toggle = function(...classes) {
    var classs, i, len;
    for (i = 0, len = classes.length; i < len; i++) {
      classs = classes[i];
      this.element.classList.toggle(classs);
    }
    return this;
  };
  atribs = 'id class href src contentEditable charset title rows cols'.split(/\s+/);
  evs = 'click keyup keypress keydown mouse mouseup mouseover mousedown mouseout contextmenu dblclick'.split(/\s+/);
  evs.forEach(function(evp) {
    pen.prototype[evp] = function(cb, cp) {
      if (this.events[evp] == null) {
        return this.on(evp, cb, cp);
      } else {
        return this.off(evp, cb, cp);
      }
    };
  });
  atribs.forEach(function(atrib) {
    pen.prototype[atrib] = function(str) {
      if (str != null) {
        return this.attr(atrib, str);
      } else {
        return this.attr(atrib);
      }
    };
  });
  return pen;
})();
