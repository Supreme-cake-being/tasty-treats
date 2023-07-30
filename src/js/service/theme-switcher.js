document.addEventListener('DOMContentLoaded', function () {
  const themeSwitch = document.querySelector('#themeSwitch');
  const themeSwitchBurger = document.querySelector('#themeSwitchBurger');
  const body = document.querySelector('body');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme);

    if (savedTheme === 'dark') {
      themeSwitch.classList.add('active');
      themeSwitchBurger.classList.add('active');
    }
  }

  themeSwitch.addEventListener('click', function () {
    body.classList.toggle('dark');
    themeSwitch.classList.toggle('active');

    if (body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', '');
    }
  });

  themeSwitchBurger.addEventListener('click', function () {
    body.classList.toggle('dark');
    themeSwitchBurger.classList.toggle('active');

    if (body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', '');
    }
  });
});
