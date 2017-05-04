((window, document) ->
  {log, error, dir} = console
  type = do ->
    classToType = {}
    for name,i in "Boolean Number String Function Array Date RegExp Undefined Null Error Symbol".split /\s+/
      classToType["[object #{name}]"] = name.toLowerCase()
    (obj) ->
      strType = Object::toString.call obj
      classToType[strType] or "object"
  Pendef = () ->
    accpro = (el) => el.__proto__.__proto__.__proto__
    pen = (el) -> new pen(el)
    pen.prototype =
      constructor: (el) ->
        @presh = {}
        @presh["el"] = document.createElement el
      Html: (str) ->
        @presh["el"].innerHTML = str
        return pen

  if typeof pen is 'undefined' then window.pen = Pendef()
  return
)(window, document)
