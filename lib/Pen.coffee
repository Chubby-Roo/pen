((window, document) ->
  {log, error, dir} = console; {body, head} = document
  type = do ->
    classToType = {}
    for name,i in "Boolean Number String Function Array Date RegExp Undefined Null Error Symbol".split /\s+/
      classToType["[object #{name}]"] = name.toLowerCase()
    (obj) ->
      strType = Object::toString.call obj
      classToType[strType] or "object"
  Pendef = () ->
    pen = (el) ->
      err = new Error "Pen: parameter 1 can't be a #{type(el)}"
      switch type(el)
        when "error", "boolean", "number", "function", "array", "date", "regexp", "undefined", "null", "symbol" then throw err
      if type(el) is 'string'
        if pen.options["to selector"] is on
          if pen.options["select all"] is on then pen.pesh = document.querySelectorAll el else pen.pesh = document.querySelector el
        else pen.pesh = document.createElement el
      else pen.pesh = el

      if pen.options["auto append"] is on
        if pen.options["normally append to"] is "body"
          body.appendChild pen.pesh
        else if pen.options["normally append to"] is 'head'
          head.appendChild pen.pesh
        else
          pen.options["normally append to"].appendChild pen.pesh
      pen

    pen.Class = (str) -> pen.pesh.setAttribute 'class', str; pen
    pen.Id = (str) -> pen.pesh.setAttribute 'id', str; pen

    pen.Html = (str, app=off) ->
      switch pen.pesh.tagName.toLowerCase()
        when 'input', 'textarea'
          if str?
            if app is off then pen.pesh.value = str; pen else pen.pesh.value += str; pen
          else pen.pesh.value
        else
          if str?
            if app is off then pen.pesh.innerHTML = str; pen else pen.pesh.innerHTML += str; pen
          else pen.pesh.innerHTML

    pen.Css = (rulen, rule) ->
      if rulen?
        if type(rulen) is 'object'
          for rule of rulen
            pen.pesh.style[rule] = rulen[rule]
        else pen.pesh.style[rulen] = rule
        pen
      else pen.pesh.style

    pen.attr = (attrnm, attr) ->
      if attrnm?
        if attr?
          if type(attrnm) is 'object'
            for attr of attrnm
              pen.pesh.setAttribute attr, attrnm[attr]
          else
            pen.pesh.setAttribute attrnm, attr
          pen
        else pen.pesh.getAttribute attrnm
      else pen.pesh.attributes

    pen.Remove = () -> pen.pesh.parentNode.removeChild pen.pesh; pen

    pen.Append = (els...) ->
      for el in els
        if el is pen
          pen.pesh.appendChild el.pesh
        else
          pen.pesh.appendChild el
      pen

    pen.AppendTo = (el) -> el.appendChild pen.pesh; pen

    pen.On = (type, fn, cp=false) -> pen.pesh.addEventListener type, fn, cp; pen

    pen.Type = (args) -> type(arg)

    pen.options =
      "auto append": no, "to selector": no
      "select all": no, "debug mode": no
      "normally append to": "body"

    pen.returnElement = () -> pen.pesh

    pen.error = (pref, msg) -> throw new Error "Pen-#{if pref? then pref else ''}#{msg}"

    pen.setOptions = (optionstr, option) ->
      ops = {
        "auto append", "debug mode", "to selector"
        "select all", "normally append to"}
      if optionstr?
        if type(optionstr) is 'object'
          for option of optionstr
            if ops[option]?
              pen.options[option] = optionstr[option]
            else
              pen.error("Set-options", "option #{option} doesn't exist")
        else
          pen.options[optionstr] = option
      return pen
    return pen
  if typeof pen is 'undefined' then window.pen = Pendef()
  return
)(window, document)
