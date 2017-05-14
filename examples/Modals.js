class Modal {
  constructor(headstr, bodystr, footstr) {
    this.container = pen("div").class("modal-container")

    this.head = pen("div").class("modal-head")

    this.body = pen("div").class("modal-body")

    this.foot = pen("div").class("modal-foot")

    this.closebtn = pen("span").class("close-button").html("X")

    function Remove(e) {
      pen(this.container).remove()
    }

    pen(this.closebtn).on("click", Remove, {capture: false, once: true})

    this.headText = pen("h2").class("modal-head-text").html(exists(headerstr) ? headerstr : '')

    this.bodyText = pen("p").class("modal-body-text").html(exists(bodystr) ? bodystr : '')

    this.footText = pen("h2").class("modal-foot-text").html(exists(footstr) ? footstr : '')

    return this
  }

  setHeadText(str) {
    pen(this.headText).html(str)
    return this
  }

  setBodyText(str) {
    pen(this.bodyText).html(str)
    return this
  }

  setFootText(str) {
    pen(this.footText).html(str)
    return this
  }

  Style(els, stroobj) {
    var el
    if (pen.Type(el) === 'object') {
      for (el in els) {
        pen(this[el]).css(els[el])
      }
    } else {
      pen(this[el]).css(stroobj)
    }
    return this
  }

}
