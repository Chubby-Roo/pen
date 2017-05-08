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

var pen = function (el) {
  this.el = el
  if (!(this instanceof pen)) {
    el = new pen(el)
  }
  if (el instanceof pen) {
    return el
  }
  if (typeof el === "string") {
    el = this.parse(el)
  }
}

pen.fn = pen.prototype = {}

pen.fn.options = {
  autoAppend:false,
  toSelector:false,
  selectAll:false,
  autoAppendTo:document.body,
  debugMode:"off"
}


// 'ccOptions' short for check change options
pen.fn.ccOptions = function (optionname, optionassign) {
  if (type(optionassign) === 'undefined') {
    if (type(optionname) === 'object') {
      for (var option in optionname) {
        this.options[option] = optionname[option]
      }
    } else {
      return this.options[optionname]
    }
    return this
  } else {
    this.options[optionname] = optionassign
  }
}

pen.fn.parse = function (el) {
  err = new Error(`Pen: parameter 1 can't be a ${type(el)}`);
  switch (type(el)) {
    case "error": case "boolean":
    case "number": case "function":
    case "array": case "date":
    case "regexp": case "undefined":
    case "null": case "symbol":
      throw err;
  }

  if (type(el) === 'string') {
    if (this.options.toSelector === true) {
      if (this.options.selectAll === true) {
        this.el = document.querySelectorAll(el);
      } else {
        this.el = document.querySelector(el);
      }
    } else {
      this.el = document.createElement(el);
    }
  } else {
    this.el = el;
  }

  if (this.options.autoAppend === true) {
    pen(this.autoAppendTo).append(this.el)
  }

  return this
};

pen.fn.html = function (str, app=false) {
  var self = this

  switch (this.el.tagName.toLowerCase()) {
    case 'input': case 'textarea':
      if (str != null) {
        if (app === false) {
          this.el.value = str
          return self
        } else {
          this.el.value += str
          return self
        }
      } else {
        return self.el.value
      }
    break;
    default:
      if (str != null) {
        if (app === false) {
          this.el.innerHTML = str
          return self
        } else {
          this.el.innerHTML += str
          return self
        }
      } else {
        return self.el.innerHTML
      }
  }
}

pen.fn.css = function (rules, rulestr) {
  if (type(rulestr) === 'undefined') {
    if (type(rules) === "object") {
      for (var rule in rules) {
        this.el.style[rule] = rules[rule]
      }
    } else {
      return this.el.style[rules]
    }
    return this
  } else {
    this.el.style[rules] = rulestr
  }
}

pen.fn.attr = function (attrs, assign) {
  if (type(assign) === 'undefined') {
    if (type(attrs) === "object") {
      for (var attr in attrs) {
        this.el.setAttribute(attr, attrs[attr])
      }
    } else {
      return this.el.getAttribute(attrs)
    }
  } else {
    this.el.setAttribute(attrs, assign)
  }
  return this
}

pen.fn.append = function (...els) {
  for (var i = 0 ; i < els.length; i++) {
    var el = els[i]
    this.el.appendChild(el)
  }
  return this
}
pen.fn.appendTo = function (el) {
  el.appendChild(this.el)
  return this
}

pen.fn.class = function(name) {
  pen(this).attr("class", name)
  return this
}

pen.fn.id = function(...ids) {
  var id = "#"+ids.join("-")
  pen(this.el).attr("id", id)
  return this
}

pen.fn.href = function(href) {
  pen(this.el).attr("hrer",href)
  return this
}

pen.fn.is = function(typees) {
  var bool;
  if (this.el.tagName.toLocaleLowerCase() === typees) {
    bool = true
  } else {
    bool = false
  }
  return bool
}

pen.fn.toggle = function(csssel) {
  this.el.classList.toggle(csssel)
  return this
}

pen.fn.remove = function () {
  this.el.parentNode.removeChild(this.el)
  return this
}

pen.fn.returnElement = function () {
  return this.el
}

pen.fn.on = function (type, event, cp = false) {
  this.el.addEventListener(type, event, cp)
  return this
}

pen.fn.off = function (type, event, cp = false) {
  this.el.removeEventListener(type, event, cp)
  return this
}
