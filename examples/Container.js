let Container;

Container = class Container {
  constructor (cls, id, attrs) {
    /*
    * The start of the container, just sets up the basic needs for container creation and storage.
    * @type {?string}, @type {?string}, @type {object}
    * Passing in the first two arguments are strings, the first is necessary for it automatically appends a class
    * to the element, the second isn't a requirement for it CamelCases the first argument if it detects \s|_|-
    */
    id = id || pen.cc(cls);
    if (id.length === 0) id = pen.cc(cls);
    this.cont = pen(`<div class="${cls}" id="${id}">`);
    if (attrs != null) this.cont.attr(attrs);
    this.els = [];
    return this;
  }

  get id () {return this.cont.attr('id')}
  set id (x) {this.cont.attr('id', x)}
  get class () {return this.cont.attr('class')}
  set class (x) {this.cont.attr('class', x)}
  get length () {return this.els.length}

  _setup (el) {
    let it = this;
    el = this.cont.create(el, 'child');
    el._document = function (name) {
      if (!pen.empty(name)) {
        it.els.push({name:name,id:it.length,el:el,initiated:!1});
        for (let i = 0, len = it.els.length; i < len; i++) {it.initiate(it.els[i])}
        delete this._document;
        delete this._nDocument;
      } else {
        console.warn("Must not be an empty string");
      }
    }
    el._nDocument = function () {
      delete this._document;
      delete this._nDocument;
    }
    return el;
  }

  _cre (el) {
    if (pen.type(el) === 'array') {
      let arr = [];
      for (let i = 0, len = el.length; i < len; i++) {
        arr.push(this._setup(el[i]));
      }
      return arr;
    } else {
      el = this.cont.create(el, 'child');
      this._setup(el);
      return el;
    }
  }

  initiate (info) {
    if (!info.initiated) {
      this[`${info.name}Cre`] = info.el;
      info.initiated = !0;
    }
    return info;
  }

  create (el, prom = !1) {
    if (prom) {
      return new Promise((res, rej) => {
        try {
          res(this._cre(el));
        } catch (err) {
          rej(err);
        }
      });
    } else {
      return this._cre(el);
    }
  }

  find (type, data, prom = !1) {
    let info;
    for (let i = 0, len = this.length; i < len; i++) {
      if (this.els[i][type] === data) {
        info = this.els[i];
        break;
      }
    }
    if (prom) {
      return new Promise((res, rej) => {
        if (info != null)
          res(info);
        else
          rej(new Error("Could not find "+data));
      });
    } else {
      return info != null ? info : null;
    }
  }

  remove (type, data, prom = !1) {
    if (prom) {
      this.find(type, data, true).then((info) => {
        this.els.splice(info.id, 1);
      }).catch((err) => {
        console.error(err);
      });
    } else {
      let info = this.find(type, data, false);
      if (info != null)
        this.els.splice(info.id, 1);
      else
        throw new Error("Could not remove "+data);
    }
  }

  desODroy (el) {
    switch (el != null) {
      case true: this.el.appendTo(el); break;
      default: this.el.remove();
    }
    return this;
  }

  toString () {
    return `<Container ${this.cont.selector}${(this.length !== 0 ? `, Els:${this.length}` : '')}>`;
  }

  append (...els) {
    for (let i = 0, len = els.length; i < len; i++) {
      els[i] = els[i] instanceof Container ? els[i].cont : els[i];
      this.cont.append(els[i]);
    }
    return this;
  }

  appendTo (el) {
    this.cont.appendTo(el);
    return this;
  }

  // EXPERIMENTAL: This will probably be removed but allows creation of elements even easier
  builder (str) {

  }
}
