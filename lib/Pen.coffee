((window) ->
  {log, error} = console
  Pendef = () ->
    accpro = (el) -> el.__proto__.__proto__.__proto__
    pen = (el) ->
      if el is null
        throw new Error("parameter in main function cannot be #{el}")
      else if typeof el is 'undefined'
        throw new Error("parameter in main function cannot be #{typeof el}")
      else if typeof el is 'number'
        throw new Error("parameter in main function cannot be #{typeof el}")
      else if typeof el is 'boolean'
        throw new Error("parameter in main function cannot be #{typeof el}")
      else if typeof el is 'function'
        throw new Error("parameter in main function cannot be #{typeof el}")
      srm = "Html Css Attr On Append".split /\s+/
      pen.cre = {}
      if pen.options["to selector"] is true
        if typeof el is 'string'
          pen.cre["el"] = document.querySelector el
        else
          pen.cre["el"] = el
      else
        if typeof el is 'string'
          pen.cre["el"] = document.createElement el
        else
          pen.cre["el"] = el
      srm.forEach (func) ->
        accpro(pen.cre["el"])[func] = pen[func]
      pen.accesel = () -> pen.cre["el"]
      if pen.options["auto append"] isnt false
        if pen.options["normally append to"] is "body"
          document.body.appendChild(pen.cre["el"])
        else
          document.head.appendChild(pen.cre["el"])
        return pen.cre["el"]
      else
        return pen.cre["el"]
    pen.Attr = (stroobj, str) ->
      el = pen.accesel()
      if stroobj?
        if typeof stroobj is 'string'
          if str?
            el.setAttribute stroobj, str
            return el
          else
            return el.getAttribute stroobj
        else
          for attr of stroobj
            el.setAttribute attr, stroobj[attr]
      else
        return el.attributes
      return el
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
    pen.Css = (type, str) ->
      el = pen.accesel()
      el.style[type] = str
      return el
    pen.On = (type, func, cp=false) ->
      el = pen.accesel()
      el.addEventListener type, func, cp
      return el
    pen.Append = (elems...) ->
      el = pen.accesel()
      for elem, index in elems
        el.appendChild elem
      return el
    pen.options = {}
    pen.options["auto append"] = false
    pen.options["to selector"] = false
    pen.options["normally append to"] = "body"
    pen.setOptions = (optionname, val) -> pen.options[optionname] = val
    return pen
  if typeof pen is 'undefined'
    window.pen = Pendef()
  return
)(window)
