# Docs part 3

Now there are many new methods added to pen. Which hopefully adds more to it,
like such:

```js
var para, dir, bacon, body;
body = document.body
para = pen("<p id='para'>").html("moo");
pen(body).append para;
// and you can do this or that
// this:
para.html("moo cow");
// that:
pen("#para").html("moo cow");
// why do I use moo cow so much?, well I just don't know, moo cow. just moo cow
// also if you're expecting me to be proper with this, I'm not lol I joke and stuff and seeing all this "'i'm fancy and only make my scripts top noch with my talking capabilities'" stuff is boring-
// so why not make it fun?
// now you can also make something with text or an object already defined:
dir = pen("<div id='dir'>");
bacon = pen("<p>").html("I love tuna feesh");
pen(body).append(bacon, dir);
```

Now this can be used for many things as an easy fix so that way it won't be as long for the developer
assuming pen is already defined
You can even create a custom modal with this:
```js
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

// now by doing this next step you created a simple modal
Mymodal = Modal 'Some head text', 'Some body text', 'Some foot text'
console.log Mymodal
```
would return this:
```html
<div class='modal-container'>
  <div class='modal-head'>
    <span class='close-button'>X</span>
    <h2 class='modal-head-text'>Some head text</h2>
  </div>
  <div class='modal-body'>
    <p class="modal-body-text">Some body text</p>
  </div>
  <div class='modal-foot'>
    <h2 class="modal-foot-text">Some foot text</h2>
  </div>
</div>
```

### now go out there and make sure to keep that pen or pencil with you!
