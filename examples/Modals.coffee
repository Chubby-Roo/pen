class Modal
  constructor: (headstr, bodystr, footstr) ->
    headstr = headstr or "I'm a header"
    bodystr = bodystr or "I'm a body"
    footstr = footstr or "I'm a footer"
    prefix = 'modal'
    @container = pen "<div class='#{prefix}-container'>"
    head = pen "<div class='#{prefix}-head'>"
    body = pen "<div class='#{prefix}-body'>"
    foot = pen "<div class='#{prefix}-foot'>"
    closebtn = pen "<span class='close-button'>"
    .html 'X'
    closebtn.on 'click', closebtn.remove(), capture: no, once: true
    headText = pen "<h2 class='#{prefix}-head-text'>"
    .html headstr
    .appendTo head

    bodyText = pen "<p class='#{prefix}-body-text'>"
    .html bodystr
    .appendTo body

    footText = pen "<h2 class='#{prefix}-foot-text'>"
    .html footstr
    .appendTo foot

    @container.append closebtn, head, body, foot
    return @
