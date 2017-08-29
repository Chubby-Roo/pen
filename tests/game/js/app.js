var dir, error, log;

({log, error, dir} = console);

pen(document).ready(function() {
  var component, cvs, freeEl, freeEls, i, inWrap, interval, len, relbut, results, start, styz, title, update, wrapper;
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
  wrapper.append(inWrap, relbut);
  inWrap.append(cvs);
  pen(head).append(title, styz);
  start = function() {
    cvs.el.width = 1000;
    cvs.el.height = 700;
  };
  update = function() {};
  interval = setInterval(update, 20);
  component = function(w, h, c, x, y, ty, txt) {
    this.w = w;
    this.h = h;
    this.c = c;
    this.x = x;
    this.y = y;
    this.ty = ty;
    this.txt = txt;
    this.gravity = 0;
    this.speed = 0;
    this.ctx = cvs.ctx;
    this.update = () => {
      this.ctx.fillStyle = color;
      switch (this.ty) {
        case 'text':
          this.ctx.font = `${this.w} ${this.h}`;
          return this.ctx.fillText(this.txt, this.x, this.y);
        default:
          return this.ctx.fillRect(this.x, this.y, this.w, this.h);
      }
    };
    return this.pos = function() {
      this.speed += this.gravity;
      this.x += this.speedX;
      return this.y += this.speedY;
    };
  };
  freeEls = pen.$$(".free");
  results = [];
  for (i = 0, len = freeEls.length; i < len; i++) {
    freeEl = freeEls[i];
    freeEl = pen(freeEl);
    results.push(freeEl.css("position", "fixed"));
  }
  return results;
});
