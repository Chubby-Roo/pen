let styz = pen('<link rel="stylesheet" href="style.css">'),
wrapper = pen('<div id="wrpr" class="wrapper" align="center">'),
txt = pen('<pre id="test-dummy-text">'), ms,
header = new Header('Pen'),
menu = new ContextMenu();
header.link([
  {
    name: 'Selector',
    href: 'tests/selector/index.html'
  }, {
    name: 'Github',
    href: 'https://github.com/Krorenshima/pen/'
  }
]);

ms = markdownit({
  highlight (str,lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class='hljs'><code>${(hljs.highlight(lang, str, true).value)}</code></pre>`;
      } catch (__) {}
    }
    return `<pre class='hljs'><code>${ms.utils.escapeHtml(str)}</code></pre>`;
  }
});

menu.create([
  {
    typ: 'btn',
    name: 'Back',
    act () {
      window.history.back();
    }
  }, {
    typ: 'btn',
    name: 'Forward',
    act () {
      window.history.forward();
    }
  }, {
    typ: 'btn',
    name: 'Reload',
    act () {
      window.location.reload();
    }
  }, {typ:'break'}, {
    typ: 'btn',
    name: 'Reload Style',
    act () {
      styz.remove().appendTo(pHead);
    }
  }
]);

wrapper.append(txt);
pHead.append(styz);
pBody.append(menu.cont, header.cont, wrapper);
fetch('https://raw.githubusercontent.com/Chubby-Roo/pen/master/README.md').then((resp) => {
  return resp.text();
}).then((text) => {
  txt.html(ms.render(text),{parse: true});
});
