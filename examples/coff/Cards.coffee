class Card
  constructor: (title, message) ->
    prefix = "card"
    title ?= "I'm a title"
    message ?= "I'm a message"
    @container = pen "<div class='#{prefix}-container'>"
    @titleCont = pen "<div class='#{prefix}-title-container'>"
    @msgCont = pen "<div class='#{prefix}-msg-container'>"
    @msg = pen "<span class='#{prefix}-msg'>"
    .html message
    .appendTo @msgCont

    @title = pen "<span class='#{prefix}-title'>"
    .html title
    .appendTo @titleCont

    @container.append @titleCont, @msgCont
    return

  set: (el, str) ->
    @[el].html str
    return this
