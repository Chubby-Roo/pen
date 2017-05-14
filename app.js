var {log, error, dir} = console
var {body, head} = document

var load = pen("<p>").id("loader")
pen(body).append(load)

load.html("loading...")

var contextmenu = {
  commands: {},

  menu: pen("<div>").class("contextmenu").attr("align", "center"),

  add: function (name, evhr, type, el) {
    el = `<${el}>`
    var self = contextmenu, temp, hr = pen("<hr>").class("contextmenu-divider")
    if (type.match(/link/gi)) {
      temp = pen("<a>").href(evhr).html(name).class("contextmenu-command link")
    } else if (type.match(/button/gi)) {
      temp = pen("<span>").on("click", evhr).html(name).class("contextmenu-command")
    } else if (type.match(/custom/gi)) {
      if (type(evhr) === 'function') {
        temp = pen(el).on("click", evhr).html(name).class("contextmenu-command custom")
      } else {
        temp = pen(el).href(evhr).html(name).class("contextmenu-command custom")
      }
    }
    self.commands[name] = {el: temp, hr}
    return self
  },

  removeCommand: function(name, fully=false) {
    var self = contextmenu
    pen(self.commands[name].el).remove()
    fully === true ? delete self.commands[name] : void 0
    return self
  },

  remove: function() {
    var name, self
    self = contextmenu
    for (name in self.commands) {
      self.removeCommand(name)
    }
    return self
  },

  init: function(e) {
    var self = contextmenu
    self.menu.css({
      top: `${e.clientY}px`,
      left: `${e.clientX}px`
    })

    for (var name in self.commands) {
      self.menu.append(self.commands[name].el, self.commands[name].hr)
    }

    addEventListener("click", self.remove, {once: true})
    pen(body).append(self.menu)
    return self
  }
}

var header = {
  buttons: {},
  head: pen("<div>").class("header"),
  title: pen("<span>").class("title Lil").html(document.title),

  add: function (name, evhr, type, el) {
    el = `<${el}>`
    var self = header, temp
    if (type.match(/link/gi)) {
      temp = pen("<a>").href(evhr).html(name).class("header-button link Ril")
    } else if (type.match(/button/gi)) {
      temp = pen("<span>").on("click", evhr).html(name).class("header-button Ril")
    } else if (type.match(/custom/gi)) {
      if (type(evhr) === 'function') {
        temp = pen(el).on("click", evhr).html(name).class("header-button custom Ril")
      } else {
        temp = pen(el).href(evhr).html(name).class("header-button custom Ril")
      }
    }

    self.commands[name] = temp
    return self
  },

  removeButton: function(name, fully) {
    var self = header
    pen(self.buttons[name]).remove()
    fully === true ? delete self.buttons[name] : void 0
    return self
  },

  init: function() {
    var self = header
    pen(self.head).append(self.title)

    for (var name in self.buttons) {
      pen(self.head).append(self.buttons[name])
    }

    pen(body).append(self.head)
    var brs = []

    for (var i = 0; i <= 3; i++) {
      brs[i] = pen("<br>").el
      body.insertBefore(brs[i], body.childNodes[0])
    }

    return self
  }
}

class drop_down {
  constructor(buttonhtml) {
    this.links = {}

    this.container = pen("div").class("dropdown").el

    this.button = pen("button").class("dropdown-button").html(buttonhtml != null ? buttonhtml : 'button').el

    this.content = pen("div").class("dropdown-content").el

    pen(this.container).append(this.button, this.content)
    return this
  }

  addLink(name, link) {
    var a = pen("a").class("dropdown-content-link").href(link).html(name).el
    var hr = pen("hr").class("dropdown-content-divider").el
    this.links[name] = {el:a, hr}
    pen(this.content).append(a, hr)
    return this
  }

  removeLink(name) {
    pen(this.links[name]).remove()
    return this
  }

  deployTo(el) {
    pen(el).append(this.container)
    return this
  }

  style(el, obj) {
    pen(this[el]).css(obj)
    return this
  }
}

var Start = function(e) {
  var init, mouseCl, mouseOu, mouseOv
  contextmenu.add("reload", (e) => {
    e.preventDefault()
    pen(load).html("reloading...")
    location.reload()
  }, "button")
  .add("go back", (e) => {
    e.preventDefault()
    pen(load).html("going back...")
    history.back()
  }, "button")
  .add("go forward", (e) => {
    e.preventDefault()
    pen(load).html("going foward...")
    history.forward()
  }, "button")
  .add("github repo", (e) => {
    e.preventDefault()
    pen(load).html("going to github repo...")
    location.href = "http://github.com/Monochromefx/pen"
  }, "button")

  addEventListener("contextmenu", (e) => {
    var first = pen(e.path[0])
    switch (first.TAG) {
      case 'img':
        contextmenu.add("go to href", pen(first).src(), "link")
    }
    e.preventDefault()
    contextmenu.init(e)
  })

  header.init()

  mouseOv = function(e) {
    pen(this).html("<br>want to remove this message?, if so just click me",true)
  }
  init = `load took ${Date.now() - timestamp} second(s)`
  mouseOu = function(e) {
    pen(this).html(init)
  }
  mouseCl = function(e) {
    pen(this).remove()
    return
  }

  load.html(init)
  log(init)
  load.on("mouseover", mouseOv)
  load.on("mouseout", mouseOu)
  load.on("click", mouseCl)
}

document.addEventListener("DOMContentLoaded", Start)
