var Tabs;
window.tabs = {};
Tabs = class Tabs extends Container {
  constructor(defaultAction) {
    super('tabs-cont');
    this.default = defaultAction != null ? defaultAction : null;
    this.tabDisp = this.create("<div id='tabDisplay' class='tab-display'>");
    this.pane = this.create("<div id='tabContent' class='tab-content'>");
    this.i = 0;
    this.tabDisp.on('dblclick', () => {
      this.activateDefaultAction();
    });
    return this;
  }

  addTab(title, content) {
    var tab;
    tab = new Tab("<span class='tabs-tab'>", title, this, content);
    if (this.default != null) {
      this.default(tab, this);
    }
    tab.activate();
    return this;
  }

  activateDefaultAction() {
    this.addTab(`Untitled - ${this.i++}`, '');
    return this;
  }

  removeTab(title) {
    tabs[title].remove();
    return this;
  }

  changeTab(title, typ, content) {
    tabs[title].change(typ, content);
    return this;
  }

  activateTab(title) {
    tabs[title].activate();
    return this;
  }

  deactivateTab(title) {
    tabs[title].deactivate();
    return this;
  }

};
