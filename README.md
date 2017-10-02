![pen](logo.png)

# Pen

[![Greenkeeper badge](https://badges.greenkeeper.io/Monochromefx/pen.svg)](https://greenkeeper.io/)

Pen is a rather big API but not too big but only big enough for some *ink*.

Pen is an api used to manipulate elements and or create.

It is inspired by [jQuery.js](https://jquery.com/) and follows something similar to [umbrella.js](https://umbrellajs.com/)

The object may look something like this (in v1.5.0 if you're on chrome
and with the latest version of chrome.)

```js
//I'll be using a p element for this example
pen: {
  attrs: {id: 'moose'},
  // events was moved inside the el, because, its easier to manage
  text: (...),
  element: 'p#moose'
  el: 'p#moose',
  cel: (...),
  tag: 'p',
  Children:['a'],
  PARENT: null
}
```

It also supports passing objects but not arrays yet.

But has the same power almost as Umbrella though maybe a bit more but it does not support AJAX as of yet.
It will be available in the near future if not then oh well

# Documentation and examples
[Docs](docs)
..:Test:..
[selector](tests/selector/)

There's a selector and a simple game in the works.

# Contribution

Use git if you have it and clone this repository
```batch
git clone https://github.com/Monochromefx/pen.git
```
Adjust fixes if needed to add features you think need to be in it.
Then make a pull request.

## Note about using pen("<p id='someID'>")
When creating an element via: **pen("<p id='someID'>");**
It's much slower than: **pen("<p>").attr('id', 'someID');**
