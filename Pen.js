(function () {
let pen;

pen = function (el, ops = {}) {
  if (!(this instanceof pen)) {return new pen(...arguments)}
  if (el instanceof pen) {return el}
  this.el = el;
  pen.start(this);
}
pen.cc = (x) => x.replace(/[_\- ](\w)/g, (whole, letter) => letter.toUpperCase());
pen.slice = (x) => ([]).slice.call(x);
pen.pipeline = (arg, ...fns) => {
  for (let i = 0, len = fns.length; i < len; i++) {
    arg = fns[i](arg);
  }
  return arg;
}
pen.type = ((function () {
  let cls2Typ = {},
  names = ['Boolean','Number','String','Function','Array','Date','RegExp','Undefined','Null','Error','Symbol','Promise','NamedNodeMap','Map','NodeList','DOMTokenList','DOMStringMap','CSSStyleDeclaration'];
  for (let i = 0, len = names.length; i < len; i++) cls2Typ[`[object ${names[i]}]`] = names[i].toLowerCase();
  return (obj) => cls2Typ[({}).toString.call(obj)] || 'object';
})());
pen.empty = (arg) => {
  switch (pen.type(arg)) {
    case 'array':
    case 'string':
      return arg.length === 0;
    case 'object':
      if (Object.keys != null) {
        return Object.keys(arg).length === 0 && arg.constructor === Object;
      } else {
        for (let prop in arg) {if (arg.hasOwnProperty(prop)) {return false}}
        return JSON.stringify(arg) === JSON.stringify({});
      }
      break;
    case 'regexp':
      return arg.source.length === 0;
  }
}
pen.random = (x) => x[Math.floor(Math.random() * x.length)];
pen.check = (reg, flg) => (pen.type(reg) === 'string' ? new RegExp(reg, (flg||'gi')) : reg);
pen.parse = (str) => {
  let data = {},
  res = str.match(/([^\n ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi);
  if (res == null || (pen.empty(res))) {return null}
  for (let i = 0, len = res.length, lock, eqalPos; i < len; i++) {
    lock = res[i];
    if (lock.includes('=')) {
      eqalPos = lock.search(/=/);
      data[(lock.substr(0, eqalPos))] = (lock.substr(eqalPos+1)).replace(/["']/g, '');
    }
  }
  return (!pen.empty(data) ? data : null);
}
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
pen.handoff = (el, pr = !1) => (pr ? pen(el) : el);
pen.$ = (el, pr) => (pen.type(el) === 'string' ? pen.handoff(document.querySelector(el), pr) : el);
pen.$$ = el => document.querySelectorAll(el);
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
    return (this.el.tagName||'UNPARSED-OR-IOS-ELEMENT').toLowerCase(); //whythisisneededisbecausewebkitforsafarisucksandiossucks
  },

  get text () {
    return this.html();
  },
  set text (x) {
    return this.html(x);
  },

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

  get parent () {
    return this.el.parentNode || null;
  },
  set parent (el) {
    return this.appendTo(el);
  },

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
      if (!/class|id|style/i.test(attrN)) {
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
    cp = cp || false;
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
    if (pen.empty(elements)) {
      throw new Error(`No elements passed`);
    }
    for (let i = 0,len = elements.length, element; i < len; i++) {
      element = pen.$(elements[i]);
      this.el.appendChild((element instanceof pen ? element.el : element));
    }
    return this;
  },
  appendTo (el) {
    pen(el).append(this);
    return this;
  },
  remove () {
    if (this.parent != null) {
      this.parent.removeChild(this.el);
    } else {
      throw new Error(`Couldn't remove ${this}`);
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
    for (let i = 0, len = classes.length; i < len; i++) {
      this.el.classList.toggle(classes[i]);
    };
    return this;
  },
  hasClass (cls) {
    for (let i = 0, len = this.classes.length; i < len; i++) {if (this.classes[i] === cls) {return true}}
    return false;
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
