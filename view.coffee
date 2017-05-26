((window, document, pen) ->
  Ghldnm = undefined
  view = (holdername, views, classes) ->
    if not (this instanceof view)
      return new view(holdername, views, classes)
    else if holdername instanceof view
      for prop of holdernamme
        @[prop] = holdername[prop]
    else
      Ghldnm = @__G_HOLDER_NAME = holdername
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
    view::["remove#{self.__G_HOLDER_NAME}"] = (name, fully) ->
      self = this
      pen(self[self.__G_HOLDER_NAME][name]).remove()
      if fully is true then delete self[self.__G_HOLDER_NAME][name] else undefined
      return self
    return

  view.fn = view:: =
    constructor: view

  view::add = (name, options, ohr = false) ->
    evalCls = () -> if options.extraClasses? then options.extraClasses.split(/\s+/gi).join(' ') else undefined
    self = this
    temp = undefined
    if ohr isnt false
      self[self.__G_HOLDER_NAME][name] = {}
      self[self.__G_HOLDER_NAME][name].el = undefined
      self[self.__G_HOLDER_NAME][name].hr = pen("<br class='#{self.__classes.priorityName}-divider'>")
    if options.event?
      temp = pen "<span align='center' class='#{self.__classes.main} #{self.__classes.type['button']} #{evalCls()}"
      .html options.text
      .on "click", options.event
    else if options.link?
      temp = pen "<span align='center' class='#{self.__classes.main} #{self.__classes.type['link']} #{evalCls()}'"
      .html options.text
      .href options.link
    else if options.custom?
      temp = pen "<sapn align='center' class='#{self.__classes.main} custom #{evalCls()}'>"
    if ohr isnt false
      self[self.___G_HOLDER_NAME][name].el = temp
    else
      self[self.___G_HOLDER_NAME][name] = temp
    return self

  view::init = () ->
    console.log "you'll need to create this yourself"
    return

  view::deploy = (element) ->
    self = this
    pen(element).append(self.important)
    return self
  return
  )(window, document, pen)
