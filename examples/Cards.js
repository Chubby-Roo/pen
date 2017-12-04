var Card;

Card = class Card extends Container {
  constructor(title = "I'm a title", message = "I'm a message") {
    super('card', 'cd');
    this.clsBtn = this.elm('<span>').attr('class','cls btn').html("X");
    this.title = this.elm('<span>').attr('class',`${this.id}-title`).html(title);
    this.msg = this.elm('<span>').attr('class',`${this.id}-msg`).html(message);
    this.clsBtn.on('click', (e) => {this.close()});
    Card.memory[`${this.title.text}${Object.keys(Card.memory).length}`] = this;
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
Card.memory = {};
