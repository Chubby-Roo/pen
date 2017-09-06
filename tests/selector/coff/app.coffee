{log, error, dir} = console

pen.ink.enter = (cb) ->
  it = @
  @on 'keydown', (e) ->
    if e.key is 'Enter'
      e.preventDefault()
      cb(e, it)

pen(document).ready () ->
  i = 0
  styz = pen "<link rel='stylesheet' href='../../style.css' id='sty'>"
  wrapper = pen "<div id='wrpr' class='wrapper'>"
  title = pen "<title id='ttl'>"
  relbut = pen "<button id='relbutt' class='reload btn bottom-right free'>Reload Style</button>"
  selector = pen "<div id='selectr' class='element-selector' align='center'>"
  selectorInput = pen "<input id='selectrInput' class='element-input input' placeholder='Place selector here.'>"
  selectorBtn = pen "<button id='selectrBtn' class='element-selector btn'>Submit</button>"
  br = pen "<br>"
  sideMsg = pen "<p id='sideInfo' class='side-message'>check the console</p>"

  title.html "Wrk"

  pen(head).append title, styz
  selector.append selectorInput, selectorBtn, br, sideMsg
  wrapper.append selector, relbut
  wrapper.appendTo body

  selr = (content, el) ->
    container = pen "<div id='selectionDiv' class='selection#{i}' align='center'>"
    header = pen "<h4 class='selector-header'>#{content}</h4>"
    grabText = pen "<button id='grabber' class='grabber btn'>grab text</button>"
    highlight = pen "<button id='highlighter' class='highlighter btn'>Highlight</button>"
    changeText = pen "input id='text-change' class='text-changer input' placeholder='change the text'"
    toggleCls = pen "<input id='toggler' class='toggler input' placeholder='toggle class'>"
    grabText.click (e) ->
      grabText.el.outerHTML = "<p id='grabbed'>\"#{el.html()}\"</p>"
    highlight.click (e) ->
      el.toggle 'selected'
    toggleCls.enter (ev, it) ->
      el.toggle it.html()
      it.html ""
    changeText.enter (ev, it) ->
      el.html it.html()
      it.html()
    container.append header, grabText, highlight, toggleCls, changeText
    return container


  selectorBtn.click (e) ->
    i++
    e.preventDefault()
    val = selectorInput.html()
    selectorInput.html ""
    el = pen.$ val, true
    el.initLocalName()
    el.toggle 'selected'
    p = new selr el.localName, el

    wrapper.append p
    selec = () ->
      el.toggle 'selected'

    setTimeout selec, 1500

    log pen.$ val

  selectorInput.keydown (e) ->
    if e.key is 'Enter'
      e.preventDefault()
      selectorBtn.el.click()

  log selectorBtn

  relbut.click (e) ->
    sty.remove()
    styz.appendTo(head)
    return

  freeEls = pen.$$ ".free"
  for freeEl in freeEls
    freeEl = pen(freeEl)
    freeEl.css("position", "fixed")
