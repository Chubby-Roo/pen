let Tab, Tabs;
Tab = class Tab {
  constructor(title, it, content) {
    this.owner = it;
    this.content = content;
    this.el = this.owner.tabDisp.create('<span>', 'child').attr('class', 'tabs-tab');
    this.titleEl = this.el.create('<span>', 'child').html(title).attr('class', 'tabs-tab-title');
    this.clsBtn = this.el.create('<span>', 'child').html('X').attr('class', 'cls-btn btn');
    this.tabContent = this.owner.pane.create('<span>', 'child').attr('class', 'tab-content-display');
    this.parse();
    this.el.on('click', () => {this.activate()}, true);
    this.clsBtn.on('click', (e) => {this.close()});
    Object.defineProperties(this,{title:{get(){return this.titleEl.text},set(data){delete this.owner.tabs[this.titleEl.text];this.titleEl.html(data);this.owner.tabs[data]=this},enumerable:true,configurable:true},active:{get(){return this.tabContent.css('display')===''}},closed:{get(){return this.el.Parent==null}}});
    this.owner.tabs[this.title] = this;
    return this;
  }
  changeContent(data) {
    if (data == null) {
      console.warn('Data was empty');
      return;
    }
    this.content = data;
    this.parse();
    return this;
  }
  activate() {
    if (Object.keys(this.owner.tabs).length !== 0) {for (var name in this.owner.tabs) {this.owner.tabs[name].deactivate()}}
    this.tabContent.css('display','');
    return this;
  }
  deactivate() {
    this.tabContent.css('display', 'none');
    return this;
  }
  close() {
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

Tabs = class Tabs extends Container {
  constructor(defaultAction) {
    super('tabs-cont');
    this.default = defaultAction != null ? defaultAction : null;
    this.tabDisp = this.create('<div>').attr({id:'tabs',class:'tabs'});
    this.pane = this.create('<div>').attr({id:'tabsDisplay',class:'tabs-display'});
    this.tabDisp.on('dblclick',()=>{this.activateDefaultAction()});
    this.tabs = {};
    return this;
  }
  addTab(title, content) {
    var tab = new Tab(title, this, content);
    if (this.default != null) {this.default(tab, this)}
    tab.activate();
    return this;
  }
  removeTab(title) {
    this.tabs[title].remove();
    return this;
  }
  changeTab(title, typ, content) {
    this.tabs[title].change(typ, content);
    return this;
  }
  activateTab(title) {
    this.tabs[title].activate();
    return this;
  }
  deactivateTab(title) {
    this.tabs[title].deactivate();
    return this;
  }
  activateDefaultAction() {
    this.addTab(`Untitled`, '');
    return this;
  }
};
