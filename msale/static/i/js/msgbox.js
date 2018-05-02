
if(typeof(_e) == "undefined") {
    _e = {}
}
_e["msgBox"] = function(option){
    var msg = option.hasOwnProperty("msg")?option.msg:"";
    var timeout = option.hasOwnProperty("timeout")?option.timeout:2000;
    // error(default)  info warning  success
    var className=option.hasOwnProperty("className")?option.className:"error";

    var msgElement=document.createElement("div");
    msgElement.className="e-msg-bar animated fadeInDown alert-"+className;
    msgElement.innerHTML=msg;
    document.getElementsByTagName("body")[0].appendChild(msgElement);
    setTimeout((function(){
        return function(){
            msgElement.className="e-msg-bar animated fadeOutUp alert-"+className;
        }
    })(this),timeout);
    setTimeout((function(){
        return function(){
            msgElement.parentNode.removeChild(msgElement);
        }
    })(this),timeout+1000)
}