![pen](Logo-2.png)

# Pen

Pen is a rather big API but not too big but only big enough for some *ink*,
is an api used to manipulate elements and or create.

It is inspired by [jQuery.js](https://jquery.com/) and follows something similar to [umbrella.js](https://umbrellajs.com/).

The object may look something like this:
```js
//I'll be using a p element for this example
pen: {
  attrs: (...),
  text: (...),
  el: 'p#moose', tag: 'p',
  Children:(...), parent: null,
  selector: 'p#moose',
  ops: (...)
}
```

---

[Docs](docs) -- for documentation
[Examples](examples) -- for examples on how to create things for yourself or how pen can be used

..:Test:..

[selector](tests/selector/)

There's a selector app that allows you to interact with the webpage itself.

---

## Contribution

Use git if you have it and clone this repository
```batch
git clone https://github.com/James-Chub-Fox/pen.git
```
Adjust fixes if needed to add features you think need to be in it.
Then make a pull request.

## Note about using pen("&lt;p id='someID'&gt;")

When creating an element via: **pen("&lt;p id='someID'&gt;");**

It's much slower than: **pen("&lt;p&gt;").attr('id', 'someID');**

---

## Raw, Production Development links
[Raw](https://raw.githubusercontent.com/Krorenshima/pen/master/Pen.js) | [min](https://raw.githubusercontent.com/Krorenshima/pen/master/Pen.min.js)

[Production](https://cdn.jsdelivr.net/gh/Krorenshima/pen@master/Pen.js) | [min](https://cdn.jsdelivr.net/gh/Krorenshima/pen@master/Pen.min.js)

*(if you're viewing this at https://krorenshima.github.io/pen-web then

[highlight.js](https://highlightjs.org/) & [markdown](https://markdown-it.github.io/))*
