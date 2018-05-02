/**
 * Created by bobodaren007 on 2016/9/21 0013.
 */

 function getUrlParam(name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if (r != null)
         return unescape(r[2]);
     return null;
 }


 var groupComId=getUrlParam("comid")
 var groupId=getUrlParam("aId")
 var number=getUrlParam("n")
 var addid = getUrlParam("id")

 var mgender = 0
 if (addid != null) {
     var fd = new FormData(),
         xhr = new XMLHttpRequest()
     fd.append("adress", Number(addid))
     xhr.open("POST", "/adress/getalertadress", true)
     xhr.send(fd)
     xhr.onreadystatechange = function() {
         if (xhr.readyState == 4 && xhr.status == 200) {
             var subJson = eval('(' + xhr.responseText + ');')
             loadAdd(subJson)
             console.log(subJson)
         }
     }
 } else {
     var subidid = 0
     if (JSON.parse(localStorage.getItem("subInfo")) != null) {
         document.querySelector("#subs").innerHTML = JSON.parse(localStorage.getItem("subInfo")).district + '-' + JSON.parse(localStorage.getItem("subInfo")).subdistrict
         subidid = JSON.parse(localStorage.getItem("subInfo")).subid
         localStorage.removeItem("subInfo")
     }
     _e.bindAll(".choiceadd", "click", choiceAdd)

     function choiceAdd() {
         var newAdd = [{
             "name": document.querySelector("#name").value,
             "gender": mgender,
             "phone": document.querySelector("#phone").value,
             "room": document.querySelector("#textareaHeightAuto").value
         }]
         localStorage.setItem("a", JSON.stringify(newAdd));
     }

     if (JSON.parse(localStorage.getItem("a")) != null) {
         if (JSON.parse(localStorage.getItem("a")).name != "") {
             document.querySelector("#name").value = JSON.parse(localStorage.getItem("a"))[0].name
         }
         if (JSON.parse(localStorage.getItem("a"))[0].phone != "") {
             document.querySelector("#phone").value = JSON.parse(localStorage.getItem("a"))[0].phone
         }
         mgender = JSON.parse(localStorage.getItem("a")).gender
         if (JSON.parse(localStorage.getItem("a"))[0].gender == 1) {
             document.querySelector("#man i").setAttribute("class", "icon iconfont icon-checkcircle")
         }
         if (JSON.parse(localStorage.getItem("a"))[0].gender == 2) {
             document.querySelector("#woman i").setAttribute("class", "icon iconfont icon-checkcircle")
         }
         if (JSON.parse(localStorage.getItem("a"))[0].room != "") {
             document.querySelector("#textareaHeightAuto").value = JSON.parse(localStorage.getItem("a"))[0].room
         }
     }

     _e.bindAll("#butn", "click", submitSub)

     function submitSub() {
         var fsdd = new FormData(),
             xhr = new XMLHttpRequest()
         if (subidid == 0 || document.querySelector("#name").value == "" || document.querySelector("#textareaHeightAuto").value == "" || document.querySelector("#phone").value == "" || document.querySelector(".icon-checkcircle") == null) {
             _e.msgBox({
                 msg: "请填写完整！",
                 timeout: 2000,
                 className: "info"
             })
             return
         } else {

             fsdd.append("title", document.querySelector("#name").value)
             fsdd.append("room", document.querySelector("#textareaHeightAuto").value)
             fsdd.append("phone", document.querySelector("#phone").value)
             fsdd.append("subd_id", subidid)
             fsdd.append("gender", document.querySelector(".icon-checkcircle").getAttribute("genderid"))
         }

         xhr.open("POST", "/adress/setadress", true)
         xhr.send(fsdd)
         xhr.onreadystatechange = function() {
             if (xhr.readyState == 4 && xhr.status == 200) {
                 ssJson = eval('(' + xhr.responseText + ');')
                 if (ssJson.res == 1) {
                     _e.msgBox({
                         msg: "提交很成功！",
                         timeout: 3000,
                         className: "success"
                     })
                     localStorage.removeItem("a")
                     window.location.href="groupAddresseDit.html?comid="+groupComId+"&aId="+groupId+"&n="+number
                     return
                 }
             }
         }
     }
 }


 function loadAdd(subJson) {
     var subid = 0
     document.querySelector("#name").value = subJson.address[0].name
     document.querySelector("#phone").value = subJson.address[0].phone
     mgender = subJson.address[0].gender
     if (subJson.address[0].gender == 1) {
         document.querySelector("#man i").setAttribute("class", "icon iconfont icon-checkcircle")
     } else {
         document.querySelector("#woman i").setAttribute("class", "icon iconfont icon-checkcircle")
     }
     if (JSON.parse(localStorage.getItem("subInfo")) == null) {
         document.querySelector("#subs").innerHTML = subJson.address[0].subdistrict
         subid = subJson.address[0].subid
     } else {
         document.querySelector("#subs").innerHTML = JSON.parse(localStorage.getItem("subInfo")).district + '-' + JSON.parse(localStorage.getItem("subInfo")).subdistrict
         subid = JSON.parse(localStorage.getItem("subInfo")).subid
         localStorage.removeItem("subInfo")
     }
     document.querySelector("#textareaHeightAuto").innerHTML = subJson.address[0].room
     _e.bindAll("#butn", "click", submitSub)

     function submitSub() {
         var fsd = new FormData(),
             xhr = new XMLHttpRequest()
         if (subidid == 0 || document.querySelector("#name").value == "" || document.querySelector("#textareaHeightAuto").value == "" || document.querySelector("#phone").value == "" || document.querySelector(".icon-checkcircle") == null) {
             _e.msgBox({
                 msg: "请填写完整！",
                 timeout: 3000,
                 className: "info"
             })
             return
         } else {
             fsd.append("userid", subJson.address[0].userid)
             fsd.append("title", document.querySelector("#name").value)
             fsd.append("room", document.querySelector("#textareaHeightAuto").value)
             fsd.append("phone", document.querySelector("#phone").value)
             fsd.append("subd_id", subid)
             fsd.append("gender", document.querySelector(".icon-checkcircle").getAttribute("genderid"))
             fsd.append("id", subJson.address[0].id)
         }
         xhr.open("POST", "/adress/setadress", true)
         xhr.send(fsd)
         xhr.onreadystatechange = function() {
             if (xhr.readyState == 4 && xhr.status == 200) {
                 sJson = eval('(' + xhr.responseText + ');')
                 console.log("bobo")
                 if (sJson.res == 1) {
                     _e.msgBox({
                         msg: "提交很成功！",
                         timeout: 2000,
                         className: "success"
                     })
                     window.location.href="groupAddresseDit.html?comid="+groupComId+"&aId="+groupId+"&n="+number
                     return
                 }
             }
         }

     }
 }

 _e.bindAll(".hover", "click", changeGender)

 function changeGender() {
     if (document.querySelector(".icon-checkcircle") == null) {
         this.childNodes[0].className = "icon iconfont icon-checkcircle"
     } else {
         document.querySelector(".icon-checkcircle").className = "icon iconfont icon-circleo"
         this.childNodes[0].className = "icon iconfont icon-checkcircle"
     }
     if (document.querySelector(".icon-checkcircle").parentNode.id == "man") {
         mgender = 1
     } else {
         mgender = 2
     }
     console.log(document.querySelector(".icon-checkcircle").parentNode.id)
     console.log(mgender)

 }

 _e.bindAll(".choiceadd", "click", choiceAdd)
