var dir, error, log;

({log, error, dir} = console);

document.addEventListener("DOMContentLoaded", function () {
  var br, freeEl, freeEls, i, j, len, relbut, results, selector, selectorBtn, selectorInput, selr, sideMsg, styz, title, wrapper;
  i = 0;
  styz = document.createElement("link");
  styz.setAttribute("rel", "stylesheet");
  styz.setAttribute("href", "style.css");
  styz.setAttribute("id", "sty");

  wrapper = document.createElement("div");
  wrapper.setAttribute("id", "wrpr");
  wrapper.setAttribute("class", "wrapper main");

  title = document.createElement("title");
  title.setAttribute("id", "ttl");
  title.innerText = "Wrk";

  relbut = document.createElement("button");
  relbut.setAttribute("id",  "relbutt");
  relbut.setAttribute("class", "reload-btn btn bottom-right free");
  relbut.innerText = "Reload Style";

  selector = document.createElement("div");
  selector.setAttribute("id", "selectr");
  selector.setAttribute("class", "element-selector");

  selectorInput = document.createElement("input");
  selectorInput.setAttribute("id", "selectrInput");
  selectorInput.setAttribute("class", "element-selector-input input");
  selectorInput.setAttribute("placeholder", "Place selector here.");

  selectorBtn = document.createElement("input");
  selectorBtn.setAttribute("id", "selectrBtn");
  selectorBtn.setAttribute("class", "element-selector-btn btn");
  selectorBtn.innerText = "Submit";

  br = document.createElement("br");
  sideMsg = document.createElement('p');
  sideMsg.setAttribute("id", "sideInfo");
  sideMsg.setAttribute("class", "side-message");
  sideMsg.innerText = "check the console";

  head.appendChild(title);
  head.appendChild(styz);

  selector.appendChild(selectorInput);
  selector.appendChild(selectorBtn);
  selector.appendChild(br);
  selector.appendChild(sideMsg);

  wrapper.appendChild(selector);
  wrapper.appendChild(relbut);

  body.appendChild(wrapper);

  selr = function(content, el) {
    var container, grabText, header;
    container = document.createElement('div');
    container.setAttribute("id", "selectionDiv");
    container.setAttribute("class", `selection${i}`);
    container.setAttribute("align", "center");

    header = document.createElement("h4");
    header.setAttribute("id", "header");
    header.innerText = content;

    grabText = document.createElement("button");
    grabText.setAttribute("id", "grabber");
    grabText.setAttribute("classs", "grabber-btn btn");
    grabText.innerText = "grab text";
    grabText.addEventListener("click", function(e) {
      return grabText.outerHTML = `<p id='grabbed'>\"${el.innerText}\"</p>`;
    });

    container.appendChild(header);
    container.appendChild(grabText);
    return container;
  };

  selectorBtn.addEventListener("click", function(e) {
    var el, p, selec, val;
    i++;
    e.preventDefault();
    val = selectorInput.value;
    selectorInput.value = "";
    el = document.querySelector(val);
    el.classList.toggle('selected');
    p = new selr(`${el.tagName.toLowerCase()}${if (el.hasAttribute('id')) {"#"+el.getAttribute("id")} else {""}}${if (el.hasAttribute('class')) {`.${Array.prototype.slice.call(el.classList).join('.')}`}}`, el);
    wrapper.appendChild(p);
    selec = function() {
      return el.classList.toggle('selected');
    };
    setTimeout(selec, 1500);
    return log(document.querySelector(val));
  });

  selectorInput.addEventListener("keydown", function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      return selectorBtn.click();
    }
  });

  relbut.click(function(e) {
    sty.remove();
    head.appendChild(styz);
  });

  freeEls = document.querySelectorAll(".free");
  for (j = 0, len = freeEls.length; j < len; j++) {
    freeEl = freeEls[j];
    freeEl.style['position'] = 'fixed';
  }
