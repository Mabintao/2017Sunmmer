//多物体运动
function animate(obj,json,fn)
{
    var timer=null;
    var speed=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var off=true;
        var current=0;
        for( var attr in json)   // attr  属性     json[attr]  值
        {
            //console.log(attr);
            if ("opacity" == attr) {
                current = json[attr]; //取值
                //console.log(current);
                // console.log("alpha(opacity= "+ (current + speed) + ")")
            }
            else {
                current = parseInt(getStyle(obj, attr)); // 数值

            }


            speed = (json[attr] - current) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);


            if ("opacity" == attr) {
                if ("opacity" in obj.style)  //判断浏览器是否兼容
                {
                    //正常浏览器
                    obj.style.opacity = (current + speed ) / 100;
                }
                else {
                    obj.style.filter = "alpha(opacity= " + (current + speed) + ")";  //ie
                }
            }
            else if ("zIndex" == attr) {
                obj.style.zIndex = json[attr];
            }
            else {
                obj.style[attr] = current + speed + "px";
            }


            if (current != json[attr]) {
                off = false;
            }
            ;
        }



        if (off)
        {
            clearInterval(obj.timer);

            if (fn)
            {
                fn();
            }
        };


    },30);
};


function getStyle(obj,attr){   //  谁的      那个属性
    if (obj.currentStyle) // ie 等
    {
        return obj.currentStyle[attr];// 返回传递过来的某个属性
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];  //其它浏览器
    };
};
