((window) ->
  type = do ->
    classToType = {}
    ref = "Boolean Number String Function Array Date RegExp Undefined Null".split /\s+/
    for name,i in ref
      classToType["[object #{name}]"] = name.toLowerCase()
    (obj) ->
      strType = Object::toString.call obj
      classToType[strType] or "object"
  {log, error} = console
  Pendef = () ->
    accpro = (el) -> el.__proto__.__proto__.__proto__
    pen = (el) ->
      err = new Error "parameter in main function can't be a #{type(el)}"
      if type(el) is 'null' then throw err
      else if type(el) is 'undefined' then throw err
      else if type(el) is 'number' then throw err
      else if type(el) is 'boolean' then throw err
      else if type(el) is 'function' then throw err
      srm = "Html Css Attr On Append AppendTo Href Value Id Class".split /\s+/
      pen.cre = {}
      if pen.options["to selector"] is true
        if type(el) is 'string' then pen.cre["el"] = document.querySelector el else pen.cre["el"] = el
      else
        if type(el) is 'string' then pen.cre["el"] = document.createElement el else pen.cre["el"] = el
      srm.forEach (func) -> accpro(pen.cre["el"])[func] = pen[func]
      pen.accesel = () -> pen.cre["el"]
      if pen.options["auto append"] is true
        if pen.options["normally append to"] is "body" then document.body.appendChild(pen.cre["el"]) else document.head.appendChild(pen.cre["el"])
      return pen.cre["el"]
    pen.Attr = (stroobj, str) ->
      el = pen.accesel()
      if stroobj?
        if type(stroobj) is 'string'
          if str?
            el.setAttribute stroobj, str
            return el
          else return el.getAttribute stroobj
        else
          for attr of stroobj
            el.setAttribute attr, stroobj[attr]
      else
        return el.attributes
      return el
    pen.Class = (nm) ->
      el = pen.accesel()
      el.setAttribute "class", nm
      el
    pen.Id = (nm) ->
      el = pen.accesel()
      el.setAttribute "id", nm
      el
    pen.Html = (str, app = false) ->
      el = pen.accesel()
      if str?
        if app is false
          el.innerHTML = str
        else
          el.innerHTML += str
        return el
      else
        return el.innerHTML
      return el
    pen.Value = (str, app = false) ->
      el = pen.accesel()
      if str?
        if app is false then el.value = str else el.value += str
        return el
      else
        return el.value
      return el
    pen.Css = (type, str) ->
      el = pen.accesel()
      el.style[type] = str
      return el
    pen.On = (type, func, cp=false) ->
      el = pen.accesel()
      el.addEventListener type, func, cp
      return el
    pen.Click = (func, cp=false) ->
      el = pen.accesel()
      el.addEventListener "click", func, cp
      return el
    pen.Append = (elems...) ->
      el = pen.accesel()
      for elem, index in elems
        el.appendChild elem
      return el
    pen.AppendTo = (elem) ->
      el = pen.accesel()
      elem.appendChild el
      return el
    pen.Href = (hr) ->
      el = pen.accesel()
      el.setAttribute "href", hr
      return el
    pen.options = {}
    pen.options["auto append"] = false
    pen.options["to selector"] = false
    pen.options["normally append to"] = "body"
    pen.setOptions = (optionname, val) ->
      if val?
        pen.options[optionname] = val
      else
        for option of optionname
          pen.options[option] = optionname[option]
      return undefined
    pen.GetOpitions = (option) -> if option? then pen.options[option] else pen.options
    return pen
  if typeof pen is 'undefined'
    window.pen = Pendef()
  return
)(window)
