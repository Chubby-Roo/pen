let Tabs;

Tabs = class Tabs extends Container {
  constructor() {
    super('tabs-cont');
    this.tabDisp = this.elm('<div>').attr({id:'tabs',class:'tabs'});
    this.pane = this.elm('<div>').attr({id:'tabsDisplay',class:'tabs-display'});
    this.tabs = [];
    return this;
  }

  get length () {
    return this.tabs.length;
  }

  add (title, content) {
    let tab = pen('<span>').attr({class:'tab-title'}),
    obj = {
      name: title,
      content,
      id: this.length,
      el: tab
    };
    this.tabDisp.append(obj.el);
    this.append(obj.content);
    this.tabs.push(obj);
    return this;
  }

  find (ops) {
    ops = ops || {type: 'name'};
    if (ops.data == null) {throw new Error('Data must be defined')}
    this.tabs.filter(tab => {
      if (tab[ops.type] === ops.data) {
        return tab;
      }
    }).pop();
  }
};
