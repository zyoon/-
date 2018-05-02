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
        upgradeIntegration.innerHTML = userInfoD.satisfyscores + "分"
        var memberPoints = document.querySelector("#memberPoints")
        memberPoints.innerHTML = userInfoD.scores + "分"

        if (userInfoD.res = 1) {
            loaduserInfo(userInfoD)
        }
    }
}

function loaduserInfo(userInfoD) {
    var userAvatar = document.querySelector("#userAvatar");
    userAvatar.setAttribute("src",userInfoD.avatar)
}


function submitMember() {
  var xhr = new XMLHttpRequest()
  xhr.open("POST","/sales/user/upgrademember",true)
  xhr.send();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var userInfoD = eval('(' + xhr.responseText + ');')
          console.log(userInfoD)
          _e["msgBox"]({
              msg: userInfoD.msg,
              className: userInfoD.res == -1 ? "error" : "success",
              timeout: 3000
          })
          if(userInfoD.res != -1){
            setTimeout(function(){
                self.location.reload()
            },3000)
          }
      }
  }
}
