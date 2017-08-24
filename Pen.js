var pen;

pen = (function() {
  var atrib, atribs, dir, error, evp, evps, funcoso, i, j, len, len1, log, vrs;
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
        if (returns != null) {
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
    this.setupOptions(options);
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
    } else if (element instanceof Window) {
      this.document = element.document;
    } else if (element instanceof pen) {
      for (prop in element) {
        this[prop] = element[prop];
      }
    } else if (vrs.type(element) === 'string') {
      if (element.startsWith("define") === true) {
        return this.define(element);
      } else {
        this.setup(element);
      }
    }
    if (this.options.autoAttach === true) {
      this.options.autoAttachTo.append(element);
    }
  };
  pen.ink = pen.prototype = {};
  pen.prototype.setupOptions = function(options) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    this.options = {};
    this.options.global = {};
    this.options.global.create = {};
    this.options.global.html = {};
    if (options != null) {
      this.options.autoAttach = ((options != null ? options.autoAttach : void 0) != null ? options.autoAttach : false);
      this.options.autoAttachTo = ((options != null ? options.autoAttachTo : void 0) != null ? options.autoAttachTo : window['body']);
      if ((options != null ? options.global : void 0) != null) {
        this.options.global.parseIt = ((options != null ? (ref = options.global) != null ? ref.parseIt : void 0 : void 0) != null ? options.global.parseIt : false);
        if (options != null ? (ref1 = options.global) != null ? ref1.create : void 0 : void 0) {
          this.options.global.create.retneh = ((options != null ? (ref2 = options.global) != null ? (ref3 = ref2.create) != null ? ref3.retneh : void 0 : void 0 : void 0) != null ? options.global.create.retneh : 'return child');
        }
        if ((options != null ? (ref4 = options.global) != null ? ref4.html : void 0 : void 0) != null) {
          this.options.global.html.app = ((options != null ? (ref5 = options.global) != null ? (ref6 = ref5.html) != null ? ref6.app : void 0 : void 0 : void 0) ? options.global.html.app : false);
          this.options.global.html.parse = ((options != null ? (ref7 = options.global.html) != null ? ref7.parse : void 0 : void 0) ? options.global.html.parse : false);
        }
      } else {
        this.options.global.parseIt = false;
        this.options.global.create.retneh = 'return child';
        this.options.global.html.app = false;
        this.options.global.html.parse = false;
      }
    } else {
      this.options.autoAttach = false;
      this.options.autoAttachTo = window['body'];
      this.options.global.parseIt = false;
      this.options.global.create.retneh = 'return child';
      this.options.global.html.app = false;
      this.options.global.html.parse = false;
    }
  };
  pen.prototype.toString = () => {
    return this.el.outerHTML;
  };
  pen.prototype.define = function(toDef) {
    var func, gr, oname, t;
    gr = /define\s*([^\n\ ]+)\s*as\s*([^\n\ ,]+)(\s*(?:global|local)ly)?/i;
    if (gr.test(toDef) === true) {
      [func, oname, t] = gr.exec(toDef).slice(1, 4);
      if (t != null) {
        t = t.trim();
        if (t === 'locally') {
          return vrs[func];
        } else {
          window[oname] = vrs[func];
        }
      } else {
        window[oname] = vrs[func];
      }
    }
    return void 0;
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
    var attribute, ev, innerText, prop, reu, soc, tag, tut, txt;
    this.events = {};
    this.hidden = false;
    this.attributes = {};
    this.style = {};
    this.text = this.el.innerText !== "" ? this.el.innerText : null;
    tag = /<([^\n]*?)>/gi;
    attribute = /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi;
    innerText = />([\S\s]*?)</gi;
    if (vrs.type(el) === 'string') {
      if (tag.test(el) === true) {
        txt = innerText.test(el);
        if (txt === true) {
          tut = el.replace(/<([^\n]*?)>([\S\s]*?)<\/([^\n]*?)>/gi, '$2');
          el = el.replace(/<([^\n]*?)>([\S\s]*?)<\/([^\n]*?)>/gi, '$1');
        }
        el = el.replace(tag, '$1');
        soc = attribute.test(el);
        el = el.replace(/\//gi, '');
        if (soc === true) {
          reu = pen.parseAttributes(el);
          el = el.replace(attribute, '').trim();
        }
        ev = pen.crt(el);
      } else {
        ev = pen.$(el);
      }
    } else {
      ev = el;
    }
    this.element = this.el = ev;
    if (soc === true) {
      for (prop in reu) {
        this.attr(prop, reu[prop]);
      }
    }
    if (txt === true && (tut != null)) {
      this.html(tut, {
        parse: true
      });
    }
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
  pen.parseCss = vrs.parser(/([^\n;: ]+):([^\n]+);/gi, 1, 2);
  pen.prototype.initLocalName = function() {
    var atr, it2, res1, res2, res3, str;
    it2 = this;
    res1 = it2.Id != null ? `#${it2.Id}` : '';
    res2 = it2.Class != null ? `.${Array.prototype.slice.call(it2.element.classList).join('.')}` : '';
    res3 = [];
    if (Object.keys(this.attributes).length === 0 && this.attributes.constructor === Object) {
      res3 = "";
    } else {
      for (atr in this.attributes) {
        if (/id|style|class/.test(atr) !== true) {
          res3.push(`${atr}=\"${this.attributes[atr]}\"`);
        }
      }
      res3 = `[${res3.join(' ')}]`;
    }
    str = `${it2.tag}${res1}${res2}${(res3.length === 0 && (res3[0] == null) ? "" : res3)}`;
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
      } else if (vrs.type(attribute) === 'string' && (value == null)) {
        attrs = pen.parseAttributes(attribute);
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
          if (rules != null) {
            rule = rule.replace(/-(\w{1})/g, (whole, dash) => {
              return dash.toUpperCase();
            });
            this.style[rule] = rules;
            this.element.style[rule] = rules;
            return this;
          } else {
            styles = pen.parseCss(rule);
            for (style in styles) {
              st = styles[style];
              this.style[style] = st;
              this.element.style[style] = st;
            }
            return this;
          }
          break;
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
    if (this.events == null) {
      this.events = {};
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
        this.el[typeEvent] = null;
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
  pen.prototype.hasClass = function(cls) {
    var clss, i, len, ref;
    this.initClases();
    ref = this.Classes;
    for (i = 0, len = ref.length; i < len; i++) {
      clss = ref[i];
      if (clss === cls) {
        return true;
      }
    }
    return false;
  };
  pen.add = function(typ, func, name) {
    var funcName, ret;
    switch (typ) {
      case 'addon':
        func(pen);
        break;
      case 'function':
      case 'func':
      case 'def':
      case 'funco':
        if (vrs.type(func) === 'object') {
          for (funcName in func) {
            pen.prototype[funcName] = func[funcName];
          }
        } else {
          ret = func(pen);
          if (vrs.type(ret) !== 'function') {
            vrs.log(`Pen-Add: argument2 must return a function and must be a function. Type of return is ${type(ret)}`);
          } else if (vrs.type(ret) === 'function') {
            if (func.name == null) {
              if (name != null) {
                pen.prototype[name] = ret;
              } else {
                throw new (Error("Function cannot be anonymous").name = "Pen-add arg2");
              }
            } else {
              pen.prototype[func.name] = ret;
            }
          } else if (vrs.type(ret) === 'object') {
            for (funcName in ret) {
              pen.prototype[funcName] = ret[funcName];
            }
          }
        }
    }
  };
  atribs = 'id class href src contentEditable charset title rows cols style'.split(/\s+/);
  evps = 'click keyup keypress keydown mouse mouseup mouseover mousedown mouseout contextmenu dblclick drag dragover drop dropend'.split(/\s+/);
  for (i = 0, len = atribs.length; i < len; i++) {
    atrib = atribs[i];
    pen.prototype[atrib] = function(str) {
      if (str != null) {
        return this.attr(atrib, str);
      } else {
        return this.attr(atrib);
      }
    };
  }
  for (j = 0, len1 = evps.length; j < len1; j++) {
    evp = evps[j];
    pen.prototype[evp] = function(cb, cp) {
      if (this.events[evp] == null) {
        return this.on(evp, cb, cp);
      } else {
        return this.off(evp, cb, cp);
      }
    };
  }
  pen.vrs = vrs;
  pen.prototype.hide = function() {
    if (this.hidden !== true) {
      this.hidden = true;
      this.css('display', 'none');
    } else {
      this.hidden = false;
      this.css('display', '');
    }
  };
  return pen;
})();
