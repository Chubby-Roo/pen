var dir, error, log;

({log, error, dir} = console);

pen(document).ready(function() {
  var si, size, sty, title, wrapper;
  title = pen("<title id='ttl'>").html("Wrk");
  sty = pen("<link rel='stylesheet' href='style.css' id='sty'>");
  pen(head).append(title, sty);
  wrapper = pen("<div id='wrpr' class='wrapper main'>").appendTo(body).css({
    background: "rgba(200,100,100,.5)",
    height: `${window.innerHeight}px`,
    width: "100%px"
  });
  si = function() {
    return `Width: ${window.innerWidth}<br>Height: ${window.innerHeight}`;
  };
  size = pen(`<p id='sz' class='window-size bottom-right'>${si()}</p>`).appendTo(body);
  size.on("click", function(e) {
    if (size.hasClass("bottom-right") === true) {
      return size.toggle("bottom-right", "bottom-left");
    } else if (size.hasClass("bottom-left") === true) {
      return size.toggle("bottom-left", "top-left");
    } else if (size.hasClass("top-left") === true) {
      return size.toggle("top-left", "top-right");
    } else if (size.hasClass("top-right") === true) {
      return size.toggle("top-right", "bottom-right");
    }
  });
  return pen(window).on("resize", function(e) {
    wrapper.css("height", `${window.innerHeight}px`);
    return size.html(si(), {
      parse: true
    });
  });
});
