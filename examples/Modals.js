class Modal {
  constructor(headstr, bodystr, footstr) {
    this.container = pen("div").Class("modal-container").el

    this.head = pen("div").Class("modal-head").el

    this.body = pen("div").Class("modal-body").el

    this.foot = pen("div").Class("modal-foot").el

    this.closebtn = pen("span").Class("close-button").Html("X").el

    function Remove(e) {
      pen(this.container).Remove()
      pen(this.closebtn).removeEventListener("click", Remove)
    }

    pen(this.closebtn).On("click", Remove, {capture: false, once: true})

    this.headText = pen("h2").Class("modal-head-text").Html(headerstr !== null ? headerstr : ''.el)

    this.bodyText = pen("p").Class("modal-body-text").Html(bodystr !== null ? bodystr : '').el

    this.footText = pen("h2").Class("modal-foot-text").Html(footstr !== null ? footstr : '').el

    return this
  }

  setHeadText(str) {
    pen(this.headText).Html(str)
    return this
  }

  setBodyText(str) {
    pen(this.bodyText).Html(str)
    return this
  }

  setFootText(str) {
    pen(this.footText).Html(str)
    return this
  }

  Style(els, stroobj) {
    var el
    if (pen.Type(el) === 'object') {
      for (el in els) {
        pen(this[el]).Css(els[el])
      }
    } else {
      pen(this[el]).Css(stroobj)
    }
    return this
  }

}
