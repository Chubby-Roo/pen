var type = (function() {
  var classToType, i, j, len, name, ref;
  classToType = {};
  ref = "Boolean Number String Function Array Date RegExp Undefined Null Error Symbol".split(/\s+/);
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    name = ref[i];
    classToType[`[object ${name}]`] = name.toLowerCase();
  }
  return function(obj) {
    var strType;
    strType = Object.prototype.toString.call(obj);
    return classToType[strType] || "object";
  };
})();
var exists = (arg) => arg != null
var pen = function (el) {
  function setup (el) {
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
    this.__proto__.ready = function (cb, cap) {
      return this.on("DOMContentLoaded", cb, cap)
    }
  } else if (el instanceof pen) {
    this.attributes = el.attributes
    this.style = el.style
    this.events = el.events
    this.CHILDREN = el.children
    this.el = el.el
    this.TAG = el.tag
    this.ID = el.id
    this.CLASS = el.class
    this.PARENT = el.parent
  } else if (type(el) === 'string' || type(el) === 'object') {
    el = setup(el)
    this.attributes = {}
    this.style = {}
    this.events = {}
    this.text = void 0
    this.el = el
    this.TAG = this.el.tagName.toLowerCase()
    this.CHILDREN = this.el.children
    this.ID = this.el.getAttribute("id")
    this.CLASS = this.el.getAttribute("class")
    this.PARENT = this.el.parentNode != null ? el.parentNode : "no parent"
  }
}

pen.fn = pen.prototype = {}

pen.fn.handleObject = function(obj, cb) {
  var el, prop;
  el = this.el;
  for (prop in obj) {
    cb(prop, this, obj);
  }
  return this;
}

pen.fn.html = function (str, app=false) {
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
      return def("value")
    break
    default:
      return def("innerHTML")
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
  this.events[eventType] = {}
  this.events[eventType].func = callback
  if (type(capture) === 'object') {
    this.events[eventType].options = exists(capture) ? capture : {}
    this.el.addEventListener(eventType, callback, exists(capture) ? capture : {})
  } else {
    this.events[eventType].capture = exists(capture) ? capture : false
    this.el.addEventListener(eventType, callback, exists(capture) ? capture : false)
  }
  return this
}

pen.fn.off = function (eventType, callback) {
  if (exists(callback)) {
    this.el.removeEventListener(eventType, callback)
    delete this.events[eventType]
  } else {
    this.el.removeEventListener(eventType, this.events[eventType])
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
      el.parent = this.el
      this.el.appendChild(el.el)
    } else {
      this.el.appendChild(el)
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
    S(el).append(this.el)
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
        break
      }
    }
  }
}

;(function () {
  var attrs = "id class href src".split(/\s+/)
  var events = "click keydown keyup keypress mousedown mouseup mouseover mousepress contextmenu dblclick".split(/\s+/)
  events.forEach(function (eventp) {
    pen.fn[eventp] = function (...args) {
      if (!exists(this.events[eventp])) {
        return this.on(eventp, [...args])
      } else {
        return this.off(eventp, [...args])
      }
    }
  })
  attrs.forEach(function(attr) {
    pen.fn[attr] = function (str) {
      if (!exists(str)) {
        return this.attr(attr)
      } else {
        return this.attr(attr, str)
      }
    }
  })
})()
