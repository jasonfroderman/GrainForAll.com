$(function(){

	// Fade to a new page.
	$('.menu-link').click(function(e){
		e.preventDefault();

		var link = $(this).attr('href');
		$('.fade-overlay').addClass('active');		

		setTimeout(function(){
			window.location.href = link;
		}, 800);
	});

	// Fade in body trigger when scrolled to top of page.
	$(window).scroll(function() {

		// Touch devices
		if ($('html').hasClass('touch')) {

			if (window.pageYOffset <= $('section.nav-hero').height()) {
				if ($('.nav-trigger-body-wrapper').hasClass('active')) {
					$('.nav-trigger-body-wrapper').removeClass('active');
					
					setTimeout( function() {
						$('.nav-trigger-body-wrapper').css('visibility', 'hidden');
					}, 400 );
				}
			} else {
				// $('.nav-trigger-body-wrapper').css('top', $(window).scrollTop() + 'px');
				if (!$('.nav-trigger-body-wrapper').hasClass('active')) {
					$('.nav-trigger-body-wrapper').addClass('active');
					$('.nav-trigger-body-wrapper').css('visibility', 'visible');
				}
			}

		}

		// Non-touch devices
		else {

			if (window.pageYOffset <= $('section.nav-hero').height()) {
				if ($('.nav-trigger-body-wrapper').hasClass('active')) {
					$('.nav-trigger-body-wrapper').removeClass('active');
					$('.nav-trigger-body-wrapper').css({
						'position': 'absolute',
						'top': $('section.nav-hero').height() + 'px'
					});

					setTimeout( function() {
						$('.nav-trigger-body-wrapper').css('visibility', 'hidden');
					}, 400 );
					
				}
			} else {
				// $('.nav-trigger-body-wrapper').css('top', $(window).scrollTop() + 'px');
				if (!$('.nav-trigger-body-wrapper').hasClass('active')) {
					$('.nav-trigger-body-wrapper').addClass('active');
					$('.nav-trigger-body-wrapper').attr('style', '');
					$('.nav-trigger-body-wrapper').css('visibility', 'visible');
				}
			}

		}
	});

});
