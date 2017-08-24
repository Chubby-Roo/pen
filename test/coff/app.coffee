{log, error, dir} = console
pen(document).ready(() ->
  title = pen "<title id='ttl'>"
  .html "Wrk"
  sty = pen "<link rel='stylesheet' href='style.css' id='sty'>"

  pen(head).append title, sty

  wrapper = pen "<div id='wrpr' class='wrapper main'>"
  .appendTo body
  .css({
    background: "rgba(200,100,100,.5)"
    height: "#{window.innerHeight}px"
    width: "100%px"
    })

  si = () ->
    return "Width: #{window.innerWidth}<br>Height: #{window.innerHeight}"

  size = pen "<p id='sz' class='window-size bottom-right'>#{si()}</p>"
  .appendTo body
  size.on "click", (e) ->
    if size.hasClass("bottom-right") is true
      size.toggle("bottom-right", "bottom-left")
    else if size.hasClass("bottom-left") is true
      size.toggle("bottom-left", "top-left")
    else if size.hasClass("top-left") is true
      size.toggle("top-left", "top-right")
    else if size.hasClass("top-right") is true
      size.toggle("top-right", "bottom-right")

  pen(window).on "resize", (e) ->
    wrapper.css("height", "#{window.innerHeight}px")
    size.html si(), parse: yes
)
