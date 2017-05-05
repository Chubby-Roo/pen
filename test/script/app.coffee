(() ->
  {log, error, dir} = console; {body, head} = document
  commands = {}
  txt = pen("p").Html("loading...")
  loader = pen("div").Class "loader"
  .Append txt
  .AppendTo body
  cntmnu = (e) ->
    e.preventDefault()
    cntmn = pen("div").Class "contextmenu"
    .Css
      top: "#{e.clientY}px", left: "#{e.clientX}px"


    addCommand = (view, event) ->
      commands[view] =
        el: pen("span").Html(view).Class("contextmenu-command").On("click", event)
        hr: pen("hr").Class("contextmenu-divider")
      pen(cntmn).Append commands[view].el, commands[view].hr
      return addCommand

    removeCommand = (name) ->
      pen(commands[name].el).Remove()
      pen(commands[name].hr).Remove()
      delete commands[name]
      return removeCommand

    Remove = () ->
      for name of commands
        removeCommand name
      pen(cntmn).Remove()
      window.removeEventListener "click", Remove
      return

    window.addEventListener "click", Remove

    addCommand "reload", () -> location.reload()
    pen(cntmn).AppendTo body
    return cntmn
  Start = (e) ->
    window.addEventListener "contextmenu", cntmnu
    header = pen("div")
    .Class "header-title"
    title = pen("span")
    .Class "title"
    .Html document.title
    closer = pen("span")
    .Class "header-button Ril"
    .Html "X"
    pen(header).Append title, closer
    .AppendTo body
    pen(loader).Remove()
    log "load took #{Math.round e.timeStamp} second(s)"
  window.onload = Start
)()
