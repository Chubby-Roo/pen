let Container;

Container = class Container {
  constructor (cls, id, elm, attrs) {
    /**
    * The start of the container, just sets up the basic needs for container creation and storage.
    * @type {?string}, @type {?string}, @type {object}
    * Passing in the first two arguments are strings, the first is necessary for it automatically appends a class
    * to the element, the second isn't a requirement for it CamelCases the first argument if it detects \s|_|-
    */
    id = id || pen.cc(cls);
    if (id.length === 0) id = pen.cc(cls);
    this.cont = pen(`<${elm == null ? 'div' : elm} class="${cls}" id="${id}">`);
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
        it.els.forEach(el => it.initiate(el));
        delete this._document;
        delete this._nDocument;
        return this;
      } else {
        console.warn("Must not be an empty string");
      }
    }
    el._nDocument = function () {
      delete this._document;
      delete this._nDocument;
      return this;
    }
  }

  _cre (el) {
    if (pen.type(el) === 'array') {
      let arr = [];
      el.forEach(elr => arr.push(this._setup(elr)));
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
    return prom ? (new Promise((res, rej) => try {res(this._cre(el))} catch (err) {rej(err)})) : this._cre(el);
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
      return new Promise((res, rej) => info != null ? res(info) : rej(new Error(`Couldn't find ${data}`)));
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
      info != null ? this.els.splice(info.id, 1) : throw new Error(`Couldn't remove ${data}`);
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
    els.forEach(el => el = el instanceof Container ? el.cont : el;this.cont.append(el));
    return this;
  }

  appendTo (el) {
    this.cont.appendTo(el);
    return this;
  }
}
