var ordercode
window.onload=function(){
   ordercode=getUrlParam("ordercode")
  var ordercodep=document.querySelector("#ordercode");
  ordercodep.innerText="订单编号 :"+ordercode
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
function comfirmOrder(){
  var  xhr = new XMLHttpRequest()
  xhr.open("GET", "/sales/order/comfirmOrder?ordercode="+ordercode, true)
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var d = eval('(' + xhr.responseText + ');')
          if (d.res==1){
                 location.href="deliverydetail.html?ordercode="+ordercode
          }
          if (d.res==2){
            alert(d.msg)
          }
      }
  }
    xhr.send();
}
_e.bind(".UrDelvr","click",closeX)
function closeX(){
  if(  document.querySelector(".winbg").style.display=="none"){
    document.querySelector(".winbg").style.display="block"
  }
}

_e.bind(".closewin","click",closeWin)
function closeWin(){
  if(  document.querySelector(".winbg").style.display=="block"){
    document.querySelector(".winbg").style.display="none"
  }
}
