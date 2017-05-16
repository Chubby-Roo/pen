var type = (function () {
  var classToType, i, j, len, name, ref;
  classToType = {};
  ref = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol'.split(/\s+/);
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    name = ref[i];
    classToType[`[object ${name}]`] = name.toLowerCase();
  };
  return function (obj) {
    var strType;
    strType = Object.prototype.toString.call(obj);
    return classToType[strType] || 'object';
  };
})();
var exists = (arg) => arg != null;
var pen = function (el, autoAttach = false, autoAttachTo = document.body) {
  setup = (el) => {
    if (type(el) === 'string') {
      if (el.match(/<|>/gi)) {
        el = el.replace(/<|>/gi, '')
        return document.createElement(el)
      } else {
        return document.querySelector(el)
      }
    } else {
      return el
    }
  }
  if (!(this instanceof pen)) {
    return new pen(el)
  }
  if (el instanceof Document) {
    this.el = el
    this.events = {}
    this.body = el.body
    this.head = el.head
    this.__proto__.ready = function (callback, capture) {
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
        this.__proto__.selectInner = this.__proto__.$1 = (str) => this.CONTENT.querySelector(str)
        this.__proto__.selectInnerAll = this.__proto__.$$1 = (str) => this.CONTENT.querySelectorAll(str)
        this.__proto__.clone = function (deep = false) {
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
  if (autoAttach === true) {
    autoAttachTo.append(el)
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
      if (app === true) {
        this.el[funco] += str
        return this
      } else {
        this.el[funco] = str
        return this
      }
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

pen.fn.attr = function (attribute, value) {
  if (exists(attribute)) {
    if (type(attribute) === 'object') {
      if (exists(attribute.id)) {
        this.ID = attribute.id
      } else if (exists(attribute.class)) {
        this.CLASS = attribute.class
      }
      return this.handleObject(attribute, function (prop, self) {
        self.attributes[prop] = attribute[prop]
        self.el.setAttribute(prop, attribute[prop])
        return self
      })
    } else if (exists(value)) {
      if (attribute === 'id') {
        this.ID = value
      }
      if (attribute === 'class') {
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

pen.fn.css = function (rule, rules) {
  if (exists(rule)) {
    if (type(rule) === 'object') {
      return this.handleObject(rule, function (prop, self) {
        self.style[prop] = rule[prop]
        self.el.style[prop] = rule[prop]
        return self
      })
    }
    if (exists(rules)) {
      this.style[rule] = rules
      this.el.style[rule] = rules
      return this
    } else {
      return this.el.style[rule]
    }
  } else {
    return this.el.style
  }
}

pen.fn.on = function (eventType, callback, capture) {
  addEvent = (eventT, cback, cpture) => {
    if (exists(this.el.addEventListener)) {
      this.el.addEventListener(eventT, cback, cpture)
    } else if (exists(this.el.attachEvent)) {
      this.el.attachEvent(eventT, cback)
    } else {
      this.el["on"+eventT] = cback
    }
  }
  this.events[eventType] = {}
  this.events[eventType].fn = callback
  if (type(capture) === 'object') {
    this.events[eventType].options = exists(capture) ? capture : {}
    addEvent(eventType, callback, exists(capture) ? capture : {})
  } else {
    this.events[eventType].capture = exists(capture) ? capture : false
    addEvent(eventType, callback, exists(capture) ? capture : false)
  }
  return this
}

pen.fn.off = function (eventType, callback) {
  removeEvent = (eventT, cback) => {
    if (exists(this.el.removeEventListener)) {
      this.el.removeEventListener(eventT, cback, cpture)
    } else if (exists(this.el.detachEvent)) {
      this.el.detachEvent(eventT, cback)
    } else {
      this.el["on"+eventT] = null
    }
  }
  if (exists(callback)) {
    removeEvent(eventType, callback)
    delete this.events[eventType]
  } else {
    removeEvent(eventType, this.events[eventType].fn)
    delete this.events[eventType]
  }
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
      if (this.TAG === 'template') {
        this.el.content.appendChild(el.el)
      } else {
        this.el.appendChild(el.el)
      }
    } else {
      if (this.TAG === 'template') {
        this.el.content.appendChild(el)
      } else {
        this.el.appendChild(el)
      }
    }
  }
  return this
}

pen.fn.appendTo = function (el) {
  if (el instanceof pen) {
    this.PARENT = el.el
    el.append(this.el)
  } else {
    this.PARENT = el
    pen(el).append(this.el)
  }
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

;(function () {
  var attrs = 'id class href src contentEditable charset title'.split(/\s+/)
  var events = 'click keydown keyup keypress mousedown mouseup mouseover mousepress mouseout contextmenu dblclick'.split(/\s+/)
  events.forEach(function (eventp) {
    pen.fn[eventp] = function (...args) {
      if (!exists(this.events[eventp])) {
        return this.on(eventp, [...args])
      } else {
        return this.off(eventp, [...args])
      }
    }
  })
  attrs.forEach(function (attr) {
    pen.fn[attr] = function (str) {
      if (!exists(str)) {
        return this.attr(attr)
      } else {
        return this.attr(attr, str)
      }
    }
  })
})()
