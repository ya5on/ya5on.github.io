AOS.init({
    once: true,
});
window.addEventListener('load', AOS.refresh);

$(".header").headroom();

$(document).ready(function () {

    //sidenav
    $('.header__menu-btn').on('click', function () {
        $('.header__side-menu').addClass('active')
        $('.overlay').removeClass('hidden')
        $('body').addClass('lock')
    })

    $('.header__side-menu').on('click', function (e) {
        if ($(e.target).is('.btn-close')) {
            e.preventDefault();
            $(this).removeClass('active')
            $('body').removeClass('lock')
            $('body').removeClass('locked')
            $('.overlay').addClass('hidden')
        }
    });

    $(document).mouseup(function (e) {
        let popup = $(".header__side-menu");
        if (!$('.popup').is(e.target) && !popup.is(e.target) && popup.has(e.target).length === 0) {
            e.preventDefault();
            $(popup).removeClass('active')
            $('body').removeClass('lock')
            $('body').removeClass('locked')
            $('.overlay').addClass('hidden')
        }
    });

    $('.header__sub-menu--btn').on('click', function () {
        $('.header__sub-menu--btn i').toggleClass('fa-plus fa-minus')
        $('.header__sub-menu').toggleClass('init')
    })

    //modals
    //   open
    $('button').click(function (e) {
        e.preventDefault()
        $('#modal'+$(this).attr('class')).removeClass('hidden')
        $('body').addClass('locked')
        if ($('.pre-popup').offsetHeight < 800) {
            $('#modal'+$(this).attr('class')).addClass('align-center')
        }
    })
    //close
    $('.modal-container').on('click', function (e) {
        e.preventDefault()
        if ($(e.target).is('.btn-close')) {
            $('.modal-container').addClass('hidden').removeClass('align-center')
            $('body').removeClass('locked')
        }
    });
    //close click outside
    $(document).mouseup(function(e)
    {
        let container = $(".modal-container");
        if (container.is(e.target) && container.has(e.target).length === 0)
        {
            $('.modal-container').addClass('hidden').removeClass('align-center')
            $('body').removeClass('locked')
        }
    });

    //btn to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });

    // scroll to------------------
    $('.header__sub-menu li a').on('click', function () {
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top - 0
        }, 600);
    });

    // $('.number').counterUp({
    //     delay: 100,
    //     time: 1100
    // })
})
