
if(typeof(_e) == "undefined") {
_e = {}
}

/*e
event handle
_e.bind("#a","click",function(){alert(this.id)})
d = document.querySelector("#d")
_e.bindAll(".b","click",function(){alert("ok")},d)
*/
_e["uniqueID"] = function(){
  if(!window["_EM_UNIQUE_ID"]) {
    window["_EM_UNIQUE_ID"] = 1
  }else{
    window["_EM_UNIQUE_ID"] ++

  }
  return "_em_unque_id" + window["_EM_UNIQUE_ID"]
}

_e["bind"] = function(selectors,ev,func,dom,flag){
  var el
  if(arguments.length==3){
    el = document.querySelector(selectors)

  }
  if(arguments.length>3){
    el = dom.querySelector(selectors)

  }
  var b = false
  if(arguments.length==5){
    b = flag
  }
  if(el) el.addEventListener(ev,func,b)



}

_e["bindAll"] = function(selectors,ev,func,dom,flag){
  var els
  if(arguments.length==3){
    els = document.querySelectorAll(selectors)

  }
  if(arguments.length>3){
    els = dom.querySelectorAll(selectors)

  }
  var b = false
  if(arguments.length==5){
    b = flag
  }

  if(els) {
    for(var i=0; i<els.length;i++)
    els[i].addEventListener(ev,func,b)
  }

}

_e["stripscript"] = function(s) {  //去除其他符号
  switch (typeof s){
    case "number":
        return s;
        break;
    case "string":
      var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")    //创建正则表达式
      var rs = "";
      for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
      }
      return rs;
      break;
    default :
          alert("_e[stripscript] 传入类型错误" )
  }

}

_e["getQueryString"] = function(name) {   //获取url 上的参数 传入参数名
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //这个正则是寻找&+url参数名字=值+&
                                                                  //&可以不存在。
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;//encodeURI  这里是开始匹配，找到了返回对应url值，没找到返回null。
}

_e["jurisdiction"] = function(flg) {  //获取当前操作的部门
  if(arguments.length<1)
    return "?cdept="+localStorage.getItem("show_dept");
  else{
    return "&cdept="+localStorage.getItem("show_dept");
  }
}

_e["addDate"] = function(date,days){  // 对日期进行加减  日期：2016/8/4  天数：1
  var d=new Date(date);
  d.setDate(d.getDate()+days);
  var month=d.getMonth()+1;
  var day = d.getDate();
  var val = d.getFullYear()+"/"+month+"/"+day;
  return val;
}

_e["dateToInt"] = function(date){  // 对日期进行加减  日期：2016/8/4  天数：1
  return Date.parse(date) / 1000;
}

_e["unit"]=[]
_e["unit"][1]="拆分单位"
_e["unit"][2]="重量单位"
_e["unit"][3]="采购单位"
_e["unit"][4]="最小单位"