(() => {
  const refs = {
    openMenuBtn: document.querySelector('.menu-open'),
    closeMenuBtn: document.querySelector('.menu-close'),
    menu: document.querySelector('.menu'),
    body: document.querySelector('body'),
    menuList: document.querySelector('.menu_list'),
  };

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.openMenuBtn.addEventListener('click', denyScroll);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', addScroll);
  refs.menuList.addEventListener('click', removeMenu);
  refs.menuList.addEventListener('click', addScroll);

  function toggleMenu() {
    refs.menu.classList.toggle('is-hidden');
  }

  function addScroll() {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  function denyScroll() {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
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
