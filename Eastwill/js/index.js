/**
 * Created by Administrator on 2017/7/29.
 */
var key=0;
showNav();
slice();
workslice();
picSlice();
changeImg();
totop()
function $(ele,flag) {
    if(flag){
        return document.querySelectorAll(ele);
    }else {
        return document.querySelector(ele);
    }
}
function show(obj) { obj.style.display = "block";}
function hide(obj) { obj.style.display = "none";}
function scroll() {
    if(window.pageYOffset != null)  //  ie9+ 和其他浏览器
    {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode == "CSS1Compat")  // 声明的了 DTD
    // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
    {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return { //  剩下的肯定是怪异模式的
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}
//使用json对象传入多个属性值
function animate(obj,json,fn) {
    clearInterval(obj.timer);
    var speed=0;
    obj.timer=setInterval(function () {
        var off = true;
        for(var attr in json){     //遍历json对象获取多个属性

            var current = parseInt(getAttr(obj,attr));
            if(attr == "opacity"){
                current = json[attr];
                obj.style.opacity = json[attr] / 100;
                obj.style.filter = "alpha(opacity="+json[attr]+")"
            }else if (attr == "zIndex"){
                obj.style.zIndex = json[attr];
            }else{
                iTarget = json[attr];
                speed = (iTarget-current)/10;
                speed = speed>0? Math.ceil(speed) : Math.floor(speed);
                obj.style[attr]=speed+current+"px";
            }

            if(current != json[attr]){
                off = false;
            }
        }

        if(off){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },10)
}
function getAttr(obj,attr) {
    if(obj.currentStyle){
        //ie
        return obj.currentStyle[attr];
    }else {
        //其他浏览器
        return getComputedStyle(obj,null)[attr];
    }
}

//显示导航窗口
function showNav() {
    var navBtn = $(".header .box .navBtn");
    var closeBtn = $(".show .btn");
    var show = $(".show")
    navBtn.onclick = function () {
        show.style.display="block";
    }
    closeBtn.onclick=function () {
        show.style.display="none";
    }
}
//轮播 自动轮播
function slice() {
    var key=0;
    var oul = $(".slice ul");
    var ali = $(".slice ul li",true);
    var abtn = $(".slice ol li",true);
    var aBar = $(".slice ol li .bar",true);
    var timer=null;
    clearInterval(timer);
    timer=setInterval(function () {
        oul.style.left = -ali[key].offsetLeft + "px";
        barMove(aBar,abtn,key,30);
        key++;
        key>=ali.length?key=0:key=key;
    },3000);


}
function barMove(obj,obj2,key,time) {
    var num=0;
    var keyValue = key; //由于定时器是最后执行的语句，所以需要新建一个变量存储key值
    var timer2=null;
    /*开启定时器，让bar的宽度随时间递增*/
    clearInterval(timer2);
    timer2=setInterval(function () {
        clear(obj);
        num++;
        var speed = obj2[keyValue].offsetWidth/100;
        obj[keyValue].style.width = num * speed+"px";
        if(obj[keyValue].offsetWidth==obj2[keyValue].offsetWidth){
            clearInterval(timer2);
        }
    },time)
}
function clear(obj) {
    for(var i=0; i<obj.length; i++){
        obj[i].style.width="0px";
    }
}
function workslice() {
    var oul = $(".works .pic ul");
    var ali = $(".works .pic ul li",true)
    var abtn = $(".works .pic ol li",true);
    var key=0;var timer=0;
    var aBar = $(".works .pic ol .bar",true);
    clearInterval(timer);
    timer=setInterval(function () {
        if(key==0){
            animate(oul,{left:0});
            barMove(aBar,abtn,key,30);
        }else{
            animate(oul,{left:-ali[3*key].offsetLeft});
            barMove(aBar,abtn,key,30);
        }
        key++;
        key>2?key=0:key=key;
    },3000)

}
function picSlice() {
    var mobile = $(".mobile");
    var shouji = $(".shouji");
    var pingban = $(".pingban");
    var bijiben = $(".bijiben");
    var diannao = $(".diannao");
    var height =mobile.offsetTop;
    window.onscroll=function () {
        var top = scroll().top
        if(top>height){
            animate(shouji,{top:240});
            animate(pingban,{top:200});
            animate(bijiben,{right:0});
            animate(diannao,{left:0});
        }
    }
}
function changeImg() {
    var src = [{index:0,src:"tengxun1.png"},{index:2,src:"tengxun1.png"},{index:4,src:"tengxun1.png"},{index:6,src:"tengxun1.png"},{index:8,src:"tengxun1.png"},{index:9,src:"tengxun1.png"}]
    var aImg = $(".clients .picAll img",true);
    for(var i=0; i<aImg.length; i++){
        aImg[i].index=i;
        aImg[i].onmouseover=function () {
            var num = this.index;
            for(var j=0; j<src.length; j++){
                if(num==src[j].index){
                    aImg[num].src = "images/"+src[j].src;
                }
            }
        }
        aImg[i].onmouseout=function (){
            aImg[this.index].src = "images/tengxun.png";
        }
    }
}
function totop() {
    var btn = $(".toTop");
    btn.onclick=function () {
        window.scrollTo(btn.offsetTop,0);
    }
}