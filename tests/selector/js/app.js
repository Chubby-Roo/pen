var dir, error, log;

({log, error, dir} = console);

pen.ink.enter = function(cb) {
  var it;
  it = this;
  return this.on('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      return cb(e, it);
    }
  });
};

pen(document).ready(function() {
  var br, freeEl, freeEls, i, j, len, relbut, results, selector, selectorBtn, selectorInput, selr, sideMsg, styz, title, wrapper;
  i = 0;
  styz = pen("<link rel='stylesheet' href='../../style.css' id='sty'>");
  wrapper = pen("<div id='wrpr' class='wrapper'>");
  title = pen("<title id='ttl'>");
  relbut = pen("<button id='relbutt' class='reload btn bottom-right free'>Reload Style</button>");
  selector = pen("<div id='selectr' class='element-selector' align='center'>");
  selectorInput = pen("<input id='selectrInput' class='element-input input' placeholder='Place selector here.'>");
  selectorBtn = pen("<button id='selectrBtn' class='element-selector btn'>Submit</button>");
  br = pen("<br>");
  sideMsg = pen("<p id='sideInfo' class='side-message'>check the console</p>");
  title.html("Wrk");
  pen(head).append(title, styz);
  selector.append(selectorInput, selectorBtn, br, sideMsg);
  wrapper.append(selector, relbut);
  wrapper.appendTo(body);
  selr = function(content, el) {
    var changeText, container, grabText, header, highlight, toggleCls;
    container = pen(`<div id='selectionDiv' class='selection${i}' align='center'>`);
    header = pen(`<h4 class='selector-header'>${content}</h4>`);
    grabText = pen("<button id='grabber' class='grabber btn'>grab text</button>");
    highlight = pen("<button id='highlighter' class='highlighter btn'>Highlight</button>");
    changeText = pen("<input id='text-change' class='text-changer input' placeholder='change the text'>");
    toggleCls = pen("<input id='toggler' class='toggler input' placeholder='toggle class'>");
    grabText.on('click', function(e) {
      return grabText.el.outerHTML = `<p id='grabbed'>"${el.text}"</p>`;
    });
    highlight.on('click', function(e) {
      return el.toggle('selected');
    });
    toggleCls.enter(function(ev, it) {
      el.toggle(it.text);
      return it.text = "";
    });
    changeText.enter(function(ev, it) {
      el.html(it.text);
      return it.text = "";
    });
    container.append(header, grabText, highlight, toggleCls, changeText);
    return container;
  };
  selectorBtn.on('click', function(e) {
    var el, p, selec, val;
    i++;
    val = selectorInput.text;
    selectorInput.html("");
    el = pen.$(val, true);
    el.toggle('selected');
    p = new selr(el.selector, el);
    wrapper.append(p);
    selec = function() {
      return el.toggle('selected');
    };
    return setTimeout(selec, 1500);
  });
  selectorInput.on('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      return selectorBtn.el.click();
    }
  });
  relbut.on('click', function(e) {
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
