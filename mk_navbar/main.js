const toggleBtn = document.querySelector('.toggleBnt');
const menu = document.querySelector('.navmenu');
const icons = document.querySelector('.navicons');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    icons.classList.toggle('active');
});
