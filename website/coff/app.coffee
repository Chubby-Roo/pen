{log, error, dir} = console
ms = markdownit
  highlight: (str, lang) ->
    if lang and hljs.getLanguage lang
      try
        return "<pre class='hljs'><code>#{hljs.highlight(lang, str, true).value}</code></pre>"
      catch __
    return "<pre class='hljs'><code>#{ms.utils.escapeHtml str}</code></pre>"

pen(document).ready () ->
  title = pen "<title id='ttle'>Pen</title>"
  styz = pen "<link rel='stylesheet' href='style.css' id='sty'>"
  wrapper = pen "<div id='wrpr' class='wrapper' align='center'>"
  relbut = pen "<button id='relbutt' class='reload-btn btn bottom-right free'>Reload Style</button>"
  txt = pen "<pre id='test-dummy-text'>"

  header = pen "<div class='header top free' id='hdr'>"
  ttl = pen "<span id='hdrTitle' class='header-title'>"
  header.append ttl
  relbut.click (e) ->
    sty.remove()
    styz.appendTo(head)
    return

  pHead.append title, styz
  pBody.append header, wrapper.append(relbut, txt)

  ttl.html(document.title)

  fetch "https://raw.githubusercontent.com/Chubby-Roo/pen/master/README.md"
  .then (resp) => resp.text()
  .then (text) =>
    txt.html ms.render(text), parse: yes

  freeEls = pen.$$ ".free", yes

  freeEls.forEach (freeEl) =>
    freeEl.css("position", "fixed")
    return
