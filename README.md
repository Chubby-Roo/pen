# Pen.coffee || Pen.js

A small Module for creating elements in the browser.
This semi-small Module will allow you to easily create **elements** in the browser.

It's now mostly filled out, now instead of using it's old syntax
it's now more defined and refined.

Here's a slice of examples:

```html
<script src="Pen.js"></script>
<script type="text/coffeescript" charset="utf-8">
pen.setOptions "auto append", true
pen("p")
# Will create a paragraph element and due to the automatic appending being true
# it will also be pushed into the document for you, Or you can append it manually
# You can do this by defining a different way
pen.setOptions "auto append", false
par = pen("p").Html("Some text").Id "Time"
pen(par).AppendTo document.body
</script>
```

Now there is no comments in the main file **Pen.js | Pen.coffee**,
Reason being is because I know for a fact that even comments takes up driver space, So it is kept to a minimum or none at all.

### Documentation
[Documentation](https://github.com/Monochromefx/pen-coffee/tree/master/docs)

## Contribution

If you want to contribute then you can either suggest any types of request or mess around with it until an error comes up.
This is not a fully fledged API, and it's not special either.
