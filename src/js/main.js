$(document).ready(function () {
    $('.header__menu-btn').on('click', function (e) {
        $('.header__side-menu').addClass('active')
        $('.overlay').removeClass('hidden')
    })

    $('.header__side-menu').on('click', function (e) {
        if ($(e.target).is('.btn-close')) {
            e.preventDefault();
            $(this).removeClass('active')
            $('.overlay').addClass('hidden')
        }
    });

    $(document).mouseup(function (e) {
        let popup = $(".header__side-menu");
        if (!$('.popup').is(e.target) && !popup.is(e.target) && popup.has(e.target).length === 0) {
            e.preventDefault();
            $(popup).removeClass('active')
            $('.overlay').addClass('hidden')
        }
    });

    $('.header__sub-menu--btn').on('click', function (e) {
        $('.header__sub-menu--btn i').toggleClass('fa-plus fa-minus')
        $('.header__sub-menu').toggleClass('init')
    })

    $('.number').counterUp({
        delay: 100,
        time: 1100
    })
})
