var Tab;

Tab = class Tab {
  constructor(el, title, it, content) {
    this.el = it.tabDisp.create(el, 'child');

    this.title = this.el.create("<span class='tabs-tab-title'>", 'child').html(title);

    this.clsBtn = this.el.create("<span class='cls-btn btn'>", 'child').html("X");

    this.tabContent = it.pane.create("<span class='tab-content-display'>", 'child');

    this.isActive = false;
    this.isClosed = false;
    this.content = content;
    this.parse();

    this.el.on("click", () => {
      this.activate();
    }, true);

    this.clsBtn.on("click", (e) => {
      it.eoxI--;
      this.close();
    });

    tabs[this.title.text] = this;
    return this;
  }

  change(typ, data) {
    switch (typ) {
      case 'content':
      case 'cont':
        this.content = data;
        this.parse();
        break;
      case 'title':
        delete tabs[this.title.text];
        this.title.html(data);
        tabs[this.title.text] = this;
        break;
      default:
        log(`Unknown option: ${typ}`);
    }
    return this;
  }

  activate() {
    var name;
    if (Object.keys(tabs).length !== 0) {
      for (name in tabs) {
        tabs[name].deactivate();
      }
    }
    this.isActive = true;
    this.tabContent.css('display', '');
    return this;
  }

  deactivate() {
    this.isActive = false;
    this.tabContent.css('display', 'none');
    return this;
  }

  close() {
    this.isClosed = true;
    this.el.remove();
    this.deactivate();
    return this;
  }

  remove() {
    this.deactivate();
    this.close();
    this.tabContent.remove();
    delete tabs[this.title.text];
    return void 0;
  }

  parse() {
    if (this.content instanceof pen) {
      this.tabContent.append(this.content);
    } else {
      this.tabContent.html(this.content, {parse: true});
    }
    return this;
  }

};
