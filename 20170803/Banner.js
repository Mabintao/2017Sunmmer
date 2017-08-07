		function Banner(data){
            this.data = data;
            this.timer = null;
            this.key = 0;
            this.oOl = document.getElementsByClassName("myBanner_ol")[0];
            this.aLi = this.oOl.getElementsByTagName("li");
            this.distance = 0;
		}

        Banner.prototype={
            //绑定HTML
            bindHtml:function(data){
                var str = '<li><a href="javascript:"><img src="images/'+data.imgPath+'" alt=""><span>'+data.text+'</span></a></li>'

                return str;
            },

            //页面初始化
            init:function(data){
                var str = "";

                for(var i=0; i<data.length; i++ ){
                    str += this.bindHtml(data[i]);
                }
                
                this.oOl.innerHTML=str;

                for(var i=0; i<this.aLi.length;i++){
                    this.distance = this.aLi[0].offsetWidth;
                    this.aLi[i].style.left = this.distance + "px";
                    if(i==0){
                        this.aLi[i].style.left = "0px"
                    }
                }
            },
            //下一张
            next:function(){
                animate(this.aLi[this.key],{left:-this.distance});
                this.key++;
                this.key>=this.aLi.length?this.key=0:this.key;
                animate(this.aLi[this.key],{left:0});
                this.aLi[this.key].style.left=this.distance+"px";
            },
            //自动轮播
            autoPlay:function(){
                var that = this;
                clearInterval(this.timer);
                this.timer = setInterval(function(){
                    that.next();
                }, 2000)
            },
            //上一张
            prev:function(){
                if(this.key==0){
                    animate(this.aLi[this.key],{left:this.distance});                            
                    this.key=this.aLi.length;
                    this.key--;
                    this.aLi[this.key].style.left=-this.distance+"px";
                    animate(this.aLi[this.key],{left:0})
                } else {
                    animate(this.aLi[this.key],{left:this.distance});
                    this.key--;
                    animate(this.aLi[this.key],{left:0});
                    this.aLi[this.key].style.left=-this.distance+"px";
                }
            },

            //拖拽事件
            drag:function(){
                var that = this;
                var startX=0,endX=0;
                this.oOl.addEventListener("touchstart",start,false); //注册事件
                this.oOl.addEventListener("touchend",move,false); //注册事件
               
                function start(ev){
                    var oEvent = ev||event;
                    startX = oEvent.targetTouches[0].clientX;
                }
                function move(ev){
                    var oEvent = ev||event;
                    endX = oEvent.changedTouches[0].clientX;
                    if(endX>startX){
                        that.prev();
                    }else{
                        that.next();
                    }
                }
            },

            //绑定事件
            bindEvent:function(){
                this.init(this.data);
                this.autoPlay();
                this.drag();
            }
        }