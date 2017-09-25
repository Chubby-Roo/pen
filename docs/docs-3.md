# Docs part 3

Now there are many new methods added to pen. Which hopefully adds more to it,
like such:

```js
pDoc.ready(() => {

  var para, dir, bacon;
  para = pen("<p id='para'>moo</p>").html("");
  pBody.append(para);
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
  bacon = pen("<p>I love tuna feesh</p>");
  pBody.append(bacon, dir);

})
```

Now this can be used for many things as an easy fix so that way it won't be as long for the developer
assuming pen is already defined
You can even create a custom modal with this:
```js
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

// now by doing this next step you created a simple modal
Mymodal = new Modal('Some head text', 'Some body text', 'Some foot text')
console.log(Mymodal)
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
