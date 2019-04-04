// this file is entirely for addons.. like things I've come up with for either, if I've not been able to addinto the mainframe... or
// just some features that will not be on the main. Besides you don't need to do anything complex, just do the usual
// source: https://cdn.jsdelivr.net/gh/Krorenshima/Pen@master/Pen.js
// source: https://cdn.jsdelivr.net/gh/Krorenshima/Pen@master/addons.js
// Of course you can add your own addons as well, just do this format:
/*
by: [your name]
optional: addons: [list of addon(s) name(s) here] (name, [optional] temp|perm (temporary|permanent), [optional] short description)
optional: date & time: mm-dd-yy / hh:mm(optional, ss)
(the code)
end
*/

/* addons:
  by: Krorenshima, includes:
     pen.fn["<event>"], perm, adds events like 'click' and so on to the proto like in jQuery
     pen["<element>"], perm, adds elements like in the original pen addon, which Pen was inspried by
     sort've lazy implementation for these two ^

     eq (equal to), perm, compares the current element, to another element if they're the same
     childify, give an array of children and it'll "render" it as html
*/
(function () {
  let events, elements, attributes;
  // add more if you can please, it'd help a lot.
  elements = 'p span div a button input h hr b i u img style link meta br hr table tr tb li ul template textarea'.split(/ /);
  events = 'click dblclick error mouseover mousemove mouseup mousedown keydown keyup keypress load'.split(/ /);
  attributes = 'style title encoding href src rel target cols width height'.split(/ /);
  attributes = attributes.concat(events.map(ev => 'on'+ev));
  for (let ev of events) {
    if (pen.fn[ev] != null) {/* Already exists */;continue}
    pen.fn[ev] = function (fn, ...args) {return pen.fn.on.call(this, ev, fn, ...args)}
    pen.fn[ev].remove = function (fn, ...args) {return pen.fn.off.call(this, ev, fn, ...args)}
    pen.fn[ev].trigger = function (...args) {return pen.fn.fire.call(this, ...args)}
  }
  for (let attr of attributes) {
    if (pen.fn[attr] != null) {/* Already exists */;continue}
    pen.fn[attr] = function (value) {
      if (value == null) {return pen.fn.attr.call(this, attr)}
      pen.fn.attr.call(this, attr, value);
      return this;
    }
  }
  let usuals = {
    opler (ops, el) {
      if (ops.src != null && el.tag === 'img') {el.attr('src', ops.src)}
      if (ops.attrs != null) {el.attr(ops.attrs)}
      if (ops.text != null) {el.html(ops.text)}
      if (ops.name != null && ops.parent != null) {ops.parent[ops.name] = el}
      if (ops.parent != null && el.parent == null) {el.appendTo(ops.parent)}
    },
    handleChildren (it, children) {
      let child, type, comeback;
      for (child of children) {
        type = pen.type(child);
        if (type !== 'function') {throw new Error('a "child" must be a function')}
        comeback = child.call(it, it);
        if (comeback == null || !(comeback instanceof pen)) {throw new Error('the child must return and must be an instance of pen')}
        if (comeback.parent == null) {comeback.appendTo(it)}
      }
    }, handleChildify (child, parent) {
      let tg = child.tag || child.el;
      tg = !tg.startsWith('<') ? '<'+tg : tg;
      tg += !tg.endsWith('>') ? '>' : '';
      let el = parent != null ? parent.create(tg, 'child') : pen(tg);
      if (child.attrs) {el.attr(child.attrs)}
      if (child.text || child.html) {el.html(child.text || child.html)}
      if (child.events) {
        //soon
        for (let eventl in child.events) {
          console.log(eventl);
        }
      }
      if (child.children) {
        el.childify(child.children);
      }
      return el;
    }
  }
  for (let el of elements) {
    let oel = '<'+el+'>';
    if (pen[el] == null) {
      pen[el] = function (ops = {}, ...children) {
        el = pen(oel);
        usuals.opler(ops, el);
        usuals.handleChildren(el, children);
        return el;
      }
    }
    if (pen.fn[el] == null) {
      pen.fn[el] = function (ops = {}, ...children) {
        el = this.create(oel, 'child');
        ops.parent = this;
        usuals.opler(ops, el);
        usuals.handleChildren(el, children);
        return (ops.returnEl != null) && ops.returnEl ? el : this;
      }
    }
  }
  pen.fn.childify = function (children) {
    for (let child of children) {usuals.handleChildify(child, this)}
    return this;
  }
  pen.childify = function (children) {
    let els = [];
    for (let child of children) {els.push(usuals.handleChildify(child))}
    return els.length > 1 ? els : els[0];
  }
  pen.fn.eqto = function (typ, el) {
    el = el instanceof pen ? el.el : el;
    switch (typ) {
      case 'this': return this.el === el;
      case 'parent': return this.parent === el;
      default:
        console.warn("Unknown type: "+typ+"\nResolving to 'this'");
        return this.el === el;
    }
  }
})();
// end
