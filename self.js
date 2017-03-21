this.__lastLoaded__ = function($){
if(this == null)
  return $;
var that = this.__loadedThis__;
if(that === null)
  return $;
if(that)
  $.call(that);
else if(that == null && this.navigator)
  $.call(this);
return $;
}(function self($){
  "use strict";
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
  var string = $.String || String;
  var object$prototype = object.prototype;
  var object$toString = object$prototype.toString;
  function isString($){ return object$toString.call($) === "[object String]"; }
  function any2string($){ return isString($) ? $ : string($); }

  me.isString = isString;
  me.any2string = any2string;

  var rxEscapeHTML = /\r\n|[\n\r&<>"]/g;
  var mapEscapeHTML = {
   '"': "&quot;", '&': "&amp;", '<': "&lt;", '>': "&gt;",
   '\n': "<br/>", '\r': "<br/>", '\r\n': "<br/>" };
  function cbEscapeHTML($){ return mapEscapeHTML[$]; }
  function escapeHTML($){ return any2string($).replace(rxEscapeHTML, cbEscapeHTML); };
  me.escapeHTML = escapeHTML;

  var stdOut = me.WScript && function($){ WScript.Echo($); };

  var mbox = me.mbox = $.alert && function($1){ $.alert($1); }
   || typeof alert !== "undefined" && alert && function($){ alert($); } || stdOut;
  var log = me.log = $.console && $.console.log && function($1){ $.console.log($1); }
   || typeof console !== "undefined" && console && console.log && function($){ console.log($); } || stdOut;
  var write = me.write = $.document && $.document.write && function($1){ $.document.write($1); }
   || typeof document !== "undefined" && document && document.write && function($){ document.write($); };

  var echo = me.echo = write && function($){
    document.write((arguments.length ? escapeHTML($) : "") + "<br/>");
  } || stdOut;

  log(me)
  return me;
});
