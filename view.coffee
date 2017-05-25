view = (holdername, views, classes) ->
  if not (this instanceof view)
    return new view(holdername, views, classes)
  else if holdername instanceof view
    for prop of holdernamme
      @[prop] = holdername[prop]
  else
    @__G_HOLDER_NAME = holdername
    @[holdername] = {}
    @__classes = {}
    for view, i in views
      {name, ele} = view
      if type(ele) is 'string'
        ele = pen ele
      if view.setHTML?
        setHTML = view.setHTML
        ele.html(setHTML)
      if view.important?
        if view.important is true
          @important = @main = ele
      @[name] = ele
    for cls of classes
      @__classes[cls] = classes[cls]
  return

view.fn = view:: =
  constructor: view
  

view::add = (name, options) ->
  self = this
  temp = undefined
  if options.event?
    temp = pen "<span align='center' class='#{self.__classes.main} #{self.__classes.type['button']}"
  self[self.___G_HOLDER_NAME][name] = temp 
  return this

view::deploy = (element) ->
  self = this
  pen(element).append(self.important)
  return this
