![pen](logo.png)

# Pen

[![Greenkeeper badge](https://badges.greenkeeper.io/Monochromefx/pen.svg)](https://greenkeeper.io/)

Pen is a rather big API but not too big but only big enough for some *ink*.

Pen is an api used to manipulate elements and or create.

It is inspired by [jQuery.js](https://jquery.com/) and follows something similar to [umbrella.js](https://umbrellajs.com/)
And umbrella follows off inspiration of jquery but jquery is a **big** library.

Umbrella is small yes but it follows an **array return**.
Which is rather complicated to debug as well as manipulate if you don't know what you're doing.
```js
u('<p>') // Returns an array in which you HAVE to do this u('<p>')[0]
u('div.with.fifty.elements') // returns an array as well but you have to cycle through each element.
// Just to get to the specific element that you want or need.
```


Which Umbrella does not have loop protection which can cause some bugs.
```html
<p></p>
<span></span>
```
```js
for (var i = 0; i < 15; i++) {
  u('p').append(u('<span>').html("some span"))
  u('span').append(u('<p>').html('some p'))
  // append does not support multiple parameters passed.
}
// this will call a loop
/* Reason why this calls a loop to occur is because no element was assigned a specific class or id or attribute
And so what will happen is that umbrella will interpret each p in the whole document
as well as each span in the whole document and each p and span will also have a p and span inside of those elements
And this will go on for a very long time. More than what is expected.*/
```

Pen was made to make it more similar to Umbrella but does not follow an array.

It's very easy to just manipulate only 1 element per call.
if a variable is set it'll return an object but it will also return the methods with that object

```js
pen('<p>') // returns the object but all you have to do is this: pen('p').el or pen('p').element or not event that if you want to keep the methods
```

The object may look something like this (in v1.1.0 if you're on chrome
and with the latest version of it.)

```js
//I'll be using a p element for this example
pen: {
  attributes: {class: 'moose'},
  style: {display: 'none'},
  events: {click: {func: function (e) {alert("moose");},capture: false},
    keydown: {func: function (e) {alert(e.keyCode);},
      options: {once: true,capture: true}}},
  text: null,
  element: 'p#moose'
  el: 'p#moose',
  tag: 'p',
  Children: NodeList[0]  {0: 'a'},
  Id: 'moose',
  Class: null,
  PARENT: null
}
```

It also supports passing objects but not arrays yet.

But has the same power almost as Umbrella though maybe a bit more but it does not support AJAX as of yet.
It will be available in the near future if not then oh well

# Documentation and examples
[Docs](docs)
[Examples](examples)

# Contribution

Use git if you have it and clone this repository
```batch
git clone https://github.com/Monochromefx/pen.git
```
Adjust fixes if needed to add features you think need to be in it.
Then make a pull request.

# NOTE ABOUT ADVANCED.
IF you are looking forward to using the advanced version of pen.
Then you agree to be okay with your site being slow to load.

The parser in the advanced version is made to check to see.
If there's any sort of attributes and maybe in the future nested elements.

BUT it is slow to check all these. Parse and add
so expect it to be slow. I'm not responsible for your choices.

How to make it less slow is to use the defined functions after the init:
```js
// how to make it less slow
pen("<p>").class("some-class")

// how to do things quicker but slower for the page
pen("<p class='some-class'>")
```
