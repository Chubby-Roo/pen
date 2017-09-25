class Card
  constructor: (title, message) ->
    title = title or "I'm a title"
    message = message or "I'm a message"
    @container = pen "<div class='cd-container'>"
    titleCont = @container.create "<span class='cd-title-container'>", 'child'
    msgCont = @container.create "<span class='cd-msg-container'>", 'child'
    msgCont.create "<span class='cd-msg'>", 'child'
    .html message

    titleCont.create "<span class='cd-title'>", 'child'
    .html title
    return @
