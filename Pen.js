/**
Defines pen.

1 developer, 1 purpose
@author Krorenshima
@link https://cdn.jsdelivr.net/gh/Krorenshima/Pen@master/Pen.js
@since 3.26.17
*/

(function () {
  let pen;
  pen = function (el, ops = {}) {
    if (!(this instanceof pen)) {return new pen(el, ops)}
    if (el instanceof pen) {return el}
    this.el = el;
    return pen.start.call(this);
  }
  pen.cc = (x) => x.replace(/[_\- ](\w)/g, (whole, letter) => letter.toUpperCase());
  pen.slice = (x) => ([]).slice.call(x);
  pen.pipeline = (arg, pn = !1, ...fns) => {
    for (let fn of fns) {
      arg = pen.type(fn) === 'string' ? (pn ? pen : window)[fn](arg) : fn(arg);
    }
    return arg;
  }
  pen.type = ((function () {
    let cls2Typ = {}, names = ['Boolean','Number','String','Function','Array','Date','RegExp','Undefined','Null','Error','Symbol','Promise','NamedNodeMap','Map','NodeList','DOMTokenList','DOMStringMap','CSSStyleDeclaration'];
    for (let i = 0, len = names.length; i< len; i++) {cls2Typ[`[object ${names[i]}]`] = names[i].toLowerCase()}
    return (obj) => cls2Typ[({}).toString.call(obj)] || 'object';
  })());
  pen.empty = (arg) => {
    switch (pen.type(arg)) {
      case 'array': case 'string': return arg.length === 0;
      case 'object':
        if (Object.keys != null) {
          return Object.keys(arg).length === 0 && arg.constructor === Object;
        } else {
          for (let prop in arg) {if (arg.hasOwnProperty(prop)) {return !1}}
          return JSON.stringify(arg) === "{}";
        }
      case 'regexp': return arg.source.length === 0;
      default: console.error('Unknown type || cannot calculate size');
    }
  }
  pen.random = (x) => x[Math.floor(Math.random() * x.length)];
  pen.check = (reg, flg = 'gi') => ('string' === pen.type(reg) ? new RegExp(reg, flg) : reg);
  pen.parse = (str) => {
    let data = {},
    res = str.match(/([^\n ]*?)=(['"]([^\n'"]*?)['"]|(true|false|yes|no))/gi);
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
  pen.fracture = function (propz, props, nm) {
    let pz = pen.type(this.el[propz]), res, prop;
    for (prop in props) {
      res = nm != null ? `${nm}-${prop}` : prop;
      if ('object' === pen.type(props[prop])) {
        pen.fracture.call(this, propz, props[prop], res);
      } else {
        pz === 'function' ? this.el[propz](res, props[prop]) : this.el[propz][res] = props[prop];
      }
    }
    return this;
  }
  pen.parseEl = (str, nmthd = !1) => {
    if (nmthd) {
      let dt = (new window.DOMParser()).parseFromString(str, 'text/html').body.children;
      dt = pen.slice(dt); dt = dt.length === 1 ? dt[0] : dt;
      return dt;
    }
    let stTag, tag, attribs, text;

    stTag = str.substr(str.search(/</), str.search(/>/)+1);
    tag = stTag.substr(stTag.search(/</)+1, stTag.search((/<([^\n ]+)>/).test(stTag) ? />/ : / /)-1);
    attribs = stTag.substr(stTag.search(/ /)+1, stTag.search(/>/));
    text = str.substr(stTag.length, str.search(/<\//));

    attribs = attribs === `<${tag}` ? null : attribs;
    text = text === stTag ? null : !pen.empty(text) ? text : null;
    return {attrs: attribs, tag, text};
  }
  pen.handoff = (el, pr = !1) => pr ? pen(el) : el;
  pen.$ = (el, pr) => pen.type(el) === 'string' ? pen.handoff(document.querySelector(el), pr) : el;
  pen.$$ = (el, pr) => {
    let res = pen.type(el) === 'string' ? document.querySelectorAll(el) : el,
    akun = [];
    for (let i = 0, len = res.length; i < len; i++) {akun.push(pen.handoff(res[i], pr))}
    return akun;
  }
  pen.create = (el, pr) => pen.handoff(document.createElement(el), pr);
  pen.all = (arr, action, ...dt) => {for (let i = 0, len = arr; i < len; i++) {arr[i][action](...dt)}}
  pem.inst = (el) => el instanceof pen ? el.el : el;
  pen.display = (selec, data) => {
    let el = pen.$(selec, !0);
    el.text = el.text.replace(/-([^\n]*?)-/g, (whole, word) => data[word]);
  }
  pen.start = function () {
    if (pen.type(this.el) === 'string') {
      if (!this.el.includes('<')) {
        this.el = pen.$(this.el);
      } else {
        let data = pen.parseEl(this.el);
        this.el = pen.create(data.tag);
        if (data.attrs != null) {let omage = pen.parse(data.attrs);if (omage != null) {this.attr(omage)}}
        if (data.text != null && (!pen.empty(data.text))) {this.html(text, {parse: !0})}
      }
    } else {
      this.el = pen.$(this.el);
    }
    if (this.el == null) {console.warn("Was not able to recieve data.");return}
    this.el = this.tag === 'template' ? this.el.content : this.el;
    this.cusOps = {}
    switch (!0) {
      case this.el instanceof Document:
        pen.prototype.ready = function () {
          this.on('DOMContentLoaded', ...arguments);
          return this;
        }
      break;
      case this.el instanceof Window:
        this.doc = this.el.document;
      break;
      case this.tag === 'template':
        pen.prototype.clone = function () {
          document.importNode(...arguments);
          return this;
        }
      break;
      case this.tag === 'canvas':
        this.ctx = this.context = this.el.getContext('2d');
      break;
    }
    return this;
  }
  pen.fn = pen.prototype = {
    constructor: pen,
    toString() {return this.selector},
    get tag () {return (this.el.tagName||'UNPARSED-OR-IOS-ELEMENT').toLowerCase()},

    get text () {return this.html()},
    set text (x) {this.html(x)},

    get children () {let children = pen.slice(this.el.children);for (let i = 0, len = children.length; i < len; i++) {children[i] = pen(children[i])}return children},
    set children (els) {if (pen.type(els) !== 'array') {throw new Error("Must be an array.")}this.append(...els)},

    get offset () {return {left: this.el.offsetLeft, top: this.el.offsetTop, width: this.el.offsetWidth, height: this.el.offsetHeight}},

    get center () {return {x: this.offset.left + this.offset.width / 2, y: this.offset.top + this.offset.height / 2}},

    get parent () {return this.el.parentNode || null},
    set parent (x) {this.appendTo(x)},

    get classes () {return pen.slice(this.el.classList)},
    set classes (x) {return this.toggle(x)},

    get attrs () {
      let ars = {}, attrs = pen.slice(this.el.attributes);
      for (let ar of attrs) {ars[ar.name] = ar.value}
      return ars;
    },
    set attrs (obj) {this.attr(obj)},

    get selector () {
      let attrs = this.attrs, str = '', attrN,
      id = this.attr('id') != null ? `#${this.attr('id')}` : '',
      cls = this.attr('class') != null ? `.${this.classes.join('.')}` : '';
      for (attrN in attrs) {if (!(/class|id|style/i).test(attrN)) {str += `[${attrN}="${attrs[attrN]}"]`}}
      return `${this.tag}${id}${cls}${(pen.empty(str) ? '' : str)}`;
    },

    get size () {return this.el.getBoundingClientRect()},

    get hidden () {return this.css('display') === 'none'},

    get ops () {return {parseIt:(this.cusOps.parseIt || !1), app:(this.cusOps.app || !1), parse:(this.cusOps.parse || !1)}},
    set ops (ops) {
      let res = ops != null;
      this.cusOps = {parseIt:(res?(ops.parseIt||!1):!1),app:(res?(ops.app||!1):!1),parse:(res?(ops.parse||!1):!1)}
      return this.cusOps;
    },

    get siblings () {return {next: this.el.nextSibling, previous: this.el.previousSibling}},

    clone (deep = !0, pn) {
      return pen.handoff(this.el.cloneNode(deep), pn);
    },
    html (str, ops) {
      let parse, app, res;
      ({parse, app} = ops == null ? (!pen.empty(this.cusOps) ? this.cusOps : this.ops) : ops);
      res = this.tag === 'input' || this.tag === 'option' ? 'value' : (parse ? 'innerHTML' : 'innerText');
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
        switch (true) {
          case 'object' === pen.type(attr):
            return pen.fracture.call(this, 'setAttribute', attr);
          case 'boolean' === pen.type(value):
            this.el.removeAttribute(attr);
            return this;
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
          case 'object' === pen.type(rule):
            return pen.fracture.call(this, 'style', rule);
          case 'boolean' === pen.type(rules):
            this.el.style[pen.cc(rule)] = '';
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
      cp = cp != null ? cp : !1;
      this.el.events = this.el.events || {};
      this.el.addEventListener(evtp, cb, cp);
      this.el.events[evtp] = {capture:cp};
      this.el.events[evtp][name!=null?name:(cb.name||'func')] = cb;
      return this;
    },
    off (evtp, name, cb) {
      this.el.removeEventListener(evtp, (name!=null?this.el.events[evtp][name]:cb));
      delete this.el.events[evtp][name!=null?name:(cb.name||'func')];
      return this;
    },
    fire (info) {
      return this.el.dispatchEvent(info);
    },
    insert (boa = !0, ref, ...els) {
      ref = !(ref instanceof pen) ? pen(ref) : ref;
      let r = 'string' === pen.type(boa) ? ('before'===boa?ref.el:ref.siblings.next) : (boa?ref.el:ref.siblings.next);
      for (let el of els.length) {
        el = pen.$(el);
        ref.parent.insertBefore(pen.inst(el), r);
      }
      return this;
    },
    append (...elements) {
      for (let i = 0, len = elements.length, el; i < len; i++) {
        el = pen.$(elements[i]);
        this.el.appendChild(pen.inst(el));
      }
      return this;
    },
    appendTo (el) {
      // Temporary fix
      el = pen.type(el) === 'string' ? pen.$(el, !0) : el;
      pen(el).append(this);
      return this;
    },
    remove () {
      args = pen.slice(arguments);
      if ('boolean' === pen.type(args[0])) {
        if (!args[0]) {return this}
        if (this.parent != null)
          this.parent.removeChild(this.el);
        else
          console.warn("This element ("+this+") has no parent");
      } else {
        if (args.length === 1 && pen.type(args[0]) === 'string' && args[0] === 'all') {
          for (let child of this.children) {child.remove(!0)}
          return this;
        }
        for (let el of args) {
          switch (true) {
            case 'object' === pen.type(el) && el instanceof pen:
              el.remove(!0);
              break;
            case 'object' === pen.type(el) && !(el instanceof pen):
              el.parentNode.removeChild(this.el);
              break;
            default:
              el = pen.$(el);
              if (el == null) {console.warn(`Couldn't find ${el}`);continue}
              this.el.removeChild(pen.inst(el));
          }
        }
      }
      return this;
    },
    $ (qur, pIt) {
      op = pIt != null ? pIt : this.ops.parseIt;
      return pen.handoff(this.el.querySelector(qur), op);
    },
    $$ (qur, pIt) {
      op = pIt != null ? pIt : this.ops.parseIt;
      let res = this.el.querySelectorAll(qur), arr = [];
      for (let r of res) {arr.push(pen.handoff(r), op)}
      return arr;
    },
    create (el, ret) {
      el = pen(el);
      this.append(el);
      return ret === 'parent' ? this : ret === 'child' ? el : this
    },
    toggle (...classes) {
      for (let cls of classes) {this.el.classList.toggle(cls)}
      return this;
    },
    hasClass (cls) {
      for (let clss of this.classes) {if (clss === cls) {return !0}}
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
})(this);
