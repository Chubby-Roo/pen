(function(window, document, pen) {
  var Ghldnm, view;
  Ghldnm = void 0;
  view = function(holdername, views, classes) {
    var cls, ele, i, j, len, name, prop, setHTML;
    if (!(this instanceof view)) {
      return new view(holdername, views, classes);
    } else if (holdername instanceof view) {
      for (prop in holdernamme) {
        this[prop] = holdername[prop];
      }
    } else {
      Ghldnm = this.__G_HOLDER_NAME = holdername;
      this[holdername] = {};
      this.__classes = {};
      for (i = j = 0, len = views.length; j < len; i = ++j) {
        view = views[i];
        ({name, ele} = view);
        if (type(ele) === 'string') {
          ele = pen(ele);
        }
        if (view.setHTML != null) {
          setHTML = view.setHTML;
          ele.html(setHTML);
        }
        if (view.important != null) {
          if (view.important === true) {
            this.important = this.main = ele;
          }
        }
        this[name] = ele;
      }
      for (cls in classes) {
        this.__classes[cls] = classes[cls];
      }
    }
    view.prototype[`remove${holdername}s`] = function(name, fully) {
      var self;
      self = this;
      pen(self[self.__G_HOLDER_NAME][name]).remove();
      if (fully === true) {
        delete self[self.__G_HOLDER_NAME][name];
      } else {
        void 0;
      }
      return self;
    };
    view.prototype[`edit${holdername}s`] = function(name) {
      var self;
      self = this;
      return self[self.__G_HOLDER_NAME][name];
    };
  };
  view.fn = view.prototype = {
    constructor: view
  };
  view.prototype.add = function(name, options, ohr = false) {
    var evalCls, self, temp;
    evalCls = function() {
      if (options.extraClasses != null) {
        return options.extraClasses.split(/\s+/gi).join(' ');
      } else {
        return void 0;
      }
    };
    self = this;
    temp = void 0;
    if (ohr !== false) {
      self[self.__G_HOLDER_NAME][name] = {};
      self[self.__G_HOLDER_NAME][name].el = void 0;
      self[self.__G_HOLDER_NAME][name].hr = pen(`<br class='${self.__classes.priorityName}-divider'>`);
    }
    if (options.event != null) {
      temp = pen(`<span align='center' class='${self.__classes.main} ${self.__classes.type['button']} ${evalCls()}`).html(options.text).on("click", options.event);
    } else if (options.link != null) {
      temp = pen(`<span align='center' class='${self.__classes.main} ${self.__classes.type['link']} ${evalCls()}'`).html(options.text).href(options.link);
    } else if (options.custom != null) {
      temp = pen(`<sapn align='center' class='${self.__classes.main} custom ${evalCls()}'>`);
    }
    if (ohr !== false) {
      self[self.___G_HOLDER_NAME][name].el = temp;
    } else {
      self[self.___G_HOLDER_NAME][name] = temp;
    }
    return self;
  };
  view.prototype.init = function() {
    console.log("you'll need to create this yourself");
  };
  view.prototype.deploy = function(element) {
    var self;
    self = this;
    pen(element).append(self.important);
    return self;
  };
  window.view = view;
  return view;
})(window, document, pen);
