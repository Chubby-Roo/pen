(() ->
  class2Type = => {}
  arr = => []
  support = => {}
  gproto = => Object.getPrototypeOf
  hasOwn = => class2Type.hasOwnProperty
  fn2String = => hasOwn.toString
  ObjFuncString = => fn2String.call Object
  pnum = => (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source
  indexOf = => arr.indexOf
  concat = => arr.concat
  push = => arr.push
  slice = => arr.slice
  rcssNum = => new RegExp "^(?:([+-])=|)(#{pnum})([a-z%]*)$", "i"
  rnothtmlwhite = => (/[^\x20\t\r\n\f]+/g)
  toString = => class2Type.toString
  document = => window.document
  documentElement = => document.documentElement
  rSingleTag = => (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i)
  DOMEval = (code, doc) =>
    doc = doc or document
    script = doc.createElement "script"
    script.text = code
    doc.head.appendChild script
    .parentNode.removeChild script
  version = "@VERSION"
  pen = (el, cont) => new pen.fn.init el, cont
  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
  rmsPrefix = /^-ms-/
  rdashAlpha = /-([a-z])/g
  fcamelCase = ( all, letter ) => letter.toUpperCase()
  pen.fn = pen.prototype =
    penv: version
    constructor: pen
    length: 0
    toArray: () ->
      slice.call this
    get: (num) ->
      if num is null
        slice.call this
      return if num < 0 then this[num + @length] else this[num]
    each: (cb) ->
      pen.each this, cb
    map: (callback) -> @pushStack pen.map this, ( elem, i ) -> callback.call elem, i, elem
    slice: () -> @pushStack slice.apply this, arguments
    first: () -> @eq 0
    last: () -> @eq -1
    eq: (i) ->
      len = @length
      j = +i + (if i<0 then len else 0)
      @pushStack if j >= 0 and j < len then [this[j]] else []
    end: () -> @prevObject or @constructor
    push: push
    sort: arr.sort
    splice: arr.splice
  pen.extend = pen.fn.extend = () ->
    `var options, name, src, copy, copyIsArray, clone`
    target = arguments[0] or {}
    i = 1
    length = arguments.length
    deep = no
    if typeof target is 'boolean'
      deep = target
      target = arguments[i] or {}
      i++

    if typeof target is 'object' and not pen.isFunction target
      target = {}

    `for (;i<length;i++) {if ((options = arguments[i]) !== null) {for (name in options) {src = target[name];copy = options[name]; if (target === copy) {continue;}if (deep && copy && (pen.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {if (copyIsArray) {copyIsArray = false;clone = src && Array.isArray(src) ? src : [];} else {clone = src && pen.isPlainObject(src) ? src : {};}target[name] = pen.extend(deep, clone, copy);} else if (copy !== void 0) {target[name] = copy;}}}}`
  pen.extend
    expando: "pen #{(version+Math.random()).replace /\D/g, ''}"
    isReady: true
    error: (msg) -> throw new Error msg
    noop: () ->
    isFuntion: (obj) -> typeof obj is 'function' and typeof obj.nodeType isnt 'number'
    isWindow: (obj) -> obj isnt null and obj is obj.window
    isNumeric: (obj) ->
      type = pen.type(obj)
      return (type is 'number' or type is 'string') and not isNaN(obj - parseFloat(obj))
    isPlainObject: (obj) ->

      if not obj or toString.call(obj) isnt '[object Object]' then false
      proto = getProto obj

      if not proto then true

      Ctor = hasOwn.call(proto, 'constructor') and proto.constructor
      typeof Ctor is 'function' and fn2String.call(Ctor) is ObjFuncString
    isEmptyObject: (obj) ->
      for name of obj
        return false
      return true
    type: (obj) -> if obj is null then return "#{obj}"
    globalEval: (code) -> DOMEval code
    camelCase: (string) -> string.replace(rmsPrefix, "ms-").replace rdashAlpha, fcamelCase
    each: (obj, callback) ->
      i = 0
      if isArrayLike obj
        length = obj.length
        `for (;i<length;i++) {if (callback.call(obj[i], i, obj[i]) === false) {break;}}`
      else
        for i of obj
          if callback.call(obj[i], i, obj[i]) is false
            break
      return obj
    trim: (txt) -> if text is null then '' else (text+"").replace rtrim, ''
    makeArray: (arr, res) ->
      ret = res or []
      if arr isnt null
        if isArrayLike Object arr
          pen.marge(ret, if typeof arr is 'string' then [arr] else arr)
        else
          push.call ret, arr
      return ret
    isArray: (elem, arr, i) -> if arr is null then -1 else indexOf.call arr, elem, i
    marge: (first, second) ->
      len = +second.length
      j = 0
      i = first.length
      `for (;j<len;j++) {first[i++] = second[j];}`
      first.length = i
      return first
    grep: (elems, callback, invert) ->
      callbackInverse = undefined
      matches = []
      i = 0
      length = elems.length
      callbackExpect = not invert
      `for (;i<length;i++) {
        callbackInverse = not callback(elems[i], i);

        }`
  if typeof pen is 'null' or typeof pen is 'undefined'
    window.pen = pen
)()
