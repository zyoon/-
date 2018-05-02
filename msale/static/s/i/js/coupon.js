/**
 * Created by bobodaren007 on 2016/7/30 0030.
 */
var xhr = new XMLHttpRequest()
xhr.open("POST", "/sales/getusercoupon", true)
xhr.send()
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
        var d = eval('(' + xhr.responseText + ');')
        console.log(d)
        if(d.coupon.length == 0) { //没有优惠券
            _e["msgBox"]({
                msg: "没有优惠券!",
                timeout: 2000,
                className: "info "
            })
            return
        } else { //存在优惠券
            loadCoupon(d)
        }

    }
}

function loadCoupon(couponJson) {
    var arr=new Array()
    arr=couponJson.coupon.sort(function(a,b){return a.pv-b.pv})
    console.log(arr)
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
        if(couponJson.coupon[i].status==1){
                var couponHtml='<div class="ticket '+stamp+'"> '+
                    '<div> <ul class="flex"> <h1 class="flex-1">'+couponJson.coupon[i].name+'</h1> <h2>有效期</h2> </ul> <li class="flex">' +
                    ' <h3 class="flex-1" style="margin: 0">¥ '+couponJson.coupon[i].pv/100+'<span style="margin: 0">'+couponJson.coupon[i].intro+'</span></h3> <h4 style="margin: 25px 0 0 0;">' +
                    '<span>'+couponJson.coupon[i].valid+'</span><span>- '+couponJson.coupon[i].expired+'</span></h4> ' +
                    '</li> </div> </div>'
                ticketList.innerHTML+=couponHtml
            }
       if(couponJson.coupon[i].status==2){
           var couponHtml='<div class="ticket '+stamp+'"> '+
               '<div> <ul class="flex"> <h1 class="flex-1">'+couponJson.coupon[i].name+'</h1>  </ul> <li class="flex">' +
               ' <h3 class="flex-1" style="margin: 0">¥ '+couponJson.coupon[i].pv/100+'<span style="margin: 0">'+couponJson.coupon[i].intro+'</span></h3> <h5 style="background-color: #17D7B0;"><span >已经使用</span></h5> ' +
               '</li> </div> </div>'
           ticketList.innerHTML+=couponHtml
        }
        if(couponJson.coupon[i].status==3){
            var couponHtml='<div class="ticket '+stamp+'"> '+
                '<div> <ul class="flex"> <h1 class="flex-1">'+couponJson.coupon[i].name+'</h1> </ul> <li class="flex">' +
                ' <h3 class="flex-1" style="margin: 0">¥ '+couponJson.coupon[i].pv/100+'<span style="margin: 0">'+couponJson.coupon[i].intro+'</span></h3> <h5><span>已过期</span></h5> ' +
                '</li> </div> </div>'
            ticketList.innerHTML+=couponHtml
        }
    }
}
