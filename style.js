         //页面初始化
        window.onload = function () {
            var outer = document.getElementById('outer');
            var images = document.getElementById('images');
            var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var prev = document.getElementById('prev');
            var next = document.getElementById('next');
            var index = 1;
            var len = 9;
            var animated = false;
            var interval = 2000;
            var timer;

            //设置图片的轮播 
            function animate (offset) {
                if (offset == 0) {
                    return;
                }
                animated = true;
                var time = 300;//位移总的时间
                var inteval = 10;//唯一间隔时间
                var speed = offset/(time/inteval);//位移量
                var left = parseInt(images.style.left) + offset;

                var go = function (){
                    if ( (speed > 0 && parseInt(images.style.left) < left) || (speed < 0 && parseInt(images.style.left) > left)) //位移量<0,向左移动，偏移量大于指定的left;
					{
                        images.style.left = parseInt(images.style.left) + speed + 'px';//位移移动
                        setTimeout(go, inteval);
                    }
                    else {
                        images.style.left = left + 'px';//位移值为指定的值
						//调整正确的位移值
                        if(left>-200){
                            images.style.left = -600 * len + 'px';
                        }
                        if(left<(-600 * len)) {
                            images.style.left = '-600px';
                        }
                        animated = false;
                    }
                }
                go();
            }
            //显示按钮
            function showButton() {
                for (var i = 0; i < buttons.length ; i++) {
                    if( buttons[i].className == 'on'){
                        buttons[i].className = '';
                        break;
                    }
                }
                buttons[index - 1].className = 'on';
            }
             //播放
            function play() {
                timer = setTimeout(function () {
                    next.onclick();
                    play();
                }, interval);
            }
			//停止播放
            function stop() {
                clearTimeout(timer);
            }
            //点击下一个按钮
            next.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 9) {
                    index = 1;
                }
                else {
                    index += 1;
                }
                animate(-600);
                showButton();
            }
			//点击上一个按钮
            prev.onclick = function () {
                if (animated) {
                    return;
                }
                if (index == 1) {
                    index = 9;
                }
                else {
                    index -= 1;
                }
                animate(600);
                showButton();
            }
            //点击底下的按钮
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].onclick = function () {
                    if (animated) {
                        return;
                    }
                    if(this.className == 'on') {
                        return;
                    }
                    var myIndex = parseInt(this.getAttribute('index'));
                    var offset = -600 * (myIndex - index);

                    animate(offset);
                    index = myIndex;
                    showButton();
                }
            }
            //鼠标影响的事件
            outer.onmouseover = stop;
            outer.onmouseout = play;

            play();

        }
