###
# IF you read the files aka: app.coffee (this) and pen.coffee it'll be messy yes.
# IT is intended to be like so.
###
((window, document) ->
  {log, error, dir} = console; {body, head} = document
  pen.setOptions "debug mode", true
  contextmenu = (e) ->
    e.preventDefault(); cntmnu = pen("div").Html("moo").Css(left: "#{e.clientX}px", top: "#{e.clientY}px", position: "fixed", 'z-index': 9999)
    Remove = () -> pen(cntmnu).Remove(); pen(window).removeEventListener "click", Remove; return
    pen(cntmnu).AppendTo body; pen(window).On "click", Remove; return cntmnu
  Start = (e) ->
    pen(window).On "contextmenu", contextmenu; header = pen("div").Class "header-title"
    title = pen("span").Class("title").Html document.title
    reloader = pen("span").Class("header-button Ril").Html("reload").On("click", (e) => e.preventDefault(); location.reload(); return)
    closebtn = pen("span").Class("header-button Ril").Html("X").On("click", (e) => e.preventDefault(); close(); return)
    pen(header).Append(title, closebtn, reloader).AppendTo body; log "Loading took #{Math.round e.timeStamp} second(s)"
  window.onload = Start
)(window, document)
