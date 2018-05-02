/**
 * Created by bobodaren007 on 2016/7/16 0016.
 */
 function get_config(){
   var url = window.location.href.split("#")[0]
  //  var codes = getUrlParam("code")
  //   var state = getUrlParam("state")
   var xml = new XMLHttpRequest()
   xml.open("POST","http://www.newfan.net.cn/wx/get_jssdk",true)
   xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
   xml.send("urlt="+url)
   xml.onreadystatechange = function () {
       if (xml.readyState == 4 && xml.status == 200) {
       var responseText = xml.responseText;
       var responseTextJson = JSON.parse(responseText)
       wx.config({
           debug:false,
           appId: "wx15c6a124160fb8fb",
           timestamp: responseTextJson.timestamp,
           nonceStr: responseTextJson.nonce,
           signature:responseTextJson.signature,
           jsApiList: [
             'openLocation',
             'getLocation'
           ]
       })
   }
 }
 }
  // wx.ready(function () {
  //   wx.getLocation({
  //   type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
  //    success: function (res) {
  //      localStorage.setItem("latitude",res.latitude)
  //      localStorage.setItem("longitude",res.longitude)
  //      }
  //
  // });
  // })
 wx.error(function (res) {
   alert(res.errMsg);
 })

 // function getlocation(res){
 //     var    latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
 //   var   longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
 //
 //
 // }

if (JSON.parse(localStorage.getItem('localStorageGoods')) != null) {
    for (var l = 0; l < JSON.parse(localStorage.getItem('localStorageGoods')).length; l++) {
        if (JSON.parse(localStorage.getItem('localStorageGoods'))[l].amount != 0) {
            document.querySelector(".showCart").innerHTML = '购物车<i class="icon iconfont tips icon-circles"></i>'
        }
    }
}

