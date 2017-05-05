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
    pen = (el) ->
      pen.pesh = document.createElement el
      pen
    pen.Html = (str, app=off) ->
      switch pen.pesh.tagName.toLowerCase()
        when 'input', 'textarea'
          if str?
            if app is off
              pen.pesh.value = str
              pen
            else
              pen.pesh.value += str
              pen
          else
            pen.pesh.value
        else
          if str?
            if app is off
              pen.pesh.innerHTML = str
              pen
            else
              pen.pesh.innerHTML += str
              pen
          else
            pen.pesh.innerHTML

    pen.Css = (rulen, rule) ->
      if rulen?
        if type(rulen) is 'object'
          for rule of rulen
            pen.pesh.style[rule] = rulen[rule]
        else
          pen.pesh.style[rulen] = rule
        pen
      else
        pen.pesh.style
    return pen
  if typeof pen is 'undefined' then window.pen = Pendef()
  return
)(window, document)
