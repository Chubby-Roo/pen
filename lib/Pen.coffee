Tags = "
  a link style p pre audio b u s img block video span ul li ol code lable legend div h1 h2 h3 h4 h5 h6 form fieldset input button abbr canvas script br
  hr table tbody td textarea body head em dl dt header html i iframe colgroup datalist dd del details dfn dialog footer ins kbd main map mark menu ruby
  rp rt samp section embed wbr source track param meta keygen tr time var area base col".split /\s+/
attrs = "
  src href type rel style id type value class title width height name charset action align alt async autocomplete autofocus autoplay bgcolor
  border challenge charset checked cite color cols colspan content contenteditable contextmenu accesskey data dir draggable dropzone
  hidden lang spellcheck tabindex translate rows".split /\s+/
Events = "
  blue click change dblclick error focus input keydown keyup keypress load mousedown mousemove mouseover
  mouseout mouseup resize scroll select submit unload".split /\s+/

class Pen
  Tags.forEach (tag) ->
    Pen::[tag] = (txt, obj, els...) ->
      @build tag, txt, obj, els...

  optionHandler: (optionsObj) ->
    options = "autoAppend debug console styleConfig".split /\s+/
    for option of optionsObj
      for i in options
        if i.match new RegExp option, "gi"
          @options[option] = optionsObj[option]
    return

  constructor: (optionsObj) ->
    @options =
      autoAppend: false
      debug: false
      console:false
      styleConfig: false
    if optionsObj? then @optionHandler optionsObj
    return this

  setOptions: (optionsObj) ->
    @optionHandler optionsObj
    return

  getOption: (option) -> @options[option]

  checkString: (str) ->
    if str instanceof String is true
      str = document.querySelector str
      return str
    else
      return str

  Debug: (msg...) ->
    log = console.log
    if this.getOption("debug") is true
      log "Pen:  #{msg.join '\n\t'}"
    return

  userDebug: (prefix, msg...) ->
    log = console.log
    if @getOption("debug") is true
      log "#{prefix}: #{msg.join '\n\t'}"
    return

  attribute_build: (el, obj) ->
    @Debug "checking attributes in object..."
    vos = 0
    for attr of obj
      @Debug "checking attribute #{vos}"
      vos++
      for i in Events
        if i.match new RegExp attr, "gi"
          el.setAttribute "on#{attr}", obj[attr]
      for i in attrs
        if i.match new RegExp attr, "gi"
          el.setAttribute attr, obj[attr]
    return el

  auto: (el) ->
    if @getOption("autoAppend") is true
      @Debug "appending #{el.outerHTML} to the body..."
      document.body.appendChild el
    return el

  Append: (el, els...) ->
    @Debug "appending #{els.length} elements..."
    el = @checkString el
    if els.length isnt 0 and els?
      for i in els
        el.appendChild i
    return el

  handle: (el) ->
    @Debug "creating element..."
    el = document.createElement el
    return el

  set_text: (el, txt) ->
    @Debug "setting #{el.outerHTML} text to '#{txt}'"
    el.innerHTML = txt
    return el

  build: (el, txt, obj, els...) ->
    el = @handle el
    el = @set_text el, txt
    el = @attribute_build el, obj
    el = @Append el, els...
    el = @auto el
    @Debug "returning #{el.outerHTML}..."
    return el

  create: (el, obj, txt,els...) ->
    el = @handle el
    el = if txt? then @set_text el, txt else @set_text el, ''
    el = @attribute_build el, obj
    el = @Append el, els...
    return el

  bodyAppend: (els...) -> @Append document.body, els...
  headAppend: (els...) -> @Append document.head, els...
  select: (el) -> document.querySelector el
  selectAll: (el) -> document.querySelectorAll el

if module?
  module.exports = Pen
