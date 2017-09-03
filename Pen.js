var pen;

pen = (function() {
  var atribs, doc, elCount, evps, ldr, vrs, win;
  vrs = {};
  elCount = 0;
  win = window;
  doc = document;
  vrs.proto = function() {
    return arguments[0].prototype;
  };
  vrs.arr = vrs.proto(Array);
  vrs.obj = vrs.proto(Object);
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
  vrs.str = (regs, flags) => {
    if (vrs.type(regs) === 'string') {
      return new RegExp(regs, flags);
    } else {
      return regs;
    }
  };
  vrs.regs = {
    attribute: /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi,
    css: /([^\n;: ]+):([^\n]+);/gi,
    define: /define\s*([^\n\ ]+)\s*as\s*([^\n\ ,]+)(\s*(?:global|local)ly)?/i,
    tag: /<([^\n]*?)>/gi,
    eleme: /<([^\n]*?)>([\S\s]*?)<\/([^\n]*?)>/gi,
    innerText: />([\S\s]*?)</gi
  };
  vrs.type = (function() {
    var class2Type, names;
    class2Type = {};
    names = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split(/\s+/gi);
    names.forEach((name) => {
      return class2Type[`[object ${name}]`] = name.toLowerCase();
    });
    return function(obj) {
      var strType;
      strType = Object.prototype.toString.call(obj);
      return class2Type[strType] || 'object';
    };
  })();
  vrs.parser = function(regs, flags, num1, num2) {
    var resg;
    flags = flags || 'gi';
    num1 = num1 || 1;
    num2 = num2 || 2;
    resg = regs;
    regs = vrs.str(regs, flags);
    return (str) => {
      var i, len, match, retsi, returns;
      if (str != null) {
        returns = str.match(regs);
        if (returns != null) {
          retsi = {};
          for (i = 0, len = returns.length; i < len; i++) {
            match = returns[i];
            match.trim().replace(regs, function(...args) {
              if (vrs.type(resg) === 'string') {
                retsi[args[num1]] = args[num2];
              } else {
                retsi[args[flags]] = args[num1];
              }
            });
          }
          return retsi;
        } else {
          return null;
        }
      } else {
        return null;
      }
    };
  };
  vrs.log = console.log;
  vrs.error = console.error;
  vrs.dir = console.dir;
  ldr = (ev) => {
    window['body'] = document.body;
    window['pBody'] = pen(body);
    window['head'] = document.head;
    window['pHead'] = pen(head);
  };
  document.addEventListener("DOMContentLoaded", ldr, {
    once: true
  });
  vrs.detectAndReturn = (ting, ev) => {
    if (ev.hasAttribute(ting) === true) {
      return ev.getAttribute(ting);
    } else {
      return null;
    }
  };
  vrs.defo = (prop, str, it, ops) => {
    var app, parse;
    if (ops != null) {
      app = ops.app || false;
      parse = ops.parse || false;
    } else {
      app = it.ops.global.html.app || false;
      parse = it.ops.global.html.parse || false;
    }
    it.text = str;
    if (str != null) {
      if (app === true) {
        if (/input|option|textarea/i.test(it.tag) === true) {
          it.attr('value', `${it.el.getAttribute('value')}${str}`);
        } else {
          it.el[prop] += str;
        }
      } else {
        if (/input|option|textarea/i.test(it.tag) === true) {
          it.attr('value', str);
        } else {
          it.el[prop] = str;
        }
      }
      return it;
    } else {
      return it.el[prop];
    }
  };
  vrs.funcoso = function(it, typeso, typesi) {
    var chk1, funcso;
    if (typesi == null) {
      typesi = typeso;
    }
    chk1 = function(whl, propz, prop) {
      if (vrs.type(it.el[typesi]) === 'function') {
        it.el[typesi](whl, propz[prop]);
      } else {
        it.el[typesi][whl] = propz[prop];
      }
    };
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
  vrs.penError = (name, msg) => {
    var er;
    er = new Error(msg);
    er.name = name;
    throw er;
  };
  vrs.resolve = function(res) {
    switch (type(res)) {
      case 'string':
        return pen(res);
      case 'array':
        return pen(...res);
    }
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
      return pen(doc.querySelector(el));
    } else {
      return doc.querySelector(el);
    }
  };
  pen.$$ = (el, ps) => {
    var els, re;
    els = document.querySelectorAll(el);
    els = vrs.slice(els);
    if (ps === true) {
      re = els.map((el) => pen(el));
      return re;
    } else {
      return els;
    }
  };
  pen.create = pen.createElement = (el, parseIt = false) => {
    if (parseIt === true) {
      return pen(doc.createElement(el));
    } else {
      return doc.createElement(el);
    }
  };
  pen.addedFunctions = {};
  pen.parse = {
    attributes: vrs.parser(vrs.regs.attribute, 1, 3),
    css: vrs.parser(vrs.regs.css, 1, 2),
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
  pen.findInObj = function(obj, key, defin) {
    var kname;
    if (vrs.type(key) === 'string') {
      key = new RegExp(key, 'i');
    }
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
      if (this.el.startsWith('define') === true) {
        this.define(this.el);
      } else {
        this.setup(this.el);
      }
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
  pen.prototype.toString = () => {
    return this.el.outerHTML;
  };
  pen.prototype.define = function(toDef) {
    var func, oname, t;
    if (vrs.regs.define.test(toDef) === true) {
      [func, oname, t] = vrs.regs.define.exec(toDef).slice(1, 4);
      if (t != null) {
        t = t.trim();
        if (t === 'locally') {
          vrs[func];
        } else {
          window[oname] = vrs[func];
        }
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
    var szlp;
    this.attributes.id = vrs.detectAndReturn('id', this.el);
    this.attributes.class = vrs.detectAndReturn('class', this.el);
    szlp = this.el.getBoundingClientRect();
    this.size = {
      width: szlp.width,
      height: szlp.height
    };
    this.inits();
    switch (this.tag) {
      case 'template':
        this.content = this.el.content;
        pen.prototype.clone = function() {
          var args;
          args = vrs.slice(arguments);
          return document.importNode([...args]);
        };
        break;
      case 'canvas':
        this.ctx = this.context = this.el.getContext('2d');
    }
    return this;
  };
  pen.prototype.initTag = function() {
    var tag;
    tag = this.tag = this.el.tagName != null ? this.el.tagName.toLowerCase() : 'ios-element';
    return tag;
  };
  pen.prototype.initText = function() {
    var text;
    text = this.text = this.html;
    return text;
  };
  pen.prototype.initChildren = function() {
    var children;
    children = this.Children = this.tag === 'template' ? this.el.content.children : this.el.children;
    return children;
  };
  pen.prototype.initParent = function() {
    var parent;
    parent = this.Parent = this.el.parentNode != null ? this.el.parentNode : null;
    return parent;
  };
  pen.prototype.initLocalName = function() {
    var res1, res2, str;
    this.initAttributes();
    this.initTag();
    res1 = this.attributes.id != null ? `#${this.attributes.id}` : '';
    res2 = this.attributes.class != null ? `.${vrs.slice(this.el.classList).join('.')}` : '';
    str = `${this.tag}${res1}${res2}`;
    this.localName = str;
    return str;
  };
  pen.prototype.initClasses = function() {
    var res;
    res = vrs.slice(this.el.classList);
    this.Classes = res;
    return res;
  };
  pen.prototype.initAttributes = function() {
    var results, ret;
    results = vrs.slice(this.el.attributes);
    ret = results.map((result) => {
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
    var app, parse;
    if (ops != null) {
      app = ops.app != null ? ops.app : false;
      parse = ops.parse != null ? ops.parse : false;
    } else {
      app = this.ops.global.html.app != null ? this.ops.global.html.app : false;
      parse = this.ops.global.html.parse != null ? this.ops.global.html.parse : false;
    }
    this.initTag();
    switch (this.tag) {
      case 'input':
      case 'textarea':
        return vrs.defo('value', str, this, ops);
      case 'option':
        vrs.def('value', str, this, ops);
        return vrs.defo('innerText', str, this, ops);
      default:
        return vrs.defo((parse === true ? 'innerHTML' : 'innerText'), str, this, ops);
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
    if (cp == null) {
      cp = false;
    }
    if (this.events == null) {
      this.events = {};
    }
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
  pen.prototype.is = (tag) => {
    return this.tag === tag;
  };
  pen.prototype.append = function(...elements) {
    elements.forEach((element) => {
      var elu;
      if (vrs.type(element) === 'string') {
        element = pen.$(element);
      } else if (element instanceof pen) {
        element.Parent = this.el;
      }
      elu = (element instanceof pen ? element.el : element);
      if (this.tag === 'template') {
        return this.el.content.appendChild(elu);
      } else {
        return this.el.appendChild(elu);
      }
    });
    return this;
  };
  pen.prototype.appendTo = function(element) {
    if (vrs.type(element) === 'string') {
      element = pen.$(element);
    }
    pen(element).append(this.el);
    return this;
  };
  pen.prototype.remove = function() {
    var check;
    check = this.Parent != null ? 'Parent' : this.el.parentNode != null ? 'parentNode' : null;
    if (check != null) {
      this[check].removeChild(this.el);
      this.Parent = null;
    } else {
      log(`Pen-remove-error: There's no parent to remove child: ${this.localName} from`);
    }
    return this;
  };
  pen.prototype.$ = function(element, parseIt) {
    var result;
    result = this.tag === 'template' ? this.el.content : this.el;
    if (this.ops.global.parseIt === true || parseIt === true) {
      return pen(result.querySelector(element));
    } else {
      return result.querySelector(element);
    }
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
      if (result.endsWith("parent") === true) {
        return this;
      } else {
        return element;
      }
    } else {

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
  atribs = ['id', 'class', 'href', 'src', 'contentEditable', 'charset', 'title', 'rows', 'cols', 'style'];
  evps = ['click', 'keyup', 'keypress', 'keydown', 'mouse', 'mouseup', 'error', 'load', 'mouseover', 'mousedown', 'mouseout', 'contextmenu', 'dblclick', 'drag', 'dragover', 'drop', 'dropend'];
  atribs.forEach(function(atrib) {
    return pen.prototype[atrib] = function() {
      if (typeof str !== "undefined" && str !== null) {
        this.attr(atrib, ...arguments);
      } else {
        this.attr(atrib);
      }
    };
  });
  evps.forEach(function(evp) {
    return pen.prototype[evp] = function() {
      if (this.events[evp] == null) {
        this.on(evp, ...arguments);
      } else {
        this.off(evp, ...arguments);
      }
    };
  });
  pen.vrs = vrs;
  return pen;
})();
