{log, error, dir} = console
pen(document).ready () ->
  styz = pen "<link rel='stylesheet' href='../../style.css' id='sty'>"
  title = pen "<title id='ttl'>"

  wrapper = pen "<div id='wrpr' class='wrapper'>"
  inWrap = pen "<div id='inWrapper' class='inner-wrapper'>"

  cvs = pen "<canvas id='game' class='game'>"

  relbut = pen "<button id='relbutt' class='reload-btn btn bottom-right free'>Reload Style</button>"

  relbut.click (e) ->
    sty.remove()
    styz.appendTo(head)
    return

  pen body
  .append wrapper

  wrapper.append inWrap, relbut
  inWrap.append cvs

  pen head
  .append title, styz


  start = () ->
    cvs.el.width = 1000
    cvs.el.height = 700
    return

  update = () ->
    return

  interval = setInterval(update, 20)

  component = (@w, @h, @c, @x, @y, @ty, @txt) ->
    @gravity = 0
    @speed = 0
    @ctx = cvs.ctx
    @update = () =>
      @ctx.fillStyle = color
      switch @ty
        when 'text'
          @ctx.font = "#{@w} #{@h}"
          @ctx.fillText @txt, @x,@y
        else
          @ctx.fillRect @x, @y, @w, @h
    @pos = () ->
      @speed += @gravity
      @x += @speedX
      @y += @speedY

  freeEls = pen.$$ ".free"
  freeEls.forEach (freeEl) =>
    freeEl = pen(freeEl)
    freeEl.css("position", "fixed")
    return
