		function Nav(data){
			this.data = data;
			this.oul = document.getElementsByClassName("myNav_ul")[0];
			this.ali = this.oul.getElementsByTagName("li");
		}
		Nav.prototype={
			
			//初始化
			init:function(){
				var str="";
				for(var i=0; i<this.data.length; i++){
					str+='<li><a href="javascript:"><span>'+this.data[i]+'</span></a></li>'
				}
				this.oul.innerHTML=str;
				this.oul.style.width=this.ali[0].offsetWidth * this.data.length + "px";
			},

			//拖拽
			drag:function(){
				var that = this;
				that.oul.addEventListener("touchstart", start, false);  //注册事件
				that.oul.addEventListener("touchmove", move, false);  //注册事件

				var startX=0,endX=0;
				function start(ev){
					var oEvent = ev||event;
					startX = oEvent.targetTouches[0].clientX - that.oul.offsetLeft;
				}

				function move(ev){
					var oEvent = ev||event;
					endX = oEvent.targetTouches[0].clientX;
					that.oul.style.left = endX - startX + "px";
					if(that.oul.offsetLeft>=0){
						that.oul.style.left = "0px";
					} else if(that.oul.offsetLeft<-(that.oul.offsetWidth- 6*that.ali[0].offsetWidth)){
						that.oul.style.left = -(that.oul.offsetWidth-document.body.clientWidth) + "px";
					}
				}
			},

			//绑定事件
			bindEvent:function(){
				this.init();
				this.drag();
			}	
		}