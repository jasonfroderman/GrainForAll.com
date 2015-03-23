var watchBuffer;

$(function(){

	// Force page to load at the top.
	$(document).scrollTop(0);
	$(window).on('beforeunload', function() {
		$(window).scrollTop(0);
	});

	// Initializing full-screen video.
	var width = $(window).innerWidth();
	var height = $(window).innerHeight();

	var min_w = 300;
	var vid_w_orig;
	var vid_h_orig;

	vid_w_orig = parseInt($('#home-video').attr('width'), 10);
	vid_h_orig = parseInt($('#home-video').attr('height'), 10);

	$(window).resize(function () { resizeVideoToCover(vid_w_orig, vid_h_orig, min_w); });
	$(window).trigger('resize');


	watchBuffer = setInterval(checkVideoProgress, 200);

	$(window).load(function(){
		equalizeServiceBoxHeights();
	});


	// Attach scroll function to 'Explore' hero button.
	$(document).on('click', '.home-hero-explore-wrapper a.button', function() {
		$('html, body').animate({
			scrollTop: $('section.home-hero-section').height()
		}, 800, 'easeOutQuart');
	});

	// User has clicked submit on the subscribe button.
	$(document).on('click', '#subscribe-submit', function() {
		subscribeUser();
	});

	$('form.subscribe').submit(function(e){
		e.preventDefault();
		subscribeUser();
	});

	// Get latest tweet.
	$.getJSON('http://grain-api.herokuapp.com/recent-tweets?callback=?', function(data) {
		if (data.tweet) $('#latest-tweet').html(data.tweet);
	});

});

function checkVideoProgress() {
	if (window.App.viewport === 'small' || window.App.viewport === 'medium') {
		showContent();
		clearInterval(watchBuffer);
	} else {

		$html5Video = $('#home-video');

		if ($html5Video[0].readyState === 4) {
			showContent();
			clearInterval(watchBuffer);
		}
	}
}

function showContent() {

	if (window.App.viewport === 'small' || window.App.viewport === 'medium') {
		$('.main-content-wrapper').addClass('ready');
		$('.dark-background').css('z-index', '-1');
		setTimeout(function(){
			$('body').css('overflow', 'auto');
			$('.st-content').css('overflow', 'auto');
		}, 550);
		$('.inner-content-wrapper').addClass('ready');
	} else {
		setTimeout(function(){
			$('body').removeClass('pre-load');
			$('.main-content-wrapper').addClass('ready');
			$('.dark-background').css('z-index', '-1');

			setTimeout(function(){
				$('body').css('overflow', 'auto');
				$('.st-content').css('overflow', 'auto');
			}, 550);

			setTimeout(function(){
				$('.home-hero-section .video-wrapper-overlay').addClass('ready');
				$('.home-hero-wrapper .inner-content-wrapper').addClass('ready');
			}, 2500);

		}, 2000);
	}

}

/**
 * Update any components on resize.
 */
$(window).resize(function() {
	equalizeServiceBoxHeights();
});

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
	$('#home-video').width(scale * vid_w_orig);
	$('#home-video').height(scale * vid_h_orig);
}

function equalizeServiceBoxHeights() {

	// Reset the height.
	$('.home-services-box').each(function() {
		$(this).css('height', 'auto');
		$(this).css('padding-bottom', '0');
	});


	if (window.App.viewport !== 'small') {
		var maxHeight = 0;
		$('.home-services-box').each(function() {
			var boxHeight = $(this).find('.content-wrapper').height();
			if (boxHeight > maxHeight) {
				maxHeight = boxHeight;
			}
		});


		$('.home-services-box').each(function(){
			$(this).css('height', (maxHeight + parseInt($(this).find('.measure').css('margin-top'), 10)) + 'px');
		});
	} else {
		$('.home-services-box').each(function(){
			$(this).find('.content-wrapper').css('margin-bottom', $(this).find('.measure').css('margin-top'));
		});
	}
}


function subscribeUser() {

	var email = $('form.subscribe').find('#email-input').val();

	$('#subscribe-form-status').removeClass('active');

	$.getJSON('http://grain-api.herokuapp.com/mailchimp-subscribe?email=' + email + '&callback=?', function(data) {
		if (data.code == 200) {
			$('#subscribe-form-status').html('Thanks for registering - a confirmation email has been sent');
		}
		else if (data.code == -100) {
			$('#subscribe-form-status').html('Invalid email address');
		}
		else if (data.code == 214) {
			$('#subscribe-form-status').html('This email address is already subscribed');
		}
		else {
			$('#subscribe-form-status').html('Error subscribing');
		}

		$('#subscribe-form-status').addClass('active');
	});
}
