// /**
//  * Created by bobodaren007 on 2016/7/11 0011.
//  */
//
//
//
//
// timer=window.setInterval(function (){   //自动轮播
//     var imgs=document.querySelector('.topAd').children;
//     var pagination=document.querySelector(".pagination").children;
//     fadeOut(imgs[imgIndex%imgs.length]);
//     pagination[imgIndex%imgs.length].style.background="white";
//     imgIndex++;
//     fadeIn(imgs[imgIndex%imgs.length]);
//     pagination[imgIndex%imgs.length].style.background="gray";
// },10000);
//
//  var topAd = document.querySelector('.topAd');//手动滑动
// // mc = new Hammer.Manager(topAd);
// // Swipe = new Hammer.Swipe();
// // mc.add(Swipe);
// // var imgs=topAd.children;
// // var pagination = document.querySelector(".pagination").children;
// var mc = new Hammer(topAd, {
//   touchAction: 'auto'
//   // touchAction: 'pan-x'
// });
// mc.get('swipe').set({
//     direction: Hammer.DIRECTION_VERTICAL
// });
// mc.get('pan').set({
//   direction: Hammer.DIRECTION_VERTICAL
// });
// Swipe = new Hammer.Swipe();
// mc.add(Swipe);
// var imgs=topAd.children;
// var pagination = document.querySelector(".pagination").children;
//
// mc.on('swipeleft', function(e) {
//   document.querySelector('.topAd').style.touchAction='none';
//     fadeOut(imgs[imgIndex%imgs.length]);
//     pagination[imgIndex%imgs.length].style.background="white";
//     imgIndex++;
//     fadeIn(imgs[imgIndex%imgs.length]);
//     pagination[imgIndex%imgs.length].style.background="gray";
// });
//
// mc.on('swiperight', function(e) {
//     document.querySelector('.topAd').style.touchAction='none';
//     fadeOut(imgs[imgIndex%imgs.length]);
//     pagination[imgIndex%imgs.length].style.background="white";
//     imgIndex--;
//     if(imgIndex==-1){
//         imgIndex=2;
//     }
//     fadeIn(imgs[imgIndex%imgs.length]);
//     pagination[imgIndex%imgs.length].style.background="gray";
// });
// mc.on('swipeup', function(e) {
//   document.querySelector('.topAd').style.touchAction='auto';
//   //document.querySelector('.topAd').style.touchAction='none';
//   //document.documentElement.scrollTop=10
//   document.body.scrollTop=150+document.body.scrollTop
//   console.log(document.body.scrollTop)
// });
// mc.on('swipedown', function(e) {
//   document.querySelector('.topAd').style.touchAction='auto';
//   //document.querySelector('.topAd').style.touchAction='none';
//   //document.documentElement.scrollTop=10
//   document.body.scrollTop=0
//   console.log(document.body.scrollTop)
// });
// var imgIndex=0;
// function fadeIn(e) {    //淡入
//     e.className = "bg fadein";
// }
// function fadeOut(e) {   //淡出
//     e.className = "bg";
// }
//
//
// function getScrollTop()
// {
//     var scrollTop=0;
//     if(document.documentElement&&document.documentElement.scrollTop)
//     {
//         scrollTop=document.documentElement.scrollTop;
//     }
//     else if(document.body)
//     {
//         scrollTop=document.body.scrollTop;
//     }
//     return scrollTop;
// }
//
// /**
//  * Created by bobodaren007 on 2016/7/11 0011.
//  */
//
//
//
//
// timer=window.setInterval(function (){   //自动轮播
//     var imgs=document.querySelector('.topAd').children;
//     var pagination=document.querySelector(".pagination").children;
//     fadeOut(imgs[imgIndex%imgs.length]);
//     pagination[imgIndex%imgs.length].style.background="white";
//     imgIndex++;
//     fadeIn(imgs[imgIndex%imgs.length]);
//     pagination[imgIndex%imgs.length].style.background="gray";
// },4000);
//
//
// var topAd = document.querySelector('.topAd');//手动滑动
// // var mc = new Hammer(topAd, {
// //   touchAction: 'auto'
// // });
// // // mc.get('pan').set({
// // //   direction: Hammer.DIRECTION_VERTICAL
// // // });
// // mc.get('swipe').set({
// //     direction: Hammer.DIRECTION_VERTICAL
// // });
//  var  mc = new Hammer.Manager(topAd);
//  var Swipe = new Hammer.Swipe();
//  mc.add(Swipe);
// // Pan = new Hammer.Pan();
// // mc.add(Pan);
//
//
//
// document.querySelector('.topAd').setAttribute("style","touch-action:auto;-webkit-overflow-scrolling:touch;")
// var pagination = document.querySelector(".pagination").children;
// mc.on('swipeleft', function(e) {
//   console.log("aa")
//   var imgs=topAd.children;
//     fadeOut(imgs[imgIndex%imgs.length]);
//     pagination[imgIndex%imgs.length].style.background="white";
//     imgIndex++;
//     fadeIn(imgs[imgIndex%imgs.length]);
//     pagination[imgIndex%imgs.length].style.background="gray";
// });
//
// mc.on('swiperight', function(e) {
//   var imgs=topAd.children;
//     fadeOut(imgs[imgIndex%imgs.length]);
//     pagination[imgIndex%imgs.length].style.background="white";
//     imgIndex--;
//     if(imgIndex==-1){
//         imgIndex=2;
//     }
//
//     fadeIn(imgs[imgIndex%imgs.length]);
//     pagination[imgIndex%imgs.length].style.background="gray";
// });
//
//   //  document.querySelector('body').setAttribute("style","touch-action:auto;-webkit-overflow-scrolling:touch;")
//   //  document.querySelector('.main').setAttribute("style","touch-action:auto;-webkit-overflow-scrolling:touch;")
// // mc.on('swipeup', function(e) {
// //   // document.querySelector('.topAd').setAttribute("style","z-index:-1;touch-action:auto;-webkit-overflow-scrolling:auto;")
// //   // document.querySelector('.topAd').setAttribute("style","z-index:-1;touch-action:auto;-webkit-overflow-scrolling:touch;")
// //   console.log("S");
// //   //  document.querySelector('.topAd').style.touchAction='auto';
// //   //  document.querySelector('.topAd').setAttribute("style","touch-action:auto;-webkit-overflow-scrolling: touch;")
// // //  document.querySelector('.topAd').style.touchAction='auto';
// //   // document.querySelector("body").style.overflow="auto"
// //   // for(var i=0;i<150;i++){
// //   //   //document.documentElement.scrollTop = i+1
// //   //   document.body.scrollTop=i+document.body.scrollTop
// //   // }
// //
// //   //document.querySelector('.topAd').style.touchAction='none';
// //   //document.documentElement.scrollTop=10
// //   // document.body.scrollTop=150+document.body.scrollTop
// // });
// // mc.on('swipedown', function(e) {
// //   //document.querySelector('.topAd').style.touchAction='auto';
// //   // document.querySelector("body").style.overflow="auto"
// //   //document.querySelector('.topAd').style.touchAction='none';
// //   //document.documentElement.scrollTop=10
// //   // document.body.scrollTop=0
// //   // console.log(document.body.scrollTop)
// // });
// var imgIndex=0;
// function fadeIn(e) {    //淡入
//     e.className = "bg fadein";
// }
// function fadeOut(e) {   //淡出
//     e.className = "bg";
// }
//
//
// function getScrollTop()
// {
//     var scrollTop=0;
//     if(document.documentElement&&document.documentElement.scrollTop)
//     {
//         scrollTop=document.documentElement.scrollTop;
//     }
//     else if(document.body)
//     {
//         scrollTop=document.body.scrollTop;
//     }
//     return scrollTop;
// }

