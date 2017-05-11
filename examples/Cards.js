class Card {
  constructor(title, message) {
    this.container = pen("div").Class("card-container").el;

    this.titleContainer = pen("div").Class("card-title-container").el;

    this.messageContainer = pen("div").Class("card-message-container").el;

    this.message = pen("span").Class("card-message").Html(title !== null ? title : '').el;

    this.title = pen("span").Class("card-title").Html(message !== null ? message : '').el;

    pen(this.titleContainer).Append(this.title);

    pen(this.messageContainer).Append(this.message);

    pen(this.container).Append(this.titleContainer, this.messageContainer);
  }

  setTitle(str) {
    pen(this.title).Html(str);
    return this;
  }

  setMessage(str) {
    pen(this.message).Html(str);
    return this;
  }

  Style(els, stroobj) {
    var el;
    if (pen.Type(el) === 'object') {
      for (el in els) {
        pen(this[el]).Css(els[el]);
      }
    } else {
      pen(this[el]).Css(stroobj);
    }
    return this;
  }
};
