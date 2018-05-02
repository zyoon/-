/**
 * Created by Administrator on 2016/7/11 0011.
 */
console.log(JSON.parse(localStorage.getItem('localStorageGoods')))
var retrievedObject = localStorage.getItem('localStorageGoods')
var getlocalStorageGoods = JSON.parse(retrievedObject)
console.log(localStorage.getItem("scrollPosition"))
    // console.log(localStorage.getItem("innerHTML"))
    // console.log(localStorage.getItem("jsonData"))
if (JSON.parse(localStorage.getItem('localStorageGoods')) != null) {
    if (JSON.parse(localStorage.getItem('localStorageGoods')).length != 0) {
        for (var l = 0; l < JSON.parse(localStorage.getItem('localStorageGoods')).length; l++) {
            if (JSON.parse(localStorage.getItem('localStorageGoods'))[l].amount != 0) {
                document.querySelector(".cartShow").innerHTML = '<i class="icon iconfont icon-shoppingcart"></i> <i class="icon iconfont tips icon-circles"></i>'
            } else {
                document.querySelector(".cartShow").innerHTML = '<i class="icon iconfont icon-shoppingcart"></i>'
            }
        }
    } else {
        document.querySelector(".cartShow").innerHTML = '<i class="icon iconfont icon-shoppingcart"></i>'
    }
} else {
    document.querySelector(".cartShow").innerHTML = '<i class="icon iconfont icon-shoppingcart"></i>'
}


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

function orderDetail() {
    var getJsUrlData = getJsUrl()
    fd = new FormData(), xhr = new XMLHttpRequest()
    fd.append("id", getJsUrlData[0])
    fd.append("commoditytype", getJsUrlData[1])
    xhr.open("POST", "/sales/getgoodsdetail", true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var goodsDetailJson = eval('(' + xhr.responseText + ');')
            goodsDetailShow(goodsDetailJson)
            console.log(goodsDetailJson)
        }
    }
}

