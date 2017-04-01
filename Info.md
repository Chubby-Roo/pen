### Pen

The pen constructor which is the main part of the Pen library.
It contains many things used for handling mostly anything, mostly but if something occurs let me know.

### Original Idea

The original idea of pen came from the space-pen module for atom, originally I could not find any sort of library for editing normal documents for browsers. But then I came across space-pen but it was built with jQuery.

#### Not minding

I don't hate the jQuery library, and I have nothing against it, but I think it was an unnecessary mean to do so.
Sure it makes things easier but, some people would rather prefer not to use a big library for the smallest things.

That's why I created pen for there to be a way to edit normal web browser pages for any sort of browser with some help.

### <Pen> - auto append

The auto append is something I made just in case someone wanted to use Pen but didn't want to manually push it into the document.

**That does not mean you can't edit it once it's in the document**, If you set a variable to what you made i.e:
```js
var para = pen.p("", {
  id: 'Some_id'
})
para.innerHTML = "Some text" // or
pen.Html("#Some_id", "Some text")
```
You can then edit it even if it's out of your control, or even like this:
```js
pen.p("", {
  id: 'para'
})
var para = pen.select("#para")
// or even
pen.p("", {
  id: 'para2'
})
var para2 = "#para"
pen.Html(para2 || "#para", "Some text")
```
So everything made by pen can be edited

### Examples

Here are some examples:

[Examples](https://github.com/Monochromefx/pen-coffee/tree/master/examples)
