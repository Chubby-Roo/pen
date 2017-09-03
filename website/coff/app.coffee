{log, error, dir} = console

pen(document).ready () ->
  title = pen "<title id='ttle'>Pen</title>"
  styz = pen "<link rel='stylesheet' href='style.css' id='sty'>"
  wrapper = pen "<div id='wrpr' class='wrapper' align='center'>"
  relbut = pen "<button id='relbutt' class='reload-btn btn bottom-right free'>Reload Style</button>"
  txt = pen "<pre id='test-dummy-text'>"
  lor = """
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  """.replace /\./g, '\n\n\n'
  .repeat 25
  txt.html lor

  header = pen "<div class='header top free' id='hdr'>"
  ttl = pen "<span id='hdrTitle' class='header-title'>"
  header.append ttl
  relbut.click (e) ->
    sty.remove()
    styz.appendTo(head)
    return

  pHead.append title, styz
  pBody.append header, wrapper.append(relbut, txt)

  ttl.html document.title
  freeEls = pen.$$ ".free", yes

  freeEls.forEach (freeEl) =>
    freeEl.css("position", "fixed")
    return
