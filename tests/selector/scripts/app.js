let styz, wrapper, selector, header, rando, menu;

styz = pen('<link rel="stylesheet" href="../../style.css">');
wrapper = pen('<div id="wrpr" class="wrapper">');
selector = new Container('element-selector');
header = new Header('Selector');
header.link([
  {
    name:'Pen',
    href:'../../index.html'
  }, {
    name: 'Github',
    href: 'https://github.com/Krorenshima/pen/'
  }
]);
menu = new ContextMenu();
menu.checkFor('selector', {
  typ: 'btn',
  name: 'Close',
  act (e) {
    let target = pen(e.target);
    Selectionr.remove('_id', +target.attr('id'));
  }
});
menu.create([
  {
    typ: 'btn',
    name: 'Back',
    act () {
      window.history.back();
    }
  }, {
    typ: 'btn',
    name: 'Forward',
    act () {
      window.history.forward();
    }
  }, {
    typ: 'btn',
    name: 'Reload',
    act () {
      window.location.reload();
    }
  }, {typ:'break'}, {
    typ: 'btn',
    name: 'Reload Style',
    act () {
      styz.remove().appendTo(pHead);
    }
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

wrapper.append(selector.cont);

pBody.append(menu.cont, header.cont, wrapper);
pHead.append(styz);
rando = ['.header-title', 'a.btn[href]'];
selector.input.html(pen.random(rando));
selector.btn.el.click();
