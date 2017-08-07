/**
 * Created by andy on 2015/11/19.
 */
function $(id,isAll) {
    if(isAll){
        return document.querySelectorAll(id);
    }else {
        return document.querySelector(id);
    }
}
function show(obj) { obj.style.display = "block";}
function hide(obj) { obj.style.display = "none";}

/*
* 获取鼠标滑动的值
* */
function scroll() {
    if(document.body.scrollTop){
        return {
            left:document.body.scrollLeft,
            top:document.body.scrollTop
        }
    }else {
        return {
            left:document.documentElement.scrollLeft,
            top:document.documentElement.scrollTop
        }
    }
}

//获取屏幕的宽度
function client() {
    if(document.body.clientWidth || document.body.clientHeight){
        return {
            width:document.body.clientWidth,
            height:document.body.clientHeight
        }
    }else {
        return {
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
}