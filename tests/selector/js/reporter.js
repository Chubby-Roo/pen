var dir, error, log;

({log, error, dir} = console);

pen(document).ready(function(e) {
  var errorEl;
  return errorEl = function(msg, url, lineNo, colNo, err) {
    var closebttn, message, nameHeader, stack;
    ({stack} = err);
    this.container = pen("<div id='errorCont' class='error-container error'>");
    closebttn = pen("<span id='closeBtn' class='error-cotainer-close-btn btn close'>X</span>");
    nameHeader = pen("<h3 id='errorName' class='error-container-header'>");
    return message = pen("<p id='errorMsg' class='error-container-message'>");
  };
});
