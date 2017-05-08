{log, error, dir} = console; {body, head} = document
load = pen("p").css(bottom: 0, right: 0, position: 'fixed', color:'grey').returnElement()
pen(load).appendTo body
pen(load).html("loading...")

class Card
  constructor: (title, message) ->
    @container = pen("div").class("card-container").returnElement()

    @titleContainer = pen("div").class("card-title-container").returnElement()

    @messageContainer = pen("div").class("card-message-container").returnElement()

    @message = pen("span").class("card-message").html(if title isnt null then title else '').returnElement()

    @title = pen("span").class("card-title").html( if message isnt null then message else '').returnElement()

    pen(@titleContainer).append @title

    pen(@messageContainer).append @message

    pen(@container).append @titleContainer, @messageContainer

  setTitle: (str) ->
    pen(@title).html(str)
    this

  setMessage: (str) ->
    pen(@message).html(str)
    this

  Style: (els, stroobj) ->
    if pen.Type(els) is 'object'
      for el of els
        pen(@[el]).css(els[el])
    else
      pen(@[el]).css(stroobj)
    this

  deploy: (el) ->
    if el?
      pen(el).append @container
    else
      pen(body).append @container
    this

class Modal
  constructor: (headstr, bodystr, footstr) ->
    @container = pen("div").class "modal-container"; @head = pen("div").class "modal-head"

    @body = pen("div").class "modal-body"; @foot = pen("div").class "modal-foot"

    @closebtn = pen("span").class("close-button").html("X")

    Remove = (e) ->
      pen(@container).Remove(); pen(@closebtn).removeEventListener "click", Remove
      return

    pen(@closebtn).on "click", Remove

    @headText = pen("h2").class("modal-head-text").html if headerstr isnt null then headerstr else ''

    @bodyText = pen("p").class("modal-body-text").html if bodystr isnt null then bodystr else ''

    @footText = pen("h2").class("modal-foot-text").html if footstr isnt null then footstr else ''

    return this

  setHeadText: (str) ->
    pen(@headText).html(str)
    this

  setBodyText: (str) ->
    pen(@bodyText).html(str)
    this

  setFootText: (str) ->
    pen(@footText).html(str)
    this

  Style: (els, stroobj) ->
    if pen.Type(el) is 'object'
      for el of els
        pen(@[el]).css(els[el])
    else
      pen(@[el]).css(stroobj)
    this

  deploy: (el) ->
    if el?
      pen(el).append @container
    else
      pen(body).append @container
    this

contextmenu =
  commands: {}
  menu: pen("div").class("contextmenu").attr("align", "center").returnElement()

  addCommand: (name, ev) ->
    self = contextmenu
    self.commands[name] =
      el: pen("span").html(name).class("contextmenu-command").on("click", ev).returnElement()
      hr: pen("hr").class("contextmenu-divider").returnElement()
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
    removeEventListener "click", self.remove

  init: (e) ->
    self = contextmenu
    pen(self.menu).css
      top: "#{e.clientY}px", left: "#{e.clientX}px"
    for name of self.commands
      pen(self.menu).append self.commands[name].el, self.commands[name].hr
    addEventListener "click", self.remove
    pen(body).append self.menu
    return self

header =
  buttons: {}
  head: pen("div").class("header").returnElement()
  title: pen("span").class("title").html(document.title).returnElement()

  addButton: (name, event, el) ->
    self = header
    if el?
      if el is 'a'
        self.buttons[name] = pen("a").class("header-button Ril link").html(name).attr("href", event).returnElement()
      else
        self.buttons[name] = pen(el).class("header-button Ril").html(name).on("click", event).returnElement()
    else
      self.buttons[name] = pen("span").class("header-button Ril").html(name).on("click", event).returnElement()
    return self

  removeButton: (name) ->
    self = header
    pen(self.buttons[name]).Remove()
    return self

  init: () ->
    self = header
    pen(self.head).append self.title
    for name of self.buttons
      pen(self.head).append self.buttons[name]
    pen(body).append self.head
    brs = []
    for i in [0..4]
      brs[i] = pen("br").returnElement()
      pen(body).append brs[i]
    return self


wrapper =
  links: {}
  images: {}
  ps: {}
  divs: {}
  codes: {}
  prevs: {}
  container: pen("div").attr("align", "center").class("wrapper").returnElement()
  addImage: (alt, src, img, lnk) ->
    if lnk?
      @imagaes[alt] = pen("img").attr(
        alt: alt
        src: "https://github.com/Monochromefx/pen/blob/master/images/#{src}"
        class: "body-button link").returnElement()
      @links[alt] = pen("a").attr(
        alt: alt
        href: lnk).html(@images[alt]).returnElement()



Start = (e) ->
  contextmenu
  .addCommand("reload", (e) =>
    e.preventDefault()
    pen(load).html("reloading...")
    location.reload()
  ).addCommand("go back", (e) =>
    e.preventDefault()
    pen(load).html("going back...")
    location.back()
  ).addCommand("go forward", (e) =>
    e.preventDefault()
    pen(load).html("going foward...")
    location.forward()
  )
  addEventListener "contextmenu", (e) =>
    e.preventDefault()
    contextmenu.init(e)
    return

  header
  .addButton("<img src='https://github.com/Monochromefx/pen/blob/master/GitHub-Mark-64px.png' alt='Github mark'></img>", "https://github.com/Monochromefx/pen", "a").init()

  init = "load took #{Math.round e.timeStamp} second(s)"

  mouseOv = (e) ->
    pen(this).html "want to remove this message?, if so just click me"
    return
  mouseOu = (e) ->
    pen(this).html init
    return
  mouseCl = (e) ->
    pen(this).Remove()

  pen(load).html init
  log init
  pen(load).on "mouseover", mouseOv
  pen(load).on "mouseout", mouseOu
  pen(load).on "click", mouseCl
window.onload = Start
