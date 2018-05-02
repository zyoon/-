window.onload=function(){
  var  xhr = new XMLHttpRequest()
  xhr.open("GET", "/sales/order/passStaffGetOrder", true)
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var d = eval('(' + xhr.responseText + ');')
          if(d.res==1){
            var orderlist = document.querySelector(".orderList")
            var del_info=''
            for(var i=0;i<d.deliveryinfo.length;i++){
              if (d.deliveryinfo[i].status==2){
                var url = "'deliverydetail.html?ordercode="+d.deliveryinfo[i].ordercode+"'"
                  del_info+='<div class="flex" onclick="location.href='+url+';">'+
                    '<li class="flex-1" style="padding: 0 0 5px 0px;">'+
                    '<h1 style="white-space: pre-wrap;">订单编号：'+d.deliveryinfo[i].ordercode+'</h1>'+
                    '<h3>配送地址'+d.deliveryinfo[i].address+'</h3></li>'+
                    '<p class="bgc-FFC11E">未完成</p>'+
                   '</div>'

              }
              if (d.deliveryinfo[i].status==4){
                var url = "'deliverydetail.html?ordercode="+d.deliveryinfo[i].ordercode+"'"
                del_info+='<div class="flex" onclick="location.href='+url+';">'+
                    '<li class="flex-1" style="padding: 0 0 5px 0px;">'+
                    '<h1 style="white-space: pre-wrap;">订单编号：'+d.deliveryinfo[i].ordercode+'</h1>'+
                    '<h3>配送地址'+d.deliveryinfo[i].address+'</h3></li>'+
                    '<p class="bgc-17D7B0">已完成</p>'+
                   '</div>'
              }
            }
            orderlist.innerHTML=del_info
          }else{
            alert(d.msg)
          }
      }
  }
    xhr.send()
}
