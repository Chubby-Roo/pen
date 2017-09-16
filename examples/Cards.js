var Card;

Card = class Card {
  constructor(title, message) {
    var msg, msgCont, titleCont;
    title = title || "I'm a title";
    message = message || "I'm a message";
    this.container = pen("<div class='cd-container'>");
    titleCont = pen("<span class='cd-title-container'>");
    msgCont = pen("<span class='cd-msg-container'>");
    msg = pen("<span class='cd-msg'>").html(message).appendTo(msgCont);
    title = pen("<span class='cd-title'>").html(title).appendTo(titleCont);
    this.container.append(titleCont, msgCont);
    return this;
  }

};
