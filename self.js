this.__lastLoaded__ = function($){
this && $.call(this);
return $;
}(function self(){
  var me = this;
  me.self||(me.self=me);
  var wshOut = me.WScript && function($){ WScript.Echo($); };
  this.log = wshOut || function($){ console.log($); };
  this.msg = wshOut || function($){ alert($); };
  this.print = wshOut || function(){
    var rx = /[&<>"]/g;
    var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'};
    function escape(m, x, h){ return map[m]; }
    return function($){ document.writeln($.replace(rx, escape)); };
  }();
});

print('<&br">');