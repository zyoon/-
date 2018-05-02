/**
 * Created by bobodaren007 on 2016/7/26 0026.
 */

window.onload = orderDetail

function getJsUrl() {
    var str, parastr
    var storageUrlID = []
    str = location.href
    parastr = str.split("?")[1]
    var arr = parastr.split("&")
    for (var i = 0; i < arr.length; i++) {
        storageUrlID.push(arr[i].split("=")[1])
    }
    return storageUrlID
}

var getJsUrlData = getJsUrl()

function orderDetail() {
    fd = new FormData(), xhr = new XMLHttpRequest()
    fd.append("orderid", getJsUrlData[0])
    xhr.open("POST", "/sales/getorderdetail", true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var orderDetailJson = eval('(' + xhr.responseText + ');')
            console.log(orderDetailJson)
            orderDetailShow(orderDetailJson)
        }
    }
}

function orderDetailShow(orderDetailJson) {
    var shopname = '<div class="flex"> <ul><i class="icon iconfont icon-home"></i></ul> <li class="flex-1">' + orderDetailJson.order[0].department + '</li> ' +
        '<p><a style="color: #999;" href="tel:' + orderDetailJson.order[0].departmentphone + '"><i class="icon iconfont icon-phone"></i> ' + orderDetailJson.order[0].departmentphone + '</p> </div>'
    document.querySelector(".shopInfo").innerHTML += shopname
    for (var i = 0; i < orderDetailJson.suborder.length; i++) {
        var price = 0
        var createOrderDetail = '<div class="orderNumber"><div class="flex">' +
            '<ul class="saleclass">' + orderDetailJson.suborder[i].typename + ' 订单</ul> <li class="flex-1">订单号 : ' + orderDetailJson.order[0].code + '</li> </div> </div>' +
            '<div class="orderStatus flex"></div>'
        if (orderDetailJson.suborder[i].typename == "便利店") {
            var saleclass1 = document.querySelector(".saleclass1")
            saleclass1.style.display = "block"
            saleclass1.innerHTML = createOrderDetail
            var aa = orderDetailJson.suborder
            document.querySelector(".saleclass1").childNodes[1].innerHTML += bgColor(orderDetailJson.suborder[i].status, orderDetailJson.suborder[i])

            for (var k = 0; k < orderDetailJson.com.length; k++) {

                if (orderDetailJson.suborder[i].order_type == orderDetailJson.com[k].order_type) {
                    var createorderDetailGoodsNode1 = '<div class="orderGoods"><div><ul>' + orderDetailJson.com[k].commodityname + '</ul><li class="flex">' +
                        '<h1 class="flex-1">¥' + orderDetailJson.com[k].totalprice / orderDetailJson.com[k].amount / 100 + '</h1><h2 class="flex-1">x' + orderDetailJson.com[k].amount + '</h2><h3 class="flex-1">¥' + orderDetailJson.com[k].totalprice / 100 + '</h3></li></div></div>'
                    document.querySelector(".saleclass1").innerHTML += createorderDetailGoodsNode1
                    price = price+ orderDetailJson.com[k].totalprice / 100
                }
            }
            var createorderDetailNodeFooter1 = '<div class="orderTotal"> <li>订单金额 : <span style="color: #EFA50A;"> ¥ ' + Math.floor(price * 100) / 100 + '</span></li> <li>下单时间 : ' + orderDetailJson.suborder[i].created + '</li> <li>配送时间 : ' + orderDetailJson.suborder[i].deliverytime + '</li><li>送达时间 : ' + orderDetailJson.suborder[i].tod + '</li>'
            document.querySelector(".saleclass1").innerHTML += createorderDetailNodeFooter1
        }

        if (orderDetailJson.suborder[i].typename == "预售") {
          var createorderDetailGoodsNode2=""
            for (var k = 0; k < orderDetailJson.com.length; k++) {
                if (orderDetailJson.suborder[i].order_type == orderDetailJson.com[k].order_type) {

                    var createorderDetailGoodsNode2 =createorderDetailGoodsNode2 + '<div class="orderGoods"><div><ul>' + orderDetailJson.com[k].commodityname + '</ul><li class="flex">' +
                        '<h1 class="flex-1">¥' + orderDetailJson.com[k].totalprice / orderDetailJson.com[k].amount / 100 +
                         '</h1><h2 class="flex-1">x' + orderDetailJson.com[k].amount + '</h2><h3 class="flex-1">¥'
                         + orderDetailJson.com[k].totalprice / 100 + '</h3></li></div></div>'

                    price = price+ orderDetailJson.com[k].totalprice / 100
                }
            }
            var createorderDetailNodeFooter2 = '<div class="orderTotal"> <li>订单金额 : ¥' + price + '</li> <li>下单时间 : ' + orderDetailJson.suborder[i].created + '</li> <li>配送时间 : <span>' + orderDetailJson.suborder[i].deliverytime + '</span></li>' +
            '</div>'
            var preorderLoopHtml = '<div class="order"><div class="orderNumber"><div class="flex">' +
            '<ul class="saleclass">' + orderDetailJson.suborder[i].typename + ' 订单</ul> <li class="flex-1">订单号 : ' + orderDetailJson.order[0].code + '</li> </div> </div>' +
            '<div class="orderStatus flex">' + bgColor(orderDetailJson.suborder[i].status, orderDetailJson.suborder[i]) + '</div>' + createorderDetailGoodsNode2 + createorderDetailNodeFooter2 + '</div>'

            document.querySelector(".orderDetail").innerHTML += preorderLoopHtml

            /* var saleclass2=document.querySelector(".saleclass2")
             saleclass2.style.display="block"
             saleclass2.innerHTML+=createOrderDetail*/
            //document.querySelector(".saleclass2").childNodes[1].innerHTML+=bgColor(orderDetailJson.suborder[i].status,orderDetailJson.suborder[i])

            //document.querySelector(".saleclass2").innerHTML+=createorderDetailNodeFooter2
        }
    }
    // var cashCoupon = '	<div class="order promotion" style="display: none"> <div class="cashgift" style="display: none;height: 48px;line-height: 48px;">' +
    //     ' </div> <div class="coupon" style="display: none;border-top: 1px solid #eee;margin-left: 13px;"> <i class="icon iconfont icon-fruit"></i>' +
    //     ' <span>优惠券：¥ <select class="selectOption" style="width: 40%;height: 23px;border-radius: 2px;margin: 10px 0 0 0;font-size: 14px;"> ' +
    //     '<option data-id="0" value="0">无</option> </select> </span> </div>  </div>'
    // document.querySelector(".orderDetail").innerHTML += cashCoupon

    for (var j = 0; j < orderDetailJson.order.length; j++) {
        var footerInfo = '<div class="orderInfo"> <li>外送费 : ¥ ' + orderDetailJson.order[j].deliveryfee / 100 + '</li> <li>共计金额 :  <span class="showTotalprice" style="color: #EFA50A;"> ¥ ' + orderDetailJson.order[j].totalprice / 100 + '</span></li> ' +
            '<li>付款方式 : 在线支付</li> <li>送货地址 : ' + orderDetailJson.order[j].address + ' . SHOPTEN</li> ' +
            '<li>留言 : ' + orderDetailJson.order[j].memo + ' </li> ' +
            '<li>联系人 : ' + orderDetailJson.order[j].name + '　' + orderDetailJson.order[j].gender + '</li> ' +
            '<li>联系电话 : ' + orderDetailJson.order[j].phone + '</li> ' +
            '<button type="button" class="bgc-6CB6FF orderOk1" style="display: none">立即支付</button> <button style="display: none" type="button" class="bgc-DDDDDD">取消订单</button> </div>'
        document.querySelector(".orderDetail").innerHTML += footerInfo
        _e.bindAll(".orderOk1", "click", orderOk)

    }
    for (var h = 0; h < orderDetailJson.suborder.length; h++) {
        if (orderDetailJson.suborder[h].status == 1) {
          //曾经的加载红包
            //var promotion = document.querySelector(".promotion")
            // if (orderDetailJson.cashgift[0].cashgift != 0) {
            //     promotion.style.display = "block"
            //     var cashGift = document.querySelector(".cashgift")
            //     cashGift.style.display = "block"
            //     var cashGoftHtml = '<i class="icon iconfont icon-ticket" style="color: crimson;margin-left: 13px"></i> <span class="showCash">钱包余额：¥ ' + orderDetailJson.cashgift[0].cashgift / 100 + '</span> <div class="toggleOff"> <div></div> </div>'
            //     cashGift.innerHTML = cashGoftHtml
            // }
            // if (orderDetailJson.coupon.length != 0) {
            //     promotion.style.display = "block"
            //     var coupon = document.querySelector(".coupon")
            //     coupon.style.display = "block"
            // }
            document.querySelector(".bgc-6CB6FF").style.display = "block"
            document.querySelector(".bgc-DDDDDD").style.display = "block"
        }

    }
    // 曾经的加载优惠券
    // if (orderDetailJson.coupon.length != 0) {
    //     var arr = new Array()
    //     arr = orderDetailJson.coupon.sort(function(a, b) {
    //         return a.pv - b.pv
    //     })
    //     console.log(arr)
    //     for (var i = 0; i < arr.length; i++) {
    //         if (orderDetailJson.coupon[i].flag == 1) {
    //             document.querySelector(".selectOption").innerHTML += '<option data-id="' + arr[i].id + '" value="' + arr[i].pv / 100 + '">' + arr[i].intro + '</option>'
    //         } else {
    //           // ' + arr[i].pv / 100 + '
    //             document.querySelector(".selectOption").innerHTML += '<option disabled="true" data-id="' + arr[i].id + '" value="' + arr[i].pv / 100 + '">' + arr[i].intro + '</option>'
    //         }
    //     }
    // }


    var useCash = 0
    var totalprice = orderDetailJson.order[0].totalprice
    if (orderDetailJson.cashgift.length != 0) {
        var showCashh = orderDetailJson.cashgift[0].cashgift
    }
    // var a = document.querySelector(".selectOption").selectedIndex
    //曾经的使用账户余额
    // document.querySelector(".cashgift").addEventListener("click", function() {
    //     var showTotalprice = document.querySelector(".showTotalprice")
    //     var selectOption = document.querySelector(".selectOption")
    //     console.log(this.querySelector(".toggleOff"))
    //     if (this.children[2].getAttribute("class") == "toggleOff") {
    //         this.children[2].setAttribute("class", "toggleOn")
    //         if (showCashh < totalprice) {
    //             if (selectOption.value == 0) {
    //                 showTotalprice.innerHTML = '¥ ' + (totalprice - showCashh) / 100
    //                 useCash = showCashh
    //             } else {
    //                 if (selectOption.value * 100 + showCashh <= totalprice) {
    //                     showTotalprice.innerHTML = '¥ ' + (totalprice - showCashh - selectOption.value * 100) / 100
    //                     useCash = showCashh
    //                     console.log(useCash)
    //                 } else {
    //                     showTotalprice.innerHTML = '¥ ' + 0
    //                     useCash = totalprice - selectOption.value * 100
    //                     console.log(useCash)
    //                 }
    //             }
    //         } else {
    //             if (selectOption.value == 0) {
    //                 showTotalprice.innerHTML = '¥ ' + 0
    //                 useCash = totalprice
    //             } else {
    //                 showTotalprice.innerHTML = '¥ ' + 0
    //                 useCash = totalprice - selectOption.value * 100
    //                 console.log(useCash)
    //             }
    //         }
    //     } else {
    //         this.children[2].setAttribute("class", "toggleOff")
    //         if (selectOption.value == 0) {
    //             showTotalprice.innerHTML = '¥ ' + totalprice / 100
    //         } else {
    //             showTotalprice.innerHTML = '¥ ' + (totalprice - selectOption.value * 100) / 100
    //         }
    //     }
    //     return false;
    // }, true)
    //曾经的使用优惠券
    //_e.bind(".selectOption", "change", select0ption)

    // function select0ption() {
    //     var showTotalprice = document.querySelector(".showTotalprice")
    //     var selectOption = document.querySelector(".selectOption")
    //     if (document.querySelector(".toggleOn") == null) {
    //         showTotalprice.innerHTML = (totalprice - selectOption.value * 100) / 100
    //     } else {
    //         /* console.log((selectOption.value*100+cashGift) <= totalprice)*/
    //         if ((selectOption.value * 100 + showCashh) <= totalprice) {
    //             showTotalprice.innerHTML = (totalprice - selectOption.value * 100 - showCashh) / 100
    //         } else {
    //             showTotalprice.innerHTML = '¥ ' + 0
    //         }
    //     }
    // }
    _e.bind(".bgc-DDDDDD", "click", cancelOrder)

    function cancelOrder() {
        var r = confirm("本次订单将作废，确定取消？");
        if (r == true) {
            var fd = new FormData(),
                xhr = new XMLHttpRequest()
            fd.append("orderid", getJsUrlData[0])
            console.log(getJsUrlData[0])
            xhr.open("POST", "/sales/cancelorder", true)
            xhr.send(fd)
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var cancelOrderD = eval('(' + xhr.responseText + ');')
                    console.log(cancelOrderD)
                    if (cancelOrderD.res == 1) {
                        _e.msgBox({
                            msg: "取消成功！",
                            timeout: 1000,
                            className: "success"
                        })
                        setTimeout("window.location.reload()", 1000)
                    } else {
                        _e.msgBox({
                            msg: "取消失败！",
                            timeout: 1000,
                            className: "error"
                        })
                        return
                    }
                }
            }
        } else {
            return
        }
    }


    _e.bind(".bgc-6CB6FF", "click", orderOk)
        //_e.bind(".orderOk1","click",orderOk)
    function orderOk() {

      this.style.backgroundColor="#6CA6CD"

        var fd = new FormData(),
            xhr = new XMLHttpRequest()

        // var opt = document.querySelector(".selectOption").value
        // if (document.querySelector(".toggleOn") == null) {
        //     fd.append("cashgift", 0)
        // } else {
        //     if (document.querySelector(".selectOption").value == 0) {
        //         if (totalprice > showCashh) {
        //             fd.append("cashgift", showCashh)
        //         } else {
        //             fd.append("cashgift", totalprice)
        //         }
        //     } else {
        //         if (opt * 100 + showCashh <= totalprice) {
        //             fd.append("cashgift", showCashh)
        //         } else {
        //             fd.append("cashgift", totalprice - opt * 100)
        //         }
        //     }
        // }


        // var a = document.querySelector(".selectOption").selectedIndex
            //console.log(document.querySelector(".selectOption").options[a].getAttribute("data-id"))
        fd.append("orderdid", orderDetailJson.order[0].orderid)
        // fd.append("coupon", document.querySelector(".selectOption").options[a].getAttribute("data-id"))
        xhr.open("POST", "/sales/payment", true)
        xhr.send(fd)
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = eval('(' + xhr.responseText + ');')
                if(res.res!=1){
                  _e.msgBox({
                      msg: res.msg,
                      timeout: 1000,
                      className: "error"
                  })
                  return
                }else{

                      if(res.total==0){
                     var xmr = new XMLHttpRequest()
                                  xmr.open("GET", "/sales/createDelivery?orderid=" + res.orderid, true);
                                  xmr.onreadystatechange = function() {
                                      if (xmr.readyState == 4 && xmr.status == 200) {
                                        var d = eval('(' + xmr.responseText + ');')
                                          if (d.res == 1) {
                                              window.location.reload()
                                          }
                                      }
                                  }
                                  xmr.send()
                       return
                     }else{
                       var xml = new XMLHttpRequest();
                       xml.open("POST", "/sales/pay/wxpub", false);
                       xml.setRequestHeader("Content-type", "application/json");
                       xml.onreadystatechange = function() {
                           if (xml.readyState == 4 && xml.status == 200) {
                               var charge = eval('(' + xml.responseText + ')');
                               pingpp.createPayment(charge, function(result, error) {
                                   if (result == "success") {
                                       // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                                  //     var xmr = new XMLHttpRequest()
                                  //     xmr.open("GET", "/sales/createDelivery?orderid=" + res.orderid, true);
                                  //     xmr.onreadystatechange = function() {
                                   //        if (xmr.readyState == 4 && xmr.status == 200) {
                                   //            var d = eval('(' + xmr.responseText + ')')
                                   //            if (d.res == 1) {
                                                   window.location.reload()
                                    //           }
                                     //      }
                                     //  }
                                     //  xmr.send()
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
                           amount: res.total,
                           orderid:res.orderid
                       }))
                     }
                }
            }
        }
    }
}

