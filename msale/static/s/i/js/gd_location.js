function get_config(){
  var url = window.location.href.split("#")[0]
  var xml = new XMLHttpRequest()
  xml.open("POST","http://www.newfan.net.cn/wx/get_jssdk",true)
  xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xml.send("url="+url)
  xml.onreadystatechange = function () {
      if (xml.readyState == 4 && xml.status == 200) {
      var responseText = xml.responseText;
      var responseTextJson = JSON.parse(responseText)
      wx.config({
          debug:false,
          appId: "wx15c6a124160fb8fb",
          timestamp: responseTextJson.timestamp,
          nonceStr: responseTextJson.nonce,
          signature:responseTextJson.signature,
          jsApiList: [
                'getLocation'

          ]
      })
  }
}
}
 wx.ready(function () {
   wx.getLocation({
   type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
           getlocation(res)
      }

 });
 })
wx.error(function (res) {
  alert(res.errMsg);
})
document.querySelector('#getLocation_1').onclick=function(){
  get_config()
}

function getlocation(res){
    var    latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
  var   longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
  document.querySelector('#address_2').onclick=function(){
     location.href='moreAddress.html'
  }
  localStorage.setItem("latitude",latitude)
  localStorage.setItem("longitude",longitude)
  var xhr = new XMLHttpRequest()
  xhr.open("GET","http://restapi.amap.com/v3/geocode/regeo?output=json&location="+longitude+","+latitude+"&key=b00a329396acb15573769c77b54f2b87&extensions=all",true)
  xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){
          var call_sth = eval('('+xhr.responseText+');')
          var regeocode=call_sth.regeocode
          var cu_addr=document.querySelector('#address_1')
          console.log(regeocode)

         var reg_info=regeocode.addressComponent
        //  console.log(s)
         if(reg_info.city){
           cu_addr.innerHTML=reg_info.city
         }else{
           cu_addr.innerHTML=reg_info.province
         }
        cu_addr.innerHTML+=reg_info.district+reg_info.streetNumber.street
          if(regeocode.aois.length>0){
            cu_addr.innerHTML+=regeocode.aois[0].name
          }else{
            cu_addr.innerHTML+=regeocode.pois[0].name
          }
          if (reg_info.neighborhood.name.length>1){
            cu_addr.innerHTML+=reg_info.neighborhood.name[0]
          }
      }
  }
  xhr.send()
}
