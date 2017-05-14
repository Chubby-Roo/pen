class Card {
  constructor(title, message) {
    this.container = pen("div").class("card-container");

    this.titleContainer = pen("div").class("card-title-container");

    this.messageContainer = pen("div").class("card-message-container");

    this.message = pen("span").class("card-message").html(title !== null ? title : '');

    this.title = pen("span").class("card-title").html(message !== null ? message : '');

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
    if (pen.Type(el) === 'object') {
      for (el in els) {
        pen(this[el]).css(els[el]);
      }
    } else {
      pen(this[el]).css(stroobj);
    }
    return this;
  }
};
