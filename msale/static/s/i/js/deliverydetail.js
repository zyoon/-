var ordercode
window.onload = function() {
    ordercode = getUrlParam("ordercode")
    if (ordercode!=null){
      var xhr = new XMLHttpRequest()
      xhr.open("GET", "/sales/order/showOrderDetail?ordercode=" + ordercode, true)
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              var d = eval('(' + xhr.responseText + ');')
              if (d.res == 1) {
                  var orderinfo = document.querySelector("#orderInfo")
                  orderinfo.innerHTML = "<li>收货人:" + d.name + "</li>" +
                      "<li>收货地址:" + d.address + "</li>" +
                      "<li>收货人电话号码:" + d.phone + "</li>" +
                      "<li>订单编号:" + ordercode + "</li>"
              } else if (d.res == 2) {
                  var orderinfo = document.querySelector("#orderInfo")
                  orderinfo.innerHTML = "<li>订单编号:" + ordercode + "</li>"
                  var order = document.querySelector(".order")
                  order.innerHTML = ' <button type="button" class="bgc-17D7B0">配送完成</button>'
              } else {
                  alert(d.msg)
              }
          }
      }
      xhr.send()
    }else{
      var orderDetail = document.querySelector(".orderDetail")
            orderDetail.innerHTML=""
            alert("此单已接")
    }

}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

function comfirm_goods() {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "/sales/order/comfirmGoods?ordercode=" + ordercode, true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var d = eval('(' + xhr.responseText + ');')
            if (d.res == 1) {
                var orderinfo = document.querySelector("#orderInfo")
                orderinfo.innerHTML = "<li>订单编号:" + ordercode + "</li>"
                var order = document.querySelector(".order")
                order.innerHTML = '<button type="button" class="bgc-17D7B0">配送完成</button>'
                _e.msgBox({
                    msg: "配送完成",
                    timeout: 2000,
                    className: "info"
                })
            }else{
              alert(d.msg)
            }
        }
    }
    xhr.send()
}


_e.bindAll(".UrDelvr", "click", closeX)

function closeX() {
    if (document.querySelector(".winbg").style.display == "none") {
        document.querySelector(".winbg").style.display = "block"
    }
}

_e.bind(".closewin", "click", closeWin)

function closeWin() {
    if (document.querySelector(".winbg").style.display == "block") {
        document.querySelector(".winbg").style.display = "none"
    }
}
