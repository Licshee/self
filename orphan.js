Orphan = function(){
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src="javascript:;";
  document.documentElement.appendChild(iframe);
  var root = iframe.contentWindow;
  //iframe.parentNode.removeChild(iframe);
  var orphan = root.Object.prototype;

  delete orphan.constructor;
  delete orphan.hasOwnProperty;
  delete orphan.propertyIsEnumerable;
  delete orphan.isPrototypeOf;
  delete orphan.toLocaleString;
  delete orphan.toString;
  delete orphan.valueOf;
  orphan.__proto__ && delete orphan.__proto__;
  orphan.__defineGetter__ && delete orphan.__defineGetter__;
  orphan.__defineSetter__ && delete orphan.__defineSetter__;
  orphan.__lookupGetter__ && delete orphan.__lookupGetter__;
  orphan.__lookupSetter__ && delete orphan.__lookupSetter__;

  return root.Object;

  function Orphan(){}
  Orphan.prototype = orphan;
  return Orphan;
}();