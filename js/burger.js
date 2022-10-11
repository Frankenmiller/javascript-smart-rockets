window.onload = function () {
    const menu_button = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_button.addEventListener('click', function () {
        menu_button.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });
}