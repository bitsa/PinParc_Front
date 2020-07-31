setTimeout(() => {
  (function ($) {
    $(function () {
      $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
        $(this)
          .addClass('active')
          .siblings()
          .removeClass('active')
          .closest('div.tabs')
          .find('div.tabs__content')
          .removeClass('active')
          .eq($(this).index())
          .addClass('active');
      });
    });
  })(jQuery);
  
//   $('.form .form__field input').focus(function () {
//     $('.keyboard').addClass('keyboard--visible');
//   });
  
  $('.toggle-tabs__btn').click(function () {
    $(this).siblings().removeClass('toggle-tabs__btn--active');
    $(this).addClass('toggle-tabs__btn--active');
  });
  
  $('.burger').click(function () {
    $('.menu').addClass('is-visible');
  });
  
  $('.menu__btn').click(function () {
    $('.menu').removeClass('is-visible');
  });
  
  $('.dialog__star').click(function () {
    $(this).addClass('is-selected');
    $(this).prevAll().addClass('is-selected');
    $(this).nextAll().removeClass('is-selected');
  });
  
}, 3000);


