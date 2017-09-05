var pen;

pen = (function() {
  var atribs, doc, elCount, evps, ldr, names, vrs, win;
  ldr = (ev) => {
    window['body'] = document.body;
    window['pBody'] = pen(body);
    window['head'] = document.head;
    window['pHead'] = pen(head);
    window['pDoc'] = pen(document);
  };
  document.addEventListener("DOMContentLoaded", ldr, {
    once: true
  });
  vrs = {};
  elCount = 0;
  win = window;
  doc = document;
  vrs.proto = (pro) => pro.prototype;
  vrs.arr = vrs.proto(Array); vrs.obj = vrs.proto(Object);
  vrs.slice = (vr) => vrs.arr.slice.call(vr);
  vrs.toString = (vr) => vrs.obj.toString.call(vr);
  vrs.ranDos = (arr) => arr[Math.floor(Math.random() * arr.length)];
  vrs.iterate = (arr, times) => {
    var res;
    res = [];
    for (var i = 0, len = times; i < times; ++i) {
      res.push(vrs.ranDos(arr));
    };
    return `i${res.join('')}`;
  };
  vrs.str = (regs, flags) => vrs.type(regs) === 'string' ? new RegExp(regs, flags) : regs;
  vrs.regs = {
    attribute: /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi,
    css: /([^\n;: ]+):([^\n]+);/gi,
    define: /define\s*([^\n\ ]+)\s*as\s*([^\n\ ,]+)(\s*(?:global|local)ly)?/i,
    tag: /<([^\n]*?)>/gi,
    eleme: /<([^\n]*?)>([\S\s]*?)<\/([^\n]*?)>/gi,
    innerText: />([\S\s]*?)</gi
  };
  vrs.class2Type = {};
  names = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split(/\s+/gi);
  names.forEach(name => {vrs.class2Type[`[object ${name}]`] = name.toLowerCase()});
  vrs.type = (obj) => (vrs.class2Type[vrs.toString(obj)] || 'object');
  vrs.parser = function(regs, num1 = 1, num2 = 2, flags) {
    regs = vrs.str(regs, flags || 'gi');
    return (str) => {
      var results, retsi;
      if (str != null) {
        retsi = {};
        results = str.match(regs);
        if ((results != null) && results.length !== 0) {
          results.forEach((match) => {
            var name, value;
            if (match.includes("=")) {
              [name, value] = match.split("=");
              value = value.replace(/^['"]([^\n]+)['"]$/m, '$1');
              retsi[name] = value;
            }
          });
          return retsi;
        }
      }
    };
  };
  vrs.log = console.log; vrs.error = console.error; vrs.dir = console.dir;
  vrs.detectAndReturn = (ting, ev) => ev.hasAttribute(ting) === true ? ev.getAttribute(ting) : null;
  vrs.defo = (prop, str, it, ops) => {
    var app, reg;
    app = ops != null ? ops.app || false : it.ops.global.html.app;
    app === true ? it.text += str : it.text = str;
    reg = /input|option|textarea/i;
    if (str != null) {
      if (reg.test(it.tag) === true) {
        it.attr('value', (app === true ? `${it.el.getAttribute('value')}${str}` : str));
      } else {
        app === true ? it.el[prop] += str : it.el[prop] = str;
      }
      return it;
    } else {
      return it.el[prop];
    }
  };
  vrs.funcoso = function(it, typeso, typesi) {
    var funcso;
    if (typesi == null) {
      typesi = typeso;
    }
    chk1 = (whl, propz, prop) => vrs.type(it.el[typesi]) === 'function' ? it.el[typesi](whl, propz[prop]) : it.el[typesi][whl] = propz[prop];
    funcso = function(propz, nm) {
      var prop;
      for (prop in propz) {
        if (vrs.type(propz[prop]) === 'object') {
          funcso(propz[prop], prop);
        } else {
          if (nm != null) {
            it[typeso][`${nm}-${prop}`] = propz[prop];
            chk1(`${nm}-${prop}`, propz, prop);
          } else {
            it[typeso][prop] = propz[prop];
            chk1(prop, propz, prop);
          }
        }
      }
      return it;
    };
    return funcso;
  };
  vrs.penError = (name, msg) => {er = new Error(msg); er.name = name; throw er;};
  vrs.resolve = function(res) {
    switch (type(res)) {
      case 'string':
        return pen(res);
      case 'array':
        return pen(...res);
    }
  };
  vrs.findInObj = function(obj, key, defin) {
    var kname;
    key = vrs.str(key, 'i');
    for (kname in obj) {
      if (/autoAttachTo|el/i.test(kname) === false) {
        if (key.test(kname) === true) {
          return obj[kname];
        } else if (vrs.type(obj[kname]) === 'object') {
          return pen.findInObj(obj[kname], key, defin);
        }
      }
    }
    return defin;
  };
  pen = function() {
    var args;
    args = arguments;
    if (!(this instanceof pen)) {
      return new pen(...args);
    }
    this.events = {};
    this.hidden = false;
    this.attributes = {};
    this.style = {};
    this.start(...args);
  };
  pen.ink = pen.prototype = {};
  pen.selected = {};
  pen.created = {};
  pen.$ = function(el, ps = false) {
    if (ps === true) {
      pen.selected[`element${elCount++}`] = el;
      return pen(doc.querySelector(el));
    } else {
      pen.selected[`element${elCount++}`] = el;
      return doc.querySelector(el);
    }
  };
  pen.$$ = vrs.$$ = (el, ps) => {
    var els;
    els = vrs.slice(document.querySelectorAll(el));
    return ps === true ? els.map(el => {pen.selected[`element${elCount++}`] = el; return pen(el)}) : (els.forEach(el => {pen.selected[`element${elCount++}`] = el}), els);
  };
  pen.create = (el, parseIt = false) => parseIt === true ? pen(doc.createElement (el)) : doc.createElement(el);
  pen.addedFunctions = {};
  pen.parse = {
    attributes: vrs.parser(vrs.regs.attribute, 1, 3),
    element: function(str) {
      var attribs, e, s, stTag, tag, text;
      s = str.search('<');
      e = str.search('>') + 1;
      stTag = str.slice(s, e);
      s = stTag.search(' ') + 1;
      e = stTag.search('>');
      attribs = stTag.slice(s, e);
      s = stTag.search('<') + 1;
      e = stTag.search(' ');
      tag = stTag.slice(s, e);
      s = str.search('>') + 1;
      e = str.search('</');
      text = str.slice(s, e);
      return [str, stTag, attribs, tag, (text === '' ? null : text)];
    }
  };
  pen.add = function(func, name) {
    var fname, results1, t;
    t = vrs.type(func);
    if (t === 'object') {
      results1 = [];
      for (fname in func) {
        pen.addedFunctions[fname] = func[fname];
        results1.push(pen.prototype[fname] = func[fname]);
      }
      return results1;
    } else if (t === 'function') {
      if (func.name == null) {
        if (name != null) {
          pen.addedFunctions[name] = func;
          return pen.prototype[name] = func;
        } else {
          return vrs.penError("Pen-add 'no-name'", "function, must have a name. Cannot be anonymous");
        }
      } else {
        pen.addedFunctions[func.name] = func;
        return pen.prototype[func.name] = func;
      }
    }
  };
  pen.prototype.start = function(ele, ops) {
    var el, prop, t, t1;
    t = vrs.type(ops);
    if (t === 'string') {
      el = pen.$(ops, true);
      if (/\.|#|\[\]/gi.test(ele)) {
        ele = el.$(ele);
      } else {
        ele = el.create(ele);
      }
    } else {
      this.initOptions(ops);
    }
    this.el = ele;
    t1 = vrs.type(this.el);
    if (this.el instanceof Document) {
      this.body = window['pBody'];
      this.head = window['pHead'];
      pen.prototype.ready = function(cb) {
        this.on('DOMContentLoaded', cb);
        return this;
      };
    } else if (this.el instanceof Window) {
      this.doc = this.el.document;
    } else if (this.el instanceof pen) {
      for (prop in ele) {
        this[prop] = ele[prop];
      }
    } else if (t1 === 'string') {
      this.el.startsWith('define') === true ? this.define(this.el) : this.setup(this.el);
    }
    if (this.ops.autoAttach === true) {
      this.ops.autoAttachTo.append(element);
    }
    return this;
  };
  pen.prototype.initOptions = function(ops) {
    this.ops = {
      autoAttach: ((ops != null) && (ops.autoAttach != null) ? ops.autoAttach : false),
      autoAttachTo: ((ops != null) && (ops.autoAttachTo != null) ? ops.autoAttachTo : window['body']),
      global: {
        parseIt: ((ops != null) && (ops.global != null) && (ops.global.parseIt != null) ? ops.global.parseIt : false),
        create: ((ops != null) && (ops.global != null) && (ops.global.create != null) ? ops.global.create : 'return child'),
        html: {
          app: ((ops != null) && (ops.global != null) && (ops.global.html != null) && (ops.global.html.app != null) ? ops.global.html.app : false),
          parse: ((ops != null) && (ops.global != null) && (ops.global.html != null) && (ops.global.html.parse != null) ? ops.global.html.parse : false)
        }
      }
    };
    return this.ops;
  };
  pen.prototype.toString = function () {return this.el.outerHTML;};
  pen.prototype.define = function(toDef) {
    var func, oname, t;
    if (vrs.regs.define.test(toDef) === true) {
      [func, oname, t] = vrs.regs.define.exec(toDef).slice(1, 4);
      if (t != null) {
        t.trim() === 'locally' ? vrs[func] : window[oname] = vrs[func];
      } else {
        window[onmae] = vrs[func];
      }
    }
  };
  pen.prototype.setup = function(el) {
    var attribs, attributes, prop, startTag, t, tag, text, whole;
    t = vrs.type(el);
    if (t === 'string') {
      if (el.startsWith('<')) {
        [whole, startTag, attributes, tag, text] = pen.parse.element(el);
        attribs = pen.parse.attributes(attributes);
        this.el = pen.create(tag);
      } else {
        this.el = pen.$(el);
      }
    } else {
      this.el = el;
    }
    for (prop in attribs) {
      this.attr(prop, attribs[prop]);
    }
    if (text != null) {
      this.html(text, {
        parse: true
      });
    }
    this.inits();
    this.partialSetup();
  };
  pen.prototype.partialSetup = function(ev) {
    var height, szlp, width;
    this.attributes.id = vrs.detectAndReturn('id', this.el);
    this.attributes.class = vrs.detectAndReturn('class', this.el);
    szlp = this.el.getBoundingClientRect();
    this.size = {width, height} = szlp;
    this.inits();
    switch (this.tag) {
      case 'template':
        this.content = this.el.content;
        pen.prototype.clone = function() {
          var args;
          args = arguments;
          return document.importNode(...args);
        };
        break;
      case 'canvas':
        this.ctx = this.context = this.el.getContext('2d');
    }
    return this;
  };
  pen.prototype.initTag = function() {
    return this.tag = this.el.tagName != null ? this.el.tagName.toLowerCase() : 'ios-element';
  };
  pen.prototype.initText = function() {
    return this.text = this.html();
  };
  pen.prototype.initChildren = function() {
    return this.Children = this.tag === 'template' ? this.el.content.children : this.el.children;
  };
  pen.prototype.initParent = function() {
    return this.Parent = this.el.parentNode != null ? this.el.parentNode : null;
  };
  pen.prototype.initLocalName = function() {
    var res1, res2;
    this.initAttributes();
    this.initTag();
    res1 = this.attributes.id != null ? `#${this.attributes.id}` : '';
    res2 = this.attributes.class != null ? `.${vrs.slice(this.el.classList).join('.')}` : '';
    return this.localName = `${this.tag}${res1}${res2}`;
  };
  pen.prototype.initClasses = function() {
    return this.Classes = vrs.slice(this.el.classList);
  };
  pen.prototype.initAttributes = function() {
    var ret;
    ret = vrs.slice(this.el.attributes).map((result) => {
      this.attributes[result.name] = result.value;
      return `${result.name}='${result.value}'`;
    });
    return ret;
  };
  pen.prototype.inits = function() {
    var ret;
    ret = {};
    ret.tag = this.initTag();
    ret.text = this.initText();
    ret.children = this.initChildren();
    ret.parent = this.initParent();
    ret.attributes = this.initAttributes();
    ret.classes = this.initClasses();
    ret.localName = this.initLocalName();
    return ret;
  };
  pen.prototype.html = function(str, ops) {
    var parse;
    parse = ops != null ? ops.parse || false : this.ops.global.html.parse;
    this.initTag();
    switch (this.tag) {
      case 'input':
      case 'textarea':
        return vrs.defo('value', str, this, ops);
      case 'option':
        vrs.defo('value', str, this, ops);
        return vrs.defo('innerText', str, this, ops);
      default:
        return vrs.defo((parse ? 'innerHTML' : 'innerText'), str, this, ops);
    }
  };
  pen.prototype.attr = function(attribute, value) {
    var attr, attrs, func;
    func = vrs.funcoso(this, 'attributes', 'setAttribute');
    if (attribute != null) {
      if (vrs.type(attribute) === 'object') {
        this.attributes['class'] = attribute != null ? attribute.id : void 0;
        this.attributes['id'] = attribute != null ? attribute.class : void 0;
        return func(attribute);
      } else if (value != null) {
        this.el.setAttribute(attribute, value);
        this.attributes[attribute] = value;
        this.inits();
        return this;
      } else if (vrs.type(attribute) === 'string' && (value == null)) {
        attrs = pen.parseAttributes(attribute);
        for (attr in attrs) {
          this.el.setAttribute(attr, attrs[attr]);
          this.attributes[attr] = attrs[attr];
        }
        this.inits();
        return this;
      } else {
        this.inits();
        return this.el.getAttribute(attribute);
      }
    } else {
      return this.attributes;
    }
  };
  pen.prototype.css = function(rule, rules) {
    var func, st, style, styles;
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
            this.style[rule] = rules;
            this.el.style[rule] = rules;
            return this;
          } else {
            styles = pen.parseCss(rule);
            for (style in styles) {
              st = styles[style];
              this.style[style] = st;
              this.el.style[style] = st;
            }
            return this;
          }
          break;
        default:
          return this.el.style[rule];
      }
    } else {
      return this.style;
    }
  };
  pen.prototype.on = function(evtp, cb, cp) {
    var typeEvent;
    cp = cp || false;
    this.events = this.events || {};
    this.events[evtp] = {};
    this.events[evtp].capture = cp;
    this.events[evtp][cb.name !== '' ? cb.name : 'func'] = cb;
    typeEvent = this.el.addEventListener != null ? 'addEventListener' : this.el.attachEvent != null ? 'attachEvent' : `on${evtp}`;
    switch (typeEvent) {
      case 'addEventListener':
        this.el[typeEvent](...arguments);
        break;
      case 'attachEvent':
        this.el[typeEvent](evtp, cb);
        break;
      default:
        this.el[typeEvent] = cb;
    }
    return this;
  };
  pen.prototype.off = function(evtp, cb) {
    var typeEvent;
    typeEvent = this.el.removeEventListener != null ? 'removeEventListener' : this.el.detachEvent != null ? 'detachEvent' : `on${evtp}`;
    switch (typeEvent) {
      case 'removeEventListener':
        this.el[typeEvent](evtp, cb);
        break;
      case 'detachEvent':
        this.el[typeEvent](evtp, cb);
        break;
      default:
        this.el[typeEvent] = null;
    }
    delete this.events[evtp];
    return this;
  };
  pen.prototype.is = function(tag) {
    return this.tag === tag;
  };
  pen.prototype.append = function(...elements) {
    elements.forEach((element) => {
      var elu;
      if (vrs.type(element) === 'string') {
        element = vrs.$(element);
      } else if (element instanceof pen) {
        element.Parent = this.el;
      }
      elu = (element instanceof pen ? element.el : element);
      return this.tag === 'template' ? this.el.content.appendChild(elu) : this.el.appendChild(elu);
    });
    return this;
  };
  pen.prototype.appendTo = function(element) {
    pen(element).append(this.el);
    return this;
  };
  pen.prototype.remove = function() {
    this.Parent.removeChild(this.el);
    this.Parent = null;
    return this;
  };
  pen.prototype.$ = function(element, parseIt = false) {
    var result;
    result = this.tag === 'template' ? this.el.content : this.el;
    result = this.ops.global.parseIt === true ? pen(result.querySelector(element)) : parseIt === true ? pen(result.querySelector(element)) : result.querySelector(element);
    return result;
  };
  pen.prototype.$$ = function(element) {
    var result;
    result = this.tag === 'template' ? this.el.content : this.el;
    return result.querySelectorAll(element);
  };
  pen.prototype.create = pen.prototype.createElement = function(element, ret) {
    var result;
    element = pen(element);
    this.append(element);
    if (/child|parent/gi.test(ret) === true) {
      result = `return ${ret}`;
      return result.endsWith("parent") === true ? this : element;
    } else {

    }
  };
  pen.prototype.toggle = function(...classes) {
    classes.forEach((classs) => {
      return this.el.classList.toggle(classs);
    });
    return this;
  };
  pen.prototype.hasClass = function(cls) {
    var clss, i, len, ref;
    this.initClasses();
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
    if (this.hidden !== true) {
      this.hidden = true;
      this.css('display', 'none');
    } else {
      this.hidden = false;
      this.css('display', '');
    }
  };
  pen.prototype.getSize = function() {
    return {
      width: this.el.getBoundingClientRect().width,
      height: this.el.getBoundingClientRect().height
    };
  };
  atribs = "id class href src contentEditable charset title rows cols style".split(/\s+/g);
  evps = "click keyup keypress keydown mouse mouseup error load mouseover mousedown mouseout contextmenu dblclick drag dragover drop dropend".split(/\s+/g);
  atribs.forEach(function(atrib) {
    return pen.prototype[atrib] = function() {
      return str != null ? this.attr(atrib, ...arguments) : this.attr(atrib);
    };
  });
  evps.forEach(function(evp) {
    return pen.prototype[evp] = function() {
      return this.events[evp] == null ? this.on(evp, ...arguments) : this.off(evp, ...arguments);
    };
  });
  pen.vrs = vrs;
  return pen;
})();
