(() => {
  const refs = {
    openMenuBtn: document.querySelector('.menu-open'),
    closeMenuBtn: document.querySelector('.menu-close'),
    menu: document.querySelector('.menu'),
    body: document.querySelector('body'),
    menuList: document.querySelector('.menu_list'),
  };

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);
  refs.menuList.addEventListener('click', removeMenu);

  function toggleMenu() {
    refs.menu.classList.toggle('is-hidden');
  }

  function removeMenu() { 
    refs.menu.classList.add('is-hidden');
  }
})();


const headerLinks = document.querySelectorAll('.header_link');
headerLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
