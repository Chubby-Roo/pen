# Docs part 3

Now there are many new methods added to pen. Which hopefully adds more to it,
like such:

```js
para = pen("<p>").html("moo").Id "para"
// assuming body is defined:
pen(body).Append para
// and you can do this or that
// this:
para.html("moo cow")
// that:
pen("#para").html "moo cow"
// or even:
pen("#para").innerHTML = "moo cow"
// why do I use moo cow so much?, well I just don't know, moo cow. just moo cow
// also if you're expecting me to be proper with this, I'm not lol I joke and stuff and seeing all this "'i'm fancy and only make my scripts top noch with my talking capabilities'" stuff is boring-
// so why not make it fun?
// now you can also make something with text or an object already defined:
dir = pen("div").id('dir') //, text **if** you want it
bacon = pen("p").html("I love tuna feesh")
pen(body).append(bacon, dir)
```

Now this can be used for many things as an easy fix so that way it won't be as long for the developer
assuming pen is already defined
You can even create a custom modal with this:
```js
class Modal {
  constructor (headstr, bodystr, footstr)  {
    this.container = pen("div").class("modal-container")

    this.head = pen("div").class("modal-head")

    this.body = pen("div").class("modal-body")

    this.foot = pen("div").class("modal-foot")

    this.closebtn = pen("span").class("close-button").html("X")

    Remove = (e) => {
      pen(this.container).remove()
      pen(this.closebtn).off("click")
    }

    pen(this.closebtn).on("click", Remove)

    this.headText = pen("h2")
    .class("modal-head-text")
    .html(exists(headerstr) ? headerstr : '')

    this.bodyText = pen("p")
    .class("modal-body-text")
    .html(exists(bodystr) ? bodystr : '')

    this.footText = pen("h2")
    .class("modal-foot-text")
    .html(exists(footstr) ? footstr : '')
  }
}

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
