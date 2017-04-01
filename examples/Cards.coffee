pen = new Pen on
Card = (obj) ->
  checkEdit = (el) ->
    if obj.contedit?
      el.contentEditable = obj.contedit
    return
  cont = pen.createWithObj "div", class:'card'
  title = pen.createWithObj "div", class:'card-title'
  desc = pen.createWithObj "div", class:'card-desc'
  if obj.title?
    if obj.title instanceof Array is true
      i = 0
      while i < obj.title.length
        h4 = pen.createWithText "h4", obj.title[i]
        h4 = checkEdit h4
        pen.Append title, h4
        i++
    else
      h4 = pen.createWithText "h4", obj.title
      h4 = checkEdit h4
      pen.Append title, h4
  if obj.desc?
    if obj.desc instanceof Array is true
      i = 0
      while i < obj.desc.length
        p = pen.createWithText "p", obj.desc[i]
        p = checkEdit p
        pen.Append desc, p
        i++
    else
      p = pen.createWithText "p", obj.desc
      p = checkEdit p
      pen.Append desc, p
  return cont
