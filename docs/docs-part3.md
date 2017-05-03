# Docs part 3

Now there are many new methods added to pen. Which hopefully adds more to it,
like such:

```coffee
pen.setOptions "auto append":on
# now since the option is on, you can always turn it off
pen.setOptions "auto append", off
# which will turn it off and you would have to do this:
para = pen("p").Html("moo").Id "para"
# assuming body is defined:
pen(body).Append para
# and you can do this or that
# this:
para.innerHTML = "moo cow"
# that:
pen.setOptions "to selector", true
pen("#para").Html "moo cow"
# or even:
pen("#para").innerHTML = "moo cow"
# why do I use moo cow so much?, well I just don't know, moo cow. just moo cow
# also if you're expecting me to be proper with this, I'm not lol I joke and stuff and seeing all this "'i'm fancy and only make my scripts top noch with my talking capabilities'" stuff is boring-
# so why not make it fun?
# now you can also make something with text or an object already defined:
dir = pen("div").Id 'dir' #, text **if** you want it
bacon = pen("p").Html "I love tuna feesh"
pen(body).Append bacon, dir
```

Now this can be used for many things as an easy fix so that way it won't be as long for the developer
assuming pen is already defined
You can even create a custom modal with this:
```coffee
class Modal
  constructor: (headstr, bodystr, footstr) ->
    @container = pen("div").Class "modal-container"; @head = pen("div").Class "modal-head"

    @body = pen("div").Class "modal-body"; @foot = pen("div").Class "modal-foot"

    @closebtn = pen("span").Class("close-button").Html("X")

    Remove = (e) ->
      pen(@container).Remove(); pen(@closebtn).removeEventListener "click", Remove
      return

    pen(@closebtn).On "click", Remove

    @headText = pen("h2").Class("modal-head-text").Html if headerstr isnt null then headerstr else ''

    @bodyText = pen("p").Class("modal-body-text").Html if bodystr isnt null then bodystr else ''

    @footText = pen("h2").Class("modal-foot-text").Html if footstr isnt null then footstr else ''

    return this

# now by doing this next step you created a simple modal
Mymodal = Modal 'Some head text', 'Some body text', 'Some foot text'
console.log Mymodal
```
would return this:
```html
<div class='modal-container'>
  <div class='modal-head'>
    <span class='close-button'>X</span>
    <h2 class='modal-head-text'>Some head text</h2>
  </div>
  <div class='modal-body'>
    <p class="modal-body-text">Some body text</p>
  </div>
  <div class='modal-foot'>
    <h2 class="modal-foot-text">Some foot text</h2>
  </div>
</div>
```

### now go out there and make sure to keep that pen or pen-cil with you!
