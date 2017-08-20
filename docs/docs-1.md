# Documentation part 1

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
var para;
para = pen("<p id='para'>").html("some text").appendTo(document.body);
```

It's a lot quicker to just do those simple stuff
