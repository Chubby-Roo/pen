var Modal;

Modal = class Modal {
  constructor(headstr, bodystr, footstr) {
    var closebtn, mbody, mfoot, mhead, prefix;
    headstr = headstr || "I'm a header";
    bodystr = bodystr || "I'm a body";
    footstr = footstr || "I'm a footer";
    prefix = 'modal';
    this.container = pen(`<div class='${prefix}-container'>`);
    mhead = pen(`<div class='${prefix}-head'>`).create(`<h2 class='${prefix}-head-text'>`, 'child').html(headstr);
    mbody = pen(`<div class='${prefix}-body'>`).create(`<p class='${prefix}-body-text'>`, 'child').html(bodystr).appendTo(body);
    mfoot = pen(`<div class='${prefix}-foot'>`).child(`<h2 class='${prefix}-foot-text'>`, 'child').html(footstr).appendTo(foot);
    closebtn = pen("<span class='close-button'>").html('X').on('click', closebtn.remove(), {
      capture: false,
      once: true
    });
    this.container.append(closebtn, mhead, mbody, mfoot);
    return this;
  }

};
