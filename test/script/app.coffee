(() ->
  {log, error, dir} = console; {body, head} = document

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

      return this

    setTitle: (str) -> pen(@title).Html(str).pesh

    setMessage: (str) -> pen(@message).Html(str).pesh

    Style: (el, stroobj) -> pen(@[el]).Css(stroobj).pesh

  class Modal
    constructor: (headstr, bodystr, footstr) ->
      @container = pen("div").Class "modal-container"; @head = pen("div").Class "modal-head"

      @body = pen("div").Class "modal-body"; @foot = pen("div").Class "modal-foot"

      @closebtn = pen("span").Class("close-button").Html("X")

      Remove = (e) ->
        pen(@container).Remove(); pen(@closebtn).removeEventListener "click", Remove
        return

      pen(@closebtn).On "click", Remove

      @headText = pen("h2").Class("modal-head-text").Html if headerstr isnt null then headerstr else ''

      @bodyText = pen("p").Class("modal-body-text").Html if bodystr isnt null then bodystr else ''

      @footText = pen("h2").Class("modal-foot-text").Html if footstr isnt null then footstr else ''

      return this

  commands = {}
  buttons = {}

  txt = pen("p").Html("loading...").returnElement()

  loader = pen("div").Class "loader"
  .Append txt
  .AppendTo body
  .returnElement()

  cntmnu = (e) ->
    e.preventDefault()

    cntmn = pen("div").Class "contextmenu"
    .Css
      top: "#{e.clientY}px", left: "#{e.clientX}px"
    .returnElement()

    addCommand = (view, event) ->
      commands[view] =
        el: pen("span").Html(view).Class("contextmenu-command").On("click", event).returnElement()
        hr: pen("hr").Class("contextmenu-divider").returnElement()
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


  headerst = () ->
    header = pen("div")
    .Class "header-title"
    .returnElement()

    title = pen("span")
    .Class "title"
    .Html document.title
    .returnElement()

    addButton = (view, fn) ->
      buttons[view] =
        el: pen("span").Class("header-button Ril").Html(view).On("click", fn).returnElement()
      pen(header).Append buttons[view].el
      return

    removeButton = (name) ->
      pen(buttons[name]).Remove()
      delete buttons[name]

    pen(header).Append title
    .AppendTo body

    brs = []
    for i in [0..4]
      brs[i] = pen("br").returnElement()
    log brs
    pen(body).Append brs[0], brs[1], brs[2], brs[3], brs[4]
    addButton "X", () -> close()
    addButton "reload", () -> location.reload()
    return

  Start = (e) ->
    window.addEventListener "contextmenu", cntmnu
    headerst()
    a = pen("a").attr("href", "http://www.google.com").Class("body-button").Html("moose").returnElement().outerHTML
    lorem = pen("pre").Html """
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis #{a} exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n
    """.repeat 20
    .returnElement()
    pen(body).Append lorem
    pen(loader).Remove()
    log "load took #{Math.round e.timeStamp} second(s)"
  window.onload = Start
)()
