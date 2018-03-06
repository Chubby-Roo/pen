let Selectionr;

Selectionr = class Selectionr extends Container {
  constructor (el) {
    if (!Selectionr.exists('name', el.selector)) {
      super('selector', '', {align: 'center', "data-id": Selectionr.mem.length});
      this._id = Selectionr.mem.length;
      this.elMem = el;
      this.header = this.elm('<h4>').attr('class',`${this.id}-header`).html(el.selector);
      this.closer = this.header.create('<span>','child')
      .attr('class', `${this.id}-closer`).html('X')
      .on('click', ()=> this.close());

      this.highlighter = this.elm('<button>')
      .attr({id:'highlighter',class:'highlighter btn'})
      .html('Highlight').on('mouseup',()=>this.select());

      this.textChanger = this.elm('<input>')
      .attr({id:'textChanger',class:'text-changer input',placeholder:'change the text'})
      .on('keydown',(e)=>{if(e.key==='Enter'){this.changeText()}});

      this.toggler = this.elm('<input>')
      .attr({id:'toggler',class:'toggler input',placeholder:'toggle a class'})
      .on('keydown',(e)=>{if(e.key==='Enter'){this.toggle()}});

      if (this.elMem.el.events != null) {
        var ev = Object.keys(this.elMem.el.events),
        len = ev.length <= 1,
        determ = len ? '' : 's';

        this.eventTracker = this.elm('<pre>')
        .attr({id: 'eventTracker',class:'event-tracker'})
        .html(`This element has: ${ev.length} event${determ}.\n.:Type${determ}:.\n${ev.join(', ')}`);
        if (ev.includes('click')) {
          this.clicker = this.elm('<button>')
          .attr({id:'clicker',class:'clicker btn'})
          .html('Click').on('mousedown',()=>this.click());
        }
      } else {
        this.eventNon = this.elm('<p>')
        .attr({id: 'eventNon',class:'event-non'})
        .html('This element has no events attached to it.');
      }
      this.select();
      Selectionr.mem.push(this);
      return this;
    } else {
      selector.sideMsg.html(`${el.selector} already exists.`);
    }
  }

  get name () {
    return this.header.text;
  }

  select () {
    this.elMem.toggle('selected');
    return this;
  }
  changeText () {
    this.elMem.html(this.textChanger.text);
    this.textChanger.html('');
    return this;
  }
  toggle () {
    this.elMem.toggle(this.toggler.text);
    this.toggler.html('');
    return this;
  }
  click () {
    this.elMem.el.click();
    return this;
  }
  close () {
    this.cont.remove();
    return this;
  }
  static find (type, data) {
    for (let i = 0, len = Selectionr.mem.length, selectr; i < len; i++) {
      selectr = Selectionr.mem[i];
      if (selectr[type] === data) {
        return selectr;
      }
    }
  }
  static exists (type, data) {
    return Selectionr.find(...arguments) != null;
  }
  static remove (type, data) {
    if (type instanceof Selectionr) {
      Selectionr.mem.splice(type.id, 1);
      type.close();
    } else {
      let selectr = Selectionr.find(...arguments);
      Selectionr.mem.splice(selectr.id, 1);
      selectr.close();
    }
    return Selectionr;
  }
  static add (el) {
    return new Selectionr(el);
  }
};
Selectionr.mem = [];
