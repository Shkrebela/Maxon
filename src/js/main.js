
@@include('../../node_modules/swiper/swiper-bundle.js')

// import Swiper, {Navigation, Pagination, Mousewheel} from 'swiper';
//
// Swiper.use([Navigation, Pagination, Mousewheel]);

let swiperFirst;
swiperFirst = new Swiper('.testimonials__swiper-container', {
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

//mobil button
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

if (window.matchMedia("(max-width: 960px)").matches) {
    Array.from(menuLink).forEach(i => {
        i.addEventListener('click', () => {
            toggleClass(menuToggle, 'menu-toggle--active-menu-toggle');
            toggleClass(menu, 'main-header__menu--active-menu-toggle');
            toggleClass(body, 'body--stop-scrolling');
       });
    });
}


