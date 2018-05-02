/**
 * Created by Administrator on 2016/7/26 0026.
 */
if(JSON.parse(localStorage.getItem('localStorageGoods'))!=null){
    for(var l=0;l<JSON.parse(localStorage.getItem('localStorageGoods')).length;l++){
        if(JSON.parse(localStorage.getItem('localStorageGoods'))[l].amount!=0){
            document.querySelector(".showCart").innerHTML='购物车<i class="icon iconfont tips icon-circles"></i>'
        }
    }
}

window.onload=getOrderXhr
function getOrderXhr() {
    fd = new FormData(),xhr = new XMLHttpRequest()
    xhr.open("POST","/sales/getorders",true)
    xhr.send(fd)
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var orderJson = eval('('+xhr.responseText+');')
            console.log(orderJson)
            if(orderJson.orders.length==0){
                _e.msgBox({
                    msg: "您暂时没有订单！",
                    timeout: 1000,
                    className: "error"
                })
                return
            }else{
                showOrder(orderJson)
            }
        }
    }
}

function showOrder(orderJson) {
    for(var i=0;i<orderJson.orders.length;i++) {
        var url="location.href='orderdetail.html?order="+orderJson.orders[i].orderid
        url+="'"
        var orderAmount = '<div class="flex" id="' + orderJson.orders[i].orderid +'"onclick='+url+'>'+
            '<ul><i class="icon iconfont icon-list"></i></ul>'+
            '<li class="flex-1 flexA"><h1></h1></li><div><p class="bgc"></p></div></div>'
        var getOrderList=document.querySelector(".orderList")
        getOrderList.innerHTML += orderAmount
        //调用状态函数
        deliveryStatus(orderJson.orders[i],i)//订单状态 第几个
        var count = 0
        for(var k=0;k<orderJson.subod.length;k++){
            if(orderJson.orders[i].orderid==orderJson.subod[k].orderid){
                var node= '<h2>'+orderJson.subod[k].typename+'：'+orderJson.subod[k].created+
                    '<span>|</span>配送：'+orderJson.subod[k].deliverytime+'<b></b></h2>'
                document.querySelectorAll(".flexA")[i].innerHTML += node
                count++
            }
        }
        document.querySelectorAll(".flexA")[i].children[0].innerHTML = count + "张子订单"
        var bgc=document.querySelector(".bgc")

    }
}
  function deliveryStatus(orderStatus,i) {
      console.log(orderStatus.status)
      var bgc=document.querySelectorAll(".bgc")
      if(orderStatus.status==1){
          bgc[i].setAttribute("class","bgc bgc-FFC11E")
          bgc[i].innerHTML='未付款'
      }
      if(orderStatus.status==2){
          bgc[i].setAttribute("class","bgc bgc-6CB6FF")
          bgc[i].innerHTML='已付款'
      }
      if(orderStatus.status==3){
          bgc[i].setAttribute("class","bgc bgc-FFF100")
          bgc[i].innerHTML='配送中'
      }
      if(orderStatus.status==4){
          bgc[i].setAttribute("class","bgc bgc-17D7B0")
          bgc[i].innerHTML='已收货'
      }
      if(orderStatus.status==5){
          bgc[i].setAttribute("class","bgc bgc-DDDDDD")
          bgc[i].innerHTML='已取消'
      }
  }
