{log, error, dir} = console; {body, head} = document
load = pen("p").Css(bottom: 0, right: 0, position: 'fixed', color:'grey').returnElement()
pen(load).AppendTo body
pen(load).Html("loading...")

class Card
  constructor: (title, message) ->
    @container = pen("div").Class("card-container").returnElement()

    @titleContainer = pen("div").Class("card-title-container").returnElement()

    @messageContainer = pen("div").Class("card-message-container").returnElement()

    @message = pen("span").Class("card-message").Html(if title isnt null then title else '').returnElement()

    @title = pen("span").Class("card-title").Html( if message isnt null then message else '').returnElement()

    pen(@titleContainer).Append @title

    pen(@messageContainer).Append @message

    pen(@container).Append @titleContainer, @messageContainer

  setTitle: (str) ->
    pen(@title).Html(str)
    this

  setMessage: (str) ->
    pen(@message).Html(str)
    this

  Style: (els, stroobj) ->
    if pen.Type(els) is 'object'
      for el of els
        pen(@[el]).Css(els[el])
    else
      pen(@[el]).Css(stroobj)
    this

  deploy: (el) ->
    if el?
      pen(el).Append @container
    else
      pen(body).Append @container
    this

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

  setHeadText: (str) ->
    pen(@headText).Html(str)
    this

  setBodyText: (str) ->
    pen(@bodyText).Html(str)
    this

  setFootText: (str) ->
    pen(@footText).Html(str)
    this

  Style: (els, stroobj) ->
    if pen.Type(el) is 'object'
      for el of els
        pen(@[el]).Css(els[el])
    else
      pen(@[el]).Css(stroobj)
    this

  deploy: (el) ->
    if el?
      pen(el).Append @container
    else
      pen(body).Append @container
    this

contextmenu =
  commands: {}
  menu: pen("div").Class("contextmenu").attr("align", "center").returnElement()

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
    removeEventListener "click", self.remove

  init: (e) ->
    self = contextmenu
    pen(self.menu).Css
      top: "#{e.clientY}px", left: "#{e.clientX}px"
    for name of self.commands
      pen(self.menu).Append self.commands[name].el, self.commands[name].hr
    addEventListener "click", self.remove
    pen(body).Append self.menu
    return self

header =
  buttons: {}
  head: pen("div").Class("header").returnElement()
  title: pen("span").Class("title").Html(document.title).returnElement()

  addButton: (name, event, el) ->
    self = header
    if el?
      if el is 'a'
        self.buttons[name] = pen("a").Class("header-button Ril link").Html(name).attr("href", event).returnElement()
      else
        self.buttons[name] = pen(el).Class("header-button Ril").Html(name).On("click", event).returnElement()
    else
      self.buttons[name] = pen("span").Class("header-button Ril").Html(name).On("click", event).returnElement()
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
    pen(body).Append self.head
    brs = []
    for i in [0..4]
      brs[i] = pen("br").returnElement()
      pen(body).Append brs[i]
    return self


wrapper =
  links: {}
  images: {}
  ps: {}
  divs: {}
  codes: {}
  prevs: {}
  container: pen("div").attr("align", "center").Class("wrapper").returnElement()
  addImage: (alt, src, img, lnk) ->
    if lnk?
      @imagaes[alt] = pen("img").attr(
        alt: alt
        src: "https://github.com/Monochromefx/pen/blob/master/images/#{src}"
        class: "body-button link").returnElement()
      @links[alt] = pen("a").attr(
        alt: alt
        href: lnk).Html(@images[alt]).returnElement()



Start = (e) ->
  contextmenu
  .addCommand("reload", (e) =>
    e.preventDefault()
    pen(load).Html("reloading...")
    location.reload()
  ).addCommand("go back", (e) =>
    e.preventDefault()
    pen(load).Html("going back...")
    location.back()
  ).addCommand("go forward", (e) =>
    e.preventDefault()
    pen(load).Html("going foward...")
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
    pen(this).Html "want to remove this message?, if so just click me"
    return
  mouseOu = (e) ->
    pen(this).Html init
    return
  mouseCl = (e) ->
    pen(this).Remove()

  pen(load).Html init
  log init
  pen(load).On "mouseover", mouseOv
  pen(load).On "mouseout", mouseOu
  pen(load).On "click", mouseCl
window.onload = Start
