var Modal;

Modal = class Modal extends Container {
  constructor (name, img, caption) {
    super('modal');
    this.name = name;
    this.src = img;
    this.mark = this.elm("<img>").attr({src:this.src,id:`${this.id}Mark`,class:`${this.id}-mark`})
    .on('click', ()=>{this.open()});
    this.holder = new Container(this.id+'-holder');
    this.holder.cont.css('display', 'none');
    this.append(this.holder);
    this.clsBtn = this.holder.elm('<span>').attr({class:`${this.id}-cls btn`,id:`${this.id}ClsBtn`}).html('X')
    .on('click', ()=>{this.close()}, true);
    this.img = this.holder.elm('<img>').attr({src:this.src,class:`${this.id}-img`,id:`${this.id}Img`});
    this.innerCaption = this.holder.elm('<div>').attr({class:`${this.id}-inner-caption`,id:`${this.id}InnerCaption`});
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
