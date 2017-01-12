
var VERSION = "1.1.9";
// 设定尺寸
var viewWidth = view.viewSize.width;
var viewHeight = view.viewSize.height;
var windowWidth = viewWidth;
var windowHeight = viewHeight;
// 木条尺寸
var barWidth = windowWidth / 1.3;
var barHeight = windowHeight / 30;
// 滑动边框尺寸
var slideWidth = windowWidth;
var slideHeight = windowHeight / 10;
// 小滑块尺寸
var woodWidth = windowWidth / 15;
var woodHeight = windowWidth / 15;
// 中心线长度
var centerLineLength = windowWidth / 4;
var slideRadius = windowHeight / 52;
var pinRadius = windowWidth / 120;
var timerTextPosY = windowHeight / 7.5;
var timerTextFontSize = windowHeight / 10;
var slideStrokeWidth = windowHeight / 200;


var windowWidth2 = windowWidth / 2;
var windowHeight2 = windowHeight / 2;
var viewWidth2 = viewWidth / 2;
var viewHeight2 = viewHeight / 2;
var barWidth2 = barWidth / 2;
var barHeight2 = barHeight / 2;
var slideWidth2 = slideWidth / 2;
var slideHeight2 = slideHeight / 2;
var woodWidth2 = woodWidth / 2;
var woodHeight2 = woodHeight / 2;
var centerLineLength2 = centerLineLength / 2;

var windowSize = new Size(windowWidth - 1, windowHeight - 1);
var barSize = new Size(barWidth, barHeight);
var slideSize = new Size(slideWidth, slideHeight);
var woodSize = new Size(woodWidth, woodHeight);
var maxRandomBias = windowHeight / 20;
var minRandomBias = windowHeight / 200;
var minOmega = .1;
var slideFactor = .5;
var alphaFactor = 200 / windowWidth;

// 初始数据
var timer = 0;
var alpha = 0;
var omega = 0;
var angle = 0;
var status = 0;
var randomBias = (Math.random() - .5) * maxRandomBias;
if(randomBias < 0){
	randomBias -= minRandomBias;
}else{
	randomBias += minRandomBias;
}
var biasX = randomBias;
var mouseX = windowWidth2;
// 木条
var rect = new Raster('bar');
var rectX = barWidth / $('#bar').width();
var rectY = barHeight / $('#bar').height();
rect.scale(rectX,rectY);
rect.position.x = viewWidth2;
rect.position.y = viewHeight2;
// 小滑块
var wood = new Raster('wood');
var woodX = woodWidth / $('#wood').width();
var woodY = woodHeight / $('#wood').height();
wood.scale(woodX,woodY);
wood.position.x = viewWidth2 - woodWidth2 + biasX;
wood.position.y = viewHeight2 - woodHeight2 - barHeight2;
// 中心线
var centerLine = new Path.Line(new Point(viewWidth2, viewHeight2 - centerLineLength), new Point(viewWidth2, viewHeight2));
centerLine.strokeColor = "#333";
centerLine.strokeWidth = 1;
// 中心点
var pin = new Shape.Circle(new Point(viewWidth2, viewHeight2), pinRadius);
pin.fillColor = "#7d5227";

var timerText = new PointText({
	point: [viewWidth2, timerTextPosY],
	justification: "center",
	fillColor: "#f7ef81",
	fontSize: timerTextFontSize
});

