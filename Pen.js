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

pen.fn.handleObject = function (obj, cb) {
  var self = this, el = this.element;
  if (type(obj) === 'object') {
    for (var prop in obj) {
      try {
        cb(prop)
      } catch (err) {
        console.error(err)
      }
    }
  }
  return self
}

pen.fn.css = function(rules, rule) {
  var self = this
  this.handleObject(rules, function (rule) {
    self.el.style[rule] = rules[rule]
  })
}
