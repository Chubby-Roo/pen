(function () {
  var vrs, pen, {log, error, dir} = console;
  document.addEventListener('DOMContentLoaded', () => {window.body = document.body; window.head = document.head;
    window.pBody = pen(body); window.pHead = pen(head);}, {once: true});
  vrs = {
    cls2Typ: {},
    attrReg: /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi,
    names: ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null', 'Error', 'Symbol', 'Promise', 'NamedNodeMap', 'Map', 'NodeList', 'DOMTokenList', 'DOMStringMap', 'CSSStyleDeclaration'],
    slice (vr) {return Array.prototype.slice.call(vr)},
    _toString (vr) {return Object.prototype.toString.call(vr)},
    type (obj) {return this.cls2Typ[this._toString(obj)] || 'object'},
    rando (arr) {return arr[Math.floor(Math.random() * arr.length)]},
    str (rgs, flgs) {return this.type(rgs) === 'string' ? new RegExp(rgs, flgs) : rgs},
    iterate (arr, times) {
      var res = [], i = 0;
      while (i < times) {res.push(this.rando(arr)); i++}
      return res.join('');
    }, attr: class attr {
      constructor(name, value) {this.name = name; this.value = value; return this;}
      change(typ, data) {this[typ] = data; return this;}
      toString() {return `${this.name}="${this.value}"`}
      static fromString(str) {var [name,value]=str.split('=');return new vrs.attr(name,value.replace(/'|"/g,''))}
    }, parseAttrs (str) {
      var obj = {}, results = str.match(this.attrReg);
      if (str == null || (results == null) || (results.length === 0)) {return};
      for (var i = 0, len = results.length, attr; i < len; i++) {
        if (results[i].includes('=')) {
          attr = this.attr.fromString(results[i]);
          obj[attr.name] = attr.value;
        }
      }
      return Object.keys(obj).length !== 0 ? obj : null;
    },
    pErr (nm, msg) {var er = new Error(msg);er.name = nm; throw er},
    fracture (it, property) {
      var fractured, pz = vrs.type(it.el[property]);
      fractured = (props, nm) => {
        var res;
        for (var prop in props) {
          res = nm != null ? `${nm}-${prop}` : prop;
          if (vrs.type(props[prop]) !== 'object') {
            // if (...) then ... else ...
            pz === 'function' ? it.el[property](res, props[prop]) : it.el[property][res] = props[prop];
          } else {
            fractured(props[prop], res);
          }
        }
        return it;
      }
      return fractured;
    },
  };
  for (let i=0,len=vrs.names.length;i<len;i++) {vrs.cls2Typ[`[object ${vrs.names[i]}]`] = vrs.names[i].toLowerCase();}
  pen = function (el, ops = {}) {
    if (!(this instanceof pen)) {return new pen(...arguments)};
    if (el instanceof pen) {return el};
    this.el = el;
    this.start(ops);
  };
  pen.handoff = (el, ps = false) => ps === false ? el : pen(el);
  pen.$ = (el,ps) => vrs.type(el) === 'string' ? pen.handoff(document.querySelector(el), ps) : el;
  pen.$$ = (el,ps) => {var els = vrs.slice(document.querySelectorAll(el));for (var i=0,len=els.length;i<len;i++){els[i]=pen.handoff(els[i],ps)};return els};
  pen.create = (el,ps) => pen.handoff(document.createElement(el), ps);
  pen.parseElement = (str) => {
    var stTag, tag, attribs, text, ar = [];
    stTag = str.substring(str.search(/</), str.search(/>/)+1);
    tag = stTag.substring(stTag.search(/</)+1, stTag.search(stTag.match(/<([^\n ]+)>/) ? />/ : / /));
    attribs = stTag.substring(stTag.search(/ /)+1, stTag.search(/>/));
    text = str.substring(stTag.length, str.search(/<\//));
    ar.push((attribs===`<${tag}`?null:attribs),tag,(text===stTag?null:text===''?null:text));
    return ar;
  };
  pen.ink = pen.prototype = {
    constructor: pen,
    start(ops) {
      this.initOptions(ops);
      if (vrs.type(this.el) === 'string') {
        if (this.el.startsWith('<')) {
          var [attrs, tag, text] = pen.parseElement(this.el);
          this.el = pen.create(tag);
          if (attrs != null) {let omage = vrs.parseAttrs(attrs); if (omage != null) {this.attr(omage)}};
          if (text != null && (text.length !== 0)) {this.html(text, {parse:true})};
        } else {
          this.el = pen.$(this.el);
        }
      }
      this.partialSetup();
    },
    initOptions(ops) {this.ops = {parseIt:(ops!=null?(ops.parseIt||false):false),app:(ops!=null?(ops.app||false):false),parse:(ops!=null?(ops.parse||false):false)};return this.ops},
    toString() {return this.cel.outerHTML},
    partialSetup() {
      if (this.el == null) {return};
      var configurable = true, enumerable = true;
      Object.defineProperties(this,
        {tag:{get(){return (this.el.tagName||'UNPARSED-OR-IOS-ELEMENT').toLowerCase()},enumerable},
        cel:{get(){return this.tag==='template'?this.el.content:this.el},enumerable},
        text:{get(){return this.html()},set(str){return this.html(str)},configurable,enumerable},
        Children:{get(){var children=vrs.slice(this.cel.children);for(var i=0,len=children.length;i<len;i++){children[i]=pen(children[i])};return children},set(el){return this.append(...el)},configurable,enumerable},
        Parent:{get(){return this.el.parentNode||null},set(el){return this.appendTo(el)},configurable,enumerable},
        Classes:{get(){return vrs.slice(this.el.classList)},set(cls){return this.toggle(cls)},configurable,enumerable},
        attrs:{get(){var ar={},attrs=vrs.slice(this.el.attributes);for(var i=0,len=attrs.length;i<len;i++){ar[attrs[i].name]=attrs[i].value};return ar},set(obj){return this.attr(obj)},configurable,enumerable},
        selector:{get(){return `${this.tag}${this.attrs.id!= null?`#${this.attrs.id}`:''}${this.attrs.class!=null?`.${this.Classes.join('.')}`:''}`},enumerable},
        size:{get(){return this.el.getBoundingClientRect()},enumerable},
        hidden:{get(){return this.css('display')==='none'},enumerable}}
      );
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
    }, html(str, ops) {
      if (str != null) {
        var {parse,app} = this.initOptions(ops),
        res = parse ? 'innerHTML' : 'innerText';
        switch (this.tag) {
          case 'input':
            this.el.value = app ? this.el.value+str : str;
          break;
          case 'option':
            this.el.value = app ? this.el.value+str : str;
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
    }, attr(attr, value) {
      if (attr != null) {
        if (vrs.type(attr) === 'object') {
          return vrs.fracture(this, 'setAttribute')(attr);
        } else if (value != null) {
          this.el.setAttribute(attr, value);return this;
        } else {
          return this.el.getAttribute(attr);
        }
      } else {
        return this.attrs;
      }
    }, css(rule, rules) {
      if (rule != null) {
        if (vrs.type(rule) === 'object') {
          return vrs.fracture(this,'style')(rule);
        } else if (rules != null) {
          rule=rule.replace(/-(\w{1})/g,(whole, dash)=>{return dash.toUpperCase()});
          this.el.style[rule]=rules;return this;
        } else {
          return this.el.style[rule]
        }
      } else {
        return this.el.style;
      }
    },
    on(evtp, cb, cp = false, name) {this.el.events=this.el.events||{};this.el.events[evtp]={capture:cp};this.el.events[evtp][name!=null?name:(cb.name||'func')]=cb;this.el.addEventListener(evtp,cb,cp);return this},
    off(evtp, cb, name) {this.el.removeEventListener(evtp,(name!=null?this.el.events[evtp][name]:cb));delete this.el.events[evtp][name!=null?name:(cb.name||'func')];return this},
    append(...elements) {
      if (elements.length === 0) {return};
      for (var i=0,len=elements.length,element;i<len;i++) {
        element = pen.$(elements[i]);
        this.cel.appendChild((element instanceof pen?element.el:element));
      }
      return this;
    },
    appendTo(el) {pen(el).append(this);return this;},
    remove() {this.Parent != null ? this.Parent.removeChild(this.el) : null},
    $(qur) {return pen.handoff(this.cel.querySelector(qur),this.ops.parseIt)},
    $$(qur) {return this.cel.querySelectorAll(qur)},
    create(el, ret) {el=pen(el);this.append(el);return ret==='parent'?this:ret==='child'?el:this},
    toggle(...classes) {
      for (var i = 0, len = classes.length; i < len; i++) {
        this.el.classList.toggle(classes[i]);
      }
      return this;
    }, hasClass(cls) {
      for (var i = 0, len = this.Classes.length; i < len; i++) {
        if (this.Classes[i] === cls) {
          return true;
        }
      }
      return false;
    }, hide() {
      this.hidden===true?this.css('display',''):this.css('display','none');
      return this;
    }
  };
  pen.tools = vrs;
  window.pDoc = pen(document); window.pWin = pen(window); window.pen = pen;
}).call(this);
