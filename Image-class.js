imager = function(src, alt, msg = "no message was set") {
  var ion, prop;
  ion = (src, alt, msg) => {
    this.container = pen("<div class='image-view'>");
    this.link = pen(`<a href='${src}'>`);
    this.image = pen(`<img src='${src}' class='image-view-image' alt='${alt}'>`);
    this.title = pen("<span class='image-view-title'>").html(alt);
    this.br = pen("<br class='image-breaker'>");
    this.msg = pen("<span class='image-view-message'>").html(msg);
    return this.link.append(this.title, this.br, this.msg, this.image).appendTo(this.container);
  };
  if (!(this instanceof imager)) {
    return new imager(src, alt, msg);
  } else if (src instanceof imager) {
    for (prop in src) {
      this[prop] = src[prop];
    }
  } else {
    ion(src, alt, msg);
  }
};

imager.fn = imager.prototype = {
  constructor: imager
};

imager.prototype.changeTitle = function(str) {
  this.title.html(str);
  this.image.attr("alt", str);
  return this;
};

imager.prototype.deploy = imager.deployTo = function(element) {
  pen(element).append(this.container);
  return this;
};
