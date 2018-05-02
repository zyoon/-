/**
 * Created by bobodaren007 on 2016/7/25 0025.
 */

window.onload = function()
{
    document.querySelector(".searchInput").focus();
}
function subName() {
    fd = new FormData(),xhr = new XMLHttpRequest()
    fd.append("subname",document.querySelector(".searchInput").value)
    xhr.open("POST","/adress/getdeptsubdistrict",true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            subJson = eval('(' + xhr.responseText + ');')
            console.log(subJson)
            loadAdd(subJson)
        }
    }
}

var fd = new FormData(),xhr = new XMLHttpRequest()
fd.append("subname","")
xhr.open("POST","/adress/getdeptsubdistrict",true)
xhr.send(fd)
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        subJson = eval('(' + xhr.responseText + ');')
        console.log(subJson)
        loadAdd(subJson)
    }
}

function loadAdd(subJson) {
    document.querySelector(".addList").innerHTML=''
    for(var  i=0;i<subJson.sub.length;i++) {
        var loadSub = '<div class="flex" id="' + subJson.sub[i].subid + '" onclick="subClick(this,subJson);"> <li class="flex-1"> <span>' + subJson.sub[i].subdistrict + '</span> <h2>' + subJson.sub[i].district + '</h2> ' +
            '</li> <ul class="hover"><i class="icon iconfont icon-circleo"></i></ul> </div>'
        document.querySelector(".addList").innerHTML += loadSub
    }
}

function subClick(e,subJson) {
    console.log(subJson)
    if(e.querySelector("i").className=="icon iconfont icon-circleo"){
        for (var k=0;k<document.querySelectorAll(".icon-checkcircle").length;k++){
            document.querySelectorAll(".icon-checkcircle")[k].className="icon iconfont icon-circleo"
        }
        e.querySelector("i").className="icon iconfont icon-checkcircle"
    }
    for(var j=0;j<subJson.sub.length;j++){
        if(e.id==subJson.sub[j].subid){
            localStorage.setItem('subInfo', JSON.stringify(subJson.sub[j]));
            console.log(JSON.parse(localStorage.getItem("subInfo")))
            // window.location.href="addressedit.html"
            window.history.go(-1)
        }
    }
}
