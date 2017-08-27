{log, error, dir} = console
pen(document).ready () ->
  i = 0
  styz = pen "<link rel='stylesheet' href='style.css' id='sty'>"
  wrapper = pen "<div id='wrpr' class='wrapper main'>"
  title = pen "<title id='ttl'>"
  relbut = pen "<button id='relbutt' class='reload-btn btn bottom-right free'>Reload Style</button>"
  selector = pen "<div id='selectr' class='element-selector' align='center'>"
  selectorInput = pen "<input id='selectrInput' class='element-selector-input input' placeholder='Place selector here.'>"
  selectorBtn = pen "<button id='selectrBtn' class='element-selector-btn btn'>Submit</button>"
  br = pen "<br>"
  sideMsg = pen "<p id='sideInfo' class='side-message'>check the console</p>"

  title.html "Wrk"

  pen(head).append title, styz
  selector.append selectorInput, selectorBtn, br, sideMsg
  wrapper.append selector, relbut
  wrapper.appendTo body

  selectorBtn.click (e) ->
    i++
    e.preventDefault()
    val = selectorInput.html()
    selectorInput.html ""
    el = pen.$ val, true
    el.initLocalName()
    el.toggle 'selected'
    p = pen "<p class='selection#{i}'>"
    p.html el.localName

    wrapper.append p
    selec = () ->
      el.toggle 'selected'

    setTimeout selec, 1500

    log pen.$ val

  selectorInput.keydown (e) ->
    if e.key is 'Enter'
      e.preventDefault()
      selectorBtn.el.click()

  relbut.click (e) ->
    sty.remove()
    styz.appendTo(head)
    return

  freeEls = pen.$$ ".free"
  for freeEl in freeEls
    freeEl = pen(freeEl)
    freeEl.css("position", "fixed")
