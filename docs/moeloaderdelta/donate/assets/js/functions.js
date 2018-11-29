$(window).load(function() {
  const C_colors = {
                link: '#007dd8',
                no1: '#c0f',
                no2: '#f00',
                no3: '#fb0'
              }

  $('#donatelist').hide();

  var $tags = $('.tag');
  $tags.sort(function(a,b){
    var aV = parseFloat($(a).find('.tag_count').attr('title'));
    var bV = parseFloat($(b).find('.tag_count').attr('title'));

    if(aV < bV)			return 1;
    else if(aV > bV)	return -1;
    else				return 0;
  });
  $tags.detach().appendTo('#donatelist');

  $('#donatelist').show();

  $tags.each(function(i) {
    setTimeout(function($tag) {
      $tag.css({ display: 'block', opacity: 0 }).stop().animate({ opacity: 1 }, 'easeInOutExpo');
      switch(i)
      {
        case 0: $tag.css({ color: C_colors.no1 }); break;
        case 1: $tag.css({ color: C_colors.no2 }); break;
        case 2: $tag.css({ color: C_colors.no3 }); break;
        default:
          $tag.not('[href=#]').css({ color: C_colors.link });
      }
    }, 32 * (i + 1), $(this));
  });
});
