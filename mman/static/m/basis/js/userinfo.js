
loadtbl()
t.funcs.loadData.call(t)
function loadtbl(){
    coldefs = [{ seq:0,//在数据[[],[]]中的位置rows[i][seq] 返回值
        render:function(v){ return v},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
        sortable:true, // 可排序 function
        retrievable: false, // 可检索 function
        title:"id", // 列标题
        visible:true, //是否可见
        checkall:false,// 是否可全选
        isID:1,
        name:"id",//和后端对应，FormData里面的key，后端解析时要一致
        type:-1,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
        data:[]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列

    },
        { seq:1,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){return "<b>"+item+"</b>"},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            sortable:true, // 可排序 function
            retrievable: true, // 可检索 function
            title:"姓名", // 列标题
            visible:true, //是否可见
            name:"name",//和后端对应，FormData里面的key，后端解析时要一致
            type:0,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
            data:[]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列
        },
        { seq:2,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){return "<img src=' http://od35wia0b.bkt.clouddn.com/"+item+"?imageMogr2/thumbnail/20x20!' />"},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            title:"用户头像", // 列标题
            visible:false, //是否可见
            name:"avatar",//和后端对应，FormData里面的key，后端解析时要一致
            type:0,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
            data:[]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列
        },
        { seq:3,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){
                if(item==1) return "<b>男</b>"
                return "<b>女</b>"
            },// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            sortable:true, // 可排序 function
            retrievable: true, // 可检索 function
            title:"性别", // 列标题
            visible:true, //是否可见
            name:"gender",//和后端对应，FormData里面的key，后端解析时要一致
            type:1,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
            data:[[1,"男"],[2,"女"]]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列
        },
        { seq:4,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){return "<b>"+item+"</b>"},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            sortable:true, // 可排序 function
            retrievable: false, // 可检索 function
            title:"创建时间", // 列标题
            visible:false, //是否可见
            name:"created",//和后端对应，FormData里面的key，后端解析时要一致
            type:2,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
            data:[]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列
        },
        { seq:5,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){return "<b>"+item+"</b>"},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            sortable:true, // 可排序 function
            retrievable: true, // 可检索 function
            title:"邮箱", // 列标题
            visible:true, //是否可见
            name:"email",//和后端对应，FormData里面的key，后端解析时要一致
            type:0,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
            data:[]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列
        },
        { seq:6,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){return "<b>"+item+"</b>"},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            sortable:true, // 可排序 function
            retrievable: true, // 可检索 function
            title:"联系方式", // 列标题
            visible:true, //是否可见
            name:"phone",//和后端对应，FormData里面的key，后端解析时要一致
            type:0,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
            data:[]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列
        },
        { seq:7,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){return "<b>"+item+"</b>"},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            sortable:false, // 可排序 function
            retrievable: false, // 可检索 function
            title:"密码", // 列标题
            visible:false, //是否可见
            name:"pwd",//和后端对应，FormData里面的key，后端解析时要一致
            type:2,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
            data:[]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列
        },
        { seq:8,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){return "<b>"+item+"</b>"},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            sortable:false, // 可排序 function
            retrievable: false, // 可检索 function
            title:"街道", // 列标题
            visible:true, //是否可见
            name:"subdistrict",//和后端对应，FormData里面的key，后端解析时要一致
            type:-1,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
            data:[]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列
        },
        { seq:9,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){return "<b>"+(item/100).toFixed(2)+"</b>"},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            sortable:false, // 可排序 function
            retrievable: false, // 可检索 function
            title:"账户余额", // 列标题
            visible:true, //是否可见
            name:"balance",//和后端对应，FormData里面的key，后端解析时要一致
            type:-1,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
            data:[]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列
        },
        { seq:10,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){return "<b>"+item+"</b>"},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            sortable:false, // 可排序 function
            retrievable: false, // 可检索 function
            title:"账户积分", // 列标题
            visible:true, //是否可见
            name:"scores",//和后端对应，FormData里面的key，后端解析时要一致
            type:-1,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
            data:[]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列
        },
        { seq:11,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){return "<b>"+item+"</b>"},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            sortable:false, // 可排序 function
            retrievable: false, // 可检索 function
            title:"微信openid", // 列标题
            visible:false, //是否可见
            name:"openid",//和后端对应，FormData里面的key，后端解析时要一致
            type:-1,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
            data:[]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列
        },
        { seq:12,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){return "<b>"+item+"</b>"},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            sortable:false, // 可排序 function
            retrievable: false, // 可检索 function
            title:"来源", // 列标题
            visible:true, //是否可见
            name:"source",//和后端对应，FormData里面的key，后端解析时要一致
            type:-1,//-1:不可见 0:input 1:select 2:不可修改 3:radio 4:checkbox  目前只实现-1,0,1三种方式
            data:[]//为select时，这里为需要传入的数据,others里面  如商品，这里应该为商品种类对应的id和name   参考下面种类列
        },
        { seq:13,//在数据[[],[]]中的位置rows[i][seq] 返回值
            render:function(item){return "<b>"+item+"</b>"},// 这里render是function，它可以组合或变换当前数据行，然后进行显示
            title:"会员", // 列标题
            visible:true, //是否可见
        }

    ]

    t = new _e["table"]()
    row_actions =[{cls:"doerow",func:function(tbl,rows){
        if (document.querySelector("#dlgData")) document.querySelector("#dlgData").parentNode.removeChild(document.querySelector("#dlgData"));
        var dlg = _e.dialog({id:"dlgData",width:"500px",
            title:"其他信息",
            mainBody:"创建时间：<i>"+tbl.data[rows][4]+"</i><br>"+
            "密码：<i>"+tbl.data[rows][7]+"</i><br>"+
            "账户余额：<i>"+tbl.data[rows][9]+"</i><br>"+
            "<img src=' http://od35wia0b.bkt.clouddn.com/"+tbl.data[rows][2]+"' />"    ,
            actions:[{id:"btn",title:"确定",func:function(){
                dlg.parentNode.removeChild(dlg)
            }}]})
        dlg.show()

    },title:"其他信息"},
    {cls:"doerow",func:function(tbl,rows){
      if (document.querySelector("#dlgData")) document.querySelector("#dlgData").parentNode.removeChild(document.querySelector("#dlgData"));
      var dlg = _e.dialog({id:"dlgData",width:"500px",
          title:"会员信息",
          mainBody:'<form class="pure-form pure-form-aligned">'+
                '<fieldset>'+
                    '<div class="pure-control-group">'+
                        '<label for="foo">积分</label>'+
                        '<input id="scores" type="text" class="pure-input-1-2" />'+
                    '</div>'+
                    '<div class="pure-control-group">'+
                        '<label for="foo">会员级别</label>'+
                        '<select id="member_type" class="pure-input-1-2">'+
                        '</select>'+
                    '</div>'+
                '</fieldset>'+
            '</form>'  ,
          actions:[{id:"btn",title:"更改",func:function(){
              var scores = Number(dlg.querySelector("#scores").value)
              var member_type = dlg.querySelector("#member_type").value
              if (isNaN(scores) || scores < 0){
                _e.msgBox({msg:"积分必须为大于等于0的数字"})
                return
              }
              var fd = new FormData(), xhr = new XMLHttpRequest()
              fd.append("user",tbl.data[rows][0])
              fd.append("scores",scores)
              fd.append("member_type",member_type)
              xhr.open("POST" ,"/basis/userinfo/updateMeberType", true)
              xhr.send(fd)
              xhr.onreadystatechange=function(){
                  if (xhr.readyState==4 && xhr.status==200){
                      var d = eval('('+xhr.responseText+');')
                      _e["msgBox"]({
                          msg: d.msg,
                          className: d.res==-1 ? "error":"success",
                      })
                      if(d.res == 0) {
                        dlg.parentNode.removeChild(dlg)
                        t.funcs.loadData.call(t)
                      }

                  }
              }
          }},{id:"btn",title:"关闭",func:function(){
              dlg.parentNode.removeChild(dlg)
          }}]})
      dlg.querySelector("#scores").value = tbl.data[rows][10]
      var fd = new FormData(), xhr = new XMLHttpRequest()
      xhr.open("POST" ,"/basis/member/get", true)
      xhr.send(fd)
      xhr.onreadystatechange=function(){
          if (xhr.readyState==4 && xhr.status==200){
              var d = eval('('+xhr.responseText+');')
              if(d.member.length<1){
                _e.msgBox({msg:"操作失败，请重试！"})
                return
              }
              var member_select = dlg.querySelector("#member_type")
              for(var i=0;i<d.member.length;i++){
                var option = document.createElement("option")
                option.value = d.member[i][0]
                option.innerHTML = d.member[i][1]
                member_select.appendChild(option)
                if(d.member[i][1] == tbl.data[rows][13]) option.selected = true;
              }
              dlg.show()
          }
      }
    },title:"会员管理"}
     ]
    rows_actions = []

    ext_row = function(rows,i){
        return "this is row "+i
    }
    t.funcs.init.call(t,"tbl",
        coldefs,row_actions,rows_actions,"table","__THE__TABLE__",ext_row,"/basis/userinfo/get"+_e["jurisdiction"]())
    var tbl_head = document.querySelector("#tbl").querySelector("thead")
    tbl_head.querySelector("#trtime").parentNode.removeChild( tbl_head.querySelector("#trtime"))
    tbl_head.querySelector("#trunit").parentNode.removeChild( tbl_head.querySelector("#trunit"))
    tbl_head.querySelector("#trdept").parentNode.removeChild( tbl_head.querySelector("#trdept"))
}
