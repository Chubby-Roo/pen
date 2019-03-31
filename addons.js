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

// by: Krorenshima
/* addons:
     pen.fn["<event>"], perm, adds events like 'click' and so on to the proto like in jQuery
     pen["<element>"], perm, adds elements like in the original pen addon, which Pen was inspried by
     sort've lazy implementation for these two ^
     eq (equal to), perm, compares the current element, to another element if they're the same
*/
let events, elements;
// add more if you can please, it'd help a lot.
events = 'click dblclick error mouseover mousemove'.split(/ /);
elements = 'p span div a button input h hr b i u'.split(/ /);
for (let ev of events) {
  if (pen.fn[ev] != null) {/* Already exists */;continue}
  pen.fn[ev] = function (fn) {return pen.fn.on(ev, fn)}
  pen.fn[ev].remove = function () {return pen.fn.off(ev, fn)}
}
for (let el of elements) {
  el = pen('<'+el+'>');
  pen[el] = function (ops = {}, ...children) {
    if (ops.attrs != null) {el.attr(ops.attrs)}
    if (ops.text != null) {el.html(ops.text)}
    if (ops.parent != null) {el.appendTo(ops.parent)}
    if (ops.name != null) {el[ops.name] = el}
    for (let child of children) {
      let type = pen.type(child);
      if (type === 'function') {
        child.call(this);
      }
    }
    return el;
  }
  pen.fn[el] = function (ops = {}, ...children) {
    el.appendTo(this);
    if (ops.attrs != null) {el.attr(ops.attrs)}
    if (ops.text != null) {el.html(ops.text)}
    if (ops.parent != null) {el.appendTo(ops.parent)}
    if (ops.name != null) {el[ops.name] = el}
    ops.parent = ops.parent || this;
    if (ops.parent != null) {el.appendTo(ops.parent)}
    for (let child of children) {
      let type = pen.type(child);
      if (type === 'function') {
        child.call();
      }
    }
    return el;
  }
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
// end
