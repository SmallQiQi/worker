$(function() {
    $(".bg").mouseenter(function() {
        var thisPX = $(this).offset().left;
        var thisPY = $(this).offset().top;
        var boxWidth = $(this).outerWidth();
        var boxHeight = $(this).outerHeight();
        $(this).addClass("threeD");
        $(".threeD").mousemove(function(event) {
            var mouseX = event.pageX - thisPX;
            var mouseY = event.pageY - thisPY;
            var X;
            var Y;
            if (mouseX > boxWidth / 2) {
                X = mouseX - boxWidth/2;
            } else {
                X = mouseX - boxWidth/2;
            }
            if (mouseY > boxHeight / 2) {
                Y = boxHeight/2 - mouseY;
             } else {
                Y = boxHeight/2 - mouseY;
            }
            $(".threeD").css({
            "-webkit-transform": "rotateY(" + X / 35 + "deg) " + "rotateX(" + Y / 35 + "deg)"
            });
        // console.log(X + "," + Y);
        });
    });
    $(".bg").mouseleave(function() {
        $(this).removeClass("threeD");
        $(this).css({
            "-webkit-transform": "rotateY(0deg) rotateX(0deg)"
        });
    });

});
// banner滚动代码
$.fn.bannerSlides = function(options){
    //console.log($(this).find("li").size());
    var _self = $(this);
    var oSlidImg = _self.find("ul li");
    var slidImgLen = oSlidImg.length;
    var ind = 0;
    var timer = null;
    var timer02 = null;
    var tpl = '<p class="bannerTab"></p>\
            <a class="bannerPaN banner_prev" href="javascript:void(0)"></a>\
            <a class="bannerPaN banner_next" href="javascript:void(0)"></a>\
    ';
    _self.append(tpl);
    for(var i=0;i<slidImgLen;i++){
        $(".bannerTab").append('<span></span>');
    }
    oSlidImg.eq(0).css({
        "z-index" : 1,
        "opacity" : 1
    });
    $(".bannerTab span").eq(0).addClass("on");
    var play = function(n){
        oSlidImg.css({
            "z-index" : 0
        }).eq(n).css({
            "z-index" : 1
        });
        oSlidImg.eq(n).stop().animate({
            "opacity" : 1
        },400,function(){
            oSlidImg.css({
                "opacity" : 0
            }).eq(n).css({
                "opacity" : 1
            });
        });
        $(".bannerTab span").removeClass("on").eq(n).addClass("on");
    }
    var autoPlay = function(){
        timer = setInterval(function(){
            if(ind >= slidImgLen-1){
                ind = 0;
            }else{
                ind++;
            }
            play(ind);
        },2000);
    }
    autoPlay();
    //鼠标滑过tab切换
    $(".bannerTab span").on("mouseover",function(){
        var curind = $(this).index();
        clearTimeout(timer02);
        timer02 = setTimeout(function(){
            if(curind == ind){return false;}
            ind = curind;
            play(curind)
            $(this).addClass("on").siblings().removeClass("on");
        },100);
    });
    //点击左右滑动按钮
    $(".bannerPaN").on("click",function(){
        if($(this).hasClass("banner_prev")){
            ind--;
            if(ind < 0){
                ind = slidImgLen - 1;
            }
        }else{
            ind++;
            if(ind >= slidImgLen){
                ind = 0;
            }
        }
        play(ind);
    });
    _self.hover(function(){
        clearInterval(timer);
    },function(){
        autoPlay()
    });
};
$("#banner .bannerList").bannerSlides();