var Container;

Container = class Container {
  constructor (cls, id) {
    id = id || cls.replace(/-(\w{1})/g, (whole, word) => word.toUpperCase());
    this._id = id;
    this._class = cls;
    this._els = {};
    this.cont = pen(`<div id="${this._id}" class="${this._class}">`);
    return this;
  }
  addEl(el, cb) {
    el = this.cont.create(el, 'child');
    if (cb != null) {
      ret = cb(el);
      this._els[ret.selector] = ret;
      return this;
    } else {
      this._els[el.selector] = el;
      return el;
    }
  }
  removeEl(selec) {
    this._els[selec].remove();
    delete this._els[selec];
    return this;
  }
}
