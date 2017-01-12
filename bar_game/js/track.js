$(function(){
   	function trackEvent(category,action,opt_label,opt_value){
        _hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
        ga('send', 'event', category, action, opt_label, opt_value);
   	}
	$('.start-left').on('touchstart',function(){
		trackEvent('平衡木游戏推广','开始游戏');
	})
	$('.start-right').on('touchstart',function(){
		trackEvent('平衡木游戏推广','排行榜-首页','打开排行榜');
	})
	$('.close-Rankt').on('touchstart',function(){
		trackEvent('平衡木游戏推广','排行榜-首页','关闭排行榜');
	})
	$('.Ebtn-left').on('touchstart',function(){
		trackEvent('平衡木游戏推广','游戏结束-分享');
	})
	$('.Ebtn-right').on('touchstart',function(){
		trackEvent('平衡木游戏推广','游戏结束-重来');
	})
	$('.Ebtn-center').on('touchstart',function(){
		trackEvent('平衡木游戏推广','游戏结束-排行榜');
	})

	$('.end-banner').on('touchstart',function(){
		trackEvent('平衡木游戏推广','结果页广告-聚能充','打开');
	})
	$('.end-banner1').on('touchstart',function(){
		trackEvent('平衡木游戏推广','结果页广告-万达店开业','打开');
	})
	$('.close-endbanner').on('touchstart',function(){
		trackEvent('平衡木游戏推广','结果页广告-聚能充','关闭');
	})
	$('.close-endbanner1').on('touchstart',function(){
		trackEvent('平衡木游戏推广','结果页广告-万达店开业','关闭');
	})

	$('.start-footer').on('touchstart',function(){
		trackEvent('平衡木游戏推广','底部广告-聚能充','打开');
	})
	$('.start-footer1').on('touchstart',function(){
		trackEvent('平衡木游戏推广','底部广告-万达店开业','打开');
	})
	$('.close-start-footer').on('touchstart',function(){
		trackEvent('平衡木游戏推广','底部广告-聚能充','关闭');
	})
	$('.close-start-footer1').on('touchstart',function(){
		trackEvent('平衡木游戏推广','底部广告-万达店开业','关闭');
	})

	$('.close-down').on('touchstart',function(){
		trackEvent('平衡木游戏推广','关闭广告-聚能充');
	})
	$('.close-Adver').on('touchstart',function(){
		trackEvent('平衡木游戏推广','关闭广告-万达店开业');
	})

	$('.code-left .downbtn').on('touchstart',function(){
		trackEvent('平衡木游戏推广','点击下载APP');
	})
	$('.Adver-box').on('touchstart',function(){
		trackEvent('平衡木游戏推广','点击万达开业广告');
	})
	// 识别二维码
	var tou_falg = false;
	$('.rank-baer-open>img').on('touchstart',function(){
		tou_falg = true;
		var t = setTimeout(function(){
			if(tou_falg){
				trackEvent('平衡木游戏推广','长按二维码');
				clearTimeout(t);
			}
		},750)
	})
	$('.rank-baer-open>img').on('touchend',function(){
		tou_falg = false;
	})
})