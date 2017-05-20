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

exists = (arg) => {
  return arg !== null && typeof arg !== 'undefined';
};

pen = function(element, autoAttach = false, autoAttachTo = document.body) {
  var attr, j, len, prop, setup, value;
  setup = (el) => {
    var ev, tag;
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
    this.attributes = {};
    this.style = {};
    this.events = {};
    this.text = void 0;
    this.element = this.el = ev;
    this.tag = ev.tagName.toLowerCase();
    if (this.tag === 'template') {
      this.content = ev.content;
      pen.fn.clone = function(deep = false) {
        return document.importNode(this.el.content, deep);
      };
    } else {
      this.children = el.children;
    }
    this.Id = ev.getAttribute('id');
    this.Class = ev.getAttribute('class');
    this.Parent = exists(ev.parentNode) ? ev.parentNode : 'no parent';
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
  if (type(autoAttach) === 'boolean') {
    if (autoAttach === true) {
      pen(autoAttachTo).append(el);
    }
  } else if (type(autoAttach) === 'object') {
    for (j = 0, len = autoAttach.length; j < len; j++) {
      attr = autoAttach[j];
      if (attr !== 'options') {
        this.attr(attr, autoAttach[attr]);
      } else {
        value = autoAttach[attr];
        if (exists(value.options)) {
          if (exists(value.options.autoAttach)) {
            if (value.options.autoAttach === true) {
              value.options.autoAttachTo.appendChild(el);
            }
          } else {
            value.options.autoAttach = false;
          }
        } else {
          value.options.autoAttach = false;
          value.options.autoAttachTo = document.body;
        }
      }
    }
  } else {
    throw new Error(`Pen: option 1 can't be a ${type(autoAttach)}`);
  }
};

pen.fn = pen.prototype = {
  constructor: pen
};

pen.prototype.handleObject = function(obj, cb) {
  var j, len, prop;
  for (j = 0, len = obj.length; j < len; j++) {
    prop = obj[j];
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

pen.prototype.html = function(str, app = false) {
  var def;
  def = (funco) => {
    this.text = str;
    if (exists(str)) {
      if (app === true) {
        this.el[funco] += str;
        return this;
      } else {
        this.el[funco] = str;
        return this;
      }
    } else {
      return this.el[funco];
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
      this.el.content.appendChild(str);
      return this;
    default:
      return def('innerHTML');
  }
};

pen.prototype.attr = function(attribute, value) {
  if (exists(attribute)) {
    if (type(attribute) === 'object') {
      if (exists(attribute.id)) {
        this.Id = attribute.id;
      } else {
        this.Class = attribute.class;
      }
      return this.handleObject(attribute, function(prop, self) {
        self.attributes[prop] = attribute[prop];
        self.el.setAttribute(prop, attribute[prop]);
        return self;
      });
    } else if (exists(value)) {
      if (attribute === 'id') {
        this.ID = value;
      } else {
        this.CLASS = value;
      }
      this.attributes[attribute] = value;
      this.el.setAttribute(attribute, value);
      return this;
    } else {
      return this.el.getAttribute(attribute);
    }
  } else {
    return this.attributes;
  }
};

pen.prototype.css = function(rule, rules) {
  if (exists(rule)) {
    if (type(rule) === 'object') {
      return this.handleObject(rule, function(prop, self) {
        self.style[prop] = rule[prop];
        self.el.style[prop] = rule[prop];
        return self;
      });
    }
    if (exists(rules)) {
      this.style[rule] = rules;
      this.el.style[rule] = rules;
      return this;
    } else {
      return this.el.style[rule];
    }
  } else {
    return this.el.style;
  }
};

pen.prototype.on = function(eventType, callback, capture) {
  var addEvent;
  addEvent = (eventT, cback, cpture) => {
    if (exists(this.el.addEventListener)) {
      this.el.addEventListener(eventT, cback, cpture);
    } else if (exists(this.el.attachEvent)) {
      this.el.attachEvent(eventT, cback);
    } else {
      this.el[`on${eventT}`] = cback;
    }
  };
  this.events[eventType] = {};
  this.events[eventType].fn = callback;
  if (type(capture) === 'object') {
    this.events[eventType].options = (exists(capture) ? capture : {});
    addEvent(eventType, callback, (exists(capture) ? capture : {}));
  } else {
    this.events[eventType].capture = (exists(capture) ? capture : false);
    addEvent(eventType, callback, (exists(capture) ? capture : false));
  }
  return this;
};

pen.prototype.off = function(eventType, callback) {
  var removeEvent;
  removeEvent = (eventT, cback) => {
    if (exists(this.el.removeEventListener)) {
      this.el.removeEventListener(eventT, cback, cpture);
    } else if (exists(this.el.detachEvent)) {
      this.el.detachEvent(eventT, cback);
    } else {
      this.el[`on${eventT}`] = void 0;
    }
  };
  if (exists(callback)) {
    removeEvent(eventType, callback);
    delete this.events[eventType];
  } else {
    removeEvent(eventType, this.events[eventType].fn);
    delete this.events[eventType];
  }
  return this;
};

pen.prototype.is = function(tag) {
  return this.tag === tag;
};

pen.prototype.append = function(...els) {
  var el, i, j, len;
  for (i = j = 0, len = els.length; j < len; i = ++j) {
    el = els[i];
    if (el instanceof pen) {
      el.PARENT = this.el;
      if (this.tag === 'template') {
        this.el.content.appendChild(el.el);
      } else {
        this.el.appendChild(el.el);
      }
    } else {
      if (this.tag === 'template') {
        this.el.content.appendChild(el);
      } else {
        this.el.appendChild(el);
      }
    }
  }
  return this;
};

pen.prototype.appendTo = function(el) {
  if (el instanceof pen) {
    this.PARENT = el.el;
    el.append(this.el);
  } else {
    this.PARENT = el;
    pen(el).append(this.el);
  }
  return this;
};

pen.prototype.remove = function() {
  var el;
  el = this.el instanceof pen ? this.element.el : this.element;
  this.PARENT.removeChild(this.el);
  this.PARENT = void 0;
  return this;
};

pen.prototype.select = pen.fn.$ = function(el) {
  if (this.tag === 'template') {
    return this.el.content.querySelector(str);
  } else {
    return this.el.querySelector(str);
  }
};

pen.prototype.selectAll = pen.fn.$$ = function(el) {
  if (this.tag === 'template') {
    return this.el.content.querySelectorAll(str);
  } else {
    return this.el.querySelectorAll(str);
  }
};

pen.prototype.create = pen.fn.createElement = function(el, ret) {
  var child, i, j, len, ref;
  el = pen(el);
  this.append(el);
  if (ret.match(/return parent/gi)) {
    return this;
  } else if (ret.match(/return child/)) {
    ref = this.CHILDREN;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      child = ref[i];
      child = this.CHILDREN[i];
    }
    if (child === el.el) {
      child = pen(child);
      return child;
    }
  }
};

pen.prototype.insertChildBefore = function(newNode, reference) {
  if (reference instanceof pen) {
    reference = reference.el;
  }
  if (newNode instanceof pen) {
    newNode = newNode.el;
  }
  this.element.el.insertBefore(newNode, reference);
  return this;
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

(function() {
  var attrs, events;
  attrs = 'id class href src contentEditable charset title rows cols'.split(/\s+/);
  events = 'click keydown keyup keypress mousedown mouseup mouseover mousepress mouseout contextmenu dblclick'.split(/\s+/);
  events.forEach(function(eventp) {
    return pen.fn[eventp] = function(...args) {
      if (!exists(this.events[eventp])) {
        return this.on(eventp, [...args]);
      } else {
        return this.off(eventp, [...args]);
      }
    };
  });
  return attrs.forEach(function(attr) {
    return pen.fn[attr] = function(str) {
      if (!exists(str)) {
        return this.attr(attr);
      } else {
        return this.attr(attr, str);
      }
    };
  });
})();

if (typeof module !== "undefined" && module !== null) {
  if (module.exports != null) {
    module.exports = {
      pen: pen,
      exists: exists,
      type: type
    };
  } else {
    window.pen = pen;
    window.exists = exists;
    window.type = type;
  }
}
