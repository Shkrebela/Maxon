// import Swiper, {Navigation, Pagination, Mousewheel} from 'swiper';
//
// Swiper.use([Navigation, Pagination, Mousewheel]);
//
// let swiperFirst;
// swiperFirst = new Swiper('.reviews__swiper-container', {
//     direction: 'horizontal',
//     slidesPerView: 1,
//     spaceBetween: 30,
//     mousewheel: true,
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
// });

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
    toggleClass(menuLink, 'menu-header__link--active-menu-toggle');
});

if (window.matchMedia("(max-width: 960px)").matches) {
    Array.from(menuLink).forEach(i => {
        i.addEventListener('click', () => {
            toggleClass(menuToggle, 'menu-toggle--active-menu-toggle');
            toggleClass(menu, 'main-header__menu--active-menu-toggle');
            toggleClass(body, 'body--stop-scrolling');
            toggleClass(menuLink, 'menu-header__link--active-menu-toggle');
        });
    });
}


