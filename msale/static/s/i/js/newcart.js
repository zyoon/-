// $('.cartEdit, .cartOk').click(function(){
//   if($(this).hasClass("cartEdit")){
//     $(this).removeClass('cartEdit').addClass('cartOk');
//     $('.goodsListCart li h3, .checkOut').addClass('none');
//     $('.goodsListCart li div, .cartGoodsEdit').removeClass('none');
//     $(this).html("完成");
//   }else{
//     $(this).removeClass('cartOk').addClass('cartEdit');
//     $('.goodsListCart li h3, .checkOut').removeClass('none');
//     $('.goodsListCart li div, .cartGoodsEdit').addClass('none');
//     $(this).html("编辑");
//   }
//    return false;
// })



document.querySelector(".cartEdit,.cartOk").addEventListener("click", function() {
        if (this.getAttribute("class") == "cartEdit") {
            //noSelected() //未选中
            document.querySelector(".checkOut").style.display = "none"
            document.querySelector(".cartGoodsEdit").style.display = "block"
            this.setAttribute("class", "cartOk")
            this.innerHTML = "完成"
            for (var i = 0; i < document.querySelectorAll(".goodsListCart li h3").length; i++) {
                document.querySelectorAll(".goodsListCart li h3")[i].style.display = "none"
                document.querySelectorAll(".goodsListCart li div")[i].style.display = "flex"
            }
        } else {
            this.setAttribute("class", "cartEdit")
            this.innerHTML = "编辑"
            for (var j = 0; j < document.querySelectorAll(".goodsListCart li h3").length; j++) {
                document.querySelectorAll(".goodsListCart li h3")[j].style.display = "flex"
                document.querySelectorAll(".goodsListCart li div")[j].style.display = "none"
            }
            document.querySelector(".cartGoodsEdit").style.display = "none"
            document.querySelector(".checkOut").style.display = "block"
        }
    })
    //未选中
function noSelected() {
    var icon = document.querySelectorAll(".noSelected")
    for (var i = 0; i < icon.length; i++) {
        icon[i].setAttribute("class", "noSelected icon iconfont icon-circleo")
    }
}

