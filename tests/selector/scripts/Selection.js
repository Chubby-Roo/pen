var Selectionr;

Selectionr = class Selectionr extends Container {
  constructor (el) {
    if (Selectionr.mem[el.selector] == null) {
      super('selector');
      this.elMem = el;this.select();
      this.cont.attr('align','center');
      this.header = this.create('<h4>').attr('class',`${this.id}-header`).html(el.selector);

      this.highlighter = this.create('<button>')
      .attr({id:'highlighter',class:'highlighter btn'})
      .html('Highlight').on('mousedown',()=>this.select());

      this.textChanger = this.create('<input>')
      .attr({id:'textChanger',class:'text-changer input',placeholder:'change the text'})
      .on('keydown',(e)=>{if(e.key.toLowerCase()==='enter'){this.changeText()}});

      this.toggler = this.create('<input>')
      .attr({id:'toggler',class:'toggler input',placeholder:'toggle a class'})
      .on('keydown',(e)=>{if(e.key.toLowerCase()==='enter'){this.toggle()}});

      var ev = Object.keys(this.elMem.el.events);

      this.eventTracker = this.create('<p>')
      .attr({id: 'eventTracker',class:'event-tracker'})
      .html(`This element has: ${ev.length} ${ev.length <= 1 ? 'event' : 'events'}`);

      Selectionr.mem[this.header.text] = this;
      return this;
    } else {
      console.warn(el.selector+" already exists.");
    }
  }
  select(){
    this.elMem.toggle('selected');
    return this;
  }
  changeText(){
    this.elMem.html(this.textChanger.text);
    this.textChanger.html("");
    return this;
  }
  toggle(){
    this.elMem.toggle(this.toggler.text);
    this.toggler.html("");
    return this;
  }
};
Selectionr.mem = {};
