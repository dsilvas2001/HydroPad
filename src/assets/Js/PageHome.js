// const menu = document.querySelector('.nav__menu');
// const menuList = document.querySelector('.nav__list');
// const links = document.querySelectorAll('.nav__link');

// const modal = document.querySelector('.modal');
// const modalButtonClose = document.querySelector('.modal__close');

// menu.addEventListener('click', function () {
//     menuList.classList.toggle('nav__list--show');
// });

// links.forEach(function (link) {
//     link.addEventListener('click', function () {
//         menuList.classList.remove('nav__list--show');
//     });
// });

// // MODAL

// // Se ejecuta cuando se carga el DOM
// document.addEventListener('DOMContentLoaded', () => {
//     modal.classList.add('modal--visible');
//     modalButtonClose.addEventListener('click', () => {
//         modal.classList.remove('modal--visible');
//     });
// });


const navButton = document.querySelector('.nav__button');
const navMenu = document.querySelector('.nav__container');
const tabButttons = document.querySelectorAll('.features__tab');

const clickQuestions = document.querySelectorAll('.article__question');

navButton.addEventListener('click', () => {

    const navLogo = document.querySelector('.nav__logo');

    navMenu.classList.toggle('nav__container--active');

    if (navMenu.classList.contains('nav__container--active')) {

        navLogo.setAttribute('src', '../img/icono.png');
        navButton.setAttribute('src', '../img/icono.png');

    } else {

        navLogo.setAttribute('src', '../img/icono.png');
        navButton.setAttribute('src', '../img/icono.png');

    }
});

const removeActiveElements = (selector) => {
    const elementsActive = document.querySelectorAll(`.${selector}`);

    if (elementsActive.length) {

        elementsActive.forEach(elementActive => {
            elementActive.classList.remove(selector);
        });

    }
}

tabButttons.forEach(tabButton => {
    tabButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (!tabButton.classList.contains('features__tab--active')) {

            const articleNumber = tabButton.getAttribute('data-article');

            const articleShow = document.querySelector(`.features__article:nth-of-type(${articleNumber})`);

            console.log(articleNumber);

            removeActiveElements('features__article--active');
            removeActiveElements('features__tab--active');


            articleShow.classList.add('features__article--active');
            tabButton.classList.add('features__tab--active');

        }
    })
});

clickQuestions.forEach(clickQuestion => {
    clickQuestion.addEventListener('click', () => {

        const arrow = clickQuestion.children[0];
        arrow.classList.toggle('article__arrow--rotate');

        const anwserContainer = clickQuestion.nextElementSibling;

        anwserContainer.classList.toggle('article__content--show');

    });
});

window.addEventListener('resize', () => {
    const isMenuActive = document.querySelector('.nav__container--active');

    if (isMenuActive) {
        const navLogo = document.querySelector('.nav__logo');

        navMenu.classList.remove('nav__container--active');
        navLogo.setAttribute('src', '../img/icono.png');
        navButton.setAttribute('src', '../img/icono.png');

    }
});

