# pen-js
A small library for creating elements in the browser.

This semi-small library will allow you to easily create **elements** in the browser.
It is a work in progress so you cannot really create all the elements. There is a
automaticObject Handler that is in the Pen class. That will allow for creation of other elements.

Here's a slice of the code:
```html
<script src="Pen.js"></script>
<script>
var pen = new Pen(true) // This allows for automatic appending procedure
pen.p("Some text", {id:'Mono'}) // Will create a paragraph element and due to the automatic appending being true,
// it will also be appended
// You can do this by defining a different way
var pen2 = new Pen(false)
var para = pen.p("Some Other text", {id:'Time'})
document.body.appendChild(para)
</script>
```
