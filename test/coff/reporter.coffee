{log, error, dir} = console

pen(document).ready (e) ->
  errorEl = (msg, url, lineNo, colNo, err) ->
    {stack} = err
    @container = pen "<div id='errorCont' class='error-container error'>"
    closebttn = pen "<span id='closeBtn' class='error-cotainer-close-btn btn close'>X</span>"
    nameHeader = pen "<h3 id='errorName' class='error-container-header'>"
    message = pen "<p id='errorMsg' class='error-container-message'>"
