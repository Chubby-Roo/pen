pen = do ->
  Object::forEach = (cb) ->
    it = @
    for key of it
      cb(key, it[key], it)
    return
  Object::filter = (cb) ->
    it = @
    obj = {}
    for key of it
      res = cb(key, it[key], it)
      if res is true
        obj[key] = it[key]
    return obj
  Object::map = (cb) ->
    it = @
    obj = {}
    for key of it
      res = cb(key, it[key], it)
      obj[key] = res
    return obj
  vrs = {}
  elCount = 0
  vrs.class2Type = {}
  vrs.proto = () ->
    arguments[0].prototype
  for name in 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split /\s+/gi
    vrs.class2Type["[object #{name}]"] = name.toLowerCase()
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
  vrs.regs =
    attribute: /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi, css: /([^\n;: ]+):([^\n]+);/gi
    define: /define\s*([^\n\ ]+)\s*as\s*([^\n\ ,]+)(\s*(?:global|local)ly)?/i, tag: /<([^\n]*?)>/gi
    eleme: /<([^\n]*?)>([\S\s]*?)<\/([^\n]*?)>/gi, innerText: />([\S\s]*?)</gi
  vrs.type = (obj) =>
    strType = vrs.toString obj
    vrs.class2Type[strType] or 'object'
  vrs.str = (reg, flags) =>
    flags = flags or 'gi'
    ty = vrs.type reg
    return `ty === 'string' ? new RegExp(reg, flags) : reg`
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
    vrs.log str
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
  vrs.def = (it, el) =>
    it.tag = null; it.text = null
    it.Children = []
    it.Parent = null; it.localName = null
    it.Classes = []
    it.events = {}
    it.hidden = false
    it.attributes = {}; it.style = {}
    it.el = el
    it
  vrs.resolve = (res) ->
    switch type res
      when 'string'
        pen res
      when 'array'
        pen res...
  pen = () ->
    return new pen arguments... if !(@ instanceof pen)
    vrs.def @, arguments[0]
    return
  pen.ink = pen:: = {}
  `pen.genId = () => vrs.iterate('0 1 2 3 4 5 6 7 8 9'.split(/\s+/g), 5)`
  pen.seleted = {}
  pen.$ = () ->
    pen.selected = pen.selected or {}
    if vrs.type(arguments[0]) is 'array'
      els = arguments[0]; ps = arguments[1] or no
      els = els.map (el) =>
        el = if ps then pen document.querySelector el else document.querySelector el
        pen.selected["element#{++elCount}"] = if el instanceof pen then el.el else el
        return if el instanceof pen then el.el else el
      return els
    else if vrs.type(arguments[0]) is 'object'

    else
      el = arguments[0];ps = arguments[1] or no
      el = if ps then pen document.querySelector el else document.querySelector el
      pen.selected["element#{++elCount}"] = if el instanceof pen then el.el else el
      return el
  pen.$$ = () ->
    el = arguments[0];
  pen.vrs = vrs
  return pen
