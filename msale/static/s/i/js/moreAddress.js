    (function(){
            var iframe = document.getElementById('test').contentWindow;
            document.getElementById('test').onload = function(){
                iframe.postMessage('hello','https://m.amap.com/picker/');
            };
            window.addEventListener("message", function(e){
                 alert('您选择了:' + e.data.name + ',' + e.data.location)
              //  console.log(e)
            }, false);
        }())

	var mock = {
		log: function(result) {
			window.parent.setIFrameResult('log', result);
		}
	}
	console = mock;
	window.Konsole = {
		exec: function(code) {
			code = code || '';
			try {
				var result = window.eval(code);
				window.parent.setIFrameResult('result', result);
			} catch (e) {
				window.parent.setIFrameResult('error', e);
			}
		}
	}
window.onload=function(){
  var longitude=getUrlParam("longitude")
  var latitude=getUrlParam("latitude")
   var iframed = document.getElementById('test')
  iframed.src='http://m.amap.com/picker/?center='+longitude+','+latitude+'&key=ea39e06aad936538b8ac81ab2ace8df4'
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

   //?radius=50000&key=ea39e06aad936538b8ac81ab2ace8df4
//  var idata = new Object()
//  idata.key = "ea39e06aad936538b8ac81ab2ace8df4";
//  idata.radius=50000
// var json1 = JSON.stringify(idata);
//   var iframe = document.getElementById('test').contentWindow;
//   setTimeout(function(){
//     iframe.postMessage(json1,'http://m.amap.com/picker/');
//   },500)
    // var iframe = document.getElementById('test').contentWindow;
    // setTimeout(function(){
    // iframe.postMessage('hello','http://m.amap.com/picker/');
    // },500)
    // var iframed = document.getElementById('test')
    // iframed.src='http://m.amap.com/picker/?radius=50000&key=ea39e06aad936538b8ac81ab2ace8df4'


//
