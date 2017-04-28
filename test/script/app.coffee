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


  get href() ->
    return this.getAttribute('href')

  set href(str) ->
    str = HyperButton.checkString(str)
    this.setAttribute('href', str)

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

  goTo: (e) ->
    pen(this).Html "relocating to #{@cover}..."
    window.location = @href
    return undefined

customElements.define('dav-com', HyperButton)
