         //ҳ���ʼ��
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

            //����ͼƬ���ֲ� 
            function animate (offset) {
                if (offset == 0) {
                    return;
                }
                animated = true;
                var time = 300;//λ���ܵ�ʱ��
                var inteval = 10;//Ψһ���ʱ��
                var speed = offset/(time/inteval);//λ����
                var left = parseInt(images.style.left) + offset;

                var go = function (){
                    if ( (speed > 0 && parseInt(images.style.left) < left) || (speed < 0 && parseInt(images.style.left) > left)) //λ����<0,�����ƶ���ƫ��������ָ����left;
					{
                        images.style.left = parseInt(images.style.left) + speed + 'px';//λ���ƶ�
                        setTimeout(go, inteval);
                    }
                    else {
                        images.style.left = left + 'px';//λ��ֵΪָ����ֵ
						//������ȷ��λ��ֵ
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
            //��ʾ��ť
            function showButton() {
                for (var i = 0; i < buttons.length ; i++) {
                    if( buttons[i].className == 'on'){
                        buttons[i].className = '';
                        break;
                    }
                }
                buttons[index - 1].className = 'on';
            }
             //����
            function play() {
                timer = setTimeout(function () {
                    next.onclick();
                    play();
                }, interval);
            }
			//ֹͣ����
            function stop() {
                clearTimeout(timer);
            }
            //�����һ����ť
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
			//�����һ����ť
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
            //������µİ�ť
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
            //���Ӱ����¼�
            outer.onmouseover = stop;
            outer.onmouseout = play;

            play();

        }
