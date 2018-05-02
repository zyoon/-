function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}
window.onload=function(){

  var xml = new XMLHttpRequest();
  xml.open("POST", "/sales/getuserBalance", true)
  xml.onreadystatechange = function() {
    if (xml.readyState == 4 && xml.status == 200) {
       var d= eval('(' + xml.responseText + ')');
       if(d.res==-1){
         _e.msgBox({
             msg: "获取用户余额失败！",
             timeout: 700,
             className: "info"
         })
         return
       }else{
         document.querySelector(".balance").innerHTML=(d.balance/100)
         return
       }
    }
  }
  xml.send(null)
}
function submitMoney() {
    var money = document.querySelector(".newmoney").value
    money=parseInt(money*100)
    if (money == "") {
        _e.msgBox({
            msg: "请输入金额！",
            timeout: 700,
            className: "info"
        })
        return
    }
    if(money[0]==0&&money[1]>0){
      _e.msgBox({
              msg: "请输入正确的金额！",
              timeout: 700,
              className: "info"
          })
          return
    }
    if(money<=0){
      _e.msgBox({
              msg: "请输入正确的金额！",
              timeout: 700,
              className: "info"
          })
          return
    }
    var xml = new XMLHttpRequest();
    xml.open("POST", "/sales/pay/recharge", true);
    xml.setRequestHeader("Content-type", "application/json");
    xml.onreadystatechange = function() {
        if (xml.readyState == 4 && xml.status == 200) {
            var charge = eval('(' + xml.responseText + ')');
            pingpp.createPayment(charge, function(result, error) {
                if (result == "success") {
                    window.location.reload()
                } else if (result == "fail") {
                    //  document.getElementById("s").textContent=error.msg+"--"+error.extra
                    // charge 不正确或者微信公众账号支付失败时会在此处返回s
                    alert("支付失败");
                } else if (result == "cancel") {
                    // 微信公众账号支付取消支付
                    alert("取消支付");
                }
            });
        }
    }
    xml.send(JSON.stringify({
        channel: 'wx_pub',
        amount: money
    }))

}
