var dropdown;

dropdown = function(btnhtml = 'button') {
  var i, len, prop;
  if (!(this instanceof dropdown)) {
    return new dropdown(btnhtml);
  }
  if (btnhtml instanceof dropdown) {
    for (i = 0, len = btnhtml.length; i < len; i++) {
      prop = btnhtml[i];
      this[prop] = btnhtml[prop];
    }
  } else {
    this.links = {};
    this.container = pen('<div class="dropdown">');
    this.button = pen('<button class="dropdown-button">').html(btnhtml);
    this.content = pen('<div class="dropdown-content">');
    this.container.append(this.button, this.content);
  }
};

dropdown.fn = dropdown.prototype = {
  constructor: dropdown
};

dropdown.prototype.addLink = function(name, link, desc = "no description") {
  var a, hr, min;
  a = pen('<a class="dropdown-content-link" href="' + link + '">').html(name + '<br>');
  min = pen('<span class="dropdown-content-link-location">').html(link + '<br>');
  min.appendTo(a);
  desc = pen('<span class="dropdown-content-link-location">').html(desc);
  desc.appendTo(a);
  hr = pen('<hr class="dropdown-content-divider">');
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

dropdown.prototype.embedInto = function(element) {
  return this.button.el.outerHTML + this.content.el.outerHTML;
};