window.onload = function() {
       var codes = getUrlParam("code")
    var state = getUrlParam("state")
    if (codes!=null&&state!=null){
     var xml = new XMLHttpRequest();
      xml.open("GET", "/wx/wechat_auth?code=" + codes + "&state=" + state, true);
      xml.onreadystatechange = function() {
          if (xml.readyState == 4 && xml.status == 200) {
              var res = eval('(' + xml.responseText + ')')
              if (res.res == 0) {
                  //console.log("hello address")
		  address()
                  return
              }
          }
      }
      xml.send()
    }else{
      address()
       return
       }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
// function toPosition(){
//   var xml = new XMLHttpRequest()
//   xml.open("GET","/basis/gps/getSubGps",true)
//     xml.send()
//   xml.onreadystatechange = function(){
//       if (xml.readyState==4 && xml.status==200){
//         var d = eval('(' + xml.responseText + ');')
//         // console.log(d)
//           if(d.res==1){
//             var lon_n=localStorage.getItem("longitude")
//             var lat_n=localStorage.getItem("latitude")
//              console.log(d.data.length)
//             for (var i=0;i<d.data.length;i++){
//             var lat=d.data[i].lat
//             var lng=d.data[i].lng
//             var sub_id=d.data[i].subdistrict
//             var sub_name= d.data[i].subName
//           lat.substring(0,lat.length-1)
//           lng.substring(0,lng.length-1)
//           var lata=lat.split(",")
//           var lnga=lng.split(",")
//             var a2=[]
//             if(lata.length==1){
//               continue
//             }
//
//              for (var j=0;j<lata.length-1;j++){
//                var a1 = []
//                 a1.push(lnga[j],lata[j])
//                 a2.push(a1)
//              }
//              var polygon = new AMap.Polygon({
//                     path: a2
//                });
//                if (polygon.contains([lon_n,lat_n])){
//                  var address = document.querySelector(".address");
//                  address.innerText = sub_name;
//                  var fd1 = new FormData(),xmr = new XMLHttpRequest()
//                  fd1.append("subid",sub_id)
//                  xmr.open("POST","/adress/setusersubdistrict",true)
//                  xmr.send(fd1)
//                  xmr.onreadystatechange = function() {
//                      if (xmr.readyState == 4 && xmr.status == 200) {
//                          var d1 = eval('(' + xmr.responseText + ');')
//                          if(d1.res!=1){
//                             window.location.href="index.html"
//                          }
//                      }
//                  }
//                  break
//                }
//                if(i==d.data.length-1){
//                  getuserlng(lon_n,lat_n)
//                  var fd1 = new FormData(),xmr = new XMLHttpRequest()
//                  fd1.append("subid",12)
//                  xmr.open("POST","/adress/setusersubdistrict",true)
//                  xmr.send(fd1)
//                  xmr.onreadystatechange = function() {
//                      if (xmr.readyState == 4 && xmr.status == 200) {
//                          var d1 = eval('(' + xmr.responseText + ');')
//                          if(d1.res!=1){
//                             window.location.href="index.html"
//                          }
//                      }
//                  }
//                }
//             }
//           }
//         }
//       }
//
// }
// function getuserlng(longitude,latitude){
//   var add_innerhtml=""
//   var cu_addr = document.querySelector(".address");
//   var xml = new XMLHttpRequest()
//   xml.open("GET","http://restapi.amap.com/v3/geocode/regeo?output=json&location="+longitude+","+latitude+"&key=b00a329396acb15573769c77b54f2b87&extensions=all",true)
//   xml.send()
//   xml.onreadystatechange = function(){
//       if(xml.readyState == 4 && xml.status == 200){
//           var call_sth = eval('('+xml.responseText+');')
//           var regeocode=call_sth.regeocode
//           console.log(call_sth)
//          var reg_info=regeocode.addressComponent
//          if(reg_info.city){
//            add_innerhtml=reg_info.city
//          }else{
//           add_innerhtml=reg_info.province
//          }
//         add_innerhtml+=reg_info.district+reg_info.streetNumber.street
//           if(regeocode.aois.length>0){
//             add_innerhtml+=regeocode.aois[0].name
//           }else{
//             add_innerhtml+=regeocode.pois[0].name
//           }
//           if (reg_info.neighborhood.name.length>1){
//             add_innerhtml+=reg_info.neighborhood.name[0]
//           }
//           cu_addr.innerText=add_innerhtml
//           console.log(cu_addr.innerText)
//       }
//   }
// }
function address() {
    var fd = new FormData(),xhr = new XMLHttpRequest()
    xhr.open("POST", "/adress/getusersubdistrict", true)
    xhr.send(fd);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var d = eval('(' + xhr.responseText + ');')
            console.log(d);

                //var address = document.querySelector(".address");
                //address.innerText = d.subname;
                getModule()
                getHomePageComs()

                // var add_innerhtml=""
                // var cu_addr=document.querySelector('.address')
                // var xml = new XMLHttpRequest()
                // xml.open("GET","http://restapi.amap.com/v3/geocode/regeo?output=json&location="+longitude+","+latitude+"&key=b00a329396acb15573769c77b54f2b87&extensions=all",true)
                // xml.send()
                // xml.onreadystatechange = function(){
                //     if(xml.readyState == 4 && xml.status == 200){
                //         var call_sth = eval('('+xml.responseText+');')
                //         var regeocode=call_sth.regeocode
                //         console.log(regeocode)
                //        var reg_info=regeocode.addressComponent
                //       //  console.log(s)
                //        if(reg_info.city){
                //          add_innerhtml=reg_info.city
                //        }else{
                //         add_innerhtml=reg_info.province
                //        }
                //       add_innerhtml+=reg_info.district+reg_info.streetNumber.street
                //         if(regeocode.aois.length>0){
                //           add_innerhtml+=regeocode.aois[0].name
                //         }else{
                //           add_innerhtml+=regeocode.pois[0].name
                //         }
                //         if (reg_info.neighborhood.name.length>1){
                //           add_innerhtml+=reg_info.neighborhood.name[0]
                //         }
                //         cu_addr.innerHTML=add_innerhtml
                //     }
                // }

                //    _e.msgBox({
                //  msg: d.msg,
                //  timeout: 1000,
                //  className: "info"
                //  })
              // getModule()
              // getHomePageComs()

        }
    }
}


