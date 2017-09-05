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
    if str?
      reg = /input|option|textarea/i
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
  `vrs.penError = (name, msg) => {er = new Error(msg); er.name = name; throw er;}`
  vrs.resolve = (res) ->
    switch type res
      when 'string'
        pen res
      when 'array'
        pen res...
  vrs.findInObj = (obj, key, defin) ->
    key = vrs.str key, 'i'
    for kname of obj
      if /autoAttachTo|el/i.test(kname) is false
        return if key.test(kname) is true then obj[kname] else if vrs.type(obj[kname]) is 'object' then pen.findInObj obj[kname], key, defin
    return defin
  pen = () ->
    args = arguments
    return new pen args... if !(@ instanceof pen)
    @events = {}
    @hidden = false
    @attributes = {}
    @style = {}
    @start args...
    return
  pen.ink = pen:: = {}
  pen.selected = {}
  pen.created = {}
  vrs.$ = (el, ps = false) => `ps === true ? (pen.selected[\`element${elCount++}\`] = el, pen(doc.querySelector(el))) : (pen.selected[\`element${elCount++}\`] = el, doc.querySelector(el))`
  vrs.$$ = (el, ps) =>
    els = vrs.slice document.querySelectorAll el
    return `ps === true ? els.map(el => {pen.selected[\`element${elCount++}\`] = el; return pen(el)}) : (els.forEach(el => {pen.selected[\`element${elCount++}\`] = el}), els)`
  `pen.create = (el, parseIt = false) => parseIt === true ? pen(doc.createElement (el)) : doc.createElement(el)`
  pen.addedFunctions = {}
  pen.parse =
    attributes: vrs.parser vrs.regs.attribute, 1, 3
    element: (str) ->
      s = str.search('<')
      e = str.search('>')+1
      stTag = str.slice(s, e)
      s = stTag.search(' ')+1
      e = stTag.search('>')
      attribs = stTag.slice(s, e)
      s = stTag.search('<')+1
      e = stTag.search(' ')
      tag = stTag.slice(s, e)
      s = str.search('>')+1
      e = str.search('</')
      text = str.slice(s, e)
      return [str, stTag, attribs, tag, (if text is '' then null else text)]
  pen.add = (func, name) ->
    t = vrs.type func
    if t is 'object'
      for fname of func
        pen.addedFunctions[fname] = func[fname]
        pen::[fname] = func[fname]
    else if t is 'function'
      if not func.name?
        if name?
          pen.addedFunctions[name] = func
          pen::[name] = func
        else
          vrs.penError "Pen-add 'no-name'", "function, must have a name. Cannot be anonymous"
      else
        pen.addedFunctions[func.name] = func
        pen::[func.name] = func
  pen::start = (ele, ops) ->
    t = vrs.type ops
    if t is 'string'
      el = pen.$ ops, yes
      if /\.|#|\[\]/gi.test ele
        ele = el.$ ele
      else
        ele = el.create ele
    else
      @initOptions ops
    @el = ele
    t1 = vrs.type @el
    if @el instanceof Document
      @body = window['pBody']
      @head = window['pHead']
      pen::ready = (cb) ->
        @on 'DOMContentLoaded', cb
        return @
    else if @el instanceof Window
      @doc = @el.document
    else if @el instanceof pen
      for prop of ele
        @[prop] = ele[prop]
    else if t1 is 'string'
      `this.el.startsWith('define') === true ? this.define(this.el) : this.setup(this.el)`

    if @ops.autoAttach is yes
      @ops.autoAttachTo.append element
    return @
  pen::initOptions = (ops) ->
    @ops =
      autoAttach: (if ops? and ops.autoAttach? then ops.autoAttach else no)
      autoAttachTo: (if ops? and ops.autoAttachTo? then ops.autoAttachTo else window['body'])
      global:
        parseIt: (if ops? and ops.global? and ops.global.parseIt? then ops.global.parseIt else no)
        create: (if ops? and ops.global? and ops.global.create? then ops.global.create else 'return child')
        html:
          app: (if ops? and ops.global? and ops.global.html? and ops.global.html.app? then ops.global.html.app else no)
          parse: (if ops? and ops.global? and ops.global.html? and ops.global.html.parse? then ops.global.html.parse else no)
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
    for prop of attribs
      @attr prop, attribs[prop]
    if text?
      @html text, parse: yes
    @inits()
    @partialSetup()
    return
  pen::partialSetup = (ev) ->
    @attributes.id = vrs.detectAndReturn 'id', @el
    @attributes.class = vrs.detectAndReturn 'class', @el
    szlp = @el.getBoundingClientRect()
    @size = {width, height} = szlp
    @inits()
    switch @tag
      when 'template'
        @content = @el.content
        pen::clone = () ->
          args = arguments
          document.importNode args...
      when 'canvas'
        @ctx = @context = @el.getContext '2d'
    return @
  pen::initTag = () ->
    @tag = if @el.tagName? then @el.tagName.toLowerCase() else 'ios-element'
  pen::initText = () ->
    @text = @html()
  pen::initChildren = () ->
    @Children = if @tag is 'template' then @el.content.children else @el.children
  pen::initParent = () ->
    @Parent = if @el.parentNode? then @el.parentNode else null
  pen::initLocalName = () ->
    @initAttributes()
    @initTag()
    res1 = if @attributes.id? then "##{@attributes.id}" else ''
    res2 = if @attributes.class? then ".#{vrs.slice(@el.classList).join '.'}" else ''
    @localName = "#{@tag}#{res1}#{res2}"
  pen::initClasses = () ->
    @Classes = vrs.slice @el.classList
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
        vrs.defo 'value', str, @, ops
      when 'option'
        vrs.def 'value', str, @, ops
        return vrs.defo 'innerText', str, @, ops
      else
        vrs.defo((if parse then 'innerHTML' else 'innerText'), str, @, ops)
    return
  pen::attr = (attribute, value) ->
    func = vrs.funcoso this, 'attributes', 'setAttribute'
    if attribute?
      if vrs.type(attribute) is 'object'
        @attributes['class'] = attribute?.id
        @attributes['id'] = attribute?.class
        return func(attribute)
      else if value?
        @el.setAttribute attribute, value
        @attributes[attribute] = value
        @inits()
        return @
      else if vrs.type(attribute) is 'string' and not value?
        attrs = pen.parseAttributes attribute
        for attr of attrs
          @el.setAttribute attr, attrs[attr]
          @attributes[attr] = attrs[attr]
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
          if rules?
            rule = rule.replace /-(\w{1})/g, (whole, dash) => dash.toUpperCase()
            @style[rule] = rules
            @el.style[rule] = rules
            return @
          else
            styles = pen.parseCss rule
            for style of styles
              st = styles[style]
              @style[style] = st
              @el.style[style] = st
            return @
        else
          return @el.style[rule]
    else
      return @style
  pen::on = (evtp, cb, cp) ->
    cp = cp or false
    @events = @events or {}
    @events[evtp] = {}
    @events[evtp].capture = cp
    @events[evtp][if cb.name isnt '' then cb.name else 'func'] = cb
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
    delete @events[evtp]
    return @
  pen::is = (tag) -> @tag is tag
  pen::append = (elements...) ->
    elements.forEach (element) =>
      if vrs.type(element) is 'string'
        element = vrs.$ element
      else if element instanceof pen
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
  pen::getSize = () -> {width: @el.getBoundingClientRect().width, height: @el.getBoundingClientRect().height}
  atribs = "id class href src contentEditable charset title rows cols style".split /\s+/g
  evps = "click keyup keypress keydown mouse mouseup error load mouseover mousedown mouseout contextmenu dblclick drag dragover drop dropend".split /\s+/g
  atribs.forEach (atrib) ->
    pen::[atrib] = () ->
      `str != null ? this.attr(atrib, ...arguments) : this.attr(atrib)`
  evps.forEach (evp) ->
    pen::[evp] = () ->
      `this.events[evp] == null ? this.on(evp, ...arguments) : this.off(evp, ...arguments)`
  for prop of vrs
    pen[prop] = vrs[prop]
  return pen
