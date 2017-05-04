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
    target = arguments[0] or {}
    i = 1
    length = arguments.length
    deep = no
    if typeof target is 'object' and not pen.isFunction target
      target = {}
  if typeof pen is 'null' or typeof pen is 'undefined'
    window.pen = pen
)()
