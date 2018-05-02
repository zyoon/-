/**
 * Created by bobodaren007 on 2016/7/22 0022.
 */
//显示购物车
// localStorage.removeItem("localStorageGoods")
var retrievedObject = localStorage.getItem('localStorageGoods')
var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
    // console.log(getlocalStorageGoods)
    // if (JSON.parse(localStorage.getItem('localStorageGoods')) != null) {
    //     for (var l = 0; l < JSON.parse(localStorage.getItem('localStorageGoods')).length; l++) {
    //         if (JSON.parse(localStorage.getItem('localStorageGoods'))[l].amount != 0) {
    //           //  document.querySelector(".showCart").innerHTML = '购物车<i class="icon iconfont tips icon-circles"></i>'
    //         }
    //     }
    // }

window.onload = subumitG

function subumitG() {

    var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
    var fd = new FormData(),
        xhr = new XMLHttpRequest()
    if (getlocalStorageGoods == null) return
    for (var j = 0; j < getlocalStorageGoods.length; j++) {
        if (getlocalStorageGoods[j].flag == 1) {
            fd.append("commodity", getlocalStorageGoods[j].id)
            fd.append("commodity_type", getlocalStorageGoods[j].commoditytype)
            fd.append("amount", parseFloat(getlocalStorageGoods[j].amount))
        }
    }
    xhr.open("POST", "/sales/settlement", true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rd = eval('(' + xhr.responseText + ');')
            console.log(rd);
            if (rd.res == 1) {
                loadGoodsData(rd)
            }
        }
    }
}

function loadGoodsData(rd) {
    var cartTotailData = document.querySelector(".cartTotail")
    cartTotailData.innerHTML = '¥ <span class="dataCash">' + rd.total / 100 + '</span>'
    cartTotailData.setAttribute("data-total", rd.total)

    if (rd.cashgift[0].cashgift > 0) {
        console.log("ss")
        var showC = document.querySelector(".showCash")
        document.querySelector(".cashgift").setAttribute("style", "display: block;height: 48px;line-height: 48px;border-bottom:1px solid #eee")
        showC.innerHTML = '钱包余额：¥ ' + rd.cashgift[0].cashgift / 100
        showC.setAttribute("data-cash", rd.cashgift[0].cashgift)
        _e.bind(".toggleOff,.toggleOn", "click", changeCash)
    }
    if (rd.coupon.length != 0) {
        document.querySelector(".coupon").setAttribute("style", "display:block")
        var arr = new Array()
        arr = rd.coupon.sort(function(a, b) {
            return a.pv - b.pv
        })
        console.log(arr)
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].flag == 1) {
                document.querySelector(".selectCpOpt").innerHTML += '<option data-id="' + arr[i].id + '" value="' + arr[i].pv / 100 + '">' + arr[i].intro + '</option>'
            } else {
                document.querySelector(".selectCpOpt").innerHTML += '<option disabled="true" data-id="' + arr[i].id + '" value="' + arr[i].pv / 100 + '">' + arr[i].intro + '</option>'
            }
        }
        _e.bind(".selectCpOpt", "change", selectCoupon)
    }
}


//加载用户选择配送时间
var myDate = new Date()
var presentTime = myDate.getHours()
var nowmin = myDate.getMinutes();
var price = 0
var addInfo = []
var presentSurplusTime = 23 - presentTime
var getOptParentNode = document.querySelector(".selectnode")
document.querySelector(".winbg").style.display = "none"

var Txhr = new XMLHttpRequest()
Txhr.open("POST", "/sales/getdeliverytime", true)
Txhr.send()
Txhr.onreadystatechange = function() {
    if (Txhr.readyState == 4 && Txhr.status == 200) {
        timeInfo = eval('(' + Txhr.responseText + ');')
        console.log(timeInfo);
        for (var i = 0; i < timeInfo.time.length; i++) {
            var newStart = timeInfo.time[i].start * 60
            var t = 2
            var time
            var timeC

            if (timeInfo.time[i].intime == 1 && presentTime * 60 > timeInfo.time[i].start * 60) {
                var createOpt = document.createElement("option")
                createOpt.innerHTML += "即时"
                createOpt.setAttribute("value", t)
                createOpt.setAttribute("data-time", "即时")
                getOptParentNode.appendChild(createOpt)
            }
            for (var j = 0; j <= (timeInfo.time[i].end - timeInfo.time[i].start) * 60 / (timeInfo.time[i].step); j++) {
                var createOpt = document.createElement("option")
                if (presentTime * 60 < timeInfo.time[i].restrict * 60) {
                    if (newStart > (presentTime * 60 + nowmin)) {
                        if (newStart % 60 == 0) {
                            time = GetDateStr(0, 0) + '日 ' + parseInt(newStart / 60) + ':00'
                            createOpt.setAttribute("data-nyr", GetDateStr(0, 0))
                        } else {
                            time = GetDateStr(0, 0) + '日 ' + parseInt(newStart / 60) + ':' + newStart % 60
                            createOpt.setAttribute("data-nyr", GetDateStr(0, 0))

                        }
                        if (newStart < 10 * 60) {
                            if (newStart % 60 == 0) {
                                timeC = GetDateStr(0, 1) + ' 0' + parseInt(newStart / 60) + ':0' + newStart % 60 + ':00'
                                createOpt.setAttribute("data-nyr", GetDateStr(0, 1))

                            } else {
                                timeC = GetDateStr(0, 1) + ' 0' + parseInt(newStart / 60) + ':' + newStart % 60 + ':00'
                                createOpt.setAttribute("data-nyr", GetDateStr(0, 1))

                            }
                        } else {
                            if (newStart % 60 == 0) {
                                timeC = GetDateStr(0, 1) + ' ' + parseInt(newStart / 60) + ':0' + newStart % 60 + ':00'
                                createOpt.setAttribute("data-nyr", GetDateStr(0, 1))

                            } else {
                                timeC = GetDateStr(0, 1) + ' ' + parseInt(newStart / 60) + ':' + newStart % 60 + ':00'
                                createOpt.setAttribute("data-nyr", GetDateStr(0, 1))

                            }
                        }
                        createOpt.setAttribute("data-h", parseInt(newStart / 60))
                        createOpt.setAttribute("data-min", newStart % 60)
                        createOpt.innerHTML += time
                        createOpt.setAttribute("value", t)
                        createOpt.setAttribute("data-time", timeC)
                        getOptParentNode.appendChild(createOpt)
                    }
                }

                if (presentTime * 60 >= timeInfo.time[timeInfo.time.length - 1].restrict * 60) {
                    var createOpt = document.createElement("option")
                    if (j == 0 && timeInfo.time[i].intime == 1) {
                        document.querySelector(".selectnode").removeChild(document.querySelector(".selectnode").children[1])
                    }
                    if (newStart % 60 == 0) {
                        time = GetDateStr(1, 0) + '日 ' + newStart / 60 + ':00'
                        createOpt.setAttribute("data-nyr", GetDateStr(1, 0))

                    } else {
                        time = GetDateStr(1, 0) + '日 ' + parseInt(newStart / 60) + ':' + newStart % 60

                        createOpt.setAttribute("data-nyr", GetDateStr(1, 0))
                    }
                    if (newStart < 10 * 60) {
                        if (newStart % 60 == 0) {
                            timeC = GetDateStr(1, 1) + ' 0' + newStart / 60 + ':0' + newStart % 60 + ':00'
                            createOpt.setAttribute("data-nyr", GetDateStr(1, 1))
                        } else {
                            timeC = GetDateStr(1, 1) + ' 0' + parseInt(newStart / 60) + ':' + newStart % 60 + ':00'
                            createOpt.setAttribute("data-nyr", GetDateStr(1, 1))
                        }
                    } else {
                        if (newStart % 60 == 0) {
                            timeC = GetDateStr(1, 1) + ' ' + newStart / 60 + ':0' + newStart % 60 + ':00'
                            createOpt.setAttribute("data-nyr", GetDateStr(1, 1))
                        } else {
                            timeC = GetDateStr(1, 1) + ' ' + parseInt(newStart / 60) + ':' + newStart % 60 + ':00'
                            createOpt.setAttribute("data-nyr", GetDateStr(1, 1))
                        }
                    }
                    createOpt.setAttribute("data-h", parseInt(newStart / 60))
                    createOpt.setAttribute("data-min", newStart % 60)
                    createOpt.innerHTML += time
                    createOpt.setAttribute("value", t)
                    createOpt.setAttribute("data-time", timeC)
                    getOptParentNode.appendChild(createOpt)
                }
                t++
                newStart = newStart + timeInfo.time[i].step

            }
        }
    }
}