function bgColor(status, suborder) {
    if (status == 1) {
        var bg = '<ul class="flex-1"><div class="flex"><p><i class="icon iconfont icon-yuan"></i>' +
            '</p><h1 class="flex-1">待付款<span></span></h1></div></ul>'
            // <h6 >|</h6><div class="flex">' +
            // '<p><i class="icon iconfont icon-rocket"></i></p><h1 class="flex-1">配送中<span></span></h1></div>' +
            // '<h6>|</h6><div class="flex"><p><i class="icon iconfont icon-check"></i></p><h2 class="flex-1">等收货</h2></div>
        return bg
    }
    if (status == 2) {
        var bg = '<ul class="flex-1"><div class="flex hover"><p><i class="icon iconfont icon-yuan"></i>' +
            '</p><h1 class="flex-1">已付款<span></span></h1></div><h6 >|</h6><div class="flex">' +
            '<p><i class="icon iconfont icon-rocket"></i></p><h1 class="flex-1">待配送<span></span></h1></div>' +
            '</ul>'
            // <h6>|</h6><div class="flex"><p><i class="icon iconfont icon-check"></i></p><h2 class="flex-1">等收货</h2></div>
        return bg
    }
    if (status == 3) {
        var bg = '<ul class="flex-1"><div class="flex hover"><p><i class="icon iconfont icon-yuan"></i>' +
            '</p><h1 class="flex-1">已付款<span></span></h1></div><h6 class="hover">|</h6><div class="flex hover">' +
            '<p><i class="icon iconfont icon-rocket"></i></p><h1 class="flex-1">配送中<span>30分钟后到达</span></h1></div>' +
            '<h6>|</h6><div class="flex"><p><i class="icon iconfont icon-check"></i></p><h2 class="flex-1">待收货</h2></div></ul>' +
            '<li class="operator"> <div class="flex"><h1 class="flex-1">配送人员<span>' + suborder.operator + '</span></h1><p><a style="color:#FFFFFF;" href="tal:' + suborder.operatorphone + '"><i class="icon iconfont icon-phone"></i></a></p></div></li>'
        return bg
    }
    if (status == 4) {
        var bg = '<ul class="flex-1"><div class="flex hover"><p><i class="icon iconfont icon-yuan"></i>' +
            '</p><h1 class="flex-1">已付款<span></span></h1></div><h6 class="hover">|</h6><div class="flex hover">' +
            '<p><i class="icon iconfont icon-rocket"></i></p><h1 class="flex-1">配送中<span></span></h1></div>' +
            '<h6 class="hover">|</h6><div class="flex hover"><p><i class="icon iconfont icon-check"></i></p><h2 class="flex-1">已送达</h2></div></ul>' +
            '<li class="operator"> <div class="flex"><h1 class="flex-1">配送人员<span>' + suborder.operator + '</span></h1><p><a style="color:#FFFFFF;" href="tal:' + suborder.operatorphone + '"><i class="icon iconfont icon-phone"></i></a></p></div></li>'
        return bg
    }
    if (status == 5) {
        var bg = '<ul class="flex-1"><div class="flex hover"><p><i class="icon iconfont icon-deletecircleo"></i>' +
            '</p ><h1 class="flex-1" style="margin: auto;">已取消<span></span></h1></div></ul>'
        return bg
    }
}
