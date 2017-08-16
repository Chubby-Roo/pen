var Card;

Card = class Card {
  constructor(title, message) {
    var prefix;
    prefix = "card";
    if (title == null) {
      title = "I'm a title";
    }
    if (message == null) {
      message = "I'm a message";
    }
    this.container = pen(`<div class='${prefix}-container'>`);
    this.titleCont = pen(`<div class='${prefix}-title-container'>`);
    this.msgCont = pen(`<div class='${prefix}-msg-container'>`);
    this.msg = pen(`<span class='${prefix}-msg'>`).html(message).appendTo(this.msgCont);
    this.title = pen(`<span class='${prefix}-title'>`).html(title).appendTo(this.titleCont);
    this.container.append(this.titleCont, this.msgCont);
    return;
  }

  set(el, str) {
    this[el].html(str);
    return this;
  }

};
