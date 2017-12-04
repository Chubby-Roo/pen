let Container;

Container = class Container {
  constructor (cls, id, attrs) {
    this.cont = pen("<div>").attr({class:cls, id:(id||pen.tools.cc(cls))})
    this.els = {};
    Object.defineProperties(this, {
      id: {get(){return this.cont.attr('id')},
        set(str){this.cont.attr('id',str)},
        configurable:!0,enumerable:!0},
      class: {get(){return this.cont.attr('class')},
        set(str){this.cont.attr('class',str)},
        configurable:!0,enumerable:!0},
      childrenCount: {get(){return this.cont.Children.length},enumerable:!0}
    });
    if (attrs != null) this.cont.attr(attrs);
    return this;
  }

  elm (el) {
    let args = arguments;
    switch (pen.tools.type(args[1])) {
      case 'function':
        el = this.cont.create(el, 'child'); el = args[1] != null ? args[1](el) : el;
        this.els[el.selector] = el;
        return args[1] != null ? this : el;

      case 'boolean':
        el = el instanceof pen ? el.selector : el;
        this.els[el].remove();
        args[1] ? delete this.els[el] : null;
        return args[1] ? this : this.els[el];

      default:
        el = this.cont.create(el, 'child'); el = args[1] != null ? args[1](el) : el;
        this.els[el.selector] = el;
        return args[1] != null ? this : el;
    };
  }

  desODroy (el) {
    switch (el != null) {
      case true:
        this.cont.appendTo(el);
        break;

      case false:
        this.cont.remove();
        break;
    }
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
}
