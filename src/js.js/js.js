// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1300,
//         adaptiveHeight: true,
//         // prevArrow: '<button  class="slick-prev"><img src="image/slider/arrows/chevron-left-solid.png"></button>',
//         // nextArrow: '<button  class="slick-next"><img src="image/slider/arrows/chevron-right-solid.png"></button>',
//         responsive: [
//             {
//               breakpoint: 992,
//               settings: {
//                 dots: true,
//                 arrows:false
//               }
//             }],
//         controls: false
//     });
//   });
// const slider = tns({
//     container:'.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     autoplay:false,
//     controls:false,
//     nav: false
// })
// document.querySelector('.prev').addEventListener('click',function(){
//     slider.goTo('prev')
// })
// document.querySelector('.next').addEventListener('click', function(){
//     slider.goTo('next')
// })
// (function($) {
//     $(function() {
      
//       $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
//         $(this)
//           .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
//           .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
//       });
      
//     });
//     })(jQuery);
$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    prevArrow:
      '<button type="button" class="slick-prev"><img id="slick" src="../image/slider/arrows/chevron-left-solid.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img id="slick" src="../image/slider/arrows/chevron-right-solid.png"></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
    ],
  });

  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );
  function toggleSlide(item){
    $(item).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog__item__content').eq(i).toggleClass('catalog__item__content_active');
        $('.catalog__item__list').eq(i).toggleClass('catalog__item__list_active')
      })
    })
  }
toggleSlide('.catalog__item__link');
toggleSlide('.catalog__item__back');



//modal window




$('[data-modal=consultation]').on('click', function(){
  $('.overlay, #consultation').fadeIn('slow');
});
$('.modal__close').on('click', function(){
  $('.overlay, #consultation, #thanks, #order').fadeOut('slow')
});

$('.button_mini').each(function(i){
  $(this).on('click', function(){
    $('#order .modal__descr').text($('.catalog__item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn('slow')
  })
})

function validateForms(form){
  $(form).validate({
    rules:{
      name: {
        required: true,
        minlength: 2
      },
      phone: 'required',
      email: {
        required: true,
        email: true
      }
    },
    messages:{
      name:{
        required:'Будь ласка введіть своє імя',
        minlength: jQuery.validator.format('Введіть будь ласка {4} символов')
      },
      phone: 'Будь ласка введіть свій номер телефону',
      email:{
        required:'Будь ласка введіть свою почтову скриньку',
        email:"Не корректно ввели свої почтові данні"
    }
      
    }
});

}
validateForms('#order form');
validateForms('#consultation-form');
validateForms('#consultation form')


$('input[name=phone]').mask('+38 (___) ___-__-__')

$('form').submit(function(e){
  e.preventDefault();

  if(!$(this).valid()){
    return;
  }
  $.ajax({
    type: 'POST',
    url: 'mailer/smart.php',
    data: $(this).serialize()
  }).done(function(){
    $(this).find('input').val('');
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow')

    $('form').trigger('reset');
  })
  return false;
});


//smooth scroll page up


$(window).scroll(function(){
  if($(this).scrollTop()>1600){
    $('.pageUp').fadeIn();
  }else{
    $('.pageUp').fadeOut();
  }
});
$('a[href=#up]').click(function(){
  const _href =$(this).attr('href');
  $('html, body').animate({scrollTop:$(_href).offset().top+'px'});
  return false;
})
new WOW().init();
});


