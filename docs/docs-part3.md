# Docs part 3

Now there are many new methods added to pen. Which hopefully adds more to it,
like such:

```coffee
pencil = new Pen on # cause why the hell not lol
# now since the option is on, you can always turn it off
pencil.changeOption off
# which will turn it off and you would have to do this:
para = pencil.p "moo", id:'para'
# assuming body is defined:
body.appendChild para
# and you can do this or that
# this:
para.innerHTML = "moo cow"
# that:
pencil.Html "#para", "moo cow"
# or even:
pencil.select("#para").innerHTML = "moo cow"
# why do I use moo cow so much?, well I just don't know, moo cow. just moo cow
# also if you're expecting me to be proper with this, I'm not lol I joke and stuff and seeing all this "'i'm fancy and only make my scripts top noch with my talking capabilities'" stuff is boring-
# so why not make it fun?
# now you can also make something with text or an object already defined:
dir = pencil.createWithObj "div", id:'dir' #, text **if** you want it
bacon = pencil.createWithText "p", "I love tuna feesh"
pencil.appendToBody bacon, dir #this method allows you to append as many elements you want as well as <Pen>.appendToHead
```

Now this can be used for many things as an easy fix so that way it won't be as long for the developer
assuming pen is already defined
You can even create a custom modal with this:
```coffee

Modal = (obj) ->
  modcont = pen.createWithObj 'div', class:'modal-container'
  modhead = pen.createWithObj 'div',class:'modal-head'
  btnclose = pen.createWithObj 'span',style:'color:white;', id:'close',"X"
  btnclose.onclick = (e) ->
    modcont.style.display = 'none';
    return
  modbody = pen.createWithObj 'div',class:'modal-body'
  modfoot = pen.createWithObj 'div',class:'modal-foot'
  if obj.header? or obj.head?
    modheadtext = pen.createWithText 'h2',obj.header or obj.head
    modhead.appendChild btnclose
    modhead.appendChild modheadtext
  if obj.body?
    p = pen.createWithText 'p', obj.body
    modbody.appendChild p
  if obj.foot? or obj.footer?
    modfoottext = pen.createWithText 'h2',obj.footer or obj.foot
    modfoot.appendChild modfoottext
  modcont.appendChild modhead
  modcont.appendChild modbody
  modcont.appendChild modfoot
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
