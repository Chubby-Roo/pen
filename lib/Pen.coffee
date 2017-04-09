
Tags = "
  a link style p pre audio b u s img block video span ul li ol code lable legend div h1 h2 h3 h4 h5 h6 form fieldset input button abbr canvas script br
  hr table tbody td textarea body head em dl dt header html i iframe colgroup datalist dd del details dfn dialog footer ins kbd main map mark menu ruby
  rp rt samp section embed wbr source track param meta keygen tr time var area base col".split /\s+/
attrs = "
  src href type rel style id type value class title width height name charset action align alt async autocomplete autofocus autoplay bgcolor
  border challenge charset checked cite color cols colspan content contenteditable contextmenu accesskey data dir draggable dropzone
  hidden lang spellcheck tabindex translate".split /\s+/
Events = "
  blue click change dblclick error focus input keydown keyup keypress load mousedown mousemove mouseover
  mouseout mouseup resize scroll select submit unload".split /\s+/

class Pen
  Tags.forEach (tag) -> Pen::[tag] = (txt, obj, els) -> @build tag, txt, obj, els
  optionHandler: (optionsObj) ->
    options = "autoAppend debug console styleConfig".split /\s+/
    for option of optionsObj
      for i in options
        if i.match new RegExp option, "gi"
          @options[option] = optionsObj[option]
    return

  constructor: (optionsObj) ->
    @options =
      autoAppend: null
      debug: null
      console:null
      styleConfig: null
    if optionsObj? then @optionHandler optionsObj
    return this

  setOptions: (optionsObj) ->
    @optionHandler optionsObj
    return

  getOption: (option) -> @options[option]

  build: (el, txt, obj, els) ->
    el = document.createElement el
    el.innerHTML = txt
    for attr of obj
      for i in Events
        if i.match new RegExp attr, "gi"
          el.setAttribute "on#{attr}", obj[attr]
      for i in attrs
        if i.match new RegExp attr, "gi"
          el.setAttribute attr, obj[attr]
    log els.toString()
    return el