window.onload=gg
function gg() {
    var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
    console.log(getlocalStorageGoods)
    var fd = new FormData(),
        xhr = new XMLHttpRequest()
    for (var j = 0; j < getlocalStorageGoods.length; j++) {
        fd.append("commodity", getlocalStorageGoods[j].id)
        fd.append("commoditytype", getlocalStorageGoods[j].commoditytype)
    }
    xhr.open("POST", "/sales/checkcommodity", true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rd = eval('(' + xhr.responseText + ');')
            console.log(rd);
            for (var g = 0; g < getlocalStorageGoods.length; g++) {
              for (var i = 0; i < rd.data.length; i++) {
                if ( rd.data[i].commoditytype==getlocalStorageGoods[g].commoditytype&&rd.data[i].id==getlocalStorageGoods[g].id) {
                  rd.data[i].flag=getlocalStorageGoods[g].flag
                  rd.data[i].amount=getlocalStorageGoods[g].amount
                  // rd.data[i].aa=2
                  getlocalStorageGoods[g]=rd.data[i]
                }
              }
            }
            localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))
            console.log(JSON.parse(localStorage.getItem('localStorageGoods')));
            newGopods()
        }
    }
}


 function newGopods() {
    var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
    console.log(getlocalStorageGoods)
    if (JSON.parse(localStorage.getItem('localStorageGoods')) != null) {
        for (var l = 0; l < JSON.parse(localStorage.getItem('localStorageGoods')).length; l++) {
            if (JSON.parse(localStorage.getItem('localStorageGoods'))[l].amount != 0) {
                document.querySelector(".showCart").innerHTML = '购物车<i class="icon iconfont tips icon-circles"></i>'
            }

            var url = "location.href='goodsdetail.html?comid=" + getlocalStorageGoods[l].id + "&commoditytype=" + getlocalStorageGoods[l].commoditytype
            url += "'"
            if (getlocalStorageGoods[l].flag == 1) {
                var goodsflag = '<i class="noSelected icon iconfont icon-checkcircle" data-id="' + getlocalStorageGoods[l].id + '" data-amount="' + getlocalStorageGoods[l].amount + '" data-commoditytype="' + getlocalStorageGoods[l].commoditytype + '"></i>'

            } else {
                var goodsflag = '<i class="noSelected icon iconfont icon-circleo" data-id="' + getlocalStorageGoods[l].id + '" data-amount="' + getlocalStorageGoods[l].amount + '" data-commoditytype="' + getlocalStorageGoods[l].commoditytype + '"></i>'

            }

            if(getlocalStorageGoods[l].discount==100){
              var isVip=""
            }else{
              var isVip='会员'+getlocalStorageGoods[l].discount/10+'折 / ¥ '+ (getlocalStorageGoods[l].price*getlocalStorageGoods[l].discount) / 10000
            }

            var cartCommodity = '<ul class="flex" style="height: 110px;">' +
                '<h6 data-promotionflag="' + getlocalStorageGoods[l].promotionflag + '" data-id="' + getlocalStorageGoods[l].id + '" data-commoditytype="' + getlocalStorageGoods[l].commoditytype + '" class="thisGoods hover">' + goodsflag + '</h6>' +
                '<img onclick="' + url + '" src="http://mrten-0.mrten.cn/' + getlocalStorageGoods[l].url + '" alt="" />' +
                '<li class="flex-1">' + '<h1>【' + getlocalStorageGoods[l].name + '】'
            if (getlocalStorageGoods[l].promotionflag == 1) {
                var promotionflagHtml = '<span class="flex-1 preorderFlag" data-id="' + getlocalStorageGoods[l].id + '" data-preorder="' + getlocalStorageGoods[l].preorder + '" style="color:#999;font-size:14px">买 ' + getlocalStorageGoods[l].promotion[0].data.buys + ' 送 ' + getlocalStorageGoods[l].promotion[0].data.gifts + ' </span>' +
                    '<h2 style="margin:0;color:#e4393c">¥' + getlocalStorageGoods[l].price / 100 + '</h2>'
            }
            if (getlocalStorageGoods[l].promotionflag == 2) {
                var promotionflagHtml = '<span class="flex-1 preorderFlag" data-id="' + getlocalStorageGoods[l].id + '" data-preorder="' + getlocalStorageGoods[l].preorder + '" style="color:#999;font-size:14px"> ' + getlocalStorageGoods[l].promotion[0].discount / 10 + ' 折 /<strike>原价 : ¥ ' + getlocalStorageGoods[l].price / 100 + '</strike></span>' +
                    '<h2 style="margin:0;color:#e4393c">¥' + getlocalStorageGoods[l].price / 100 * getlocalStorageGoods[l].promotion[0].discount / 100 + '</h2>'
            }
            if (getlocalStorageGoods[l].promotionflag == 3) {
                var promotionflagHtml = '<span class="flex-1 preorderFlag" data-id="' + getlocalStorageGoods[l].id + '" data-preorder="' + getlocalStorageGoods[l].preorder + '" style="color:#999;font-size:14px">赠：优惠券' + getlocalStorageGoods[l].promotion[0].pv / 100 + '元 </span>' +
                    '<h2 style="margin:0;color:#e4393c">¥' + getlocalStorageGoods[l].price / 100 + '</h2>'
            }
            if (getlocalStorageGoods[l].promotionflag == 4) {
                var promotionflagHtml = '<span class="flex-1 preorderFlag" data-id="' + getlocalStorageGoods[l].id + '" data-preorder="' + getlocalStorageGoods[l].preorder + '" style="color:#999;font-size:14px">赠：红包' + getlocalStorageGoods[l].promotion[0].cashgift / 100 + '元 </span>' +
                    '<h2 style="margin:0;color:#e4393c">¥' + getlocalStorageGoods[l].price / 100 + '</h2>'
            }
            if (getlocalStorageGoods[l].promotionflag == 0) {
                var promotionflagHtml = '<span class="flex-1 preorderFlag" data-id="' + getlocalStorageGoods[l].id + '" data-preorder="' + getlocalStorageGoods[l].preorder + '" style="color:#999;font-size:14px"> '+isVip+'</span>' +
                    '<h2 style="margin:0;">¥' + getlocalStorageGoods[l].price / 100 + '</h2>'
            }
            var footerGoods = '<h3 class="flex"><p class="flex-1">规格 : ' + getlocalStorageGoods[l].specification + '</p><p>×' + getlocalStorageGoods[l].amount + '</p></h3>' +
                '<div class="flex display-none" style="background-color: #EEE;">' +
                '<p class="minus" data-promotionflag="' + getlocalStorageGoods[l].promotionflag + '" data-id="' + getlocalStorageGoods[l].id + '" data-commoditytype="' + getlocalStorageGoods[l].commoditytype + '"><i class="icon iconfont icon-minus" ></i></p>' +
                '<p class="flex-1">' + getlocalStorageGoods[l].amount + '</p>' +
                '<p class="plus" data-promotionflag="' + getlocalStorageGoods[l].promotionflag + '" data-id="' + getlocalStorageGoods[l].id + '" data-commoditytype="' + getlocalStorageGoods[l].commoditytype + '"><i class="icon iconfont icon-plus"></i></p></div></li></ul>'
            if (getlocalStorageGoods[l].preorder >= 1) {
                document.querySelector(".preorderGoodsType").setAttribute("style", "display:block")
                var reserveGoodsListCart = document.querySelector(".reserveGoodsListCart")
                reserveGoodsListCart.innerHTML += cartCommodity + '<span class="preorderName">(提前' + getlocalStorageGoods[l].delivery_interval + '天预定)</span></h1>' + promotionflagHtml + footerGoods
            }
            if (getlocalStorageGoods[l].preorder == 0) {
                var immediatelySell = document.querySelector(".immediatelySell")
                immediatelySell.innerHTML += cartCommodity + '<span class="preorderName"></span></h1>' + promotionflagHtml + footerGoods
            }
        }

        forPrice()
    }
    _e.bindAll(".plus", "click", numBoxPing)
    _e.bindAll(".minus", "click", numBoxReduce)
    _e.bindAll(".thisGoods", "click", selectedGood)
}


