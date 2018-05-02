/*
功能页面加载
*/
var subpageAnchors = document.querySelectorAll(".anchorPage")
for (var i = 0; i < subpageAnchors.length; i++) {
    subpageAnchors[i].onclick = function() {
        document.querySelector("title").innerHTML=this.innerText
        gotoPage(this.id)
    }
}

function gotoPage(page) {
    var frm = document.getElementById("frm")
    frm.src = page + ".html"
}

var fd = new FormData(), xhr = new XMLHttpRequest()

xhr.open("POST", "/staff/getstaffinfo",true)
xhr.onreadystatechange = function(){
    if (xhr.readyState==4 && xhr.status==200){
        var da = eval('(' +xhr.responseText+ ');')
        if(da.res==-1) {
           alert(da.msg)
            return
        }
        document.querySelector("#staff_id").innerHTML=da.staff[1]
        document.querySelector("#staff_dept").innerHTML=da.dept[1]
        var alldept_obj=[]
        for (var i=0;i<da.alldept.length;i++){
            alldept_obj.push({
                id:da.alldept[i][0],
                name:da.alldept[i][1]
            })
        }
        console.log(da)
        localStorage.setItem("alldept",JSON.stringify(alldept_obj));
        localStorage.setItem("show_dept",da.alldept[0][0]);
       // for (var i=0;i<da.alldept.length;i++){
       //    var option=document.createElement("option")
       //    option.setAttribute("value",da.alldept[i][0])
       //    option.innerHTML=da.alldept[i][1]
       //    document.querySelector("#current_dept").appendChild(option)
       //}
       // change_show_dept(document.querySelector("#current_dept").children[0])
    }
}
xhr.send()

function change_show_dept(option){
    localStorage.setItem("show_dept",option.value);
}