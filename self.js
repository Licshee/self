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
}(function self(ctxt){
  var me = this;
  me.self||(me.self=me);

  if(ctxt == null || typeof ctxt !== "object")
    ctxt = { String: String, Object: Object };
  var object = ctxt.Object;
  var object$prototype = object.prototype;
  var object$toString = object$prototype.toString;
  var string = ctxt.String;
  function isString($){ return object$toString.call($) === "[object String]"; }
  function any2string($){ return isString($) ? $ : string($); }

  this.isString = isString;
  this.any2string = any2string;

  var wshOut = me.WScript && function($){ WScript.Echo($); };
  this.log = wshOut || function($){ console.log($); };
  this.msg = wshOut || function($){ alert($); };
  this.echo = wshOut || function(){
    var rx = /\r\n|[\n\r&<>"]/g;
    var map = { '\r\n': "<br/>", '\n': "<br/>", '\r': "<br/>", '&': "&amp;", '<': "&lt;", '>': "&gt;", '"': "&quot;" };
    function escape(m, x, h){ return map[m]; }
    return function($){
      document.writeln(arguments.length ?
       any2string($).replace(rx, escape) + "<br/>"
       : "<br/>");
    };
  }();
});