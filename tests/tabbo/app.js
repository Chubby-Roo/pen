var tabDebug, tb, keys;

tb = new Tabs();

tabDebug = pen('<div class="tab-debug">');

tb.addTab("some title", 'moo cow').addTab('other title', 'wee wow');
tb.addTab("Lorem Ipsum", "<div style='height: 430px; overflow-y: auto;'>"+(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pharetra est quis aliquam molestie. Proin efficitur feugiat mi, non pulvinar arcu iaculis vel. Curabitur nulla enim, congue non metus non, maximus interdum justo. Nunc sed luctus velit.
<br><br>
Mauris nulla mi, euismod non enim nec, facilisis tincidunt arcu. Sed porta cursus pretium. Cras euismod est odio, eget euismod lectus mollis pellentesque. Sed suscipit rhoncus neque, a porta nibh dignissim non.
<br><br>
Aenean eget odio sed justo vulputate rutrum sit amet porta nibh. Quisque sit amet tortor iaculis, euismod elit vitae, rhoncus tellus. Cras venenatis nisl in enim rutrum lobortis. Donec eget elementum enim<br><br>`.repeat(9))+"</div>");
tb.addTab('simple-editor', '<textarea></textarea>').addTab('Tab-debug', tabDebug);

keys = Object.keys(tabs);

tabDebug.html(`Number of Tabs: ${keys.length}
Names: ${keys.join(", ")}`);

pDoc.ready(() => {
  pBody.append(tb.cont);
  tb.activateTab('Tab-debug');
});
