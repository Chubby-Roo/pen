var dir, error, log, Selar, selections;
({log, error, dir} = console);
pen.prototype.enter = function(cb) {
  return this.on('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      return cb(e, this);
    }
  });
};
selections = {};
Selar = class Selar extends Container {
  constructor (el) {
    if (selections[el.selector] == null) {
      super('selection-div');
      el.toggle('selected');
      this.cont.attr("align", 'center');
      this.header = this.addEl(`<h4 class='selector-header'>`).html(el.selector);
      this.highlighter = this.addEl("<button id='highlighter' class='highlighter btn'>Highlight</button>").html('Highlight').on('click', function(e) {
        el.toggle('selected');
      });
      this.changeText = this.addEl("<input id='textChanger' class='text-changer input' placeholder='change the text'>").enter(function(ev, it) {
        el.html(it.text);
        it.html("");
      });
      this.toggler = this.addEl("<input id='toggler' class='toggler input' placeholder='toggle a class'>").enter(function(ev, it) {
        el.toggle(it.text);
        it.html("");
      });
      selections[this.header.text] = this;
      return this;
    } else {
      console.warn(el.selector+" already exists.");
    }
  }
};
pen(document).ready(function() {
  var freeEls, relbut, selector, selectorBtn, selectorInput, sideMsg, styz, title, wrapper;
  styz = pen("<link rel='stylesheet' href='../../style.css'>");
  wrapper = pen("<div id='wrpr' class='wrapper'>");
  title = pen("<title id='ttl'>").html("Selector");
  relbut = pen("<button id='relbutt' class='reload btn bottom-right free'>").html("Reload Style");
  selector = pen("<div id='selectr' class='element-selector' align='center'>");
  selectorInput = selector.create("<input id='selectrInput' class='element-input input' placeholder='Place selector here.'>", 'child');
  selectorBtn = selector.create("<button id='selectrBtn' class='element-selector btn'>", 'child').html("Submit");
  selector.create("<br>");
  sideMsg = selector.create("<p id='sideInfo' class='side-message'>", 'child');
  wrapper.appendTo(pBody);
  pHead.append(title, styz);
  wrapper.append(selector, relbut);
  selectorBtn.on('click', function(e) {
    var el = pen.$(selectorInput.text, true);
    if (el.el != null) {
      selectorInput.html("");
      wrapper.append(new Selar(el).cont);
      setTimeout(function() {el.toggle('selected');}, 1500);
    } else {
      sideMsg.html(`Uh, oh. No element was found with '${val}'. Try something else`);
    }
  });
  selectorInput.on('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      selectorBtn.el.click();
    }
  });
  relbut.on('click', function(e) {
    styz.remove();
    styz.appendTo(pHead);
  });
  freeEls = pen.$$(".free", true);
  for (var i = 0, len = freeEls.length; i < len; i++) {
    freeEls[i].css("position", "fixed");
  }
});
