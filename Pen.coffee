pen = do ->
  {log, error, dir} = console
  define = () =>
    `window['body'] = document.body; window['pBody'] = pen(body); window['head'] = document.head; window['pHead'] = pen(head)`
    return
  ```document.addEventListener("DOMContentLoaded", define, {once:true});
  vrs = {}; vrs.class2Type = {}; vrs.elCount = 0; vrs.names = 'Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split(/\s+/gi);
  vrs.names.forEach(name => {var nm;nm = "[object "+name+"]";vrs.class2Type[nm] = name.toLowerCase()});
  vrs.proto = pro => pro.prototype;vrs.arr = vrs.proto(Array);vrs.obj = vrs.proto(Object);vrs.slice = (vr) => vrs.arr.slice.call(vr);vrs._toString = (vr) => vrs.obj.toString.call(vr);
  vrs.type = (obj) => (vrs.class2Type[vrs._toString(obj)] || 'object');
  vrs.regs = {}; vrs.regs.attribute = /([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi;
  vrs.ranDos = (arr) => arr[Math.floor(Math.random() * arr.length)]; vrs.str = (regs, flags) => vrs.type(regs) === 'string' ? new RegExp(regs, flags): regs;
  vrs.iterate = (arr, times) => {var res,i;res = [];for(i = 0;i < times;++i){res.push(vrs.ranDos(arr))};return res.join('');};
  vrs.parser = (regs, flags) => {regs = vrs.str(regs, (flags || 'gi'));return str => {var obj;obj = {};str = str || '';results = str.match(regs);if((results != null) && results.length !== 0){results.map(match => {if (match.includes("=")){return match.split("=")}}).forEach(match => {var name,reg,val;[name, val] = match;reg = /^['"]([^\n]*?)['"]$/m;val = val.replace(reg, '$1');obj[name]=val;});return obj}}};
  vrs.sAS = (str, ...els) => els.map(el => str.search(el));
  vrs.pErr = (name, msg) => {var er;er = new Error(msg);er.name = name;throw er};```
  vrs.funcoso = (it, typeso, typesi) =>
    typesi = typesi or typeso
    `var chk;
    chk = (whl, propz, prop) => vrs.type(it.el[typesi]) === 'function'  ? it.el[typesi](whl, propz[prop]) : it.el[typesi] = propz[prop]`
    func = (propz, nm) =>
      for prop, prp of propz
        if vrs.type(prp) is 'object'
          funcso prp, prop
        else
          res = if nm? then "#{nm}-#{prop}" else prop
          chk res, propz, prop
      return it
    return func
  pen = () ->
    args = arguments; return new pen args... if !(@ instanceof pen)
    return args[0] if args[0] instanceof pen
    @cel = null
    @attrs = null
    @start args...
    return
  pen.ink = pen:: = {}
  ```pen.selected = {}; pen.created = {}
  pen.$ = (el, ps = false) => {var elshi; elshi = "element"+vrs.elCount++;if (vrs.type(el) === 'string'){selec = document.querySelector(el); pen.selected[elshi] = selec; return ps===true?pen(selec):selec}else{return el}};
  pen.$$ = (el, ps = false) => {var els, elshi; elshi = "element"+vrs.elCount++;els = vrs.slice(document.querySelectorAll(el)).map(el => {pen.selected[elshi] = el; return ps===true?pen(el):el});return els};
  pen.create = (el, ps = false) => {var el, elshi; elshi = "element"+vrs.elCount++;el = document.createElement(el);pen.created[elshi] = el; return ps===true?pen(el):el}```
  pen.parse =
    attrs: vrs.parser vrs.regs.attribute
    element: (str) -> [s, e] = vrs.sAS str, '<', '>'; stTag = str.slice(s, e+1); [s, e] = vrs.sAS stTag, ' ', '>'; attribs = stTag.slice(s+1, e); [s, e] = vrs.sAS stTag, '<', ' '; tag = stTag.slice(s+1, e); [s, e] = vrs.sAS str, '>', '</'; text = str.slice(s+1, e); return [str, stTag, (if attribs is "<#{tag}" then null else attribs), tag, (if text is '' then null else text)]

  pen::start = (ele, ops) ->
    if vrs.type(ops) is 'string'
      el = pen.$ ops, yes; ele = if /\.|#|\[\]/gi.test(ele) is yes then el.$ ele else el.create ele
    else @initOptions ops
    @el = ele
    t = vrs.type @el
    if t is 'object'
      @partialSetup()
    else if t is 'string'
      @setup @el
    @ops.autoAttachTo.append @el if @ops.autoAttach is yes
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
    return @
  `pen.ink.toString = function () {return this.outerHTML}`
  pen::setup = (el) ->
    t = vrs.type el
    if t is 'string'
      if el.startsWith('<')
        [whole, startTag, attributes, tag, text] = pen.parse.element el
        attribs = pen.parse.attrs attributes
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
        set: (el...) -> @append el...
      Parent:
        get: () -> @el.parentNode or null
        set: (el) -> pen(el).append @
        configurable: true
      Classes:
        get: () -> vrs.slice @el.classList
      attrs:
        get: () ->
          ar = {}
          vrs.slice @el.attributes
          .forEach (res) =>
            ar[res.name] = res.value
          return ar
        set: (obj) -> @attr obj
        configurable: true
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
      when 'input', 'textarea' then livi 'value', str
      when 'option'
        livi 'value', str
        return livi res, str
      else return livi res, str
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
    `this.el.events[evtp] = {}; this.el.events[evtp].capture = cp; this.el.events[evtp][cb.name || 'func'] = cb`
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
