var pen;

pen = (function() {
  var define;
  var dir, error, log;
  ({log, error, dir} = console);
  define=()=>{window['body']=document.body;window['pBody']=pen(body);window['head']=document.head;window['pHead']=pen(head)};document.addEventListener("DOMContentLoaded",define,{once:true});vrs={};vrs.class2Type={}
  vrs.names='Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split(/\s+/gi);
  for(var i=0,len=vrs.names.length,name;i<len;++i){name=vrs.names[i];vrs.class2Type[("[object "+name+"]")]=name.toLowerCase()};
  vrs.proto=pro=>pro.prototype;vrs.arr=vrs.proto(Array);vrs.obj=vrs.proto(Object);
  vrs.slice=(vr)=>vrs.arr.slice.call(vr);vrs._toString=(vr)=>vrs.obj.toString.call(vr);
  vrs.type=(obj)=>(vrs.class2Type[vrs._toString(obj)]||'object');
  vrs.regs={};vrs.regs.attribute=/([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi;
  vrs.ranDos=(arr)=>arr[Math.floor(Math.random()*arr.length)];
  vrs.str=(regs,flags)=>vrs.type(regs)==='string'?new RegExp(regs,flags):regs;
  vrs.iterate=(arr,times)=>{var res,i;res=[];for(i=0;i<times;++i){res.push(vrs.ranDos(arr))};return res.join('');};
  vrs.parser=(regs,flags)=>{
    regs=vrs.str(regs,(flags||'gi'));
    return (str)=>{
      var obj,reg;
      obj={};
      str=str||'';
      results=str.match(regs);
      reg=/^['"]([^\n]*?)['"]$/m;
      if((results!=null)&&results.length!==0) {
        for(var i=0,len=results.length,match;i<len;++i) {
          match=results[i];
          var name,val;
          if(match.includes("=")===true){
            [name,val]=match.split("=");
            val=val.replace(reg,'$1');
            obj[name]=val;
          };
        };
        return obj;
      };
    };
  };
  vrs.sAS=(str,...els)=>{
    var arr;arr=[];
    for(var i=0,len=els.length;i<len;++i){
      arr.push(str.search(els[i]));
    };
    return arr
  };
  vrs.pErr=(name,msg)=>{var er;er=new Error(msg);er.name=name;throw er};;
  vrs.funcoso = (it, typeso, typesi) => {
    var func, pz;
    typesi = typesi || typeso;
    pz = vrs.type(it.el[typesi]);
    func = (propz, nm) => {
      var prop, prp, res;
      for (prop in propz) {
        prp = propz[prop];
        res = nm != null ? `${nm}-${prop}` : prop;
        if (vrs.type(prp) === 'object') {
          func(prp, res);
        } else {
          if (pz === 'function') {
            it.el[typesi](res, prp);
          } else {
            it.el[typesi][res] = prp;
          }
        }
      }
      return it;
    };
    return func;
  };
  pen = function() {
    var args;
    args = arguments;
    if (!(this instanceof pen)) {
      return new pen(...args);
    }
    if (args[0] instanceof pen) {
      return args[0];
    }
    this.cel=null;this.attrs=null;this.el=args[0];
    this.start(...args);
  };
  pen.ink = pen.prototype = {};
  pen.selected = {}; pen.created = {}; pen.$ = (el, ps = false) => {var elshi; elshi = "element"+vrs.elCount++;if (vrs.type(el) === 'string'){selec = document.querySelector(el); pen.selected[elshi] = selec; return ps===true?pen(selec):selec}else{return el}};pen.$$ = (el, ps = false) => {var els, elshi; elshi = "element"+vrs.elCount++;els = vrs.slice(document.querySelectorAll(el)).map(el => {pen.selected[elshi] = el; return ps===true?pen(el):el});return els};pen.create = (el, ps = false) => {var el, elshi; elshi = "element"+vrs.elCount++;el = document.createElement(el);pen.created[elshi] = el; return ps===true?pen(el):el};
  pen.parse = {
    attrs: vrs.parser(vrs.regs.attribute),
    element: function(str) {
      var attribs, e, s, stTag, tag, text;
      [s, e] = vrs.sAS(str, '<', '>');
      stTag = str.slice(s, e + 1);
      [s, e] = vrs.sAS(stTag, ' ', '>');
      attribs = stTag.slice(s + 1, e);
      [s, e] = vrs.sAS(stTag, '<', ' ');
      tag = stTag.slice(s + 1, e);
      [s, e] = vrs.sAS(str, '>', '</');
      text = str.slice(s + 1, e);
      return [str, stTag, (attribs === `<${tag}` ? null : attribs), tag, (text === '' ? null : text)];
    }
  };
  pen.genId = (times) => {var arr;arr = "0 1 2 3 4 5 6 7 8 9".split(/\s+/);return ("i"+(vrs.iterate(arr, times)));};
  pen.prototype.start = function(ele, ops) {
    var t;
    this.initOptions(ops);
    t = vrs.type(this.el);
    if (t === 'object') {
      this.partialSetup();
    } else if (t === 'string') {
      this.setup(this.el);
    }
    return this;
  };
  pen.prototype.initOptions = function(ops) {
    this.ops = {
      parseIt: (ops != null ? ops.parseIt || false : false),
      create: (ops != null ? ops.create || 'return child' : 'return child'),
      html: {
        app: ((ops != null) && (ops.html != null) ? ops.html.app || false : false),
        parse: ((ops != null) && (ops.html != null) ? ops.html.parse || false : false)
      }
    };
    return this;
  };
  pen.ink.toString = function () {return this.cel.outerHTML};
  pen.prototype.setup = function(el) {
    var whole,startTag,attributes,tag,text;
    var t;
    t = vrs.type(el);
    if (t === 'string') {
      if (el.startsWith('<')) {
        [whole,startTag,attributes,tag,text]=pen.parse.element(el);attribs=pen.parse.attrs(attributes);this.el=pen.create(tag);
      } else {
        this.el = pen.$(el);
      }
    } else {
      this.el = el;
    }
    if (typeof attribs !== "undefined" && attribs !== null) {
      this.attr(attribs);
    }
    if ((typeof text !== "undefined" && text !== null) && text.length === 0) {
      this.html(text, {
        parse: true
      });
    }
    this.partialSetup();
  };
  pen.prototype.partialSetup = function() {
    Object.defineProperties(this, {
      tag:{get:function(){return (this.el.tagName||'IOS-ELEMENT').toLowerCase();}},
      cel:{get:function(){return (this.tag==='template'?this.el.content:this.el);}},
      text:{get:function(){return this.html();},set:function(str){return this.html(str);},configurable:true},
      Children:{get:function(){var arr,chi;arr=[];chi=vrs.slice(this.cel.children);for(var i=0,len=chi.length;i<len;++i){arr.push(pen(chi[i]))};return arr},set:function(...els){return this.append(...els)},configurable:true},
      Parent:{get:function(){return (this.el.parentNode||null)},set:function(el){return this.appendTo(el)},configurable:true},
      Classes:{get:function(){return vrs.slice(this.el.classList)},set:function(cls){return this.toggle(cls);},configurable:true},
      attrs:{get:function(){var ar,arr,chi;ar={};arr=[];chi=vrs.slice(this.el.attributes);for(var i=0,len=chi.length,attr;i<len;++i){attr=chi[i];ar[attr.name]=attr.value};return ar},set:function(obj){return this.attr(obj);},configurable:true},
      selector:{get:function(){return this.tag+(this.attrs.id!=null?("#"+this.attrs.id):'')+(this.attrs.class!=null?('.'+this.Classes.join('.')):'')}},
      size:{get:function(){return this.el.getBoundingClientRect()}},
      hidden:{get:function(){return this.css('display')==='none'}}});
    this.el.events = {};
    switch (true) {
      case this.el instanceof Document:
        this.body = window['pBody'];
        this.head = window['pHead'];
        pen.prototype.ready = function() {
          var args;
          args = arguments;
          this.on('DOMContentLoaded', ...args);
          return this;
        };
        break;
      case this.el instanceof Window:
        this.doc = this.el.document;
        break;
      case this.tag === 'template':
        pen.prototype.clone = function() {
          var args;
          args = arguments;
          return document.importNode(...args);
        };
        break;
      case this.tag === 'canvas':
        this.ctx = this.context = this.el.getContext('2d');
    }
    return this;
  };
  pen.prototype.html = function(str, ops) {
    var app, livi, parse, reg, res;
    ({parse, app} = this.initOptions(ops));
    res = parse ? 'innerHTML' : 'innerText';
    reg = /input|option|textarea/i;
    livi = (prop, str) => {
      if (str != null) {
        if (reg.test(this.tag) === true) {
          this.attr('value', (app === true ? `${this.el.getAttribute('value')}${str}` : str));
        } else {
          app === true ? this.el[prop] += str : this.el[prop] = str;
        }
        return this;
      } else {
        return this.el[prop];
      }
    };
    switch (this.tag) {
      case 'input':
      case 'textarea':
        return livi('value', str);
      case 'option':
        return livi(res, str);
      default:
        return livi(res, str);
    }
  };
  pen.prototype.attr = function(attribute, value) {
    var func;
    func = vrs.funcoso(this, 'attributes', 'setAttribute');
    if (attribute != null) {
      if (vrs.type(attribute) === 'object') {
        return func(attribute);
      } else if (value != null) {
        this.el.setAttribute(attribute, value);
        return this;
      } else {
        return this.el.getAttribute(attribute);
      }
    } else {
      return this.attrs;
    }
  };
  pen.prototype.css = function(rule, rules) {
    var func;
    func = vrs.funcoso(this, 'style');
    if (rule != null) {
      switch (vrs.type(rule)) {
        case 'object':
          return func(rule);
        case 'string':
          if (rules != null) {
            rule = rule.replace(/-(\w{1})/g, (whole, dash) => {
              return dash.toUpperCase();
            });
            this.el.style[rule] = rules;
            return this;
          } else {
            return this.el.style[rule];
          }
      }
    } else {
      return this.el.style;
    }
  };
  pen.prototype.on = function(evtp, cb, cp) {
    cp = cp || false;
    this.el.events = this.el.events || {};
    this.el.events[evtp] = {};this.el.events[evtp].capture = cp;this.el.events[evtp][cb.name || 'func'] = cb;
    this.el.addEventListener(...arguments);
    return this;
  };
  pen.prototype.off = function(evtp, cb) {
    this.el.removeEventListener(evtp, cb);
    delete this.el.events[evtp];
    return this;
  };
  pen.prototype.append = function(...elements) {
    var element, elu, i, len;
    for (i = 0, len = elements.length; i < len; i++) {
      element = elements[i];
      element = pen.$(element);
      elu = (element instanceof pen ? element.el : element);
      this.cel.appendChild(elu);
    }
    return this;
  };
  pen.prototype.appendTo = function(element) {
    pen(element).append(this);
    return this;
  };
  pen.prototype.remove = function() {
    this.Parent.removeChild(this.el);
    return this;
  };
  pen.prototype.$ = function(element, parseIt = false) {
    var qur, result;
    qur = this.cel.querySelector(element);
    result = this.ops.global.parseIt === true ? pen(qur) : parseIt === true ? pen(qur) : qur;
    return result;
  };
  pen.prototype.$$ = function(element) {
    return this.cel.querySelectorAll(element);
  };
  pen.prototype.create = function(element, ret) {
    var result;
    element = pen(element);
    this.append(element);
    if (/child|parent/gi.test(ret) === true) {
      result = `return ${ret}`;
      return result.endsWith("parent")===true?this:element;
    } else {
      return this;
    }
  };
  pen.prototype.toggle = function(...classes) {
    var classs, i, len;
    for (i = 0, len = classes.length; i < len; i++) {
      classs = classes[i];
      this.el.classList.toggle(classs);
    }
    return this;
  };
  pen.prototype.hasClass = function(cls) {
    var clss, i, len, ref;
    ref = this.Classes;
    for (i = 0, len = ref.length; i < len; i++) {
      clss = ref[i];
      if (clss === cls) {
        return true;
      }
    }
    return false;
  };
  pen.prototype.hide = function() {
    this.hidden===true?this.css('display',''):this.css('display','none');
    return this;
  };
  pen.vrs = vrs;
  return pen;
})();
