((window) ->
  type = do ->
    classToType = {}
    ref = "Boolean Number String Function Array Date RegExp Undefined Null Element Document Window".split /\s+/
    for name,i in ref
      classToType["[object #{name}]"] = name.toLowerCase()
    (obj) ->
      strType = Object::toString.call obj
      classToType[strType] or "object"
  {log, error} = console
  Pendef = () ->
<<<<<<< HEAD
    accpro = (el) ->
      el.__proto__.__proto__.__proto__
=======
    accpro = (el) => el.__proto__.__proto__.__proto__
>>>>>>> refs/remotes/origin/master
    pen = (el) ->
      err = new Error "parameter in main function can't be a #{type(el)}"
      if type(el) is 'null' then throw err
      else if type(el) is 'undefined' then throw err
      else if type(el) is 'number' then throw err
      else if type(el) is 'boolean' then throw err
      else if type(el) is 'function' then throw err
<<<<<<< HEAD
      srm = "Html Css Attr On Append AppendTo Href Value Id Class Click Remove Select SelectAll Create".split /\s+/
=======
      srm = "Html Css Attr On Append AppendTo Href Value Id Class Click Remove".split /\s+/
>>>>>>> refs/remotes/origin/master
      pen.cre = {}
      if pen.options["to selector"] is true
        if type(el) is 'string' then pen.cre["el"] = document.querySelector el
        else pen.cre["el"] = el
      else
<<<<<<< HEAD
        if type(el) is 'string' then pen.cre["el"] = document.createElement el
        else pen.cre["el"] = el

      for func in srm
        if accpro(pen.cre["el"])[func] is null or type(accpro(pen.cre["el"])[func]) is 'undefined'
          accpro(pen.cre["el"])[func] = pen[func]

=======
        if type(el) is 'string' then pen.cre["el"] = document.createElement el else pen.cre["el"] = el
      for func in srm
        if accpro(pen.cre["el"])[func] is null or type(accpro(pen.cre["el"])[func]) is 'undefined'
          accpro(pen.cre["el"])[func] = pen[func]
>>>>>>> refs/remotes/origin/master
      pen.accesel = () -> pen.cre["el"]

      if pen.options["auto append"] is true
        if pen.options["normally append to"] is "body" then document.body.appendChild(pen.cre["el"])
        else document.head.appendChild(pen.cre["el"])

      return pen.cre["el"]

    pen.Attr = (stroobj, str) ->
      el = pen.accesel()
      if stroobj isnt null
        if type(stroobj) is 'string'
          if str isnt null
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
      return el

    pen.Id = (nm) ->
      el = pen.accesel()
      el.setAttribute "id", nm
      return el

    pen.Html = (str, app = false) ->
      el = pen.accesel()
      if str isnt null
        if app is false then el.innerHTML = str else el.innerHTML += str
        return el
      else
        return el.innerHTML
      return el
<<<<<<< HEAD

=======
    pen.Remove = () ->
      el = pen.accesel()
      par = el.parentElement
      par.removeElement(el)
      return el
>>>>>>> refs/remotes/origin/master
    pen.Value = (str, app = false) ->
      el = pen.accesel()
      if str isnt null
        if app is false then el.value = str else el.value += str
        return el
      else
        return el.value
      return el

    pen.Css = (rules, str) ->
      el = pen.accesel()
      if type(rules) is 'object'
        for rule of rules
          el.style[rule] = rules[rule]
      else if type(rules) is 'string'
        el.style[rules] = str
      else
        err = new Error "parameter 1 can't be #{type el}"
        throw err
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
      if type(hr) is 'string'
        el.setAttribute "href", hr
      else
        err = new Error "main parameter 1, can only be a string"
        throw err
      return el

    pen.Remove = () ->
      el = pen.accesel()
      parent = el.parentElement
      parent.removeChild el
      el

    pen.Create = (elesx, str) ->
      el = pen.accesel()
      elesx = document.createElement elesx
      el.appendChild(elesx)
      if str.match /parent/gi
        return el
      else if str.match /child/gi
        return elesx

    pen.options = {}
    pen.options["auto append"] = false
    pen.options["to selector"] = false
    pen.options["normally append to"] = "body"
    pen.setOptions = (optionname, val) ->
      ops = {"auto append", "to selector", "normally append to"}
      if type(optionname) is 'string'
        if optionname is ops[optionname]
          pen.options[optionname] = val
        else
          err = new Error "unrecgonized option #{optionname}"
          throw err
      else if type(optionname) is 'object'
        for option of optionname
          if option is ops[option]
            pen.options[option] = optionname[option]
          else
            err = new Error "unrecgonized option '#{option}'"
            throw err
      return undefined

    pen.GetOpitions = (option) -> if option? then pen.options[option] else pen.options
<<<<<<< HEAD
    pen.Type = (param) -> type(param)
    pen.Select = (eles) ->
      el = pen.accesel()
      el.querySelector eles
    pen.SelectAll = (eles) ->
      el = pen.accesel()
      el.querySelectorAll eles
=======
    pen.Type = (param) => type(param)
    pen.Select = (el) => document.querySelector el
    pen.SelectAll = (el) => document.querySelectorAll el
>>>>>>> refs/remotes/origin/master
    return pen
  if typeof pen is 'undefined'
    window.pen = Pendef()
  return
)(window)
