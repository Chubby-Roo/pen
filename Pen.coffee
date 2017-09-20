pen = do ->
  `var define`
  {log, error, dir} = console
  ```define=()=>{window['body']=document.body;window['pBody']=pen(body);window['head']=document.head;window['pHead']=pen(head)};document.addEventListener("DOMContentLoaded",define,{once:true});vrs={};vrs.class2Type={}
  vrs.names='Boolean Number String Function Array Date RegExp Undefined Null Error Symbol Promise NamedNodeMap Map NodeList DOMTokenList DOMStringMap CSSStyleDeclaration Document Window'.split(/\s+/gi);
  for(var i=0,len=vrs.names.length,name;i<len;++i){name=vrs.names[i];vrs.class2Type[("[object "+name+"]")]=name.toLowerCase()};
  vrs.proto=pro=>pro.prototype;vrs.arr=vrs.proto(Array);vrs.obj=vrs.proto(Object);
  vrs.slice=(vr)=>vrs.arr.slice.call(vr);vrs._toString=(vr)=>vrs.obj.toString.call(vr);
  vrs.type=(obj)=>(vrs.class2Type[vrs._toString(obj)]||'object');
  vrs.regs={};vrs.regs.attribute=/([^\n\ ]*?)=(['"]([^\n'"]*?)['"]|(true|false))/gi;
  vrs.ranDos=(arr)=>arr[Math.floor(Math.random()*arr.length)];
  vrs.str=(regs,flags)=>vrs.type(regs)==='string'?new RegExp(regs,flags):regs;
  vrs.iterate=(arr,times)=>{var res,i;res=[];for(i=0;i<times;++i){res.push(vrs.ranDos(arr))};return res.join('');};
  vrs.parser=(regs,flags)=>{
    regs=vrs.str(regs,(flags||'gi'));
    return (str)=>{
      var obj,reg;
      obj={};
      str=str||'';
      results=str.match(regs);
      reg=/^['"]([^\n]*?)['"]$/m;
      if((results!=null)&&results.length!==0) {
        for(var i=0,len=results.length,match;i<len;++i) {
          match=results[i];
          var name,val;
          if(match.includes("=")===true){
            [name,val]=match.split("=");
            val=val.replace(reg,'$1');
            obj[name]=val;
          };
        };
        return obj;
      };
    };
  };
  vrs.sAS=(str,...els)=>{
    var arr;arr=[];
    for(var i=0,len=els.length;i<len;++i){
      arr.push(str.search(els[i]));
    };
    return arr
  };
  vrs.pErr=(name,msg)=>{var er;er=new Error(msg);er.name=name;throw er};```
  vrs.funcoso = (it, typeso, typesi) =>
    typesi = typesi or typeso
    pz = vrs.type(it.el[typesi])
    func = (propz, nm) =>
      for prop, prp of propz
        res = if nm? then "#{nm}-#{prop}" else prop
        if vrs.type(prp) is 'object' then func prp, res
        else
          if pz is 'function' then it.el[typesi](res, prp)
          else it.el[typesi][res] = prp
      it
    func
  pen = () ->
    args = arguments; return new pen args... if !(@ instanceof pen)
    return args[0] if args[0] instanceof pen
    `this.cel=null;this.attrs=null;this.el=args[0]`
    @start args...
    return
  pen.ink = pen:: = {}
  ```pen.selected = {}; pen.created = {}; pen.$ = (el, ps = false) => {var elshi; elshi = "element"+vrs.elCount++;if (vrs.type(el) === 'string'){selec = document.querySelector(el); pen.selected[elshi] = selec; return ps===true?pen(selec):selec}else{return el}};pen.$$ = (el, ps = false) => {var els, elshi; elshi = "element"+vrs.elCount++;els = vrs.slice(document.querySelectorAll(el)).map(el => {pen.selected[elshi] = el; return ps===true?pen(el):el});return els};pen.create = (el, ps = false) => {var el, elshi; elshi = "element"+vrs.elCount++;el = document.createElement(el);pen.created[elshi] = el; return ps===true?pen(el):el}```
  pen.parse =
    attrs: vrs.parser vrs.regs.attribute
    element: (str) -> [s, e] = vrs.sAS str, '<', '>'; stTag = str.slice(s, e+1); [s, e] = vrs.sAS stTag, ' ', '>'; attribs = stTag.slice(s+1, e); [s, e] = vrs.sAS stTag, '<', ' '; tag = stTag.slice(s+1, e); [s, e] = vrs.sAS str, '>', '</'; text = str.slice(s+1, e); return [str, stTag, (if attribs is "<#{tag}" then null else attribs), tag, (if text is '' then null else text)]
  `pen.genId = (times) => {var arr;arr = "0 1 2 3 4 5 6 7 8 9".split(/\s+/);return ("i"+(vrs.iterate(arr, times)));}`
  pen::start = (ele, ops) ->
    @initOptions ops
    t = vrs.type @el
    if t is 'object' then @partialSetup() else if t is 'string' then @setup @el
    return @
  pen::initOptions = (ops) ->
    @ops =
      parseIt: (if ops? then (ops.parseIt or no) else no)
      create: (if ops? then (ops.create or 'return child') else 'return child')
      html:
        app: (if ops? and ops.html? then (ops.html.app or no) else no)
        parse: (if ops? and ops.html? then (ops.html.parse or no) else no)
    return @
  `pen.ink.toString = function () {return this.cel.outerHTML}`
  pen::setup = (el) ->
    `var whole,startTag,attributes,tag,text`
    t = vrs.type el
    if t is 'string'
      if el.startsWith('<')
        `[whole,startTag,attributes,tag,text]=pen.parse.element(el);attribs=pen.parse.attrs(attributes);this.el=pen.create(tag)`
      else @el = pen.$ el
    else @el = el
    @attr attribs if attribs?
    @html text, parse: yes if text? and text.length is 0
    @partialSetup()
    return
  pen::partialSetup = () ->
    Object.defineProperties @, `{
      tag:{get:function(){return (this.el.tagName||'IOS-ELEMENT').toLowerCase();}},
      cel:{get:function(){return (this.tag==='template'?this.el.content:this.el);}},
      text:{get:function(){return this.html();},set:function(str){return this.html(str);},configurable:true},
      Children:{get:function(){var arr,chi;arr=[];chi=vrs.slice(this.cel.children);for(var i=0,len=chi.length;i<len;++i){arr.push(pen(chi[i]))};return arr},set:function(...els){return this.append(...els)},configurable:true},
      Parent:{get:function(){return (this.el.parentNode||null)},set:function(el){return this.appendTo(el)},configurable:true},
      Classes:{get:function(){return vrs.slice(this.el.classList)},set:function(cls){return this.toggle(cls);},configurable:true},
      attrs:{get:function(){var ar,arr,chi;ar={};arr=[];chi=vrs.slice(this.el.attributes);for(var i=0,len=chi.length,attr;i<len;++i){attr=chi[i];ar[attr.name]=attr.value};return ar},set:function(obj){return this.attr(obj);},configurable:true},
      selector:{get:function(){return this.tag+(this.attrs.id!=null?("#"+this.attrs.id):'')+(this.attrs.class!=null?('.'+this.Classes.join('.')):'')}},
      size:{get:function(){return this.el.getBoundingClientRect()}},
      hidden:{get:function(){return this.css('display')==='none'}}}`
    @el.events = {}
    switch true
      when @el instanceof Document
        @body = window['pBody']
        @head = window['pHead']
        pen::ready = () ->
          args = arguments
          @on 'DOMContentLoaded', args...
          return @
      when @el instanceof Window
        @doc = @el.document
      when @tag is 'template'
        pen::clone = () ->
          args = arguments
          document.importNode args...
      when @tag is 'canvas'
        @ctx = @context = @el.getContext '2d'
    return @
  pen::html = (str, ops) ->
    {parse, app} = @initOptions ops
    res = if parse then 'innerHTML' else 'innerText'
    reg = /input|option|textarea/i
    livi = (prop, str) =>
      if str?
        if reg.test(@tag) is true then @attr 'value', (if app is true then "#{@el.getAttribute('value')}#{str}" else str) else `app === true ? this.el[prop] += str : this.el[prop] = str`
        return @
      else return @el[prop]
    switch @tag
      when 'input', 'textarea' then livi 'value', str
      when 'option'
        return livi res, str
      else return livi res, str
  pen::attr = (attribute, value) ->
    func = vrs.funcoso @, 'attributes', 'setAttribute'
    if attribute?
      if vrs.type(attribute) is 'object' then func(attribute)
      else if value? then @el.setAttribute attribute, value; this
      else @el.getAttribute attribute
    else @attrs
  pen::css = (rule, rules) ->
    func = vrs.funcoso @, 'style'
    if rule?
      switch vrs.type(rule)
        when 'object' then func(rule)
        when 'string'
          if rules?
            rule = rule.replace /-(\w{1})/g, (whole, dash) =>
              dash.toUpperCase()
            @el.style[rule] = rules
            @
          else
            @el.style[rule]
    else
      @el.style
  pen::on = (evtp, cb, cp) ->
    cp = cp or false
    @el.events = @el.events or {}
    `this.el.events[evtp] = {};this.el.events[evtp].capture = cp;this.el.events[evtp][cb.name || 'func'] = cb`
    @el.addEventListener arguments...
    return @
  pen::off = (evtp, cb) ->
    @el.removeEventListener evtp, cb
    delete @el.events[evtp]
    return @
  pen::append = (elements...) ->
    for element in elements
      element = pen.$ element
      elu = (if element instanceof pen then element.el else element)
      @cel.appendChild(elu)
    return @
  pen::appendTo = (element) -> pen(element).append(@); return @
  pen::remove = -> @Parent.removeChild(@el); return @
  pen::$ = (element, parseIt = false) ->
    qur = @cel.querySelector(element)
    result = if @ops.global.parseIt is true then pen(qur) else if parseIt is true then pen(qur) else qur
    return result
  pen::$$ = (element) -> @cel.querySelectorAll(element)
  pen::create = (element, ret) ->
    element = pen(element)
    @append(element)
    if /child|parent/gi.test(ret) is true then result = "return #{ret}"; return `result.endsWith("parent")===true?this:element`
    else return @
  pen::toggle = (classes...) ->
    for classs in classes
      @el.classList.toggle classs
    return @
  pen::hasClass = (cls) ->
    for clss in @Classes
      if clss is cls
        return true
    return false
  pen::hide = () ->
    `this.hidden===true?this.css('display',''):this.css('display','none')`
    return @
  pen.vrs = vrs
  return pen
