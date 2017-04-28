body = document.body
head = document.head
class HyperButton extends HTMLElement
  constructor: () ->
    super()
    @name = ''
    @href = '#'
    @cover = ''
    pen(this).On 'click', @goTo

  @checkString: (string) ->
    if string.match /\s+/
      string = string.replace /\s+/, '-'
    return string

  goTo: (e) ->
    pen(this).Html "relocating to #{@cover}..."
    window.location = @href
    return undefined

Object.defineProperty HyperButton, 'name',
  get: () -> this.name
  set: (name) ->
    name = HyperButton.checkString name
    @name = name
    @setAttribute 'name', str
    return undefined

# setName: (str) ->
#   str = HyperButton.checkString str
#   @name = str
#   @setAttribute 'name', str
#   return undefined
#
# setHref: (str) ->
#   str = HyperButton.checkString str
#   @href = str
#   @setAttribute 'href', str
#   return undefined
#
# setCover: (str) ->
#   @cover = str
#   pen(this).Html str
#   return undefined

customElements.define('dav-com', HyperButton)
