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
     rmattr, temp, removes attributes, without having to repeat yourself
     eq (equal to), perm, compares the current element, to another element if they're the same
*/
pen.fn.rmattr = function (...nms) {
  for (let nm of nms) {
    if (this.attr(nm) == null) {continue}
    this.el.removeAttribute(nm);
  }
  return this;
}
pen.fn.eqto = function (typ, el) {
  el = el instanceof pen ? el.el : el;
  switch (typ) {
    case 'this': return this.el === el;
    case 'parent': return this.parent === el;
  }
}
// end
