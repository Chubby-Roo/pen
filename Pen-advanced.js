/*
* For defining the typeof of a value since
* the original typeof is broken
*/
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

/*
* To see if a value exists or not
*/
var exists = (arg) => arg !== null && typeof arg !== 'undefined';

/*
* The main function, takes 3 parameters
* the 1st is a must be and it can either be a string or an object (element)
* or be an instance of pen itself
* the 2 parameter can be an object or a boolean
* it defaults to a boolean but can be an object
* basically allowing automatically attatching the element to the element specified in parameter 3
* if it's an object however it'll parse the object to see if there's any attributes to be said
* if so then it'll automatically set the attributes defined in the object to the element
* if the parser comes across the options object inside of the main object
* then the options it comes across will be set if none is set for both boolean and object
* then parameter 2 defaults to false and parameter 3 defaults to the body inside the document
*/
function pen (el, autoAttach = false, autoAttachTo = document.body) {
  /*
  * The original setup function used to be defined in element.__proto__
  * So I made it in the function itself so it will never be passed to the child.
  */
  setup = (el) => {
    // This is to see if the type of the value is a string
    // if so then it'll be passed onto parsing for either creation or selection
    // if not however then it'll return itself aka the element
    if (type(el) === 'string') {
      /*
      This is to check to see if the string passed matched the start and or end of a tag
      if so then it'll create a new element
      if not then it'll do a querySelector
      */
      return el.match(/<|>/gi) ? (el = el.replace(/<|>/gi, ''), document.createElement(el)) : document.querySelector(el)
    } else {
      return el
    }
  }
  // for setting up the new operator so you would just have to go pen('<p>').mooCow(...)
  if (!(this instanceof pen)) {
    return new pen(el, autoAttach, autoAttachTo)
  }
  // if the element passed is the instanceof the document itself
  // it'll add different properties and values
  // and add a function to when the dom is ready just like jQuery
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
    // Else if it's an instanceof pen then for each property
    // it'll set the properties for 'this' to be the properties of the instance passed
    for (var prop in el) {
      this[prop] = el[prop]
    }
  } else if (type(el) === 'string' || type(el) === 'object') {
    // this is for setting up the instance
    // cause I'm lazy and I don't want to repeat myself
    setup2 = (el) => {
      this.TAG = el.tagName.toLowerCase()
      // if it's a template element
      // then it'll run it for a different setup
      // having the functions of selecting the innards of the template
      // and also adding selecting all the innards
      // then adding a function to clone the template
      // and returning the cloned template
      if (this.TAG === 'template') {
        this.CONTENT = el.content
        pen.fn.selectInner = pen.fn.$1 = function (str) {
          return this.CONTENT.querySelector(str)
        }
        pen.fn.selectInnerAll = pen.fn.$$1 = function (str) {
          return this.CONTENT.querySelectorAll(str)
        }
        pen.fn.clone = function (deep = false) {
          return document.importNode(this.el.content, deep)
        }
      } else {
        // else it'll just be children
        this.CHILDREN = el.children
      }
      // the rest of the setup
      this.ID = this.el.getAttribute('id')
      this.CLASS = this.el.getAttribute('class')
      this.PARENT = exists(el.parentNode) ? el.parentNode : 'no parent'
    }
    el = setup(el) // the init
    this.attributes = {} // the attributes
    this.style = {} // the style object
    this.events = {} // the events for later use
    this.text = void 0 // the text which is always defaulted to undefined
    this.el = this.element = el // the element
    setup2(el) // the main
  }
  if (type(autoAttach) === 'boolean') {
    if (autoAttach === true) {
      autoAttachTo.appendChild(el)
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
              value.options.autoAttachTo.appendChild(el)
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
    // if every other test fails then it'll throw an error
    var err = new Error(`Pen: option 1 can't be a ${type(autoAttach)}`)
  }
}


// the prototype makes things faster this way
pen.fn = pen.prototype = {
  constructor: pen
}

// handling objects
pen.fn.handleObject = function (obj, cb) {
  var prop
  for (prop in obj) {
    cb(prop, this, obj)
  }
  return this
}

// handling the self instance
pen.fn.selfInstance = function (obj, cb) {
  if (obj instanceof pen) {
    cb(obj, this)
  }
  return this
}

