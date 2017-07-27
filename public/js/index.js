
$("#input-img").uploadPreview({
    Img: "img-show",
    ImgType: ["png", "jpg", "bmp"],
    Callback: function() {
      showColor();
    }
  });


function showColor() {
  var img = document.getElementById('img-show');
  var colors = RGBaster.colors(img, {
    paletteSize: 100,
    success: function(colors){
      img.style.borderColor = colors.palette[0];

      var makeDivWithClassAndBGColor = function(klass, color){
        var div = document.createElement("div");
        div.className = klass;
        div.style.backgroundColor = color;
        return div;
      };
      var colorList =[];
      for (i in colors.palette) {

          colorList.push('<div class="div-color" style="background-color:'+colors.palette[i]+';"></div>');


      }
      $('#color-list').html(colorList.join('\n'));
      // console.log("-----------------------------------------------");
      // console.log("rgbaster.js");
      // console.log("-----------------------------------------------");
      // console.log("Dominant color:", colors.dominant);
      // console.log("Secondary color:", colors.secondary);
      // console.log("Palette length:", colors.palette);
      // console.log("Palette length:", colors.palette.length);
      // console.log("-----------------------------------------------")

    }
  });

}