/**
 * Created by bobodaren007 on 2016/7/11 0011.
 */




timer=window.setInterval(function (){   //自动轮播
    var imgs=document.querySelector('.topAd').children;
    var pagination=document.querySelector(".pagination").children;
    fadeOut(imgs[imgIndex%imgs.length]);
    pagination[imgIndex%imgs.length].style.background="white";
    imgIndex++;
    fadeIn(imgs[imgIndex%imgs.length]);
    pagination[imgIndex%imgs.length].style.background="gray";
},10000);

var topAd = document.querySelector('.topAd');//手动滑动
// var mc = new Hammer.Manager(topAd);

var mc = new Hammer.Manager(topAd, {
  touchAction: 'pan-y'
});
// mc.get('swipe').set({
//     direction: Hammer.DIRECTION_VERTICAL
// });
// mc.get('pan').set({
//   direction: Hammer.DIRECTION_VERTICAL
// });
Swipe = new Hammer.Swipe();
mc.add(Swipe);
var imgs=topAd.children;
var pagination = document.querySelector(".pagination").children;


mc.on('swipeleft', function(e) {
//  document.querySelector('.topAd').style.touchAction='none';
    fadeOut(imgs[imgIndex%imgs.length]);
    pagination[imgIndex%imgs.length].style.background="white";
    imgIndex++;
    fadeIn(imgs[imgIndex%imgs.length]);
    pagination[imgIndex%imgs.length].style.background="gray";
});

mc.on('swiperight', function(e) {
  //  document.querySelector('.topAd').style.touchAction='none';
    fadeOut(imgs[imgIndex%imgs.length]);
    pagination[imgIndex%imgs.length].style.background="white";
    imgIndex--;
    if(imgIndex==-1){
        imgIndex=2;
    }
    fadeIn(imgs[imgIndex%imgs.length]);
    pagination[imgIndex%imgs.length].style.background="gray";
});
// mc.on('swipeup pan', function(e) {
//   // document.querySelector('.topAd').style.touchAction='auto';
//   // //document.querySelector('.topAd').style.touchAction='none';
//   // //document.documentElement.scrollTop=10
//   // document.body.scrollTop=150+document.body.scrollTop
//   // console.log(document.body.scrollTop)
// });
// mc.on('swipedown', function(e) {
//   document.querySelector('.topAd').style.touchAction='auto';
//   //document.querySelector('.topAd').style.touchAction='none';
//   //document.documentElement.scrollTop=10
//   document.body.scrollTop=0
//   console.log(document.body.scrollTop)
// });
var imgIndex=0;
function fadeIn(e) {    //淡入
    e.className = "bg fadein";
}
function fadeOut(e) {   //淡出
    e.className = "bg";
}


function getScrollTop()
{
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop)
    {
        scrollTop=document.documentElement.scrollTop;
    }
    else if(document.body)
    {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}
