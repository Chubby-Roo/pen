var Container;
Container = class Container {
  constructor (cls, id) {
    this.cont = pen("<div>").attr({class:cls,id:id||pen.tools.cc(cls)});
    this.els = {};
    Object.defineProperties(this,{
      id:{
        get(){return this.cont.attr('id')},
        set(str){return this.cont.attr('id',str)},
        configurable:true,enumerable:true
      }, class:{
        get(){return this.cont.attr('class')},
        set(str){this.cont.attr('class',str);str=pen.tools.cc(str);this.id=str;return this},
        configurable:true,enumerable:true
      }
    });
    return this;
  }
  create (el, cb) {
    el = this.cont.create(el, 'child'); el = cb != null ? cb(el) : el;
    this.els[el.selector] = el;
    return cb != null ? this : el;
  }
  remove (el, perm = false) {
    el = el instanceof pen ? el.selector : el;
    this.els[el].remove();
    perm ? delete this.els[el] : null;
    return perm ? this : this.els[el];
  }
  deploy (el) {
    this.cont.appendTo(el);
    return this;
  }
  destory () {
    this.cont.remove();
    return this;
  }
  toString() {
    var keys = Object.keys(this.els);
    return `<Container ${this.cont.selector}${keys.length !== 0 ? `, Els:${keys.length}` : ''}>`;
  }
  append(...els) {
    for (var i = 0, len = els.length; i < len; i++) {
      els[i] = els[i] instanceof Container ? els[i].cont : els[i];
      this.cont.append(els[i]);
    }
    return this;
  }
};
