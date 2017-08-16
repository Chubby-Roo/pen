pen = do ->
  vrs = {}
  vrs.type = do ->
    class2Type = {}
    for name in 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split /\s+/gi
      class2Type["[object #{name}]"] = name.toLowerCase()
    (obj) ->
      strType = Object::toString.call obj
      class2Type[strType] or 'object'

  vrs.parser = (regs, flags, num1, num2) ->
    flags ?= 'gi'
    num1 ?= 1
    num2 ?= 2
    if vrs.type(regs) is 'string'
      resg = regs
      regs = new RegExp regs, flags

    (str) =>
      if str?
        returns = str.match regs
        retsi = {}
        for match in returns
          match
          .trim()
          .replace regs, (args...) ->
            if vrs.type(resg) is 'string'
              retsi[args[num1]] = args[num2]
            else
              retsi[args[flags]] = args[num1]
            return
        return retsi
      else
        return null

  vrs.empty = (obj) => if not obj? then true else false

  {log, error, dir} = console
  vrs.log = log
  vrs.error = error
  vrs.dir = dir
  document.addEventListener "DOMContentLoaded", (ev) ->
    window['body'] = document.body
    window['head'] = document.head

  vrs.detectAndReturn = (ting, ev) ->
    if ev.hasAttribute(ting) is true
      ev.getAttribute ting

  vrs.def = (prop, str, it, ops) =>
    if ops?
      app = if ops.app? then ops.app else false
      parse = if ops.parse? then ops.parse else false
    else
      app = if it.options.global.html.app? then it.options.global.html.app else false
      parse = if it.options.global.html.parse? then it.options.global.html.parse else false

    it.text = str
    if str?
      if app is true
        it.element[prop] += str
      else
        it.element[prop] = str
      return it
    else
      return it.element[prop]

  pen = (element, options) ->
    if not (this instanceof pen)
      return new pen element, options
    @events = {}
    @attributes = {}
    @style = {}
    @options =
      autoAttach: no
      autoAttachTo: window['body']
      global:
        parseIt: no
        create:
          retneh: 'return child'
        html:
          app: no
          parse: no
    @element = @el = element
    if element instanceof Document
      @body = element.body
      @head = element.head
      pen::ready = (cb, cp) ->
        it = this
        it.on 'DOMContentLoaded', cb, cp
        return it
    else if element instanceof pen
      for prop of element
        @[prop] = element[prop]
    else
      @setup element

    if @options.autoAttach is yes
      @options.autoAttachTo.append element
    return

  pen.ink = pen:: = {}
  pen::toString = () => @el.outerHTML
  pen.define = (toDefs...) ->
    cps = {'type', 'parser', 'empty', 'log', 'error', 'dir'}
    for toDef in toDefs
      if cps[toDef] is toDef
        window[toDef] = vrs[toDef]
    return

  pen.$ = (element, parseIt) ->
    parseIt ?= false
    if parseIt is yes
      return pen(document.querySelector element)
    else
      return document.querySelector element
  pen.$$ = (element) -> document.querySelectorAll element
  pen.crt = (element, parseIt) ->
    parseIt ?= false
    if parseIt is yes then pen(document.createElement element) else document.createElement element

  pen::setup = (el) ->
    @text = null
    tag = /<([^\n]*?)>/gi
    attribute = /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi
    if vrs.type(el) is 'string'
      if tag.test(el) is true
        el = el.replace /<|>/gi, ''
        soc = attribute.test el
        if soc is yes
          reu = pen.parseAttributes el
          el = el.replace attribute, ''
          .trim()
        ev = pen.crt el
        if soc is true
          for prop of reu
            ev.setAttribute prop, reu[prop]
            @attributes[prop] = reu[prop]
      else
        ev = pen.$ el
    else
      ev = el
    @element = @el = ev
    @tag = if ev.tagName? then ev.tagName.toLowerCase() else 'ios-element'
    @partialSetup ev
    return ev

  pen::partialSetup = (ev) ->
    @Id = vrs.detectAndReturn 'id', ev
    @Class = vrs.detectAndReturn 'class', ev
    @Children = if @tag is 'template' then ev.content.children else ev.children
    @Parent = if ev.parentNode? then ev.parentNode else null
    str = ev.outerHTML
    attrs = pen.parseAttributes str
    stys = pen.parseCss attrs?.style
    for sty of stys
      @style[sty] = stys[sty]
    for attr of attrs
      @attributes[attr] = attrs[attr]
    @inits()
    switch @tag
      when 'template'
        @content = ev.content
        pen::clone = () ->
          args = Array::slice.call arguments
          document.importNode [args...]
      when 'canvas'
        @ctx = @context = @element.getContext '2d'
    return

  pen.parseAttributes = vrs.parser /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi, 1, 3

  pen.parseCss = vrs.parser /([^\n\ ;:]*?):([^\n]*?);/gi, 1, 2

  pen::initLocalName = () ->
    it2 = this
    res1 = if it2.Id? then "##{it2.Id}" else ''
    res2 = if it2.Class? then ".#{Array::slice.call(it2.element.classList).join '.'}" else ''
    str = "#{it2.tag}#{res1}#{res2}"
    @localName = str
    return str
  pen::initClases = () ->
    it2 = this
    res = Array::slice.call(it2.element.classList)
    @Classes = res
    return res

  pen::inits = () ->
    @initLocalName()
    @initClases()
    return this

  pen::selfInstance = (obj, cb) ->
    if obj instanceof pen
      cb obj, this
    return this

  pen::html = (str, ops) ->
    if ops?
      app = if ops.app? then ops.app else false
      parse = if ops.parse? then ops.parse else false
    else
      app = if @options.global.html.app? then @options.global.html.app else false
      parse = if @options.global.html.parse? then @options.global.html.parse else false

    switch @tag
      when 'input', 'textarea'
        return vrs.def 'value', str, this, ops
      when 'option'
        def 'value', str, this, ops
        return vrs.def 'innerText', str, this, ops
      when 'template'
        log "Please use pen.append"
        return
      else
        return vrs.def((if parse is true then 'innerHTML' else 'innerText'), str, this, ops)
    return

  funcoso = (it, typeso, typesi) ->
    typesi ?= typeso
    chk1 = (whl, propz, prop) ->
      if vrs.type(it.element[typesi]) is 'function'
        it.element[typesi] whl, propz[prop]
      else
        it.element[typesi][whl] = propz[prop]
      return
    funcso = (propz, nm) ->
      for prop of propz
        if vrs.type(propz[prop]) is 'object'
          funcso propz[prop], prop
        else
          if nm?
            it[typeso]["#{nm}-#{prop}"] = propz[prop]
            chk1 "#{nm}-#{prop}", propz, prop
          else
            it[typeso][prop] = propz[prop]
            chk1 prop, propz, prop
      return it
    return funcso

  pen::attr = (attribute, value) ->
    func = funcoso this, 'attributes', 'setAttribute'
    res = if attribute is 'id' then 'id' else if attribute is 'class' then 'class' else undefined
    vl = if value? and attribute is ('id' or 'class') then value else undefined
    if attribute?
      if vrs.type(attribute) is 'object'
        resid = attribute?.id
        rescls = attribute?.class
        @Id = resid
        @Class = rescls
        @attributes['class'] = rescls
        @attributes['id'] = resid
        return func(attribute)
      else if value?
        @[res] = vl
        @element.setAttribute attribute, value
        @attributes[attribute] = value
        @inits()
        return this
      else if vrs.type(attribute) is 'string'
        attrs = @parseAttributes attribute
        for attr of attrs
          @[res] = if (attrs[attr]?) and attr is ('id' or 'class') then attrs[attr] else undefined
          @element.setAttribute attr, attrs[attr]
          @attributes[attr] = attrs[attr]
        @inits()
        return this
      else
        @inits()
        return @element.getAttribute attribute
    else
      return @attributes

  pen::css = (rule, rules) ->
    func = funcoso this, 'style'
    if rule?
      switch vrs.type(rule)
        when 'object' then return func(rule)
        when 'string'
          styles = @parseCss rule
          for style of styles
            st = styles[style]
            @style[style] = st
            @element.style[style] = st
          return this
        else
          return this.element.style[rule]
    else
      return this.style

  pen::on = (evtp, cb, cp) ->
    cp ?= false
    @events[evtp] = {}
    @events[evtp].capture = cp
    typeEvent = if @el.addEventListener? then 'addEventListener' else if @el.attachEvent? then 'attachEvent' else "on#{evtp}"
    switch typeEvent
      when 'addEventListener' then @el[typeEvent](evtp, cb, cp)
      when 'attachEvent' then @el[typeEvent](evtp, cb)
      else @el[typeEvent] = cb

    return this

  pen::off = (evtp, cb) ->
    typeEvent = if @el.addEventListener? then 'removeEventListener' else if @el.attachEvent? then 'detachEvent' else "on#{evtp}"
    switch typeEvent
      when 'removeEventListener' then @el[typeEvent](evtp, cb)
      when 'detachEvent' then @el[typeEvent](evtp, cb)
      else @el[typeEvent] = cb

    delete @events[evtp]
    return this

  pen::is = (tag) => @tag is tag

  pen::append = (elements...) ->
    for element in elements
      if vrs.type(element) is 'string'
        element = pen.$ element
      @selfInstance element, (emt, it) ->
        emt.Parent = it.element
        return
      elu = (if element instanceof pen then element.el else element)
      if @tag is 'template'
        @element.content.appendChild elu
      else
        @element.appendChild elu
    return this

  pen::appendTo = (element) ->
    if vrs.type(element) is 'string'
      element = pen.$ element
    pen(element).append(@element)
    return this

  pen::remove = ->
    check = if @Parent? then 'Parent' else if @element.parentNode? then 'parentNode' else null
    if check?
      @[check].removeChild(@element)
      @Parent = null
    else
      log "Pen-remove-error: There's no parent to remove child: #{@localName} from"
    return this

  pen::$ = (element, parseIt) ->
    result = if @tag is 'template' then @element.content else @element
    if @options.global.parseIt is true or parseIt is true
      return pen result.querySelector(element)
    else
      return result.querySelector(element)

  pen::$$ = (element) ->
    result = if @tag is 'template' then @element.content else @element
    result.querySelectorAll(element)

  pen::create = pen::createElement = (element, ret) ->
    element = pen("<#{element}>")
    @append(element)
    if /child|parent/gi.test(ret) is true
      result = "return #{ret}"
      if result.endsWith("parent") is true
        return this
      else
        return element
    else
      return

  pen::toggle = (classes...) ->
    for classs in classes
      @element.classList.toggle classs
    return this

  atribs = 'id class href src contentEditable charset title rows cols'.split /\s+/
  evs = 'click keyup keypress keydown mouse mouseup mouseover mousedown mouseout contextmenu dblclick'.split /\s+/
  evs.forEach (evp) ->
    pen::[evp] = (cb, cp) -> if not @events[evp]? then @on(evp, cb, cp) else @off(evp, cb, cp)
    return
  atribs.forEach (atrib) ->
    pen::[atrib] = (str) -> if str? then @attr atrib, str else @attr atrib
    return

  return pen