slideDown = false;
var x = 0;
$('.btn-left').on('touchstart',function(event){
	event.preventDefault();
	$(this).css({'transform':'scale(1.1,1.1)','-webkit-transform':'scale(1.1,1.1)',opacity:'0.9'});
	slideDown = true;
	mouseX = viewWidth*0.1;
	slideX = -viewWidth*0.4;
})
$('.btn-right').on('touchstart',function(event){
	event.preventDefault();
	$(this).css({'transform':'scale(1.1,1.1)','-webkit-transform':'scale(1.1,1.1)',opacity:'0.9'});
	slideDown = true;
	slideDown = true;
	mouseX = viewWidth*0.9;
	slideX =  viewWidth*0.4;
})
$('.btn').on('touchend',function(){
	$(this).css({'transform':'scale(1,1)','-webkit-transform':'scale(1,1)',opacity:'1'});
	slideDown = false;
})
// 点击事件
$('.start-right').on('touchstart',function(){
	$('.Ranking-List').css({display:'block'});
	// $('.ajax-load').css({display:'block'});
	rank_next();
})
$('.close-Rank').on('touchstart',function(e){
	e.stopPropagation();
	$('.Ranking-List').css({display:'none'});
})
$('.Ebtn-left').on('click',function(e){
	e.stopPropagation();
	$('.share-box').css({display:'block'});
})
$('.Ebtn-center').on('touchstart',function(e){
	e.stopPropagation();
	$('.Ranking-List').css({display:'block'});
	// $('.ajax-load').css({display:'block'});
	rank_next();
})
$('.share-box').on('click',function(){
	$(this).css({display:'none'});
})
// // 离开之后
// slideBack.onMouseLeave = function(event) {
// 	slideDown = false;
// };
// 开始游戏
$('.start-left').on('click',function(){
	$('.start').css({display:'none'});
	status = 1;
})
// 获取数据
function rank_next(){
	// $.post('?m=activity&c=game&a=getScore',{},function(date){
	// 	if(date.status == 1){
	// 		$('.rank-list li').remove();
	// 		if(!date.my.score){
				
	// 		}else{
	// 			if(!date.my.headimgurl){
	// 				$('.rank-me-box .list-man .man-img img').attr('src','http://www.i-ev.com/statics/game/bar_game/images/touxiang.png');
	// 			}else{
	// 				$('.rank-me-box .list-man .man-img img').attr('src',date.my.headimgurl);
	// 			}
	// 			$('.rank-me-box .list-man .num').text(date.my.ranking);
	// 			$('.rank-me-box .list-man .man-name').text(date.my.nickname);
	// 			$('.rank-me-box .list-time').text(date.my.score+'"');
	// 		}
	// 		for(var i in date.info){
	// 			if(!date.info[i].headimgurl){
	// 				$('.Ranking-List .rank-list').append('<li><div class="list-man"><span class="num">'+date.info[i].ranking+'</span><span class="man-img"><img src="http://www.i-ev.com/statics/game/bar_game/images/touxiang.png"></span><span class="man-name">'+date.info[i].nickname+'</span></div><div class="list-time">'+date.info[i].score+'"</div></li>')
	// 			}else{
	// 				$('.Ranking-List .rank-list').append('<li><div class="list-man"><span class="num">'+date.info[i].ranking+'</span><span class="man-img"><img src="'+date.info[i].headimgurl+'"></span><span class="man-name">'+date.info[i].nickname+'</span></div><div class="list-time">'+date.info[i].score+'"</div></li>')
	// 			}
	// 		}
	// 		$('.ajax-load').css({display:'none'});
	// 	}else{
	// 		alert('更新排行榜失败');
	// 		$('.ajax-load').css({display:'none'});
	// 	}
	// },'json')
}
// 
// 初始化函数
function init(){
	timer = 0;
	slideX = 0;
	alpha = 0;
	omega = 0;
	angle = 0;
	status = 1;
	pin.visible = true;
	randomBias = (Math.random() - .5) * maxRandomBias;
	if (randomBias < 0) {
		randomBias -= minRandomBias
	} else {
		randomBias += minRandomBias
	}
	biasX = randomBias;
	centerLine.visible = true;
	centerLine.dashArray = [];
	$('.end').css({display:'none'});
}
// 无效函数
function endmark(timer){
	if(timer < 5){
		return "'没关系刚开始都这样^_^'";
	}else if(timer < 8){
		return "'我一定可以的'";
	}else if(timer < 12){
		return "'似乎已经掌握技巧了'";
	}else if(timer < 20){
		return "'你是天平座的?'";
	}else if(timer < 30){
		return "'你绝对是天平座投胎来的'";
	}else if(timer < 40){
		return "'还有谁！！'";
	}else if(timer < 50){
		return "'牛顿已经哭晕在厕所'";
	}else{
		return "'我知道，这个世界不是完美的'";
	}
}
function endText(){
	$('.end-time').text(timer.toFixed(2)+"''");
	// $('.end .end-courage').html(endmark(timer));
	$('.end').css({display:'block'});
}
function ajax(){
	$('.ajax-load').css({display:'block'});
	var score = timer;
	$.post('?m=activity&c=game&a=upScore',{'score':score},function(date){
		if(date.status == 1){
			var tt = setTimeout(function(){
				$.post('?m=activity&c=game&a=getScore',{},function(date){
					if(date.status == 1){
						$('.ajax-load').css({display:'none'});
						$('.goodtime').text(date.my.score);
						$('.goodnum').text(date.my.ranking);
						$('.three-list li').remove();
						for(var i in date.info){
							if(i <= 3){
								if(!date.info[i].headimgurl){
									$('.three-list').append('<li><div class="list-man"><span class="man-img"><img src="http://www.i-ev.com/statics/game/bar_game/images/touxiang.png" alt=""></span><span class="man-name">'+date.info[i].nickname+'</span></div><div class="list-time">'+date.info[i].score+'"</div></li>')
								}else{
									$('.three-list').append('<li><div class="list-man"><span class="man-img"><img src="'+date.info[i].headimgurl+'" alt=""></span><span class="man-name">'+date.info[i].nickname+'</span></div><div class="list-time">'+date.info[i].score+'"</div></li>')
								}
							}
						}
						this_text = '重温经典系列No.1《平衡木》多年之后我仍能坚持'+date.my.score+'秒不倒，你呢？';
						// friend_text = '手指也有节奏，就怕你平衡不够···';
						// share_th();
					}else{
						alert('排行更新失败');
						$('.ajax-load').css({display:'none'});
					}
				},'json');
				clearTimeout(tt);
			},100)
		}else{
			alert('成绩上传失败');
			$('.ajax-load').css({display:'none'});
		}
	},'json');
	$(document).ajaxError(function(){
		$('.ajax-load').css({display:'none'});
	})
}
function onFrame(event){
	if(status == 0){

	} else if (status === 1) {
		if (event.delta > 5) {
			event.delta = 5
		}
		timerText.content = timer.toFixed(2);
		timerText.content += '"';
		if (timer > 20 && !centerLine.dashArray.length) {
			centerLine.dashArray = [1, 4];
		}
		if (timer > 30 && centerLine.visible) {
			centerLine.visible = false;
			pin.visible = false;
		}
		angleArc = angle / 180 * Math.PI;
		cos = Math.cos(angleArc);
		sin = Math.sin(angleArc);
		tan = Math.tan(angleArc);
		realBiasX = biasX * cos + sin * barHeight2 + sin * woodHeight2;
		realBiasY = woodHeight2 * cos - biasX * sin + barHeight2 * cos;
		wood.position = new Point(viewWidth2 + realBiasX, viewHeight2 - realBiasY);
		if (slideDown) {
			newBiasX = biasX + slideX * event.delta * slideFactor;
			if (newBiasX < barWidth2 && newBiasX > -barWidth2) {
				biasX = newBiasX
			}
		}
		timer += event.delta;
		alpha += event.delta * realBiasX * alphaFactor;
		omega += event.delta * alpha;
		if (omega < minOmega && omega > 0 && alpha < 0) {
			omega = minOmega;
		} else if (omega > -minOmega && omega < 0 && alpha > 0) {
			omega = -minOmega;
		}
		deltaAngle = event.delta * omega;
		angle += deltaAngle;
		rect.rotation = angle;
		wood.rotation = angle;
		// 小球旋转
		// if (slideDown) {
		// 	wood.rotate(wood.position.x*10)
		// } else {
			
		// }
		if (angle < -90 || angle > 90) {
			status = 2;
			ajax();
			endText();
		}
	}else if(status == 2){
		$('.Ebtn-right').click(function(){
			init();
		})
	} 
}
// loading加载
function preload(arr){
	var images = new Array();
	var loadimage = 0;
	function imgload(){
		loadimage ++;
		if(loadimage == arr.length){
			$('#loading').css({display:'none'});
    		$('.start').css({display:'block'});
		}
	}
	for (i = 0; i < arr.length; i++) {
        images[i] = new Image();
        images[i].src = arr[i];
    	images[i].onload = function(){
    		imgload();
    	}
    }
}
preload(
	['bar_game/images/again-bg.png',
	'bar_game/images/start-bg.png',
	'bar_game/images/body-bg.png',
	'bar_game/images/btn-left-bg.png',
	'bar_game/images/btn-right-bg.png',
	'bar_game/images/chengxian.png',
	'bar_game/images/start-btn-btn.png',
	'bar_game/images/ranking-btn-bg.png',
	'bar_game/images/rank_titbg.png'
	]
)