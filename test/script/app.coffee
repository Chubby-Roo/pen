pen.options["auto append"] = yes
el = pen "a"
.Attr "id", "cow"
.Attr "href", "http://www.google.com"
.Html "Some text"

pen.options["to selector"] = true

pen "a#cow"
.On "click", (ev) ->
 ev.preventDefault()
 if pen(this).Html() is "Some text"
  pen(this).Html("Henlo")
  .Css("color", "red")
 else
  pen(this).Html("Some text")
  .Css("color", "blue")
 return
