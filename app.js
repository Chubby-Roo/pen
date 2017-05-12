var {log, error, dir} = console
var {body, head} = document

var load = pen("p").id("loader").el
pen(body).append(load)

pen(load).html("loading...")

var contextmenu = {
  commands: {},

  menu: pen("div").class("contextmenu").attr("align", "center").el,

  add: function (name, evhr, type, el) {
    var self = contextmenu, temp, hr = pen("hr").class("contextmenu-divider").el
    if (type.match(/link/gi)) {
      temp = pen("a").href(evhr).html(name).class("contextmenu-command link").el
    } else if (type.match(/button/gi)) {
      temp = pen("span").on("click", evhr).html(name).class("contextmenu-command").el
    } else if (type.match(/custom/gi)) {
      if (type(evhr) === 'function') {
        temp = pen(el).on("click", evhr).html(name).class("contextmenu-command custom").el
      } else {
        temp = pen(el).href(evhr).html(name).class("contextmenu-command custom").el
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
    pen(self.menu).css({
      top: `${e.clientY}px`,
      left: `${e.clientX}px`
    })

    for (var name in self.commands) {
      pen(self.menu).append(self.commands[name].el, self.commands[name].hr)
    }

    addEventListener("click", self.remove, {once: true})
    pen(body).append(self.menu)
    return self
  }
}

var header = {
  buttons: {},
  head: pen("div").class("header").el,
  title: pen("span").class("title Lil").html(document.title).el,

  add: function (name, evhr, type, el) {
    var self = header, temp

    if (type.match(/link/gi)) {
      temp = pen("a").href(evhr).html(name).class("header-button link Ril").el
    } else if (type.match(/button/gi)) {
      temp = pen("span").on("click", evhr).html(name).class("header-button Ril").el
    } else if (type.match(/custom/gi)) {
      if (type(evhr) === 'function') {
        temp = pen(el).on("click", evhr).html(name).class("header-button custom Ril").el
      } else {
        temp = pen(el).href(evhr).html(name).class("header-button custom Ril").el
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
      brs[i] = pen("br").el
      body.insertBefore(brs[i], body.childNodes[0])
    }

    return self
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
    var first = e.path[0]
    switch (first.tagName.toLowerCase()) {
      case 'img':
        contextmenu.add("go to href", pen(first).attr("src"), "link")
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
    return pen(this).remove()
  }

  pen(load).html(init)
  log(init)
  pen(load).on("mouseover", mouseOv)
  pen(load).on("mouseout", mouseOu)
  pen(load).on("click", mouseCl)
}

document.addEventListener("DOMContentLoaded", Start)
