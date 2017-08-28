{log, error, dir} = console
pen(document).ready () ->
  styz = pen "<link rel='stylesheet' href='style.css' id='sty'>"
  title = pen "<title id='ttl'>"

  wrapper = pen "<div id='wrpr' class='wrapper'>"
  inWrap = pen "<div id='inWrapper' class='inner-wrapper'>"

  cvs = pen "<canvas id='game' class='game'>"

  relbut = pen "<button id='relbutt' class='reload-btn btn bottom-right free'>Reload Style</button>"

  relbut.click (e) ->
    sty.remove()
    styz.appendTo(head)
    return

  pen body
  .append wrapper

  wrapper.append relbut

  pen head
  .append title, styz

  freeEls = pen.$$ ".free"
  for freeEl in freeEls
    freeEl = pen(freeEl)
    freeEl.css("position", "fixed")
