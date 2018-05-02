window.onload=function(){
   var res=getUrlParam("res")
   if (res==1){
     var staffname=getUrlParam("staffname")
     var str="此订单已被"+staffname+"接"
     alert(str)
     return
   }
   if (res==2){
     alert("数据库错误，没有此员工")
   }
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
