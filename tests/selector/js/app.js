var dir, error, log;

({log, error, dir} = console);

pen.add({
  enter: function(cb) {
    var it;
    it = this;
    return this.on('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        return cb(e, it);
      }
    });
  }
});

pen(document).ready(function() {
  var br, freeEl, freeEls, i, j, len, relbut, results, selector, selectorBtn, selectorInput, selr, sideMsg, styz, title, wrapper;
  i = 0;
  styz = pen("<link rel='stylesheet' href='style.css' id='sty'>");
  wrapper = pen("<div id='wrpr' class='wrapper'>");
  title = pen("<title id='ttl'>");
  relbut = pen("<button id='relbutt' class='reload-btn btn bottom-right free'>Reload Style</button>");
  selector = pen("<div id='selectr' class='element-selector' align='center'>");
  selectorInput = pen("<input id='selectrInput' class='element-selector-input input' placeholder='Place selector here.'>");
  selectorBtn = pen("<button id='selectrBtn' class='element-selector-btn btn'>Submit</button>");
  br = pen("<br>");
  sideMsg = pen("<p id='sideInfo' class='side-message'>check the console</p>");
  title.html("Wrk");
  pen(head).append(title, styz);
  selector.append(selectorInput, selectorBtn, br, sideMsg);
  wrapper.append(selector, relbut);
  wrapper.appendTo(body);
  selr = function(content, el) {
    var container, grabText, header, highlight, toggleCls;
    container = pen(`<div id='selectionDiv' class='selection${i}' align='center'>`);
    header = pen("<h4 class='header'>").html(content);
    grabText = pen("<button id='grabber' class='grabber-btn btn'>grab text</button>");
    grabText.click(function(e) {
      return grabText.el.outerHTML = `<p id='grabbed'>"${el.html()}"</p>`;
    });
    highlight = pen("<button id='highlighter' class='highlighter-btn btn'>").html("Highlight");
    highlight.click(function(e) {
      return el.toggle('selected');
    });
    toggleCls = pen("<input id='toggler' class='toggler-input input' placeholder='toggle class'>");
    toggleCls.enter(function(ev, it) {
      var val;
      log(it);
      val = it.html();
      it.html("");
      el.toggle(val);
    });
    container.append(header, grabText, highlight, toggleCls);
    return container;
  };
  selectorBtn.click(function(e) {
    var el, p, selec, val;
    i++;
    e.preventDefault();
    val = selectorInput.html();
    selectorInput.html("");
    el = pen.$(val, true);
    el.initLocalName();
    el.toggle('selected');
    p = new selr(el.localName, el);
    wrapper.append(p);
    selec = function() {
      return el.toggle('selected');
    };
    setTimeout(selec, 1500);
    return log(pen.$(val));
  });
  selectorInput.keydown(function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      return selectorBtn.el.click();
    }
  });
  relbut.click(function(e) {
    sty.remove();
    styz.appendTo(head);
  });
  freeEls = pen.$$(".free");
  results = [];
  for (j = 0, len = freeEls.length; j < len; j++) {
    freeEl = freeEls[j];
    freeEl = pen(freeEl);
    results.push(freeEl.css("position", "fixed"));
  }
  return results;
});
