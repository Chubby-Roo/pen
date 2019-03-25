let Container;

Container = function (cls, id, elm, attrs) {
  if (!(this instanceof Container)) {return new Container(...arguments)}
  if (cls instanceof Container) {return cls}
  let args = pen.slice(arguments);
  for (let i =0, len = args.length; i < len; i++) {
    if ('object' === pen.type(args[i])) {
      attrs = args[i];
      break
    }
  }
  if ((id == null) || pen.empty(id)) id = pen.cc(cls);
  if ((elm == null) || pen.empty(elm)) elm = 'div';
  this.cont = pen(`<${elm} class="${cls}" id="${id}">`);
  if (attrs != null) this.cont.attr(attrs);
  this.els = [];
  return this;
}
Container.deleteDocs = function (el) {
  delete el._documentize;
  return el;
}
Container.prototype = {
  get id () {return this.cont.attr('id')},
  set id (x) {this.cont.attr('id', x)},
  get class () {return this.cont.attr('class')},
  set class (x) {this.cont.attr('class', x)},
  get length () {return this.els.length},
  _setup (el) {
    let it = this;
    el = this.cont.create(el, 'child');
    el._documentize = function (ne) {
      if (pen.type(ne) === 'string') {
        if (pen.empty(name) !== false) {console.warn("argument musn't be empty")}
        it.els.push({name, id:it.length, el, initiated:!1});
        for (let i = 0, len = it.length, uel; i < len; i++) {uel = it.els[i]; it.initiate(uel)}
        Container.deleteDocs(el);
      }
      Container.deleteDocs(el);
      return el;
    }
    return el;
  }, _cre (el) {
    if (pen.type(el) === 'array') {
      let arr = [];
      for (let i = 0, len = el.length; i < len; i++) {arr.push(this._setup(el[i]))}
      return arr;
    } else {
      el = this.cont.create(el, 'child');
      el = this._setup(el);
      return el;
    }
  }, initiate (info) {
    if (!info.initiate) {
      this[`${info.name}Cre`] = info.el;
      info.initiate = !0;
    }
    return info;
  }, create (el, prom = !1) {
    if (prom) {
      return new Promise((res, rej) => {try {res(this._cre(el))} catch (err) {rej(err)}})
    } else {
      return this._cre(el);
    }
  }, find (type, data, prom = !1) {
    let info;
    for (let i =0, len = this.length; i < len; i++) {
      if (this.els[i][type] === data) {
        info = this.els[i];
        break;
      }
    }
    if (prom)
      return new Prom((res) => {info != null ? res(info) : rej(new Error(`Couldn't find ${data}`))});
    else
      return info != null ? info : null;
  }, remove (type, data, prom = !1) {
    if (prom) {
      this.find(type, data, prom).then((info) => {
        this.els.splice(info.id, 1);
      }).catch(console.error);
    } else {
      let info = this.find(type, data, prom);
      if (info != null) {this.els.splice(info.id, 1)} else {throw new Error(`Couldn't remove ${data}`)}
    }
    return this;
  }, desroy (el) {
    switch (el != null) {
      case !0: this.el.appendTo(el); break;
      default: this.el.remove(!0);
    }
    return this;
  }, toString () {return `<Container ${this.cont.selector}${(this.length !== 0 ? `, Els:${this.length}` : '')}>`}, append (...els) {
    for (let i = 0, len = els.length, el; i < len; i++) {
      el = el instanceof Container ? el.cont : el;
      this.cont.append(el);
    }
    return this;
  }, appendTo (el) {
    this.cont.appendTo(el);
    return this;
  }
}
