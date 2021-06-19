// Gestione dello slider image utilizzando il framewor swiper.js di Framework 7
let swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    centeredSlides: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


// Gestione dello sfondo allo scorrimento con jquery
$(window).scroll(function () {
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 50)
})


