let Selectionr;
Selectionr = class Selectionr extends Container {
  constructor (el) {
    if (Selectionr.mem[el.selector] == null) {
      super('selector');
      this.elMem = el;
      this.cont.attr('align','center');
      this.header = this.elm('<h4>').attr('class',`${this.id}-header`).html(el.selector);
      this.closer = this.header.create('<span>','child')
      .attr('class', `${this.id}-closer`).html('X')
      .on('click', ()=>this.close());

      this.highlighter = this.elm('<button>')
      .attr({id:'highlighter',class:'highlighter btn'})
      .html('Highlight').on('mousedown',()=>this.select());

      this.textChanger = this.elm('<input>')
      .attr({id:'textChanger',class:'text-changer input',placeholder:'change the text'})
      .on('keydown',(e)=>{if(e.key.toLowerCase()==='enter'){this.changeText()}});

      this.toggler = this.elm('<input>')
      .attr({id:'toggler',class:'toggler input',placeholder:'toggle a class'})
      .on('keydown',(e)=>{if(e.key.toLowerCase()==='enter'){this.toggle()}});

      if (this.elMem.el.events != null) {
        var ev = Object.keys(this.elMem.el.events),
        len = ev.length <= 1;

        this.eventTracker = this.elm('<pre>')
        .attr({id: 'eventTracker',class:'event-tracker'})
        .html(`This element has: ${ev.length} event${len ? '' : 's'}.\n.:Type${len ? '' : 's'}:.\n${ev.join(', ')}`);
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
      Selectionr.mem[this.header.text] = this;
      return this;
    } else {
      selector.sideMsg.html(`${el.selector} already exists.`);
    }
  }
  select(){
    this.elMem.toggle('selected');
    return this;
  }
  changeText(){
    this.elMem.html(this.textChanger.text);
    this.textChanger.html('');
    return this;
  }
  toggle(){
    this.elMem.toggle(this.toggler.text);
    this.toggler.html('');
    return this;
  }
  click(){
    this.elMem.el.click();
    return this;
  }
  close(){
    this.cont.remove();
    delete Selectionr.mem[this.header.text];
    return this;
  }
};
Selectionr.mem = {};

let styz = pen('<link>').attr({rel:'stylesheet',href:'../../style.css'}),
wrapper = pen('<div>').attr({id:'wrpr',class:'wrapper'}),
relbut = pen('<button>').attr({id:'relbutt',class:'reload btn bottom-right free'}).html('Reload Style'),
selector = new Container('element-selector'),
header = new Header('Selector');
header.link('Pen','../../index.html')
.link('Tabs', '../Tabs/index.html')
.link('Github','https://github.com/James-Chub-Fox/pen/');

selector.cont.attr('align','center');

selector.input = selector.elm('<input>').attr({id:'selectrInput',class:'element-input input',placeholder:'Place selector here.'})
.on('keydown',e=>{
  if(e.key==='Enter'){
    e.preventDefault();
    selector.btn.el.click();
  }
});

selector.btn = selector.elm('<button>').attr({id:'selectrBtn',class:'element-selector btn'}).html('Submit').on('click',e=>{
  let val = selector.input.text,
  timeout = 1750;
  if (val.length === 0) {
    selector.sideMsg.html(`Try putting in some text next time XwX`);
    setTimeout(()=>{selector.sideMsg.html('')},timeout);
  } else {
    let el = pen.$(val, true);
    if (el.el != null) {
      selector.input.html('');
      wrapper.append((new Selectionr(el)).cont);
      setTimeout(()=>{el.toggle('selected')},timeout);
    } else {
      selector.sideMsg.html(`Uh, oh. No element was found with '${val}'. Try something else`);
      setTimeout(()=>{selector.sideMsg.html('')},timeout);
    }
  }
});

selector.elm('<br>');
selector.sideMsg = selector.elm('<p>').attr({id:'sideInfo',class:'side-message'});

relbut.on('click',e=>{styz.remove();styz.appendTo(pHead)}, 'reload');

wrapper.append(selector.cont, relbut);

pDoc.ready(function() {
  pBody.append(header.cont, wrapper);
  pHead.append(styz);
  let rando = ['.reload','.header-title'];
  selector.input.html(pen.tools.random(rando));
  selector.btn.el.click();
});
