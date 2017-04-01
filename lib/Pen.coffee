log = console.log
doc = document
pro = (arg) -> arg::
exists = (arg) -> arg?
pro(String).getInput = (reg) ->
  str = this
  a = undefined
  while `(a = reg.exec(str))` isnt null
    if a.index is reg.lastIndex
      reg.lastIndex++
    return a
if document.body?
  body = document.body
else
  alert "Body is not defined in the html document."
if document.head?
  head = document.head
else
  alert "Head is not defined in the html document."
class Pen
  constructor: (@auto, stylcon) ->
    style = document.createElement 'style'
    if stylcon?
      style.innerHTML = stylcon
    head.appendChild style
    @para = @create 'p'
    body.appendChild @para
    return
  changeOption: (op) ->
    @auto = op
    return
  appendToHead: (el...) ->
    i = 0
    while i < el.length
      head.appendChild el[i]
      i++
  appendToBody: (el...) ->
    i = 0
    while i < el.length
      body.appendChild el[i]
      i++
  create: (el) ->
    return document.createElement el
  getIdOf: (el) ->
    return document.getElementById el
  getNameOf: (el) ->
    return document.getElementsByName el
  getClassOf: (el) ->
    return document.getElementsByClassName el
  getTagsOf: (el) ->
    return document.getElementsByTagName el
  select: (txt) ->
    return document.querySelector txt
  selectAll: (txt) ->
    return document.querySelectorAll txt
  checker: () ->
    if @auto is on
      return on
    else
      return off
  autoAppend: (el) ->
    if @checker() is on
      body.appendChild el
      return el
    else
      return el
  oEl: (el, oel...) ->
    if not oel
      return el
    else
      i = 0
      while i < oel.length
        el.appendChild oel[i]
        i++
    return el
  createAppend: (el) ->
    el = @create el
    @autoAppend el
  checkElement: (el) ->
    if typeof el is 'string'
      el = @select el
    return el
  createWithObj: (el, obj, txt) ->
    el = @create el
    el = @objHandler el, obj
    return el
  createWithText: (el, txt) ->
    el = @create el
    el.innerHTML = txt
    return el
  ###
  # ^^^^^
  # Helpers
  # -------
  # Handlers
  # vvvvv
  ###
  objHandler: (el, obj, txt, type) ->
    if type?
      if type.match /input/gi
        if txt? then el.value = txt
      else
        if txt? then el.innerHTML = txt
    if obj.title? then el.setAttribute "title", obj.title
    if obj.style? then el.setAttribute "style", obj.style
    if obj.id? or obj.identification? then el.setAttribute "id", obj.id or obj.identification
    if obj.click? or obj.onclick? then el.setAttribute "onclick", obj.click or obj.onclick
    if obj.class? or obj.classes?
      if obj.class instanceof Array is true or obj.classes instanceof Array is true
        i = 0
        while i < obj.class or i < obj.classes
          el.setAttribute "class", obj.class[i] or obj.classes[i]
          i++
      else
        el.setAttribute "class", obj.class or obj.classes
    return el
  areaHandler: (el, obj, txt) ->
    el = @objHandler el, obj, txt
    if obj.width? then el.setAttribute "width", obj.width
    if obj.height? then el.setAttribute "height", obj.height
    return el
  inputHandler: (el,obj,txt) ->
    el = @objHandler el, obj, txt, 'input'
    if obj.type? then el.setAttribute "type", obj.type else el.setAttribute "type", "text"
    return el
  linkAndSourceHandler: (el, obj, txt, type) ->
    el = @objHandler el, obj, txt
    if type.match /link|href/gi
      if obj.href?
        el.setAttribute "href", obj.href
      else
        err = new Error "'href' must be defined in the object parameter"
        throw err
    else if type.match /source|src/gi
      if obj.src?
        el.setAttribute "src", obj.src
      else
        err = new Error "'src' must be defined in the object parameter"
        throw err
    return el
  dividerHandler: (el) ->
    return el
  automaticHandler: (el, txt, obj, oel) ->
    el = @create el
    el = @objHandler el, obj, txt
    if oel?
      el = @oEl el, oel
    @autoAppend el
  automaticLinkHandler: (el, type, txt, obj, oel) ->
    el = @create el
    el = @linkAndSourceHandler el, obj, txt, type
    if oel?
      el = @oEl el, oel
    @autoAppend el
  automaticInputHandler: (el, txt, obj) ->
    el = @create el
    el = @inputHandler el, obj, txt
    @autoAppend el
  automaticAreaHandler: (el, txt, obj) ->
    el = @create el
    el = @areaHandler el, obj, txt
    @autoAppend el
  automaticDividerHandler: (el) ->
    el = @create el
    el = @dividerHandler el
    @autoAppend el
  ###
  # ^^^^^
  # Handlers
  # -------
  # Methods
  # vvvvv
  ###
  Html: (el, txt) ->
    el = @checkElement el
    if typeof txt is 'object'
      JSON.parse txt
    if typeof txt is 'function'
      txt = txt(el)
    el.innerHTML = txt
    return el
  Css: (el, txt) ->
    el = @checkElement el
    el.setAttribute 'style', txt
    return el
  Id: (el, txt) ->
    el = @checkElement el
    el.setAttribute 'id', txt
    return el
  Type: (el, txt) ->
    el = @checkElement el
    el.setAttribute 'type', txt
    return el
  On:(el,type,fn,cp) ->
    el = @checkElement el
    el.addEventListener type, fn, cp
    return el
  Click:(el) ->
    el = @checkElement el
    el.click()
    return el
  Append: (el, el2...) ->
    el = @checkElement el
    i = 0
    while i < el2.length
      el.appendChild el2[i]
      i++
    return
  ###
  # ^^^^^
  # Methods
  # -------
  # Tags
  # vvvvv
  ###
  p: (txt, obj) ->
    @automaticHandler 'p', txt, obj
  div: (obj, txt, oel) ->
    @automaticHandler 'div', txt, obj, oel
  span: (obj, txt, oel) ->
    @automaticHandler 'span', txt, obj, oel
  a: (obj, txt, oel) ->
    @automaticLinkHandler 'a', "href", txt, obj, oel
  ul: (obj, txt, oel) ->
    @automaticHandler 'ul', txt, obj, oel
  li: (obj, txt, oel) ->
    @automaticHandler 'li', txt, obj, oel
  code: (obj, txt) ->
    @automaticHandler 'code', txt, obj
  pre: (obj, txt) ->
    @automaticHandler 'pre', txt, obj
  label: (obj, txt) ->
    @automaticHandler 'label', txt, obj
  legend: (obj, txt) ->
    @automaticHandler 'legend', txt, obj
  form: (obj, txt, oel) ->
    @automaticHandler 'form', txt, obj, oel
  fieldset: (obj, txt, oel) ->
    @automaticHandler 'fieldset', txt, obj, oel
  input: (obj, txt) ->
    if obj.type is 'button'
      if not txt
        err = new Error "the value for the button is not defined."
        throw err
    @automaticInputHandler 'input', txt, obj
  button: (obj, txt) ->
    @automaticHandler 'button', txt, obj
  abbr: (obj,txt) ->
    @automaticHandler 'abbr', txt, obj
  style: (txt, obj) ->
    @automaticHandler 'style', txt, obj
  script: (txt, obj) ->
    @automaticHandler 'script', txt, obj
  canvas: (obj, txt) ->
    @automaticHandler 'canvas', txt, obj
  h1: (txt, obj) ->
    @automaticHandler 'h1', txt, obj
  h2: (txt, obj) ->
    @automaticHandler 'h2', txt, obj
  h3: (txt, obj) ->
    @automaticHandler 'h3', txt, obj
  h4: (txt, obj) ->
    @automaticHandler 'h4', txt, obj
  h5: (txt, obj) ->
    @automaticHandler 'h5', txt, obj
  h6: (txt, obj) ->
    @automaticHandler 'h6', txt, obj
  br: () ->
    @automaticDividerHandler 'br'
  ###
  # ^^^^^
  # Tags
  # -------
  # Methods part 2
  # vvvvv
  ###
  write: (txt) ->
    if txt instanceof Object is true
      txt = JSON.stringify(txt)
    if txt instanceof Array is true
      txt = txt.join ', '
    @para.setAttribute "class", "console"
    txt = txt.replace /;|`n|\\n/gi, '.<br>'
    if txt.match /\((.*?)\)\[(.*?)\]/gi
      link = txt.getInput(/\((.*?)\)\[(.*?)\]/gi)[2]
      cover = txt.getInput(/\((.*?)\)\[(.*?)\]/gi)[1]
    txt = txt.replace /\((.*?)\)\[(.*?)\]/gi, "<a href='#{link}' title='#{link}'>#{cover}</a>"
    @para.innerHTML += txt
  ###
  # ^^^^^
  # Methods part 2
  # -------
  # other helpful constructors
  # vvvvv
  ###
  Card:(obj) ->
    checkEdit = (el) ->
      if obj.contedit?
        el.contentEditable = obj.contedit
      el
    cont = @createWithObj "div", class:'card'
    title = @createWithObj "div", class:'card-title'
    btn = @createWithText "span", 'X'
    btn.setAttribute "class", "card-close-btn"
    btn.addEventListener "click", (e) ->
      body.removeChild cont
      return
    , false
    title.appendChild btn
    desc = @createWithObj "div", class:'card-desc'
    if obj.title?
      if obj.title instanceof Array is true
        i = 0
        while i < obj.title.length
          h4 = @createWithText "h4", obj.title[i]
          h4 = checkEdit h4
          title.appendChild h4
          i++
      else
        h4 = @createWithText "h4", obj.title
        h4 = checkEdit h4
        title.appendChild h4
    if obj.desc?
      if obj.desc instanceof Array is true
        i = 0
        while i < obj.desc.length
          p = @createWithText "p", obj.desc[i]
          p = checkEdit p
          desc.appendChild p
          i++
      else
        p = @createWithText "p", obj.desc
        p = checkEdit p
        desc.appendChild p
    @Append cont, title, desc
    return cont
