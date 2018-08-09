/*
Author: Krorenshima
1 developer, 1 purpose
Pen allows for DOM Traversal and manipulation
*/

(function () {
let pen;


// the main start of pen, everything from here or it's helper fn's make pen possible
pen = function (el, ops = {}) {
  // so you won't have to initialize every time with "new (...)"
  if (!(this instanceof pen)) {return new pen(...arguments)}
  // if it's the same then no need to reprocess it
  if (el instanceof pen) {return el}
  this.el = el;
  pen.start(this);
}
// cc, camel case, removes spaces, dashes and lowerdashes through Regexp's
pen.cc = (x) => x.replace(/[_\- ](\w)/g, (whole, letter) => letter.toUpperCase());
// slices any array like objects
pen.slice = (x) => ([]).slice.call(x);

// a pipeline like fn that takes one argument and an array of functions
// arg: string, fns: [arg1[arg2[arg3[arg4[...]]]]]
pen.pipeline = (arg, ...fns) => {
  for (let i = 0, len = fns.length; i < len; i++) {
    arg = fns[i](arg);
  }
  return arg;
}

// gives out the typeof a variable better than the actual keyword built in to js
// obj = anything passed
pen.type = ((function () {
  let cls2Typ = {},
  names = ['Boolean','Number','String','Function','Array','Date','RegExp','Undefined','Null','Error','Symbol','Promise','NamedNodeMap','Map','NodeList','DOMTokenList','DOMStringMap','CSSStyleDeclaration'];
  for (let i = 0, len = names.length; i < len; i++) cls2Typ[`[object ${names[i]}]`] = names[i].toLowerCase();
  return (obj) => cls2Typ[({}).toString.call(obj)] || 'object';
})());

// checks if array's, strings, objects or regular expression's are empty
pen.empty = (arg) => {
  switch (pen.type(arg)) {
    case 'array':
    case 'string':
      return arg.length === 0;
    case 'object':
      if (Object.keys != null) {
        return Object.keys(arg).length === 0 && arg.constructor === Object;
      } else {
        for (let prop in arg) {if (arg.hasOwnProperty(prop)) {return !1}}
        return JSON.stringify(arg) === JSON.stringify({});
      }
      break;
    case 'regexp':
      return arg.source.length === 0;
  }
}

// randomizes choice within an array passed
pen.random = (x) => x[Math.floor(Math.random() * x.length)];

// checks if and converts a string into a regular expression
pen.check = (reg, flg) => ('string' === pen.type(reg) ? new RegExp(reg, (flg||'gi')) : reg);

/**
Parses any string passed through, it's what makes:
'<p class="pen" id="whatnot">some text</p>' -> 'class: "pen", id:"whatnot"',
possible for pen through a carfully made regular expression
*/
pen.parse = (str) => {
  let data = {},
  res = str.match(/([^\n ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi);

  // checks to see if res is either null or empty else return nothing and stop parsing
  if (res == null || (pen.empty(res))) {return null}
  for (let i = 0, len = res.length, lock, eqalPos; i < len; i++) {
    // changes substrings 'name=content' into object format: name:"content"
    lock = res[i];
    if (lock.includes('=')) {
      eqalPos = lock.search(/=/);
      data[(lock.substr(0, eqalPos))] = (lock.substr(eqalPos+1)).replace(/["']/g, '');
    }
  }
  return (!pen.empty(data) ? data : null);
}

/*
* A recursive function that takes in a "this" object and 2 objects containing information
* basically makes css and attribute parsing possible for whenever you want to set
* stuff like this for css:
* {background: 'rgb(255,155,155)', font: {family: 'Arial', weight: 'bold'}}
* into:
* background: rgb(255,155,155);
* font-family: Arial;
* font-weight: bold;
*/
pen.fracture = (it, propz, props, nm) => {
  let pz = pen.type(it.el[propz]), res, prop;
  for (prop in props) {
    res = nm != null ? `${nm}-${prop}` : prop;
    if (pen.type(props[prop]) === 'object') {
      pen.fracture(it, propz, props[prop], res);
    } else {
      pz === 'function' ? it.el[propz](res, props[prop]) : it.el[propz][res] = props[prop];
    }
  }
  return it;
}

// Allows <(...) (...)>(...)</(...)> to be possible
// tag = (...), attrs = {...}, text = (...)
pen.parseEl = (str) => {
  let stTag, tag, attribs, text;

  stTag = str.substr(str.search(/</), str.search(/>/)+1);
  tag = stTag.substr(stTag.search(/</)+1, stTag.search((/<([^\n ]+)>/).test(stTag) ? />/ : / /)-1);
  attribs = stTag.substr(stTag.search(/ /)+1, stTag.search(/>/));
  text = str.substr(stTag.length, str.search(/<\//));

  attribs = attribs === `<${tag}` ? null : attribs;
  text = text === stTag ? null : !pen.empty(text) ? text : null;

  return {attrs: attribs, tag, text};
}

// Basically auto parses whatever is passed and hands it off
pen.handoff = (el, pr = !1) => (pr ? pen(el) : el);

// $, I think you may already know
pen.$ = (el, pr) => (pen.type(el) === 'string' ? pen.handoff(document.querySelector(el), pr) : el);
// $$, same here
pen.$$ = el => document.querySelectorAll(el);
// base creates elements
pen.create = (el, pr) => pen.handoff(document.createElement(el), pr);

pen.all = (arr, action, ...data) => {
  for (let i = 0, len = arr.length; i < len; i++) {arr[i][action](...data)}
}
pen.display = (selec, data) => {
  let el = pen.$(selec, true);
  el.text = el.text.replace(/-([^\n]*?)-/g, (whole, word) => data[word]);
}
pen.start = (it) => {
  if (pen.type(it.el) === 'string') {
    if (it.el.startsWith('<')) {
      let data = pen.parseEl(it.el);
      it.el = pen.create(data.tag);
      if (data.attrs != null) {
        let omage = pen.parse(data.attrs);
        if (omage != null) {it.attr(omage)}
      }
      if (data.text != null && (!pen.empty(data.text))) {
        it.html(text, {parse:!0})
      }
    } else {
      it.el = pen.$(it.el);
    }
  }
  if (it.el == null) {return};
  it.el = it.tag === 'template' ? it.el.content : it.el;
  it.cusOps = {};
  switch (true) {
    case it.el instanceof Document:
      pen.prototype.ready = function () {
        it.on('DOMContentLoaded', ...arguments);
        return it;
      };
    break;
    case it.el instanceof Window:
      it.doc = it.el.document;
    break;
    case it.tag === 'template':
      pen.prototype.clone = function () {
        document.importNode(...arguments);
        return it;
      };
    break;
    case it.tag === 'canvas':
      it.ctx = it.context = it.el.getContext('2d');
    break;
  }
  return this;
}
pen.fn = pen.prototype = {
  constructor: pen,
  toString() {return this.selector},
  get tag () {
    // Why this is like this because IOS or "Safari" for does not parse certain element tags
    // fitting because apple is like the stone age of tech
    return (this.el.tagName||'UNPARSED-OR-IOS-ELEMENT').toLowerCase();
  },

  get text () {
    return this.html();
  },
  set text (x) {
    return this.html(x);
  },

  // CHILDREN
  // getter, grabs all the child elements, parses and allows easy access to change and manipulate
  // setter, appends anything that is passed as an array or singularity
  get children () {
    let children = pen.slice(this.el.children),
    i = 0, len = children.length;
    for (; i < len; i++) {
      children[i] = pen(children[i]);
    }
    return children;
  },
  set children (els) {
    this.append(...els);
    return this;
  },

  // PARENT
  // getter, easily displays the parent node
  // setter, sets the parent
  get parent () {
    return this.el.parentNode || null;
  },
  set parent (el) {
    return this.appendTo(el);
  },

  // CLASSES
  // get, shows all the classes
  // set, sets all the classes passed within array or singularity
  get classes () {
    return pen.slice(this.el.classList);
  },
  set classes (cls) {
    return this.toggle(cls);
  },

  get attrs () {
    let ars = {}, attrs = pen.slice(this.el.attributes);
    for (let i = 0, len = attrs.length; i < len; i++) {
      ars[attrs[i].name] = attrs[i].value;
    }
    return ars;
  },
  set attrs (obj) {
    return this.attr(obj);
  },

  get selector () {
    let attrs = this.attrs, str = '', attrN,
    id = this.attr('id') != null ? `#${this.attr('id')}` : '',
    cls = this.attr('class') != null ? `.${this.classes.join('.')}` : '';
    for (attrN in attrs) {
      if (!(/class|id|style/i).test(attrN)) {
        str += `[${attrN}="${attrs[attrN]}"]`;
      }
    }
    return `${this.tag}${id}${cls}${(pen.empty(str) ? '' : str)}`;
  },

  get size () {
    return this.el.getBoundingClientRect();
  },

  get hidden () {
    return this.css('display') === 'none';
  },

  get ops () {
    return {parseIt:(this.cusOps.parseIt || !1), app:(this.cusOps.app || !1), parse:(this.cusOps.parse || !1)};
  },
  set ops (ops) {
    let res = ops != null;
    this.cusOps = {
      parseIt:(res?(ops.parseIt||!1):!1),
      app:(res?(ops.app||!1):!1),
      parse:(res?(ops.parse||!1):!1)
    }
    return this.cusOps;
  },

  html (str, ops) {
    let {parse, app} = ops == null ? (!pen.empty(this.cusOps) ? this.cusOps : this.ops) : ops;
    let res = this.tag === 'input' || this.tag === 'option' ? 'value' : (parse ? 'innerHTML' : 'innerText');
    if (!pen.pipeline(arguments, pen.slice, pen.empty)) {
      res2 = app ? this.el[res]+str : str;
      this.el[res] = res2;
      if (this.tag === 'option') {this.el.innerHTML = this.el[res]}
      return this;
    } else {
      return this.el[res];
    }
  },
  attr (attr, value) {
    if (attr != null) {
      // if typeof attr is an object then call a function to handle objects and call the curried function
      // else if value isn't null then set the attribute and return 'this' else return the attribute given
      switch (true) {
        case pen.type(attr) === 'object':
          return pen.fracture(this, 'setAttribute', attr);

        case value != null:
          this.el.setAttribute(attr, value);
          return this;

        default:
          return this.el.getAttribute(attr);
      }
    } else {
      return this.attrs;
    }
  },
  css (rule, rules) {
    if (rule != null) {
      switch (true) {
        case pen.type(rule) === 'object':
          return pen.fracture(this, 'style', rule);

        case rules != null:
          this.el.style[pen.cc(rule)] = rules;
          return this;

        default:
          return this.el.style[rule];
      }
    } else {
      return this.el.style;
    }
  },
  on (evtp, cb, cp, name) {
    cp = cp || !1;
    this.el.events = this.el.events || {};
    this.el.addEventListener(evtp, cb, cp);
    this.el.events[evtp] = {capture:cp};
    this.el.events[evtp][name!=null?name:(cb.name||'func')] = cb;
    return this;
  },
  off (evtp, cb, name) {
    this.el.removeEventListener(evtp, (name!=null?this.el.events[evtp][name]:cb));
    delete this.el.events[evtp][name!=null?name:(cb.name||'func')];
    return this;
  },
  append (...elements) {
    for (let i = 0, len = elements.length, el; i < len; i++) {
      el = pen.$(elements[i]);
      this.el.appendChild((el instanceof pen ? el.el : el));
    }
    return this;
  },
  appendTo (el) {
    pen(el).append(this);
    return this;
  },
  remove () {
    args = pen.slice(arguments);
    if ('boolean' === pen.type(args[0])) {
      if (args[0]) {
        if (this.parent != null)
          this.parent.removeChild(this.el);
        else
          throw new Error("This element has no parent");
      }
    } else {
      for (let i = 0, len = args.length, el; i < len; i++) {
        el = pen.$(args[i]);
        this.el.removeChild((el instanceof pen ? el.el : el));
      }
    }
    return this;
  },
  $ (qur) {
    return pen.handoff(this.el.querySelector(qur), this.ops.parseIt);
  },
  $$ (qur) {
    return this.el.querySelectorAll(qur);
  },
  create (el, ret) {
    el = pen(el);
    this.append(el);
    return ret === 'parent' ? this : ret === 'child' ? el : this
  },
  toggle (...classes) {
    classes.forEach(cls => this.el.classList.toggle(cls));
    return this;
  },
  hasClass (cls) {
    for (let i = 0, len = this.classes.length; i < len; i++) {if (this.classes[i] === cls) {return true}}
    return !1;
  }
}
window.pen = pen; window.pDoc = pen(document); window.pWin = pen(window);
if (document.body) {
  window.body = document.body; window.head = document.head;
  window.pHead = pen(head); window.pBody = pen(body);
} else {
  document.addEventListener('DOMContentLoaded',()=>{
    window.body = document.body; window.head = document.head;
    window.pHead = pen(head); window.pBody = pen(body);
  }, {once:true});
}
}).call(this);
