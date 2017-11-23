(function () {
  var v, pen;
  v = {
    attrReg:/([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi,
    cc (str) {
      return str.replace(/(?:_|-| )(\w)/g,(c,d)=>d.toUpperCase());
    }, slice (arg) {
      return Array.prototype.slice.call(arg);
    }, type: (function () {
      var cls2Typ = {},
      names = ['Boolean','Number','String','Function','Array','Date','RegExp','Undefined','Null','Error','Symbol','Promise','NamedNodeMap','Map','NodeList','DOMTokenList','DOMStringMap','CSSStyleDeclaration'];
      for (let i = 0, len = names.length; i < len; i++) {
        cls2Typ[`[object ${names[i]}]`] = names[i].toLowerCase();
      }
      return (obj) => cls2Typ[Object.prototype.toString.call(obj)]||'object';
    }()), random (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }, check (reg, flg) {
      return this.type(reg)==='string'?new RegExp(reg,(flg||'gi')):reg;
    }, parse (str) {
      var data = {}, res = str.match(this.attrReg);
      if (a==null||(res==null)||(res.length===0)){return}
      for (var i = 0, len = res.length, f, l; i < len; i++) {
        if (res[i].includes('=')) {
          [f, l] = res[i].split('=');
          data[f] = l.replace(/"|'/g, '');
        }
      }
      return Object.keys(dt).length !== 0 ? dt : null;
    }, pErr (name, msg) {
      msg = new Error(msg);
      msg.name = name;
      throw c;
    }, pLog (name, msg) {
      console.log(`%c${a}:\n  %c${b}`,'font-style:bold; color:white','color:grey');
    }, fracture (it, propz, props, nm) {
      var pz = this.type(it.el[propz]), res;
      for (var prop in props) {
        res = nm != null ? `${nm}-${prop}` : prop;
        if (this.type(props[prop]) === 'object') {
          this.fracture(it, propz, props[prop], res);
        } else {
          if (pz === 'function') {
            it.el[propz](res, props[prop]);
          } else {
            it.el[propz][res] = props[prop];
          }
        }
      }
      return it;
    },
    parseEl(str){
      var stTag, tag, attribs, text;
      stTag = str.substring(str.search(/</), str.search(/>/)+1);
      tag = stTag.substring(stTag.search(/</)+1, stTag.search(stTag.match(/<([^\n ]+)>/) ? />/ : / /));
      attribs = stTag.substring(stTag.search(/ /)+1, stTag.search(/>/));
      text = str.substring(stTag.length, str.search(/<\//));
      return [(attribs===`<${tag}`?null:attribs),tag,(text===stTag?null:text===''?null:text)];
    }
  };
  pen = function (el, ops={}) {
    if (!(this instanceof pen)) {return new pen(...arguments)};
    if (el instanceof pen) {return el};
    this.el = el;
    this.start(ops);
  };
  pen.handoff=(el, pr = false) => pr ? pen(el) : el;
  pen.$ = (el, pr) => v.type(a) === 'string' ? pen.handoff(document.querySelector(el),pr):el;
  pen.$$ = (el) => document.querySelectorAll(el);
  pen.create = (el, pr) => pen.handoff(document.createElement(el), pr);
  pen.fn = pen.prototype = {
    constructor: pen,
    start(ops) {
      if (v.type(this.el) === 'string') {
        if (this.el.startsWith('<')) {
          var [attrs, tag, text] = v.parseEl(this.el);
          this.el = pen.create(tag);
          if (attrs != null) {let omage = v.parse(attrs); if (omage != null) {this.attr(omage)}};
          if (text != null && (text.length !== 0)) {this.html(text, {parse:true})};
        } else {
          this.el = pen.$(this.el);
        }
      }
      this.partialSetup();
    },
    toString() {return this.el.outerHTML},
    partialSetup() {
      if (this.el == null) {return};
      var configurable = true, enumerable = true;
      Object.defineProperty(this,'tag',{
        get () {
          return (this.el.tagName||'UNPARSED-OR-IOS-ELEMENT').toLowerCase();
        }, enumerable
      });
      this.el = this.tag === 'template' ? this.el.content : this.el;
      Object.defineProperties(this,{
        text: {
          get () {
            return this.html();
          }, set (str) {
            return this.html(str);
          }, configurable,enumerable
        }, Children: {
          get () {
            var children = v.slice(this.el.children);
            for (var i = 0, len = children.length; i < len; i++) {
              children[i] = pen(children[i]);
            }
            return children;
          }, set (el) {
            return this.append(...el);
          }, configurable,enumerable
        }, Parent: {
          get () {
            return this.el.parentNode||null;
          }, set (el) {
            return this.appendTo(el);
          }, configurable,enumerable
        }, Classes: {
          get () {
            return v.slice(this.el.classList);
          }, set (cls) {
            return this.toggle(cls);
          }, configurable,enumerable
        }, attrs: {
          get () {
            var ars = {}, attrs = v.slice(this.el.attributes);
            for(var i = 0, len = attrs.length; i < len; i++){
              ar[attrs[i].name]=attrs[i].value;
            }
            return ars;
          }, set (obj) {
            return this.attr(obj);
          }, configurable,enumerable
        }, selector: {
          get () {
            return `${this.tag}${this.attrs.id!= null?`#${this.attrs.id}`:''}${this.attrs.class!=null?`.${this.Classes.join('.')}`:''}`;
          }, enumerable
        }, size: {
          get () {
            return this.el.getBoundingClientRect();
          }, enumerable
        }, hidden: {
          get () {
            return this.css('display') === 'none';
          }, enumerable
        }, ops: {
          get () {
            return {parseIt:false, app:false, parse:false};
          }, set (ops) {
            return {
              parseIt:(ops!=null?(ops.parseIt||false):false),
              app:(ops!=null?(ops.app||false):false),
              parse:(ops!=null?(ops.parse||false):false)
            };
          }, enumerable,configurable
        }
      });
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
    }, html (str, ops) {
      if (str != null) {
        var {parse,app} = (this.ops = ops!=null?ops:{}),
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
    }, attr (attr, value) {
      if (attr != null) {
        // if typeof attr is an object then call a function to handle objects and call the curried function
        // else if value isn't null then set the attribute and return 'this' else return the attribute given
        switch (true) {
          case v.type(attr) === 'object':
            return v.fracture(this, 'setAttribute', attr);

          case value != null:
            this.el.setAttribute(attr, value);
            return this;

          default:
            return this.el.getAttribute(attr);
        }
      } else {
        return this.attrs;
      }
    }, css (rule, rules) {
      if (rule != null) {
        switch (true) {
          case v.type(rule) === 'object':
            return v.fracture(this, 'style', rule);

          case rules != null:
            this.el.style[v.cc(rule)] = rules;
            return this;

          default:
            return this.el.style[rule];
        }
      } else {
        return this.el.style;
      }
    }, on (evtp, cb, cp, name) {
      cp = cp || false;
      this.el.events = this.el.events || {};
      this.el.addEventListener(evtp, cb, cp);
      this.el.events[evtp] = {capture:cp};
      this.el.events[evtp][name!=null?name:(cb.name||'func')] = cb;
      return this;
    }, off (evtp, cb, name) {
      this.el.removeEventListener(evtp, (name!=null?this.el.events[evtp][name]:cb));
      delete this.el.events[evtp][name!=null?name:(cb.name||'func')];
      return this;
    }, append (...elements) {
      if (elements.length === 0) {
        v.pLog(`Pen-${this.selector}-Append`, 'Argument passed had 0 elements');
        return;
      }
      for (var i=0,len=elements.length,element;i<len;i++) {
        element = pen.$(elements[i]);
        this.el.appendChild((element instanceof pen ? element.el : element));
      }
      return this;
    }, appendTo (el) {
      pen(el).append(this);
      return this;
    }, remove () {
      if (this.Parent != null) {
        this.Parent.removeChild(this.el);
      } else {
        console.warn("Couldn't remove "+this);
      }
      return this;
    }, $ (qur) {
      return pen.handoff(this.el.querySelector(qur), this.ops.parseIt);
    }, $$ (qur) {
      return this.el.querySelectorAll(qur);
    }, create (el, ret) {
      el = pen(el);
      this.append(el);
      return ret === 'parent' ? this : ret === 'child' ? el : this
    }, toggle (...classes) {
      for (var i = 0, len = classes.length; i < len; i++) {
        this.el.classList.toggle(classes[i]);
      };
      return this;
    }, hasClass (cls) {
      for(var i = 0, len = this.Classes.length; i < len; i++) {
        if(this.Classes[i] === cls) {
          return true;
        }
      }
      return false;
    }
  };
  pen.tools = v;
  window.pen = pen; window.pDoc = pen(document); window.pWin = pen(window);
  if (document.body != null) {
    window.body = document.body; window.head = document.head;
    window.pHead = pen(head); window.pBody = pen(body);
  } else {
    document.addEventListener('DOMContentLoaded',()=>{
      window.body = document.body; window.head = document.head;
      window.pHead = pen(head); window.pBody = pen(body);
    }, {once:true});
  }
}).call(this);
