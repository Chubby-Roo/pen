# Docs part 2

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
pen("#log").Html "Some new text"
```

It will edit the element and change the text to what was put in.
pen is designed for element creation and selection you just need to put selection on.

Like it can be done with JQuery but it does not have those other functionalities as JQuery.
Let's try to edit the css of the same element knowing that pen is already defined and probably some other things too:

```coffee
pen("#log").css("color", "grey").id "newlog"
```

There are many things that can be done with pen, and there is still more to add, so it won't end there.
Again if you'd like to help leave any suggestions, I'm open for them.
