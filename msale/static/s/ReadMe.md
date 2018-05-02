# 售卖端

## 售卖端整合
将大师兄发的文件mrten分为e、i、m、s四个文件夹。

	1.e内放测试的文件；
	2.i内放css、js文件；
	3.m内放管理端的html文件；
	4.s内放售卖端的html文件，暂时将一些所必需的img文件放在s文件夹下。
    

## 其他设置

代码可以自己随便改，但是基本的框架不要动，改了之后只发自己改动过的文件，不要一起发，容易覆盖，所改的代码必须有注释（修改或者新增的操作，修改的文件位置、代码位置）

----------
#  修改记录  #
## 售卖端去除JQ进展情况（组件） ##


-  去除user.html通知推送右侧JQ控制的开关按钮，改为js代码。

		document.querySelector(".toggleOff, .toggleOn").addEventListener("click",function(){
        if(this.getAttribute("class") == "toggleOff"){
            this.setAttribute("class","toggleOn")
        }else{
            this.setAttribute("class","toggleOff")
        	}
        return false
	    },true)

- 去除goodsdetail.html内底部菜单弹出的JQ代码，改为js代码。

		//点击之后改变弹窗的dispaly的属性
    	document.getElementsByClassName("closewin")[0].style.display="none"
    	document.getElementsByClassName("bottomWin")[0].style.display="none"
    	document.getElementsByClassName("openBuy")[0].onclick = function () {
    			document.getElementsByTagName("body")[0].style.overflow="hidden"
    			document.getElementsByClassName("closewin")[0].style.display="block"
    			document.getElementsByClassName("bottomWin")[0].style.display="block"
    	}
    	document.getElementsByClassName("closeBuy")[0].onclick = function () {
    			document.getElementsByTagName("body")[0].style.overflow=""
    			document.getElementsByClassName("closewin")[0].style.display="none"
    			document.getElementsByClassName("bottomWin")[0].style.display="none"
    	}

- 去除cart.html顶部菜单弹出的JQ代码，改为js代码。

		//点击之后改变弹窗的dispaly的属性
		document.querySelector(".openCartTips").addEventListener("click",function(){
			document.querySelector(".tipsWin").style.display = "block"
			document.querySelector(".closewin").style.display = "block"
			document.querySelector("body").style.overflow = "hidden"
		},true)
		document.querySelector(".closewin").addEventListener("click",function(){
			document.querySelector(".tipsWin").style.display = "none"
			document.querySelector(".closewin").style.display = "none"
			document.querySelector("body").style.overflow = "auto"
		},true)
- freebackdetail.html文件
			
		//除去文本域高度自适应jq，改为js（组件）
			var maxHeight=null
			var qrysTextareacClas=document.querySelector(".freebackReplyTextarea")
			var minHeight=qrysTextareacClas.offsetHeight//保存初始高度
			function HAuto(){
				var height,style=qrysTextareacClas.style
				qrysTextareacClas.style.height =minHeight + 'px'
				//console.log(qrysTextareacClas.scrollHeight)
				//判断现在的高度和初始的高度
				if (qrysTextareacClas.scrollHeight >minHeight) {
					if (qrysTextareacClas.maxHeight && qrysTextareacClas.scrollHeight > qrysTextareacClas.maxHeight) {
						height = qrysTextareacClas.maxHeight;
						style.overflowY = 'scroll'
						console.log(height+"a1")
					} else {
						height = qrysTextareacClas.scrollHeight;//获取最新高度
						style.overflowY = 'hidden'
						console.log(height+"aa2")
		
					}
					style.height = height  + 'px'
					console.log(height+"aaa3")
				}
			}
- goods.html文件
	
	融合手风琴的css模版(base.css)，去除jq的代码。（组件）

	      Demo:e/swiper.html（实例文件）
		  //重新实现菜单分类的上下swiper，
		  <script type="text/javascript">
                var parent = document.getElementById('container1');
                var child = document.getElementById('container2');
                child.style.right = child.clientWidth - child.offsetWidth + "px";//负数
               
          </script>
			 //网页可见区域宽： document.body.clientWidth;
             //网页正文全文宽： document.body.scrollWidth;
			 //控制div右边界的滑动条超出可视范围（类似于隐藏）。