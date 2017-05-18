var type = (function () {
  var class2Type = {};
  var ref = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol'.split(/\s+/);
  for (var i = 0; i < ref.length; ++i) {
    var name = ref[i];
    class2Type[`[object ${name}]`] = name.toLowerCase();
  };
  return function (obj) {
    var strType = Object.prototype.toString.call(obj);
    return class2Type[strType] || 'object';
  };
})();
var exists = (arg) => arg != null;
var pen = function (el, autoAttach = false, autoAttachTo = document.body) {
  setup = (el) => {
    if (type(el) === 'string') {
      return el.match(/<|>/gi) ? (el = el.replace(/<|>/gi, ''), document.createElement(el)) : document.querySelector(el)
    } else {
      return el
    }
  }
  if (!(this instanceof pen)) {
    return new pen(el, autoAttach, autoAttachTo)
  }
  if (el instanceof Document) {
    this.el = el
    this.events = {}
    this.body = el.body
    this.head = el.head
    pen.fn.ready = function (callback, capture) {
      this.on('DOMContentLoaded', callback, capture)
      return this
    }
  } else if (el instanceof pen) {
    this.attributes = el.attributes
    this.style = el.style
    this.events = el.events
    this.el = el.el
    this.CHILDREN = el.CHILDREN
    this.TAG = el.TAG
    this.ID = el.ID
    this.CLASS = el.CLASS
    this.PARENT = el.PARENT
  } else if (type(el) === 'string' || type(el) === 'object') {
    setup2 = (el) => {
      this.TAG = el.tagName.toLowerCase()
      if (this.TAG === 'template') {
        this.CONTENT = el.content
        pen.fn.selectInner = pen.fn.$1 = (str) => this.CONTENT.querySelector(str)
        pen.fn.selectInnerAll = pen.fn.$$1 = (str) => this.CONTENT.querySelectorAll(str)
        pen.fn.clone = function (deep = false) {
          return document.importNode(this.el.content, deep)
        }
      } else {
        this.CHILDREN = el.children
      }
      this.ID = this.el.getAttribute('id')
      this.CLASS = this.el.getAttribute('class')
      this.PARENT = exists(el.parentNode) ? el.parentNode : 'no parent'
    }
    el = setup(el)
    this.attributes = {}
    this.style = {}
    this.events = {}
    this.text = void 0
    this.el = el
    setup2(el)
  }
  if (type(autoAttach) === 'boolean') {
    if (autoAttach === true) {
      autoAttachTo.append(el)
    }
  } else if (type(autoAttach) === 'object') {
    for (var attr in autoAttach) {
      if (attr !== 'options') {
        this.attr(attr, autoAttach[attr])
      } else {
        var value = autoAttach[attr]
        if (exists(value.options)) {
          if (exists(value.options.autoAttach)) {
            if (value.options.autoAttach === true) {
              value.options.autoAttachTo.append(el)
            }
          } else {
            value.options.autoAttach === false
          }
        } else {
          value.options.autoAttach === false
          value.options.autoAttachTo === document.body
        }
      }
    }
  } else {
    var err = new Error(`Pen: option 1 can't be a ${type(autoAttach)}`)
  }
}

pen.fn = pen.prototype = {}

pen.fn.handleObject = function (obj, cb) {
  var prop
  for (prop in obj) {
    cb(prop, this, obj)
  }
  return this
}

pen.fn.selfInstance = function (obj, cb) {
  if (obj instanceof pen) {
    cb(obj, this)
  }
  return this
}

pen.fn.html = function (str, app = false) {
  var def = (funco) => {
    this.text = str
    if (exists(str)) {
      return app === true ? (this.el[funco] += str, this) : (this.el[funco] = str, this)
    } else {
      return this.el[funco]
    }
  }
  switch (this.TAG) {
    case 'input': case 'option': case 'textarea':
      return def('value')
    break
    case 'template':
      if (type(str) !== 'object') {
        throw new Error("parameter 1 must be an element/object")
      }
      this.el.content.appendChild(str)
      return this
    break
    default:
      return def('innerHTML')
  }
}

