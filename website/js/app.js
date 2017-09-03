var dir, error, log, ms;

({log, error, dir} = console);

ms = markdownit({
  highlight: function(str, lang) {
    var __;
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class='hljs'><code>${(hljs.highlight(lang, str, true).value)}</code></pre>`;
      } catch (error1) {
        __ = error1;
      }
    }
    return `<pre class='hljs'><code>${ms.utils.escapeHtml(str)}</code></pre>`;
  }
});

pen(document).ready(function() {
  var freeEls, header, relbut, styz, title, ttl, txt, wrapper;
  title = pen("<title id='ttle'>Pen</title>");
  styz = pen("<link rel='stylesheet' href='style.css' id='sty'>");
  wrapper = pen("<div id='wrpr' class='wrapper' align='center'>");
  relbut = pen("<button id='relbutt' class='reload-btn btn bottom-right free'>Reload Style</button>");
  txt = pen("<pre id='test-dummy-text'>");
  header = pen("<div class='header top free' id='hdr'>");
  ttl = pen("<span id='hdrTitle' class='header-title'>");
  header.append(ttl);
  relbut.click(function(e) {
    sty.remove();
    styz.appendTo(head);
  });
  pHead.append(title, styz);
  pBody.append(header, wrapper.append(relbut, txt));
  ttl.html(document.title);
  fetch("https://raw.githubusercontent.com/Chubby-Roo/pen/master/README.md").then((resp) => {
    return resp.text();
  }).then((text) => {
    return txt.html(ms.render(text), {
      parse: true
    });
  });
  freeEls = pen.$$(".free", true);
  return freeEls.forEach((freeEl) => {
    freeEl.css("position", "fixed");
  });
});
