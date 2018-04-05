let Container;

Container = class Container extends pen {
  constructor (cls, id, attrs) {
    id = id || pen.tools.cc(cls);
    if (id.length === 0) id = pen.tools.cc(cls);
    super(`<div class="${cls}" id="${id}">`);
    if (attrs != null) this.cont.attr(attrs);
    this.els = [];
    return this;
  }

  get id () {return this.el.attr('id')}
  set id (x) {this.el.attr('id', x)}
  get class () {return this.el.attr('class')}
  set class (x) {this.el.attr('class', x)}
  get length () {return this.els.length}

  initiate (info) {
    if (!info.initiated) {
      this[`${info.name}Cre`] = info.el;
      info.initiated = !0;
    }
    return info;
  }

  create (el, name, prom = !1) {
    if (name == null) {
      throw new Error("You must name the element");
    }
    name = pen.tools.cc(name);
    switch (prom) {
      case true:
        return new Promise((res, rej) => {
          try {
            el = this.cont.create(el, 'child');
            if (pen.type(name) === 'boolean') {
              if (!name) {
                this.els.push({name:name,id:this.length,el:el,initiated:!1});
                for (let i = 0, len = this.els.length; i < len; i++) {this.initiate(this.els[i])}
              }
            }
            res(el);
          } catch (err) {
            rej(err);
          }
        });
        break;
      default:
        el = this.cont.create(el, 'child');
        if (pen.type(name) === 'boolean') {
          if (!name) {
            this.els.push({name:name,id:this.length,el:el,initiated:!1});
            for (let i = 0, len = this.els.length; i < len; i++) {this.initiate(this.els[i])}
          }
        }
        return el;
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
      case true: this.cont.appendTo(el); break;
      default: this.cont.remove();
    }
    return this;
  }

  toString () {
    return `<Container ${this.cont.selector}${(this.length !== 0 ? `, Els:${this.length}` : '')}>`;
  }

  append (...els) {
    for (let i = 0, len = els.length; i < len; i++) {
      els[i] = els[i] instanceof Container ? els[i].cont : els[i];
      this.el.append(els[i]);
    }
    return this;
  }
}
