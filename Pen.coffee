pen = do ->
  vrs = {}
  elCount = 0
  win = window
  doc = document
  vrs.proto = () ->
    arguments[0].prototype
  vrs.arr = vrs.proto(Array)
  vrs.obj = vrs.proto(Object)
  `vrs.slice = (vr) => vrs.arr.slice.call(vr)`
  `vrs.toString = (vr) => vrs.obj.toString.call(vr)`
  `vrs.ranDos = (arr) => arr[Math.floor(Math.random() * arr.length)]`
  vrs.iterate = (arr, times) =>
    res = []
    `for (var i = 0, len = times; i < times; ++i) {
      res.push(vrs.ranDos(arr));
    }`
    return "i#{res.join ''}"
  vrs.str = (regs, flags) =>
    if vrs.type(regs) is 'string'
      return new RegExp regs, flags
    else
      return regs
  vrs.regs =
    attribute: /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi
    css: /([^\n;: ]+):([^\n]+);/gi
    define: /define\s*([^\n\ ]+)\s*as\s*([^\n\ ,]+)(\s*(?:global|local)ly)?/i
    tag: /<([^\n]*?)>/gi
    eleme: /<([^\n]*?)>([\S\s]*?)<\/([^\n]*?)>/gi
    innerText: />([\S\s]*?)</gi
  vrs.type = do ->
    class2Type = {}
    names = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split /\s+/gi
    names.forEach((name) => class2Type["[object #{name}]"] = name.toLowerCase())
    (obj) ->
      strType = Object::toString.call obj
      class2Type[strType] or 'object'
  vrs.parser = (regs, flags, num1, num2) ->
    flags = flags or 'gi'
    num1 = num1 or 1
    num2 = num2 or 2
    resg = regs
    regs = vrs.str regs, flags
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
  vrs.log = console.log
  vrs.error = console.error
  vrs.dir = console.dir
  ldr = (ev) =>
    window['body'] = document.body; window['pBody'] = pen body; window['head'] = document.head; window['pHead'] = pen head
    return
  document.addEventListener "DOMContentLoaded", ldr, {once:true}
  vrs.detectAndReturn = (ting, ev) => if ev.hasAttribute(ting) is true then ev.getAttribute ting else null
  vrs.defo = (prop, str, it, ops) =>
    if ops?
      app = ops.app or false
      parse = ops.parse or false
    else
      app = it.ops.global.html.app or false
      parse = it.ops.global.html.parse or false
    it.text = str
    if str?
      if app is true
        if /input|option|textarea/i.test(it.tag) is true
          it.attr 'value', "#{it.el.getAttribute('value')}#{str}"
        else
          it.el[prop] += str
      else
        if /input|option|textarea/i.test(it.tag) is true
          it.attr 'value', str
        else
          it.el[prop] = str
      return it
    else
      return it.el[prop]
  vrs.funcoso = (it, typeso, typesi) ->
    typesi ?= typeso
    chk1 = (whl, propz, prop) ->
      if vrs.type(it.el[typesi]) is 'function'
        it.el[typesi] whl, propz[prop]
      else
        it.el[typesi][whl] = propz[prop]
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
  vrs.penError = (name, msg) =>
    er = new Error msg
    er.name = name
    throw er
  vrs.resolve = (res) ->
    switch type res
      when 'string'
        pen res
      when 'array'
        pen res...
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
  pen.$ = (el, ps = false) ->
    if ps is yes
      pen doc.querySelector(el)
    else doc.querySelector el
  pen.$$ = (el, ps) =>
    els = document.querySelectorAll el
    els = vrs.slice els
    if ps is yes
      re = `els.map((el) => pen(el))`
      return re
    else
      return els
  pen.create = pen.createElement = (el, parseIt = false) => if parseIt is yes then pen(doc.createElement el) else doc.createElement el
  pen.addedFunctions = {}
  pen.parse =
    attributes: vrs.parser vrs.regs.attribute, 1, 3
    css: vrs.parser vrs.regs.css, 1, 2
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
  pen.findInObj = (obj, key, defin) ->
    if vrs.type(key) is 'string'
      key = new RegExp key, 'i'
    for kname of obj
      if /autoAttachTo|el/i.test(kname) is false
        if key.test(kname) is true
          return obj[kname]
        else if vrs.type(obj[kname]) is 'object'
          return pen.findInObj obj[kname], key, defin
    return defin
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
      if @el.startsWith('define') is true
        @define @el
      else
        @setup @el

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
  pen::toString = () => @el.outerHTML
  pen::define = (toDef) ->
    if vrs.regs.define.test(toDef) is true
      [func, oname, t] = vrs.regs.define.exec(toDef)[1..3]
      if t?
        t = t.trim()
        if t is 'locally' then vrs[func] else window[oname] = vrs[func]
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
    @size =
      width: szlp.width, height: szlp.height
    @inits()
    switch @tag
      when 'template'
        @content = @el.content
        pen::clone = () ->
          args = vrs.slice arguments
          document.importNode [args...]
      when 'canvas'
        @ctx = @context = @el.getContext '2d'
    return @
  pen::initTag = () ->
    tag = @tag = if @el.tagName? then @el.tagName.toLowerCase() else 'ios-element'
    return tag
  pen::initText = () ->
    text = @text = @html
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
  pen::initClasses = () ->
    res = vrs.slice(@el.classList)
    @Classes = res
    return res
  pen::initAttributes = () ->
    results = vrs.slice @el.attributes
    ret = results.map (result) =>
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
    if ops?
      app = if ops.app? then ops.app else false
      parse = if ops.parse? then ops.parse else false
    else
      app = if @ops.global.html.app? then @ops.global.html.app else false
      parse = if @ops.global.html.parse? then @ops.global.html.parse else false
    @initTag()
    switch @tag
      when 'input', 'textarea'
        return vrs.defo 'value', str, this, ops
      when 'option'
        vrs.def 'value', str, this, ops
        return vrs.defo 'innerText', str, this, ops
      else
        return vrs.defo((if parse is true then 'innerHTML' else 'innerText'), str, this, ops)
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
    cp ?= false
    if not @events?
      @events = {}
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
  pen::is = (tag) => @tag is tag
  pen::append = (elements...) ->
    elements.forEach (element) =>
      if vrs.type(element) is 'string'
        element = pen.$ element
      else if element instanceof pen
        element.Parent = @el
      elu = (if element instanceof pen then element.el else element)
      if @tag is 'template'
        @el.content.appendChild elu
      else
        @el.appendChild elu
    return @
  pen::appendTo = (element) ->
    if vrs.type(element) is 'string'
      element = pen.$ element
    pen(element).append(@el)
    return @
  pen::remove = ->
    check = if @Parent? then 'Parent' else if @el.parentNode? then 'parentNode' else null
    if check?
      @[check].removeChild(@el)
      @Parent = null
    else
      log "Pen-remove-error: There's no parent to remove child: #{@localName} from"
    return @
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
        return @
      else
        return element
    else
      return
  pen::toggle = (classes...) ->
    for classs in classes
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
  atribs = ['id', 'class', 'href', 'src', 'contentEditable', 'charset', 'title', 'rows', 'cols', 'style']
  evps = ['click', 'keyup' ,'keypress','keydown' ,'mouse', 'mouseup', 'error', 'load', 'mouseover', 'mousedown' ,'mouseout', 'contextmenu', 'dblclick' ,'drag', 'dragover', 'drop', 'dropend']
  atribs.forEach (atrib) ->
    pen::[atrib] = () ->
      if str? then @attr atrib, arguments... else @attr atrib
      return
  evps.forEach (evp) ->
    pen::[evp] = () ->
      if not @events[evp]? then @on(evp, arguments...) else @off(evp, arguments...)
      return
  pen.vrs = vrs
  return pen
