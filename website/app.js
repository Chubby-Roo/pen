document.title = 'Pen';
var styz = pen('<link>').attr({rel:'stylesheet',href:'style.css'}),
wrapper = pen('<div>').attr({id:'wrpr',class:'wrapper',align:'center'}),
txt = pen('<pre>').attr({id:'test-dummy-text'}), ms,
header = pen('<div>').attr({class:'header top free',id:'hdr'});
header.create('<span>','child').attr({id:'hdrTitle',class:'header-title'}).html(document.title);
header.create('<a>', 'child').attr({href:'tests/selector/index.html',class:'btn'}).html('Selector');
header.create('<a>', 'child').attr({href:'https://github.com/James-Chub-Fox/pen/',class:'btn'}).html('Github');
ms = markdownit({
  highlight: function(str, lang) {
    var __;
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class='hljs'><code>${(hljs.highlight(lang, str, true).value)}</code></pre>`;
      } catch (__) {}
    }
    return `<pre class='hljs'><code>${ms.utils.escapeHtml(str)}</code></pre>`;
  }
});

pen(document).ready(function() {
  wrapper.append(txt);
  pHead.append(styz);
  pBody.append(header, wrapper);
  fetch('https://raw.githubusercontent.com/Chubby-Roo/pen/master/README.md').then((resp) => {
    return resp.text();
  }).then((text) => {
    txt.html(ms.render(text),{parse: true});
  });
});
