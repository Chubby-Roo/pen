(function() {
  var log, error, dir, define, vrs, pen;
  ({log, error, dir} = console);
  define = () => {window.body = document.body; window.head = document.head;window.pHead = pen(head); window.pBody = pen(body);};
  document.addEventListener('DOMContentLoaded', define, {once: true});
  vrs = {
    class2Type: {},
    names: ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null', 'Error', 'Symbol', 'Promise', 'NamedNodeMap', 'Map', 'NodeList', 'DOMTokenList', 'DOMStringMap', 'CSSStyleDeclaration', 'Document', 'Window'],
    slice: (vr) => {return Array.prototype.slice.call(vr);},
    _toString: (vr) => {return Object.prototype.toString.call(vr);},
    type(obj) {return this.class2Type[this._toString(obj)] || 'object'},
    regs: {attr: /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi},
    ranDos(arr) {return arr[Math.floor(Math.random()*arr.length)]},
    str(regs, flags) {return this.type(regs) === 'string' ? new RegExp(regs, flags) : regs},
    iterate(arr, times) {
      var res = [], i = 0;
      while (i < times) {
        res.push(this.ranDos(arr));
        i++;
      }
      return res.join('');
    },
    attribute: class attribute {
      constructor(name, value) {
        this.name = name; this.value = value; return this;
      }
      change(typ, data) {
        this[typ] = data; return this;
      }
      toString() {return `${this.name}="${this.value}"`}
      static fromString(str) {
        var [name, value] = str.split('=');
        return new vrs.attribute(name, value.replace(/'|"/g,''));
      }
    },
    parser(regs, flags) {
      regs = this.str(regs,(flags || 'gi'));
      return (str) => {
        var obj = {}, results = str.match(regs), attr;
        if (str == null) {return};
        if (results == null) {return};
        for (var i = 0, len = results.length; i < len; ++i) {
          if (results[i].includes("=")) {
            attr = vrs.attribute.fromString(results[i]);
            obj[attr.name] = attr.value;
          }
        }
        return obj;
      };
    },
    pErr(name, msg) {
      var er = new Error(msg); er.name = name;
      throw er;
    },
    funcoso(it, typeso, typesi) {
      typesi = typesi || typeso;
      var pz = vrs.type(it.el[typesi]);
      func = (props, nm) => {
        for (var prop in props) {
          res = nm != null ? `${nm}-${prop}` : prop;
          if (vrs.type(props[prop]) === 'object') {
            func(props[prop], res);
          } else {
            pz === 'function' ? it.el[typesi](res, props[prop]) : it.el[typesi][res] = props[prop];
          }
        }
        return it;
      }
      return func;
    }
  };
  for (let i = 0, len = vrs.names.length; i < len; i++) {
    vrs.class2Type[`[object ${vrs.names[i]}]`] = vrs.names[i].toLowerCase();
  }
  pen = function (el, ops = {}) {
    if (!(this instanceof pen)) {return new pen(...arguments)};
    if (arguments[0] instanceof pen) {return arguments[0]};
    this.el = arguments[0];
    this.start(arguments[1]);
  };
  pen.handoff = (ps, el) => ps === true ? pen(el) : el;
  pen.$ = function (el, ps = false) {
    if (vrs.type(el) === 'string') {
      return pen.handoff(ps, document.querySelector(el));
    } else {
      return el;
    }
  };
  pen.$$ = function (el, ps = false) {
    var els = vrs.slice(document.querySelectorAll(el)), ar = [];
    for (var i = 0, len = els.length; i < len; i++) {
      ar.push(pen.handoff(ps, els[i]));
    }
    return ar;
  };
  pen.create = function (el, ps = false) {
    return pen.handoff(ps, document.createElement(el));
  };
  pen.parse = {
    attrs: vrs.parser(vrs.regs.attr),
    element(str) {
      var stTag, tag, attribs, text;
      stTag = str.substring(str.search(/</), str.search(/>/)+1);
      tag = stTag.substring(stTag.search(/</)+1, stTag.search(stTag.match(/<([^\n ]+)>/) ? />/ : / /));
      attribs = stTag.substring(stTag.search(/ /)+1, stTag.search(/>/));
      text = str.substring(str.search(/>/)+1, str.search(/</));
      return [(attribs!==`<${tag}`?attribs:null),tag,(text!==''?text:null)];
    }
  };
  pen.genId = (times) => `i${vrs.iterate([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], times)}`;
  pen.ink = pen.prototype = {
    constructor: pen,
    start(ops) {
      this.initOptions(ops);
      if (vrs.type(this.el) === 'string') {
        if (this.el.startsWith('<')) {
          var [attrs, tag, text] = pen.parse.element(this.el);
          this.el = document.createElement(tag);
          if (attrs != null) {this.attr(pen.parse.attrs(attrs))};
          if (text != null && (text.length !== 0)) {this.html(text, {parse: true})};
        } else {
          this.el = pen.$(this.el);
        }
      }
      this.partialSetup();
    },
    initOptions(ops) {
      this.ops = {parseIt: (ops!=null?(ops.parseIt||false):false),
        app: (ops!=null?(ops.app||false):false),
        parse: (ops!=null?(ops.parse||false):false)};
      return this.ops;
    },
    toString() {return this.cel.outerHTML},
    partialSetup() {
      if (this.el == null) {
        vrs.pErr("Main-arg", "main-argument from pen(...) was "+vrs.type(this.el));
      }
      var configurable, enumerable;
      configurable = true; enumerable = true;
      Object.defineProperties(this,{
        tag:{get(){return (this.el.tagName||'UNPARSED-OR-IOS-ELEMENT').toLowerCase()},enumerable},
        cel:{get(){return this.tag==='template'?this.el.content:this.el},enumerable},
        text:{get(){return this.html()},set(str){return this.html(str)},configurable,enumerable},
        Children:{get(){var children=vrs.slice(this.cel.children), ar=[];for(var i=0,len=children.length;i<len;i++){ar.push(pen(children[i]));};return ar;},set(el){return this.append(...el)},configurable,enumerable},
        Parent:{get(){return this.el.parentNode||null},set(el){return this.appendTo(el)},configurable,enumerable},
        Classes:{get(){return vrs.slice(this.el.classList)},set(cls){return this.toggle(cls)},configurable,enumerable},
        attrs:{get(){var ar={}, attrs=vrs.slice(this.el.attributes);for(var i=0,len=attrs.length;i<len;i++){ar[attrs[i].name]=attrs[i].value;};return ar;},set(obj){return this.attr(obj)},configurable,enumerable},
        selector:{get(){return `${this.tag}${this.attrs.id!= null?`#${this.attrs.id}`:''}${this.attrs.class!=null?`.${this.Classes.join('.')}`:''}`},enumerable},
        size:{get(){return this.el.getBoundingClientRect()},enumerable},
        hidden:{get(){return this.css('display')==='none'},enumerable}});
      this.el.events = {};
      switch (true) {
        case this.el instanceof Document:
          pen.prototype.ready = function () {
            this.on('DOMContentLoaded', ...arguments);
            return this;
          };
        break;
        case this.el instanceof Window:
          this.doc = this.el.document;
        break;
        case this.tag === 'template':
          pen.prototype.clone = function () {
            document.importNode(...arguments);
            return this;
          };
        break;
        case this.tag === 'canvas':
          this.ctx = this.context = this.el.getContext('2d');
        break;
      }
      return this;
    },

    html(str, ops) {
      if (str != null) {
        var {parse,app} = this.initOptions(ops),
        res = parse ? 'innerHTML' : 'innerText';
        switch (this.tag) {
          case 'input':
            this.attr('value', app ? this.el.value+str : str);
          break;
          case 'option':
            this.attr('value', app ? this.el.value+str : str);
            this.el.innerText = app ? this.el.value+str : str;
          break;
          default:
            this.el[/textarea/i.test(this.tag) ? 'innerText' : res] = app ? this.el.value+str : str;
        }
        return this;
      } else {
        switch (this.tag) {
          case 'input': case 'option': case 'textarea':
            return this.el.value;
          break;
          default:
            return this.el.innerText;
        }
      }
    },
    attr(attr, value) {
      if (attr != null) {
        if (vrs.type(attr) === 'object') {
          return vrs.funcoso(this,'attributes','setAttribute')(attr);
        } else if (value != null) {
          this.el.setAttribute(attr, value);
          return this;
        } else {
          return this.el.getAttribute(attr);
        }
      } else {
        return this.attrs;
      }
    },
    css(rule, rules) {
      if (rule != null) {
        if (vrs.type(rule) === 'object') {
          return vrs.funcoso(this,'style')(rule);
        } else if (rules != null) {
          rule = rule.replace(/-(\w{1})/g,(whole, dash) => dash.toUpperCase());
          this.el.style[rule] = rules;
          return this;
        } else {
          return this.el.style[rule];
        }
      } else {
        return this.el.style;
      }
    },
    on(evtp, cb, cp = false, name) {
      this.el.events = this.el.events || {};
      this.el.events[evtp] = {capture: cp};
      this.el.events[evtp][name!=null?name:(cb.name||'func')] = cb;
      this.el.addEventListener(evtp, cb, cp);
      return this;
    },
    off(evtp, cb, name) {
      this.el.removeEventListener(evtp, (name != null ? this.el.events[evtp][name] : cb));
      delete this.el.events[evtp][name!=null?name:(cb.name||'func')];
      return this;
    },
    append(...elements) {
      if (elements.length === 0) {return};
      for (var i = 0,len = elements.length,element; i<len; i++) {
        element = pen.$(elements[i]);
        this.cel.appendChild((element instanceof pen?element.el:element));
      }
      return this;
    },
    appendTo(el) {pen(el).append(this);return this;},
    remove() {this.Parent != null ? this.Parent.removeChild(this.el) : null},
    $(qur) {
      return pen.handoff(this.ops.parseIt, this.cel.querySelector(qur));
    },
    $$(qur) {return this.cel.querySelectorAll(qur)},
    create(el, ret) {
      el = pen(el);
      this.append(el);
      return ret === 'parent' ? this : ret === 'child' ? el : this;
    },
    toggle(...classes) {
      for (var i = 0, len = classes.length; i < len; i++) {
        this.el.classList.toggle(classes[i]);
      }
      return this;
    },
    hasClass(cls) {
      for (var i = 0, len = this.Classes.length; i < len; i++) {
        if (this.Classes[i] === cls) {
          return true;
        }
      }
      return false;
    },
    hide() {
      this.hidden===true?this.css('display',''):this.css('display','none');
      return this;
    }
  };
  pen.tools = vrs;
  window.pDoc = pen(document); window.pWin = pen(window); window.pen = pen;
}).call(this);
