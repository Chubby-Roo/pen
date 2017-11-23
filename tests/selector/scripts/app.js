document.title = 'Selector';
var styz = pen('<link>').attr({rel:'stylesheet',href:'../../style.css'}),
wrapper = pen('<div>').attr({id:'wrpr',class:'wrapper'}),
header = pen('<div>').attr({class:'header top free',id:'hdr'});
header.create('<span>','child').attr({id:'hdrTitle',class:'header-title'}).html(document.title);
header.create('<a>', 'child').attr({href:'../../index.html',class:'btn'}).html('Pen');

var relbut = pen('<button>').attr({id:'relbutt',class:'reload btn bottom-right free'}).html('Reload Style'),
selector = new Container('element-selector');
selector.cont.attr('align','center');
selector.input = selector.create('<input>').attr({id:'selectrInput',class:'element-input input',placeholder:'Place selector here.'})
.on('keydown',e=>{
  if(e.key==='Enter'){
    e.preventDefault();
    selector.btn.el.click();
  }
});
selector.btn = selector.create('<button>').attr({id:'selectrBtn',class:'element-selector btn'}).html('Submit').on('click',e=>{
  var val = selector.input.text,
  timeout = 1750;
  if (val.length === 0) {
    selector.sideMsg.html(`Try putting in some text next time XwX`);
    setTimeout(()=>{selector.sideMsg.html('')},timeout);
  } else {
    var el = pen.$(val, true);
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
selector.create('<br>');
selector.sideMsg = selector.create('<p>').attr({id:'sideInfo',class:'side-message'});

relbut.on('click',e=>{styz.remove();styz.appendTo(pHead)}, 'reload');

wrapper.append(selector.cont, relbut);
pen(document).ready(function() {
  pBody.append(header, wrapper);
  pHead.append(styz);
});
