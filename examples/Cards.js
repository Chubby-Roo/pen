var Card;

Card = class Card {
  constructor(title, message) {
    var msgCont, titleCont;
    title = title || "I'm a title";
    message = message || "I'm a message";
    this.container = pen("<div class='cd-container'>");
    titleCont = this.container.create("<span class='cd-title-container'>", 'child');
    msgCont = this.container.create("<span class='cd-msg-container'>", 'child');
    msgCont.create("<span class='cd-msg'>", 'child').html(message);
    titleCont.create("<span class='cd-title'>", 'child').html(title);
    return this;
  }

};
