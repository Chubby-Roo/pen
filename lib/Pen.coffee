log = console.log
doc = document

if doc.body?
  body = doc.body
else
  alert "Body is not defined in the html document."
if doc.head?
  head = doc.head
else
  alert "Head is not defined in the html document."

class Pen
  constructor: (@auto) ->
  create: (el) ->
    return doc.createElement el
  getIdOf: (el) ->
    return doc.getElementById el
  getNameOf: (el) ->
    return doc.getElementsByName el
  getClassOf: (el) ->
    return doc.getElementsByClassName el
  getTagsOf: (el) ->
    return doc.getElementsByTagName el
  select: (txt) ->
    return doc.querySelector txt
  selectAll: (txt) ->
    return doc.querySelectorAll txt
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
  oEl: (el, oel) ->
    if not oel
      return el
    else
      if typeof oel is 'function'
        el.appendChild oel(el)
      else
        el.appendChild oel
        return el
  createAppend: (el) ->
    el = @create el
    @autoAppend el


  ###
  # ^^^^^
  # Helpers
  # -------
  # Handlers
  # vvvvv
  ###


  objHandler: (el, obj, txt) ->
    el.innerHTML = if txt? then txt else ''
    el.title = if obj.title? then obj.title else ''
    el.style = if obj.style? then obj.style else ''
    el.id = if obj.id? then obj.id else ''
    el.onclick = if obj.click? then obj.click else ''
    el.classList += if obj.class? then obj.class else ''
    return el
  areaHandler: (el, obj, txt) ->
    el = @objHandler el, obj, txt
    el.width = if obj.width? then obj.click else ''
    el.height = if obj.height? then obj.height else ''
    return el
  inputHandler: (el,obj,type,txt) ->
    el = @objHandler el, obj
    el.value = if txt? then txt else ''
    el.type = if obj.type? then obj.type else ''
    return el
  linkAndSourceHandler: (el, obj, txt, type) ->
    el = @objHandler el, obj, txt
    if type.match /link|href/gi
      el.href = if obj.href? then obj.href else throw new Error "'href' must be defined in the object parameter"
    else if type.match /source|src/gi
      el.src = if obj.src? then obj.src else throw new Error "'src' must be defined in the object parameter"
    return el
  automaticHandler: (el, txt, obj, oel) ->
    el = @create el
    el = @objHandler el, obj, txt
    if oel
      el = @oEl el, oel
    @autoAppend el
  automaticLinkHandler: (el, type, txt, obj, oel) ->
    el = @create el
    el = @linkAndSourceHandler el, obj, txt, type
    if oel
      el = @oEl el, oel
    @autoAppend el
  automaticInputHandler: (el, type, txt, obj) ->
    el = @create el
    el = @inputHandler el, obj, type, txt
    @autoAppend el
  automaticAreaHandler: (el, txt, obj) ->
    el = @create el
    el = @areaHandler el, obj, txt
    @autoAppend el

  ###
  # ^^^^^
  # Handlers
  # -------
  # Methods
  # vvvvv
  ###

  Html: (el, txt) ->
    if typeof txt is 'object'
      JSON.parse txt
    if typeof txt is 'function'
      txt = txt(el)
    el.innerHTML = txt
    return
  Css: (el, txt) ->
    el.style = txt
    return
  Id: (el, txt) ->
    el.id = txt
    return
  Type: (el, txt) ->
    el.type = txt
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
  input: (obj, type, txt) ->
    @automaticInputHandler 'input', type, txt, obj
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
