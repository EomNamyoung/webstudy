'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarheight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarheight){
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});


//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event)=> {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

//navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', ()=> {
    navbarMenu.classList.toggle('open');
});




//Handle click on "contact me" button on home
const contactbtn = document.querySelector('.home_contact');
contactbtn.addEventListener('click', (event)=> {
    scrollIntoView('#contact');
});

//Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=>{
    home.style.opacity = 1- window.scrollY / homeHeight;
});


//Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up')
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight/2){
        arrowUp.classList.add('visible')
    } else {
        arrowUp.classList.remove('visible');
    }
});

//Handle click on the "arrow up"button
arrowUp.addEventListener('click', () =>{
    scrollIntoView('#home');
}); 




//Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project')

workBtnContainer.addEventListener('click', (e)=> {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }


    //Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target: e.target.parentNode;
    target.classList.add('selected');
    projectContainer.classList.add('anim-out');
    
    setTimeout(() => {
        projects.forEach((project) => {
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        
        projectContainer.classList.remove('anim-out');
    }, 300);

});



function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:"smooth"});
}

//1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
//2. IntersectionObserver를 이용해 모든 섹션을 관찰한다
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIds = [
    '#home', 
    '#about', 
    '#skills', 
    '#work', 
    '#testimonials', 
    '#contact'
];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavItem = navItems[0];

const observerOption = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}
const observerCallback = (entries, observer) => {
    entries.forEach(entry =>{
        if(!entry.isIntersecting){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            let selectedIndex;
            //스크롤링이 아래로 되어서 페이지가 올라옴
            if(entry.boundingClientRect.y < 0){
                selectedIndex = index + 1;
            } else{
                selectedIndex = index - 1;
            }
            selectedNavItem.classList.remove('active');
            selectedNavItem = navItems[selectedIndex];
            navItem.classList.add('acitve');
        }
    });
};
const observer = new IntersectionObserver(observerCallback, observerOption);

sections.forEach(section => observer.observe(section));