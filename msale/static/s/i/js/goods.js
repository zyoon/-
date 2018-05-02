/**
 * Created by bobodaren007 on 2016/7/16 0016.
 */

if (JSON.parse(localStorage.getItem('localStorageGoods')) != null) {
    for (var l = 0; l < JSON.parse(localStorage.getItem('localStorageGoods')).length; l++) {
        if (JSON.parse(localStorage.getItem('localStorageGoods'))[l].amount != 0) {
            document.querySelector(".showCart").innerHTML = '购物车<i class="icon iconfont tips icon-circles"></i>'
        }
    }
}


function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}





var d = document.querySelector('#scene_recover')
var s = document.querySelector(".goodsList")
window.onunload = function(e) {
    localStorage.setItem("scrollPosition", document.querySelector(".goodsList").scrollTop)
    localStorage.setItem("innerHTML", d.innerHTML)
}
window.addEventListener('load', function(e) {
    var back = localStorage.getItem("back")
    console.log('back  ' + back)
    if (back != "1") {
      //各种菜单售卖方式的加载
        var emContainer = document.querySelector(".em-container")
        var xhr = new XMLHttpRequest()
        xhr.open("POST", "/sales/getclass", true)
        xhr.send()
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var json = eval('(' + xhr.responseText + ');')
                console.log(json)
                for (var i = 0, k = 0; i < json.module.length; i++) {
                    if (json.module[i][3] == 0) {
                        if (json.module[i][5] == 4 ||json.module[i][5] == 9 ||json.module[i][5] == 7 || json.module[i][5] == 8) {
                            emContainer.innerHTML += '<article style="height:41px;line-height: 33px;box-shadow: 0px 0px 0px 1px rgba(255,255,255,0.3),1px 0px 0px 0px rgba(255,255,255,0.9) inset,0px 2px 2px rgba(0,0,0,0.1);" class="em-small goodsType"><li data-id="' + json.module[i][0] + '" style="line-height:40px;background-color: #e6e6e6;font-size: 15px;height:41px" href="#" data-commodetytype="' + json.module[i][5] + '" class="hover module hovercode" onclick="hoverCommodity1(' + json.module[i][0] + ',0)" >' + json.module[i][2] + '</li></article>'
                            k++
                        }
                        if (json.module[i][5] == 2) {
                            emContainer.innerHTML += '<article style="height:41px;line-height: 33px;box-shadow: 0px 0px 0px 1px rgba(255,255,255,0.3),1px 0px 0px 0px rgba(255,255,255,0.9) inset,0px 2px 2px rgba(0,0,0,0.1);" class="em-small goodsType"><li data-id="' + json.module[i][0] + '" style="line-height:40px;background-color: #e6e6e6;font-size: 15px;height:41px" href="#" data-commodetytype="' + json.module[i][5] + '" class="hover module hovercode" onclick="hoverCommodity2(' + json.module[i][0] + ',0)" >' + json.module[i][2] + '</li></article>'
                            k++
                        }
                    }
                }
                var fatherclass = new Array()
                fatherclass = json.fatherclass.sort(function(a, b) {
                    return a[6] - b[6]
                })

                var sunclass = new Array()
                sunclass = json.sunclass.sort(function(a, b) {
                    return a[6] - b[6]
                })



                for (var j = 0; j < fatherclass.length; j++) {
                    if (fatherclass[j][3] == 0) {
                        emContainer.innerHTML += '<div class="em_ childcss"><input id="em-' + k + '" name="accordion" type="checkbox" />' +
                            '<label class="goodsclass" for="em-' + k + '" data-id="' + fatherclass[j][0] + '">' + fatherclass[j][2] + '</label>' +
                            '</div>'
                        k++
                    }
		                _e.bindAll(".goodsclass","click",gdClsCk)
                }
                for (var j = 0; j < sunclass.length; j++) {
                    if (sunclass[j][3] != 0) {
                        var label = emContainer.querySelectorAll("label")
                        for (var index in label) {
                            if (index == "length") {
                                break;
                            }
                            if (label[index].getAttribute("data-id") == sunclass[j][3]) {
                                if (label[index].parentNode.querySelector("article")) {
                                    label[index].parentNode.querySelector("article").innerHTML += '<li href="#" class="hover hovercode" data-commodetytype="' + sunclass[j][5] + '"  code="' + sunclass[j][0] + '" is_leaf="' + sunclass[j][4] + '" onclick="hoverCommodity(' + sunclass[j][0] + ',0)">' + sunclass[j][2] + '</li>'
                                } else {
                                    var article1 = document.createElement("article")
                                    article1.className = "em-small goodsType"
                                    article1.style.lineHeight = "40px"
                                    article1.innerHTML += '<li href="#" class="hover hovercode" data-commodetytype="' + sunclass[j][5] + '"  code="' + sunclass[j][0] + '" is_leaf=" ' + sunclass[j][4] + '" onclick="hoverCommodity(' + sunclass[j][0] + ',0)">' + sunclass[j][2] + '</li>'
                                    label[index].parentNode.appendChild(article1)
                                }
                                _e.bindAll(".hovercode", "click", hoverCode)
                                _e.bindAll("input", "click", menuClick)
                            }
                        }
                    }
                }

                if (GetQueryString("classid").length != 0) {
                    var labl = document.querySelectorAll("label")
                    for (var a = 0; a < label.length; a++) {
                        if (labl[a].getAttribute("data-id") == GetQueryString("classid")) {
                            labl[a].parentNode.firstChild.checked = true
                            labl[a].nextSibling.firstChild.className = "hover hovercode bobodaren"
                            labl[a].setAttribute("style","color:#000;background-color:#E6E6E6;")

                            labl[a].nextSibling.firstChild.setAttribute("style","color:#000;background-color:#FFF4E1;font-weight:700")
                            labl[a].setAttribute("","")
                            hoverCommodity(labl[a].nextSibling.firstChild.getAttribute('code'), 0)
                        }
                    }
                }
                if (GetQueryString("code").length != 0) {
                    var menuCode = document.querySelectorAll(".hovercode")
                    for (var c = 0; c < menuCode.length; c++) {
                        if (GetQueryString("code") == menuCode[c].getAttribute("code")) {
                            menuCode[c].parentNode.parentNode.firstChild.checked = true
                            menuCode[c].className = "hover hovercode bobodaren"
                            menuCode[c].setAttribute("style","color:#000;background-color:#FFF4E1;")
                            hoverCommodity(Number(GetQueryString("code")), 0)
                            menuCode[c].parentNode.parentNode.childNodes[2].setAttribute("style","line-height: 40px;height:auto")

                            menuCode[c].parentNode.parentNode.childNodes[1].setAttribute("style","color:#000;background-color:#FFDD55")
                        }
                    }
                }

                if (GetQueryString("moduleid").length != 0) {
                    var menueModule = document.querySelectorAll(".module")
                    for (var m = 0; m < menueModule.length; m++) {
                        if (menueModule[m].getAttribute("data-id") == GetQueryString("moduleid")) {
                            menueModule[m].className = "hover module hovercode bobodaren"
                           menueModule[m].setAttribute("style","color:#000;background-color:#FFDD55;")
                            hoverCommodity1(Number(GetQueryString("moduleid")), 0)
                        }
                    }
                }

                /*else{
                    console.log(GetQueryString("code"))
                }*/
            }
        }
        return
    }else{
      d.innerHTML = localStorage.getItem("innerHTML")
      document.querySelector(".goodsList").scrollTop = Number(localStorage.getItem("scrollPosition"))

      localStorage.setItem("back", "0")
      console.log(document.querySelector(".bobodaren"));
      if(document.querySelector(".bobodaren")==undefined){
        window.location.href="goods.html?code=67"
      }
      // else{
      //   var bobo=document.querySelector(".bobodaren")
      //   console.log(bobo.getAttribute("data-commodetytype"));
      //   if(bobo.getAttribute("data-commodetytype")=="1"){
      //     document.querySelector(".bobodaren").parentNode.parentNode.firstChild.checked = true
      //   hoverCommodity(Number(bobo.getAttribute("code")),0)
      //   }else{
      //     hoverCommodity1(Number(bobo.getAttribute("data-id")),0)
      //   }
      // }
      _e.bindAll(".hovercode", "click", hoverCode)//唯一的class
      _e.bindAll(".icon-pluscircle", "click", numBoxPing)//添加商品
      _e.bindAll(".icon-minuscircleo", "click", numBoxReduce)//减少添加的商品
      _e.bindAll("input", "click", menuClick)//点击菜单展开
	    _e.bindAll(".goodsclass","click",gdClsCk)//改变颜色
      var el = document.querySelector(".scrollable");
      var addCartGoods=document.querySelectorAll(".icon-pluscircle")
      var goodsNum=JSON.parse(localStorage.getItem('localStorageGoods'))
      console.log(goodsNum);
      if (goodsNum != null) {
        if(goodsNum.length!=0){
          for(var i=0;i<addCartGoods.length;i++){
            for (var l = 0; l < goodsNum.length; l++) {
              if((Number(goodsNum[l].id)==Number(addCartGoods[i].getAttribute("data-id")))&&(Number(goodsNum[l].commoditytype)==Number(addCartGoods[i].getAttribute("data-commoditytype")))){
                if (Number(goodsNum[l].amount) != 0) {
                  document.querySelector("#com_"+Number(goodsNum[l].id)).innerHTML=Number(goodsNum[l].amount)
                  addCartGoods[i].parentNode.childNodes[0].style.display="block"
                  break
                }else{
                  document.querySelector("#com_"+Number(goodsNum[l].id)).innerHTML=null
                  addCartGoods[i].parentNode.childNodes[0].style.display="none"

                }
              }else{

                addCartGoods[i].parentNode.childNodes[0].style.display="none"
                addCartGoods[i].parentNode.childNodes[1].innerHTML=null

              }
            }
          }
        }else{
          for(var j=0;j<addCartGoods.length;j++){
            addCartGoods[j].parentNode.childNodes[0].style.display="none"
            addCartGoods[j].parentNode.childNodes[1].innerHTML=null
          }
        }
      }else{
        console.log("aaa");
        for(var k=0;k<addCartGoods.length;k++){
          addCartGoods[k].parentNode.childNodes[0].style.display="none"
          addCartGoods[k].parentNode.childNodes[1].innerHTML=null
        }
      }



        //上拉加载
      var mc = new Hammer(el, {
          touchAction: 'pan-y'
      });
      mc.get('swipe').set({
          direction: Hammer.DIRECTION_VERTICAL
      });
      //tap press swipeup swipedown 不同的事件
      mc.on("swipeup", function(ev) {
          var goodList = document.querySelector(".goodsList")
          if (goodList.length == 0) return
          var elelast = document.querySelector(".id_lastid")
          if (isElementInViewport(elelast)) {
              var loadShow = '<div class="loading"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3">' +
                  '</div> <div class="rect4"></div> <div class="rect5"></div> </div>'
              goodList.innerHTML += loadShow
              document.querySelector(".id_lastid").setAttribute("class", "flex allGoods")
              var fd = new FormData(),
                  xhr = new XMLHttpRequest()
              var swiperUp = document.querySelector(".bobodaren")
              if (swiperUp.getAttribute("data-commodetytype") == "2") {
                  fd.append("classid", swiperUp.getAttribute("code"))
                  fd.append("start", document.querySelectorAll(".allGoods").length)
                  xhr.open("POST", "/groupbuy/getcoms", true)
                  xhr.send(fd)
                  xhr.onreadystatechange = function() {
                      if (xhr.readyState == 4 && xhr.status == 200) {
                          var json = eval('(' + xhr.responseText + ');')
                          if (json.data.length == 0) {
                              _e.msgBox({
                                  msg: "已显示所有的商品！",
                                  timeout: 700,
                                  className: "info"
                              })
                              goodList.removeChild(document.querySelector(".loading"))
                              return
                          }
                          jsonData(json, 2, document.querySelector(".bobodaren").getAttribute("code"))
                          goodList.removeChild(document.querySelector(".loading"))
                      }
                  }
              } else {
                  if (swiperUp.getAttribute("data-commodetytype") == "1") {
                      fd.append("classid", swiperUp.getAttribute("code"))
                      fd.append("start", document.querySelectorAll(".allGoods").length)
                      xhr.open("POST", "/sales/getcomsbyclass", true)
                      xhr.send(fd)
                      xhr.onreadystatechange = function() {
                          if (xhr.readyState == 4 && xhr.status == 200) {
                              var json = eval('(' + xhr.responseText + ');')
                              if (json.data.length == 0) {
                                  _e.msgBox({
                                      msg: "已显示所有的商品！",
                                      timeout: 700,
                                      className: "info"
                                  })
                                  goodList.removeChild(document.querySelector(".loading"))
                                  return
                              }
                              jsonData(json, 2, document.querySelector(".bobodaren").getAttribute("code"))
                              goodList.removeChild(document.querySelector(".loading"))
                          }
                      }
                  } else {
                      fd.append("moduleid", swiperUp.getAttribute("data-id"))
                      fd.append("start", document.querySelectorAll(".allGoods").length)
                      xhr.open("POST", "/sales/getcombymodule", true)
                      xhr.send(fd)
                      xhr.onreadystatechange = function() {
                          if (xhr.readyState == 4 && xhr.status == 200) {
                              var json = eval('(' + xhr.responseText + ');')
                              if (json.data.length == 0) {
                                  _e.msgBox({
                                      msg: "已显示所有的商品！",
                                      timeout: 700,
                                      className: "info"
                                  })
                                  goodList.removeChild(document.querySelector(".loading"))
                                  return
                              }
                              jsonData(json, 2, swiperUp.getAttribute("data-id"))
                              goodList.removeChild(document.querySelector(".loading"))
                          }
                      }
                  }
              }
              setTimeout("window.scrollTo(0,document.body.scrollHeight);", 200)
          } else {
              // el.innerHTML = el.innerHTML+"<br>no data, just record<br>"
          }

          //window.scrollTo(0,document.body.scrollHeight);
      });

      function isElementInViewport(el) {
          var rect = el.getBoundingClientRect();
          return (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && //!*or $(window).height() *!/
              rect.right <= (window.innerWidth || document.documentElement.clientWidth) //!*or $(window).width() *!/
          );
      }
  }
    }
    )


