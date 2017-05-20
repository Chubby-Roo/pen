# Docs part 1

So **pen** is a small library to enable quick ease to edit the document.

Pen does not have full functionality. It does allow for the ease of creating elements on the fly without
editing the html file itself.

So first let's create a normal _p_ element with html:
```html
<p id="para">some paragraph</p>
```
See how easy that is?

Now let's try to create it in JavaScript without pen:
```js
para = document.createElement('p')
para.id = "para"
para.innerHTML = "some paragraph"
document.body.appendChild(para)
```

Will do the same thing. But it's a longer process, let's try with a **pen**.

```coffee
para = pen("p").html("some text").id('para') # if you want to edit it as well
```

See how much easier that is, it takes less code to do something so simple.

## Warning!
This is a small documentation of it, for this project or library or whatever you may want to call it.

Further information will be provided by, uploaded by, made by, 1 person.
So make sure to keep a **pen** or **pen**cil by your side
