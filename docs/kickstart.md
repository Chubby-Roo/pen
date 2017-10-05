# Kickstarting pen

So *pen* is a small library/API to enable quick ease to manipulate element/document's.

Pen is a lot more in depth than before a few months ago.

So first let's create normal *p* element with html

```html
<p id="para">some paragraph</p>
```

See how easy that is?

Now let's try to create the same thing in JS without any API's

```js
var para, body;
body = document.body
para = document.createElement('p');
para.setAttribute('id', 'para');
para.innerText = "some paragraph";
body.appendChild(para);
```

Rather complicated, easy to understand but a lot of steps **just** to create an element.

Now lets try it with *this* API.

```js
// pDoc and pBody are defined by the script.
// pBody stands for pen-Body which is the pen parsed version of the body element
// pDoc stands for pen-Document which is the same as pBody but its the document
// There's also pWin, pHead, head and body (I think that head and body should be GLOBALLY defined insteadof accessed via document)
pDoc.ready(() => {
  var para;
  para = pen("<p id='para'>some text</p>").appendTo(pBody);
});
```

It's a lot quicker to just do those simple stuff

---

With the latest update you can now edit elements id's, tags, etc
first lets edit some html
So say you already have an html file already filled out. Like so:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Some title</title>
  </head>
  <body>
    <p id="log"></p>
  </body>
</html>
```

And you want to edit that paragraph element with the id of 'log'.
Well you can easily do this by doing this:
(with pen)

```js
pen("#log").html("Some new text");
```

It will edit the element and change the text to what was put in.
pen is designed for element creation and selection you just need to put selection on.

Like it can be done with JQuery but it does not have those other functionalities as JQuery.
Let's try to edit the css of the same element knowing that pen is already defined and probably some other things too:

```js
pen("#log").css("color", "grey").id("newlog");
```

There are many things that can be done with pen, and there is still more to add, so it won't end there.
Again if you'd like to help leave any suggestions, I'm open for them.

---

Now there are many new methods added to pen. Which hopefully adds more to it,
like such:

```js
pDoc.ready(() => {
  var para, dir, bacon;
  para = pen("<p id='para'>");
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
});
```

Now this can be used for many things as an easy fix so that way it won't be as long for the developer
assuming pen is already defined
You can even create a custom modal with this:
```js
var Modal, Modals;

Modals = {};

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
  }
  close () {
    this.cont.remove();
    return this;
  }
};

// now by doing this next step you created a simple modal
Mymodal = new Modal('Some head text', 'Some body text', 'Some foot text');
console.log(Mymodal.cont.el);
```
would return this:
```html
<div class='modal' id='mdl'>
  <span class='close-button'>X</span>
  <h2 class='mdl-head'>Some head text</h2>
  <p class="mdl-body">Some body text</p>
  <h2 class="mdl-foot">Some foot text</h2>
</div>
```

### now go out there and make sure to keep that pen or pencil with you!
