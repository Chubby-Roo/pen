# Examples!

Here's the examples path, this will show you examples straight from the creator.

Since literally I'm the only one working on this project OWO

---

## Container

This example is shown to see what you can do with an element manager
Container or 'Cont' is a way to manage a div better or how I manage it
its like a view but has its own functions to help along

```js
var Container;
Container = class Container {
  constructor (cls, id) {
    this.cont = pen("<div>").attr({class:cls,id:id||pen.tools.cc(cls)});
    this.els = {};
    Object.defineProperties(this,{
      id:{
        get(){return this.cont.attr('id')},
        set(str){return this.cont.attr('id',str)},
        configurable:true,enumerable:true
      }, class:{
        get(){return this.cont.attr('class')},
        set(str){this.cont.attr('class',str);str=pen.tools.cc(str);this.id=str;return this},
        configurable:true,enumerable:true
      }
    });
    return this;
  }
  create (el, cb) {
    el = this.cont.create(el, 'child'); el = cb != null ? cb(el) : el;
    this.els[el.selector] = el;
    return cb != null ? this : el;
  }
  remove (el, perm = false) {
    el = el instanceof pen ? el.selector : el;
    this.els[el].remove();
    perm ? delete this.els[el] : null;
    return perm ? this : this.els[el];
  }
  deploy (el) {
    this.cont.appendTo(el);
    return this;
  }
  destory () {
    this.cont.remove();
    return this;
  }
  toString() {
    var keys = Object.keys(this.els);
    return `<Container ${this.cont.selector}${keys.length !== 0 ? `, Els:${keys.length}` : ''}>`;
  }
  append(...els) {
    for (var i = 0, len = els.length; i < len; i++) {
      els[i] = els[i] instanceof Container ? els[i].cont : els[i];
      this.cont.append(els[i]);
    }
    return this;
  }
};
```

---

## Modal

This example shows what using a container would look like to make a modal
modals are either image holders or HBF (Head-Body-Footer)'s

```js
var Modal;
Modal = class Modal extends Container {
  constructor (name, img, caption) {
    super('modal');
    this.name = name;
    this.src = img;
    this.mark = this.create("<img>").attr({src:this.src,id:`${this.id}Mark`,class:`${this.id}-mark`})
    .on('click', ()=>{this.open()});
    this.holder = new Container(this.id+'-holder');
    this.holder.cont.css('display', 'none');
    this.append(this.holder);
    this.clsBtn = this.holder.create('<span>').attr({class:`${this.id}-cls btn`,id:`${this.id}ClsBtn`}).html('X')
    .on('click', ()=>{this.close()}, true);
    this.img = this.holder.create('<img>').attr({src:this.src,class:`${this.id}-img`,id:`${this.id}Img`});
    this.innerCaption = this.holder.create('<div>').attr({class:`${this.id}-inner-caption`,id:`${this.id}InnerCaption`});
    Object.defineProperty(this, 'closed', {get(){return this.holder.cont.css('display')==='none'},enumerable: true});
    Object.defineProperty(this, 'caption', {get(){return this.innerCaption.text}, enumerable: true});
    Modal.memory[`${this.name}${Object.keys(Modal.memory).length}`] = this;
    this.innerCaption.html(caption);
    return this.closed ? this : (this.close(), this);
  }
  change(typ, data) {
		switch (typ) {
			case 'image': case 'img':
				this.src = data;
				this.img.attr('src', this.src);
        this.mark.attr('src', this.src);
				break;
			case 'caption':
        this.innerCaption.html(data);
				break;
			default:
				log(`Unknown option: ${typ}`);
		};
		return this;
	}
	deploy(el) {
  	super.deploy(el);
		return this;
	}
	close() {
		this.holder.cont.css('display', 'none');
		return this;
	}
	open() {
		this.holder.cont.css('display', '');
		return this;
	}
	remove(perm = false) {
		super.remove();
		if (perm === false){delete Modals[this.name]}
		return this;
	}
}
Modal.memory = {};
```

---

## Card

This example is to show you can create a simple card while also using code from the container

```js
var Card;
Card = class Card extends Container {
  constructor(title = "I'm a title", message = "I'm a message") {
    super('card', 'cd');
    this.clsBtn = this.addEl('<span>').attr('class','cls btn').html("X");
    this.title = this.addEl('<span>').attr('class',`${this.id}-title`).html(title);
    this.msg = this.addEl('<span>').attr('class',`${this.id}-msg`).html(message);
    this.clsBtn.on('click', (e) => {this.close()});
    Card.memory[`${this.title.text}${Object.keys(Card.memory).length}`] = this;
    return this;
  }
  change(typ, data) {
    switch(typ) {
      case 'title':
        this.title.html(data);
        break;
      case 'message':
        this.msg.html(data);
        break;
    }
    return this;
  }
  close() {
    this.cont.remove();
    return this;
  }
};
Card.memory = {};
```