var flex = document.querySelector("#flex")
var getItemDate = JSON.parse(localStorage.getItem("address"))
var fd = new FormData(),
    xhr = new XMLHttpRequest()

xhr.open("POST", "/adress/getflagadress", true)
xhr.send()
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        cartAddInfo = eval('(' + xhr.responseText + ');')
        console.log(cartAddInfo);
        addInfo = cartAddInfo
        loadAddInfo(cartAddInfo)
        openCartTips()

        var disct = 0
        var aaa = 0
        var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
        if (getlocalStorageGoods != null) {
            var num = getlocalStorageGoods.length
            for (var i = num; i > 0; i--) {
                //判断数量是否为0。提交订单的需要判断时候可以使用
                if (getlocalStorageGoods[i - 1].amount == 0 || getlocalStorageGoods[i - 1].amount < 0) {
                    getlocalStorageGoods.splice(i - 1, 1)
                    localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))
                }
            }


            for (var i = 0; i < getlocalStorageGoods.length; i++) {
                if (getlocalStorageGoods[i].flag == 0) continue
                var url = "location.href='goodsdetail.html?comid=" + getlocalStorageGoods[i].id + "&commoditytype=" + getlocalStorageGoods[i].commoditytype
                url += "'"
                var cartCommodity = '<ul class="flex" style="height:auto;padding: 0 10px;"><li class="flex-1" style="margin: 10px 5px;;"><h1 style="margin: 0 0 0 0;">' + getlocalStorageGoods[i].name + '</h1><h2 style="color:#999;font-size:14px"  class="preorderFlag" data-commoditytype="' + getlocalStorageGoods[i].commoditytype + '" data-id="' + getlocalStorageGoods[i].id + '" data-preorder="' + getlocalStorageGoods[i].promotionflag + '"></h2><h2 class="flex" style="font-size:14px;color:#CCC;margin: 0px 0px;"><p class="flex-1">规格 : ' + getlocalStorageGoods[i].specification + '</p><p class="flex-1 ta-center">¥ ' + getlocalStorageGoods[i].price / 100 + '</p><p class="flex-1 ta-right">x' + getlocalStorageGoods[i].amount + '</p></h2></li></ul>'
                    //促销方式为折扣，算的价钱是要除以几折的
                if (getlocalStorageGoods[i].commoditytype != 8) {
                    if (getlocalStorageGoods[i].promotionflag == 2) {
                        if (getlocalStorageGoods[i].promotion[0].count < getlocalStorageGoods[i].promotion[0].reapttimes) {
                            if (getlocalStorageGoods[i].amount <= (Number(getlocalStorageGoods[i].promotion[0].reapttimes) - Number(getlocalStorageGoods[i].promotion[0].count))) {
                                disct = disct + Number(getlocalStorageGoods[i].price) * Number(getlocalStorageGoods[i].promotion[0].discount) * getlocalStorageGoods[i].amount / 100

                            } else {
                                var disPrice = (Number(getlocalStorageGoods[i].promotion[0].reapttimes) - Number(getlocalStorageGoods[i].promotion[0].count)) * Number(getlocalStorageGoods[i].promotion[0].discount) * Number(getlocalStorageGoods[i].price) / 100
                                var disPricePrice = (getlocalStorageGoods[i].amount - (Number(getlocalStorageGoods[i].promotion[0].reapttimes) - Number(getlocalStorageGoods[i].promotion[0].count))) * Number(getlocalStorageGoods[i].price)
                                disct = disct + disPrice + disPricePrice
                            }
                        } else {
                            disct = disct + Number(getlocalStorageGoods[i].price) * getlocalStorageGoods[i].amount
                        }
                    } else {
                        price = price + Number(getlocalStorageGoods[i].price) * getlocalStorageGoods[i].amount
                    }
                    aaa = price + disct
                }
                if (getlocalStorageGoods[i].preorder >= 1) {
                    document.querySelector(".preorderGoodsType").style.display = "block"
                    document.querySelector(".pShipment").style.display = "block"

                    var addOne = document.querySelectorAll(".selectgoods")
                    var has_selectgoods = false
                    for (var j = 0; j < addOne.length; j++) {
                        if (addOne[j].getAttribute("data-preorder") == getlocalStorageGoods[i].preorder) {
                            var apendUl = document.createElement("ul")
                            apendUl.setAttribute("class", "flex")
                            apendUl.setAttribute("style", "height:auto;padding: 0 10px;")
                            apendUl.setAttribute("id", getlocalStorageGoods[i].id)
                            apendUl.setAttribute("data-preorder", getlocalStorageGoods[i].preorder)
                            apendUl.innerHTML = '<li class="flex-1" style="margin: 10px 5px;;"><h1 style="margin: 0 0 0 0;">' + getlocalStorageGoods[i].name + ' (提前' + getlocalStorageGoods[i].delivery_interval + '天预定)</h1><h2 style="color:#999;font-size:14px"  class="preorderFlag" data-commoditytype="' + getlocalStorageGoods[i].commoditytype + '" data-id="' + getlocalStorageGoods[i].id + '" data-preorder="' + getlocalStorageGoods[i].promotionflag + '"></h2><h2 class="flex" style="font-size:14px;color:#CCC;margin: 0px 0px;"><p class="flex-1">规格 : ' + getlocalStorageGoods[i].specification + '</p><p class="flex-1 ta-center">¥' + getlocalStorageGoods[i].price + '</p><p class="flex-1 ta-right">x' + getlocalStorageGoods[i].amount + '</p></h2></li>'
                            insertAfter(apendUl, addOne[j])
                            has_selectgoods = true
                        }
                    }
                    if (!has_selectgoods) {
                        document.querySelector(".reserveGoodsListCart").innerHTML += '<div class="deliveryTime selectgoods" data-preorder="' + getlocalStorageGoods[i].preorder + '"> <div class="select"> ' +
                            '<label data-preorder="' + getlocalStorageGoods[i].preorder + '" data-id="' + getlocalStorageGoods[i].id + '">选择预定商品配送时间</label> <select class="select selectPreorderTime" name="" data-id="' + getlocalStorageGoods[i].id + '"> ' +
                            '<option  disabled="disabled" selected="">选择预定商品配送时间</option> ' +
                            '</select> </div> </div>'
                        document.querySelector(".reserveGoodsListCart").innerHTML += '<ul class="flex" style="height:auto;padding: 0 10px;"><li class="flex-1" style="margin: 10px 5px;;"><h1 style="margin: 0 0 0 0;">' + getlocalStorageGoods[i].name + ' (提前' + getlocalStorageGoods[i].delivery_interval + '天预定)</h1><h2 style="color:#999;font-size:14px"  class="preorderFlag" data-commoditytype="' + getlocalStorageGoods[i].commoditytype + '" data-id="' + getlocalStorageGoods[i].id + '" data-preorder="' + getlocalStorageGoods[i].promotionflag + '"></h2><h2 class="flex" style="font-size:14px;color:#CCC;margin: 0px 0px;"><p class="flex-1">规格 : ' + getlocalStorageGoods[i].specification + '</p><p class="flex-1 ta-center">¥' + getlocalStorageGoods[i].price + '</p><p class="flex-1 ta-right">x' + getlocalStorageGoods[i].amount + '</p></h2></li></ul>'
                    }

                    if (presentTime >= 18) {
                        var flutime = Number(getlocalStorageGoods[i].delivery_interval) + 1
                        var preorderYMD = GetDateStr(flutime, 1)
                        var preorderDay = GetDateStr(flutime, 0)
                    } else {
                        var preorderYMD = GetDateStr(Number(getlocalStorageGoods[i].delivery_interval), 1)
                        var preorderDay = GetDateStr(Number(getlocalStorageGoods[i].delivery_interval), 0)
                    }

                    var preorderOpt = document.querySelectorAll(".selectPreorderTime")
                    var h = Number(getlocalStorageGoods[i].startorder)
                    for (var r = 0; r <= Number(getlocalStorageGoods[i].finishordder) - Number(getlocalStorageGoods[i].startorder); r++) {
                        for (var p = 0; p < preorderOpt.length; p++) {
                            if (preorderOpt[p].getAttribute("data-id") == getlocalStorageGoods[i].id) {
                                if (h < 10) {
                                    preorderOpt[p].innerHTML += '<option data-time="' + preorderYMD + ' 0' + h + ':00:00">' + preorderDay + '日 ' + h + ':00</option>'
                                } else {
                                    preorderOpt[p].innerHTML += '<option data-time="' + preorderYMD + ' ' + h + ':00:00">' + preorderDay + '日 ' + h + ':00</option>'
                                }
                                h++
                            }
                        }
                    }
                    _e.bindAll(".selectPreorderTime", "change", selectPreorderTime)
                }
                if (getlocalStorageGoods[i].preorder == 0) {
                    var immediatelySell = document.querySelector(".immediatelySell")
                    _e.bind(".selectnode", "change", selectTime)
                    document.querySelector(".deliveryTime").style.display = "block"
                    document.querySelector(".bShipment").style.display = "block"
                    immediatelySell.innerHTML += cartCommodity
                    if (getlocalStorageGoods[i].com != undefined) {
                        for (var m = 0; m < getlocalStorageGoods[i].com.length; m++) {
                            var giftaHtml = '<ul style="height: 40px" class="flex" id="' + getlocalStorageGoods[i].com[m].id + '" ><img style="height: 20px;width: 20px;" src="' + 'http://mrten-0.mrten.cn/' + getlocalStorageGoods[i].com[m].url + '" alt="" /><li class="flex-1">' +
                                '<h1 style="margin: 0px" \> <span>赠：</span> 【<span class="giftgoods" data-id="' + getlocalStorageGoods[i].com[m].id + '">' + getlocalStorageGoods[i].com[m].name + '</span>】' + '</span></h1></li></ul>'
                            immediatelySell.innerHTML += giftaHtml
                        }
                    }
                }
            }
        }

        function selectPreorderTime() {
            var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
            var phtml = ''
            var opt = this.querySelectorAll("option")
            for (var i = 0; i < opt.length; i++) {
                if (opt[i].selected == true) {
                    phtml = opt[i].innerHTML
                    var dataTime = Date.parse(new Date(opt[i].getAttribute("data-time"))) / 100
                        //   document.querySelector("label").setAttribute("data-time",Date.parse(new Date(opt[i].getAttribute("data-time")))/100)
                    this.parentNode.children[0].setAttribute("data-time", opt[i].getAttribute("data-time"))
                    console.log(opt[i].getAttribute("data-time"))
                }
            }
            this.parentNode.children[0].innerHTML = phtml
            for (var t = 0; t < getlocalStorageGoods.length; t++) {
                if (getlocalStorageGoods[t].preorder == this.parentNode.children[0].getAttribute("data-preorder")) {
                    getlocalStorageGoods[t].deliverytimes = this.parentNode.children[0].getAttribute("data-time")
                    console.log(getlocalStorageGoods[t])
                    localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))
                }
            }
        }

        var preorderFlag = document.querySelectorAll(".preorderFlag")
        for (var j = 0; j < preorderFlag.length; j++) {
            for (var k = 0; k < getlocalStorageGoods.length; k++) {
                if (preorderFlag[j].getAttribute("data-id") == getlocalStorageGoods[k].id) {
                    // document.querySelector(".pricecolor").style.color = "#e4393c"
                    if (preorderFlag[j].getAttribute("data-preorder") == 1) {
                        preorderFlag[j].parentNode.childNodes[2].childNodes[1].style.color = "#e4393c"
                        preorderFlag[j].innerHTML = '买 ' + getlocalStorageGoods[k].promotion[0].data.buys + ' 送 ' + getlocalStorageGoods[k].promotion[0].data.gifts
                    }
                    if (preorderFlag[j].getAttribute("data-preorder") == 2) {
                        preorderFlag[j].parentNode.childNodes[2].childNodes[1].innerHTML = '¥ ' + getlocalStorageGoods[k].price / 100 * getlocalStorageGoods[k].promotion[0].discount / 100
                        preorderFlag[j].parentNode.childNodes[2].childNodes[1].style.color = "#e4393c"
                        preorderFlag[j].innerHTML = getlocalStorageGoods[k].promotion[0].discount / 10 + ' 折 /<strike>原价 : ¥ ' + getlocalStorageGoods[k].price / 100 + '</strike>'
                    }
                    if (preorderFlag[j].getAttribute("data-preorder") == 3) {
                        preorderFlag[j].parentNode.childNodes[2].childNodes[1].style.color = "#e4393c"
                        preorderFlag[j].innerHTML = '赠：优惠券' + getlocalStorageGoods[k].promotion[0].pv / 100 + '元'
                    }
                    if (preorderFlag[j].getAttribute("data-preorder") == 4) {
                        preorderFlag[j].parentNode.childNodes[2].childNodes[1].style.color = "#e4393c"
                        preorderFlag[j].innerHTML = '赠：红包' + getlocalStorageGoods[k].promotion[0].cashgift / 100 + '元'
                    }
                }
            }
        }

        function insertAfter(newEl, targetEl) {
            var parentEl = targetEl.parentNode;
            if (parentEl.lastChild == targetEl) {
                parentEl.appendChild(newEl);
            } else {
                parentEl.insertBefore(newEl, targetEl.nextSibling);
            }
        }



        // var CheckoutHtml = '<div class="flex"> <ul class="flex-1">共计 ：' +
        //     ' <span class="cartTotail">¥ ' + /*Math.floor(aaa * 100) / 100*/ aaa / 100 + '</span><b>不含配送费</b></ul><li><button type="button" class="bgc-17D7B0 openCartTips">提交·订单</button></li></div>'
        // var checkOut = document.querySelector(".checkOut")
        // checkOut.innerHTML = CheckoutHtml

        //提交订单
        _e.bind(".submitdata", "click", submitCart)

        function submitCart() {
            var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
                //下订单的时候如果数量减到0，商品是否继续提交。
            if (getlocalStorageGoods == null || getlocalStorageGoods.length == 0) {
                _e.msgBox({
                    msg: "请先选择商品！",
                    timeout: 2000,
                    className: "info"
                })
                return
            } else {
                var spt = document.querySelectorAll(".selectPreorderTime")
                if (spt.length != 0) {
                    for (var f = 0; f < spt.length; f++) {
                        if (spt[f].value == "选择预定商品配送时间") {
                            _e.msgBox({
                                msg: "请选择预定商品时间！",
                                timeout: 700,
                                className: "info"
                            })
                            return
                        }
                    }
                }





                var fd = new FormData(),
                    xhr = new XMLHttpRequest()
                for (var i = 0; i < getlocalStorageGoods.length; i++) {
                    if (getlocalStorageGoods[i].flag == 1) {
                        var getLabelTime = document.querySelectorAll("label")[1]
                        if (getlocalStorageGoods[i].preorder == 0) {
                            if (getLabelTime.innerHTML == "便利店商品 选择配送时间") {
                                _e.msgBox({
                                    msg: "请先选择配送时间！",
                                    timeout: 2000,
                                    className: "info"
                                })
                                return
                            } else {
                                getlocalStorageGoods[i].deliverytimes = getLabelTime.getAttribute("data-time")
                            }
                        }
                        //下订单
                        if (getlocalStorageGoods.length == 0) {
                            _e.msgBox({
                                msg: "请先选择商品！",
                                timeout: 2000,
                                className: "info"
                            })
                            return
                        }

                        fd.append("id", getlocalStorageGoods[i].id)
                        fd.append("amount", getlocalStorageGoods[i].amount) //数量
                        fd.append("ordertype", getlocalStorageGoods[i].preorder) //
                        fd.append("deliverytimes", getlocalStorageGoods[i].deliverytimes)
                        console.log(getlocalStorageGoods[i].deliverytimes);
                        if (addInfo.address.length == 0) { //地址判空
                            _e.msgBox({
                                msg: "请填写地址！",
                                timeout: 2000,
                                className: "error"
                            })
                            return
                        } else {
                            //后端需要的地址数据
                            var submitAddress = document.querySelector(".addInfoHtml")
                            fd.append("name", submitAddress.getAttribute("data-name"))
                            fd.append("gender", submitAddress.getAttribute("data-gender"))
                            fd.append("phone", submitAddress.getAttribute("data-phone"))
                            fd.append("address", submitAddress.getAttribute("data-address"))
                            fd.append("subid", Number(submitAddress.getAttribute("data-subid")))
                        }

                        fd.append("specification", getlocalStorageGoods[i].specification) //规格
                    }
                }

                if (document.querySelector(".freeTime").getAttribute("data-time") == null) {

                    fd.append("tod", "") //送达时间
                } else {
                    fd.append("tod", document.querySelector(".freeTime").getAttribute("data-time")) //送达时间
                }
                fd.append("ordermemo", document.querySelector(".freebackReplyTextarea").value) //留言
                console.log(document.querySelector(".toggleOn"));
                if (document.querySelector(".toggleOn") == null) {
                    fd.append("cashgift", 0)
                } else {
                    fd.append("cashgift", 1)
                }
                var a = document.querySelector(".selectCpOpt").selectedIndex

                if (a == 0) {
                    fd.append("coupon", 0)
                } else {
                    fd.append("coupon", document.querySelector(".selectCpOpt").options[a].getAttribute("data-id"))
                }
                //fd.append("coupon", document.querySelector(".selectCpOpt").options[a].getAttribute("data-id"))
                xhr.open("POST", "/sales/newcreateorder", true)
                xhr.send(fd)
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var d = eval('(' + xhr.responseText + ');')
                        console.log(d)
                        if (d.res == 1) {
                            _e.msgBox({
                                msg: "提交成功！",
                                timeout: 2000,
                                className: "success"
                            })

                            //  localStorage.removeItem("localStorageGoods")
                            //把用户买了的数据从localstroge中删掉，从后向前删除
                            var GLSGF = JSON.parse(localStorage.getItem('localStorageGoods'))
                            var num = GLSGF.length
                            for (var i = num; i > 0; i--) {
                                //判断数量是否为0。提交订单的需要判断时候可以使用
                                if (GLSGF[i - 1].flag==1) {
                                    GLSGF.splice(i - 1, 1)
                                    localStorage.setItem('localStorageGoods', JSON.stringify(GLSGF))
                                }
                            }
                            if(d.total==0){
                                            var xmr = new XMLHttpRequest()
                                        xmr.open("GET", "/sales/createDelivery?orderid=" + d.orderid, true);
                                        xmr.onreadystatechange = function() {
                                            if (xmr.readyState == 4 && xmr.status == 200) {
                                              var d = eval('(' + xmr.responseText + ');')
                                                if (d.res == 1) {
                                                  window.location.href = 'orderdetail.html?orderid=' + d.orderid
                                                }
                                            }
                                        }
                                        xmr.send()
                                        window.location.href = 'orderdetail.html?orderid=' + d.orderid

                           }else{
                            var xml = new XMLHttpRequest();
                            xml.open("POST", "/sales/pay/wxpub", false);
                            xml.setRequestHeader("Content-type", "application/json");
                            xml.onreadystatechange = function() {
                                if (xml.readyState == 4 && xml.status == 200) {
                                    var charge = eval('(' + xml.responseText + ')');
                                    pingpp.createPayment(charge, function(result, error) {
                                        if (result == "success") {
                                                    //    window.location.reload()
                                         window.location.href = 'orderdetail.html?orderid=' + d.orderid
                                        } else if (result == "fail") {
                                            alert("支付失败");
                                            window.location.href = 'orderdetail.html?orderid=' + d.orderid

                                        } else if (result == "cancel") {
                                            alert("取消支付");
                                            window.location.href = 'orderdetail.html?orderid=' + d.orderid
                                        }
                                    });
                                }
                            }
                            xml.send(JSON.stringify({
                                channel: 'wx_pub',
                                amount: 1,
                                orderid:d.orderid
                            }))
                          }
                            document.querySelector(".freebackReplyTextarea").value = ''
                          //  window.location.href = 'orderdetail.html?orderid=' + d.orderid
                                // setTimeout("window.location.href='orderdetail.html?subod=-1'",1500)
                        }
                        if (d.res == -1) {
                            _e.msgBox({
                                msg: "提交失败！",
                                timeout: 2000,
                                className: "error"
                            })
                            return
                        }
                        if (d.res == -2) {
                            _e.msgBox({
                                msg: d.msg + "！",
                                timeout: 2000,
                                className: "error"
                            })
                            return
                        }
                    }
                }
            }
        }




        document.querySelector(".openCartTips").addEventListener("click", subopenCartTips)



        function openCartTips() {

            var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
            if (getlocalStorageGoods == null || getlocalStorageGoods.length == 0) {
                _e.msgBox({
                    msg: "请先选择商品！",
                    timeout: 500,
                    className: "info"
                })
                return
            } else {
                if (cartAddInfo.address.length == 0) {
                    _e.msgBox({
                        msg: "请完善地址信息！",
                        timeout: 2000,
                        className: "error"
                    })
                    return
                }
                var dCount = 0
                var pCount = 0
                for (var i = 0; i < getlocalStorageGoods.length; i++) {
                    if (Number(getlocalStorageGoods[i].flag) == 0) continue

                    if (Number(getlocalStorageGoods[i].commoditytype) == 8) continue
                    if (Number(getlocalStorageGoods[i].commoditytype) == 7) {
                        if (Number(getlocalStorageGoods[i].promotionflag == 2)) {
                            if (Number(getlocalStorageGoods[i].promotion[0].count) < Number(getlocalStorageGoods[i].promotion[0].reapttimes)) {
                                if ((Number(getlocalStorageGoods[i].amount) <= (Number(getlocalStorageGoods[i].promotion[0].reapttimes) - Number(getlocalStorageGoods[i].promotion[0].count)))) {
                                    pCount = pCount + (Number(getlocalStorageGoods[i].amount) * Number(getlocalStorageGoods[i].price) * Number(getlocalStorageGoods[i].promotion[0].discount)) / 100
                                } else {
                                    pCount = pCount + (((Number(getlocalStorageGoods[i].amount) - (Number(getlocalStorageGoods[i].promotion[0].reapttimes) - Number(getlocalStorageGoods[i].promotion[0].count)))) * Number(getlocalStorageGoods[i].price)) + ((Number(getlocalStorageGoods[i].promotion[0].reapttimes) - Number(getlocalStorageGoods[i].promotion[0].count)) * Number(getlocalStorageGoods[i].price) * Number(getlocalStorageGoods[i].promotion[0].discount)) / 100
                                }
                            } else {
                                pCount = pCount + Number(getlocalStorageGoods[i].price) * Number(getlocalStorageGoods[i].amount)
                            }
                        } else {
                            pCount = pCount + Number(getlocalStorageGoods[i].price) * Number(getlocalStorageGoods[i].amount)
                        }
                    } else {
                        if (Number(getlocalStorageGoods[i].promotionflag == 2)) {
                            if (Number(getlocalStorageGoods[i].promotion[0].count) < Number(getlocalStorageGoods[i].promotion[0].reapttimes)) {
                                if ((Number(getlocalStorageGoods[i].amount) <= (Number(getlocalStorageGoods[i].promotion[0].reapttimes) - Number(getlocalStorageGoods[i].promotion[0].count)))) {
                                    dCount = dCount + (Number(getlocalStorageGoods[i].amount) * Number(getlocalStorageGoods[i].price) * Number(getlocalStorageGoods[i].promotion[0].discount)) / 100
                                } else {
                                    dCount = dCount + (((Number(getlocalStorageGoods[i].amount) - (Number(getlocalStorageGoods[i].promotion[0].reapttimes) - Number(getlocalStorageGoods[i].promotion[0].count)))) * Number(getlocalStorageGoods[i].price)) + ((Number(getlocalStorageGoods[i].promotion[0].reapttimes) - Number(getlocalStorageGoods[i].promotion[0].count)) * Number(getlocalStorageGoods[i].price) * Number(getlocalStorageGoods[i].promotion[0].discount)) / 100
                                }
                            } else {
                                dCount = dCount + Number(getlocalStorageGoods[i].price) * Number(getlocalStorageGoods[i].amount)
                            }
                        } else {
                            dCount = dCount + Number(getlocalStorageGoods[i].price) * Number(getlocalStorageGoods[i].amount)
                        }
                    }
                }
                document.querySelector(".deliveryfee").innerHTML = ''

                if (pCount != 0) {
                    if (pCount < addInfo.address[0].p_freedeliverythreshold) {
                        document.querySelector(".deliveryfee").innerHTML += '<h1>本次预定订单配送费' + (addInfo.address[0].p_deliveryfee) / 100 + '元，还差' + (addInfo.address[0].p_freedeliverythreshold - pCount) / 100 + '元可免费配送</h1>'
                        document.querySelector(".pMoney").innerHTML = '¥ ' + (addInfo.address[0].p_deliverytime) / 100
                    } else {
                        document.querySelector(".deliveryfee").innerHTML += '<h1>预定订单免费配送</h1>'
                        document.querySelector('.pMoney').innerHTML = '¥ 0'
                    }
                }
                if (dCount != 0) {

                    if (dCount < addInfo.address[0].b_freedeliverythreshold) {
                        document.querySelector(".deliveryfee").innerHTML += '<h1>本次便利店订单配送费' + (addInfo.address[0].b_deliveryfee) / 100 + '元，还差' + (addInfo.address[0].b_freedeliverythreshold - dCount) / 100 + '元可免费配送</h1>'
                        document.querySelector(".bMoney").innerHTML = '¥ ' + (addInfo.address[0].b_deliveryfee) / 100
                    } else {
                        document.querySelector('.bMoney').innerHTML = '¥ 0'
                        document.querySelector(".deliveryfee").innerHTML += '<h1>本次便利店订单免费配送</h1>'
                    }
                }



                document.querySelector(".deliveryfee").innerHTML += '<h2>是否继续？</h2>'
            }
            var dp = [dCount, pCount, addInfo.address[0].b_freedeliverythreshold, addInfo.address[0].p_freedeliverythreshold]
            return dp

        }

        function subopenCartTips() {
            var rdp = openCartTips()
            console.log(rdp);
            var d = rdp[0]
            var p = rdp[1]
            var df = rdp[2]
            var pf = rdp[3]
            if (d >= df && p == 0) {
                submitCart()
            }
            if (p >= pf && d == 0) {
                submitCart()
            }
            if (d >= df && p >= pf && d > 0 && p > 0) {
                submitCart()
            }


            if ((d < df && p == 0) || (d < df && p < pf) || (p < pf && d == 0)) {
                document.querySelector(".tipsWin").style.display = "block"
                document.querySelector(".closewin").style.display = "block"
                document.querySelector("body").style.overflow = "hidden"
            }

        }


        document.querySelector(".closewin").addEventListener("click", function() {
            document.querySelector(".tipsWin").style.display = "none"
            document.querySelector(".closewin").style.display = "none"
            document.querySelector("body").style.overflow = "auto"
        }, true)







        String.prototype.TextFilter = function() {
            var pattern = new RegExp("[~`@#$%^&*<>《》￥||·—_=]"); //[]内输入你要过滤的字符，这里是我的
            var rs = "";
            for (var i = 0; i < this.length; i++) {
                rs += this.substr(i, 1).replace(pattern, '');
            }
            return rs;
        }


        // _e.bindAll(".icon-pluscircle", "click", numBoxPing)
        // _e.bindAll(".icon-minuscircleo", "click", numBoxReduce)


        function numBoxPing() {
            var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
            for (var k = 0; k < getlocalStorageGoods.length; k++) {
                if (this.parentNode.parentNode.parentNode.parentNode.id == getlocalStorageGoods[k].id && this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-preorder") == getlocalStorageGoods[k].preorder) {
                    getlocalStorageGoods[k].amount++
                        if (getlocalStorageGoods[k].amount > getlocalStorageGoods[k].stockamount) {
                            _e.msgBox({
                                msg: "库存不足！",
                                timeout: 2000,
                                className: "error"
                            })
                            return
                        }

                    if (this.getAttribute("data-promotionflag") == "3" || this.getAttribute("data-promotionflag") == "1" || this.getAttribute("data-promotionflag") == "4") {
                        if (getlocalStorageGoods[k].amount > Number(getlocalStorageGoods[k].promotion[0].repeatpurchasetimes)) {
                            _e.msgBox({
                                msg: "不享受优惠！",
                                timeout: 700,
                                className: "info"
                            })
                            return
                        }
                    }
                    if (this.getAttribute("data-promotionflag") == "2") {
                        if (getlocalStorageGoods[k].amount > Number(getlocalStorageGoods[k].promotion[0].repeatpurchasetimes)) {
                            _e.msgBox({
                                msg: "不享受优惠！",
                                timeout: 700,
                                className: "info"
                            })
                            return
                        }
                        if (getlocalStorageGoods[k].promotion[0].count < getlocalStorageGoods[k].promotion[0].reapttimes) {
                            if (getlocalStorageGoods[k].amount <= Number(getlocalStorageGoods[k].promotion[0].reapttimes) - Number(getlocalStorageGoods[k].promotion[0].count)) {
                                document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa + (Number(getlocalStorageGoods[k].price) * Number(getlocalStorageGoods[k].promotion[0].discount)) / 100) / 100
                                aaa = (aaa + (Number(getlocalStorageGoods[k].price) * Number(getlocalStorageGoods[k].promotion[0].discount)) / 100)
                            } else {
                                document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa + Number(getlocalStorageGoods[k].price)) / 100
                                aaa = aaa + Number(getlocalStorageGoods[k].price)
                            }
                        } else {
                            document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa + Number(getlocalStorageGoods[k].price)) / 100
                            aaa = aaa + Number(getlocalStorageGoods[k].price)
                        }
                    } else {
                        document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa + Number(getlocalStorageGoods[k].price)) / 100
                        aaa = aaa + Number(getlocalStorageGoods[k].price)
                    }
                    if (getlocalStorageGoods[k].promotion.length != 0) {
                        if (getlocalStorageGoods[k].promotionflag == 2) {
                            if (getlocalStorageGoods[k].promotion[0].count < getlocalStorageGoods[k].promotion[0].reapttimes) {
                                if (getlocalStorageGoods[k].amount > getlocalStorageGoods[k].promotion[0].reapttimes - getlocalStorageGoods[k].promotion[0].count) {
                                    _e.msgBox({
                                        msg: "不享受优惠！",
                                        timeout: 2000,
                                        className: "error"

                                    })
                                }
                            }
                        }
                        if (getlocalStorageGoods[k].promotionflag == 1 || getlocalStorageGoods[k].promotionflag == 3 || getlocalStorageGoods[k].promotionflag == 4) {
                            if (getlocalStorageGoods[k].promotion[0].count < getlocalStorageGoods[k].promotion[0].reapttimes) {
                                if (getlocalStorageGoods[k].amount > getlocalStorageGoods[k].promotion[0].reapttimes - getlocalStorageGoods[k].promotion[0].count) {
                                    _e.msgBox({
                                        msg: "不享受优惠！",
                                        timeout: 2000,
                                        className: "error"

                                    })
                                }
                            }
                        }
                    }
                    this.parentNode.childNodes[2].innerHTML = getlocalStorageGoods[k].amount
                    localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))

                    openCartTips()
                    return
                }
            }
        }



        function numBoxReduce() {

            var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
            for (var k = 0; k < getlocalStorageGoods.length; k++) {
                if (this.parentNode.parentNode.parentNode.parentNode.id == getlocalStorageGoods[k].id && this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-preorder") == getlocalStorageGoods[k].preorder) {
                    getlocalStorageGoods[k].amount--
                        console.log(getlocalStorageGoods[k].amount);
                    if (this.getAttribute("data-promotionflag") == "2") {
                        console.log(getlocalStorageGoods[k].amount)
                        if (getlocalStorageGoods[k].promotion[0].count < getlocalStorageGoods[k].promotion[0].reapttimes) {
                            if (getlocalStorageGoods[k].amount <= Number(getlocalStorageGoods[k].promotion[0].reapttimes) - Number(getlocalStorageGoods[k].promotion[0].count)) {
                                document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa - (Number(getlocalStorageGoods[k].price) * Number(getlocalStorageGoods[k].promotion[0].discount)) / 100) / 100
                                aaa = (aaa - (Number(getlocalStorageGoods[k].price) * Number(getlocalStorageGoods[k].promotion[0].discount)) / 100)
                            } else {
                                document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa - Number(getlocalStorageGoods[k].price)) / 100
                                aaa = aaa - Number(getlocalStorageGoods[k].price)
                                console.log(aaa)
                            }
                        } else {
                            document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa - Number(getlocalStorageGoods[k].price)) / 100
                            aaa = aaa - Number(getlocalStorageGoods[k].price)
                        }
                    } else {
                        document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa - Number(getlocalStorageGoods[k].price)) / 100
                        aaa = aaa - Number(getlocalStorageGoods[k].price)
                    }


                    if (getlocalStorageGoods[k].promotion.length != 0) {
                        if (getlocalStorageGoods[k].promotionflag == 2) {
                            if (getlocalStorageGoods[k].promotion[0].count < getlocalStorageGoods[k].promotion[0].reapttimes) {
                                if (getlocalStorageGoods[k].amount <= getlocalStorageGoods[k].promotion[0].reapttimes - getlocalStorageGoods[k].promotion[0].count) {
                                    _e.msgBox({
                                        msg: "享受优惠！",
                                        timeout: 2000,
                                        className: "info"

                                    })
                                }
                            }
                        }
                        if (getlocalStorageGoods[k].promotionflag == 1 || getlocalStorageGoods[k].promotionflag == 3 || getlocalStorageGoods[k].promotionflag == 4) {
                            if (getlocalStorageGoods[k].promotion[0].count < getlocalStorageGoods[k].promotion[0].reapttimes) {
                                if (getlocalStorageGoods[k].amount <= getlocalStorageGoods[k].promotion[0].reapttimes - getlocalStorageGoods[k].promotion[0].count) {
                                    _e.msgBox({
                                        msg: "享受优惠！",
                                        timeout: 2000,
                                        className: "info"

                                    })
                                }
                            }
                        }
                    }
                    this.parentNode.childNodes[2].innerHTML = getlocalStorageGoods[k].amount
                    localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))
                    openCartTips()
                        //  var showcart = document.querySelector(".showCart")
                    if (getlocalStorageGoods[k].amount == 0) {
                        this.parentNode.childNodes[1].style.display = "none"
                        this.parentNode.childNodes[2].innerHTML = null
                        this.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.parentNode)
                        var num = getlocalStorageGoods.length

                        for (var i = num; i > 0; i--) {
                            //判断数量是否为0。提交订单的需要判断时候可以使用
                            if (getlocalStorageGoods[i - 1].amount == 0 || getlocalStorageGoods[i - 1].amount < 0) {
                                getlocalStorageGoods.splice(i - 1, 1)
                                localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))
                            }
                        }
                        var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
                        console.log(getlocalStorageGoods);
                        if (getlocalStorageGoods.length == 0) {
                            document.querySelector(".deliveryTime").style.display = "none"
                        }
                        if (JSON.parse(localStorage.getItem('localStorageGoods')) != null) {
                            if (JSON.parse(localStorage.getItem('localStorageGoods')).length != 0) {
                                for (var l = 0; l < JSON.parse(localStorage.getItem('localStorageGoods')).length; l++) {

                                    if (JSON.parse(localStorage.getItem('localStorageGoods'))[l].amount != 0) {
                                        console.log(JSON.parse(localStorage.getItem('localStorageGoods'))[l].amount);
                                        //  showcart.innerHTML = '购物车<i class="icon iconfont tips icon-circles"></i>'
                                        return
                                    } else {
                                        //  showcart.innerHTML = '购物车'
                                    }
                                }
                            } else {
                                //  showcart.innerHTML = '购物车'
                                return
                            }
                        } else {
                            showcart.innerHTML = '购物车'
                            return
                        }
                        return
                    }
                    return
                }
            }
        }

    }
}

