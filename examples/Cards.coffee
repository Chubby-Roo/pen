pen.setOptions "auto append", false
Card = (obj) ->
  checkEdit = (el) ->
    if obj.contedit?
      el.contentEditable = obj.contedit
    return
  cont = pen("div").Class 'card'
  title = pen("div").Class 'card-title'
  desc = pen("div").Class 'card-desc'
  if obj.title?
    if obj.title instanceof Array is true
      for titles, index in obj.title
        h4 = pen("h4").Html titles
        checkEdit h4
        pen(title).Append h4
    else
      h4 = pen("h4").Html obj.title
      checkEdit h4
      pen(title).Append h4
  if obj.desc?
    if obj.desc instanceof Array is true
      for descs, index in obj.desc
        p = pen("p").Html descs
        checkEdit p
        pen(desc).Append p
    else
      p = pen("p").Html obj.desc
      checkEdit p
      pen(desc).Append p
  return cont
  pen(desc).Append p