function forPrice() {
    var price = 0
    var disct = 0
    var aaa = 0
    var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
    for (var i = 0; i < getlocalStorageGoods.length; i++) {
        //促销方式为折扣，算的价钱是要除以几折的
        if (getlocalStorageGoods[i].commoditytype != 8) {
            if (getlocalStorageGoods[i].flag == 1) {
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
                    price = price + Number(getlocalStorageGoods[i].price) * getlocalStorageGoods[i].amount*getlocalStorageGoods[i].discount/100
                }
                aaa = price + disct
            }
        }
        var totalPrice = document.querySelector('.totalPrice')
        totalPrice.innerHTML = '¥' + aaa / 100
        totalPrice.setAttribute("data-price", aaa)
    }
}


function numBoxPing() {
    var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
    for (var k = 0; k < getlocalStorageGoods.length; k++) {
        if (this.getAttribute("data-id") == getlocalStorageGoods[k].id && this.getAttribute("data-commoditytype") == getlocalStorageGoods[k].commoditytype) {
            getlocalStorageGoods[k].amount++
                if (getlocalStorageGoods[k].flag == 1) {
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
                        // if (getlocalStorageGoods[k].promotion[0].count < getlocalStorageGoods[k].promotion[0].reapttimes) {
                        //     if (getlocalStorageGoods[k].amount <= Number(getlocalStorageGoods[k].promotion[0].reapttimes) - Number(getlocalStorageGoods[k].promotion[0].count)) {
                        //         document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa + (Number(getlocalStorageGoods[k].price) * Number(getlocalStorageGoods[k].promotion[0].discount)) / 100) / 100
                        //         aaa = (aaa + (Number(getlocalStorageGoods[k].price) * Number(getlocalStorageGoods[k].promotion[0].discount)) / 100)
                        //     } else {
                        //         document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa + Number(getlocalStorageGoods[k].price)) / 100
                        //         aaa = aaa + Number(getlocalStorageGoods[k].price)
                        //     }
                        // } else {
                        //     document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa + Number(getlocalStorageGoods[k].price)) / 100
                        //     aaa = aaa + Number(getlocalStorageGoods[k].price)
                        // }
                    } else {
                        // document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa + Number(getlocalStorageGoods[k].price)) / 100
                        // aaa = aaa + Number(getlocalStorageGoods[k].price)
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
                    this.parentNode.childNodes[1].innerHTML = getlocalStorageGoods[k].amount
                    this.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML = '×' + getlocalStorageGoods[k].amount
                    localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))
                    forPrice()
                } else {
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
                      // if (getlocalStorageGoods[k].promotion[0].count < getlocalStorageGoods[k].promotion[0].reapttimes) {
                      //     if (getlocalStorageGoods[k].amount <= Number(getlocalStorageGoods[k].promotion[0].reapttimes) - Number(getlocalStorageGoods[k].promotion[0].count)) {
                      //         document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa + (Number(getlocalStorageGoods[k].price) * Number(getlocalStorageGoods[k].promotion[0].discount)) / 100) / 100
                      //         aaa = (aaa + (Number(getlocalStorageGoods[k].price) * Number(getlocalStorageGoods[k].promotion[0].discount)) / 100)
                      //     } else {
                      //         document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa + Number(getlocalStorageGoods[k].price)) / 100
                      //         aaa = aaa + Number(getlocalStorageGoods[k].price)
                      //     }
                      // } else {
                      //     document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa + Number(getlocalStorageGoods[k].price)) / 100
                      //     aaa = aaa + Number(getlocalStorageGoods[k].price)
                      // }
                  } else {
                      // document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa + Number(getlocalStorageGoods[k].price)) / 100
                      // aaa = aaa + Number(getlocalStorageGoods[k].price)
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
                    this.parentNode.childNodes[1].innerHTML = getlocalStorageGoods[k].amount
                    this.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML = '×' + getlocalStorageGoods[k].amount
                    localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))
                }
        }
    }
}