var subid = 0
    //购物车加载地址
var address = ""

function loadAddInfo(cartAddInfo) {
    addInfo = cartAddInfo
    var addList = document.querySelector(".address");
    if (cartAddInfo.address.length == 0) {
        var cartInfoHtml = '<div class="flex"> <ul><i class="icon iconfont icon-location"></i></ul> <li class="flex-1"> ' +
            '<h1><b>请完善地址信息</b><span></span></h1> <h2></h2></li>' +
            ' <p><i class="icon iconfont icon-arrowright"></i></p> </div>'
        addList.innerHTML += cartInfoHtml
        _e.msgBox({
            msg: "请完善地址信息！",
            timeout: 2000,
            className: "error"
        })
        return
    } else {
        for (var i = 0; i < cartAddInfo.address.length; i++) {
            var cartInfoHtml = '<div class="addInfoHtml flex" data-name="' + cartAddInfo.address[0].name + '" data-id="' + cartAddInfo.address[0].subid + '" data-phone="' + cartAddInfo.address[0].phone + '" data-gender="' + cartAddInfo.address[0].gender + '" data-address="' + cartAddInfo.address[0].adress + '"> <ul><i class="icon iconfont icon-location"></i></ul> <li class="flex-1"> ' +
                '<h1><b>' + cartAddInfo.address[0].name + '</b><span>' + cartAddInfo.address[0].gender + '</span>' + cartAddInfo.address[0].phone + '</h1> <h2>' + cartAddInfo.address[0].adress + '</h2></li>' +
                ' <p><i class="icon iconfont icon-arrowright"></i></p> </div>'
            addList.innerHTML += cartInfoHtml
        }
        subid = cartAddInfo.address[0].subid
        address = cartAddInfo.address[0].adress
    }


    document.querySelector(".bfree").innerHTML = '本单满' + (cartAddInfo.address[0].b_freedeliverythreshold) / 100 + '元可免配送费'
    document.querySelector(".bMoney").innerHTML = '¥ ' + (cartAddInfo.address[0].b_deliveryfee) / 100 + '.00'
    document.querySelector(".pfree").innerHTML = '本单满' + (cartAddInfo.address[0].p_freedeliverythreshold) / 100 + '元可免配送费'
    document.querySelector(".pMoney").innerHTML = '¥ ' + (cartAddInfo.address[0].p_deliveryfee) / 100 + '.00'
    document.querySelector(".freeTime").innerHTML = '本次配送时间预计' + cartAddInfo.address[0].b_deliverytime + '分钟'
    document.querySelector(".freeTime").setAttribute("data-freetime", cartAddInfo.address[0].b_deliverytime)
}
//昨天:-1 今天:0 明天1 .....
function GetDateStr(AddDayCount, num) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    var day = d
    if (m >= 1 && m <= 9) {
        m = "0" + m;
    }
    if (d >= 0 && d <= 9) {
        d = "0" + d;
    }
    if (num == 1) {
        return y + "-" + m + "-" + d;
    } else {
        return day
    }
}
//选中配送时间

