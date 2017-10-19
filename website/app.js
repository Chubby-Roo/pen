var dir, error, log, ms;

({log, error, dir} = console);

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
  var freeEls, header, i, len, relbut, results, styz, title, ttl, txt, wrapper;
  title = pen("<title id='ttle'>Pen</title>");
  styz = pen("<link rel='stylesheet' href='style.css' id='sty'>");
  wrapper = pen("<div id='wrpr' class='wrapper' align='center'>");
  txt = pen("<pre id='test-dummy-text'>");
  header = pen("<div class='header top free' id='hdr'>");
  ttl = pen("<span id='hdrTitle' class='header-title'>");
  header.append(ttl);
  wrapper.append(relbut, txt);
  pHead.append(title, styz);
  pBody.append(header, wrapper);
  ttl.text = document.title;
  fetch("https://raw.githubusercontent.com/Chubby-Roo/pen/master/README.md").then((resp) => {
    return resp.text();
  }).then((text) => {
    return txt.html(ms.render(text), {
      parse: true
    });
  });
  freeEls = pen.$$(".free", true);
  for (i = 0, len = freeEls.length; i < len; i++) {
    freeEls[i].css("position", "fixed");
  }
});
