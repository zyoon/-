/**
 * Created by bobodaren007 on 2016/7/22 0022.
 */
//显示购物车
// localStorage.removeItem("localStorageGoods")
// var retrievedObject = localStorage.getItem('localStorageGoods')
// var getlocalStorageGoods = JSON.parse(localStorage.getItem('localStorageGoods'))
// console.log(getlocalStorageGoods)
// if (JSON.parse(localStorage.getItem('localStorageGoods')) != null) {
//     for (var l = 0; l < JSON.parse(localStorage.getItem('localStorageGoods')).length; l++) {
//         if (JSON.parse(localStorage.getItem('localStorageGoods'))[l].amount != 0) {
//             document.querySelector(".showCart").innerHTML = '购物车<i class="icon iconfont tips icon-circles"></i>'
//         }
//     }
// }


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

// console.log(getUrlParam("comid"))
// console.log(getUrlParam("n"))
// console.log(getUrlParam("id"))

function groupAddress(){
  var groupComId=getUrlParam("comid")
  var groupId=getUrlParam("aId")
  var number=getUrlParam("n")
  window.location.href="groupaddress.html?comid="+groupComId+"&aId="+groupId+"&n="+number
}

var fd = new FormData(),
    xhr = new XMLHttpRequest()
fd.append("id", getUrlParam("comid"))
fd.append("groupbuyid", getUrlParam("aId"))
xhr.open("POST", "/groupbuy/getgroupcommoditydetail", true)
xhr.send(fd)
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var groupJson = eval('(' + xhr.responseText + ');')
        goodsDetailShow(groupJson)
        console.log(groupJson)
    }
}

function goodsDetailShow(groupJson) {
    var num = getUrlParam("n")
    var userInfo = '  <ul  data-name="' + groupJson.message[0].name + '" data-amount="' + num + '" data-id="' + groupJson.message[0].id + '" data-ordertype="' + groupJson.message[0].preorder + '" class="flex user"><img src="http://od35wia0b.bkt.clouddn.com/' + groupJson.message[0].url + '" alt="" style="width: 60px;height: 60px;margin: 10px 0;">' +
        '<li class="flex-1">' +
        '<h1 style="margin: 5px 0;">' + groupJson.message[0].name + '</h1>' +
        '<h2 class="flex"><p class="flex-1">规格 : ' + groupJson.message[0].specification + '</p><p class="flex-1 ta-center">¥' + (groupJson.message[0].groupprice)  / 100 + '</p><p class="flex-1 ta-right">'+num+'</p></h2></li></ul>'
    document.querySelector(".goodsListOrder").innerHTML = userInfo

    document.querySelector(".numprice").innerHTML = '¥' + ((groupJson.message[0].groupprice) * Number(num)) / 100
}


var xxhr = new XMLHttpRequest()
xxhr.open("POST", "/adress/getflagadress", true)
xxhr.send()
xxhr.onreadystatechange = function() {
    if (xxhr.readyState == 4 && xxhr.status == 200) {
        cartAddInfo = eval('(' + xxhr.responseText + ');')
        console.log(cartAddInfo);
        loadAddInfo(cartAddInfo)
    }
}

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
            var cartInfoHtml = '<div class="flex addresssub" data-dept="' + cartAddInfo.address[0].dept + '" data-sex="' + cartAddInfo.address[0].gender + '" data-phone="' + cartAddInfo.address[0].phone + '" data-address="' + cartAddInfo.address[0].adress + '" data-subid="' + cartAddInfo.address[0].subid + '"  data-name="' + cartAddInfo.address[0].name + '"> <ul><i class="icon iconfont icon-location"></i></ul> <li class="flex-1"> ' +
                '<h1><b>' + cartAddInfo.address[0].name + '</b><span>' + cartAddInfo.address[0].gender + '</span>' + cartAddInfo.address[0].phone + '</h1> <h2>' + cartAddInfo.address[0].adress + '</h2></li>' +
                ' <p><i class="icon iconfont icon-arrowright"></i></p> </div>'
            addList.innerHTML += cartInfoHtml
        }
        subid = cartAddInfo.address[0].subid
        address = cartAddInfo.address[0].adress
    }
}

_e.bind(".subbtn", "click", subAddUserInfo)

function subAddUserInfo() {
    var addList = document.querySelector(".addresssub")
    var userList = document.querySelector(".user")
    var fdd = new FormData(),
        sxhr = new XMLHttpRequest()
    fdd.append("id", Number(userList.getAttribute("data-id")))
    fdd.append("amount", Number(userList.getAttribute("data-amount")))
    fdd.append("ordertype", Number(userList.getAttribute("data-ordertype")))
    fdd.append("name", addList.getAttribute("data-name"))
    fdd.append("phone", addList.getAttribute("data-phone"))
    fdd.append("department", addList.getAttribute("data-dept"))
    fdd.append("subid", addList.getAttribute("data-subid"))
    fdd.append("ordermemo", document.querySelector(".freebackReplyTextarea").value)
    fdd.append("gender", addList.getAttribute("data-sex"))
    fdd.append("address", addList.getAttribute("data-address"))
    fdd.append("groupbuy", Number(getUrlParam("aId")))
    sxhr.open("POST", "/groupbuy/groupbuycreatorder", true)
    sxhr.send(fdd)
    sxhr.onreadystatechange = function() {
        if (sxhr.readyState == 4 && sxhr.status == 200) {
            var r = eval('(' + sxhr.responseText + ');')
            console.log(r);
        }
    }
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
String.prototype.TextFilter = function() {
    var pattern = new RegExp("[~`@#$%^&*<>《》￥||·—_=]"); //[]内输入你要过滤的字符，这里是我的
    var rs = "";
    for (var i = 0; i < this.length; i++) {
        rs += this.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
