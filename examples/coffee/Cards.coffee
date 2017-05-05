class Card
  constructor: (title, message) ->
    @container = pen("div").Class "card-container"
    .pesh

    @titleContainer = pen("div").Class "card-title-container"; @messageContainer = pen("div").Class "card-message-container"
    .pesh

    @message = pen("span").Class("card-message").Html if title isnt null then title else ''
    .pesh

    @title = pen("span").Class("card-title").Html if message isnt null then message else ''
    .pesh

    pen(@titleContainer).Append @title; pen(@messageContainer).Append @message

    pen(@container).Append @titleContainer, @messageContainer

  setTitle: (str) -> pen(@title).Html(str).pesh

  setMessage: (str) -> pen(@message).Html(str).pesh

  Style: (el, stroobj) -> pen(@[el]).Css(stroobj).pesh