// the html of the element
// which I had set to be smart about it
pen.fn.html = function (str, app = false) {
  // the default for handling the smarts
  // also because I'm lazy and don't want to repeat myself
  var def = (funco) => {
    this.text = str
    if (exists(str)) {
      return app === true ? (this.el[funco] += str, this) : (this.el[funco] = str, this)
    } else {
      return this.el[funco]
    }
  }
  // the brain of the html function
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

// for handling the attributes
pen.fn.attr = function (attribute, value) {
  if (exists(attribute)) {
    if (type(attribute) === 'object') {
      // if it's an object then handle it
      exists(attribute.id) ? this.ID = attribute.id : this.CLASS = attribute.class
      return this.handleObject(attribute, function (prop, self) {
        self.attributes[prop] = attribute[prop]
        self.el.setAttribute(prop, attribute[prop])
        return self
      })
    } else if (exists(value)) {
      // this will set the instance of the id and class back in the main function
      if (attribute === 'id') {
        this.ID = value
      } else if (attribute === 'class') {
        this.CLASS = value
      }
      // for setting the attributes
      this.attributes[attribute] = value
      this.el.setAttribute(attribute, value)
      return this
    } else {
      // return the attribute if no value was passed
      return this.el.getAttribute(attribute)
    }
  } else {
    // return the attributes object
    return this.attributes
  }
}

// this is for the styling of the element
// this handles the css
pen.fn.css = function (rule, rules) {
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


// on and off handling of the addEventListener and removeEventListener of elements
// cross browser
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

// checks if the instances tag is the tag passed
pen.fn.is = function (tag) {
  return this.TAG === tag
}

// for appending children to the parent element
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

// appending the parent to another parent
pen.fn.appendTo = function (el) {
  el instanceof pen ? (this.PARENT = el.el, el.append(this.el)) : (this.PARENT = el, pen(el).append(this.el))
  return this
}

// removing the element since it's not working current for an unknown reason
// love ya developers of js
pen.fn.remove = function () {
  this.PARENT.removeChild(this.el)
  this.PARENT = void 0
  return this
}

// selecting the children
pen.fn.select = pen.fn.$ = function (el) {
  return this.el.querySelector(el)
}

// selecting all the children
pen.fn.selectAll = pen.fn.$$ = function (el) {
  return this.el.querySelectorAll(el)
}

// create an element inside of the parent
// takes two parameters
// the two are a must
// the first can be an object or string and runs it through the main function
// the second parameter allows to either return the parent or child that was created
pen.fn.create = pen.fn.createElement = function (el, ret) {
  el = pen(el)
  this.append(el)
  if (ret.match(/return parent/gi)) {
    return this
  } else if (ret.match(/return child/)) {
    var ref = this.CHILDREN
    for (var i = 0; i < ref.length; i++) {
      let child = ref[i]
      if (child === el.el) {
        child = pen(child)
        return child
      }
    }
  }
}


// NONE AT THE MOMENT
pen.fn.insertChildBefore = function (newNode, reference) {
  this.element.el.insertBefore(newNode, reference)
  return this
}

// NONE AT THE MOMENT
pen.fn.insertParentBefore = function (parentNode, referenceInParent) {
  parentNode.insertBefore(this.el.element, referenceInParent)
  return this
}


// this is the end of the code and allows for self passed events and attributes
;(function () {
  var attrs = 'id class href src contentEditable charset title rows cols'.split(/\s+/)
  var events = 'click keydown keyup keypress mousedown mouseup mouseover mousepress mouseout contextmenu dblclick'.split(/\s+/)
  events.forEach(function (eventp) {
    pen.fn[eventp] = function (...args) {
      return !exists(this.events[eventp]) ? this.on(eventp, [...args]) : this.off(eventp, [...args])
    }
  })
  attrs.forEach(function (attr) {
    pen.fn[attr] = function (str) {
      return !exists(str) ? this.attr(attr) : this.attr(attr, str)
    }
  })
})()

// module declaration
if (exists(module)) {
  if (exists(module.exports)) {
    if (exists(window)) {
      window.pen = pen
      window.exists = exists
      window.type = type
    }
  }
}
