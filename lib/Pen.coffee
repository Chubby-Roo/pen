log = console.log
doc = document
Proler = (pro) ->
  pro(String).m = (reg) -> @match reg
  pro(String).r = (reg, str) -> @replace reg, str
  pro(String).sw = (str) -> @startsWith str
  pro(String).inc = (str) -> @includes str
  pro(String).ew = (str) -> @endsWith str
  pro(String).toRegExp = (flags) -> new RegExp(this, flags)
  pro(String).splice = (str, nom) -> @split(str).slice nom
  pro(String).reverse = ->
    that = this
    that = that.split ''
    that = that.reverse()
    that = that.join ''
    that
  pro(String).surround = (str) -> return "#{str}#{this}#{str.reverse()}"
  pro(Array).pick = -> return this[Math.floor Math.random() * @length]
  pro(Array).rand = -> this.pick()
  pro(Array).searchFor = (str) ->
    i = 0
    while i < this.length
      if this[i].match str
        return this[i].match str
      else
        return false
      i++
  pro(String).TUCase = -> @toUpperCase this
  pro(String).TLCase = -> @toLowerCase this
  return
pro = (arg) -> arg::
exists = (arg) -> arg?
pro(String).getInput = (reg) ->
  str = this
  a = undefined
  while `(a = reg.exec(str))` isnt null
    if a.index is reg.lastIndex
      reg.lastIndex++
    return a
Proler pro
if document.body?
  body = document.body
else
  alert "Body is not defined in the html document."
if document.head?
  head = document.head
else
  alert "Head is not defined in the html document."

Tags = "
  a link style p pre audio b u s img block video span ul li ol code lable legend div h1 h2 h3 h4 h5 h6 form fieldset input button abbr canvas script br
  hr table tbody td textarea body head em dl dt header html i iframe colgroup datalist dd del details dfn dialog footer ins kbd main map mark menu ruby
  rp rt samp section embed wbr source track param meta keygen tr time var area base col ".split /\s+/
attrs = "
  src href type rel style id type value class title width height name charset action align alt async autocomplete autofocus autoplay bgcolor
  border challenge charset checked cite color cols colspan content contenteditable contextmenu accesskey data dir draggable dropzone
  hidden lang spellcheck tabindex translate".split /\s+/
Events = "
  blue click change dblclick error focus input keydown keyup keypress load mousedown mousemove mouseover
  mouseout mouseup resize scroll select submit unload ".split /\s+/
class Pen
  constructor: (@auto, stylcon) ->
    style = @create 'style'
    if stylcon?
      style.innerHTML = stylcon
    head.appendChild style
    @para = @p '',
      class:'console-log'
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
  objHandler: (el, obj, txt) ->
    if txt?
      el.innerHTML = txt
    for prop of obj
      i = 0
      while i < attrs.length
        if attrs[i].match prop.toRegExp "gi"
          el.setAttribute prop, obj[prop]
        i++
    return el
  automaticHandler: (el, txt, obj, oel...) ->
    el = @create el
    el = @objHandler el, obj, txt
    if oel?
      el = @oEl el, oel...
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
  Tags.forEach (tag) ->
    Pen::[tag] = (txt, obj, args...) ->
      @automaticHandler tag, txt, obj, args...

  write: (txt) ->
    if txt instanceof Object is true
      txt = JSON.stringify(txt)
    if txt instanceof Array is true
      txt = txt.join ', '
    txt = txt.replace /;|`n|\\n/gi, '.<br>'
    if txt.match /\((.*?)\)\[(.*?)\]/gi
      link = txt.getInput(/\((.*?)\)\[(.*?)\]/gi)[2]
      cover = txt.getInput(/\((.*?)\)\[(.*?)\]/gi)[1]
    txt = txt.replace /\((.*?)\)\[(.*?)\]/gi, "<a href='#{link}' title='#{link}'>#{cover}</a>"
    @para.innerHTML += txt
