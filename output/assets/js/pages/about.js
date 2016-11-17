var initialized = false;

$(function(){
	$('body').removeClass('pre-load');

	// Initializing full-screen video.

	if (App.viewport !== 'small') {
		initializeFullScreenVideo();
	}

	setTimeout(function(){
		$('.main-content-wrapper').addClass('ready');
		$('body').css('overflow', 'auto');
		$('.st-content').css('overflow', 'auto');

	}, 450);

	$(window).resize(function(){
		if (App.viewport !== 'small') {
			initializeFullScreenVideo();
		}
	});
	
});

$(window).scroll(function(){

	if (App.viewport !== 'small') {

		var video = document.getElementById('about-video');
		if (elementIsInViewport(document.getElementById('about-video-wrapper'))) {
		
			video.play();
			$(video).stop().animate({volume: 0}, 200);

		} else {


			$(video).stop().animate({volume: 0}, 1000, function(){
				video.pause();	
			});
		}
	}
});




function initializeFullScreenVideo() {
	if (!initialized) {
		var min_w = 300;
		var vid_w_orig;
		var vid_h_orig;

		vid_w_orig = parseInt($('#about-video').attr('width'), 10);
		vid_h_orig = parseInt($('#about-video').attr('height'), 10);



		$(window).resize(function () { resizeVideoToCover(vid_w_orig, vid_h_orig, min_w); });
		$(window).trigger('resize');

		initialized = true;
	}
}

function resizeVideoToCover(vid_w_orig, vid_h_orig, min_w){
	// set the video viewport to the window size
	$('.video-wrapper').width($(window).innerWidth());
	$('.video-wrapper').height($(window).innerHeight());

	// use largest scale factor of horizontal/vertical
	var scale_h = $(window).width() / vid_w_orig;
	var scale_v = $(window).height() / vid_h_orig;
	var scale = scale_h > scale_v ? scale_h : scale_v;

	// don't allow scaled width < minimum video width
	if (scale * vid_w_orig < min_w) {
		scale = min_w / vid_w_orig;
	}

	// now scale the video
	$('#about-video').width(scale * vid_w_orig);
	$('#about-video').height(scale * vid_h_orig);
}

function elementIsInViewport(el) {
	var top = el.offsetTop;
	var left = el.offsetLeft;
	var width = el.offsetWidth;
	var height = el.offsetHeight;


	while(el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
		left += el.offsetLeft;
	}

	return (
		top < (window.pageYOffset + window.innerHeight) &&
		left < (window.pageXOffset + window.innerWidth) &&
		(top + height) > window.pageYOffset &&
		(left + width) > window.pageXOffset
	);
}