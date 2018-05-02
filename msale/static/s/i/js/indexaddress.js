/**
 * Created by bobodaren007 on 2016/7/25 0025.
 */

// var subJson={}
window.onload = function() {
    document.querySelector(".searchInput").focus();
}

function subName() {
    console.log(document.querySelector(".searchInput").value == "")
    var fd = new FormData(), xhr = new XMLHttpRequest()
    fd.append("subname", document.querySelector(".searchInput").value)

    xhr.open("POST", "/adress/getsubdistrictbyname", true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            subJson = eval('(' + xhr.responseText + ');')
            console.log(subJson)
            loadAdd(subJson)
            document.querySelector(".scrollable").removeChild(document.querySelector(".loading"))

        }
    }
}
var fd = new FormData(),
    xhr = new XMLHttpRequest()
fd.append("subname", document.querySelector(".searchInput").value)

xhr.open("POST", "/adress/getsubdistrictbyname", true)
xhr.send(fd)
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        subJson = eval('(' + xhr.responseText + ');')
        console.log(subJson)
        loadAdd(subJson)
        document.querySelector(".scrollable").removeChild(document.querySelector(".loading"))

    }
}


function loadAdd(subJson) {
    document.querySelector(".addList").innerHTML = ''
    for (var i = 0; i < subJson.sub.length; i++) {
        if (subJson.sub[i].flag == 1) {
            var iHtml = '<i data-oldid="'+subJson.sub[i].olddept+'" data-id="' + subJson.sub[i].deptid + '" class="icon iconfont icon-checkcircle"></i>'
        } else {
            var iHtml = '<i data-oldid="'+subJson.sub[i].olddept+'" data-id="' + subJson.sub[i].deptid + '" class="icon iconfont icon-circleo"></i>'
        }
        var loadSub = '<div class="flex" data-oldid="'+subJson.sub[i].olddept+'" data-deptid="' + subJson.sub[i].deptid + '" id="' + subJson.sub[i].subid + '" onclick="subClick(this,subJson);"> <li class="flex-1"> <span>' + subJson.sub[i].subdistrict + '</span> <h2>' + subJson.sub[i].district + '</h2> ' +
            '</li> <ul class="hover">' + iHtml + '</ul> </div>'
        document.querySelector(".addList").innerHTML += loadSub
    }
}

function subClick(e, subJson) {
  console.log(e.getAttribute("data-oldid"))
  console.log(e.getAttribute("data-deptid"))


        if (e.getAttribute("data-oldid")==e.getAttribute("data-deptid")) {
            subFd(e)
        } else {
            if (JSON.parse(localStorage.getItem('localStorageGoods')) != null) {
                if (JSON.parse(localStorage.getItem('localStorageGoods')).length != 0) {
                    var r = confirm("切换区域，将会清空您的购物车，还继续吗？");
                    if (r == true) {
                        subFd(e)
                        var localStorageGoods = new Array()
                        localStorage.setItem('localStorageGoods', JSON.stringify(localStorageGoods))
                    } else {
                        return
                    }
                } else {
                    subFd(e)
                }
            } else {
                subFd(e)

            }

        }

}

function subFd(e) {
    if (e.querySelector("i").className == "icon iconfont icon-circleo") {
        for (var k = 0; k < document.querySelectorAll(".icon-checkcircle").length; k++) {
            document.querySelectorAll(".icon-checkcircle")[k].className = "icon iconfont icon-circleo"
        }
        e.querySelector("i").className = "icon iconfont icon-checkcircle"
    }
    var fd = new FormData(),
        xhr = new XMLHttpRequest()

    fd.append("subid", e.id)
    console.log(e.id)
    xhr.open("POST", "/adress/setusersubdistrict", true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var d = eval('(' + xhr.responseText + ');')
            if (d.res == 1) {
                window.location.href = "index.html"
            }
        }
    }
}
