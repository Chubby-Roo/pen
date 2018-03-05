let Container;

Container = class Container {
  constructor (cls, id, attrs) {
    id = id || pen.tools.cc(cls);
    if (id.length === 0) {id = pen.tools.cc(cls)}
    this.cont = pen("<div>").attr({class:cls, id});
    if (attrs != null) this.cont.attr(attrs);
    return this;
  }

  get id () {
    return this.cont.attr('id');
  }

  set id (x) {
    this.cont.attr('id', x);
  }

  get class () {
    return this.cont.attr('class');
  }

  set class (x) {
    this.cont.attr('class', x);
  }

  get children () {
    return this.cont.Children;
  }

  get length () {
    return this.children.length;
  }

  elm (el) {
    let args = arguments;
    switch (pen.tools.type(args[1])) {
      case 'boolean':
        el.remove();
        return args[1] ? this : el;
      default:
        el = this.cont.create(el, 'child');
        el = args[1] != null ? args[1](el) : el;
        return args[1] != null ? this : el;
    }
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
    return `<Container ${this.cont.selector}${this.length !== 0 ? `, Els: ${this.length}` : ''}>`;
  }

  append(...els) {
    els.forEach(el => {
      el = el instanceof Container ? el.cont : el;
      this.cont.append(el);
    });
    return this;
  }
}
