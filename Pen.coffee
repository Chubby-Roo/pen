pen = do ->
  ldr = (ev) =>
    window['body'] = document.body; window['pBody'] = pen body; window['head'] = document.head; window['pHead'] = pen head
    window['pDoc'] = pen document;
    return
  document.addEventListener "DOMContentLoaded", ldr, {once:true}
  vrs = {}
  elCount = 0
  win = window
  doc = document
  `vrs.proto = (pro) => pro.prototype`
  `vrs.arr = vrs.proto(Array); vrs.obj = vrs.proto(Object)`
  `vrs.slice = (vr) => vrs.arr.slice.call(vr)`
  `vrs.toString = (vr) => vrs.obj.toString.call(vr)`
  `vrs.ranDos = (arr) => arr[Math.floor(Math.random() * arr.length)]`
  vrs.iterate = (arr, times) =>
    res = []
    `for (var i = 0, len = times; i < times; ++i) {
      res.push(vrs.ranDos(arr));
    }`
    return "i#{res.join ''}"
  `vrs.str = (regs, flags) => vrs.type(regs) === 'string' ? new RegExp(regs, flags) : regs`
  vrs.regs =
    attribute: /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi
    css: /([^\n;: ]+):([^\n]+);/gi
    define: /define\s*([^\n\ ]+)\s*as\s*([^\n\ ,]+)(\s*(?:global|local)ly)?/i
    tag: /<([^\n]*?)>/gi
    eleme: /<([^\n]*?)>([\S\s]*?)<\/([^\n]*?)>/gi
    innerText: />([\S\s]*?)</gi
  vrs.class2Type = {}
  names = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split /\s+/gi
  `names.forEach(name => {vrs.class2Type[\`[object ${name}]\`] = name.toLowerCase()})`
  `vrs.type = (obj) => (vrs.class2Type[vrs.toString(obj)] || 'object')`
  vrs.parser = (regs, num1 = 1, num2 = 2, flags) ->
    regs = vrs.str regs, (flags or 'gi')
    (str) =>
      if str?
        retsi = {}
        results = str.match regs
        if results? and results.length isnt 0
          results.forEach (match) =>
            if match.includes "="
              [name, value] = match.split "="
              value = value.replace /^['"]([^\n]+)['"]$/m, '$1'
              retsi[name] = value
            return
          return retsi
      return
  `vrs.log = console.log; vrs.error = console.error; vrs.dir = console.dir`
  `vrs.detectAndReturn = (ting, ev) => ev.hasAttribute(ting) === true ? ev.getAttribute(ting) : null`
  vrs.defo = (prop, str, it, ops) =>
    app = if ops? then (ops.app or false) else it.ops.global.html.app
    `app === true ? it.text += str : it.text = str`
    reg = /input|option|textarea/i
    if str?
      if reg.test(it.tag) is true
        it.attr 'value', (if app is true then "#{it.el.getAttribute('value')}#{str}" else str)
      else
        `app === true ? it.el[prop] += str : it.el[prop] = str`
      return it
    else
      return it.el[prop]
  vrs.funcoso = (it, typeso, typesi) ->
    typesi ?= typeso
    `chk1 = (whl, propz, prop) => vrs.type(it.el[typesi]) === 'function' ? it.el[typesi](whl, propz[prop]) : it.el[typesi][whl] = propz[prop]`
    funcso = (propz, nm) ->
      for prop, prp of propz
        if vrs.type(prp) is 'object'
          funcso prp, prop
        else
          if nm?
            it[typeso]["#{nm}-#{prop}"] = prp
            chk1 "#{nm}-#{prop}", propz, prop
          else
            it[typeso][prop] = prp
            chk1 prop, propz, prop
      return it
    return funcso
  `vrs.searchAndSlice = (str, ...els) => els.map(el => str.search(el))`
  `vrs.penError = (name, msg) => {er = new Error(msg); er.name = name; throw er;}`
  vrs.resolve = (res) ->
    switch type res
      when 'string' then pen res
      when 'array' then pen res...
  vrs.findInObj = (obj, key, defin) ->
    key = vrs.str key, 'i'
    for kname, kvalue of obj
      if /autoAttachTo|el/i.test(kname) is false
        return if key.test(kname) is true then kvalue else if vrs.type(kvalue) is 'object' then pen.findInObj kvalue, key, defin
    return defin
  pen = () ->
    args = arguments
    return new pen args... if !(@ instanceof pen)
    return args[0] if args[0] instanceof pen
    @hidden = false
    @attributes = {}
    @style = {}
    @start args...
    return
  pen.ink = pen:: = {}
  pen.selected = {}; pen.created = {}
  pen.$ = (el, ps = false) ->
    if vrs.type(el) is 'string'
      selec = doc.querySelector(el)
      pen.selected["element#{elCount++}"] = selec
      return `ps === true ? pen(selec) : selec`
    else
      return el
  pen.$$ = (el, ps) =>
    els = vrs.slice document.querySelectorAll el
    `els.forEach(el => {pen.selected["element#{elCount++}"] = el})`
    elv = if ps is true then `els.map(el => {return pen(el)})` else els
    return elv
  pen.create = (el, parseIt = false) =>
    el = doc.createElement(el)
    pen.created["element#{elCount++}"] = el
    return `parseIt === true ? pen(el) : el`
  pen.addedFunctions = {}
  pen.parse =
    attributes: vrs.parser vrs.regs.attribute, 1, 3
    element: (str) ->
      [s, e] = vrs.searchAndSlice str, '<', '>'
      stTag = str.slice(s, e+1)
      [s, e] = vrs.searchAndSlice stTag, ' ', '>'
      attribs = stTag.slice(s+1, e)
      [s, e] = vrs.searchAndSlice stTag, '<', ' '
      tag = stTag.slice(s+1, e)
      [s, e] = vrs.searchAndSlice str, '>', '</'
      text = str.slice(s+1, e)
      return [str, stTag, attribs, tag, (if text is '' then null else text)]
  pen::start = (ele, ops) ->
    t = vrs.type ops
    if t is 'string'
      el = pen.$ ops, yes
      ele = if /\.|#|\[\]/gi.test(ele) is yes then el.$ ele else el.create ele
    else
      @initOptions ops
    @el = ele
    t1 = vrs.type @el
    if @el instanceof Document
      @body = window['pBody']
      @head = window['pHead']
      pen::ready = () ->
        args = arguments
        @on 'DOMContentLoaded', args...
        return @
    else if @el instanceof Window
      @doc = @el.document
    else if t1 is 'string'
      `this.el.startsWith('define') === true ? this.define(this.el) : this.setup(this.el)`

    if @ops.autoAttach is yes
      @ops.autoAttachTo.append element
    return @

  pen::initOptions = (ops) ->
    @ops =
      autoAttach: (if ops? then (ops.autoAttach or no))
      autoAttachTo: (if ops? then (ops.autoAttachTo or window['body']))
      global:
        parseIt: (if ops? and ops.global? then (ops.global.parseIt or no))
        create: (if ops? and ops.global? then (ops.global.create or 'return child'))
        html:
          app: (if ops? and ops.global? and ops.global.html? then (ops.global.html.app or no))
          parse: (if ops? and ops.global? and ops.global.html? then (ops.global.html.parse or no))
    return @ops

  `pen.prototype.toString = function () {return this.el.outerHTML;}`

  pen::define = (toDef) ->
    if vrs.regs.define.test(toDef) is true
      [func, oname, t] = vrs.regs.define.exec(toDef)[1..3]
      if t?
        `t.trim() === 'locally' ? vrs[func] : window[oname] = vrs[func]`
      else window[onmae] = vrs[func]
    return

  pen::setup = (el) ->
    t = vrs.type el
    if t is 'string'
      if el.startsWith('<')
        [whole, startTag, attributes, tag, text] = pen.parse.element el
        attribs = pen.parse.attributes attributes
        @el = pen.create tag
      else
        @el = pen.$ el
    else
      @el = el
    for name, value of attribs
      @attr name, value
    if text? and text.length isnt 0
      @html text, parse: yes
    @inits()
    @partialSetup()
    return

  pen::partialSetup = (ev) ->
    @attributes.id = vrs.detectAndReturn 'id', @el
    @attributes.class = vrs.detectAndReturn 'class', @el
    @size = @el.getBoundingClientRect()
    @el.events = {}
    @inits()
    @cel = if @tag is 'template' then @el.content else @el
    switch @tag
      when 'template'
        @content = @el.content
        pen::clone = () ->
          args = arguments
          document.importNode args...
      when 'canvas'
        @ctx = @context = @el.getContext '2d'
    return @

  pen::initTag = () -> @tag = if @el.tagName? then @el.tagName.toLowerCase() else 'ios-element'
  pen::initText = () -> @text = @html()
  pen::initChildren = () -> @Children = if @tag is 'template' then @el.content.children else @el.children
  pen::initParent = () -> @Parent = (@el.parentNode or null)
  pen::initClasses = () -> @Classes = vrs.slice @el.classList
  pen::initLocalName = () ->
    `this.initAttributes(); this.initTag()`
    res1 = if @attributes.id? then "##{@attributes.id}" else ''
    res2 = if @attributes.class? then ".#{vrs.slice(@el.classList).join '.'}" else ''
    @localName = "#{@tag}#{res1}#{res2}"
  pen::initAttributes = () ->
    ret = vrs.slice @el.attributes
     .map (result) =>
      @attributes[result.name] = result.value
      return "#{result.name}='#{result.value}'"
    return ret
  pen::inits = () ->
    ret = {}
    ret.tag = @initTag()
    ret.text = @initText()
    ret.children = @initChildren()
    ret.parent = @initParent()
    ret.attributes = @initAttributes()
    ret.classes = @initClasses()
    ret.localName = @initLocalName()
    return ret

  pen::html = (str, ops) ->
    parse = if ops? then (ops.parse or false) else @ops.global.html.parse
    @initTag()
    switch @tag
      when 'input', 'textarea'
        return vrs.defo 'value', str, @, ops
      when 'option'
        vrs.defo 'value', str, @, ops
        return vrs.defo 'innerText', str, @, ops
      else
        return vrs.defo((if parse then 'innerHTML' else 'innerText'), str, @, ops)

  pen::attr = (attribute, value) ->
    func = vrs.funcoso this, 'attributes', 'setAttribute'
    if attribute?
      if vrs.type(attribute) is 'object'
        return func(attribute)
      else if value?
        @el.setAttribute attribute, value
        @attributes[attribute] = value
        @inits()
        return @
      else if vrs.type(attribute) is 'string' and /=/.test(attribute) is true and !value?
        attrs = pen.parseAttributes attribute
        for name, value of attrs
          @el.setAttribute name, value
          @attributes[name] = value
        @inits()
        return @
      else
        @inits()
        return @el.getAttribute attribute
    else
      return @attributes
  pen::css = (rule, rules) ->
    func = vrs.funcoso this, 'style'
    if rule?
      switch vrs.type(rule)
        when 'object' then return func(rule)
        when 'string'
          rule = rule.replace /-(\w{1})/g, (whole, dash) => dash.toUpperCase()
          @style[rule] = rules
          @el.style[rule] = rules
          return @
        else
          return @el.style[rule]
    else
      return @style
  pen::on = (evtp, cb, cp) ->
    cp = cp or false
    @el.events = @el.events or {}
    @el.events[evtp] = {}
    @el.events[evtp].capture = cp
    @el.events[evtp][if cb.name isnt '' then cb.name else 'func'] = cb
    typeEvent = if @el.addEventListener? then 'addEventListener' else if @el.attachEvent? then 'attachEvent' else "on#{evtp}"
    switch typeEvent
      when 'addEventListener' then @el[typeEvent](arguments...)
      when 'attachEvent' then @el[typeEvent](evtp, cb)
      else @el[typeEvent] = cb
    return @
  pen::off = (evtp, cb) ->
    typeEvent = if @el.removeEventListener? then 'removeEventListener' else if @el.detachEvent? then 'detachEvent' else "on#{evtp}"
    switch typeEvent
      when 'removeEventListener' then @el[typeEvent](evtp, cb)
      when 'detachEvent' then @el[typeEvent](evtp, cb)
      else @el[typeEvent] = null
    delete @el.events[evtp]
    return @
  pen::is = (tag) -> @tag is tag
  pen::append = (elements...) ->
    elements.forEach (element) =>
      element = pen.$ element
      if element instanceof pen
        element.Parent = @el
      elu = (if element instanceof pen then element.el else element)
      `this.tag === 'template' ? this.el.content.appendChild(elu) : this.el.appendChild(elu)`
    return @
  pen::appendTo = (element) ->
    pen(element).append(@el)
    return @
  pen::remove = ->
    @Parent.removeChild(@el)
    @Parent = null
    return @
  pen::$ = (element, parseIt = false) ->
    result = if @tag is 'template' then @el.content else @el
    result = if @ops.global.parseIt is true then pen(result.querySelector(element)) else if parseIt is true then pen(result.querySelector(element)) else result.querySelector(element)
    return result
  pen::$$ = (element) ->
    result = if @tag is 'template' then @el.content else @el
    result.querySelectorAll(element)
  pen::create = pen::createElement = (element, ret) ->
    element = pen(element)
    @append(element)
    if /child|parent/gi.test(ret) is true
      result = "return #{ret}"
      return `result.endsWith("parent") === true ? this : element`
    else
      return
  pen::toggle = (classes...) ->
    classes.forEach (classs) =>
      @el.classList.toggle classs
    return @
  pen::hasClass = (cls) ->
    @initClasses()
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
  pen::getSize = () -> @el.getBoundingClientRect()
  atribs = "id class href src contentEditable charset title rows cols style".split /\s+/g
  evps = "click keyup keypress keydown mouse mouseup error load mouseover mousedown mouseout contextmenu dblclick drag dragover drop dropend".split /\s+/g
  atribs.forEach (atrib) ->
    pen::[atrib] = () ->
      `str != null ? this.attr(atrib, ...arguments) : this.attr(atrib)`
  evps.forEach (evp) ->
    pen::[evp] = () ->
      `this.el.events[evp] == null ? this.on(evp, ...arguments) : this.off(evp, ...arguments)`
  pen.vrs = vrs
  return pen
