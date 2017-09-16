class Card
  constructor: (title, message) ->
    title = title or "I'm a title"
    message = message or "I'm a message"
    @container = pen "<div class='cd-container'>"
    titleCont = pen "<span class='cd-title-container'>"
    msgCont = pen "<span class='cd-msg-container'>"
    msg = pen "<span class='cd-msg'>"
    .html message
    .appendTo msgCont

    title = pen "<span class='cd-title'>"
    .html title
    .appendTo titleCont

    @container.append titleCont, msgCont
    return @
