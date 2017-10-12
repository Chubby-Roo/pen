var Modal, Modals;

Modals = {};

// Going off of Container.js
Modal = class Modal extends Container {
  constructor(headstr = "I'm a header", bodystr = "I'm a body", footstr = "I'm a footer", id) {
    id = id || Math.random() * 189416498791;
    super('modal', 'mdl');
    this.clsBtn = super.addEl("<span class='cls-btn'>").html('X').on('click', (e) => {
      this.close();
    });
    this.head = super.addEl(`<h2 class='${this._id}-head'>`).html(headstr);
    this.body = super.addEl(`<p class='${this._id}-body'>`).html(bodystr);
    this.foot = super.addEl(`<h2 class='${this._id}-foot'>`).html(footstr);
    Modals[id] = this;
    return this;
  }
  change (typ, data) {
    this[typ].html(data);
    return this;
  }
  close () {
    this.cont.remove();
    return this;
  }
};
