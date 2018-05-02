/**
 * Created by bobodaren007 on 2016/8/10 0010.
 */
 localStorage.clear();
var fd = new FormData(),xhr = new XMLHttpRequest()
xhr.open("POST" ,"/sales/getuserphone" , true)
xhr.send(fd);
xhr.onreadystatechange=function(){
    if (xhr.readyState==4 && xhr.status==200){
        var d = eval('('+xhr.responseText+');')
        console.log(d)
        if(d.phone==""){
          var theme=document.querySelector(".theme");
          var oldTheme=document.querySelector(".oldTheme");
          var newTheme=document.querySelector(".newTheme")
          theme.innerHTML="绑定手机";
          oldTheme.style.display="none";
          newTheme.innerHTML="手机号";
        }else {
          var oldPhone=document.querySelector(".oldPhone");
          oldPhone.innerHTML=d.phone;
        }
    }
}
 function setPhone(){
    var  newPhone=document.querySelector(".newPhone").value;
    console.log(newPhone.length)
    if(newPhone.length==11){
        var fd = new FormData(),xhr = new XMLHttpRequest()
        xhr.open("POST" ,"/sales/setuserphone" , true)
        fd.append("uid",2);
        fd.append("phone",newPhone);
        xhr.send(fd);
        xhr.onreadystatechange=function(){
            if (xhr.readyState==4 && xhr.status==200){
                var d = eval('('+xhr.responseText+');')
                console.log(d)
                document.location.href='user.html';
            }
        }
    }else{
        _e["msgBox"]({
            msg: "手机号码应为11位",
            timeout: 2000,
            className: "error "
        })
    }

}
