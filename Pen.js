var pen;

pen = (function() {
  var atribs, def, detectAndReturn, dir, empty, error, evs, log, parser, type;
  type = (function() {
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
  parser = function(regs, flags, num1, num2) {
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
    if (type(regs) === 'string') {
      resg = regs;
      regs = new RegExp(regs, flags);
    }
    return function(str) {
      var i, len, match, retsi, returns;
      returns = str.match(regs);
      retsi = {};
      for (i = 0, len = returns.length; i < len; i++) {
        match = returns[i];
        match.trim().replace(regs, function(...args) {
          if (type(resg) === 'string') {
            retsi[args[num1]] = args[num2];
          } else {
            retsi[args[flags]] = args[num1];
          }
        });
      }
      return retsi;
    };
  };
  empty = (obj) => {
    if (obj == null) {
      return true;
    } else {
      return false;
    }
  };
  ({log, error, dir} = console);
  document.addEventListener("DOMContentLoaded", function(ev) {
    window['body'] = document.body;
    return window['head'] = document.head;
  });
  detectAndReturn = function(ting, ev) {
    if (ev.hasAttribute(ting) === true) {
      return ev.getAttribute(ting);
    }
  };
  def = (prop, str) => {
    this.text = str;
    if (str != null) {
      if (app === true) {
        this.element[prop] += str;
      } else {
        this.element[prop] = str;
      }
      return this;
    } else {
      return this.element[prop];
    }
  };
  pen = function(element, options) {
    var prop;
    if (!(this instanceof pen)) {
      return new pen(element, options);
    }
    this.events = {};
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
      this.body = pen(element.body);
      this.head = pen(element.head);
      pen.prototype.ready = function(cb, cp) {
        var it;
        it = this;
        it.on('DOMContentLoaded', [...arguments]);
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
    var i, len, toDef;
    for (i = 0, len = toDefs.length; i < len; i++) {
      toDef = toDefs[i];
      switch (toDef) {
        case 'type':
          window[toDef] = type;
          break;
        case 'parser':
          window[toDef] = parser;
          break;
        case 'empty':
          window[toDef] = empty;
          break;
        case 'log':
          window[toDef] = log;
          break;
        case 'error':
          window[toDef] = error;
          break;
        case 'dir':
          window[toDef] = dir;
          break;
        default:
          throw new Error(`${toDef} doesn't match any variables under the hood`);
      }
    }
  };
  pen.$ = (element, parseIt) => {
    if (parseIt == null) {
      parseIt = false;
    }
    if (parseIt === true) {
      return pen(document.querySelector(element));
    } else {
      return document.querySelector(element);
    }
  };
  pen.$$ = (element) => {
    return document.querySelectorAll(element);
  };
  pen.crt = (element, parseIt) => {
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
    this.attributes = {};
    this.style = {};
    this.text = null;
    tag = /<([^\n]*?)>/gi;
    attribute = /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi;
    if (type(el) === 'string') {
      if (tag.test(el) === true) {
        el = el.replace(/<|>/gi, '');
        soc = attribute.test(el);
        if (soc === true) {
          reu = this.parseAttributes(el);
          el = el.replace(attributes, '').trim();
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
    this.tag = ev.tagName.toLowerCase();
    this.partialSetup(ev);
    return ev;
  };
  pen.prototype.partialSetup = function(ev) {
    this.Id = detectAndReturn('id', ev);
    this.Class = detectAndReturn('class', ev);
    this.Children = this.tag === 'template' ? ev.content.children : ev.children;
    this.Parent = ev.parentNode != null ? ev.parentNode : null;
    this.initLocalName();
    if (this.tag === 'template') {
      this.content = ev.content;
      pen.prototype.clone = function() {
        var args;
        args = Array.prototype.slice.call(arguments);
        return document.importNode([...args]);
      };
    }
  };
  pen.prototype.parseAttributes = (() => {
    return parser(/([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi, 1, 3);
  })();
  pen.prototype.parseCss = (() => {
    return parser(/([^\n\ ;:]*?):([^\n]*?);/gi, 1, 2);
  })();
  pen.prototype.initLocalName = function() {
    var it2, str;
    it2 = this;
    str = `${this.tag}${(this.Id != null ? `#${this.Id}` : '')}${(this.Class != null ? `.${this.element.classList.join('')}` : void 0)}`;
    this.localName = str;
    return str;
  };
  pen.prototype.handleObject = function(obj, cb) {
    var prop;
    for (prop in obj) {
      cb(prop, this, obj);
    }
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
      case 'option':
      case 'textarea':
        return def('value', str);
      case 'template':
        log("Please use pen.append");
        return;
      default:
        return def(parse === true ? 'innerHTML' : 'innerText');
    }
  };
  pen.prototype.attr = function(attribute, value) {
    var attr, attrs, res, vl;
    res = attribute === 'id' ? 'id' : attribute === 'class' ? 'class' : void 0;
    vl = (value != null) && attribute === ('id' || 'class') ? value : void 0;
    if (attribute != null) {
      if (type(attribute) === 'object') {
        this.Id = attribute.id != null ? attribute.id : null;
        this.Class = attribute.class != null ? attribute.class : null;
        return this.handleObject(attribute, function(prop, it) {
          it.attributes[prop] = attribute[prop];
          it.element.setAttribute(prop, attribute[prop]);
          return it;
        });
      } else if (value != null) {
        this[res] = vl;
        this.element.setAttribute(attribute, value);
        this.attributes[attribute] = value;
        this.initLocalName();
        return this;
      } else if (type(attribute) === 'string') {
        attrs = this.parseAttributes(attributes);
        for (attr in attrs) {
          this[res] = (attrs[attr] != null) && attr === ('id' || 'class') ? attrs[attr] : void 0;
          this.element.setAttribute(attr, attrs[attr]);
          this.attributes[attr] = attrs[attr];
        }
        this.initLocalName();
      } else {
        this.initLocalName();
        return this.element.getAttribute(attribute);
      }
    } else {
      return this.attributes;
    }
  };
  pen.prototype.css = function(rule, rules) {
    var st, style, styles;
    if (rule != null) {
      if (type(rule) === 'object') {
        return this.handleObject(rule, function(prop, it) {
          var layout, namespace;
          layout = rule[prop];
          if (type(layout) === 'object') {
            for (namespace in layout) {
              it.style[`${prop}-${namespace}`] = layout[namespace];
              it.element.style[`${prop}-${namespace}`] = layout[namespace];
            }
          } else {
            it.style[prop] = layout;
            it.element[prop] = layout;
          }
          return it;
        });
      } else if (type(rule) === 'string') {
        styles = this.parseCss(rule);
        for (style in styles) {
          st = styles[style];
          this.style = st;
          this.element.style[rule] = st;
        }
        return this;
      } else {
        return this.element.style[rule];
      }
    } else {
      return this.style;
    }
  };
  pen.prototype.on = function(evtp, cb, cp) {
    var args, typeEvent;
    args = Array.prototype.slice.call(arguments);
    this.events[evtp] = {};
    this.events[evtp].capture = capture;
    typeEvent = this.el.addEventListener != null ? 'addEventListener' : this.el.attachEvent != null ? 'attachEvent' : `on${evtp}`;
    switch (typeEvent) {
      case 'addEventListener':
        this.el[typeEvent](args);
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
    var args, typeEvent;
    args = Array.prototype.slice.call(arguments);
    typeEvent = this.el.addEventListener != null ? 'removeEventListener' : this.el.attachEvent != null ? 'detachEvent' : `on${evtp}`;
    switch (typeEvent) {
      case 'removeEventListener':
        this.el[typeEvent](args);
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
      if (type(element) === 'string') {
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
    if (type(element) === 'string') {
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
  pen.prototype.$ = function(element) {
    var result;
    result = this.tag === 'template' ? this.element.content : this.element;
    if (this.options.global.parseIt === true) {
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
    var res, result;
    element = pen(`<${element}>`);
    this.append(element);
    if (/child|parent/gi.test(ret) === true) {
      result = `return ${ret}`;
      if (result.endsWith("parent") === true) {
        return this;
      } else {
        res = (this.tag === 'template' ? this.element.content.children : this.el.children).pop();
        return res;
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
    pen.prototype[evp] = (cb, cp) => {
      if (this.events[evp] == null) {
        return this.on(evp, cb, cp);
      } else {
        return this.off(evp, cb, cp);
      }
    };
  });
  atribs.forEach(function(atrib) {
    pen.prototype[atrib] = (str) => {
      if (str != null) {
        return this.attr(atrib);
      } else {
        return this.attr(atrib, str);
      }
    };
  });
  return pen;
})();
