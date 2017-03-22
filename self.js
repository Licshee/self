// HACK: DON'T ADD "use strict" HERE
//       Using *this* pointer to detect the execution environment we are in

this.__lastLoaded__ = function($){
// HACK: DON'T ADD "use strict" HERE
//       Using *this* pointer to detect the execution environment we are in

// HACK: Since we don't have "use strict" so far,
//        it must be some other loader added "use strict",
//        suppose they know what they are doing
if(this == null)
  return $;

// we use global variable __loadedThis__ to control factory behavior
var that = this.__loadedThis__;

// exactly *null* means DO NOT initialize automatically
if(that === null)
  return $;

var self;
// if we have a truthy value, 
// we do initialization work no matter what that value actually is
if(that){
  self = $.call(that);
}else{
  // initialize automatically if executed in browsers
  //  when __loadedThis__ is *undefined*
  if(that == null && this.navigator)
    self = $.call(this);
}
//self.debug(self);
return $;
}(function self($){
  "use strict";
  // use *this* as few as possible since *this* can be non-object
  var me = this;

  if(!me || typeof me !== "object"){
    me = $ && $.Object && $.Object.create && $.Object.create(null)
         || Object.create && Object.create(null) || {};
  }else{
    me.self || (me.self = me);
    if(!me instanceof self)
      $ || ($ = me);
  }

  $ || ($ = Object.create && Object.create(null) || {});
  var object = $.Object || Object;
  var object$prototype = object.prototype;
  var object$toString = object$prototype.toString;

  object$prototype.descendant = descendant;
  if($.descendant != descendant)
    $.descendant = descendant;
  if(me.descendant != descendant)
    me.descendant = descendant;

  var array = $.Array || Array;
  var array$prototype = array.prototype;
  var array$shift = array$prototype.shift;

  function resolve(resolver, parts, $){
    var p = array$shift.call(parts), t;
    if(typeof $ === "string"){
      while((t = resolver(p)) != null)
        p += $ + array$shift.call(parts);
    }else{
      typeof $ === "object" && (t = $);
      while((t = resolver(t, p)) != null)
        p = array$shift.call(parts);
    }
    return t;
  }
  function resolver(){
    if(arguments.length > 1 && arguments[0] != null)
      return arguments[0][arguments[1]];
    return eval(arguments[arguments.length - 1]);
  }

  var string = $.String || String;
  var string$prototype = string.prototype;
  var string$split = string$prototype.split;
  var string$replace = string$prototype.replace;

  function local(path){
    return resolve(resolver, string$split.call(path, '.'));
  }
  function descendant(path){
    return resolve(resolver, string$split.call(path, '.'), this);
  }

  me.resolve = resolve;

  function isString(v){ return object$toString.call(v) === "[object String]"; }
  function any2string(v){ return isString(v) ? v : string(v); }

  me.isString = isString;
  me.any2string = any2string;

  var rxEscapeHTML = /\r\n|[\n\r&<>"]/g;
  var mapEscapeHTML = {
   '"': "&quot;", '&': "&amp;", '<': "&lt;", '>': "&gt;",
   '\n': "<br/>", '\r': "<br/>", '\r\n': "<br/>" };
  function cbEscapeHTML(s){ return mapEscapeHTML[s]; }
  function escapeHTML(s){ return string$replace.call(s, rxEscapeHTML, cbEscapeHTML); };

  me.escapeHTML = escapeHTML;

  function nul(){}
  var stdOut = me.WScript && function(s){ WScript.Echo(s); };

  var msg = me.msg = $.alert && function(s){ $.alert(s); }
   || typeof alert !== "undefined" && alert && function(s){ alert(s); } || stdOut;
  var log = me.log = $.descendant("console.log") && function(v){ $.console.log(v); }
   || typeof console !== "undefined" && console && console.log && function(v){ console.log(v); } || stdOut;
  var debug = me.debug = $.descendant("console.debug") && function(v){ $.console.debug(v); }
   || typeof console !== "undefined" && console && console.debug && function(v){ console.debug(v); } || nul;
  var write = me.write = $.descendant("document.write") && function(s){ $.document.write(s); }
   || typeof document !== "undefined" && document && document.write && function(s){ document.write(s); };
  var echo = me.echo = write && function(v){ document.write((arguments.length ? escapeHTML(any2string(v)) : "") + "<br/>"); } || stdOut;

  debug(me);
  return me;
});