function selectCoupon() {
    var labelcoupon = document.querySelector('.changecoupon')
    var opt = this.querySelectorAll("option")
    for (var i = 0; i < opt.length; i++) {
        if (opt[i].selected == true) {
            whtml = opt[i].innerHTML
        }
    }

    var optValue = document.querySelector(".selectCpOpt")
    var nowCash = document.querySelector(".showCash").getAttribute("data-cash")
    var nowTotal = document.querySelector('.cartTotail').getAttribute("data-total")
    var rewriteTotal = document.querySelector(".dataCash")

    if (document.querySelector(".toggleOn") == null) {
        rewriteTotal.innerHTML = (parseInt(nowTotal) - parseInt(optValue.value * 100)) / 100
    } else {
        /* console.log((selectOption.value*100+cashGift) <= totalprice)*/
        if ((parseInt(optValue.value * 100) + parseInt(nowCash)) <= parseInt(nowTotal)) {
            rewriteTotal.innerHTML = ' ' + (parseInt(nowTotal) - parseInt(optValue.value * 100) - parseInt(nowCash)) / 100
        } else {
            rewriteTotal.innerHTML = ' ' + 0
        }
    }

    labelcoupon.innerHTML = whtml
}


function selectTime() {
    // var whtml=''
    var iL = document.querySelectorAll("label")[1]
    var dataFrerTime = document.querySelector(".freeTime")
    var opt = this.querySelectorAll("option")
    for (var i = 0; i < opt.length; i++) {
        if (opt[i].selected == true) {
            whtml = opt[i].innerHTML
            iL.setAttribute("data-time", opt[i].getAttribute("data-time"))
            var datanyr = opt[i].getAttribute("data-nyr")
            if (opt[i].getAttribute("data-time") == "即时") {
                //dataFrerTime.innerHTML = '本次配送预计' + Number(dataFrerTime.getAttribute("data-freetime")) + '分钟到达'

                var now = new Date();
                var hh = now.getHours(); //时
                var mm = now.getMinutes();
                var second = hh * 60 + mm + Number(dataFrerTime.getAttribute("data-freetime"))
                if (hh < 10) {
                    if (second % 60 < 10) {
                        dataFrerTime.setAttribute("data-time", GetDateStr(0, 1) + " 0" + parseInt(second / 60) + ":0" + second % 60 + ":00")
                        dataFrerTime.innerHTML = '本次配送预计 0' + parseInt(second / 60) + ':0' + second % 60 + '到达'
                    } else {
                        dataFrerTime.setAttribute("data-time", GetDateStr(0, 1) + " 0" + parseInt(second / 60) + ":" + second % 60 + ":00")
                        dataFrerTime.innerHTML = '本次配送预计 0' + parseInt(second / 60) + ':' + second % 60 + '到达'
                    }
                } else {
                    if (second % 60 < 10) {
                        dataFrerTime.setAttribute("data-time", GetDateStr(0, 1) + " " + parseInt(second / 60) + ":0" + second % 60 + ":00")
                        dataFrerTime.innerHTML = '本次配送预计' + parseInt(second / 60) + ':0' + second % 60 + '到达'
                    } else {
                        dataFrerTime.setAttribute("data-time", GetDateStr(0, 1) + " " + parseInt(second / 60) + ":" + second % 60 + ":00")
                        dataFrerTime.innerHTML = '本次配送预计' + parseInt(second / 60) + ':' + second % 60 + '到达'
                    }
                }
            } else {
                var hMin = Number(opt[i].getAttribute("data-h")) * 60 + Number(opt[i].getAttribute("data-min")) + Number(dataFrerTime.getAttribute("data-freetime"))
                if (hMin % 60 == 0) {
                    dataFrerTime.innerHTML = '本次配送预计' + parseInt(hMin / 60) + ':0' + hMin % 60 + '到达'
                    dataFrerTime.setAttribute("data-time", datanyr + " " + parseInt(hMin / 60) + ':0' + hMin % 60 + ":00")
                } else {
                    dataFrerTime.innerHTML = '本次配送预计' + parseInt(hMin / 60) + ':' + hMin % 60 + '到达'
                    dataFrerTime.setAttribute("data-time", datanyr + " " + parseInt(hMin / 60) + ':' + hMin % 60 + ":00")

                }
            }
        }
    }
    iL.innerHTML = whtml
}
var qrysTextareacClas = document.querySelector(".freebackReplyTextarea")
var minHeight = qrysTextareacClas.offsetHeight //保存初始高度
function HAuto(e) {
    if (e.value.length >= 50) {
        e.value = e.value.substr(0, 50)
        _e.msgBox({
            msg: "50字以内！",
            timeout: 1000,
            className: "error"

        })
        return
    }
    var uname = e.value; //通过ID取到texteara的值
    var txt = uname.TextFilter(); //调用上面的去字符方法
    if (txt != uname) {
        e.value = e.value.substr(0, e.value.length - 1); //将最后输入的字符去除
        _e.msgBox({
            msg: "请勿输入非法字符！",
            timeout: 1000,
            className: "error"

        })
        return
    }

    var height, style = qrysTextareacClas.style
    qrysTextareacClas.style.height = minHeight + 'px'
        //判断现在的高度和初始的高度
    if (qrysTextareacClas.scrollHeight > minHeight) {
        if (qrysTextareacClas.maxHeight && qrysTextareacClas.scrollHeight > qrysTextareacClas.maxHeight) {
            height = qrysTextareacClas.maxHeight;
            style.overflowY = 'scroll'
        } else {
            height = qrysTextareacClas.scrollHeight;
            style.overflowY = 'hidden'
        }
        style.height = height + 'px'
        return
    }
}

