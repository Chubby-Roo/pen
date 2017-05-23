contextmenu = {
  commands: {},
  menu: pen('<div class="contextmenu">').attr('align', 'center'),
  add: function(name, evhr, commandType = "button", el) {
    var hr, self, temp;
    el = `<${el}>`;
    self = contextmenu;
    hr = pen('<hr class="contextmenu-divider">');
    if (commandType.match(/link/gi)) {
      temp = pen('<a href="' + evhr + '" class="contextmenu-command link">').html(name);
    } else if (commandType.match(/button/gi)) {
      temp = pen('<span class="contextmenu-command">').on('click', evhr).html(name);
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
