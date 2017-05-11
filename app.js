var {log, error, dir} = console
var {body, head} = document

var load = pen("p").id("loader").el
pen(body).append(load);

pen(load).html("loading...");

var contextmenu = {
  commands: {},

  menu: pen("div").class("contextmenu").attr("align", "center").el,

  addCommand: function(name, ev) {
    var self = contextmenu;
    self.commands[name] = {
      el: pen("span").html(name).class("contextmenu-command").on("click", ev).el,
      hr: pen("hr").class("contextmenu-divider").el
    };
    return self;
  },

  addLink: function (name, hr) {
    var self = contextmenu
    self.commands[name] = {
      el: pen("a").html(name).class("contextmenu-command link").href(hr).el,
      hr: pen("hr").class("contextmenu-divider").el
    }
    return self
  },

  removeCommand: function(name) {
    var self = contextmenu;
    pen(self.commands[name].el).remove();
    pen(self.commands[name].hr).remove();
    return self;
  },

  remove: function() {
    var name, self;
    self = contextmenu;
    for (name in self.commands) {
      self.removeCommand(name);
    }
    return removeEventListener("click", self.remove);
  },

  init: function(e) {
    var name, self;
    self = contextmenu;
    pen(self.menu).css({
      top: `${e.clientY}px`,
      left: `${e.clientX}px`
    });
    for (name in self.commands) {
      pen(self.menu).append(self.commands[name].el, self.commands[name].hr);
    }
    addEventListener("click", self.remove);
    pen(body).append(self.menu);
    return self;
  }
};

var header = {
  buttons: {},
  head: pen("div").class("header").el,
  title: pen("span").class("title Lil").html(document.title).el,
  addButton: function(name, event, el) {
    var self = header;
    if (el != null) {
      if (el === 'a') {
        self.buttons[name] = pen("a").class("header-button Ril link").html(name).attr("href", event).el;
      } else {
        self.buttons[name] = pen(el).class("header-button Ril").html(name).on("click", event).el;
      }
    } else {
      self.buttons[name] = pen("span").class("header-button Ril").html(name).on("click", event).el;
    }
    return self;
  },
  removeButton: function(name) {
    var self = header;
    pen(self.buttons[name]).remove();
    return self;
  },
  init: function() {
    var brs, i, self = header;
    pen(self.head).append(self.title);
    for (var name in self.buttons) {
      pen(self.head).append(self.buttons[name]);
    }
    pen(body).append(self.head);
    brs = [];
    for (var i = 0; i <= 4; i++) {
      brs[i] = pen("br").el;
      body.insertBefore(brs[i], body.childNodes[0])
    }
    return self;
  }
};

var wrapper = {
  links: {},
  images: {},
  ps: {},
  divs: {},
  codes: {},
  prevs: {},
  container: pen("div").attr("align", "center").class("wrapper").el,
  addImage: function(alt, src, img, lnk) {
    if (lnk != null) {
      this.imagaes[alt] = pen("img").attr({
        alt: alt,
        src: `${src}`,
        "class": "body-button link"
      }).el;
      return this.links[alt] = pen("a").attr({
        alt: alt,
        href: lnk
      }).html(this.images[alt]).el;
    }
  }
};

var Start = function(e) {
  var init, mouseCl, mouseOu, mouseOv;
  contextmenu.addCommand("reload", (e) => {
    e.preventDefault();
    pen(load).html("reloading...");
    location.reload();
  }).addCommand("go back", (e) => {
    e.preventDefault();
    pen(load).html("going back...");
    history.back();
  }).addCommand("go forward", (e) => {
    e.preventDefault();
    pen(load).html("going foward...");
    history.forward();
  }).addCommand("github repo", (e) => {
    e.preventDefault()
    pen(load).html("going to github repo...")
    location.href = "http://github.com/Monochromefx/pen"
  })
  addEventListener("contextmenu", (e) => {
    var first = e.path[0]
    switch (first.tagName.toLowerCase()) {
      case 'img':
        contextmenu.addLink("go to href", pen(first).attr("src"))
    }
    e.preventDefault();
    contextmenu.init(e);
  });
  header.init();
  init = `load took ${Date.now() - timestamp} second(s)`;
  mouseOv = function(e) {
    pen(this).html("want to remove this message?, if so just click me");
  };
  mouseOu = function(e) {
    pen(this).html(init);
  };
  mouseCl = function(e) {
    return pen(this).remove();
  };
  pen(load).html(init);
  log(init);
  pen(load).on("mouseover", mouseOv);
  pen(load).on("mouseout", mouseOu);
  pen(load).on("click", mouseCl);
};

document.addEventListener("DOMContentLoaded", Start)
