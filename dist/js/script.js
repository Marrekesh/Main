$(document).ready(function(){
  $('.carousel__inner').slick({
      slidesToShow: 1,
      adaptiveHeight: true,
      prevArrow: `<button type="button" class="slick-prev"><img src="icon/chevron_left_solid_980.png"></img></button>`,
      nextArrow: '<button type="button" class="slick-next"><img src="icon/chevron_right_solid_982.png"></button>',
      responsive: [
        {
            breakpoint: 992,
            settings: {
                dots: true,
                arrows: false
            }
        }
    ]  
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__items').removeClass('catalog__items_active').eq($(this).index()).addClass('catalog__items_active');
    });

    function toggleSlide(item) {
      $(item).each(function(i) {
          $(this).on('click', function(e) {
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
      });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    function validateForms(form) {
      $(form).validate ({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, укажите ваше имя",
            minlength: jQuery.validator.format("Введите {0} символа!")
            }, 
          phone: "Пожалуйста введите свой телефон",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введен адрес почты"
          }
        },
      });
    };

    validateForms('#feed-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $(`#consultation, #order`).fadeOut();
        $(`.overlay, #thanks`).fadeIn(`slow`);
        $('form').trigger('reset');
      });
      return false
    });

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $(`.pageup`).fadeIn();
      } else {
        $(`.pageup`).fadeOut();
      }
    });

    new WOW().init();

});
