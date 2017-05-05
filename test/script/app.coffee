(() ->
  {log, error, dir} = console; {body, head} = document
  commands = {}
  cntmnu = (e) ->
    e.preventDefault()
    cntmn = pen("div").Class "contextmenu"
    .Css
      top: "#{e.clientY}px", left: "#{e.clientX}px"
      position: "fixed", 'z-index': 9999
    .pesh

    addCommand = (view, event) ->
      commands[view] =
        el: pen("span").Html(view).Class("contextmenu-command").On("click", event).pesh
        hr: pen("hr").Class("contextmenu-divider").pesh
      pen(cntmn).Append commands[view].el, commands[view].hr
      return

    removeCommand = (name) ->
      pen(commands[name].el).Remove()
      pen(commands[name].hr).Remove()
      delete commands[name]
      return

    Remove = () ->
      for name of commands
        removeCommand name
      pen(cntmn).Remove()
      pen(window).removeEventListener "click", Remove

    pen(window).On "click", Remove

    addCommand "reload", () -> location.reload()
    pen(cntmn).AppendTo body
    return cntmn
  Start = (e) ->
    pen(window).On "contextmenu", cntmnu
    header = pen("div")
    .Class "header-title"
    .pesh
    title = pen("span")
    .Class "title"
    .Html document.title
    .pesh
    closer = pen("span")
    .Class "header-button Ril"
    .Html "X"
    .pesh
    pen(header).Append title, closer
    .AppendTo body
    log "load took #{Math.round e.timeStamp} second(s)"
  window.onload = Start
)()
