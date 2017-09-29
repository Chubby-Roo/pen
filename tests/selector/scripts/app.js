var dir, error, log;

({log, error, dir} = console);

pen.prototype.enter = function(cb) {
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
  pHead.append(title, styz);
  selector.append(selectorInput, selectorBtn, br, sideMsg);
  wrapper.append(selector, relbut);
  wrapper.appendTo(pBody);
  selr = function(content, el) {
    var changeText, container, grabText, highlight, toggleCls;
    container = pen(`<div id='selectionDiv' class='selection${i}' align='center'>`);
    container.create(`<h4 class='selector-header'>${content}</h4>`, 'child');
    grabText = container.create("<button id='grabber' class='grabber btn'>grab text</button>", 'child').on('click', function(e) {
      return grabText.el.outerHTML = `<p id='grabbed'>"${el.text}"</p>`;
    });
    highlight = container.create("<button id='highlighter' class='highlighter btn'>Highlight</button>", 'child').on('click', function(e) {
      return el.toggle('selected');
    });
    changeText = container.create("<input id='text-change' class='text-changer input' placeholder='change the text'>", 'child').enter(function(ev, it) {
      el.html(it.text);
      return it.text = "";
    });
    toggleCls = container.create("<input id='toggler' class='toggler input' placeholder='toggle class'>", 'child').enter(function(ev, it) {
      el.toggle(it.text);
      return it.text = "";
    });
    return container;
  };
  selectorBtn.on('click', function(e) {
    var el, p, pmo, selec, val, zimo;
    i++;
    val = selectorInput.text;
    selectorInput.html("");
    el = pen.$(val, true);
    if (el.el != null) {
      el.toggle('selected');
      p = new selr(el.selector, el);
      wrapper.append(p);
      selec = function() {
        return el.toggle('selected');
      };
      return setTimeout(selec, 1500);
    } else {
      zimo = pen("<div class='selectionDiv' class='selectionERROR'>");
      zimo.html(`Uh, oh. No element was found with '${val}'. Try something else`);
      pmo = pen("<br>");
      return wrapper.append(zimo, pmo);
    }
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
  freeEls = pen.$$(".free", true);
  results = [];
  for (j = 0, len = freeEls.length; j < len; j++) {
    freeEl = freeEls[j];
    results.push(freeEl.css("position", "fixed"));
  }
  return results;
});
