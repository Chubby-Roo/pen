var dir, error, log;

({log, error, dir} = console);

pen(document).ready(function() {
  var cvs, freeEl, freeEls, i, inWrap, len, relbut, results, styz, title, wrapper;
  styz = pen("<link rel='stylesheet' href='style.css' id='sty'>");
  title = pen("<title id='ttl'>");
  wrapper = pen("<div id='wrpr' class='wrapper'>");
  inWrap = pen("<div id='inWrapper' class='inner-wrapper'>");
  cvs = pen("<canvas id='game' class='game'>");
  relbut = pen("<button id='relbutt' class='reload-btn btn bottom-right free'>Reload Style</button>");
  relbut.click(function(e) {
    sty.remove();
    styz.appendTo(head);
  });
  pen(body).append(wrapper);
  wrapper.append(relbut);
  pen(head).append(title, styz);
  freeEls = pen.$$(".free");
  results = [];
  for (i = 0, len = freeEls.length; i < len; i++) {
    freeEl = freeEls[i];
    freeEl = pen(freeEl);
    results.push(freeEl.css("position", "fixed"));
  }
  return results;
});
