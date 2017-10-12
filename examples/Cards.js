var Card, Cards;

Cards = {};

// Going off of Container.js
Card = class Card extends Container {
  constructor(title = "I'm a title", message = "I'm a message") {
    super('card', 'cd');
    this.clsBtn = super.addEl(`<span class='cls-btn'>`).html("X");
    this.title = super.addEl(`<span class='${this._id}-title'>`).html(title);
    this.msg = super.addEl(`<span class='${this._id}-msg'>`).html(message);
    this.clsBtn.on('click', (e) => {
      this.close();
    });
    Cards[this.title.text] = this;
    return this;
  }
  change(typ, data) {
    switch(typ) {
      case 'title':
        this.title.html(data);
        break;
      case 'message':
        this.msg.html(data);
        break;
    }
    return this;
  }
  close() {
    this.cont.remove();
    return this;
  }
};
