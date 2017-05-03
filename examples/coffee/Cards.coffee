class Card
  constructor: (title, message) ->
    @container = pen("div").Class "card-container"
    @titleContainer = pen("div").Class "card-title-container"; @messageContainer = pen("div").Class "card-message-container"
    @message = pen("span").Class("card-message").Html if title isnt null then title else ''
    @title = pen("span").Class("card-title").Html if message isnt null then message else ''
    pen(@titleContainer).Append @title; pen(@messageContainer).Append @message
    pen(@container).Append @titleContainer, @messageContainer

  setTitle: (str) -> pen(@title).Html str
  setMessage: (str) -> pen(@message).Html str
  Style: (el, stroobj) -> pen(@[el]).Css stroobj

# Card = (obj) ->
#   return cont
#   pen(desc).Append p