function numBoxReduce() {
    var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
    for (var k = 0; k < getlocalStorageGoods.length; k++) {
        if (this.getAttribute("data-id") == getlocalStorageGoods[k].id && this.getAttribute("data-commoditytype") == getlocalStorageGoods[k].commoditytype) {
            getlocalStorageGoods[k].amount--
                if (getlocalStorageGoods[k].flag == 1) {
                    if (this.getAttribute("data-promotionflag") == "2") {
                        console.log(getlocalStorageGoods[k].amount)
                            // if (getlocalStorageGoods[k].promotion[0].count < getlocalStorageGoods[k].promotion[0].reapttimes) {
                            //     if (getlocalStorageGoods[k].amount <= Number(getlocalStorageGoods[k].promotion[0].reapttimes) - Number(getlocalStorageGoods[k].promotion[0].count)) {
                            //         document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa - (Number(getlocalStorageGoods[k].price) * Number(getlocalStorageGoods[k].promotion[0].discount)) / 100) / 100
                            //         aaa = (aaa - (Number(getlocalStorageGoods[k].price) * Number(getlocalStorageGoods[k].promotion[0].discount)) / 100)
                            //     } else {
                            //         document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa - Number(getlocalStorageGoods[k].price)) / 100
                            //         aaa = aaa - Number(getlocalStorageGoods[k].price)
                            //         console.log(aaa)
                            //     }
                            // } else {
                            //     document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa - Number(getlocalStorageGoods[k].price)) / 100
                            //     aaa = aaa - Number(getlocalStorageGoods[k].price)
                            // }
                    } else {
                        // document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa - Number(getlocalStorageGoods[k].price)) / 100
                        // aaa = aaa - Number(getlocalStorageGoods[k].price)
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
                    this.parentNode.childNodes[1].innerHTML = getlocalStorageGoods[k].amount
                    this.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML = '×' + getlocalStorageGoods[k].amount
                    localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))
                    forPrice()
                } else {
                  if (this.getAttribute("data-promotionflag") == "2") {
                      console.log(getlocalStorageGoods[k].amount)
                          // if (getlocalStorageGoods[k].promotion[0].count < getlocalStorageGoods[k].promotion[0].reapttimes) {
                          //     if (getlocalStorageGoods[k].amount <= Number(getlocalStorageGoods[k].promotion[0].reapttimes) - Number(getlocalStorageGoods[k].promotion[0].count)) {
                          //         document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa - (Number(getlocalStorageGoods[k].price) * Number(getlocalStorageGoods[k].promotion[0].discount)) / 100) / 100
                          //         aaa = (aaa - (Number(getlocalStorageGoods[k].price) * Number(getlocalStorageGoods[k].promotion[0].discount)) / 100)
                          //     } else {
                          //         document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa - Number(getlocalStorageGoods[k].price)) / 100
                          //         aaa = aaa - Number(getlocalStorageGoods[k].price)
                          //         console.log(aaa)
                          //     }
                          // } else {
                          //     document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa - Number(getlocalStorageGoods[k].price)) / 100
                          //     aaa = aaa - Number(getlocalStorageGoods[k].price)
                          // }
                  } else {
                      // document.querySelector(".cartTotail").innerHTML = '¥ ' + (aaa - Number(getlocalStorageGoods[k].price)) / 100
                      // aaa = aaa - Number(getlocalStorageGoods[k].price)
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
                    this.parentNode.childNodes[1].innerHTML = getlocalStorageGoods[k].amount
                    this.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML = '×' + getlocalStorageGoods[k].amount
                    localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))
                }
            var showcart = document.querySelector(".showCart")
            if (getlocalStorageGoods[k].amount == 0) {
                this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode)
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
                                showcart.innerHTML = '购物车<i class="icon iconfont tips icon-circles"></i>'
                                return
                            } else {
                                showcart.innerHTML = '购物车'
                            }
                        }
                    } else {
                        showcart.innerHTML = '购物车'
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



//找打用户选中的商品，并对商品进行删除操作，刚刚进入购物车的时候商品是全部选中的，当用户点击编辑之后，商品应该是不选中的。
function selectedGood() {
    if (this.childNodes[0].getAttribute("class") == "noSelected icon iconfont icon-checkcircle") {
        this.childNodes[0].setAttribute("class", "noSelected icon iconfont icon-circleo")
    } else {
        this.childNodes[0].setAttribute("class", "noSelected icon iconfont icon-checkcircle")
    }
    //添加商品的时候有一个flag（默认为1）。作用就是选中商品的flag就是1，没有就是0，
    var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
    for (var i = 0; i < getlocalStorageGoods.length; i++) {
        if (this.getAttribute("data-id") == getlocalStorageGoods[i].id && this.getAttribute("data-commoditytype") == getlocalStorageGoods[i].commoditytype) {
            if (getlocalStorageGoods[i].flag == 1) {
                getlocalStorageGoods[i].flag = 0
                localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))
                forPrice()
            } else {
                getlocalStorageGoods[i].flag = 1
                localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))
                forPrice()
            }
        }
    }
}
//删除选中的商品
_e.bind(".cartGoodsEdit", "click", removeGoods)

