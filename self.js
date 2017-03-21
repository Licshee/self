this.__lastLoaded__ = function($){
if(this == null)
  return $;
var that = this.__loadedThis__;
if(that === null)
  return $;
if(typeof that === "object")
  $.call(that);
else if(that == null && this.navigator)
  $.call(this);
return $;
}(function self($){
  var me = this;
  me.self||(me.self=me);

  var object = $ && $.Object || Object;
  var object$prototype = object.prototype;
  var object$toString = object$prototype.toString;
  var string = $ && $.String || String;
  function isString($){ return object$toString.call($) === "[object String]"; }
  function any2string($){ return isString($) ? $ : string($); }

  this.isString = isString;
  this.any2string = any2string;

  var rxEscapeHTML = /\r\n|[\n\r&<>"]/g;
  var mapEscapeHTML = { '\r\n': "<br/>", '\n': "<br/>", '\r': "<br/>", '&': "&amp;", '<': "&lt;", '>': "&gt;", '"': "&quot;" };
  function cbEscapeHTML($){ return mapEscapeHTML[$]; }
  function escapeHTML($){ return any2string($).replace(rxEscapeHTML, cbEscapeHTML); };
  this.escapeHTML = escapeHTML;

  var stdOut = me.WScript && function($){ WScript.Echo($); };
  this.log = stdOut || function($){ console.log($); };
  this.msg = stdOut || function($){ alert($); };
  this.echo = stdOut || function($){
    arguments.length && document.write(escapeHTML($));
    document.write("<br/>");
  };
});
