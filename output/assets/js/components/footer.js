function _resizeFooterBoxes() {
	// Find max height of footer boxes.
	var max_height = 0;

	$('.footer-box').each(function() {
		if ($(this).outerHeight() > max_height) {
			max_height = $(this).outerHeight();
		}
	});

	// Set the height equal for all elements.
	$('.footer-box').each(function() {
		$(this).outerHeight(max_height);
	});
}


window.onload = function() {
	_resizeFooterBoxes();

	$(window).resize(function() {
		$('.footer-box').each(function() {
			$(this).attr('style',  '');
		});

		_resizeFooterBoxes();
	});
	
};

