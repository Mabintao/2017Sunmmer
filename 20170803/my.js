/**
 * Created by Administrator on 2017/7/19.
 */
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

    var speed = 0;
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