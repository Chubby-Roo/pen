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

var pen = function (el, cont) {
  if (!(this instanceof pen)) {
    return new pen(el, cont);
  }
  if (el instanceof pen) {
    return el;
  }
  switch (type(el)) {
    case 'string': case 'array': case 'object':
      el = this.parse(el, cont)
    break;
    default:
      var err = new Error(`Pen: argument 1 can't be ${type(el)}`)
  }
  this.element = el
}

pen.options = {}
pen.options.autoAppend = "off"
pen.options.debugMode = "off"
pen.options.selectorMode = "off"
pen.options.selectAll = "off"
pen.options.autoAppendTo = document.body

pen.fn = pen.prototype = {
  get el () {
    return this.element
  }
}

pen.fn.parse = function (el, cont) {
  return this.create(el, cont)
}

pen.fn.create = function (el, cont) {
  var lsv;
  if (type(cont) === 'string') cont = document.querySelector(cont)
  switch (type(el)) {
    case 'string':
      if (pen.options.selectorMode === 'on') {
        if (pen.options.selectAll === 'on') {
          lsv = type(cont) !== 'undefined' ? cont.querySelectorAll(el) : document.querySelectorAll(el)
        } else {
          lsv = type(cont) !== 'undefined' ? cont.querySelector(el) : document.querySelector(el)
        }
      } else {
        lsv = document.createElement(el)
      }
    break;
    default:
      lsv = el
  }
  if (pen.options.autoAppend === 'on') {
    pen.options.autoAppendTo.append(lsv)
  }
  return lsv
}

pen.fn.handleObject = function (func, obj, cb) {
  var self = this, el = this.element;
  for (var prop in obj) {
    cb(prop, self, obj)
  }
  return self
}
pen.fn.handleArray = function (func, ...args) {
  var self = this, el = this.element;
  if (type(el) === 'array') {
    for (var i = 0; i < el.length; i++) {
      self[func]([...args])
    }
  }
  return self
}

pen.fn.html = function (str, app = false) {
  this.handleArray("html", str, app)
  var el = this.element, self = this
  function def (prop, str, app) {
    if (str != null) {
      if (app === true) {
        el[prop] += str
        return self
      } else {
        el[prop] = str
        return self
      }
    } else {
      return el[prop]
    }
  }
  switch (el.tagName.toLowerCase()) {
    case 'input': case 'option': case 'textarea':
      return def("value", str, app)
    break;
    default:
      return def("innerHTML", str, app)
  }
}

pen.fn.is = function(str) {
  this.handleArray('is', str)
  return this.element.tagName.toLowerCase() === str
}
pen.fn.has = function(of, str) {
  this.handleArray("has", of, str)
  if (of.match(/^class$/gmi)) {
    return this.element.getAttribute("class") === str
  } else if (of.match(/^id$/gmi)) {
    return this.element.getAttribute("id") === str
  }
}

pen.fn.css = function(rules, rule) {
 this.handleArray("css", rules, rule)
  if (type(rules) === 'object') {
    return this.handleObject("css",rules, function (rule, self, rules) {
      self.element.style[rule] = rules[rule];
      return self;
    });
  }
  if (type(rule) !== 'undefined') {
    this.element.style[rules] = rule
  } else {
    return this.element.style[rules]
  }
  return this
}
pen.fn.attr = function(attr, value) {
  var self = this
  if (type(attr) === 'object') {
    return this.handleObject(attr, function (value, self, attr) {
      self.el.setAttribute(value,attr[value])
      return self
    })
  }
  this.handleArray("attr", attr, value)
  if (type(value) !== 'undefined') {
    this.element.setAttribute(attr, value)
  } else {
    return this.element.getAttribute(attr)
  }
  return this
}

pen.fn.on = function (eventType, event, cb = false) {
  this.handleArray("on", eventType, event, cb)
  this.element.addEventListener(eventType, event, cb)
  return this
}
pen.fn.off = function (eventType, event, cb = false) {
  this.handleArray("off", eventType, event, cb)
  this.element.removeEventListener(eventType, event, cb)
  return this
}

pen.fn.append = function (...els) {
  this.handleArray("append", [...els])
  for (var i = 0; i < els.length; i++) {
    var el = els[i]
    this.element.appendChild(el)
  }
  return this
}
pen.fn.appendTo = function (el) {
  this.handleArray("appendTo", el)
  el.appendChild(this.element)
  return this
}

pen.fn.class = function (str) {
  this.handleArray("class",str)
  this.attr("class", str)
  return this
}
pen.fn.toggle = function (str) {
  this.handleArray("toggle",str)
  this.element.classList.toggle(str)
  return this
}

pen.fn.id = function (str) {
  this.handleArray("id",str)
  this.attr("id", str)
  return this
}
pen.fn.href = function (str) {
  this.handleArray("href", str)
  this.attr("href", str)
  return this
}

pen.fn.remove = function () {
  this.el.parentNode.removeChild(this.el)
  return this
}

if (module != null) {
  module.exports = {pen, type}
}
