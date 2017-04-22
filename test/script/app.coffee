pen.setOptions
  'auto append': yes
el = pen("a").Attr id: 'cow', href: 'http://www.google.com'
.Html "some text"

pen.options["to selector"] = true

pen "a#cow"
.On "click", (ev) ->
 ev.preventDefault()
 if pen(this).innerHTML is "some text"
  pen(this).Html("Henlo")
  .Css("color", "red")
 else
  pen(this).Html("some text")
  .Css("color", "blue")
 return
