var Modal;

Modal = class Modal {
  constructor(headstr, bodystr, footstr) {
    var prefix;
    if (headstr == null) {
      headstr = "I'm a header";
    }
    if (bodystr == null) {
      bodystr = "I'm a body";
    }
    if (footstr == null) {
      footstr = "I'm a footer";
    }
    prefix = 'modal';
    this.container = pen(`<div class='${prefix}-container'>`);
    this.head = pen(`<div class='${prefix}-head'>`);
    this.body = pen(`<div class='${prefix}-body'>`);
    this.foot = pen(`<div class='${prefix}-foot'>`);
    this.closebtn = pen("<span class='close-button'>").html('X');
    this.closebtn.on('click', this.closebtn.remove(), {
      capture: false,
      once: true
    });
    this.headText = pen(`<h2 class='${prefix}-head-text'>`).html(headstr).appendTo(this.head);
    this.bodyText = pen(`<p class='${prefix}-body-text'>`).html(bodystr).appendTo(this.body);
    this.footText = pen(`<h2 class='${prefix}-foot-text'>`).html(footstr).appendTo(this.foot);
    this.container.append(this.closebtn, this.head, this.body, this.foot);
    return;
  }

  setText(el, str) {
    if (!el.endsWith('text')) {
      this[`${el}Text`].html(str);
    } else {
      this[el].html(str);
    }
    return this;
  }

};
