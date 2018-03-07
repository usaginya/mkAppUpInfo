$(window).load(function() {
    
    $('.tag').each(function(i) {
    	setTimeout(function() {
    		$('.tag:eq('+i+')').css({ display: 'block', opacity: 0 }).stop().animate({ opacity: 1 }, 'easeInOutExpo'); 
    	}, 32 * (i + 1))
    });

	$('.tag').hover(function() {
		$(this).stop().animate({ paddingRight: ($('.tag_count', this).outerWidth() - 5), opacity: 1 }, 'easeInOutExpo');
	}, function() {
		$(this).stop().animate({ paddingRight: 5 }, 'easeInOutExpo');
	});
	

});
