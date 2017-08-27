pen = do ->
  vrs = {}
  vrs.regs =
    attribute: /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi
    css: /([^\n;: ]+):([^\n]+);/gi
    define: /define\s*([^\n\ ]+)\s*as\s*([^\n\ ,]+)(\s*(?:global|local)ly)?/i
    tag: /<([^\n]*?)>/gi
    eleme: /<([^\n]*?)>([\S\s]*?)<\/([^\n]*?)>/gi
    innerText: />([\S\s]*?)</gi
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
        if returns?
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
      else
        return null
  {log, error, dir} = console
  vrs.log = log
  vrs.error = error
  vrs.dir = dir
  vrs.slice = (vr) => Array::slice.call vr
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
      app = if it.ops.global.html.app? then it.ops.global.html.app else false
      parse = if it.ops.global.html.parse? then it.ops.global.html.parse else false

    it.text = str
    if str?
      if app is true
        it.el[prop] += str
      else
        it.el[prop] = str
      return it
    else
      return it.el[prop]
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

  pen = (element, options) ->
    if not (this instanceof pen)
      return new pen element, options
    @events = {}
    @hidden = false
    @attributes = {}
    @style = {}
    @start element, options
    return

  pen.ink = pen:: = {}
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
  pen.parseAttributes = vrs.parser vrs.regs.attribute, 1, 3
  pen.parseCss = vrs.parser vrs.regs.css, 1, 2
  pen.add = (typ, func, name) ->
    switch typ
      when 'addon'
        func(pen)
      when 'function', 'func', 'def', 'funco'
        if vrs.type(func) is 'object'
          for funcName of func
            pen::[funcName] = func[funcName]
        else
          ret = func(pen)
          if vrs.type(ret) isnt 'function'
            vrs.log("Pen-Add: argument2 must return a function and must be a function. Type of return is #{type ret}")
          else if vrs.type(ret) is 'function'
            if not func.name?
              if name?
                pen::[name] = ret
              else
                throw new Error "Function cannot be anonymous"
                .name = "Pen-add arg2"
            else
              pen::[func.name] = ret
          else if vrs.type(ret) is 'object'
            for funcName of ret
              pen::[funcName] = ret[funcName]
            # pen::[func?.name] = ret
    return

  pen::start = (element, options) ->
    if vrs.type(options) is 'string'
      el = pen.$(options, true)
      if element.includes(".") or element.includes('#')
        element = el.$(element)
      else
        element = el.create(element)
    else
      @setupOptions options
    @el = element
    if element instanceof Document
      @body = element.body
      @head = element.head
      pen::ready = (cb, cp) ->
        @on 'DOMContentLoaded', cb, cp
        return @
    else if element instanceof Window
      @document = element.document
    else if element instanceof pen
      for prop of element
        @[prop] = element[prop]
    else if vrs.type(element) is 'string'
      if element.startsWith("define") is yes
        return @define element
      else
        @setup element
    if @ops.autoAttach is yes
      @ops.autoAttachTo.append element
      return this
  pen::setupOptions = (ops) ->
    @ops =
      autoAttach: (if ops? and ops.autoAttach? then ops.autoAttach else no)
      autoAttachTo: (if ops? and ops.autoAttachTo? then ops.autoAttachTo else window['body'])
      global:
        parseIt: (if ops? and ops.global? and ops.global.parseIt? then ops.global.parseIt else no)
        create: (if ops? and ops.global? and ops.global.create? then ops.global.create else 'return child')
        html:
          app: (if ops? and ops.global? and ops.global.html? and ops.global.html.app? then ops.global.html.app else no)
          parse: (if ops? and ops.global? and ops.global.html? and ops.global.html.parse? then ops.global.html.parse else no)
    return
  pen::toString = () => @el.outerHTML
  pen::define = (toDef) ->
    if vrs.regs.define.test(toDef) is true
      [func, oname, t] = vrs.regs.define.exec(toDef)[1..3]
      if t?
        t = t.trim()
        if t is 'locally'
          return vrs[func]
        else
          window[oname] = vrs[func]
      else
        window[oname] = vrs[func]
    return undefined
  pen::setup = (el) ->
    if vrs.type(el) is 'string'
      if vrs.regs.tag.test(el) is true
        txt = vrs.regs.innerText.test el
        if txt is yes
          tut = el.replace vrs.regs.eleme, '$2'
          el = el.replace vrs.regs.eleme, '$1'
        el = el.replace vrs.regs.tag, '$1'
        soc = vrs.regs.attribute.test el
        el = el.replace /\//gi, ''
        if soc is yes
          reu = pen.parseAttributes el
          el = el.replace vrs.regs.attribute, ''
          .trim()
        ev = pen.crt el
      else
        ev = pen.$ el
    else
      ev = el
    @el = @el = ev
    if soc is yes
      for prop of reu
        @attr prop, reu[prop]
    if txt is yes and tut?
      @html tut, parse:yes
    @inits()
    @partialSetup ev
    return ev
  pen::partialSetup = (ev) ->
    @attributes.id = vrs.detectAndReturn 'id', ev
    @attributes.class = vrs.detectAndReturn 'class', ev
    szlp = @el.getBoundingClientRect()
    @size =
      width: szlp.width, height: szlp.height
    @inits()
    switch @tag
      when 'template'
        @content = ev.content
        pen::clone = () ->
          args = vrs.slice arguments
          document.importNode [args...]
      when 'canvas'
        @ctx = @context = @el.getContext '2d'
    return

  pen::initTag = () ->
    tag = @tag = if @el.tagName? then @el.tagName.toLowerCase() else 'ios-element'
    return tag
  pen::initText = () ->
    text = @text = if @el.innerText isnt "" then @el.innerText else null
    return text
  pen::initChildren = () ->
    children = @Children = if @tag is 'template' then @el.content.children else @el.children
    return children
  pen::initParent = () ->
    parent = @Parent = if @el.parentNode? then @el.parentNode else null
    return parent
  pen::initLocalName = () ->
    @initAttributes()
    @initTag()
    res1 = if @attributes.id? then "##{@attributes.id}" else ''
    res2 = if @attributes.class? then ".#{vrs.slice(@el.classList).join '.'}" else ''
    str = "#{@tag}#{res1}#{res2}"
    @localName = str
    return str
  pen::initClases = () ->
    res = vrs.slice(@el.classList)
    @Classes = res
    return res
  pen::initAttributes = () ->
    ret = []
    res = vrs.slice @el.attributes
    for attr in res
      @attributes[attr.name] = attr.value
      ret.push("#{attr.name}='#{attr.value}'")
    return ret
  pen::inits = () ->
    ret = {}
    ret.tag = @initTag()
    ret.text = @initText()
    ret.children = @initChildren()
    ret.parent = @initParent()
    ret.attributes = @initAttributes()
    ret.classes = @initClases()
    ret.localName = @initLocalName()
    return ret

  pen::html = (str, ops) ->
    if ops?
      app = if ops.app? then ops.app else false
      parse = if ops.parse? then ops.parse else false
    else
      app = if @ops.global.html.app? then @ops.global.html.app else false
      parse = if @ops.global.html.parse? then @ops.global.html.parse else false

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
  pen::attr = (attribute, value) ->
    func = funcoso this, 'attributes', 'setAttribute'
    if attribute?
      if vrs.type(attribute) is 'object'
        @attributes['class'] = attribute?.id
        @attributes['id'] = attribute?.class
        return func(attribute)
      else if value?
        @el.setAttribute attribute, value
        @attributes[attribute] = value
        @inits()
        return this
      else if vrs.type(attribute) is 'string' and not value?
        attrs = pen.parseAttributes attribute
        for attr of attrs
          @el.setAttribute attr, attrs[attr]
          @attributes[attr] = attrs[attr]
        @inits()
        return this
      else
        @inits()
        return @el.getAttribute attribute
    else
      return @attributes
  pen::css = (rule, rules) ->
    func = funcoso this, 'style'
    if rule?
      switch vrs.type(rule)
        when 'object' then return func(rule)
        when 'string'
          if rules?
            rule = rule.replace /-(\w{1})/g, (whole, dash) => dash.toUpperCase()
            @style[rule] = rules
            @el.style[rule] = rules
            return this
          else
            styles = pen.parseCss rule
            for style of styles
              st = styles[style]
              @style[style] = st
              @el.style[style] = st
            return this
        else
          return @el.style[rule]
    else
      return @style
  pen::on = (evtp, cb, cp) ->
    cp ?= false
    if not @events?
      @events = {}
    @events[evtp] = {}
    @events[evtp].capture = cp
    @events[evtp][if cb.name isnt '' then cb.name else 'func'] = cb
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
      else @el[typeEvent] = null

    delete @events[evtp]
    return this
  pen::is = (tag) => @tag is tag
  pen::append = (elements...) ->
    for element in elements
      if vrs.type(element) is 'string'
        element = pen.$ element
      else if element instanceof pen
        element.Parent = @el
      elu = (if element instanceof pen then element.el else element)
      if @tag is 'template'
        @el.content.appendChild elu
      else
        @el.appendChild elu
    return this
  pen::appendTo = (element) ->
    if vrs.type(element) is 'string'
      element = pen.$ element
    pen(element).append(@el)
    return this
  pen::remove = ->
    check = if @Parent? then 'Parent' else if @el.parentNode? then 'parentNode' else null
    if check?
      @[check].removeChild(@el)
      @Parent = null
    else
      log "Pen-remove-error: There's no parent to remove child: #{@localName} from"
    return this
  pen::$ = (element, parseIt) ->
    result = if @tag is 'template' then @el.content else @el
    if @ops.global.parseIt is true or parseIt is true
      return pen result.querySelector(element)
    else
      return result.querySelector(element)
  pen::$$ = (element) ->
    result = if @tag is 'template' then @el.content else @el
    result.querySelectorAll(element)
  pen::create = pen::createElement = (element, ret) ->
    element = pen(element)
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
      @el.classList.toggle classs
    return this
  pen::hasClass = (cls) ->
    @initClases()
    for clss in @Classes
      if clss is cls
        return true
    return false
  pen::hide = () ->
    if @hidden isnt true
      @hidden = true
      @css 'display', 'none'
    else
      @hidden = false
      @css 'display', ''
    return
  pen::getSize = () -> {width: @el.getBoundingClientRect().width, height: @el.getBoundingClientRect().height}
  atribs = ['id', 'class', 'href', 'src', 'contentEditable', 'charset', 'title', 'rows', 'cols', 'style']
  evps = ['click', 'keyup' ,'keypress','keydown' ,'mouse', 'mouseup', 'error', 'load', 'mouseover', 'mousedown' ,'mouseout', 'contextmenu', 'dblclick' ,'drag', 'dragover', 'drop', 'dropend']
  atribs.forEach (atrib, ind) ->
    pen::[atrib] = (str) ->
      if str? then @attr atrib, str else @attr atrib
      return
  evps.forEach (evp, inds) ->
    pen::[evp] = (cb, cp) ->
      if not @events[evp]? then @on(evp, cb, cp) else @off(evp, cb, cp)
      return
  pen.vrs = vrs
  return pen
