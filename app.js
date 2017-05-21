var Start, body, contextmenu, dropdown, head, header, load, log;

log = navigator.platform.toLowerCase() === 'iphone' ? alert : console.log;

({body, head} = document);

load = pen('<p>').id('loader');

pen(body).append(load);

load.html('loading...');

dropdown = function(btnhtml = 'button') {
  var j, len, prop;
  if (!(this instanceof dropdown)) {
    return new dropdown(btnhtml);
  }
  if (btnhtml instanceof dropdown) {
    for (j = 0, len = btnhtml.length; j < len; j++) {
      prop = btnhtml[j];
      this[prop] = btnhtml[prop];
    }
  } else {
    this.links = {};
    this.container = pen('<div>').class('dropdown');
    this.button = pen('<button>').class('dropdown-button').html(btnhtml);
    this.content = pen('<div>').class('dropdown-content');
    this.container.append(this.button, this.content);
  }
};

dropdown.fn = dropdown.prototype = {
  constructor: dropdown
};

dropdown.prototype.addLink = function(name, link, desc = "no description") {
  var a, hr, min;
  a = pen('<a>').class("dropdown-content-link").html(name + '<br>').href(link);
  min = pen('<span>').class("dropdown-content-link-location").html(link + '<br>');
  min.appendTo(a);
  desc = pen('<span>').class("dropdown-content-link-location").html(desc);
  desc.appendTo(a);
  hr = pen('<hr>').class("dropdown-content-divider");
  this.links[name] = {};
  this.links[name].el = a;
  this.links[name].hr = hr;
  this.content.append(a, hr);
  return this;
};

dropdown.prototype.removeLink = function(name, fully = false) {
  this.links[name].el.remove();
  if (fully === true) {
    delete this.links[name];
  } else {
    null;
  }
  return this;
};

dropdown.prototype.deployTo = dropdown.prototype.deploy = function(element) {
  this.container.appendTo(element);
  return this;
};

dropdown.prototype.css = dropdown.prototype.style = function(element = String, ...optionsObject) {
  this[element].css([...optionsObject]);
  return this;
};

contextmenu = {
  commands: {},
  menu: pen('<div>').class('contextmenu').attr('align', 'center'),
  add: function(name, evhr, commandType = "button", el) {
    var hr, self, temp;
    el = `<${el}>`;
    self = contextmenu;
    hr = pen('<hr>').class('contextmenu-divider');
    if (commandType.match(/link/gi)) {
      temp = pen('<a>').href(evhr).html(name).class('contextmenu-command link');
    } else if (commandType.match(/button/gi)) {
      temp = pen('<span>').on('click', evhr).html(name).class('contextmenu-command');
    } else if (commandType.match(/custom/gi)) {
      if (type(evhr) === 'function') {
        temp = pen(el).on('click', evhr).html(name).class('contextmenu-command custom');
      } else {
        temp = pen(el).href(evhr).html(name).class('contextmenu-command custom');
      }
    }
    self.commands[name] = {};
    self.commands[name].el = temp;
    self.commands[name].hr = hr;
    self.menu.append(self.commands[name].el, self.commands[name].hr);
    return self;
  },
  removeCommand: function(name, fully = false) {
    var self;
    self = contextmenu;
    self.commands[name].el.remove();
    self.commands[name].hr.remove();
    if (fully === true) {
      delete self.commands[name];
    } else {
      void 0;
    }
    return self;
  },
  remove: function() {
    var name, self;
    self = contextmenu;
    for (name in self.commands) {
      self.removeCommand(name);
    }
    return self;
  },
  init: function(e) {
    var name, self;
    self = contextmenu;
    self.menu.css({
      top: `${e.clientY}px`,
      left: `${e.clientX}px`
    });
    for (name in self.commands) {
      self.menu.append(self.commands[name].el.element, self.commands[name].hr.element);
    }
    addEventListener('click', self.remove, {
      once: true
    });
    pen(body).append(self.menu);
    return self;
  }
};

header = {
  buttons: {},
  head: pen('<div>').class('header'),
  title: pen('<span>').class('title Lil').html(document.title),
  add: function(name, evhr, buttonType = "button", el) {
    var self, temp;
    el = `<${el}>`;
    console.log(name);
    self = header;
    if (evhr instanceof dropdown) {
      temp = pen('<span>').html(evhr.container.el.outerHTML).class('header-button custom Ril');
      self.buttons[name] = temp;
      return self;
    }
    if (buttonType.match(/link/gi)) {
      temp = pen('<a>').href(evhr).html(name).class('header-button link Ril');
    } else if (buttonType.match(/button/gi)) {
      temp = pen('<span>').on('click', evhr).html(name).class('header-button Ril');
    } else if (buttonType.match(/custom/gi)) {
      if (type(evhr) === 'function') {
        temp = pen(el).on('click', evhr).html(name).class('header-button custom Ril');
      } else {
        temp = pen(el).href(evhr).html(name).class('header-button custom Ril');
      }
    }
    self.commands[name] = temp;
    return self;
  },
  removeButton: function(name, fully) {
    var self;
    self = header;
    pen(self.buttons[name]).remove();
    if (fully === true) {
      delete self.buttons[name];
    } else {
      void 0;
    }
    return self;
  },
  init: function() {
    var brs, i, j, name, self;
    self = header;
    pen(self.head).append(self.title);
    for (name in self.buttons) {
      pen(self.head).append(self.buttons[name]);
    }
    pen(body).append(self.head);
    brs = [];
    for (i = j = 0; j <= 3; i = ++j) {
      brs[i] = pen('<br>').el;
      body.insertBefore(brs[i], body.childNodes[0]);
    }
    return self;
  }
};

Start = function(e) {
  var init, mouseCl, mouseOu, mouseOv, projects, usualgit;
  contextmenu.add('reload', function(e) {
    e.preventDefault();
    pen(load).html('reloading...');
    location.reload();
  }).add('go back', function(e) {
    e.preventDefault();
    pen(load).html('going back...');
    history.back();
  }).add('go forward', function(e) {
    e.preventDefault();
    pen(load).html('going foward...');
    history.forward();
  }).add('github repo', function(e) {
    e.preventDefault();
    pen(load).html('going to github repo...');
    location.href = 'http://github.com/Monochromefx/pen';
  });
  addEventListener('contextmenu', function(e) {
    var first;
    first = e.path[0];
    if ('tagName' in first) {
      switch (first.tagName.toLowerCase()) {
        case 'img':
          contextmenu.add('go to href', pen(first).src(), 'link');
      }
    }
    e.preventDefault();
    contextmenu.init(e);
  });
  usualgit = "https://github.com/Monochromefx";
  projects = dropdown('projects').addLink("Pen", `${usualgit}/pen`, 'This project').addLink("Schem", `${usualgit}/schem`, 'a multipurpose electron app').addLink("Meso", `${usualgit}/meso`, 'a lightweight javascript in-browser source code editor');
  header.add('pjdropdown', projects);
  header.init();
  mouseOv = function(e) {
    pen(this).html('<br>want to remove this message?, if so just click me', true);
  };
  init = `load took ${Date.now() - timestamp} seconds`;
  mouseOu = function(e) {
    pen(this).html(init);
  };
  mouseCl = function(e) {
    pen(this).remove();
  };
  load.html(init);
  log(init);
  load.on("mouseover", mouseOv);
  load.on("mouseout", mouseOu);
  load.on("click", mouseCl);
};

pen(document).ready(function(e) {
  return Start(e);
});
