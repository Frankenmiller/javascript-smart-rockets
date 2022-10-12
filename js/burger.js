window.onload = function () {
    const menu_button = document.querySelector('.hamburger-right');
    const mobile_menu = document.querySelector('.mobile-nav-right');
    const social_button = document.querySelector('.hamburger-left');
    const social_menu = document.querySelector('.mobile-nav-left');

    menu_button.addEventListener('click', function () {
        menu_button.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });

    social_button.addEventListener('click', function () {
        social_button.classList.toggle('is-active');
        social_menu.classList.toggle('is-active');
    });
}