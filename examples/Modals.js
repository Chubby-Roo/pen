var Modal;

Modal = class Modal {
  constructor(headstr, bodystr, footstr) {
    var body, bodyText, closebtn, foot, footText, head, headText, prefix;
    headstr = headstr || "I'm a header";
    bodystr = bodystr || "I'm a body";
    footstr = footstr || "I'm a footer";
    prefix = 'modal';
    this.container = pen(`<div class='${prefix}-container'>`);
    head = pen(`<div class='${prefix}-head'>`);
    body = pen(`<div class='${prefix}-body'>`);
    foot = pen(`<div class='${prefix}-foot'>`);
    closebtn = pen("<span class='close-button'>").html('X');
    closebtn.on('click', closebtn.remove(), {
      capture: false,
      once: true
    });
    headText = pen(`<h2 class='${prefix}-head-text'>`).html(headstr).appendTo(head);
    bodyText = pen(`<p class='${prefix}-body-text'>`).html(bodystr).appendTo(body);
    footText = pen(`<h2 class='${prefix}-foot-text'>`).html(footstr).appendTo(foot);
    this.container.append(closebtn, head, body, foot);
    return this;
  }

};
