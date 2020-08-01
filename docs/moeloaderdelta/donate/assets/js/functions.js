$(window).load(function() {
    DonateBtnBind();

    const C_colors = {
        link: '#007dd8',
        no1: '#c0f',
        no2: '#f00',
        no3: '#fb0'
    }

    $('#donatelist').hide();

    var $tags = $('.tag');
    $tags.sort(function(a, b) {
        var aV = parseFloat($(a).find('.tag_count').attr('title'));
        var bV = parseFloat($(b).find('.tag_count').attr('title'));

        if ($(a).find('.tag_name').text() == "[匿名]" || $(a).find('.tag_name').text() == "[匿名]")
            return 0;
        else if (aV < bV)
            return 1;
        else if (aV > bV)
            return -1;
        else
            return 0;
    });
    $tags.detach().appendTo('#donatelist');

    $('#donatelist').show();

    $tags.each(function(i) {
        setTimeout(function($tag) {
            $tag.css({
                display: 'block',
                opacity: 0
            }).stop().animate({
                opacity: 1
            }, 'easeInOutExpo');
            switch (i) {
            case 0:
                $tag.css({
                    color: C_colors.no1
                });
                break;
            case 1:
                $tag.css({
                    color: C_colors.no2
                });
                break;
            case 2:
                $tag.css({
                    color: C_colors.no3
                });
                break;
            default:
                $tag.not('[href=#]').css({
                    color: C_colors.link
                });
            }
        }, 32 * (i + 1), $(this));
    });
});

function DonateBtnBind() {
    var isBtnChecked = false;
    var animateButton = function(e) {
        isBtnChecked = true;
        e.preventDefault;
        e.target.classList.add('animate');
    };

    var classname = document.getElementsByClassName("donate-button");
    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', animateButton, false);
        classname[i].addEventListener("webkitAnimationEnd", function() {
			if(!isBtnChecked){return;}
            this.classList.remove('animate');
			window.open('https://share.weiyun.com/5IM6kEa');
        }, false);
    }
}
