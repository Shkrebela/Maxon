//Slider
(() => {
    @@include('../../node_modules/swiper/swiper-bundle.js')

    let swiper;
    swiper = new Swiper('.testimonials__swiper-container', {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
})();

//mobil button
(() => {
    let menuToggle = document.getElementById('menu-toggle');
    let menu = document.querySelector('.main-header__menu');
    let body = document.querySelector('.body');
    let menuLink = document.getElementsByClassName('main-header__link');

    function toggleClass(el, className) {
        el.classList.toggle(className);
    }

    menuToggle.addEventListener('click', () => {
        toggleClass(menuToggle, 'menu-toggle--active-menu-toggle');
        toggleClass(menu, 'main-header__menu--active-menu-toggle');
        toggleClass(body, 'body--stop-scrolling');
    });

    for (let i = 0; i < menuLink.length; i++) {
        menuLink[i].addEventListener('click', () => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                toggleClass(menuToggle, 'menu-toggle--active-menu-toggle');
                toggleClass(menu, 'main-header__menu--active-menu-toggle');
                toggleClass(body, 'body--stop-scrolling');
            }
        });
    }
})();

//button up
(() => {
    let arrowUp = document.querySelector('.arrow-up');

    window.addEventListener('scroll', function () {
        if (pageYOffset > 300) {
            arrowUp.classList.remove("arrow-up--none")
        } else {
            arrowUp.classList.add("arrow-up--none")
        }
    });
})();
