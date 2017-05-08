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

pen.prototype.options = {
  "autoAppend":false,
  "toSelector":false,
  "selectAll":false,
  "autoAppendTo":document.body,
  "debugMode":"off"
}

pen.prototype.parse = function (el) {
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
    if (pen.options.toSelector === true) {
      if (pen.options.selectAll === true) {
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

  if (pen.options.autoAppend === true) {
    pen(pen.autoAppendTo).append(this.el)
  }

  return this
};

pen.prototype.html = function (str, app) {
  var self = this
  var usefunc = function(type) {
    if (str != null) {
      if (app === false) {
        this.el[type] = str
        return self
      } else {
        this.el[type] += str
        return self
      }
    } else {
      return self.el[type]
    }
  }

  if (this.is("input") === true) {
    return usefunc("value")
  } else if (this.is("textarea") === true) {
    return usefunc("value")
  } else {
    return usefunc("innerHTML")
  }
}

pen.prototype.css = function (rules, rulestr) {
  if (rulestr != null) {
    if (type(rules) === "object") {
      for (var rule in rules) {
        this.el.style[rule] = rules[rule]
      }
    } else {
      this.el.style[rules] = rulestr
    }
    return this
  } else {
    return this.el.style[rules]
  }
}

pen.prototype.attr = function (attrs, assign) {
  if (assign != null) {
    if (type(attrs) === "object") {
      for (var attr in attrs) {
        this.el.setAttribute(attr, attrs[attr])
      }
    } else {
      this.el.setAttribute(attrs, assign)
    }
    return this
  } else {
    return this.el.getAttribute(attrs)
  }
}

pen.prototype.append = function (...els) {
  for (var i = 0 ; i < els.length; i++) {
    var el = els[i]
    this.el.appendChild(el)
  }
  return this
}

pen.prototype.appendTo = function(el) {
  pen(el).append(this.el)
  return this
}

pen.prototype.class = function(...names) {
  for (var i = 0; i < names.length; i++) {
    var name = names[i]
    this.el.classList.add(name)
  }
  return this
}

pen.prototype.id = function(...ids) {
  var id = "#"+ids.join("-")
  pen(this.el).attr("id", id)
  return this
}

pen.prototype.href = function(href) {
  pen(this.el).attr("hrer",href)
  return this
}

pen.prototype.is = function(typees) {
  var bool;
  if (this.el.tagName.toLocaleLowerCase() === typees) {
    bool = true
  } else {
    bool = false
  }
  return bool
}

pen.prototype.toggle = function(csssel) {
  this.el.classList.toggle(csssel)
  return this
}

pen.prototype.remove = () {
  this.el.parentNode.removeChild(this.el)
  return this
}

pen.prototype.returnElement = function () {
  return this.el
}
