window.onload = function(){

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var showimg = document.getElementById('showimg');
  var shadow = showimg.getElementsByTagName('span')[0];
  var css_code = document.getElementById('css_code');

  document.getElementById('img').onchange = function(){
    var img = event.target.files[0]; 

    // 检查能否读取图片
    if(!img){
      return ;
    }

    // 检查图片类型
    if(!(img.type.indexOf('image')==0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name)) ){
      alert('图片只能是jpg,gif,png');
      return ;
    }

    // 检查图片尺寸
    if(img.size > 120*1024){
      alert('图片不能大于120K');
      return ;
    }

    // file reader
    var reader = new FileReader();
    reader.readAsDataURL(img);

    reader.onload = function(e){ // reader onload start

      var image = new Image();
      image.src = e.target.result;

      image.onload = function(){ // image onload start

        var img_width = this.width;
        var img_height = this.height;

        // 设置画布尺寸
        canvas.width = img_width;
        canvas.height = img_height;

        // 将图片按像素写入画布
        context.drawImage(this, 0, 0, img_width, img_height);

        // 读取图片像素信息
        var imageData = context.getImageData(0, 0, img_width, img_height);

        var arrbox = [],
          length = imageData.data.length;

        // 生成box-shadow
        for(var i=0; i<length; i++){

          if(i%4 === 0){ // 每四个元素为一个像素数据 r,g,b,alpha

            var x = i/4%img_width + 1;                // 横坐标
            var y = Math.floor(i/4/img_width) + 1;          // 纵坐标
            var alpha = Math.round(imageData.data[i+3]/255*100)/100; // alpha 值

            if(imageData.data[i+3]==255){ // 没有alpha 值
              var hex = gethex(imageData.data[i], imageData.data[i+1], imageData.data[i+2]);
              arrbox.push(x + 'px ' + y + 'px #' + hex);
            }else if(alpha>0){ // 有alpha 值
              var rgba = imageData.data[i] + ',' + imageData.data[i+1] + ',' + imageData.data[i+2] + ',' + alpha;
              arrbox.push(x + 'px ' + y + 'px rgba(' + rgba + ')');
            }

          }
        }

        // 将数据写入dom
        showimg.style.width = img_width + 'px';
        showimg.style.height = img_height + 'px';

        shadow.style.boxShadow = arrbox.join(',');

        // 输出CSS3 box-shadow
        css_code.style.display = 'block';
        css_code.innerHTML = 'box-shadow: ' + arrbox.join(',');


        // 获取16进制颜色
        function gethex(r,g,b){
          r = r.toString(16);
          g = g.toString(16);
          b = b.toString(16);

          // 补0
          r.length==1? r = '0' + r : '';
          g.length==1? g = '0' + g : '';
          b.length==1? b = '0' + b : '';

          var hex = r + g + b;

          // 简化处理,如 FFEEDD 可以写为 FED
          if(r.slice(0,1)==r.slice(1,1) && g.slice(0,1)==g.slice(1,1) && b.slice(0,1)==b.slice(1,1)){
            hex = r.slice(0,1) + g.slice(0,1) + b.slice(0,1);
          }

          return hex;
        }

      } // image onload end

    } // reader onload end
  }

 }
