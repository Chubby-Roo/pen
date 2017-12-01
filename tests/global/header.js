let Header;

Header = class Header extends Container {
  constructor (title) {
    title = (title || 'Pen');
    super('header top free', 'hdr');
    this.titleM = this.create('<span>').attr({id:'hdrTitle',class:'header-title'})
    .html(title); if(document!=null){document.title=title}
    Object.defineProperty(this, 'title', {get(){
        return this.titleM.text;
      }, set(str){
        this.titleM.html(str);
        document.title(str);
      },
      configurable:!0, enumerable: !0});
    this.links = {};
    return this;
  }

  link (name, href) {
    var link;
    switch (true) {
      case name.endsWith('del'):
        name = name.split(/ |,/)[0];
        link = this.links[name];
        delete this.links[name];
        if (pen.tools.type(href) === 'boolean') {
          if (href) {
            return this;
          } else {
            return link;
          }
        }
      break;

      default:
        link = this.create('<a>').attr({class:'btn',href}).html(name);
        this.links[link.text] = link;
        return this;
    }
  }
}