//根据获取商品
function hoverCommodity(code, num) {
    var fd = new FormData(),
        xhr = new XMLHttpRequest()
    fd.append("classid", code)
    fd.append("start", num)
    xhr.open("POST", "/sales/getcomsbyclass", true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = eval('(' + xhr.responseText + ');')
            jsonData(json, 1, code)
        }
    }
}
//根据小类获取普通的商品
function hoverCommodity2(code, num) {
    var fd = new FormData(),
        xhr = new XMLHttpRequest()
        //fd.append("classid", code)
    fd.append("start", num)
    xhr.open("POST", "/groupbuy/getcoms", true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = eval('(' + xhr.responseText + ');')
            jsonData(json, 1, code)
        }
    }
}

//获取moudle的商品
function hoverCommodity1(code, num) {
    var fd = new FormData(),
        xhr = new XMLHttpRequest()
    fd.append("moduleid", code)
    fd.append("start", num)
    xhr.open("POST", "/sales/getcombymodule", true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = eval('(' + xhr.responseText + ');')
            jsonData(json, 1, code)
        }
    }
}

function menuClick() {
    var menuIput = document.querySelectorAll("input")
    for (var i = 0; i < menuIput.length; i++) {
        if (menuIput[i].checked == true) {
            menuIput[i].checked = false
            this.checked = true
        }
    }
}
//加载数据，（数据、判断是否初次加载、code发送给后端的数据）
function jsonData(json, num, code) {
    if (json.data.length == 0) {
        _e.msgBox({
            msg: "暂时没有商品！",
            timeout: 500,
            className: "info"
        })
    }


    var goodsList = document.querySelector(".goodsList")
    if (num == 1) {
        goodsList.innerHTML = ''
    }
    for (var i = 0; i < json.data.length; i++) {

        var url = "location.href='goodsdetail.html?comid=" + json.data[i].id + "&commoditytype=" + json.data[i].commoditytype
        url += "'"
        if(json.data[i].discount==100){
          var isVip=""
        }else{
          var isVip='会员'+json.data[i].discount/10+'折 / ¥ '+ (json.data[i].price*json.data[i].discount) / 10000
        }
        if (json.data[i].commoditytype == 2) {
            var groupUrl="location.href='groupdetail.html?comid=" + json.data[i].id + "&groupbuyid=" + json.data[i].groupbuyid
            groupUrl += "'"
            var commodity = '<ul class="flex allGoods" onclick="'+groupUrl+'">' +
                '<img src="http://mrten-0.mrten.cn/' + json.data[i].url + '" alt="" />' +
                '<li class="flex-1">' +
                '<h1><span>【' + json.data[i].name + '】</span>' + json.data[i].intro + '</h1>' +
                '<h2>¥'+(json.data[i].groupbuyprice)/100+'<span>/  '+json.data[i].specification+' /</span><b>' + json.data[i].number + '人团</b></h2>' +
                '<h3 class="flex"><p class="flex-1">库存 ' + json.data[i].stockamount + '</p></h3></li></ul>'
            goodsList.innerHTML += commodity
        }
        if (json.data[i].commoditytype == 7) {
            var preorderFlag = document.querySelectorAll(".preorderFlag")
            if (json.data[i].promotionflag == 1) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://mrten-0.mrten.cn/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span><spqn>(提前' + json.data[i].delivery_interval + '天预定)</spqn>' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '"></i></p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">买 ' + json.data[i].promotion[0].data.buys + ' 送 ' + json.data[i].promotion[0].data.gifts + '</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotion-buys="' + json.data[i].promotion[0].data.buys + '" data-promotion-gift="' + json.data[i].promotion[0].data.gifts + '" data-promotion-count="' + json.data[i].promotion[0].data.count + '" data-promotion-reapttimes="' + json.data[i].promotion[0].data.reapttimes + '" data-id="' + json.data[i].id + '" data-commoditytype="' + json.data[i].commoditytype + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i' +
                    ' data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    'data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-preorder="' + json.data[i].preorder + '" data-promotion-buys="' + json.data[i].promotion[0].data.buys + '" data-promotion-gift="' + json.data[i].promotion[0].data.gifts + '" data-promotion-count="' + json.data[i].promotion[0].data.count + '" data-promotion-reapttimes="' + json.data[i].promotion[0].data.reapttimes + '"' +
                    '  class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity

            }
            if (json.data[i].promotionflag == 2) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://mrten-0.mrten.cn/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span><spqn>(提前' + json.data[i].delivery_interval + '天预定)</spqn> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 * json.data[i].promotion[0].discount / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">' + json.data[i].promotion[0].discount / 10 + ' 折 / <strike>原价 :  ¥ ' + json.data[i].price / 100 + ' </strike></p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-id="' + json.data[i].id + '" data-commoditytype="' + json.data[i].commoditytype + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-discount="' + json.data[i].promotion[0].discount + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    'data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-discount="' + json.data[i].promotion[0].discount + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity

                /* document.querySelectorAll(".price")[i].innerHTML='¥ ' + json.data[i].price/100*json.data[i].promotion[0].discount/100+'<span>/'+json.data[i].specification+'</span>'
                 preorderFlag[i].innerHTML=json.data[i].promotion[0].discount/10+' 折 / <strike>原价 :  ¥ ' +json.data[i].price/100+' </strike>'
                */
            }
            if (json.data[i].promotionflag == 3) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://mrten-0.mrten.cn/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span><spqn>(提前' + json.data[i].delivery_interval + '天预定)</spqn> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">赠：优惠券' + json.data[i].promotion[0].pv / 100 + '元</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-pv="' + json.data[i].promotion[0].pv + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-id="' + json.data[i].id + '" data-commoditytype="' + json.data[i].commoditytype + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-pv="' + json.data[i].promotion[0].pv + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity

                //preorderFlag[i].innerHTML='赠：优惠券'+json.data[i].promotion[0].pv/100+'元'
                // document.querySelectorAll(".")
            }
            if (json.data[i].promotionflag == 4) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://mrten-0.mrten.cn/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span><spqn>(提前' + json.data[i].delivery_interval + '天预定)</spqn> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">赠：红包' + json.data[i].promotion[0].cashgift / 100 + '元</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-cashgift="' + json.data[i].promotion[0].cashgift + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-cashgift="' + json.data[i].promotion[0].cashgift + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity
                    //preorderFlag[i].innerHTML='赠：红包'+json.data[i].promotion[0].cashgift/100+'元'
            }
            if (json.data[i].promotionflag == 0) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://mrten-0.mrten.cn/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span><spqn>(提前' + json.data[i].delivery_interval + '天预定)</spqn> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">'+isVip+'</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity
            }
        }
        if (json.data[i].commoditytype == 9 || json.data[i].commoditytype == 4 || json.data[i].commoditytype == 1 || json.data[i].commoditytype == 8) {
            if (json.data[i].promotionflag == 1) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://mrten-0.mrten.cn/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">买 ' + json.data[i].promotion[0].data.buys + ' 送 ' + json.data[i].promotion[0].data.gifts + '</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotion-buys="' + json.data[i].promotion[0].data.buys + '" data-promotion-gift="' + json.data[i].promotion[0].data.gifts + '" data-promotion-count="' + json.data[i].promotion[0].data.count + '" data-promotion-reapttimes="' + json.data[i].promotion[0].data.reapttimes + '" data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-promotion-buys="' + json.data[i].promotion[0].buys + '" data-promotion-gift="' + json.data[i].promotion[0].gift + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1"  id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-preorder="' + json.data[i].preorder + '" data-promotion-buys="' + json.data[i].promotion[0].data.buys + '" data-promotion-gift="' + json.data[i].promotion[0].data.gifts + '" data-promotion-count="' + json.data[i].promotion[0].data.count + '" data-promotion-reapttimes="' + json.data[i].promotion[0].data.reapttimes + '"  class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity
            }
            if (json.data[i].promotionflag == 2) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://mrten-0.mrten.cn/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 * json.data[i].promotion[0].discount / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">' + json.data[i].promotion[0].discount / 10 + ' 折 / <strike>原价 :  ¥ ' + json.data[i].price / 100 + ' </strike></p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-discount="' + json.data[i].promotion[0].discount + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-discount="' + json.data[i].promotion[0].discount + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity

            }
            if (json.data[i].promotionflag == 3) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://mrten-0.mrten.cn/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">赠：优惠券' + json.data[i].promotion[0].pv / 100 + '元</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-pv="' + json.data[i].promotion[0].pv + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-pv="' + json.data[i].promotion[0].pv + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity
            }
            if (json.data[i].promotionflag == 4) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://mrten-0.mrten.cn/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">赠：红包' + json.data[i].promotion[0].cashgift / 100 + '元</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-cashgift="' + json.data[i].promotion[0].cashgift + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '"　data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    ' data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-cashgift="' + json.data[i].promotion[0].cashgift + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity
            }
            if (json.data[i].promotionflag == 0) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://mrten-0.mrten.cn/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">'+isVip+'</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity
            }
            _e.bindAll(".addTo", "click", addto)
            function addto(){
              window.event ? window.event.cancelBubble = true : e.stopPropagation();
            }
            //
            // document.querySelectorAll(".addTo").addEventListener("click",function(){
            //   window.event ? window.event.cancelBubble = true : e.stopPropagation();
            // })
        }
        var getLSG = JSON.parse(localStorage.getItem('localStorageGoods'))
        if (getLSG != null) {
            for (var l = 0; l < getLSG.length; l++) {
                if (getLSG[l].amount != 0) {
                    if (json.data[i].id == Number(getLSG[l].id) && json.data[i].commoditytype == Number(getLSG[l].commoditytype)) {
                        document.querySelector("#com_" + json.data[i].id).innerHTML = getLSG[l].amount
                        document.querySelector("#com_" + json.data[i].id).parentNode.firstChild.style.display = "block"
                    }
                }
            }
        }



        //团购链接替换
        var nurl = "location.href='group.html?comid=" + json.data[i].id
        nurl += "'"
        var saletype = document.querySelectorAll(".saletype")
        for (var j = 0; j < saletype.length; j++) {
            if (saletype[j].innerText == 0||saletype[j].innerText <0) {
              saletype[j].parentNode.parentNode.childNodes[2].childNodes[1].innerHTML="已售罄"
                saletype[j].parentNode.parentNode.childNodes[2].childNodes[2].style.display = "none"
                saletype[j].parentNode.parentNode.childNodes[2].childNodes[1].style.display = "block"
                saletype[j].parentNode.parentNode.childNodes[1].innerHTML = ""
            }
        }
    }


    if (document.querySelector(".goodsList").childNodes.length != 0) {
        var lastId = document.querySelectorAll(".allGoods")
        lastId[lastId.length - 1].setAttribute("class", "flex allGoods id_lastid")
    }
    //点击购买商品事件
    _e.bindAll(".icon-pluscircle", "click", numBoxPing)
    _e.bindAll(".icon-minuscircleo", "click", numBoxReduce)

}



