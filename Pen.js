var pen;

pen = (function() {
  var elCount, i, ldr, len, name, ref, vrs;
  Object.prototype.forEach = function(cb) {
    var it, key;
    it = this;
    for (key in it) {
      cb(key, it[key], it);
    }
  };
  Object.prototype.filter = function(cb) {
    var it, key, obj, res;
    it = this;
    obj = {};
    for (key in it) {
      res = cb(key, it[key], it);
      if (res === true) {
        obj[key] = it[key];
      }
    }
    return obj;
  };
  Object.prototype.map = function(cb) {
    var it, key, obj, res;
    it = this;
    obj = {};
    for (key in it) {
      res = cb(key, it[key], it);
      obj[key] = res;
    }
    return obj;
  };
  vrs = {};
  elCount = 0;
  vrs.class2Type = {};
  vrs.proto = function() {
    return arguments[0].prototype;
  };
  ref = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split(/\s+/gi);
  for (i = 0, len = ref.length; i < len; i++) {
    name = ref[i];
    vrs.class2Type[`[object ${name}]`] = name.toLowerCase();
  }
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
  vrs.regs = {
    attribute: /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi,
    css: /([^\n;: ]+):([^\n]+);/gi,
    define: /define\s*([^\n\ ]+)\s*as\s*([^\n\ ,]+)(\s*(?:global|local)ly)?/i,
    tag: /<([^\n]*?)>/gi,
    eleme: /<([^\n]*?)>([\S\s]*?)<\/([^\n]*?)>/gi,
    innerText: />([\S\s]*?)</gi
  };
  vrs.type = (obj) => {
    var strType;
    strType = vrs.toString(obj);
    return vrs.class2Type[strType] || 'object';
  };
  vrs.str = (reg, flags) => {
    var ty;
    flags = flags || 'gi';
    ty = vrs.type(reg);
    return ty === 'string' ? new RegExp(reg, flags) : reg;
  };
  vrs.parser = function(regs, flags, num1, num2) {
    var resg;
    flags = flags || 'gi';
    num1 = num1 || 1;
    num2 = num2 || 2;
    resg = regs;
    regs = vrs.str(regs, flags);
    return (str) => {
      var j, len1, match, retsi, returns;
      if (str != null) {
        returns = str.match(regs);
        if (returns != null) {
          retsi = {};
          for (j = 0, len1 = returns.length; j < len1; j++) {
            match = returns[j];
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
    vrs.log(str);
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
  vrs.def = (it, el) => {
    it.tag = null;
    it.text = null;
    it.Children = [];
    it.Parent = null;
    it.localName = null;
    it.Classes = [];
    it.events = {};
    it.hidden = false;
    it.attributes = {};
    it.style = {};
    it.el = el;
    return it;
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
    if (!(this instanceof pen)) {
      return new pen(...arguments);
    }
    vrs.def(this, arguments[0]);
  };
  pen.ink = pen.prototype = {};
  pen.genId = () => vrs.iterate('0 1 2 3 4 5 6 7 8 9'.split(/\s+/g), 5);
  pen.seleted = {};
  pen.$ = function() {
    var el, els, ps;
    pen.selected = pen.selected || {};
    if (vrs.type(arguments[0]) === 'array') {
      els = arguments[0];
      ps = arguments[1] || false;
      els = els.map((el) => {
        el = ps ? pen(document.querySelector(el)) : document.querySelector(el);
        pen.selected[`element${++elCount}`] = el instanceof pen ? el.el : el;
        if (el instanceof pen) {
          return el.el;
        } else {
          return el;
        }
      });
      return els;
    } else if (vrs.type(arguments[0]) === 'object') {

    } else {
      el = arguments[0];
      ps = arguments[1] || false;
      el = ps ? pen(document.querySelector(el)) : document.querySelector(el);
      pen.selected[`element${++elCount}`] = el instanceof pen ? el.el : el;
      return el;
    }
  };
  pen.$$ = function() {
    var el;
    return el = arguments[0];
  };
  pen.vrs = vrs;
  return pen;
})();
