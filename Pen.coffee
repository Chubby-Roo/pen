pen = do ->
  ldr = (ev) =>
    window['body'] = document.body; window['pBody'] = pen body; window['head'] = document.head; window['pHead'] = pen head
    window['pDoc'] = pen document
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
    `for (var i = 0; i < times; ++i) {res.push(vrs.ranDos(arr));}`
    return "i#{res.join ''}"
  `vrs.str = (regs, flags) => vrs.type(regs) === 'string' ? new RegExp(regs, flags) : regs`
  vrs.regs =
    attribute: /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi
    css: /([^\n;: ]+):([^\n]+);/gi
    tag: /<([^\n]*?)>/gi
    eleme: /<([^\n]*?)>([\S\s]*?)<\/([^\n]*?)>/gi
    innerText: />([\S\s]*?)</gi
  vrs.class2Type = {}
  names = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split /\s+/gi
  `names.forEach(name => {vrs.class2Type[\`[object ${name}]\`] = name.toLowerCase()})`
  `vrs.type = (obj) => (vrs.class2Type[vrs.toString(obj)] || 'object')`
  vrs.parser = (regs, flags) ->
    regs = vrs.str regs, (flags or 'gi')
    retsi = {}
    (str) =>
      str = str or ''
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
  {log, error, dir} = console
  `vrs.detectAndReturn = (ting, ev) => ev.hasAttribute(ting) === true ? ev.getAttribute(ting) : null`
  vrs.funcoso = (it, typeso, typesi) ->
    typesi ?= typeso
    `chk1 = (whl, propz, prop) => vrs.type(it.el[typesi]) === 'function' ? it.el[typesi](whl, propz[prop]) : it.el[typesi][whl] = propz[prop]`
    funcso = (propz, nm) ->
      for prop, prp of propz
        if vrs.type(prp) is 'object'
          funcso prp, prop
        else
          if nm?
            chk1 "#{nm}-#{prop}", propz, prop
          else
            chk1 prop, propz, prop
      return it
    return funcso
  `vrs.searchAndSlice = (str, ...els) => els.map(el => str.search(el))`
  `vrs.penError = (name, msg) => {er = new Error(msg); er.name = name; throw er;}`
  pen = () ->
    args = arguments
    return new pen args... if !(@ instanceof pen)
    return args[0] if args[0] instanceof pen
    @hidden = false
    @cel = null
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
  pen.parse =
    attributes: vrs.parser vrs.regs.attribute
    element: (str) ->
      [s, e] = vrs.searchAndSlice str, '<', '>'; stTag = str.slice(s, e+1)
      [s, e] = vrs.searchAndSlice stTag, ' ', '>'; attribs = stTag.slice(s+1, e)
      [s, e] = vrs.searchAndSlice stTag, '<', ' '; tag = stTag.slice(s+1, e)
      [s, e] = vrs.searchAndSlice str, '>', '</'; text = str.slice(s+1, e)
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
    if t1 is 'object'
      @partialSetup()
    else if t1 is 'string'
      @setup @el
    if @ops.autoAttach is yes
      @ops.autoAttachTo.append @el
    return @
  pen::initOptions = (ops) ->
    @ops =
      autoAttach: (if ops? then (ops.autoAttach or no) else no)
      autoAttachTo: (if ops? then (ops.autoAttachTo or window['body']) else window['body'])
      global:
        parseIt: (if ops? and ops.global? then (ops.global.parseIt or no) else no)
        create: (if ops? and ops.global? then (ops.global.create or 'return child') else 'return child')
        html:
          app: (if ops? and ops.global? and ops.global.html? then (ops.global.html.app or no) else no)
          parse: (if ops? and ops.global? and ops.global.html? then (ops.global.html.parse or no) else no)
    return @ops
  `pen.prototype.toString = function () {return this.el.outerHTML;}`
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
    @partialSetup()
    return
  pen::partialSetup = () ->
    Object.defineProperties this,
      tag:
        get: () -> (@el.tagName or 'IOS-ELEMENT').toLowerCase()
      cel:
        get: () -> if @tag is 'template' then @el.content else @el
      text:
        get: () -> @html()
        set: (str) -> @html str
        configurable: true
      Children:
        get: () -> @cel.children
      Parent:
        get: () -> @el.parentNode or null
      Classes:
        get: () -> vrs.slice @el.classList
      attrs:
        get: () ->
          ar = {}
          vrs.slice @el.attributes
          .forEach (res) =>
            ar[res.name] = res.value
          return ar
      selector:
        get: () ->
          res1 = if @attrs.id? then "##{@attrs.id}" else ''
          res2 = if @attrs.class? then ".#{@Classes.join '.'}" else ''
          "#{@tag}#{res1}#{res2}"
      size:
        get: () ->
          @el.getBoundingClientRect()
    @el.events = {}
    if @el instanceof Document
      @body = window['pBody']
      @head = window['pHead']
      pen::ready = () ->
        args = arguments
        @on 'DOMContentLoaded', args...
        return @
    else if @el instanceof Window
      @doc = @el.document
    switch @tag
      when 'template'
        pen::clone = () ->
          args = arguments
          document.importNode args...
      when 'canvas'
        @ctx = @context = @el.getContext '2d'
    return @
  pen::html = (str, ops) ->
    parse = if ops? then (ops.parse or false) else @ops.global.html.parse
    app = if ops? then (ops.app or false) else @ops.global.html.app
    res = if parse then 'innerHTML' else 'innerText'
    reg = /input|option|textarea/i
    livi = (prop, str) =>
      if str?
        if reg.test(@tag) is true
          @attr 'value', (if app is true then "#{@el.getAttribute('value')}#{str}" else str)
        else
          `app === true ? this.el[prop] += str : this.el[prop] = str`
        return @
      else
        return @el[prop]
    switch @tag
      when 'option'
        livi 'value', str, @, ops
        return livi res, str
      else
        return livi res, str
  pen::attr = (attribute, value) ->
    func = vrs.funcoso this, 'attributes', 'setAttribute'
    if attribute?
      if vrs.type(attribute) is 'object'
        return func(attribute)
      else if value?
        @el.setAttribute attribute, value
        return @
      else
        return @el.getAttribute attribute
    else
      return @attrs
  pen::css = (rule, rules) ->
    func = vrs.funcoso this, 'style'
    if rule?
      switch vrs.type(rule)
        when 'object' then return func(rule)
        when 'string'
          rule = rule.replace /-(\w{1})/g, (whole, dash) => dash.toUpperCase()
          @el.style[rule] = rules
          return @
        else
          return @el.style[rule]
    else
      return @el.style
  pen::on = (evtp, cb, cp) ->
    cp = cp or false
    @el.events = @el.events or {}
    @el.events[evtp] = {}
    @el.events[evtp].capture = cp
    @el.events[evtp][cb.name or 'func'] = cb
    @el.addEventListener arguments...
    return @
  pen::off = (evtp, cb) ->
    @el.removeEventListener evtp, cb
    delete @el.events[evtp]
    return @
  pen::append = (elements...) ->
    elements.forEach (element) =>
      element = pen.$ element
      elu = (if element instanceof pen then element.el else element)
      @cel.appendChild(elu)
    return @
  pen::appendTo = (element) ->
    pen(element).append(@)
    return @
  pen::remove = ->
    @el.remove()
    return @
  pen::$ = (element, parseIt = false) ->
    qur = @cel.querySelector(element)
    result = if @ops.global.parseIt is true then pen(qur) else if parseIt is true then pen(qur) else qur
    return result
  pen::$$ = (element) -> @cel.querySelectorAll(element)
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
  pen.vrs = vrs
  return pen
