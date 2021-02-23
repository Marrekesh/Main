$('.carousel__inner').slick({
    slidesToShow: 1,
    adaptiveHeight: true,
    prevArrow: `<button type="button" class="slick-prev"><img src="icon/chevron_left_solid_980.png"></img></button>`,
    nextArrow: '<button type="button" class="slick-next"><img src="icon/chevron_right_solid_982.png"></button>',
    
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__items').removeClass('catalog__items_active').eq($(this).index()).addClass('catalog__items_active');
});
