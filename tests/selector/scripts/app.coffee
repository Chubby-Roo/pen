{log, error, dir} = console

pen::enter = (cb) ->
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

  pHead.append title, styz
  selector.append selectorInput, selectorBtn, br, sideMsg
  wrapper.append selector, relbut
  wrapper.appendTo pBody

  selr = (content, el) ->
    container = pen "<div id='selectionDiv' class='selection#{i}' align='center'>"
    container.create "<h4 class='selector-header'>#{content}</h4>", 'child'
    grabText = container.create "<button id='grabber' class='grabber btn'>grab text</button>", 'child'
    .on 'click', (e) ->
      grabText.el.outerHTML = "<p id='grabbed'>\"#{el.text}\"</p>"

    highlight = container.create "<button id='highlighter' class='highlighter btn'>Highlight</button>", 'child'
    .on 'click', (e) ->
      el.toggle 'selected'

    changeText = container.create "<input id='text-change' class='text-changer input' placeholder='change the text'>", 'child'
    .enter (ev, it) ->
      el.html it.text
      it.text = ""

    toggleCls = container.create "<input id='toggler' class='toggler input' placeholder='toggle class'>", 'child'
    .enter (ev, it) ->
      el.toggle it.text
      it.text = ""
    return container


  selectorBtn.on 'click', (e) ->
    i++
    val = selectorInput.text
    selectorInput.html ""
    el = pen.$ val, true
    if el.el?
      el.toggle 'selected'
      p = new selr el.selector, el
      wrapper.append p
      selec = () ->
        el.toggle 'selected'

      setTimeout selec, 1500
    else
      zimo = pen "<div class='selectionDiv' class='selectionERROR'>"
      zimo.html "Uh, oh. No element was found with '#{val}'. Try something else"
      pmo = pen "<br>"
      wrapper.append zimo, pmo


  selectorInput.on 'keydown', (e) ->
    if e.key is 'Enter'
      e.preventDefault()
      selectorBtn.el.click()

  relbut.on 'click', (e) ->
    sty.remove()
    styz.appendTo(head)
    return

  freeEls = pen.$$ ".free", true
  for freeEl in freeEls
    freeEl.css "position", "fixed"
