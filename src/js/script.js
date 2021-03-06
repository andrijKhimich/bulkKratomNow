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
  console.log('home');
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
  showContent();

  $('.js-buy').click(function () {
    $('.buy-text__hidden').css('opacity', '1');
  });
  humburger.click(function () {
    if ($(this).hasClass('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  disclaimerBtn.click(function (e) {
    e.preventDefault();
    $('.disclaimer').fadeIn();
  });

  if ($('.inner-page').length > 0) {
    setTimeout(function () {
      setFixedHeader();
    }, 100);
  }

  $('.details-accordion__content').hide();
  $('.details-accordion__title').click(function (e) {
    if ($(this).hasClass('active')) {
      $(this).removeClass("active").closest('.details-accordion__box').find('.details-accordion__content').slideUp(400);
      $(this).find('.accordion-arrow').removeClass('active');
    } else {
      $(this).addClass("active").closest('.details-accordion__box').find('.details-accordion__content').slideDown(400);
      $(this).parent().siblings('.details-accordion__box').find('.details-accordion__title').removeClass("active");
      $(this).parent().siblings('.details-accordion__box').find('.accordion__content').slideUp(400);
      $(this).find('.accordion-arrow').addClass('active');
      $(this).parent().siblings('.details-accordion__box').find('.accordion-arrow').removeClass('active');
    }

    if (($('.sticky').length > 0) && $('.details-accordion__content').is(":visible")) {

      setTimeout(function () {

        let stickyEl = $('.sticky');
        let stickyStopEl = $('.sticky-stopper');
        let stickyStopElHEight = stickyStopEl.innerHeight();

        let generalSidebarHeight = stickyEl.innerHeight();
        let stickyTop = stickyEl.offset().top;
        let stickOffset = 0;
        let stickyStopPosition = stickyStopEl.offset().top;

        let stopPoint = stickyStopPosition - generalSidebarHeight - stickOffset;
        let diff = stopPoint + stickOffset - stickyStopElHEight - 100;

        console.log(stopPoint);
        $(window).scroll(function () {
          let windowTop = $(window).scrollTop();
          console.log(diff);
          if (stopPoint < windowTop) {
            stickyEl.css({
              position: 'absolute',
              top: diff,
              paddingTop: 0
            });
          } else if (stickyTop < windowTop + stickOffset) {
            stickyEl.css({
              position: 'fixed',
              top: stickOffset,
              paddingTop: 90
            });
          } else {
            stickyEl.css({
              position: 'absolute',
              top: 'initial',
              paddingTop: 0
            });
          }
        });
      }, 400);

    }
  });


  $('.checkout-tab').click(function () {
    $('.checkout__content').hide();
    $('.checkout-tab.active').removeClass('active');
    $(this).addClass('active');

    var panel = $(this).attr('href');
    $(panel).fadeIn(400);

    return false;

  });

  // FAQ page accordion
  $('.dashboard-form__accordion').hide();
  $('.dashboard-form__subtitle').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('accordion_active')) {
      $(this).removeClass("accordion_active").closest('.dashboard-form__content').find('.dashboard-form__accordion').slideUp(200);
      $(this).find('.plus').removeClass('active');
    } else {
      $(this).addClass("accordion_active").closest('.dashboard-form__content').find('.dashboard-form__accordion').slideDown(200);
      $(this).parent().siblings('.dashboard-form__content').find('.dashboard-form__subtitle').removeClass("accordion_active");
      $(this).find('.plus').addClass('active');
    }
  });



  showOnScroll($(window).scrollTop());

  if ($('.home-page').length > 0) {
    setHomeFixedHeader($(window).scrollTop());
  }

  if ($(window).width() <= 991) {
    header.removeClass("header_home js-show-onload js-show js-slideDown");
  } else {
    setHomeHeader();
  }


  $('.js-modal-target').click(function () {
    let elemSrc = $(this).data('src');
    let current = $('.modal[id="' + elemSrc + '"]').addClass('active');
    $('.overlay').addClass('active');
    $('.modal').not(current).removeClass('active');
    $('body').addClass('fixed');
  });

  $('.overlay, .js-return').click(function () {
    $('.overlay').removeClass('active');
    $('.modal').removeClass('active');
    $('body').removeClass('fixed');

  });

  $('.close-modal').click(function () {
    $(this).parent().parent('.modal').removeClass('active');
    $('.overlay').removeClass('active');
    $('body').removeClass('fixed');
  });

  $('.accordion__content').hide();
  $('.accordion-list li a').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('accordion_active')) {
      $(this).removeClass("accordion_active").closest('.accordion-list li').find('.accordion__content').slideUp(200);
      $(this).find('.accordion-arrow').removeClass('active');
    } else {
      $(this).addClass("accordion_active").closest('.accordion-list li').find('.accordion__content').slideDown(200);
      $(this).parent().siblings('.accordion-list li').find('.accordion-list li a').removeClass("accordion_active");
      $(this).parent().siblings('.accordion-list li').find('.accordion__content').slideUp(200);
      $(this).find('.accordion-arrow').addClass('active');
      $(this).parent().siblings('.accordion-list li').find('.accordion-arrow').removeClass('active');
    }
  });

  // Click function
  $('.collection-nav__link').click(function () {
    $('.collection-nav__link').removeClass('active');
    $(this).addClass('active');
    $('.collection__tab').hide();
    const activeTab = $(this).attr('href');
    // $(activeTab).css('display', 'flex');
    $(activeTab).fadeIn();

    return false;
  });

  $(window).on('mousemove', function (e) {

    let w = $(window).width();
    let h = $(window).height();
    let offsetX = 0.5 - e.pageX / w;
    let offsetY = 0.5 - e.pageY / h;

    $(".parallax").each(function (i, el) {
      let offset = parseInt($(el).data('speed'));
      let translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 0px)";

      $(el).css({
        '-webkit-transform': translate,
        'transform': translate,
        'moz-transform': translate
      });
    });

  });


  $(window).resize(function () {

    if ($('.home-page').length > 0) {
      if ($(window).width() <= 991) {
        header.removeClass("header_home js-show-onload js-show js-slideDown");
      } else {
        setHomeHeader();
      }
    }

  });


  const countInput = $('.js-count-input');
  let countInputVal = $('.js-count-input').val();
  const btnPlus = $('.js-plus');
  const btnMinus = $('.js-minus');

  btnPlus.click(function () {
    countInputVal++;
    console.log(countInputVal);
    countInput.val(countInputVal);
  });

  btnMinus.click(function () {
    if (countInputVal > 0) {
      countInputVal--;
      countInput.val(countInputVal);
    }
  });

});

$('.sort-select').niceSelect();
$('.card-select').niceSelect();
$('.custom-select').niceSelect();


$(window).scroll(function () {

  const scrollValue = $(this).scrollTop();
  showOnScroll(scrollValue);

  scrollValue >= 1 ? closeMenu() : null;


  if ($('.home-page').length > 0 && ($(window).width() > 991)) {
    setHomeFixedHeader(scrollValue);
  }

});

$('.details-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  dots: true,
  arrows: false,
  infinite: true,
  fade: true,
  speed: 1000,
  cssEase: 'linear',
  autoplaySpeed: 10000
});

svg4everybody();

function testWebP(callback) {
  let webP = new Image();
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