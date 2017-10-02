{log, error, dir} = console

define=()=>
  window['body']=document.body;window['pBody']=pen(body);window['head']=document.head;window['pHead']=pen(head)
document.addEventListener "DOMContentLoaded",define,once:true

vrs={}
vrs.class2Type={}
vrs.names='Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split(/\s+/gi)

for name in vrs.names
  vrs.class2Type["[object #{name}]"]=name.toLowerCase()

vrs.proto=(pro)=>pro.prototype
vrs.arr=vrs.proto(Array)
vrs.obj=vrs.proto(Object)
vrs.slice=(vr)=>vrs.arr.slice.call(vr)
vrs._toString=(vr)=>vrs.obj.toString.call(vr)
vrs.type=(obj)=>(vrs.class2Type[vrs._toString(obj)]||'object')
vrs.regs={}
vrs.regs.attr=/([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi;
vrs.ranDos=(arr)=>arr[Math.floor(Math.random()*arr.length)]
vrs.str=(regs,flags)=> if vrs.type(regs) is 'string' then new RegExp(regs,flags) else regs;
vrs.iterate=(arr,times)=>
  res=[]
  i=0
  while i < times
    res.push(vrs.ranDos(arr))
    ++i
  return res.join ''

vrs.attribute = class attribute
  constructor: (@name, @value) ->
    return @

  change: (typ, data) ->
    @[typ] = data
    return @

  toString: -> "#{@name}=\"#{@value}\""
  @fromString: (str) ->
    [name, value] = str.split '='
    value = value.replace /'+|"+/g, ''
    new vrs.attribute(name, value)

vrs.parser = (regs,flags)=>
  regs=vrs.str(regs,(flags||'gi'))
  (str)=>
    obj={}
    str=str or ''
    results=str.match(regs)
    reg=/^['"]([^\n]*?)['"]$/m
    return if !results?
    return if results.length is 0
    if results.length is 1
      match = results.pop()
      if match.includes("=") is true
        attr = vrs.attribute.fromString(match)
        obj[attr.name] = attr.value
    else
      for match in results
        if match.includes("=") is true
          attr = vrs.attribute.fromString(match)
          obj[attr.name] = attr.value
    return obj

vrs.sAS=(str,els...)=>
  arr=[]
  for el in els
    arr.push(str.search(el))
  return arr

vrs.pErr=(name,msg)=>
  er=new Error(msg);er.name=name;throw er

vrs.funcoso = (it, typeso, typesi) =>
  typesi = typesi or typeso
  pz = vrs.type(it.el[typesi])
  func = (props, nm) =>
    for prop of props
      res = if nm? then "#{nm}-#{prop}" else prop
      if vrs.type(props[prop]) is 'object' then func props[prop], res
      else
        if pz is 'function' then it.el[typesi](res, props[prop])
        else it.el[typesi][res] = props[prop]
    it
  func

pen = ->
  args = arguments; return new pen args... if !(@ instanceof pen)
  return args[0] if args[0] instanceof pen
  `this.cel=null;this.attrs=null;this.el=args[0]`
  @start args...
  return

pen.ink = pen:: = {}
pen.selected = {}
pen.created = {}

pen.handoff = (ps, el) => `ps === true ? pen(el) : el`

pen.$ = (el, ps = false) =>
  elshi = "element#{vrs.elCount++}"
  if vrs.type(el) is 'string'
    selec = document.querySelector(el)
    pen.selected[elshi] = selec
    pen.handoff ps, selec
  else el

pen.$$ = (el,ps = false) =>
  elshi = "element#{vrs.elCount++}"
  els = vrs.slice(document.querySelectorAll(el))
  return if els.length is 0
  if els.length is 1
    el = els.pop()
    pen.selected[elshi] = el
    pen.handoff ps, el
  else
    for el in els
      pen.selected[elshi] = el
      pen.handoff ps, el

pen.create = (el, ps = false) =>
  elshi = "element#{vrs.elCount++}"
  el = document.createElement(el)
  pen.created[elshi] = el
  pen.handoff ps, el

pen.parse =
  attrs: vrs.parser vrs.regs.attr
  element: (str) ->
    [s, e] = vrs.sAS str, '<', '>'; stTag = str.slice(s, e+1)
    [s, e] = vrs.sAS stTag, ' ', '>'; attribs = stTag.slice(s+1, e)
    [s, e] = vrs.sAS stTag, '<', ' '; tag = stTag.slice(s+1, e)
    [s, e] = vrs.sAS str, '>', '</'; text = str.slice(s+1, e)
    arr = [str, stTag, (if attribs is "<#{tag}" then null else attribs), tag, (if text is '' then null else text)]
    return arr

pen.genId = (times) =>
  arr = "0 1 2 3 4 5 6 7 8 9".split(/\s+/)
  "i#{vrs.iterate(arr, times)}"

pen::start = (ele, ops) ->
  @initOptions ops
  t = vrs.type @el

  if t is 'object'
    @partialSetup()
  else if t is 'string'
    if @el.startsWith('<')
      [whole,startTag,attributes,tag,text]=pen.parse.element(@el)
      attribs=pen.parse.attrs(attributes)
      @el = pen.create(tag)
    else @el = pen.$ @el

    @attr attribs if attribs?
    @html text, parse: yes if text? and text.length isnt 0
    @partialSetup()
  return @
pen::initOptions = (ops) ->
  @ops =
    parseIt: (if ops? then (ops.parseIt or no) else no)
    create: (if ops? then (ops.create or 'return child') else 'return child')
    app: (if ops? and ops.app? then (ops.app or no) else no)
    parse: (if ops? and ops.parse? then (ops.parse or no) else no)
  return @ops

pen::toString = -> return this.cel.outerHTML

pen::partialSetup = ->
  Object.defineProperties @,
    tag:
      get: ->(@el.tagName or 'UNPARSED-OR-IOS-ELEMENT').toLowerCase()

    cel:
      get: ->(if @tag is'template' then @el.content else @el)

    text:
      get: ->@html()
      set: (str) ->@html str
      configurable:true

    Children:
      get: ->
        arr = []
        children = vrs.slice(this.cel.children)
        return if children.length is 0
        if children.length is 1
          child = children.pop()
          arr.push pen child
        else
          for child in children
            arr.push pen child
        return arr
      set: (...els) ->@append els...
      configurable:true

    Parent:
      get: ->(@el.parentNode||null)
      set: (el) ->@appendTo el
      configurable:true

    Classes:
      get: -> vrs.slice @el.classList
      set: (cls) -> @toggle(cls)
      configurable:true

    attrs:
      get: ->
        ar = {}
        attrs = vrs.slice @el.attributes
        return if attrs.length is 0
        if attrs.length is 1
          attr = attrs.pop()
          ar[attr.name] = attr.value
        else
          for attr in attrs
            ar[attr.name]=attr.value
        return ar
      set: (obj) -> @attr(obj)
      configurable:true

    selector:
      get: -> "#{@tag}#{if @attrs.id? then "##{@attrs.id}" else ''}#{if @attrs.class? then ".#{@Classes.join('.')}" else ''}"

    size:
      get: -> @el.getBoundingClientRect()

    hidden:
      get: -> (@css('display') is 'none')

  @el.events = {}

  switch true
    when @el instanceof Document
      pen::ready = ->
        args = arguments
        @on 'DOMContentLoaded', args...
        return @

    when @el instanceof Window
      @doc = @el.document

    when @tag is 'template'
      pen::clone = ->
        args = arguments
        document.importNode args...

    when @tag is 'canvas'
      @ctx = @context = @el.getContext '2d'

  return @

pen::html = (str, ops) ->
  {parse, app} = @initOptions ops
  res = if parse is true then 'innerHTML' else 'innerText'
  reg = /input|option/i
  livi = (prop, str) =>
    if str?
      if reg.test(@tag)
        @attr 'value', (if app is true then "#{@el.getAttribute('value')}#{str}" else str)
      else if /textarea/.test(@tag)
        @el.innerText = if app is true then (@el.value + str) else str
      else
        @el[prop] = if app is true then (@el[prop] + str) else str
      return @
    else
      if reg.test(@tag) or /textarea/.test(@tag)
        @el.value
      else
        @el[prop]

  switch @tag
    when 'input' then livi 'value', str
    when 'option' then livi res, str
    else livi res, str

pen::attr = (attribute, value) ->
  func = vrs.funcoso @, 'attributes', 'setAttribute'
  if attribute?
    if vrs.type(attribute) is 'object' then func(attribute)
    else if value? then @el.setAttribute attribute, value; this
    else @el.getAttribute attribute
  else @attrs

pen::css = (rule, rules) ->
  func = vrs.funcoso @, 'style'
  if rule?
    switch vrs.type(rule)
      when 'object' then func(rule)
      when 'string'
        if rules?
          rule = rule.replace /-(\w{1})/g, (whole, dash) => dash.toUpperCase()
          @el.style[rule] = rules
          @
        else
          @el.style[rule]
  else
    @el.style

pen::on = (evtp, cb, cp = false, name) ->
  @el.events = @el.events or {}
  ev = @el.events[evtp] = {}
  ev.capture = cp
  ev[if name then name else (cb.name or 'func')] = cb
  @el.addEventListener evtp, cb, cp
  @

pen::off = (evtp, cb, name) ->
  if name
    @el.removeEventListener evtp, @el.events[evtp][name]
  else
    @el.removeEventListener evtp, cb
  delete @el.events[evtp][if name then name else (cb.name or 'func')]
  @

pen::append = (elements...) ->
  return if elements.length is 0
  if elements.length is 1
    element = pen.$ elements.pop()
    elu = if element instanceof pen then element.el else element
    @cel.append elu
  else
    for element in elements
      element = pen.$ element
      elu = (if element instanceof pen then element.el else element)
      @cel.appendChild(elu)
  return @

pen::appendTo = (element) -> `pen(element).append(this); return this`
pen::remove = -> `this.Parent == null ? this : this.Parent.removeChild(this.el)`

pen::$ = (element, parseIt = false) ->
  qur = @cel.querySelector(element)
  `this.ops.global.parseIt === true ? pen(qur) : parseIt === true ? pen(qur) : qur`
pen::$$ = (element) -> @cel.querySelectorAll(element)

pen::create = (element, ret) ->
  element = pen(element)
  @append(element)
  if /child|parent/gi.test(ret) then result = "return #{ret}"; return `result.endsWith("parent")===true?this:element` else return @

pen::toggle = (classes...) ->
  for classs in classes
    @el.classList.toggle classs
  return @

pen::hasClass = (cls) ->
  return false if @Classes.length is 0
  if @Classes.length is 1
    clss = @Clases.pop()
    `clss === cls`
  else
    for clss in @Classes
      if clss is cls
        return true
  return false

pen::hide = ->
  `this.hidden === true ? this.css('display','') : this.css('display','none')`
  return @

pen.vrs = vrs

window.pDoc = pen(document); window.pWin = pen(window)

window.pen = pen
