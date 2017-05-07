class Modal
  constructor: (headstr, bodystr, footstr) ->
    @container = pen("div").Class "modal-container"; @head = pen("div").Class "modal-head"

    @body = pen("div").Class "modal-body"; @foot = pen("div").Class "modal-foot"

    @closebtn = pen("span").Class("close-button").Html("X")

    Remove = (e) ->
      pen(@container).Remove(); pen(@closebtn).removeEventListener "click", Remove
      return

    pen(@closebtn).On "click", Remove

    @headText = pen("h2").Class("modal-head-text").Html if headerstr isnt null then headerstr else ''

    @bodyText = pen("p").Class("modal-body-text").Html if bodystr isnt null then bodystr else ''

    @footText = pen("h2").Class("modal-foot-text").Html if footstr isnt null then footstr else ''

    return this

  setHeadText: (str) ->
    pen(@headText).Html(str)
    this

  setBodyText: (str) ->
    pen(@bodyText).Html(str)
    this

  setFootText: (str) ->
    pen(@footText).Html(str)
    this

  Style: (els, stroobj) ->
    if pen.Type(el) is 'object'
      for el of els
        pen(@[el]).Css(els[el])
    else
      pen(@[el]).Css(stroobj)
    this