var localStorageGoods = new Array()
    // localStorage.setItem('localStorageGoods', JSON.stringify(localStorageGoods))
var ping = 0
var temporaryLocalStorageLength = 0

function numBoxPing() {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    var retrievedObject = localStorage.getItem('localStorageGoods')
    var getlocalStorageGoods = JSON.parse(retrievedObject)
    var temporaryLocalStorage = []
    ping = this.parentNode.childNodes[1].innerText
    if (this.getAttribute("data-promotionflag") == "1") {
        var getLSG = JSON.parse(localStorage.getItem('localStorageGoods'))
        if (getLSG != null) {
            if (getLSG.length != 0) {
                for (var l = 0; l < getLSG.length; l++) {
                    var thisId = this.getAttribute("data-id")
                    if (Number(thisId) == Number(getLSG[l].id) && Number(this.getAttribute("data-commoditytype")) == Number(getLSG[l].commoditytype)) {
                        if (getLSG[l].amount != 0) {
                            ping++
                            if (getlocalStorageGoods != null) {
                                temporaryLocalStorage = getlocalStorageGoods
                                temporaryLocalStorageLength = temporaryLocalStorage.length
                                for (var i = 0; i < temporaryLocalStorageLength; i++) {
                                    if (this.getAttribute("data-id") == temporaryLocalStorage[i].id && this.getAttribute("data-commoditytype") == temporaryLocalStorage[i].commoditytype) {
                                        if (temporaryLocalStorage[i].amount == this.getAttribute("data-stockamount")) {
                                            _e.msgBox({
                                                msg: "库存不足！",
                                                timeout: 500,
                                                className: "error"
                                            })
                                            return
                                        }
                                        temporaryLocalStorage[i].amount++
                                            if (this.getAttribute("data-promotionflag") == 1) {

                                          if(temporaryLocalStorage[i].amount>Number(this.getAttribute("data-promotion-repeatpurchasetimes"))){
                                            _e.msgBox({
                                                msg: "不享受优惠！",
                                                timeout: 700,
                                                className: "error"
                                            })
                                            return
                                          }

                                                if (Number(this.getAttribute("data-promotion-count")) < Number(this.getAttribute("data-promotion-reapttimes"))) {
                                                    if (this.getAttribute("data-promotion-buys") > 1) {
                                                        if (temporaryLocalStorage[i].amount >= Number(this.getAttribute("data-promotion-buys")) && temporaryLocalStorage[i].amount <= (Number(this.getAttribute("data-promotion-reapttimes")) - Number(this.getAttribute("data-promotion-count"))) * Number(this.getAttribute("data-promotion-buys"))) {
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
                                                        if (temporaryLocalStorage[i].amount <= ((json.message[0].promotion[0].data.reapttimes - json.message[0].promotion[0].data.count) * json.message[0].promotion[0].data.buys)) {
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



                                        if (this.getAttribute("data-promotionflag") == 2 || this.getAttribute("data-promotionflag") == 3 || this.getAttribute("data-promotionflag") == 4) {
                                          if(temporaryLocalStorage[i].amount>Number(this.getAttribute("data-promotion-repeatpurchasetimes"))){
                                          _e.msgBox({
                                              msg: "不享受优惠！",
                                              timeout: 700,
                                              className: "error"
                                          })
                                          return
                                        }
                                            if (this.getAttribute("data-promotion-count") < this.getAttribute("data-promotion-reapttimes")) {
                                                if (temporaryLocalStorage[i].amount <= (Number(this.getAttribute("data-promotion-reapttimes")) - Number(this.getAttribute("data-promotion-count")))) {
                                                    _e.msgBox({
                                                        msg: "享受优惠！",
                                                        timeout: 500,
                                                        className: "info"
                                                    })
                                                    console.log(temporaryLocalStorage[i].amount);
                                                } else {
                                                    _e.msgBox({
                                                        msg: "暂时不享受优惠！",
                                                        timeout: 500,
                                                        className: "error"
                                                    })
                                                }
                                            } else {
                                                _e.msgBox({
                                                    msg: "暂时不享受优惠！",
                                                    timeout: 500,
                                                    className: "error"
                                                })
                                            }
                                        }
                                        console.log(temporaryLocalStorage[i].amount)
                                        this.parentNode.childNodes[0].style.display = "block"
                                        this.parentNode.childNodes[1].innerHTML = ping
                                        localStorage.setItem('localStorageGoods', JSON.stringify(temporaryLocalStorage))
                                        document.querySelector(".showCart").innerHTML = '购物车<i class="icon iconfont tips icon-circles"></i>'
                                        return
                                    }
                                }
                            }
                        } else {
                            location.href = 'http://www.newfan.net.cn/s/goodsdetail.html?comid=' + this.getAttribute("data-id") + '&commoditytype=' + this.getAttribute("data-commoditytype")
                            return
                        }
                    } else {
                        location.href = 'http://www.newfan.net.cn/s/goodsdetail.html?comid=' + this.getAttribute("data-id") + '&commoditytype=' + this.getAttribute("data-commoditytype")
                        return
                    }
                }
            } else {
                location.href = 'http://www.newfan.net.cn/s/goodsdetail.html?comid=' + this.getAttribute("data-id") + '&commoditytype=' + this.getAttribute("data-commoditytype")
                return
            }
        } else {
            location.href = 'http://www.newfan.net.cn/s/goodsdetail.html?comid=' + this.getAttribute("data-id") + '&commoditytype=' + this.getAttribute("data-commoditytype")
            return
        }
    }
    ping++
    if (getlocalStorageGoods != null) {
        temporaryLocalStorage = getlocalStorageGoods
        temporaryLocalStorageLength = temporaryLocalStorage.length
        for (var i = 0; i < temporaryLocalStorageLength; i++) {
            if (this.getAttribute("data-id") == temporaryLocalStorage[i].id && this.getAttribute("data-commoditytype") == temporaryLocalStorage[i].commoditytype) {
                if (temporaryLocalStorage[i].amount == this.getAttribute("data-stockamount")) {
                    _e.msgBox({
                        msg: "库存不足！",
                        timeout: 500,
                        className: "error"
                    })
                    return
                }
                temporaryLocalStorage[i].amount++

                    if (this.getAttribute("data-promotionflag") == 2 || this.getAttribute("data-promotionflag") == 3 || this.getAttribute("data-promotionflag") == 4) {
                      if(temporaryLocalStorage[i].amount>Number(this.getAttribute("data-promotion-repeatpurchasetimes"))){
                  _e.msgBox({
                      msg: "不享受优惠！",
                      timeout: 700,
                      className: "error"
                  })
                  return
                }
                        if (this.getAttribute("data-promotion-count") < this.getAttribute("data-promotion-reapttimes")) {
                            if (temporaryLocalStorage[i].amount <= (Number(this.getAttribute("data-promotion-reapttimes")) - Number(this.getAttribute("data-promotion-count")))) {
                                _e.msgBox({
                                    msg: "享受优惠！",
                                    timeout: 500,
                                    className: "info"
                                })
                            } else {
                                _e.msgBox({
                                    msg: "暂时不享受优惠！",
                                    timeout: 500,
                                    className: "error"
                                })
                            }
                        } else {
                            _e.msgBox({
                                msg: "暂时不享受优惠！",
                                timeout: 500,
                                className: "error"
                            })
                        }
                    }
                console.log(temporaryLocalStorage[i].amount)
                this.parentNode.childNodes[0].style.display = "block"
                this.parentNode.childNodes[1].innerHTML = ping
                localStorage.setItem('localStorageGoods', JSON.stringify(temporaryLocalStorage))
                document.querySelector(".showCart").innerHTML = '购物车<i class="icon iconfont tips icon-circles"></i>'
                return
            }
        }
    }

    temporaryLocalStorage[temporaryLocalStorageLength] = {}
    temporaryLocalStorage[temporaryLocalStorageLength]["id"] = this.getAttribute("data-id")
    temporaryLocalStorage[temporaryLocalStorageLength]["name"] = this.getAttribute("data-name")
    temporaryLocalStorage[temporaryLocalStorageLength]["url"] = this.getAttribute("data-url")
    temporaryLocalStorage[temporaryLocalStorageLength]["commoditytype"] = this.getAttribute("data-commoditytype")
    temporaryLocalStorage[temporaryLocalStorageLength]["delivery_interval"] = this.getAttribute("data-delivery_interval")
    temporaryLocalStorage[temporaryLocalStorageLength]["finishordder"] = this.getAttribute("data-finishordder")
    temporaryLocalStorage[temporaryLocalStorageLength]["groupprice"] = this.getAttribute("data-groupprice")
    temporaryLocalStorage[temporaryLocalStorageLength]["preorder"] = this.getAttribute("data-preorder")
    temporaryLocalStorage[temporaryLocalStorageLength]["preorderprice"] = this.getAttribute("data-preorderprice")
    temporaryLocalStorage[temporaryLocalStorageLength]["price"] = this.getAttribute("data-price")
    temporaryLocalStorage[temporaryLocalStorageLength]["promotionflag"] = this.getAttribute("data-promotionflag")
    temporaryLocalStorage[temporaryLocalStorageLength]["flag"] = 1
    temporaryLocalStorage[temporaryLocalStorageLength]["specification"] = this.getAttribute("data-specification")
    temporaryLocalStorage[temporaryLocalStorageLength]["startorder"] = this.getAttribute("data-startorder")
    temporaryLocalStorage[temporaryLocalStorageLength]["stockamount"] = this.getAttribute("data-stockamount")
    temporaryLocalStorage[temporaryLocalStorageLength]["unit"] = this.getAttribute("data-unit")
    temporaryLocalStorage[temporaryLocalStorageLength]["amount"] = 1
    temporaryLocalStorage[temporaryLocalStorageLength]["promotion"] = []
        // temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]={}
    temporaryLocalStorage[temporaryLocalStorageLength]["deliverytimes"] = 0
    if (this.getAttribute("data-promotionflag") == "2") {
        if (this.getAttribute(".count") > this.getAttribute("data-promotion-reapttimes")) {
            _e.msgBox({
                msg: "不享受优惠！",
                timeout: 500,
                className: "error"
            })
        }
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0] = {}
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["count"] = this.getAttribute("data-promotion-count")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["discount"] = this.getAttribute("data-promotion-discount")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["reapttimes"] = this.getAttribute("data-promotion-reapttimes")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["repeatpurchasetimes"] = this.getAttribute("data-promotion-repeatpurchasetimes")

    }
    if (this.getAttribute("data-promotionflag") == "3") {
        if (this.getAttribute(".count") > this.getAttribute("data-promotion-reapttimes")) {
            _e.msgBox({
                msg: "不享受优惠！",
                timeout: 500,
                className: "error"
            })
        }
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0] = {}
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["count"] = this.getAttribute("data-promotion-count")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["pv"] = this.getAttribute("data-promotion-pv")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["reapttimes"] = this.getAttribute("data-promotion-reapttimes")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["repeatpurchasetimes"] = this.getAttribute("data-promotion-repeatpurchasetimes")

    }

    if (this.getAttribute("data-promotionflag") == "4") {
        if (this.getAttribute(".count") > this.getAttribute("data-promotion-reapttimes")) {
            _e.msgBox({
                msg: "不享受优惠！",
                timeout: 500,
                className: "error"
            })
        }
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0] = {}
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["count"] = this.getAttribute("data-promotion-count")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["cashgift"] = this.getAttribute("data-promotion-cashgift")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["reapttimes"] = this.getAttribute("data-promotion-reapttimes")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["repeatpurchasetimes"] = this.getAttribute("data-promotion-repeatpurchasetimes")

    }

    console.log(temporaryLocalStorage)
    this.parentNode.childNodes[0].style.display = "block"
    this.parentNode.childNodes[1].innerHTML = ping
    temporaryLocalStorageLength++
    localStorage.setItem('localStorageGoods', JSON.stringify(temporaryLocalStorage))
    document.querySelector(".showCart").innerHTML = '购物车<i class="icon iconfont tips icon-circles"></i>'
}


//添加商品。存LocalStorage，需要判断促销方式购买次数
function numBoxReduce() {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    var retrievedObject = localStorage.getItem('localStorageGoods')
    var getlocalStorageGoods = JSON.parse(retrievedObject)
    var temporaryLocalStorage = []
    temporaryLocalStorage = getlocalStorageGoods
    var reduce = 0
    reduce = this.parentNode.childNodes[1].innerText
    for (var i = 0; i < temporaryLocalStorage.length; i++) {
        if (this.getAttribute("data-id") == temporaryLocalStorage[i].id && this.getAttribute("data-commoditytype") == temporaryLocalStorage[i].commoditytype) {
            temporaryLocalStorage[i].amount--
                if (this.getAttribute("data-promotionflag") == 1) {
                    if (Number(this.getAttribute("data-promotion-count")) < Number(this.getAttribute("data-promotion-reapttimes"))) {
                        if (this.getAttribute("data-promotion-buys") > 1) {
                            if (temporaryLocalStorage[i].amount <= Number(this.getAttribute("data-promotion-buys")) && temporaryLocalStorage[i].amount >= (Number(this.getAttribute("data-promotion-reapttimes")) - Number(this.getAttribute("data-promotion-count"))) * Number(this.getAttribute("data-promotion-buys"))) {
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
                            if (temporaryLocalStorage[i].amount >= ((json.message[0].promotion[0].data.reapttimes - json.message[0].promotion[0].data.count) * json.message[0].promotion[0].data.buys)) {
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

            if (this.getAttribute("data-promotionflag") == 2 || this.getAttribute("data-promotionflag") == 3 || this.getAttribute("data-promotionflag") == 4) {
                if (this.getAttribute("data-promotion-count") < this.getAttribute("data-promotion-reapttimes")) {
                    if (temporaryLocalStorage[i].amount <= (Number(this.getAttribute("data-promotion-reapttimes")) - Number(this.getAttribute("data-promotion-count")))) {
                        _e.msgBox({
                            msg: "享受优惠！",
                            timeout: 500,
                            className: "info"
                        })
                    } else {
                        _e.msgBox({
                            msg: "暂时不享受优惠！",
                            timeout: 500,
                            className: "error"
                        })
                    }
                } else {
                    _e.msgBox({
                        msg: "暂时不享受优惠！",
                        timeout: 500,
                        className: "error"
                    })
                }
            }


            reduce--
            this.parentNode.childNodes[1].innerHTML = reduce
            localStorage.setItem('localStorageGoods', JSON.stringify(temporaryLocalStorage))
            if (reduce == 0) {
                this.parentNode.childNodes[0].style.display = "none"
                this.parentNode.childNodes[1].innerHTML = null

                if (JSON.parse(localStorage.getItem('localStorageGoods')) != null) {
                    if (JSON.parse(localStorage.getItem('localStorageGoods')).length != 0) {
                        for (var l = 0; l < JSON.parse(localStorage.getItem('localStorageGoods')).length; l++) {

                            if (JSON.parse(localStorage.getItem('localStorageGoods'))[l].amount != 0) {
                                console.log(JSON.parse(localStorage.getItem('localStorageGoods'))[l].amount);
                                document.querySelector(".showCart").innerHTML = '购物车<i class="icon iconfont tips icon-circles"></i>'
                                return
                            } else {
                                document.querySelector(".showCart").innerHTML = '购物车'
                            }

                        }
                    } else {
                        document.querySelector(".showCart").innerHTML = '购物车'
                        return
                    }
                } else {
                    document.querySelector(".showCart").innerHTML = '购物车'
                    return
                }
            }
            return
        }
    }
}



//改变类颜色
function hoverCode() {
    var bbcolor=document.querySelectorAll(".bobodaren")
    if (bbcolor.length == 0) {
        this.setAttribute("class", "hover hovercode bobodaren")
            this.setAttribute("style","color:#000;background-color:#FFF4E1;height:40px;line-height:40px")
    } else {
        for (var i = 0; i < bbcolor.length; i++) {
          if (bbcolor[i].getAttribute("data-commodetytype") == "4" ||bbcolor[i].getAttribute("data-commodetytype") == "2" || bbcolor[i].getAttribute("data-commodetytype") == "7" || bbcolor[i].getAttribute("data-commodetytype") == "8"|| bbcolor[i].getAttribute("data-commodetytype") == "9") {
                bbcolor[i].setAttribute("style","font-size:14px;height:40px;background-color:#E6E6E6;line-height:40px;font-size:14px")
                bbcolor[i].className = "hover hovercode"

                this.setAttribute("class", "hover hovercode bobodaren")
                this.setAttribute("style","color:#000;background-color:#FFF4E1;height:40px;line-height:40px;font-size:14px")
            }else{

              bbcolor[i].setAttribute("style","background-color:#F9F9F9;")
              bbcolor[i].className = "hover hovercode"
              this.setAttribute("class", "hover hovercode bobodaren")
              this.setAttribute("style","color:#000;background-color:#FFF4E1;")
            }
        }
        if(this.getAttribute("data-commodetytype") != "1"){
          this.setAttribute("style","color:#000;background-color:#FFF4E1;height:40px;line-height:40px;font-size:14px")
        }else{
          this.setAttribute("style","color:#000;background-color:#FFF4E1;")
        }
    }
}
//小类
function gdClsCk(){
  //console.log(this);
  this.setAttribute("style","color:#000;background-color:#FFDD55")
  if(this.parentNode.firstChild.checked==true){
    this.parentNode.childNodes[0]=false
    this.parentNode.childNodes[2].setAttribute("style","color:#000;height:auto")
  }else{
    this.parentNode.childNodes[0]=true
    this.parentNode.childNodes[2].setAttribute("style","color:#000;height:auto")
    hoverCommodity(Number(this.parentNode.childNodes[2].firstChild.getAttribute("code")),0)
    var bbdr=document.querySelectorAll(".bobodaren")
    if (bbdr.length == 0) {
        this.parentNode.childNodes[2].firstChild.setAttribute("class", "hover hovercode bobodaren")
        this.parentNode.childNodes[2].firstChild.setAttribute("style","background-color:#fff;color:#000")
    } else {
        for (var i = 0; i < document.querySelectorAll(".bobodaren").length; i++) {

            if (bbdr[i].getAttribute("data-commodetytype") == "4" ||bbdr[i].getAttribute("data-commodetytype") == "2" || document.querySelectorAll(".bobodaren")[i].getAttribute("data-commodetytype") == "7" || document.querySelectorAll(".bobodaren")[i].getAttribute("data-commodetytype") == "8"|| document.querySelectorAll(".bobodaren")[i].getAttribute("data-commodetytype") == "9") {
                bbdr[i].setAttribute("style","font-size:14px;line-height:40px;height:40px;color:#888;background-color:#e6e6e6")
                bbdr[i].parentNode.setAttribute("style","height:40px")
                bbdr[i].className = "hover hovercode"
                this.parentNode.childNodes[2].firstChild.setAttribute("class", "hover hovercode bobodaren")
                this.parentNode.childNodes[2].firstChild.setAttribute("style","color:#000;background-color:#FFF4E1,height:41px")
            }else{
              bbdr[i].setAttribute("style","color:#888")
              bbdr[i].parentNode.parentNode.childNodes[1].setAttribute("style","color:#888;background-color:#E6E6E6")
              bbdr[i].parentNode.parentNode.childNodes[0].checked=false
              bbdr[i].parentNode.setAttribute("style","height:0")
              bbdr[i].className = "hover hovercode"
              this.parentNode.childNodes[2].firstChild.setAttribute("class", "hover hovercode bobodaren")
              this.parentNode.childNodes[2].firstChild.setAttribute("style","color:#000;background-color:#FFF4E1")
            }
        }
    }

  }
}

var el = document.querySelector(".scrollable");
var mc = new Hammer(el, {
    touchAction: 'pan-y'
});
mc.get('swipe').set({
    direction: Hammer.DIRECTION_VERTICAL
});
//tap press swipeup swipedown 不同的事件
mc.on("swipeup", function(ev) {
    var goodList = document.querySelector(".goodsList")
    if (goodList.length == 0) return
    var elelast = document.querySelector(".id_lastid")
    if (isElementInViewport(elelast)) {
        var loadShow = '<div class="loading"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3">' +
            '</div> <div class="rect4"></div> <div class="rect5"></div> </div>'
        goodList.innerHTML += loadShow

        document.querySelector(".id_lastid").setAttribute("class", "flex allGoods")
        var fd = new FormData(),
            xhr = new XMLHttpRequest()
        var swiperUp = document.querySelector(".bobodaren")
        if (swiperUp.getAttribute("data-commodetytype") == "2") {

            fd.append("start", document.querySelectorAll(".allGoods").length)
            xhr.open("POST", "/groupbuy/getcoms", true)
            xhr.send(fd)
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var json = eval('(' + xhr.responseText + ');')
                    if (json.data.length == 0) {
                        _e.msgBox({
                            msg: "已显示所有的商品！",
                            timeout: 700,
                            className: "info"
                        })
                        goodList.removeChild(document.querySelector(".loading"))
                        return
                    }
                    jsonData(json, 2, document.querySelector(".bobodaren").getAttribute("code"))
                    goodList.removeChild(document.querySelector(".loading"))
                }
            }
        } else {
            if (swiperUp.getAttribute("data-commodetytype") == "1") {
                fd.append("classid", swiperUp.getAttribute("code"))
                fd.append("start", document.querySelectorAll(".allGoods").length)
                xhr.open("POST", "/sales/getcomsbyclass", true)
                xhr.send(fd)
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var json = eval('(' + xhr.responseText + ');')
                        if (json.data.length == 0) {
                            _e.msgBox({
                                msg: "已显示所有的商品！",
                                timeout: 700,
                                className: "info"
                            })
                            goodList.removeChild(document.querySelector(".loading"))
                            return
                        }
                        jsonData(json, 2, document.querySelector(".bobodaren").getAttribute("code"))
                        goodList.removeChild(document.querySelector(".loading"))
                    }
                }
            } else {
                fd.append("moduleid", swiperUp.getAttribute("data-id"))
                fd.append("start", document.querySelectorAll(".allGoods").length)
                xhr.open("POST", "/sales/getcombymodule", true)
                xhr.send(fd)
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var json = eval('(' + xhr.responseText + ');')
                        if (json.data.length == 0) {
                            _e.msgBox({
                                msg: "已显示所有的商品！",
                                timeout: 700,
                                className: "info"
                            })
                            goodList.removeChild(document.querySelector(".loading"))
                            return
                        }
                        jsonData(json, 2, swiperUp.getAttribute("data-id"))
                        goodList.removeChild(document.querySelector(".loading"))
                    }
                }
            }
        }

        setTimeout("window.scrollTo(0,document.body.scrollHeight);", 200)
    } else {
        // el.innerHTML = el.innerHTML+"<br>no data, just record<br>"
    }
    //window.scrollTo(0,document.body.scrollHeight);
});

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}
