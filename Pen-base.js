(function(window, document) {
  var exists, pen, type;
  type = (function() {
    var class2Type, i, j, len, name, ref;
    class2Type = {};
    ref = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol'.split(/\s+/gi);
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
  pen = function(element, autoAttach = false, autoAttachTo = document.body) {
    var prop, setup;
    setup = (el) => {
      var ev, tag;
      this.attributes = {};
      this.style = {};
      this.events = {};
      this.text = void 0;
      tag = /<([^\n]*?)>/gi;
      if (type(el) === 'string') {
        if (tag.test(el) === true) {
          el = el.replace(/<|>/gi, '');
          ev = document.createElement(el);
        } else {
          ev = document.querySelector(el);
        }
      } else {
        ev = el;
      }
      this.element = this.el = ev;
      this.tag = ev.tagName.toLowerCase();
      if (this.tag === 'template') {
        this.content = ev.content;
        this.children = ev.content.children;
        pen.fn.clone = function(deep = false) {
          return document.importNode(this.el.content, deep);
        };
      } else {
        this.children = el.children;
      }
      this.Id = ev.getAttribute('id');
      this.Class = ev.getAttribute('class');
      this.Parent = exists(ev.parentNode) ? ev.parentNode : 'no parent';
      this.localName = this.tag + (this.Id != null ? `#${this.Id}` : "") + (this.Class != null ? `.${this.Class}` : "");
      return ev;
    };
    if (!(this instanceof pen)) {
      return new pen(element, autoAttach, autoAttachTo);
    }
    if (element instanceof Document) {
      this.element = this.el = element;
      this.events = {};
      this.body = element.body;
      this.head = element.head;
      pen.fn.ready = function(callback, capture) {
        this.on('DOMContentLoaded', callback, capture);
        return this;
      };
    } else if (element instanceof pen) {
      for (prop in element) {
        this[prop] = element[prop];
      }
    } else {
      setup(element);
    }
    if (autoAttach === true) {
      pen(autoAttachTo).append(el);
    }
  };
  pen.fn = pen.prototype = {
    constructor: pen
  };
  pen.prototype.initLocalName = function() {
    this.tag + (this.Id != null ? `#${this.Id}` : "") + (this.Class != null ? `.${this.Class}` : "");
    return this;
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
  pen.prototype.html = function(str, app = false, parse = false) {
    var def;
    def = (funco) => {
      this.text = str;
      if (exists(str)) {
        if (app === true) {
          this.element[funco] += str;
          return this;
        } else {
          this.element[funco] = str;
          return this;
        }
      } else {
        return this.element[funco];
      }
    };
    switch (this.tag) {
      case 'input':
      case 'option':
      case 'textarea':
        return def('value');
      case 'template':
        if (type(str) !== 'object') {
          throw new Error("parameter 1 must be an element/object");
        }
        this.element.content.appendChild(str);
        return this;
      default:
        if (parse === false) {
          return def('textContent');
        } else {
          return def('innerHTML');
        }
    }
  };
  pen.prototype.attr = function(attribute, value) {
    if (attribute != null) {
      if (type(attribute) === 'object') {
        if (attribute.id != null) {
          this.Id = attribute.id;
        }
        if (attribute.class != null) {
          this.Class = attribute.class;
        }
        return this.handleObject(attribute, function(prop, self) {
          self.attributes[prop] = attribute[prop];
          self.element.setAttribute(prop, attribute[prop]);
          return self;
        });
      } else if (value != null) {
        if (attribute === 'id') {
          this.Id = value;
        }
        if (attribute === 'class') {
          this.Class = value;
        }
        this.element.setAttribute(attribute, value);
        this.initLocalName();
        return this;
      } else {
        this.initLocalName();
        return this.element.getAttribute(attribute);
      }
    } else {
      return this.attributes;
    }
  };
  pen.prototype.css = function(rule, rules) {
    if (rule != null) {
      if (type(rule) === 'object') {
        return this.handleObject(rule, function(prop, self) {
          self.style[prop] = rule[prop];
          self.element.style[prop] = rule[prop];
          return self;
        });
      } else if (rules != null) {
        this.style[rule] = rules;
        this.element.style[rule] = rules;
        return this;
      } else {
        return this.element.style[rule];
      }
    } else {
      return this.style;
    }
  };
  pen.prototype.on = function(eventType, callback, capture) {
    var addEvent;
    this.events[eventType] = {};
    addEvent = (eventType, callback, capture) => {
      this.events[eventType].capture = capture;
      if (this.element.addEventListener != null) {
        this.element.addEventListener(eventType, callback, capture);
      } else if (this.element.attachEvent != null) {
        this.element.attachEvent(eventType, callback);
      } else {
        this.element[`on${eventType}`] = callback;
      }
    };
    this.events[eventType].fn = callback;
    addEvent(eventType, callback, capture);
    return this;
  };
  pen.prototype.off = function(eventType, callback) {
    var removeEvent;
    removeEvent = function(eventType, callback = this.events[eventType].fn) {
      if (this.element.removeEventListener) {
        this.element.removeEventListener(eventType, callback);
      } else if (this.element.detachEvent) {
        this.element.detachEvent(eventType, callback);
      } else {
        this.element[`on${eventType}`] = void 0;
      }
      delete this.events[eventType];
    };
    return removeEvent(eventType, callback);
  };
  pen.prototype.is = function(tag) {
    return this.tag === tag;
  };
  pen.prototype.append = function(...elements) {
    var element, index, j, len;
    for (index = j = 0, len = elements.length; j < len; index = ++j) {
      element = elements[index];
      if (element instanceof pen) {
        element.Parent = this.element;
      }
      if (this.tag === 'template') {
        this.element.content.appendChild((element instanceof pen ? element.el : element));
      } else {
        this.element.appendChild((element instanceof pen ? element.el : element));
      }
    }
    return this;
  };
  pen.prototype.appendTo = function(element) {
    if (element instanceof pen) {
      this.Parent = element.el;
    } else {
      this.Parent = element;
    }
    pen(element).append(this.element);
    return this;
  };
  pen.prototype.remove = function() {
    if (this.Parent !== 'no parent') {
      this.Parent.removeChild(this.element);
      this.Parent = void 0;
    } else {
      throw new Error(`Pen-remove: There's no parent to remove this (${this.localName}) from`);
    }
    return this;
  };
  pen.prototype.select = pen.prototype.$ = function(element) {
    if (this.tag === 'template') {
      return this.element.content.querySelector(element);
    } else {
      return this.element.querySelector(element);
    }
  };
  pen.prototype.selectAll = pen.prototype.$$ = function(element) {
    if (this.tag === 'template') {
      return this.element.content.querySelectorAll(element);
    } else {
      return this.element.querySelectorAll(element);
    }
  };
  pen.prototype.create = pen.prototype.createElement = function(element, ret = "return child") {
    var arg, child, index, j, len, ref;
    element = `<${element}>`;
    element = pen(element);
    this.append(element);
    if (ret.startsWith("return")) {
      arg = ret.split(/\s+/gi).slice(1)[0].toLowerCase();
      if (arg === 'parent') {
        return this;
      } else if (arg === 'child') {
        ref = this.children;
        for (index = j = 0, len = ref.length; j < len; index = ++j) {
          child = ref[index];
          if (child === element.element) {
            child = pen(child);
            return child;
          }
        }
      }
    }
  };
  pen.prototype.insertParentBefore = function(parentNode, referenceInParent) {
    var el;
    if (this.el instanceof pen) {
      el = this.element.el;
    } else {
      el = this.element;
    }
    if (referenceInParent instanceof pen) {
      referenceInParent = referenceInParent.el;
    }
    parentNode.insertBefore(el, referenceInParent);
    return this;
  };
  if (typeof module !== "undefined" && module !== null) {
    if (module.exports != null) {
      module.exports = {
        pen: pen
      };
    } else {
      window.pen = pen;
    }
  }
})(window, document);
