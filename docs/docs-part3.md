# Docs part 3

Now there are many new methods added to pen. Which hopefully adds more to it,
like such:

```coffee
pen.setOptions "auto append":true
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
pencil("#para").innerHTML = "moo cow"
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

Modal = (obj) ->
  modcont = pen('div').Attr class:'modal-container'
  modhead = pen('div').Attr class:'modal-head'
  btnclose = pen('span').Attr style:'color:white;', id:'close'
  .Html "X"
  btnclose.onclick = (e) ->
    modcont.style.display = 'none';
    return
  modbody = pen('div').Attr class:'modal-body'
  modfoot = pen('div').Attr class:'modal-foot'
  if obj.header? or obj.head?
    modheadtext = pen('h2').Html obj.header or obj.head
    pen(modhead).Append btnclose, modheadtext
  if obj.body?
    p = pen('p').Html obj.body
    pen(modbody).Append p
  if obj.foot? or obj.footer?
    modfoottext = pen('h2').Html obj.footer or obj.foot
    pen(modfoot).Append modfoottext
  pen(modcont).Append modhead, modbody, modfoot
  return modcont
# now by doing this next step you created a simple modal
Mymodal = Modal head: 'Some head text', body:'Some body text', foot:'Some foot text'
console.log Mymodal
```
would return this:
```html
<div id='modal-container'>
  <div id='modal-head'>
    <span id='close'>X</span>
    <h2>Some head text</h2>
  </div>
  <div id='modal-body'>
    <p>Some body text</p>
  </div>
  <div id='modal-foot'>
    <h2>Some foot text</h2>
  </div>
</div>
```

### now go out there and make sure to keep that pen or pen-cil with you!
