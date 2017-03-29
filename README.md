# pen.coffee
A small library for creating elements in the browser.

This semi-small library will allow you to easily create **elements** in the browser.
It is a work in progress so you cannot really create all the elements. There is a
automatic Object Handler that is in the Pen class. That will allow for creation of other elements.

Here's a slice of the code:
```html
<script src="Pen.js"></script>
<script type="text/coffeescript" charset="utf-8">
pen = new Pen on # This allows for automatic appending procedure
pen.p "Some text", id:'Mono' # Will create a paragraph element and due to the automatic appending being true,
# it will also be appended
# You can do this by defining a different way
pen2 = new Pen off
para = pen.p "Some Other text", id:'Time'
document.body.appendChild para
</script>
```

Now there is no comments in the main file **Pen.js | Pen.coffee**,
Reason being is because I know for a fact that even comments takes up driver space, So it is kept to a minimum.
Documentation will be completed soon.

## Contribution

If you want to contribute then you can either suggest any types of request or mess around with it until an error comes up.
This is not a fully fledged library, and it's not special either.

[Documentation](https://github.com/Monochromefx/pen-coffee/tree/master/docs)
