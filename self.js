this.__lastLoaded__ = function($){
if(this == null)
  return $;
var that = this.__loadedThis__;
if(that === null)
  return $;
var self;
if(that)
  self = $.call(that);
else if(that == null && this.navigator)
  self = $.call(this);
//self.debug(self);
return $;
}(function self($){
  "use strict";
  var me = this;

  function resolve(resolver, parts, $){
    var p = parts.shift(), t;
    if(typeof $ === "string"){
      while((t = resolver(p)) != null)
        p += $ + parts.shift();
    }else{
      typeof $ === "object" && (t = $);
      while((t = resolver(t, p)) != null)
        p = parts.shift();
    }
    return t;
  }
  function resolver(){
    if(arguments.length > 1 && arguments[0] != null)
      return arguments[0][arguments[1]];
    return eval(arguments[arguments.length - 1]);
  }
  function local(path){
    return resolve(resolver, path.split('.'));
  }
  function descendant(path){
    return resolve(resolver, path.split('.'), this);
  }

  if(!me || typeof me !== "object"){
    me = local("$.Object.create") && $.Object.create(null)
         || Object.create && Object.create(null) || {};
  }else{
    me.self || (me.self = me);
    if(!me instanceof self)
      $ || ($ = me);
  }

  me.resolve = resolve;

  $ || ($ = Object.create && Object.create(null) || {});
  var object = $.Object || Object;
  var object$prototype = object.prototype;
  var object$toString = object$prototype.toString;

  object$prototype.descendant = descendant;
  if($.descendant != descendant)
    $.descendant = descendant;
  if(me.descendant != descendant)
    me.descendant = descendant;

  var string = $.String || String;
  function isString(v){ return object$toString.call(v) === "[object String]"; }
  function any2string(v){ return isString(v) ? v : string(v); }

  me.isString = isString;
  me.any2string = any2string;

  var rxEscapeHTML = /\r\n|[\n\r&<>"]/g;
  var mapEscapeHTML = {
   '"': "&quot;", '&': "&amp;", '<': "&lt;", '>': "&gt;",
   '\n': "<br/>", '\r': "<br/>", '\r\n': "<br/>" };
  function cbEscapeHTML(s){ return mapEscapeHTML[s]; }
  function escapeHTML(s){ return s.replace(rxEscapeHTML, cbEscapeHTML); };

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