function removeGoods() {
    var selectgG = document.querySelectorAll('.icon-checkcircle')
    console.log(selectgG)
    if (selectgG.length == 0) {
        _e.msgBox({
            msg: "请选择商品",
            timeout: 700,
            className: "info"
        })
        return
    }
    var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))


    for (var i = 0; i < selectgG.length; i++) {
        for (var j = getlocalStorageGoods.length; j > 0; j--) {
            if (selectgG[i].getAttribute("data-id") == getlocalStorageGoods[j - 1].id && selectgG[i].getAttribute("data-commoditytype") == getlocalStorageGoods[j - 1].commoditytype) {
                selectgG[i].parentNode.parentNode.parentNode.removeChild(selectgG[i].parentNode.parentNode)
                getlocalStorageGoods.splice(j - 1, 1)
                localStorage.setItem('localStorageGoods', JSON.stringify(getlocalStorageGoods))
            }
        }
    }
}

_e.bind(".subumitGoods", "click", subumitG)

function subumitG() {
    var checkcircle = document.querySelectorAll('.icon-checkcircle')
    var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
    if (checkcircle.length == 0) {
        _e.msgBox({
            msg: "请选择商品",
            timeout: 700,
            className: "info"
        })
        return
    }
    var fd = new FormData(),
        xhr = new XMLHttpRequest()

    for (var i = 0; i < checkcircle.length; i++) {
        for (var j = 0; j < getlocalStorageGoods.length; j++) {
            if (checkcircle[i].getAttribute("data-id") == getlocalStorageGoods[j].id && checkcircle[i].getAttribute("data-commoditytype") == getlocalStorageGoods[j].commoditytype) {
                fd.append("commodity", getlocalStorageGoods[j].id)
                fd.append("commodity_type", getlocalStorageGoods[j].commoditytype)
                fd.append("amount", parseFloat(getlocalStorageGoods[j].amount))

            }
        }
    }
    // fd.append("commodity",1)
    // fd.append("commodity_type",2)
    // fd.append("amount",3)
    xhr.open("POST", "/sales/settlement", true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var rd = eval('(' + xhr.responseText + ');')
            console.log(rd)
            if (rd.res == 1) {
                location.href = 'cart.html'
            }
            if (rd.res == -2) {
              _e.msgBox({
                  msg: rd.msg,
                  timeout: 700,
                  className: "info"
              })

            }
        }
    }
}
