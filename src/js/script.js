const humburger = $(".js-burger");
const headerMenu = $(".header-row");
const scrollBtn = $(".scroll-btn");
const header = $(".header");
const logoImg = $(".logo img");
const mainWrapper = $('.main-wrapper');
const disclaimerBtn = $('.disclaimer-link');



function setFixedHeader() {
  header.removeClass("header_home js-show-onload js-show js-slideDown");
}

function setHomeHeader() {
  header.addClass("header_home");
}

function setHomeFixedHeader(scrollValue) {
  let headerStartPosition = $("#hero").height();
  let windowPos = $(window).scrollTop() + $(window).height() / 2.4;
  if (headerStartPosition < windowPos) {
    setFixedHeader();
  } else {
    setHomeHeader();
  }
}

function showOnScroll(scrollValue) {
  $('.js-scroll').each(function () {
    let elem = $(this);
    let sectionPos = elem.offset().top;
    let windowPos = $(window).scrollTop() + $(window).height() / 1.2;
    if (sectionPos < windowPos) {
      elem.removeClass('js-fadeIn js-slideLeft js-slideRight js-slideTop');
    }
  });
}

function openMenu() {
  humburger.addClass('active');
  headerMenu.addClass('active');
}

function closeMenu() {
  humburger.removeClass('active');
  headerMenu.removeClass('active');
}

function showContent() {
  $(mainWrapper).removeClass('js-fadeIn');
  setTimeout(function () {
    $('.js-show-onload').each(function () {
      let elem = $(this);
      elem.removeClass('js-fadeIn js-slideLeft js-slideRight js-slideTop js-slideDown');
    });
  }, 800);
}

$(document).ready(function () {

  if ($('.inner-page').length > 0) {
    setFixedHeader();
  } else {
    setHomeHeader();
  }
  showContent();


  disclaimerBtn.click(function (e) {
    e.preventDefault();
    $('.disclaimer').fadeIn();
  });

  // if ($(window).width() < 991) {
  //   console.log('start');
  //   // header.removeClass('heade_home');
  //   setFixedHeader();
  // }
  humburger.click(function () {
    if ($(this).hasClass('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  $(window).on('mousemove', function (e) {
    var w = $(window).width();
    var h = $(window).height();
    var offsetX = 0.5 - e.pageX / w;
    var offsetY = 0.5 - e.pageY / h;

    $(".parallax").each(function (i, el) {
      var offset = parseInt($(el).data('speed'));
      var translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 0px)";

      $(el).css({
        '-webkit-transform': translate,
        'transform': translate,
        'moz-transform': translate
      });
    });
  });


  showOnScroll($(window).scrollTop());
  setHomeFixedHeader($(window).scrollTop());

  if ($(window).width() <= 991) {
    header.removeClass("header_home js-show-onload js-show js-slideDown");
  } else {
    setHomeHeader();
  }

  $(window).resize(function () {
    if ($(window).width() <= 991) {
      header.removeClass("header_home js-show-onload js-show js-slideDown");
    } else {
      setHomeHeader();
    }
  });
});

// slow scroll to id

//   scrollBtn.click(function (e) {
//     e.preventDefault();
//     let link = $($(this).attr('href'))
//     $('html, body').animate({
//       scrollTop: link.offset().top
//     }, 1000);
//   });



$(window).scroll(function () {
  const scrollValue = $(this).scrollTop();
  showOnScroll(scrollValue);

  scrollValue >= 1 ? closeMenu() : null;
  if ($(window).width() > 991) {
    setHomeFixedHeader(scrollValue);
  }


  // let windowPos = $(window).scrollTop() + $(window).height() / 1.2;
  // console.log(windowPos)
  // if (scrollValue > windowPos) {
  //   header.addClass('header_home');
  // } else {
  //   header.removeClass('header_home');
  // }
});

// $('.home-slider').slick({
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   dots: true,
//   arrows: false,
//   infinite: true,
//   fade: true,
//   speed: 1000,
//   cssEase: 'linear',
//   autoplaySpeed: 10000
// });
// $('.testimonials-slider__wrapper').slick({
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   dots: true,
//   arrows: false,
//   infinite: true,
//   fade: true,
//   speed: 1000,
//   cssEase: 'linear',
//   autoplaySpeed: 10000,
//   arrows: true,
//   prevArrow: $('.testimonials-slider_prev'),
//   nextArrow: $('.testimonials-slider_next')
// });
// });
svg4everybody();

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});