function checkEnter(e) {
    var et = e || window.event;
    var keycode = et.charCode || et.keyCode;
    if (keycode == 13 || keycode == 32) {
        if (window.event)
            window.event.returnValue = false;
        else
            e.preventDefault(); //for firefox
    }
}



function changeCash() {
    console.log(this.getAttribute("class"))
    var optValue = document.querySelector(".selectCpOpt")
    var nowCash = document.querySelector(".showCash").getAttribute("data-cash")
    var nowTotal = document.querySelector('.cartTotail').getAttribute("data-total")
    var rewriteTotal = document.querySelector(".dataCash")
    if (this.getAttribute("class") == "toggleOff") {
        this.setAttribute("class", "toggleOn")
        if (optValue.value == "0") {
            if (parseInt(nowCash) >= parseInt(nowTotal)) {
                rewriteTotal.innerHTML = ' ' + 0
            } else {
                rewriteTotal.innerHTML = ' ' + (parseInt(nowTotal) - parseInt(nowCash)) / 100
            }
        } else {
            console.log((parseInt(nowCash) + parseInt(optValue.value) * 100))
            if ((parseInt(nowCash) + parseInt(optValue.value) * 100) >= parseInt(nowTotal)) {
                rewriteTotal.innerHTML = ' ' + 0
            } else {
                rewriteTotal.innerHTML = ' ' + ((parseInt(nowTotal) - (parseInt(nowCash) + parseInt(optValue.value) * 100))) / 100
            }
        }
    } else {
        this.setAttribute("class", "toggleOff")
        if (optValue.value == "0") {
            rewriteTotal.innerHTML = ' ' + parseInt(nowTotal) / 100
        } else {
            rewriteTotal.innerHTML = ' ' + ((parseInt(nowTotal) - (parseInt(optValue.value) * 100))) / 100
        }
    }
}
