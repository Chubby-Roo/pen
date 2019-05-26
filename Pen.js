/**
Defines pen.

1 developer, 1 purpose
@author Krorenshima
@link https://cdn.jsdelivr.net/gh/Krorenshima/Pen@master/Pen.js
@since 3.26.17
*/

(function () {
  // just to make it a little easier, though may not be recommended, if there's bugs
  if (!Object.prototype.hasOwnProperty(Object.prototype, 'inherit')) {
    Object.defineProperty(Object.prototype, 'inherit', {
      writeable: !1,
      value (parent, ...ptinfo) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
        if (ptinfo.length > 0) {Object.assign(this.prototype, ...ptinfo)}
        return this;
      }
    })
  }
  if (!Map.prototype.hasOwnProperty('arrayify')) {
    Object.defineProperties(Map.prototype, {
      arrayify: {
        writeable: !0,
        value () {
          let it = this.entries(), res, arr;
          res = it.next();
          while (!res.done) {
            arr.push(res.value);
            res = it.next();
          }
          return arr;
        }
      },
      filter: {
        writeable: !0,
        value (flt) {
          if ('function' !== typeof(flt)) {throw new TypeError("The first argument must be a function")}
          let nmp = new Map(); // a play on npm haaaaaaaaaaaaaaaa
          this.forEach((v,k,m) => {
            let resp = flt(v,k,m);
            if ('boolean' === typeof(resp)) {
              if (resp) {nmp.set(k,v)}
            } else {
              nmp.set(k,resp);
            }
          });
          return nmp;
        }
      },
      map: { //totally not contridictory ha
        writeable: !0,
        value (fn) {
          if ('function' !== typeof(flt)) {throw new TypeError("The first argument must be a function")}
          let nmp = new Map(); // a play on npm haaaaaaaaaaaaaaaa
          this.forEach((v,k,m) => {
            let resp = fn(v,k,m);
            nmp.set(k,resp);
          });
          return nmp;
        }
      }
    });
  }
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
  pen.insOf = function (it) {return it instanceof pen}
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
    if ('string' !== pen.type(el)) {return pen.handoff(el, pr)}
    let res, akun;
    res = document.querySelectorAll(el);
    akun = [];
    for (let i = 0, len = res.length; i < len; i++) {akun.push(pen.handoff(res[i], pr))}
    return akun;
  }
  pen.create = (el, pr) => pen.handoff(document.createElement(el), pr);
  pen.all = (arr, action, ...dt) => {for (let i = 0, len = arr; i < len; i++) {arr[i][action](...dt)}}
  pen.inst = (el) => el instanceof pen ? el.el : el;
  pen.display = (selec, data) => {
    let el = pen.$(selec, !0);
    el.text = el.text.replace(/-([^\n]*?)-/g, (whole, word) => data[word]);
  }
  pen.mid = function (x, y, by = 2, mthd = 0) {
    switch (true) {
      case x === y:
        return x;

      case by === 0:
        return x;

      case mthd === 0:
        return x + y / 2;

      case mthd === 1:
        return (x + y) / 2;

      default:
        return (x + y) / 2;
    }
  }
  pen.start = function () {
    if (pen.type(this.el) === 'string') {
      if (!this.el.includes('<')) {
        this.el = pen.$(this.el);
      } else {
        let data = pen.parseEl(this.el);
        this.el = pen.create(data.tag);
        if (data.attrs != null) {let omage = pen.parse(data.attrs);if (omage != null) {this.attr(omage)}}
        if (data.text != null && (!pen.empty(data.text))) {this.html(data.text, {parse: !0})}
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
        this.width = this.w = this.el.width;
        this.height = this.h = this.el.height;
        Object.defineProperty(this, 'resize', {
          writeable: !1,
          value (w, h) {
            w = w || 0;
            h = h || w;
            this.el.width = w;
            this.el.height = h;
            this.width = this.w = this.el.width;
            this.height = this.h = this.el.height;
            return this;
          }
        });
      break;
      case this.tag === 'form':
      // inputvns - input name's & value's
        Object.defineProperty(this, 'inputvns', {
          get () {
            let elsf = this.el.elements, olp = {};
            for (let i = 0, len = elsf.length, moo; i < len; i++) {
              moo = elsf[i];
              if (pen.empty(moo.name)) {continue}
              if (olp[moo.name] != null) {
                olp[moo.name+i] = !pen.empty(moo.value) ? moo.value : moo.name;
              } else {
                olp[moo.name] = !pen.empty(moo.value) ? moo.value : moo.name;
              }
            }
            return olp;
          }, enumerable: !0
        });
      break;
      case this.tag === 'audio' || this.tag === 'video':
        pen.prototype.nsrc = function (src, typ) {
          let mosu = pen('<source>');
          mosu.attr('src', src);
          if (typ == null) {
            switch (true) {
              case src.endsWith('mp3'):
                mosu.attr('type', 'audio/mpeg');
              break;
              case src.endsWith('ogg'):
                mosu.attr('type', 'audio/ogg');
            }
          }
          this.append(mosu);
          return this;
        }
        Object.defineProperties(this, {
          sources: {
            get () {
              let children = this.children, arr = [];
              for (let i = 0, len = children.length; i < len; i++) {
                arr.push(children[i].attr('src'));
              }
              return arr;
            }, enumerable: !0
          },

          time: {
            get () {return this.el.currentTime},
            set (x) {this.el.currentTime = x}, enumerable: !0, changeable: !0
          },

          duration: {
            get () {return this.el.duration}, enumerable: !0
          },

          ended: {
            get () {return this.el.ended}, enumerable: !0
          },

          looping: {
            get () {return this.el.loop},
            set (x) {this.el.loop = x}, enumerable: !0, changeable: !0
          },

          speed: {
            get () {return this.el.playbackRate},
            set (x) {this.el.playbackRate = x}, enumerable: !0, changeable: !0
          },

          persevePitch: {
            get () {return this.el.preservesPitch},
            set (x) {this.el.preservesPitch = x}, enumerable: !0, changeable: !0
          },

          preload: {
            get () {return this.el.preload},
            set (x) {this.el.preload = x}, enumerable: !0, changeable: !0
          },

          source: {
            get () {return this.el.currentSrc}, enumerable: !0
          },

          volume: {
            get () {return this.el.volume},
            set (x) {this.el.volume = x}, enumerable: !0, changeable: !0
          },

          paused: {
            get () {return this.el.paused}, enumerable: !0
          },

          titles: {
            get () {return this.sources.map(srcs => srcs.split('/').slice(-1)[0])}, enumerable: !0
          },

          play: {
            value () {
              if (!this.paused) {console.warn('Already playing');return this}
              this.el.play();
              return this;
            }
          },

          pause: {
            value () {
              if (this.paused) {console.warn('Already paused');return this}
              this.el.pause();
              return this;
            }
          },

          toggleA: {
            value () {
              this[this.paused ? 'play' : 'pause']();
              return this;
            }
          },

          set: {
            value (typ, val) {
              if (!/speed|volume|looping/i.test(typ)) {console.warn("Only allowed to change speed, volume or if its looping"); return this}
              this[typ] = val;
              return this;
            }
          }
        });
      break;
    }
    return this;
  }
  pen.ok = function (status) {
    return (status === 200 || status === 202);
  }
  pen.ajax = function (ops) {
    let xml = new window.XMLHttpRequest();

    ops.progress = ops.progress != null ? ops.progress : function (ov) {console.log(ov.lengthComputable ? ((ov.loaded / ov.total * 100)+'%') : "Can't compute progress")};
    ops.load = ops.load != null ? ops.load : function (ov) {console.log('Transfer complete.\n', ov)};
    ops.error = ops.error != null ? ops.error : function (ov) {console.log("An error has occurred\n"+ov)};
    ops.cancel = ops.cancel != null ? ops.cancel : function (ov) {console.log("The transfer was canceled\n"+ov)};
    ops.data = ops.data != null ? ops.data : {};
    ops.type = ops.type != null ? ops.type : 'GET';

    xml.addEventListener('progress', ops.progress);
    xml.addEventListener('load', function (ev) {
      if (pen.ok(this.status, this.readyState)) {
        ops.load.call(this, this.response, ev);
      } else {
        console.error("Status was faulty", this.status);
      }
    });
    xml.addEventListener('error', ops.error);
    xml.addEventListener('abort', ops.cancel);
    if ((ops['progressUpld'] != null && ops['loadUpld'] != null && ops['errorUpld'] != null && ops['cancelUpld'] != null) === true) {
      xml.upload.addEventListener('progress', ops.progressUpld);
      xml.upload.addEventListener('load', function (ev) {
        if (pen.ok(this.status, this.readyState)) {
          ops.loadUpld.call(this, this.response, ev);
        } else {
          console.error("Status was faulty", this.status);
        }
      });
      xml.upload.addEventListener('error', ops.errorUpld);
      xml.upload.addEventListener('abort', ops.cancelUpld);
    }

    if (ops.override) xml.overrideMimeType(ops.override);
    if (ops.typer) xml.responseType = ops.typer;
    let res = (function () {
      if (pen.type(ops.data) === 'string') {
        return ops.data;
      } else {
        if (!pen.empty(ops.data)) {
          let s = [];
          for (let prof in ops.data) {
            s.push(`${prof}=${ops.escape ? window.escape(ops.data[prof]) : ops.data[prof]}`);
          }
          return ops.type === 'POST' ? s.join('&') : ops.url + '?' + s.join('&') ;
        } else {
          return ops.url;
        }
      }
    })();

    xml.open(ops.type, (ops.type === 'POST' ? ops.url : res), (ops.sync || true), (ops.user || null), (ops.password || null));
    if (ops.callback) {xml.callback = ops.callback}
    if (ops.fpath) {xml.filepath = ops.fpath}
    if (ops.hdr && ops.hdr.length > 1) xml.setRequestHeader(...ops.hdr);
    xml.send((ops.type === 'POST' ? res : null));
    return xml;
  }
  pen.fn = pen.prototype = {
    constructor: pen,
    toString() {return this.selector},
    get tag () {return (this.el.tagName||'UNPARSED-OR-IOS-ELEMENT').toLowerCase()},

    get text () {return this.html()},
    set text (x) {this.html(x)},
    get children () {
      let children = pen.slice((this.tag === 'form' ? this.el.elements : this.el.children));
      for (let i = 0, len = children.length; i  < len; i++) {
        children[i] = pen(children[i]);
      }
      return children
    },
    set children (els) {if (pen.type(els) !== 'array') {throw new Error("Must be an array.")}this.append(...els)},

    get offset () {return {left: this.el.offsetLeft, top: this.el.offsetTop, width: this.el.offsetWidth, height: this.el.offsetHeight}},

    get center () {return {x: this.offset.left + this.offset.width / 2, y: this.offset.top + this.offset.height / 2}},

    get selection () {return {start: this.el.selectionStart, end: this.el.selectionEnd}},
    set selection (arr) {this.el.setSelectionRange(...arr)},

    get parent () {return this.el.parentNode || null},
    set parent (x) {this.appendTo(x)},

    get data () {return this.el.dataset},

    get events () {return this.el.events},

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
      res = /input|option|textarea/i.test(this.tag) ? 'value' : parse ? 'innerHTML' : this.el['textContent'] != null ? 'textContent' : 'innerText';
      if (!pen.pipeline(arguments, pen.slice, pen.empty)) {
        let res2 = app ? this.el[res]+str : str;
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
            break;
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
      this.el.addEventListener(evtp, (e) => {cb.call(this, e, this)}, cp);
      this.el.events[evtp] = {}
      this.el.events[evtp][name != null ? name : (cb.name || 'func')] = {cp, func: cb}
      return this;
    },
    off (evtp, name, cb) {
      this.el.removeEventListener(evtp, (name!=null?this.el.events[evtp][name].func:cb.name));
      delete this.el.events[evtp][name!=null?name:(cb.name||'func')];
      return this;
    },
    fire (info) {
      return this.el.dispatchEvent(info);
    },
    insert (boa = !0, ref, ...els) {
      ref = !(ref instanceof pen) ? pen(ref) : ref;
      let r = 'string' === pen.type(boa) ? ('before'===boa?ref.el:ref.siblings.next) : (boa?ref.el:ref.siblings.next);
      for (let el of els) {
        el = pen.$(el);
        if (pen.inst(el).parentNode === this.el) {console.warn("("+el+") is already a child of "+this);continue}
        ref.parent.insertBefore(pen.inst(el), r);
      }
      return this;
    },
    append (...elements) {
      for (let i = 0, len = elements.length, el; i < len; i++) {
        el = pen.$(elements[i]);
        if (pen.inst(el).parentNode === this.el) {console.warn("("+el+") is already a child of "+this);continue}
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
      let args = pen.slice(arguments);
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
      let op = pIt != null ? pIt : this.ops.parseIt;
      return pen.handoff(this.el.querySelector(qur), op);
    },
    $$ (qur, pIt) {
      let op, res, arr;
      op = pIt != null ? pIt : this.ops.parseIt;
      res = this.el.querySelectorAll(qur);
      arr = [];
      for (let r of res) {arr.push(pen.handoff(r, op))}
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
  window.head = document.head;
  window.pHead = pen(window.head);
  if (document.body) {
    window.body = document.body; window.pBody = pen(window.body);
  } else {
    document.addEventListener('DOMContentLoaded',()=>{window.body = document.body; window.pBody = pen(window.body)}, {once:!0});
  }
})(this);
