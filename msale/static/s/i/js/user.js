/**
 * Created by bobdoaren007 on 2016/7/20 0020.
 */
window.onload = function() {

  // var xml = new XMLHttpRequest()
  // xml.open("POST", "/wx/session_check", true)
  // xml.send();
  // xml.onreadystatechange = function() {
  //     if (xml.readyState == 4 && xml.status == 200) {
  //         var d = eval('(' + xml.responseText + ');')
  //         if(d.res==0){
  //
  //         }
  //
  //     }
  // }

  var xhr = new XMLHttpRequest()
  xhr.open("POST", "/sales/checkIfStaff", true)
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var d = eval('(' + xhr.responseText + ');')
        if (d.res==1){
          var userlist = document.querySelector(".userList")
          var url = "'mydelivery.html'"
          userlist.innerHTML += '  <ul class="flex" onclick="location.href='+url+';">' +
              '<h1><i class="icon iconfont icon-order"></i></h1>' +
              '<h2 class="flex-1">我的配送单</h2>' +
              '<h3 ></h3><p><i class="icon iconfont icon-arrowright"></i></p></ul>'
              var url1 = "'stall_scan.html'"
              userlist.innerHTML += '  <ul class="flex" onclick="location.href='+url1+';">' +
                  '<h1><i class="icon iconfont icon-marketing"></i></h1>' +
                  '<h2 class="flex-1">地推</h2>' +
                  '<h3 ></h3><p><i class="icon iconfont icon-arrowright"></i></p></ul>'
        }
      }
  }
  xhr.send();
}
var xhr = new XMLHttpRequest()
xhr.open("POST", "/sales/getbalance", true)
xhr.send();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var userInfoD = eval('(' + xhr.responseText + ');')
        console.log(userInfoD)
        var membershipGrade =document.querySelector("#membershipGrade")
        membershipGrade.innerHTML = userInfoD.membername
        var membershipDistance =document.querySelector("#membershipDistance")
        membershipDistance.innerHTML = userInfoD.next_member
        var upgradeIntegration =document.querySelector("#upgradeIntegration")
        upgradeIntegration.innerHTML = userInfoD.satisfyscores
        var memberPoints = document.querySelector("#memberPoints")
        memberPoints.innerHTML = userInfoD.scores + "分"
        var membershipDiscount = document.querySelector("#membershipDiscount")
        membershipDiscount.innerHTML = userInfoD.memberdiscount/10 + "折"
        if(userInfoD.satisfyscores == 0){
          var userAvatar = document.querySelector("#userAvatar")
          userAvatar.innerHTML = '当前为会员等级<b id="membershipGrade">'+userInfoD.membername+'</b>,已经是最高会员了！'
        }

        if (userInfoD.res = 1) {
            loaduserInfo(userInfoD)
        }
    }
}


function loaduserInfo(userInfoD) {
    var money = document.querySelector(".money");
    money.innerText = " ¥ " + userInfoD.balance / 100
    var loadUserInfo = '<div class="flex"> <ul><img src="' + userInfoD.avatar + '" /></ul> <li class="flex-1">' +
        '<h1>' + userInfoD.name + '</h1><h2 class="getPhone">' + userInfoD.phone + '</h2></li> <p><i class="icon iconfont "></i></p> </div>'
    document.querySelector(".userInfo").innerHTML = loadUserInfo
    document.querySelector(".loadPhone").innerHTML = userInfoD.phone
    document.querySelector("#deptphone").innerHTML = '<h1><i class="icon iconfont icon-phone"></i></h1><h2 class="flex-1">联系我们</h2><h3><a style="color:#999" href="tel:' + userInfoD.deptphone + '">' + userInfoD.deptphone + '</a></h3><p><i class="icon iconfont "></i></p>'
}
