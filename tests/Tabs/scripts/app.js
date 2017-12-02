let tb,
styz = pen('<link>').attr({rel:'stylesheet',href:'../../style.css'}),
relbut = pen('<button>').attr({id:'relbutt',class:'reload btn bottom-right free'}).html('Reload Style'),
wrapper = pen('<div>').attr({id:'wrpr',class:'wrapper'}),
header = new Header('Tabs');

header.link('Pen', '../../index.html')
.link('Selector', '../selector/index.html')
.link('Github', 'https://github.com/James-Chub-Fox/pen/');

tb = new Tabs();

tb.addTab("some title", 'moo cow').addTab('other title', 'wee wow');
tb.addTab("Lorem Ipsum", "<div style='height: 430px; overflow-y: auto;'>"+(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pharetra est quis aliquam molestie. Proin efficitur feugiat mi, non pulvinar arcu iaculis vel. Curabitur nulla enim, congue non metus non, maximus interdum justo. Nunc sed luctus velit.
<br><br>
Mauris nulla mi, euismod non enim nec, facilisis tincidunt arcu. Sed porta cursus pretium. Cras euismod est odio, eget euismod lectus mollis pellentesque. Sed suscipit rhoncus neque, a porta nibh dignissim non.
<br><br>
Aenean eget odio sed justo vulputate rutrum sit amet porta nibh. Quisque sit amet tortor iaculis, euismod elit vitae, rhoncus tellus. Cras venenatis nisl in enim rutrum lobortis. Donec eget elementum enim<br><br>`.repeat(9))+"</div>");
tb.addTab('simple-editor', '<textarea></textarea>')
.addTab('introduction', `
Hi there, I noticed that you had come to this page
<br>
Well then welcome, this is a simple tab manager.
`)

relbut.on('click',e=>{styz.remove();styz.appendTo(pHead)}, 'reload');


pDoc.ready(() => {
  let tabs = Object.keys(tb.tabs);
  pHead.append(styz);
  wrapper.append(tb.cont, relbut);
  pBody.append(header.cont, wrapper);
  tb.activateTab(pen.tools.random(tabs));
});
