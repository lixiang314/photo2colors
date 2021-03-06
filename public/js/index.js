$("#input-img").uploadPreview({
  Img: "img-show",
  ImgType: ["png", "jpg", "bmp"],
  Callback: function() {
    $('.cover').show();
    var _src = $('#img-show').attr('src');
    console.log(_src);
    $('.img-main').css('background', 'url("' + _src + '") no-repeat center').css('backgroundSize', 'cover');
    showColor();
  }
});

function loadingOk() {
  $('.cover').hide();
  $('.sec-1').hide();
  $('.sec-2').show();
  $('.preview').html('');

}

function showColor() {
  var img = document.getElementById('img-show');
  var colors = RGBaster.colors(img, {
    paletteSize: 500,
    success: function(colors) {
      loadingOk();

      img.style.borderColor = colors.palette[0];

      var makeDivWithClassAndBGColor = function(klass, color) {
        var div = document.createElement("div");
        div.className = klass;
        div.style.backgroundColor = color;
        return div;
      };
      var colorList = [];
      for (i in colors.palette) {
        if ((Number(i) + 1) % 10 == 0) {
          colorList.push('<div class="div-color" style="background-color:' + colors.palette[i] + ';" value="' + colors.palette[i] + '"></div>');
        }

      }
      $('#color-list').html(colorList.join('\n'));

      //
      // $('.preview').append('<div class="selected-box" style="background:' + colors.dominant + ';"></div>');
      // $('.preview').append('<div class="selected-box" style="background:' + colors.secondary + ';"></div>');
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


$('#pre-step').on('click', function() {
  $('.sec-3').hide();
  $('.sec-2').show();
})

$('#color-list').on('click', '.div-color', function() {
  var _value = $(this).attr("value");
  if ($(this).hasClass('selected')) {
    return;
  } else {
    var _newBox = '<div class="selected-box" style="background:' + _value + ';"></div>';

    if ($('.preview-1').html() == '') {
      $('.preview').hide().show().append(_newBox);
    } else {
      $('.preview').append(_newBox);
    }

    $(this).addClass('selected').html('<img src="img/icon-ok.png" alt="" class="title">');
  }

});

// 重选
$('.btn-reset').on('click', function() {
  $('.preview').empty();
  $('.div-color').html('').removeClass('selected');
})

$('.btn-next').on('click', function() {
  $('.sec-2').hide();
  $('.sec-3').show();
})
$('#btn-again').on('click', function() {
  $('.sec-3').hide();
  $('.sec-2').hide();
  $('.sec-1').show();
})