function goodsDetailShow(json) {
    if (json.message[0].stockamount == 0) {
        document.querySelector(".bgc-F06962").style.display = "none"
        document.querySelector(".addcart").style.display = "none"
    }
    if (json.image.length != 0) {

        var loadImg = document.querySelector(".topAd")
        var loadImgDot = document.querySelector(".pagination")
        for (var i = 0; i < json.image.length; i++) {
            var imgHtml = '<img src="' + 'http://mrten-0.mrten.cn/' + json.image[i][0] + '" class="bg" />'
            var imgDotHtml = '<li id="dot_0" class="page-dot"></li>'
            loadImg.innerHTML += imgHtml
            loadImgDot.innerHTML += imgDotHtml
                // document.querySelector(".topAd").style.touchAction="auto"
        }
        document.querySelector(".bg").className = "bg fadein"
    }

    //加载商品信息
    var goodsDetail = '<ul> <h1 class="goods_name">' + json.message[0].name + '</h1> <h2 class="goodsprice1">¥ ' + json.message[0].price / 100 + ' </h2><h2 class="giftnumber"></h2> <h3>规格 :' + json.message[0].specification + '<span>库存 : ' + json.message[0].stockamount + ' ' + json.message[0].unit + '</span></h3> </ul>'
    document.querySelector(".info").innerHTML += goodsDetail
        //加载商品购买规格
    var goodsInfo = '	<ul class="flex"><img src="' + 'http://mrten-0.mrten.cn/' + json.message[0].url + '" alt="" /></img> ' +
        '<li class="flex-1"> <h1>' + json.message[0].name + '<i style="float: right;" class="icon iconfont icon-close closeBuy" ></i></h1> ' +
        '<h2 class="goodsprice2">¥ ' + json.message[0].price / 100 + '</h2><h2 class="promotionFlag"></h2> <h4 class="flex"><p class="flex-1">库存<span class="stockamountJud">' + json.message[0].stockamount + '</span></p><div class="addTo flex"> ' +
        '<i class="icon iconfont minus icon-minuscircleo" style="margin: 10px 10px;"></i><b class="flex-1 amount"></b><i style="margin: 10px 10px" class="icon iconfont plus icon-pluscircle"></i></div></h4></li> </ul>'
    document.querySelector(".goodsInfo").innerHTML += goodsInfo

    if (json.message[0].stockamount == 0||json.message[0].stockamount < 0) {
        document.querySelector(".addTo").style.display = "none"
        document.querySelector(".stockamountJud").innerHTML = "0 已售罄"
    }
    document.querySelector(".service").innerHTML += '<div class="flex"> <p><img src="/i/css/img/WXnumber.jpg" alt="" /></p> ' +
        '<ul class="flex-1"> <h1>联系售后</h1> <h2>长按左边二维码图片并识别</h2> <h3>' +
        '<span>Mr.Ten</span> / 售后微信专号</h3> </ul> <a href="tel:' + json.message[0].deptphone + '">' +
        ' <li><i class="icon iconfont icon-phonecircleo"></i></li> ' +
        '<span style="font-size: 14px;color: #ccc;">' + json.message[0].dept + '</span> </a> </div>'
    document.querySelector(".remark").innerHTML = '<div>' + json.message[0].intro + '</div>'
    if (json.message[0].detail != '') {
        var　 loadGoodsDetail = decodeURIComponent(json.message[0].detail)

        document.querySelector(".detail").innerHTML += loadGoodsDetail
        for (var i = 0; i < document.getElementsByClassName("detail")[0].getElementsByTagName("img").length; i++) {
            document.getElementsByClassName("detail")[0].getElementsByTagName("img")[i].style.width = "100%"
        }
        //document.getElementsByClassName("detail")[0].getElementsByTagName("img")[0].style.width="100%"
    }

    if(json.units.length!=1){
      var goodsSpec=document.querySelector(".goodsSpec")
      for(var u=0;u<json.units.length;u++){
        var urlSpec = "location.href='goodsdetail.html?comid=" + json.units[u].id + "&commoditytype=" + json.units[u].commoditytype
        urlSpec += "'"
        if(json.units[u].flag==1){
          goodsSpec.innerHTML+='<li onclick='+urlSpec+' class="hover"><i class="icon iconfont icon-checkcircle"></i>'+json.units[u].specification+'</li>'
        }else{
          goodsSpec.innerHTML+='<li onclick='+urlSpec+'><i class="icon iconfont icon-infocircleo"></i>'+json.units[u].specification+'</li>'
        }
      }
    }


    if (json.message[0].commoditytype == 7) {

        document.querySelector(".promotionFlag").innerHTML = '(提前天' + json.message[0].delivery_interval + '预定)'
        document.querySelector(".goods_name").innerHTML += ' (提前天' + json.message[0].delivery_interval + '预定)'
    }

    if (json.message[0].promotionflag == 1) {
        document.querySelector(".goodsprice1").style.color="#e4393c"
        document.querySelector(".goodsprice2").style.color="#e4393c"
        document.querySelector(".giftnumber").style.color="#999"
        document.querySelector(".promotionFlag").style.color="#999"
        document.querySelector(".giftnumber").innerHTML = '买 ' + json.message[0].promotion[0].data.buys + ' 送 ' + json.message[0].promotion[0].data.gifts
        document.querySelector(".promotionFlag").innerHTML = '买 ' + json.message[0].promotion[0].data.buys + ' 送 ' + json.message[0].promotion[0].data.gifts
        document.querySelector(".promotionFlag").setAttribute("style","height: 14px;line-height: 14px;font-size: 12px;color: #999;margin: 2px 0;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;position: relative;")
        document.querySelector(".giftparkage").innerHTML = '<i class="icon iconfont minus icon-minus">' +
            '</i> 随机赠送<b>' + json.message[0].promotion[0].data.gifts + '</b>件商品 <i class="icon iconfont minus icon-minus"></i>'
        for (var i = 0; i < json.message[0].promotion[0].data.com.length; i++) {
            var lodaGift = '<td> <ul> <p style="background-image: url(http://mrten-0.mrten.cn/' + json.message[0].promotion[0].data.com[i].url + ');">' +
                '</p> <li> <h1>' + json.message[0].promotion[0].data.com[i].name + '</h1> </li> </ul> </td>'
                // disabled="disabled"
            document.querySelector(".gift").innerHTML += lodaGift
                // _e.bindAll("input","click",iputChoice)
        }
        if (json.message[0].promotion[0].data.count > json.message[0].promotion[0].data.reapttimes) {
            for (var j = 0; j < document.querySelectorAll("input").length; j++) {
                document.querySelectorAll("input")[j].setAttribute("disabled", "disabled")
            }
        }
    }
    if (json.message[0].promotionflag == 2) {
      document.querySelector(".goodsprice1").style.color="#e4393c"
        document.querySelector(".goodsprice2").style.color="#e4393c"
        document.querySelector(".giftnumber").innerHTML = json.message[0].promotion[0].discount / 10 + ' 折 / 原价 : <strike>' + json.message[0].price / 100 + '</strike>'
        document.querySelector(".promotionFlag").innerHTML = '' + json.message[0].promotion[0].discount / 10 + ' 折 / 原价 : <strike>' + json.message[0].price / 100 + '</strike>'
        document.querySelector(".goodsprice1").innerHTML = '¥ ' + json.message[0].price / 100 * json.message[0].promotion[0].discount / 100
        document.querySelector(".goodsprice2").innerHTML = '¥ ' + json.message[0].price / 100 * json.message[0].promotion[0].discount / 100
        document.querySelector(".giftnumber").style.color="#999"
        document.querySelector(".promotionFlag").style.color="#999"
    }
    if (json.message[0].promotionflag == 3) {
      document.querySelector(".goodsprice1").style.color="#e4393c"
        document.querySelector(".goodsprice2").style.color="#e4393c"
        document.querySelector(".giftnumber").innerHTML = '赠：优惠券' + json.message[0].promotion[0].pv / 100 + '元'
        document.querySelector(".promotionFlag").innerHTML = '赠：优惠券' + json.message[0].promotion[0].pv / 100 + '元'
        document.querySelector(".giftnumber").style.color="#999"
        document.querySelector(".promotionFlag").style.color="#999"
    }
    if (json.message[0].promotionflag == 4) {
        document.querySelector(".goodsprice1").style.color="#e4393c"
        document.querySelector(".goodsprice2").style.color="#e4393c"
        document.querySelector(".giftnumber").innerHTML = '赠：红包' + json.message[0].promotion[0].cashgift / 100 + '元'
        document.querySelector(".promotionFlag").innerHTML = '赠：红包' + json.message[0].promotion[0].cashgift / 100 + '元'
        document.querySelector(".giftnumber").style.color="#999"
        document.querySelector(".promotionFlag").style.color="#999"
    }
    if (json.message[0].discount<100) {
      document.querySelector(".giftnumber").innerHTML = '会员'+json.message[0].discount/10+'折 / ¥ '+(json.message[0].discount*json.message[0].price)/10000
      document.querySelector(".promotionFlag").innerHTML ='会员'+json.message[0].discount/10+'折 / ¥ '+(json.message[0].discount*json.message[0].price)/10000
      document.querySelector(".giftnumber").style.color="#999"
      document.querySelector(".promotionFlag").style.color="#999"
    }



    // _e.bindAll(".optioncomtype","click",conversion)
    _e.bind(".closeBuy", "click", closex)
    _e.bind(".closewin", "click", closex) //点击别的地方关闭详情

    function closex() {
        document.querySelector("body").style.position = "relative"
        document.querySelector("body").style.overflowY = "auto"
        document.getElementsByTagName("body")[0].style.overflow = "auto"
        document.getElementsByClassName("closewin")[0].style.display = "none"
        document.getElementsByClassName("bottomWin")[0].style.display = "none"
    }
    document.querySelector(".icon-minuscircleo").style.display = "none"

    var localStorageGoods = new Array()
        // localStorage.setItem('localStorageGoods', JSON.stringify(localStorageGoods))
    var temporaryLocalStorageLength = 0
    var reduce = 0
    _e.bindAll(".icon-minuscircleo", "click", numBoxReduce)
    var alertnum = 0

    function numBoxReduce() {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();

        reduce = Number(this.parentNode.childNodes[2].innerText)
        reduce--
        this.parentNode.childNodes[2].innerHTML = reduce
        if (json.message[0].promotionflag == 1) {
            if (json.message[0].promotion[0].data.count < json.message[0].promotion[0].data.reapttimes) {
                if (json.message[0].promotion[0].data.buys > 1) {
                    if (Number(reduce) <= json.message[0].promotion[0].data.buys && Number(reduce) >= ((json.message[0].promotion[0].data.reapttimes - json.message[0].promotion[0].data.count) * json.message[0].promotion[0].data.buys)) {
                        _e.msgBox({
                            msg: "享受优惠！",
                            timeout: 700,
                            className: "info"
                        })
                    } else {
                        _e.msgBox({
                            msg: "不享受优惠！",
                            timeout: 700,
                            className: "error"
                        })
                    }
                } else {
                    if (Number(reduce) >= ((json.message[0].promotion[0].data.reapttimes - json.message[0].promotion[0].data.count) * json.message[0].promotion[0].data.buys)) {
                        _e.msgBox({
                            msg: "享受优惠！",
                            timeout: 700,
                            className: "info"
                        })
                    } else {
                        _e.msgBox({
                            msg: "不享受优惠！",
                            timeout: 700,
                            className: "error"
                        })
                    }
                }
            } else {
                _e.msgBox({
                    msg: "不享受优惠！",
                    timeout: 700,
                    className: "error"
                })
            }
        }

        if (json.message[0].promotionflag == 2 || json.message[0].promotionflag == 3 || json.message[0].promotionflag == 4) {
            if (json.message[0].promotion[0].count < json.message[0].promotion[0].reapttimes) {
                if (reduce <= (json.message[0].promotion[0].reapttimes - json.message[0].promotion[0].count)) {
                    _e.msgBox({
                        msg: "享受优惠！",
                        timeout: 700,
                        className: "info"
                    })
                }
            } else {
                _e.msgBox({
                    msg: "不享受优惠！",
                    timeout: 700,
                    className: "error"
                })
            }
        }
        var retrievedObject = localStorage.getItem('localStorageGoods')
        var getlocalStorageGoods = JSON.parse(retrievedObject)
        var temporaryLocalStorage = []
        temporaryLocalStorage = getlocalStorageGoods


        for (var k = 0; k < temporaryLocalStorage.length; k++) {
            if (temporaryLocalStorage[k].id == json.message[0].id) {
                temporaryLocalStorage[k].amount--
                    localStorage.setItem('localStorageGoods', JSON.stringify(temporaryLocalStorage))
                if (reduce == 0) {
                    document.querySelector(".icon-minuscircleo").style.display = "none"
                    document.querySelector(".addTo b").innerHTML = null

                    if (JSON.parse(localStorage.getItem('localStorageGoods')) != null) {
                        if (JSON.parse(localStorage.getItem('localStorageGoods')).length != 0) {
                            for (var l = 0; l < JSON.parse(localStorage.getItem('localStorageGoods')).length; l++) {

                                if (JSON.parse(localStorage.getItem('localStorageGoods'))[l].amount != 0) {
                                    document.querySelector(".cartShow").innerHTML = '<i class="icon iconfont icon-shoppingcart"></i> <i class="icon iconfont tips icon-circles"></i>'

                                    return
                                } else {
                                    document.querySelector(".cartShow").innerHTML = '<i class="icon iconfont icon-shoppingcart"></i>'
                                }

                            }
                        } else {
                            document.querySelector(".cartShow").innerHTML = '<i class="icon iconfont icon-shoppingcart"></i>'
                            return
                        }
                    } else {
                        document.querySelector(".cartShow").innerHTML = '<i class="icon iconfont icon-shoppingcart"></i> '
                        return
                    }

                    return
                }
                return
            }
        }
    }



    _e.bindAll(".bgc-F06962", "click", nowAddCart)
    function nowAddCart(){
      var nowGodsNum=document.querySelector(".amount").innerHTML
      if(Number(nowGodsNum)>0){
      window.location.href="cart.html"
      }else{
        addCart()
        window.location.href="cart.html"
      }
    }



    _e.bindAll(".addcart", "click", cartOk)

        //商品详情点击购物车图标加入购物车//点击加号添加商品数量  弹出框之后加入购物车


    function cartOk() {
        var retrievedObject = localStorage.getItem('localStorageGoods')
        var getlocalStorageGoods = JSON.parse(retrievedObject)
        var temporaryLocalStorage = []
        if (getlocalStorageGoods != null) {
            temporaryLocalStorage = getlocalStorageGoods
            temporaryLocalStorageLength = temporaryLocalStorage.length
        }

        for (var k = 0; k < json.message.length; k++) {
            if (temporaryLocalStorage.length != 0) {
                for (var h = 0; h < temporaryLocalStorage.length; h++) {
                    if ((json.message[0].id == temporaryLocalStorage[h].id)&&(json.message[0].commoditytype == temporaryLocalStorage[h].commoditytype)) {
                      if(temporaryLocalStorage[h].amount!=0){
                        _e.msgBox({
                          msg: "已添加购物车！",
                          timeout: 700,
                          className: "info"
                        })
                        return
                      }else{
                        addCart()
                      }
                    }else{
                      addCart()
                    }
                }
            }else{
                addCart()
            }
        }
    }
    _e.bindAll(".icon-pluscircle", "click", addCart)


    var ping = 0

    function addCart() {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();

        ping = Number(document.querySelector(".amount").innerHTML)
        ping++

        if (json.message[0].promotionflag == 1) {
          if (Number(ping) > json.message[0].promotion[0].repeatpurchasetimes) {
          _e.msgBox({
              msg: "不享受优惠！",
              timeout: 700,
              className: "error"
          })
          return
      }
            if (json.message[0].promotion[0].data.count < json.message[0].promotion[0].data.reapttimes) {
                if (json.message[0].promotion[0].data.buys > 1) {
                    if (Number(ping) >= json.message[0].promotion[0].data.buys && Number(ping) <= ((json.message[0].promotion[0].data.reapttimes - json.message[0].promotion[0].data.count) * json.message[0].promotion[0].data.buys)) {
                        _e.msgBox({
                            msg: "享受优惠！",
                            timeout: 700,
                            className: "info"
                        })
                    } else {
                        _e.msgBox({
                            msg: "不享受优惠！",
                            timeout: 700,
                            className: "error"
                        })
                    }
                } else {
                    if (Number(ping) <= ((json.message[0].promotion[0].data.reapttimes - json.message[0].promotion[0].data.count) * json.message[0].promotion[0].data.buys)) {
                        _e.msgBox({
                            msg: "享受优惠！",
                            timeout: 700,
                            className: "info"
                        })
                    } else {
                        _e.msgBox({
                            msg: "不享受优惠！",
                            timeout: 700,
                            className: "error"
                        })
                    }
                }
            } else {
                _e.msgBox({
                    msg: "不享受优惠！",
                    timeout: 700,
                    className: "error"
                })
            }
        }
        if (json.message[0].promotionflag == 2 || json.message[0].promotionflag == 3 || json.message[0].promotionflag == 4) {
          if (Number(ping) > json.message[0].promotion[0].repeatpurchasetimes) {
          _e.msgBox({
              msg: "不享受优惠！",
              timeout: 700,
              className: "error"
          })
          return
      }
            if (json.message[0].promotion[0].count < json.message[0].promotion[0].reapttimes) {
                if (ping <= (json.message[0].promotion[0].reapttimes - json.message[0].promotion[0].count)) {
                    _e.msgBox({
                        msg: "享受优惠！",
                        timeout: 700,
                        className: "info"
                    })
                } else {
                    _e.msgBox({
                        msg: "不享受优惠！",
                        timeout: 700,
                        className: "error"
                    })
                }
            } else {
                _e.msgBox({
                    msg: "不享受优惠！",
                    timeout: 700,
                    className: "error"
                })
            }
        }


        var retrievedObject = localStorage.getItem('localStorageGoods')
        var getlocalStorageGoods = JSON.parse(retrievedObject)
        var temporaryLocalStorage = []
        ping = document.querySelector(".addTo b").innerHTML
        if (getlocalStorageGoods != null) {
            temporaryLocalStorage = getlocalStorageGoods
            temporaryLocalStorageLength = temporaryLocalStorage.length
        }

        for (var k = 0; k < json.message.length; k++) {
            for (var i = 0; i < temporaryLocalStorage.length; i++) {
                if (json.message[0].id == temporaryLocalStorage[i].id) {
                        if (temporaryLocalStorage[i].amount >= temporaryLocalStorage[i].stockamount) {
                            _e.msgBox({
                                msg: "库存不足！",
                                timeout: 700,
                                className: "error"
                            })
                            return
                        }
                        temporaryLocalStorage[i].amount++
                        document.querySelector(".amount").innerHTML = temporaryLocalStorage[i].amount
                        console.log(temporaryLocalStorage[i].amount);
                    document.querySelector(".icon-minuscircleo").style.display = "block"
                    localStorage.setItem('localStorageGoods', JSON.stringify(temporaryLocalStorage))
                    document.querySelector(".cartShow").innerHTML = '<i class="icon iconfont icon-shoppingcart"></i> <i class="icon iconfont tips icon-circles"></i>'
                    return
                }
            }
            console.log(ping);
            temporaryLocalStorage[temporaryLocalStorageLength] = json.message[k]
            temporaryLocalStorage[temporaryLocalStorageLength]["amount"] = 1
            temporaryLocalStorage[temporaryLocalStorageLength]["flag"] = 1
            document.querySelector(".amount").innerHTML = temporaryLocalStorage[temporaryLocalStorageLength]["amount"]
            temporaryLocalStorage[temporaryLocalStorageLength]["deliverytimes"] = 11 * 60 * 60
            temporaryLocalStorageLength++
            document.querySelector(".icon-minuscircleo").style.display = "block"
            localStorage.setItem('localStorageGoods', JSON.stringify(temporaryLocalStorage))
            document.querySelector(".cartShow").innerHTML = '<i class="icon iconfont icon-shoppingcart"></i> <i class="icon iconfont tips icon-circles"></i>'
        }
    }

    var getLSG = JSON.parse(localStorage.getItem('localStorageGoods'))
    if (getLSG != null) {
        for (var l = 0; l < getLSG.length; l++) {
            if (getLSG[l].amount != 0) {
                if (json.message[0].id == Number(getLSG[l].id) && json.message[0].commoditytype == Number(getLSG[l].commoditytype)) {
                    var amountS = document.querySelector(".amount")
                    amountS.innerHTML = getLSG[l].amount
                    amountS.parentNode.children[0].style.display = "block"
                }
            }
        }
    }
}
