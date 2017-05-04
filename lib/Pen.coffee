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
    pen = (el) ->
      err = new Error "Pen: parameter 1 can't be a #{type(el)}"; switch type(el)
        when 'null', 'undefined', 'number', 'boolean', 'function', 'error', 'symbol' then throw err
      srm = "Html Css Attr On Append AppendTo Href Value Id Class Click Remove".split /\s+/
      pen.cre = {}
      if type(el) is 'string'
        if pen.options["to selector"] is on
          if pen.options["select all"] is on
            pen.cre["el"] = document.querySelectorAll el
          else
            pen.cre["el"] = document.querySelector el
        else
          pen.cre["el"] = document.createElement el
      else
        pen.cre["el"] = el

      for func in srm
        switch type(pen.cre["el"][func])
          when 'null', 'undefined'
            accpro(pen.cre["el"])[func] = pen[func]

      pen.accesel = () -> pen.cre["el"]
      pen.debug = (str, prefix) ->
        if pen.options["debug mode"] is true
          log "Pen-debug-#{if type(prefix) isnt 'null'
              prefix
            else
              'unknown_child'
            }: #{switch type(str)
                when 'string'
                  str
                when 'array'
                  str.join '\n'
              }"
      if pen.options["auto append"] is true
        if pen.options["normally append to"] is "body"
          document.body.appendChild(pen.cre["el"])
        else
          document.head.appendChild(pen.cre["el"])
      return pen.cre["el"]

    pen.getElementLayout = () ->
      el = pen.accesel()
      whole = el.tagName.toLowerCase()
      if el.id.length isnt 0
        whole += "##{el.id}"
      classes = []
      for i in el.classList
        classes.push i
      whole += ".#{classes.join "."}"
      whole

    pen.Attr = (stroobj, str) ->
      el = pen.accesel()
      if stroobj isnt null
        if type(stroobj) is 'string'
          if str isnt null
            pen.debug "attatching '#{stroobj}=\"#{str}\"' to element '#{pen.getElementLayout()}'", "Attr"
            el.setAttribute stroobj, str
            return el
          else
            return el.getAttribute stroobj
        else
          pen.debug "attatching attributes to element '#{pen.getElementLayout()}'", "Attr"
          for attr of stroobj
            el.setAttribute attr, stroobj[attr]
      else
        return el.attributes
      return el

    pen.Class = (nm) -> el = pen.accesel(); el.setAttribute "class", nm; return el

    pen.Id = (nm) -> el = pen.accesel(); el.setAttribute "id", nm; return el

    pen.Html = (str, app = false) ->
      el = pen.accesel()
      if str isnt null
        if app is false then el.innerHTML = str else el.innerHTML += str; return el
      else return el.innerHTML
      return el

    pen.Value = (str, app = false) ->
      el = pen.accesel()
      if str isnt null
        if app is false then el.value = str else el.value += str; return el
      else return el.value
      return el

    pen.Css = (rules, str) ->
      el = pen.accesel()
      if type(rules) is 'object'
        pen.debug "setting the style of '#{pen.getElementLayout()}'", "Css"; for rule of rules
          el.style[rule] = rules[rule]
      else if type(rules) is 'string' then el.style[rules] = str
      else err = new Error "Pen-css: parameter 1 can't be #{type el}"; throw err
      return el

    pen.On = (type, func, cp=false) -> el = pen.accesel(); el.addEventListener type, func, cp; return el

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
        pen.debug "Setting the href attribute to #{hr}", "Href"
        el.setAttribute "href", hr
      else
        err = new Error "Pen-Href: main parameter 1, can only be a string"
        throw err
      return el

    pen.Remove = () ->
      el = pen.accesel()
      el.parentNode.removeChild el
      return el

    pen.Create = (elesx, str) ->
      el = pen.accesel()
      pen.debug "Trying to create a new element and set it's parent to #{pen.getElementLayout()}", "Create"
      elesx = document.createElement elesx
      el.appendChild(elesx)
      if str.match /parent/gi
        el
      else if str.match /child/gi
        elesx
      else
        err = new Error "Pen-create invalid: #{str}, either child or parent can be returned"
        throw err

    pen.options = {}; pen.options["auto append"] = no; pen.options["to selector"] = no
    pen.options["select all"] = no; pen.options["normally append to"] = "body"; pen.options["debug mode"] = no

    pen.setOptions = (optionname, val) ->
      ops = {"auto append", "to selector", "normally append to", "select all", "debug mode"}
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

    pen.GetOpitions = (option) -> if option isnt null then pen.options[option] else pen.options
    pen.Type = (param) => type(param)

    pen.Select = (el) -> document.querySelector el

    pen.SelectAll = (el) -> document.querySelectorAll el

    return pen

  if typeof pen is 'undefined' then window.pen = Pendef()
  return
)(window, document)
