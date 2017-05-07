class Card
  constructor: (title, message) ->
    @container = pen("div").Class("card-container").returnElement()

    @titleContainer = pen("div").Class("card-title-container").returnElement()

    @messageContainer = pen("div").Class("card-message-container").returnElement()

    @message = pen("span").Class("card-message").Html(if title isnt null then title else '').returnElement()

    @title = pen("span").Class("card-title").Html( if message isnt null then message else '').returnElement()

    pen(@titleContainer).Append @title

    pen(@messageContainer).Append @message

    pen(@container).Append @titleContainer, @messageContainer

  setTitle: (str) ->
    pen(@title).Html(str)
    this

  setMessage: (str) ->
    pen(@message).Html(str)
    this

  Style: (els, stroobj) ->
    if pen.Type(el) is 'object'
      for el of els
        pen(@[el]).Css(els[el])
    else
      pen(@[el]).Css(stroobj)
    this
