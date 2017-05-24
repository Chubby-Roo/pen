header = {
  buttons: {},
  head: pen('<div class="header">'),
  title: pen('<span class="title Lil">').html(document.title),
  add: function(name, evhr, buttonType = "button", el) {
    var self, temp;
    el = `<${el}>`;
    console.log(name);
    self = header;
    if (evhr instanceof dropdown) {
      temp = pen('<span align="center" class="header-button dropdown Ril">').html(evhr.button.element.outerHTML + evhr.content.element.outerHTML);
      self.buttons[name] = temp;
      return self;
    }
    if (buttonType.match(/link/gi)) {
      temp = pen('<a class="header-button link Ril" href="' + evhr + '">').html(name);
    } else if (buttonType.match(/button/gi)) {
      temp = pen('<span class="header-button Ril">').on('click', evhr).html(name);
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
