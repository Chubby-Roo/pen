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

txt = pen("p").Html("loading...").returnElement()

loader = pen("div").Class "loader"
.Append txt
.AppendTo body
.returnElement()

contextmenu =
  commands: {}
  menu: pen("div").Class("contextmenu").returnElement()
  addCommand: (name, ev) ->
    self = contextmenu
    self.commands[name] =
      el: pen("span").Html(name).Class("contextmenu-command").On("click", ev).returnElement()
      hr: pen("hr").Class("contextmenu-divider").returnElement()
    return self
  removeCommand: (name) ->
    self = contextmenu
    pen(self.commands[name].el).Remove()
    pen(self.commands[name].hr).Remove()
    return self
  remove: () ->
    self = contextmenu
    for name of self.commands
      self.removeCommand(name)
    window.removeEventListener "click", self.remove
  init: (e) ->
    self = contextmenu
    pen(self.menu).Css
      top: "#{e.clientY}px", left: "#{e.clientX}px"
    for name of self.commands
      pen(self.menu).Append self.commands[name].el, self.commands[name].hr
    window.addEventListener "click", self.remove
    return self

header =
  buttons: {}
  head: pen("div").Class("header").returnElement()
  title: pen("span").Class("title").Html(document.title).returnElement()

  addButton: (name, event) ->
    self = header
    self.buttons[view] = pen("span").Class("header-button Ril").Html(name).On("click", event).returnElement()
    return self

  removeButton: (name) ->
    self = header
    pen(self.buttons[name]).Remove()
    return self

  init: () ->
    self = header
    pen(self.head).Append self.title
    for name of self.buttons
      pen(self.head).Append self.buttons[name]
    pen(document.body).Append self.head
    brs = []
    for i in [0..4]
      brs[i] = pen("br").returnElement()
    pen(document.body).Append [brs...]
    return self

Start = (e) ->
  contextmenu.addCommand("reload", () => location.reload())
  .addCommand("go back", () => location.back())
  .addCommand("go forward", () => location.forward())

  window.addEventListener "contextmenu", contextmenu.init()

  header.addButton("X", () => window.close())
  .addButton("-", () => window.minimize())
  .addButton("[_]", () => window.maximize()).init()

  a = pen("a").attr("href", "http://www.google.com").Class("body-button").Html("moose").returnElement().outerHTML
  a1 = pen("a").attr("href", "https://github.com/Monochromefx/pen-coffee/tree/experimental").Class("body-button").Html("meew").returnElement().outerHTML
  lorem = pen("pre").Html """

  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

  Ut enim ad minim veniam, quis #{a} exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla #{a2}.

  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n
  """.repeat 20
  .returnElement()
  pen(body).Append lorem
  pen(loader).Remove()
  log "load took #{Math.round e.timeStamp} second(s)"
window.onload = Start
