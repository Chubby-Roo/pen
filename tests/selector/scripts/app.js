let styz, wrapper, relbut, selector, header, rando;

styz = pen('<link>').attr({rel:'stylesheet',href:'../../style.css'});
wrapper = pen('<div>').attr({id:'wrpr',class:'wrapper'});
relbut = pen('<button>').attr({id:'relbutt',class:'reload btn bottom-right free'}).html('Reload Style');
selector = new Container('element-selector');
header = new Header('Selector');
header.link([
  {
    name:'Pen',
    href:'../../index.html'
  }, {
    name:'Tabs',
    href:'../Tabs/index.html'
  }, {
    name: 'Github',
    href: 'https://github.com/Krorenshima/pen/'
  }
]);

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

pBody.append(header.cont, wrapper);
pHead.append(styz);
rando = ['.reload','.header-title'];
selector.input.html(pen.tools.random(rando));
selector.btn.el.click();
