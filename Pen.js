var pen;

pen = (function() {
  var dir, doc, elCount, error, ldr, log, names, vrs, win;
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
    for (var i = 0; i < times; ++i) {res.push(vrs.ranDos(arr));};
    return `i${res.join('')}`;
  };
  vrs.str = (regs, flags) => vrs.type(regs) === 'string' ? new RegExp(regs, flags) : regs;
  vrs.regs = {
    attribute: /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi,
    css: /([^\n;: ]+):([^\n]+);/gi,
    tag: /<([^\n]*?)>/gi,
    eleme: /<([^\n]*?)>([\S\s]*?)<\/([^\n]*?)>/gi,
    innerText: />([\S\s]*?)</gi
  };
  vrs.class2Type = {};
  names = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split(/\s+/gi);
  names.forEach(name => {vrs.class2Type[`[object ${name}]`] = name.toLowerCase()});
  vrs.type = (obj) => (vrs.class2Type[vrs.toString(obj)] || 'object');
  vrs.parser = function(regs, flags) {
    regs = vrs.str(regs, flags || 'gi');
    return (str) => {
      var results, retsi;
      retsi = {};
      str = str || '';
      results = str.match(regs);
      if ((results != null) && results.length !== 0) {
        results.forEach((match) => {
          var name, reg, value;
          if (match.includes("=")) {
            [name, value] = match.split("=");
            reg = /^['"]([^\n]+)['"]$/m;
            value = value.replace(reg, '$1');
            retsi[name] = value;
          }
        });
        return retsi;
      }
    };
  };
  ({log, error, dir} = console);
  vrs.detectAndReturn = (ting, ev) => ev.hasAttribute(ting) === true ? ev.getAttribute(ting) : null;
  vrs.funcoso = function(it, typeso, typesi) {
    var funcso;
    if (typesi == null) {
      typesi = typeso;
    }
    chk1 = (whl, propz, prop) => vrs.type(it.el[typesi]) === 'function' ? it.el[typesi](whl, propz[prop]) : it.el[typesi][whl] = propz[prop];
    funcso = function(propz, nm) {
      var prop, prp;
      for (prop in propz) {
        prp = propz[prop];
        if (vrs.type(prp) === 'object') {
          funcso(prp, prop);
        } else {
          if (nm != null) {
            chk1(`${nm}-${prop}`, propz, prop);
          } else {
            chk1(prop, propz, prop);
          }
        }
      }
      return it;
    };
    return funcso;
  };
  vrs.searchAndSlice = (str, ...els) => els.map(el => str.search(el));
  vrs.penError = (name, msg) => {er = new Error(msg); er.name = name; throw er;};
  pen = function() {
    var args;
    args = arguments;
    if (!(this instanceof pen)) {
      return new pen(...args);
    }
    if (args[0] instanceof pen) {
      return args[0];
    }
    this.hidden = false;
    this.cel = null;
    this.attrs = null;
    this.start(...args);
  };
  pen.ink = pen.prototype = {};
  pen.selected = {};
  pen.created = {};
  pen.$ = function(el, ps = false) {
    var selec;
    if (vrs.type(el) === 'string') {
      selec = doc.querySelector(el);
      pen.selected[`element${elCount++}`] = selec;
      return ps === true ? pen(selec) : selec;
    } else {
      return el;
    }
  };
  pen.$$ = (el, ps) => {
    var els, elv;
    els = vrs.slice(document.querySelectorAll(el));
    els.forEach(el => {pen.selected["element#{elCount++}"] = el});
    elv = ps === true ? els.map(el => {return pen(el)}) : els;
    return elv;
  };
  pen.create = (el, parseIt = false) => {
    el = doc.createElement(el);
    pen.created[`element${elCount++}`] = el;
    return parseIt === true ? pen(el) : el;
  };
  pen.parse = {
    attributes: vrs.parser(vrs.regs.attribute),
    element: function(str) {
      var attribs, e, s, stTag, tag, text;
      [s, e] = vrs.searchAndSlice(str, '<', '>');
      stTag = str.slice(s, e + 1);
      [s, e] = vrs.searchAndSlice(stTag, ' ', '>');
      attribs = stTag.slice(s + 1, e);
      [s, e] = vrs.searchAndSlice(stTag, '<', ' ');
      tag = stTag.slice(s + 1, e);
      [s, e] = vrs.searchAndSlice(str, '>', '</');
      text = str.slice(s + 1, e);
      return [str, stTag, (attribs === `<${tag}` ? null : attribs), tag, (text === '' ? null : text)];
    }
  };
  pen.prototype.start = function(ele, ops) {
    var el, t, t1;
    t = vrs.type(ops);
    if (t === 'string') {
      el = pen.$(ops, true);
      ele = /\.|#|\[\]/gi.test(ele) === true ? el.$(ele) : el.create(ele);
    } else {
      this.initOptions(ops);
    }
    this.el = ele;
    t1 = vrs.type(this.el);
    if (t1 === 'object') {
      this.partialSetup();
    } else if (t1 === 'string') {
      this.setup(this.el);
    }
    if (this.ops.autoAttach === true) {
      this.ops.autoAttachTo.append(this.el);
    }
    return this;
  };
  pen.prototype.initOptions = function(ops) {
    this.ops = {
      autoAttach: (ops != null ? ops.autoAttach || false : false),
      autoAttachTo: (ops != null ? ops.autoAttachTo || window['body'] : window['body']),
      global: {
        parseIt: ((ops != null) && (ops.global != null) ? ops.global.parseIt || false : false),
        create: ((ops != null) && (ops.global != null) ? ops.global.create || 'return child' : 'return child'),
        html: {
          app: ((ops != null) && (ops.global != null) && (ops.global.html != null) ? ops.global.html.app || false : false),
          parse: ((ops != null) && (ops.global != null) && (ops.global.html != null) ? ops.global.html.parse || false : false)
        }
      }
    };
    return this.ops;
  };
  pen.prototype.toString = function () {return this.el.outerHTML;};
  pen.prototype.setup = function(el) {
    var attribs, attributes, name, startTag, t, tag, text, value, whole;
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
    for (name in attribs) {
      value = attribs[name];
      this.attr(name, value);
    }
    if ((text != null) && text.length !== 0) {
      this.html(text, {
        parse: true
      });
    }
    this.partialSetup();
  };
  pen.prototype.partialSetup = function() {
    Object.defineProperties(this, {
      tag: {
        get: function() {
          return (this.el.tagName || 'IOS-ELEMENT').toLowerCase();
        }
      },
      cel: {
        get: function() {
          if (this.tag === 'template') {
            return this.el.content;
          } else {
            return this.el;
          }
        }
      },
      text: {
        get: function() {
          return this.html();
        },
        set: function(str) {
          return this.html(str);
        },
        configurable: true
      },
      Children: {
        get: function() {
          return this.cel.children;
        },
        set: function(...el) {
          return this.append(...el);
        }
      },
      Parent: {
        get: function() {
          return this.el.parentNode || null;
        },
        set: function(el) {
          return pen(el).append(this);
        },
        configurable: true
      },
      Classes: {
        get: function() {
          return vrs.slice(this.el.classList);
        }
      },
      attrs: {
        get: function() {
          var ar;
          ar = {};
          vrs.slice(this.el.attributes).forEach((res) => {
            return ar[res.name] = res.value;
          });
          return ar;
        },
        set: function(obj) {
          return this.attr(obj);
        },
        configurable: true
      },
      selector: {
        get: function() {
          var res1, res2;
          res1 = this.attrs.id != null ? `#${this.attrs.id}` : '';
          res2 = this.attrs.class != null ? `.${this.Classes.join('.')}` : '';
          return `${this.tag}${res1}${res2}`;
        }
      },
      size: {
        get: function() {
          return this.el.getBoundingClientRect();
        }
      }
    });
    this.el.events = {};
    if (this.el instanceof Document) {
      this.body = window['pBody'];
      this.head = window['pHead'];
      pen.prototype.ready = function() {
        var args;
        args = arguments;
        this.on('DOMContentLoaded', ...args);
        return this;
      };
    } else if (this.el instanceof Window) {
      this.doc = this.el.document;
    }
    switch (this.tag) {
      case 'template':
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
  pen.prototype.html = function(str, ops) {
    var app, livi, parse, reg, res;
    parse = ops != null ? ops.parse || false : this.ops.global.html.parse;
    app = ops != null ? ops.app || false : this.ops.global.html.app;
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
        livi('value', str);
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
          rule = rule.replace(/-(\w{1})/g, (whole, dash) => {
            return dash.toUpperCase();
          });
          this.el.style[rule] = rules;
          return this;
        default:
          return this.el.style[rule];
      }
    } else {
      return this.el.style;
    }
  };
  pen.prototype.on = function(evtp, cb, cp) {
    cp = cp || false;
    this.el.events = this.el.events || {};
    this.el.events[evtp] = {};
    this.el.events[evtp].capture = cp;
    this.el.events[evtp][cb.name || 'func'] = cb;
    this.el.addEventListener(...arguments);
    return this;
  };
  pen.prototype.off = function(evtp, cb) {
    this.el.removeEventListener(evtp, cb);
    delete this.el.events[evtp];
    return this;
  };
  pen.prototype.append = function(...elements) {
    elements.forEach((element) => {
      var elu;
      element = pen.$(element);
      elu = (element instanceof pen ? element.el : element);
      return this.cel.appendChild(elu);
    });
    return this;
  };
  pen.prototype.appendTo = function(element) {
    pen(element).append(this);
    return this;
  };
  pen.prototype.remove = function() {
    this.el.remove();
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
  pen.vrs = vrs;
  return pen;
})();