pen.fn.attr = pen.fn.attributes = function (attribute, value) {
  if (exists(attribute)) {
    if (type(attribute) === 'object') {
      exists(attribute.id) ? this.ID = attribute.id : this.CLASS = attribute.class
      return this.handleObject(attribute, function (prop, self) {
        self.attributes[prop] = attribute[prop]
        self.el.setAttribute(prop, attribute[prop])
        return self
      })
    } else if (exists(value)) {
      if (attribute === 'id') {
        this.ID = value
      } else if (attribute === 'class') {
        this.CLASS = value
      }
      this.attributes[attribute] = value
      this.el.setAttribute(attribute, value)
      return this
    } else {
      return this.el.getAttribute(attribute)
    }
  } else {
    return this.el.attributes
  }
}

pen.fn.css = pen.fn.style = function (rule, rules) {
  if (exists(rule)) {
    if (type(rule) === 'object') {
      return this.handleObject(rule, function (prop, self) {
        self.style[prop] = rule[prop]
        self.el.style[prop] = rule[prop]
        return self
      })
    }
    return exists(rules) ? (this.style[rule] = rules, this.el.style[rule] = rules, this) : this.el.style[rule]
  } else {
    return this.el.style
  }
}

pen.fn.on = function (eventType, callback, capture) {
  addEvent = (eventT, cback, cpture) => {
    exists(this.el.addEventListener) ? this.el.addEventListener(eventT, cback, cpture)
    : exists(this.el.attachEvent) ? this.el.attachEvent(eventT, cback)
    : this.el[`on${eventT}`] = cback
  }
  this.events[eventType] = {}
  this.events[eventType].fn = callback
  type(capture) === 'object' ? (this.events[eventType].options = (exists(capture) ? capture : {}), addEvent(eventType, callback, (exists(capture) ? capture : {})))
  : (this.events[eventType].capture = (exists(capture) ? capture : false), addEvent(eventType, callback, (exists(capture) ? capture : false)))
  return this
}

pen.fn.off = function (eventType, callback) {
  removeEvent = (eventT, cback) => {
    exists(this.el.removeEventListener) ? this.el.removeEventListener(eventT, cback, cpture)
    : exists(this.el.detachEvent) ? this.el.detachEvent(eventT, cback)
    : this.el[`on${eventT}`] = void 0
  }
  exists(callback) ? (removeEvent(eventType, callback), delete this.events[eventType]) : (removeEvent(eventType, this.events[eventType].fn), delete this.events[eventType])
  return this
}

pen.fn.is = function (tag) {
  return this.TAG === tag
}

pen.fn.append = function (...els) {
  for (var i = 0; i < els.length; i++) {
    var el = els[i]
    if (el instanceof pen) {
      el.PARENT = this.el
      this.TAG === 'template' ? this.el.content.appendChild(el.el) : this.el.appendChild(el.el)
    } else {
      this.TAG === 'template' ? this.el.content.appendChild(el) : this.el.appendChild(el)
    }
  }
  return this
}

pen.fn.appendTo = function (el) {
  el instanceof pen ? (this.PARENT = el.el, el.append(this.el)) : (this.PARENT = el, pen(el).append(this.el))
  return this
}

pen.fn.remove = function () {
  this.PARENT.removeChild(this.el)
  this.PARENT = void 0
  return this
}

pen.fn.select = pen.fn.$ = function (el) {
  return this.el.querySelector(el)
}

pen.fn.selectAll = pen.fn.$$ = function (el) {
  return this.el.querySelectorAll(el)
}

pen.fn.create = pen.fn.createElement = function (el, ret) {
  el = pen(el)
  this.append(el)
  if (ret.match(/return parent/gi)) {
    return this
  } else if (ret.match(/return child/)) {
    for (var i = 0; i < this.CHILDREN.length; i++) {
      let child = this.CHILDREN[i]
      if (child === el.el) {
        child = pen(child)
        return child
      }
    }
  }
}

if (exists(module)) {
  if (exists(module.exports)) {
    module.exports = {pen, type, exists}
  }
}