function getModule() {
   	var fd = new FormData(),
        xhr = new XMLHttpRequest()
    	xhr.open("POST", "/homepage/getmodule", true)
    	xhr.send(fd)
    	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var getModuleD = eval('(' + xhr.responseText + ');')
            loadModule(getModuleD)
            console.log(getModuleD)
        	}
    	}
}

function getHomePageComs() {
    var fd = new FormData(),
        xhr = new XMLHttpRequest()
    xhr.open("POST", "/homepage/gethomepagecoms", true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var getHomePageComsD = eval('(' + xhr.responseText + ');')
            console.log(getHomePageComsD)
            loadSearchGoods(getHomePageComsD, 0)

            /*   _e.msgBox({
             msg: "已显示所有的商品！",
             timeout: 2000,
             className: "info"
             })*/
        }
    }
}

var imgReady = (function() {
    var list = [],
        intervalId = null;
    // 用来执行队列
    var queue = function() {
        for (var i = 0; i < list.length; i++) {
            list[i].end ? list.splice(i--, 1) : list[i]();
        }!list.length && stop();
    };

    // 停止所有定时器队列
    var stop = function() {
        clearInterval(intervalId);
        intervalId = null;
    }
    return function(url, ready, error) {
        var onready = {},
            width,
            height,
            newWidth,
            newHeight,
            img = new Image();
        img.src = url;


        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img);
            return img.src;
        }
        width = img.width;
        height = img.height;

        // 加载错误后的事件
        img.onerror = function() {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };

        // 图片尺寸就绪
        var onready = function() {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024
            ) {
                ready.call(img);
                onready.end = true;
            };
        };
        onready();
        // 完全加载完毕的事件
        img.onload = function() {
            // onload在定时器时间差范围内可能比onready快
            // 这里进行检查并保证onready优先执行
            !onready.end && onready();
            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null;
        };


        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) {
                intervalId = setInterval(queue, 40);
            };
        };
        return img.src;

    }
    console.log(img.src);
    return img.src;
})();



function loadModule(getModuleD) {
    var loadImg = document.querySelector(".topAd")
    var loadImgDot = document.querySelector(".pagination")
    var arr = new Array()
    arr = getModuleD.banner.sort(function(a, b) {
        return a.seq - b.seq
    })
    for (var i = 0; i < arr.length; i++) {
        var url = "location.href='" + arr[i].url
        url += "'"
        var bannerImg = "http://mrten-0.mrten.cn/" + arr[i].image + "?imageView2/1/q/75/format/jpeg"
        var r = imgReady(bannerImg, function() {
            return this.src;
        });
        var imgHtml = '<img onclick="' + url + '" src="' + r + '" class="bg"/>'
        var imgDotHtml = '<li id="dot_0" class="page-dot"></li>'
        loadImg.innerHTML += imgHtml
        loadImgDot.innerHTML += imgDotHtml
            //document.querySelector(".topAd").style.touchAction="auto"
    }
    document.querySelector(".bg").className = "bg fadein"

    for (var c = 0; c < getModuleD.moduleone.length; c++) {
        var classHtml = '	<p style="background-color: ' + getModuleD.moduleone[c].color + '"><i class="icon iconfont icon-' + getModuleD.moduleone[c].image + '"></i></p>' +
            ' <li class="flex-1"> <h1>' + getModuleD.moduleone[c].name + '</h1> <h2>' + getModuleD.moduleone[c].intro + '</h2></li>'
        if (getModuleD.moduleone[c].seq == 1) {
            var flax1 = document.querySelector(".flex1")
            flax1.innerHTML = classHtml
            flax1.setAttribute('onclick', "location.href='" + getModuleD.moduleone[c].url + "'")
        }
        if (getModuleD.moduleone[c].seq == 2) {
            var flax2 = document.querySelector(".flex2")
            flax2.innerHTML = classHtml
            flax2.setAttribute('onclick', "location.href='" + getModuleD.moduleone[c].url + "'")
        }
        if (getModuleD.moduleone[c].seq == 3) {
            var flax3 = document.querySelector(".flex3")
            flax3.innerHTML = classHtml
            flax3.setAttribute('onclick', "location.href='" + getModuleD.moduleone[c].url + "'")
        }
        if (getModuleD.moduleone[c].seq == 4) {
            var flax4 = document.querySelector(".flex4")
            flax4.innerHTML = classHtml
            flax4.setAttribute('onclick', "location.href='" + getModuleD.moduleone[c].url + "'")
        }
    }

    var arr = new Array()
    arr = getModuleD.moduletwo.sort(function(a, b) {
        return a.seq - b.seq
    })

    for (var t = 0; t < arr.length; t++) {
        var url = "location.href='" + arr[t].url
        url += "'"
        var moduletwo = "http://mrten-0.mrten.cn/" + arr[t].image
        var Mr = imgReady(moduletwo, function() {
            return this.src;
        });
        var modTwoHtml = '<li onclick="' + url + '"><img src="' + Mr + '" /></li>'
        document.querySelector(".adList").innerHTML += modTwoHtml
    }
    var arr1 = new Array()
    arr1 = getModuleD.modulethree.sort(function(a, b) {
        return a.seq - b.seq
    })
    for (var s = 0; s < arr1.length; s++) {
        var url = "location.href='" + arr1[s].url
        url += "'"
        var modThreeHtml = '<ul onclick="' + url + '" class="flex-1" style="border-left:1px solid #EEE; border-right:1px solid #EEE;"><li><h1 style="color:' + arr1[s].color + ';">' + arr1[s].name + '</h1><h2>' + arr1[s].intro + '</h2></li><p><img src="http://mrten-0.mrten.cn/' + arr1[s].image + '"></p></ul>'
        document.querySelector(".loadHotList").innerHTML += modThreeHtml
    }
}


