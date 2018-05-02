/**
 * Created by newfan on 2016/8/22  20:12.
 */
 window.onload = function() {
       couponsRedirect()
 }
 function couponsRedirect(){
   var xhr = new XMLHttpRequest()
   xhr.open("POST","/wx/couponsRedirect",true)
   xhr.onreadystatechange = function(){
       if(xhr.readyState == 4 && xhr.status == 200){
        //  return
       }
   }
    xhr.send()
 }
var xhr = new XMLHttpRequest()
xhr.open("POST","/coupon/get",true)
xhr.send()
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        var couponJson = eval('('+xhr.responseText+');')
       console.log(couponJson)
        loadCoupon(couponJson)
    }
}


function loadCoupon(couponJson) {
    for(var i=0;i<couponJson.coupon.length;i++){
        var ticketList=document.querySelector(".ticketList")
        var stamp=''
        if(0<(couponJson.coupon[i].pv/100)&&(couponJson.coupon[i].pv/100)<=10){
             stamp='stampA'
        }
        if(10<(couponJson.coupon[i].pv/100)&&(couponJson.coupon[i].pv/100)<100){
             stamp="stampB"
        }
        if((couponJson.coupon[i].pv/100)>=100){
              stamp='stampC'
        }
        if(couponJson.coupon[i].flag ==1){
            if(couponJson.coupon[i].leavings>0){
                var couponHtml='<div class="ticket '+stamp+'"> <p class="ac"> <button data-id="'+couponJson.coupon[i].id+'" class="btn"><i class="icon iconfont icon-checkcircle"></i>领取</button> ' +
                    '</p> <div> <ul class="flex"> <h1 class="flex-1">'+couponJson.coupon[i].name+'</h1><h1 class="flex-1" style="font-size: 12px;text-align:right"></h1> <h2>有效期</h2> </ul> <li class="flex">' +
                    ' <h3 class="flex-1">¥ '+couponJson.coupon[i].pv/100+'<span>'+couponJson.coupon[i].intro+'</span></h3> <h4>' +
                    '<span style="color: #FFFFFF">剩余 '+couponJson.coupon[i].leavings+' 张</span><span>'+couponJson.coupon[i].valid+'</span><span>- '+couponJson.coupon[i].expired+'</span></h4> ' +
                    '</li> </div> </div>'
                ticketList.innerHTML+=couponHtml
            }else {
              console.log("ss");
                var couponHtml='<div class="ticket '+stamp+'"> <p > <button>已领完</button> ' +
                    '</p> <div> <ul class="flex"> <h1 class="flex-1">'+couponJson.coupon[i].name+'</h1><h1 class="flex-1" style="font-size: 12px;text-align:right">(已领完)</h1> <h2>有效期</h2> </ul> <li class="flex">' +
                    ' <h3 class="flex-1">¥ '+couponJson.coupon[i].pv/100+'<span>'+couponJson.coupon[i].intro+'</span></h3> <h4>' +
                    '<span style="color: #FFFFFF">剩余 '+couponJson.coupon[i].leavings+' 张</span><span>'+couponJson.coupon[i].valid+'</span><span>- '+couponJson.coupon[i].expired+'</span></h4> ' +
                    '</li> </div> </div>'
                ticketList.innerHTML+=couponHtml
            }
        }else{
            var couponHtml='<div class="ticket '+stamp+'"> <p class="ticketAnimation"> <button>已领取</button> ' +
                '</p> <div> <ul class="flex"> <h1 class="flex-1">'+couponJson.coupon[i].name+'</h1><h1 class="flex-1" style="font-size: 12px;text-align:right">(已领取)</h1> <h2>有效期</h2> </ul> <li class="flex">' +
                ' <h3 class="flex-1">¥ '+couponJson.coupon[i].pv/100+'<span>'+couponJson.coupon[i].intro+'</span></h3> <h4>' +
                '<span style="color: #FFFFFF">剩余 '+couponJson.coupon[i].leavings+' 张</span><span>'+couponJson.coupon[i].valid+'</span><span>- '+couponJson.coupon[i].expired+'</span></h4> ' +
                '</li> </div> </div>'
            ticketList.innerHTML+=couponHtml
        }
    }
    _e.bindAll(".btn","click",achieveCoupon)
}


function achieveCoupon() {
    var dom=this
    var fd = new FormData(),xhr = new XMLHttpRequest()
    fd.append("couponid",Number(this.getAttribute("data-id")))
    xhr.open("POST","/coupon/userachievecoupons",true)
    xhr.send(fd)
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var r = eval('('+xhr.responseText+');')
            if(r.res==1){
                dom.innerHTML='成功领取'
                dom.parentNode.className='ticketAnimation'
              //  console.log(dom.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[2])
                dom.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[2].innerHTML='(已领取)'
            }else{
                _e.msgBox({
                    msg: "已领完！",
                    timeout: 500,
                    className: "error"
                })
            }
        }
    }
}
