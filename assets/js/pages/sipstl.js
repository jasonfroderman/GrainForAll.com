$(function(){
    $('body').removeClass('pre-load');

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
