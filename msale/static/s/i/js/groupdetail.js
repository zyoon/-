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
    console.log(getJsUrlData);
    var fd = new FormData(), xhr = new XMLHttpRequest()
    fd.append("id", getJsUrlData[0])
    fd.append("groupbuyid", getJsUrlData[1])
    xhr.open("POST", "/groupbuy/getgroupcommoditydetail", true)
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
        document.querySelector(".adddcart").style.display = "none"
        document.querySelector(".addcart").style.display = "none"
    }
    if (json.image.length != 0) {

        var loadImg = document.querySelector(".topAd")
        var loadImgDot = document.querySelector(".pagination")
        for (var i = 0; i < json.image.length; i++) {
            var imgHtml = '<img src="' + 'http://od35wia0b.bkt.clouddn.com/' + json.image[i][0] + '" class="bg" />'
            var imgDotHtml = '<li id="dot_0" class="page-dot"></li>'
            loadImg.innerHTML += imgHtml
            loadImgDot.innerHTML += imgDotHtml
                // document.querySelector(".topAd").style.touchAction="auto"
        }
        document.querySelector(".bg").className = "bg fadein"
    }

    //加载商品信息
    var goodsDetail = '<ul> <h1 class="goods_name">' + json.message[0].name + '</h1> <h2 class="goodsprice1">¥ ' + json.message[0].groupprice / 100 + ' <span style="font-size:12px"> 团购价</span></h2><h2 class="giftnumber"></h2> <h3>规格 :' + json.message[0].specification + '<span>库存 : ' + json.message[0].stockamount + ' ' + json.message[0].unit + '</span></h3> </ul>'
    document.querySelector(".info").innerHTML += goodsDetail
        //加载商品购买规格
    var goodsInfo = '	<ul class="flex"><img src="' + 'http://od35wia0b.bkt.clouddn.com/' + json.message[0].url + '" alt="" /></img> ' +
        '<li class="flex-1"> <h1>' + json.message[0].name + '<i style="float: right;" class="icon iconfont  closeBuy" ></i></h1> ' +
        '<h2 class="goodsprice2">¥ ' + json.message[0].price / 100 + '</h2><h2 class="promotionFlag"></h2> <h4 class="flex"><p class="flex-1">库存<span class="stockamountJud">' + json.message[0].stockamount + '</span></p><div class="addTo flex"> ' +
        '<i class="icon iconfont minus icon-minuscircleo" style="margin: 10px 10px;"></i><b class="flex-1 amount"></b><i style="margin: 10px 10px" class="icon iconfont plus icon-pluscircle"></i></div></h4></li> </ul>'
    document.querySelector(".goodsInfo").innerHTML += goodsInfo

    var goodsInfogroup = '	<ul class="flex"><img src="' + 'http://od35wia0b.bkt.clouddn.com/' + json.message[0].url + '" alt="" /></img> ' +
        '<li class="flex-1"> <h1>' + json.message[0].name + '<i style="float: right;" class="icon iconfont closeBuy" ></i></h1> ' +
        '<h2 class="goodsprice2">¥ ' + json.message[0].groupprice / 100 + '</h2><h2 class="promotionFlag"></h2> <h4 class="flex"><p class="flex-1">库存<span class="groupstockamountJud">' + json.message[0].stockamount + '</span></p><div class="addTo flex"> ' +
        '<i class="icon iconfont groipmin icon-minuscircleo" style="margin: 10px 10px;color:#333"></i><b class="flex-1 groupamount" style="display:none">0</b><i style="margin: 10px 10px;color:#333" class="icon iconfont icon-pluscircle groipmax"></i></div></h4></li> </ul>'
    document.querySelector(".groupbuygoodsinfo").innerHTML += goodsInfogroup
    document.querySelector(".groipmin").style.display = "none"
    document.querySelector(".opengroup").innerHTML = '开团/' + json.message[0].number + '人团'
    if (json.message[0].stockamount == 0) {
        document.querySelector(".addTo").style.display = "none"
        document.querySelector(".stockamountJud").innerHTML += " 缺货"
    }
    document.querySelector(".service").innerHTML += '<div class="flex"> <p><img src="/i/css/img/WXnumber.jpg" alt="" /></p> ' +
        '<ul class="flex-1"> <h1>联系售后</h1> <h2>长按左边二维码图片并识别</h2> <h3>' +
        '<span>Mr.Ten</span> / 售后微信专号</h3> </ul> <a href="tel:' + json.message[0].deptphone + '">' +
        ' <li><i class="icon iconfont icon-phonecircleo" ></i></li> ' +
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




    if (json.message[0].commoditytype == 7) {
        document.querySelector(".promotionFlag").innerHTML = '(提前天' + json.message[0].delivery_interval + '预定)'
        document.querySelector(".goods_name").innerHTML += ' (提前天' + json.message[0].delivery_interval + '预定)'
    }

    if (json.message[0].promotionflag == 1) {
        document.querySelector(".giftnumber").innerHTML = '买 ' + json.message[0].promotion[0].data.buys + ' 送 ' + json.message[0].promotion[0].data.gifts
        document.querySelector(".promotionFlag").innerHTML = '买 ' + json.message[0].promotion[0].data.buys + ' 送 ' + json.message[0].promotion[0].data.gifts
        document.querySelector(".giftparkage").innerHTML = '<i class="icon iconfont minus icon-minus">' +
            '</i> 随机赠送<b>' + json.message[0].promotion[0].data.gifts + '</b>件商品 <i class="icon iconfont minus icon-minus"></i>'
        for (var i = 0; i < json.message[0].promotion[0].data.com.length; i++) {
            var lodaGift = '<td> <ul> <p style="background-image: url(http://od35wia0b.bkt.clouddn.com/' + json.message[0].promotion[0].data.com[i].url + ');">' +
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
        document.querySelector(".giftnumber").innerHTML = json.message[0].promotion[0].discount / 10 + ' 折 / 原价 : <strike>' + json.message[0].price / 100 + '</strike>'
        document.querySelector(".promotionFlag").innerHTML = '' + json.message[0].promotion[0].discount / 10 + ' 折 / 原价 : <strike>' + json.message[0].price / 100 + '</strike>'
        document.querySelector(".goodsprice1").innerHTML = '¥ ' + json.message[0].price / 100 * json.message[0].promotion[0].discount / 100
        document.querySelector(".goodsprice2").innerHTML = '¥ ' + json.message[0].price / 100 * json.message[0].promotion[0].discount / 100
    }
    if (json.message[0].promotionflag == 3) {
        document.querySelector(".giftnumber").innerHTML = '赠：优惠券' + json.message[0].promotion[0].pv / 100 + '元'
        document.querySelector(".promotionFlag").innerHTML = '赠：优惠券' + json.message[0].promotion[0].pv / 100 + '元'
    }
    if (json.message[0].promotionflag == 4) {
        document.querySelector(".giftnumber").innerHTML = '赠：红包' + json.message[0].promotion[0].cashgift / 100 + '元'
        document.querySelector(".promotionFlag").innerHTML = '赠：红包' + json.message[0].promotion[0].cashgift / 100 + '元'
    }



    // _e.bindAll(".optioncomtype","click",conversion)

    document.querySelector(".icon-minuscircleo").style.display = "none"

    var localStorageGoods = new Array()
        // localStorage.setItem('localStorageGoods', JSON.stringify(localStorageGoods))
    var temporaryLocalStorageLength = 0
    var reduce = 0
    _e.bindAll(".minus", "click", numBoxReduce)
    var alertnum = 0

    function numBoxReduce() {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();

        reduce = this.parentNode.childNodes[2].innerText
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
            if (json.message[0].promotion[0].count > json.message[0].promotion[0].reapttimes) {
                if (reduce < json.message[0].promotion[0].reapttimes - json.message[0].promotion[0].count) {
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



    _e.bindAll(".adddcart", "click", addCart)
    _e.bindAll(".addcart", "click", addCart)

    _e.bindAll(".addcart", "click", cartOk)

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
                    if (json.message[0].id == temporaryLocalStorage[h].id) {
                        _e.msgBox({
                            msg: "已添加购物车！",
                            timeout: 700,
                            className: "info"
                        })
                        return
                    }
                }
            }
        }
    }
    _e.bindAll(".plus", "click", addCart)

    var ping = 0

    function addCart() {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();

        ping = Number(document.querySelector(".amount").innerHTML)
        ping++
        document.querySelector(".amount").innerHTML = ping
        if (json.message[0].promotionflag == 1) {
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
            if (json.message[0].promotion[0].count < json.message[0].promotion[0].reapttimes) {
                if (ping < json.message[0].promotion[0].reapttimes - json.message[0].promotion[0].count) {
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
                    temporaryLocalStorage[i].amount++
                        if (temporaryLocalStorage[i].amount > temporaryLocalStorage[i].stockamount) {
                            _e.msgBox({
                                msg: "库存不足！",
                                timeout: 700,
                                className: "error"
                            })
                            return
                        }
                    document.querySelector(".icon-minuscircleo").style.display = "block"
                    localStorage.setItem('localStorageGoods', JSON.stringify(temporaryLocalStorage))
                    document.querySelector(".cartShow").innerHTML = '<i class="icon iconfont icon-shoppingcart"></i> <i class="icon iconfont tips icon-circles"></i>'
                    return
                }
            }
            temporaryLocalStorage[temporaryLocalStorageLength] = json.message[k]
            temporaryLocalStorage[temporaryLocalStorageLength]["amount"] = 1
            temporaryLocalStorage[temporaryLocalStorageLength]["flag"] = 1
            temporaryLocalStorage[temporaryLocalStorageLength]["deliverytimes"] = 11 * 60 * 60
            temporaryLocalStorageLength++
            document.querySelector(".icon-minuscircleo").style.display = "block"
            document.querySelector(".addTo b").innerHTML = ping
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

    var pingNum = 0
    _e.bind(".groipmax", "click", pinGrupNum)

    function pinGrupNum() {
        var groupAmt = document.querySelector(".groupamount")
        pingNum = groupAmt.innerHTML
        groupAmt.style.display = "block"
        pingNum++
        if (pingNum > json.message[0].biggestamount) {
            if (pingNum > document.querySelector(".groupstockamountJud").innerHTML) {
                _e.msgBox({
                    msg: "库存不足！",
                    timeout: 700,
                    className: "error"
                })
                return
            }
            _e.msgBox({
                msg: "可以买" + json.message[0].biggestamount + "份!",
                timeout: 700,
                className: "error"
            })
            return
        } else {
            var groupAmt = document.querySelector(".groupamount")
            groupAmt.innerHTML = pingNum
            var groipminDis = document.querySelector(".groipmin")
            groipminDis.style.display = "block"
        }
    }



    _e.bind(".groipmin", "click", reduceGrupNum)
    var reduceNum = 0

    function reduceGrupNum() {
        var groipminDis = document.querySelector(".groipmin")
        var groupAmt = document.querySelector(".groupamount")
        reduceNum = groupAmt.innerHTML
        reduceNum--
        groupAmt.innerHTML = reduceNum
        if (reduceNum == 0) {
            groipminDis.style.display = "none"
            groupAmt.style.display = "none"
        }
    }

    _e.bind(".groupCart", "click", subGrupCart)

    function subGrupCart() {
        var groupAmt = document.querySelector(".groupamount")
        var getGroupUrl = getJsUrl()
        if (groupAmt.innerHTML == "0") {
            pinGrupNum()
              console.log(getGroupUrl)
            location.href="groupconfirm.html?comid="+getGroupUrl[0]+"&aId="+getGroupUrl[1]+"&n="+groupAmt.innerHTML
        } else {
          location.href="groupconfirm.html?comid="+getGroupUrl[0]+"&aId="+getGroupUrl[1]+"&n="+groupAmt.innerHTML
        }
    }



}