function loadSearchGoods(json, num) {
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

            function addto() {
                window.event ? window.event.cancelBubble = true : e.stopPropagation();
            }
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

        var saletype = document.querySelectorAll(".saletype")
        for (var j = 0; j < saletype.length; j++) {
            if (saletype[j].innerText == 0||saletype[j].innerText <0) {
              saletype[j].parentNode.parentNode.childNodes[2].childNodes[1].innerHTML="已售罄"
                saletype[j].parentNode.parentNode.childNodes[2].childNodes[2].style.display = "none"
                saletype[j].parentNode.parentNode.childNodes[2].childNodes[1].style.display = "block"
              //  saletype[j].parentNode.parentNode.childNodes[1].innerHTML = ""
            }
        }
    }
    _e.bindAll(".icon-pluscircle", "click", numBoxPing)
    _e.bindAll(".icon-minuscircleo", "click", numBoxReduce)


    if (document.querySelector(".goodsList").children.length != 0) {
        var lastId = document.querySelectorAll(".allGoods")
        lastId[lastId.length - 1].setAttribute("class", "flex allGoods id_lastid")
    }
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
            console.log(getLSG.length)
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
                                            timeout: 2000,
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
                                            if (temporaryLocalStorage[i].amount <= (this.getAttribute("data-promotion-reapttimes") - this.getAttribute("data-promotion-count"))) {
                                                _e.msgBox({
                                                    msg: "享受优惠！",
                                                    timeout: 2000,
                                                    className: "info"
                                                })
                                            } else {
                                                _e.msgBox({
                                                    msg: "暂时不享受优惠！",
                                                    timeout: 2000,
                                                    className: "error"
                                                })
                                            }
                                        } else {
                                            _e.msgBox({
                                                msg: "暂时不享受优惠！",
                                                timeout: 2000,
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
        ping++
        if (getlocalStorageGoods != null) {
            temporaryLocalStorage = getlocalStorageGoods
            temporaryLocalStorageLength = temporaryLocalStorage.length
            for (var i = 0; i < temporaryLocalStorageLength; i++) {
                if (this.getAttribute("data-id") == temporaryLocalStorage[i].id && this.getAttribute("data-commoditytype") == temporaryLocalStorage[i].commoditytype) {
                    if (temporaryLocalStorage[i].amount == this.getAttribute("data-stockamount")) {
                        _e.msgBox({
                            msg: "库存不足！",
                            timeout: 2000,
                            className: "error"
                        })
                        return
                    }
                    temporaryLocalStorage[i].amount++

                        if (this.getAttribute("data-promotionflag") == "2" || this.getAttribute("data-promotionflag") == "3" || this.getAttribute("data-promotionflag") == "4") {
                          if(temporaryLocalStorage[i].amount>Number(this.getAttribute("data-promotion-repeatpurchasetimes"))){
                        _e.msgBox({
                            msg: "不享受优惠！",
                            timeout: 700,
                            className: "error"
                        })
                        return
                      }
                            if (this.getAttribute("data-promotion-count") < this.getAttribute("data-promotion-reapttimes")) {
                                if (temporaryLocalStorage[i].amount <= (this.getAttribute("data-promotion-reapttimes") - this.getAttribute("data-promotion-count"))) {
                                    _e.msgBox({
                                        msg: "享受优惠！",
                                        timeout: 2000,
                                        className: "info"
                                    })
                                } else {
                                    _e.msgBox({
                                        msg: "暂时不享受优惠！",
                                        timeout: 2000,
                                        className: "error"
                                    })
                                }
                            } else {
                                _e.msgBox({
                                    msg: "暂时不享受优惠！",
                                    timeout: 2000,
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
        temporaryLocalStorage[temporaryLocalStorageLength]["flag"] = 1
        temporaryLocalStorage[temporaryLocalStorageLength]["promotionflag"] = this.getAttribute("data-promotionflag")
        temporaryLocalStorage[temporaryLocalStorageLength]["specification"] = this.getAttribute("data-specification")
        temporaryLocalStorage[temporaryLocalStorageLength]["startorder"] = this.getAttribute("data-startorder")
        temporaryLocalStorage[temporaryLocalStorageLength]["stockamount"] = this.getAttribute("data-stockamount")
        temporaryLocalStorage[temporaryLocalStorageLength]["unit"] = this.getAttribute("data-unit")
        temporaryLocalStorage[temporaryLocalStorageLength]["amount"] = 1
        temporaryLocalStorage[temporaryLocalStorageLength]["discount"] = this.getAttribute("data-discount")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"] = []
            // temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]={}
        temporaryLocalStorage[temporaryLocalStorageLength]["deliverytimes"] = 0
        if (this.getAttribute("data-promotionflag") == "2") {
            if (this.getAttribute(".count") > this.getAttribute("data-promotion-reapttimes")) {
                _e.msgBox({
                    msg: "不享受优惠！",
                    timeout: 2000,
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
                    timeout: 2000,
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
                    timeout: 2000,
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

}



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
                if (this.getAttribute("data-promotionflag") == "2" || this.getAttribute("data-promotionflag") == "3" || this.getAttribute("data-promotionflag") == "4") {
                    if (this.getAttribute("data-promotion-count") < this.getAttribute("data-promotion-reapttimes")) {
                        console.log(temporaryLocalStorage[i].amount);
                        if (temporaryLocalStorage[i].amount <= (Number(this.getAttribute("data-promotion-reapttimes")) - Number(this.getAttribute("data-promotion-count")))) {
                            _e.msgBox({
                                msg: "享受优惠！",
                                timeout: 2000,
                                className: "info"
                            })
                        } else {
                            _e.msgBox({
                                msg: "暂时不享受优惠！",
                                timeout: 2000,
                                className: "error"
                            })
                        }
                    } else {
                        _e.msgBox({
                            msg: "暂时不享受优惠！",
                            timeout: 2000,
                            className: "error"
                        })
                    }
                }

            if (this.getAttribute("data-promotionflag") == "1") {
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
                return
            }
            return
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

        fd.append("start", document.querySelectorAll(".allGoods").length)

        xhr.open("POST", "/homepage/gethomepagecoms", true)

        xhr.send(fd)
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var json = eval('(' + xhr.responseText + ');')

                loadSearchGoods(json, 2)
                goodList.removeChild(document.querySelector(".loading"))
                    //  setTimeout("document.querySelector('.goodList').removeChild(document.querySelector('.loading'))",3000)
                if (json.data.length == 0) {
                    _e.msgBox({
                        msg: "已显示所有的商品！",
                        timeout: 2000,
                        className: "info"
                    })
                    return
                }
            }
        }
        setTimeout("window.scrollTo(0,document.body.scrollHeight);", 200)
    }
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
