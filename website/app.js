document.title = "Pen";
var styz = pen("<link rel='stylesheet' href='style.css' id='sty'>"),
wrapper = pen("<div id='wrpr' class='wrapper' align='center'>"),
txt = pen("<pre id='test-dummy-text'>"),
header = pen("<div class='header top free' id='hdr'>");
header.create("<span id='hdrTitle' class='header-title'>",'child').html(document.title);
header.create("<a href='tests/selector/index.html' class='btn'>", 'child').html("Selector");
header.create("<a href='https://github.com/Chubby-Roo/pen/' class='btn'>", 'child').html("Github");

pen(document).ready(function() {
  wrapper.append(txt);
  pHead.append(styz);
  pBody.append(header, wrapper);
  fetch("https://raw.githubusercontent.com/Chubby-Roo/pen/master/README.md").then((resp) => {
    return resp.text();
  }).then((text) => {
    txt.html(ms.render(text),{parse: true});
  });
  freeEls = pen.$$(".free");
  for (var i = 0, len = freeEls.length; i < len; i++) {
    pen(freeEls[i]).css("position", "fixed");
  }
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
});
