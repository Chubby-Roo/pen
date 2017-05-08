var {log, error, dir} = console
var {body, head} = document

var load = pen("p").css({
  bottom: 0,
  right: 0,
  position: 'fixed',
  color: 'grey'
}).returnElement();

pen(body).append(load);

pen(load).html("loading...");

var Card = class Card {
  constructor(title, message) {
    this.container = pen("div").class("card-container").returnElement();
    this.titleContainer = pen("div").class("card-title-container").returnElement();
    this.messageContainer = pen("div").class("card-message-container").returnElement();
    this.message = pen("span").class("card-message").html(title !== null ? title : '').returnElement();
    this.title = pen("span").class("card-title").html(message !== null ? message : '').returnElement();
    pen(this.titleContainer).append(this.title);
    pen(this.messageContainer).append(this.message);
    pen(this.container).append(this.titleContainer, this.messageContainer);
  }

  setTitle(str) {
    pen(this.title).html(str);
    return this;
  }

  setMessage(str) {
    pen(this.message).html(str);
    return this;
  }

  Style(els, stroobj) {
    var el;
    if (pen.Type(els) === 'object') {
      for (el in els) {
        pen(this[el]).css(els[el]);
      }
    } else {
      pen(this[el]).css(stroobj);
    }
    return this;
  }

  deploy(el) {
    if (el != null) {
      pen(el).append(this.container);
    } else {
      pen(body).append(this.container);
    }
    return this;
  }

};

var Modal = class Modal {
  constructor(headstr, bodystr, footstr) {
    var Remove;
    this.container = pen("div").class("modal-container");
    this.head = pen("div").class("modal-head");
    this.body = pen("div").class("modal-body");
    this.foot = pen("div").class("modal-foot");
    this.closebtn = pen("span").class("close-button").html("X");
    Remove = function(e) {
      pen(this.container).remove();
      pen(this.closebtn).removeEventListener("click", Remove);
    };
    pen(this.closebtn).on("click", Remove);
    this.headText = pen("h2").class("modal-head-text").html(headerstr !== null ? headerstr : '');
    this.bodyText = pen("p").class("modal-body-text").html(bodystr !== null ? bodystr : '');
    this.footText = pen("h2").class("modal-foot-text").html(footstr !== null ? footstr : '');
    return this;
  }

  setHeadText(str) {
    pen(this.headText).html(str);
    return this;
  }

  setBodyText(str) {
    pen(this.bodyText).html(str);
    return this;
  }

  setFootText(str) {
    pen(this.footText).html(str);
    return this;
  }

  Style(els, stroobj) {
    var el;
    if (pen.Type(el) === 'object') {
      for (el in els) {
        pen(this[el]).css(els[el]);
      }
    } else {
      pen(this[el]).css(stroobj);
    }
    return this;
  }

  deploy(el) {
    if (el != null) {
      pen(el).append(this.container);
    } else {
      pen(body).append(this.container);
    }
    return this;
  }
};

var contextmenu = {
  commands: {},

  menu: pen("div").class("contextmenu").attr("align", "center").returnElement(),

  addCommand: function(name, ev) {
    var self = contextmenu;
    self.commands[name] = {
      el: pen("span").html(name).class("contextmenu-command").on("click", ev).returnElement(),
      hr: pen("hr").class("contextmenu-divider").returnElement()
    };
    return self;
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
  head: pen("div").class("header").returnElement(),
  title: pen("span").class("title").html(document.title).returnElement(),
  addButton: function(name, event, el) {
    var self = header;
    if (el != null) {
      if (el === 'a') {
        self.buttons[name] = pen("a").class("header-button Ril link").html(name).attr("href", event).returnElement();
      } else {
        self.buttons[name] = pen(el).class("header-button Ril").html(name).on("click", event).returnElement();
      }
    } else {
      self.buttons[name] = pen("span").class("header-button Ril").html(name).on("click", event).returnElement();
    }
    return self;
  },
  removeButton: function(name) {
    var self = header;
    pen(self.buttons[name]).remove();
    return self;
  },
  init: function() {
    var brs, i, j, name, self = header;
    pen(self.head).append(self.title);
    for (name in self.buttons) {
      pen(self.head).append(self.buttons[name]);
    }
    pen(body).append(self.head);
    brs = [];
    for (i = j = 0; j <= 4; i = ++j) {
      brs[i] = pen("br").returnElement();
      pen(body).append(brs[i]);
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
  container: pen("div").attr("align", "center").class("wrapper").returnElement(),
  addImage: function(alt, src, img, lnk) {
    if (lnk != null) {
      this.imagaes[alt] = pen("img").attr({
        alt: alt,
        src: `https://github.com/Monochromefx/pen/blob/master/images/${src}`,
        "class": "body-button link"
      }).returnElement();
      return this.links[alt] = pen("a").attr({
        alt: alt,
        href: lnk
      }).html(this.images[alt]).returnElement();
    }
  }
};

var Start = function(e) {
  var init, mouseCl, mouseOu, mouseOv;
  contextmenu.addCommand("reload", (e) => {
    e.preventDefault();
    pen(load).html("reloading...");
    return location.reload();
  }).addCommand("go back", (e) => {
    e.preventDefault();
    pen(load).html("going back...");
    return location.back();
  }).addCommand("go forward", (e) => {
    e.preventDefault();
    pen(load).html("going foward...");
    return location.forward();
  });
  addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextmenu.init(e);
  });
  header.addButton("<img src='https://github.com/Monochromefx/pen/blob/master/GitHub-Mark-64px.png' alt='Github mark'></img>", "https://github.com/Monochromefx/pen", "a").init();
  init = `load took ${Math.round(e.timeStamp)} second(s)`;
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
  return pen(load).on("click", mouseCl);
};

window.onload = Start;
