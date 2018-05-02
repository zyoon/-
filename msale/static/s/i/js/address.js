/**
 * Created by bobodaren007 on 2016/7/13 0013.
 */

var xhr = new XMLHttpRequest()
xhr.open("POST","/adress/getadress",true)
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        var addressJson = eval('('+xhr.responseText+');')
        loadAddress(addressJson)
    }
}
xhr.send()
function loadAddress(addressJson) {
    console.log(addressJson)
    if(addressJson.address.length==0){
        document.querySelector(".btn").style.display="block"
    }
    var addList = document.querySelector(".addList");
    for (var i = 0; i < addressJson.address.length; i++) {
        var url="location.href='addressedit.html?addressid="+addressJson.address[i].id+'&id='+addressJson.address[i].userid
        url+="'"
        var divFlex = document.createElement("div")
        divFlex.setAttribute("class", "flex")
        divFlex.innerHTML = '<ul class="hover hover'+addressJson.address[i].flag+'"><i id="change" class="icon iconfont icon-circleo" flag="'+addressJson.address[i].flag+'" ></i></ul>' +
            '<li class="flex-1" userid="'+addressJson.address[i].userid+'" id="'+addressJson.address[i].id+'" onclick="conversion(this);">' +
            '<h1><b>' + addressJson.address[i].name + '</b>' +
            '<span>' + addressJson.address[i].gender + '</span>' + addressJson.address[i].phone + '</h1><h2>' + addressJson.address[i].adress + '</h2></li>' +
            '<a onclick="'+url+'" style="text-decoration:none;color:gray;"><i class="icon iconfont icon-edit"></i></a>'
        addList.appendChild(divFlex)
        if(addressJson.address[i].flag==1){
            document.querySelector(".hover1").childNodes[0].className="icon iconfont icon-checkcircle"
        }
    }
}
//选择已经有的地址之后发送给后端
function conversion(e) {
    if(e.parentNode.children[0].firstChild.className=="icon iconfont icon-circleo"){
        for (var k=0;k<document.querySelectorAll(".icon-checkcircle").length;k++){
            document.querySelectorAll(".icon-checkcircle")[k].className="icon iconfont icon-circleo"
            console.log(document.querySelectorAll(".icon-circleo")[k])
        }
        e.parentNode.children[0].firstChild.className="icon iconfont icon-checkcircle"
    }
    fd = new FormData(),xhr = new XMLHttpRequest()
    fd.append("adress",e.id)
    // fd.append("id",e.getAttribute("userid"))
    xhr.open("POST","/adress/alertflag",true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var searchJson = eval('(' + xhr.responseText + ');')
            console.log(searchJson)
            if(searchJson.res==1){
                 window.history.go(-1)
                // window.location.href="/s/index.html"

            }
        }
    }



}
