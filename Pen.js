var empty, exists, parser, pen, test, type;

type = (function() {
  var class2Type, i, j, len, name, ref;
  class2Type = {};
  ref = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split(/\s+/gi);
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    name = ref[i];
    class2Type[`[object ${name}]`] = name.toLowerCase();
  }
  return function(obj) {
    var strType;
    strType = Object.prototype.toString.call(obj);
    return class2Type[strType] || 'object';
  };
})();

exists = function(arg) {
  return arg !== null && typeof arg !== 'undefined';
};

test = function(reg, flags, arg) {
  var val;
  if (type(reg) === 'string') {
    reg = new RegExp(reg, flags);
    val = reg.test(arg);
  } else {
    val = reg.test(flags);
  }
  return val;
};

parser = function(regs, flags = "gi", num1 = 1, num2 = 2) {
  var resg;
  if (type(regs) === 'string') {
    resg = regs;
    regs = new RegExp(regs, flags);
  }
  return function(str) {
    var j, len, result, retsi, returns;
    returns = str.match(regs);
    retsi = {};
    for (j = 0, len = returns.length; j < len; j++) {
      result = returns[j];
      result.trim().replace(regs, function(...args) {
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

empty = function(obj) {
  if (obj == null) {
    return true;
  }
};

pen = (function() {
  var attrs2, body, dir, error, events5, head, log;
  ({log, error, dir} = console);
  ({body, head} = document);
  pen = function(element, options) {
    var prop;
    if (!(this instanceof pen)) {
      return new pen(element, options);
    }
    this.events = {};
    this.options = {
      autoAttach: false,
      autoAttachTo: body,
      global: {
        parseIt: false,
        create: {
          retneh: "return child"
        },
        html: {
          app: false,
          parse: false
        }
      }
    };
    if (element instanceof Document) {
      this.element = this.el = element;
      this.body = pen(element.body);
      this.head = pen(element.head);
      pen.ink.ready = function(callback, capture) {
        var self;
        self = this;
        this.on('DOMContentLoaded', [...arguments]);
        return self;
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
  pen.$ = function(element, parseIt) {
    if (parseIt === true) {
      return pen(document.querySelector(element));
    } else {
      return document.querySelector(element);
    }
  };
  pen.$$ = function(element) {
    return document.querySelectorAll(element);
  };
  pen.prototype.setup = function(el) {
    var attrs, ev, prop, reu, soc, tag;
    this.attributes = {};
    this.style = {};
    this.text = void 0;
    tag = /<([^\n]*?)>/gi;
    attrs = /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi;
    if (type(el) === 'string') {
      if (test(tag, el) === true) {
        el = el.replace(/<|>/gi, '');
        soc = test(attrs, el);
        if (soc === true) {
          reu = this.parseAttributes(el);
          el = el.replace(attrs, '').trim();
        }
        ev = document.createElement(el);
        if (soc === true) {
          for (prop in reu) {
            ev.setAttribute(prop, reu[prop]);
            this.attributes[prop] = reu[prop];
          }
        }
      } else {
        ev = document.querySelector(el);
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
    this.Id = ev.getAttribute('id');
    this.Class = ev.getAttribute('class');
    this.children = this.tag === 'template' ? ev.content.children : ev.children;
    this.Parent = exists(ev.parentNode) ? ev.parentNode : void 0;
    this.initLocalName();
    if (this.tag === 'template') {
      this.content = ev.content;
      pen.ink.clone = function(deep = false) {
        return document.importNode(this.el.content, deep);
      };
    }
  };
  pen.prototype.parseAttributes = (() => {
    return parser(/([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi, 1, 3);
  })();
  pen.prototype.parseCssStyle = (() => {
    return parser(/([^\n\ ;:]*?):([^\n]*?);/gi, 1, 2);
  })();
  pen.prototype.initLocalName = function() {
    var str, that3;
    that3 = this;
    str = `${this.tag}${(this.Id != null ? `#${this.Id}` : '')}${(this.Class != null ? `.${this.Class}` : '')}`;
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
  pen.prototype.html = function(str, options) {
    var app, child, def, element, i, j, len, parse, ref;
    if (options != null) {
      app = options.app != null ? options.app : false;
      parse = options.parse != null ? options.parse : false;
    } else {
      app = this.options.global.html.app != null ? this.options.global.html.app : false;
      parse = this.options.global.html.parse != null ? this.options.global.html.parse : false;
    }
    def = (prop) => {
      this.text = str;
      if (exists(str)) {
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
    switch (this.tag) {
      case 'input':
      case 'option':
      case 'textarea':
        return def('value');
      case 'template':
        if (type(str) === 'object') {
          for (element in str) {
            ref = this.element.content.children;
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
              child = ref[i];
              if (element === pen(child).initLocalName()) {
                this.html(str[element], options);
              }
            }
          }
        } else {
          log("element was a template, the first parameter is not an object");
          return this;
        }
        break;
      default:
        return def(parse === true ? 'innerHTML' : 'textContent');
    }
  };
  pen.prototype.attr = function(attribute, value) {
    var attr, attrs, results;
    if (attribute != null) {
      if (type(attribute) === 'object') {
        this.Id = attribute.id != null ? attribute.id : void 0;
        this.Class = attribute.class != null ? attribute.class : void 0;
        return this.handleObject(attribute, function(prop, self) {
          self.attributes[prop] = attribute[prop];
          self.element.setAttribute(prop, attribute[prop]);
          return self;
        });
      } else if (value != null) {
        this[(attribute === 'id' ? 'id' : attribute === 'class' ? 'class' : void 0)] = (value != null) && attribute === ('id' || 'class') ? value : void 0;
        this.element.setAttribute(attribute, value);
        this.initLocalName();
        return this;
      } else if (type(attribute) === 'string') {
        attrs = this.parseAttributes(attribute);
        results = [];
        for (attr in attrs) {
          this[(attr === 'id' ? 'id' : attr === 'class' ? 'class' : void 0)] = (attrs[attr] != null) && attr === ('id' || 'class') ? attrs[attr] : void 0;
          results.push(this.element.setAttribute(attr, attrs[attr]));
        }
        return results;
      } else {
        this.initLocalName();
        return this.element.getAttribute(attribute);
      }
    } else {
      return this.attributes;
    }
  };
  pen.prototype.attr.get = function(attribute) {
    this.initLocalName();
    return this.element.getAttribute(attribute);
  };
  pen.prototype.css = function(rule, rules) {
    var style, styles;
    if (rule != null) {
      if (type(rule) === 'object') {
        return this.handleObject(rule, function(prop, self) {
          var layout, namespace;
          layout = rule[prop];
          log(layout);
          if (type(rule[prop]) === 'object') {
            for (namespace in rule[prop]) {
              self.style[`${prop}-${namespace}`] = rule[prop][namespace];
              self.element.style[`${prop}-${namespace}`] = rule[prop][namespace];
            }
          } else {
            self.style[prop] = rule[prop];
            self.element.style[prop] = rule[prop];
          }
          return self;
        });
      } else if (type(rule) === 'string') {
        styles = this.parseCssStyle(rule);
        for (style in styles) {
          this.style[style] = styles[style];
          this.element.style[rule] = styles[style];
        }
        return this;
      } else {
        return this.element.style[rule];
      }
    } else {
      return this.style;
    }
  };
  pen.prototype.on = function(eventType, callback, capture = false) {
    var typeEvent;
    this.events[eventType] = {};
    this.events[eventType].capture = capture;
    typeEvent = this.element.addEventListener != null ? 'addEventListener' : this.element.attachEvent != null ? 'attachEvent' : `on${eventType}`;
    if (typeEvent === 'addEventListener') {
      this.element[typeEvent](eventType, callback, capture);
    } else if (typeEvent === 'attachEvent') {
      this.element[typeEvent](eventType, callback);
    } else {
      this.element[typeEvent] = callback;
    }
    return this;
  };
  pen.prototype.off = function(eventType, callback) {
    var typeEvent;
    typeEvent = this.element.removeEventListener != null ? 'removeEventListener' : this.element.detachEvent != null ? 'detachEvent' : `on${eventType}`;
    this.event[eventType].capture = capture;
    if (typeEvent === 'removeEventListener') {
      this.element[typeEvent](eventType, callback);
    } else if (typeEvent === 'detachEvent') {
      this.element[typeEvent](eventType, callback);
    } else {
      this.element[typeEvent] = void 0;
    }
    delete this.events[eventType];
    return this;
  };
  pen.prototype.is = function(tag) {
    return this.tag === tag;
  };
  pen.prototype.append = function(...elements) {
    var element, elu, j, len;
    for (j = 0, len = elements.length; j < len; j++) {
      element = elements[j];
      if (type(element) === 'string') {
        element = document.querySelector(element);
      }
      if (element instanceof pen) {
        element.Parent = this.element;
      }
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
      element = document.querySelector(element);
    }
    pen(element).append(this.element);
    return this;
  };
  pen.prototype.remove = function() {
    var check;
    check = this.Parent != null ? 'Parent' : this.element.parentNode != null ? 'parentNode' : void 0;
    if (check != null) {
      this[check].removeChild(this.element);
      this.Parent = void 0;
    } else {
      log(`Pen-remove-error: There's no parent to remove child: (${this.localName}) from`);
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
    return result.querySelector(element);
  };
  pen.prototype.create = pen.prototype.createElement = function(element) {
    var child, j, len, result, result2;
    element = pen(`<${element}>`);
    this.append(element);
    result = (function() {
      var arg;
      if (ret.startsWith("return")) {
        arg = ret.split(/\s+/gi).slice(1)[0].toLowerCase();
      }
      return arg;
    })();
    if (result === 'parent') {
      return this;
    } else if (result === 'child') {
      result2 = (this.children != null ? this.children : (this.tag === 'template' ? this.el.content.children : this.el.children));
      for (j = 0, len = result2.length; j < len; j++) {
        child = result2[j];
        if (child === element.el) {
          return child;
        }
      }
    }
  };
  pen.prototype.toggle = function(...clls) {
    var cls, j, len;
    for (j = 0, len = clls.length; j < len; j++) {
      cls = clls[j];
      this.element.classList.toggle(clss);
    }
    return this;
  };
  attrs2 = 'id class href src contentEditable charset title rows cols'.split(/\s+/);
  events5 = 'click keydown keyup keypress mousedown mouseup mouseover mousepress mouseout contextmenu dblclick'.split(/\s+/);
  events5.forEach(function(eventp) {
    return pen.prototype[eventp] = function(callback, capture) {
      if (this.events[eventp] == null) {
        return this.on(eventp, callback, capture);
      } else {
        return this.off(eventp, callback, capture);
      }
    };
  });
  attrs2.forEach(function(attr) {
    return pen.prototype[attr] = function(str) {
      if (str == null) {
        return this.attr(attr);
      } else {
        return this.attr(attr, str);
      }
    };
  });
  return pen;
})();
