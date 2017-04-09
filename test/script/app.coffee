pen = new Pen
  autoAppend: true
el = pen.a "moo",
  id: "cow"
  , () ->
    @e = pen.p("mee")
    return
