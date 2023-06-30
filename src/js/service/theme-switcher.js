document.addEventListener('DOMContentLoaded', function () {
  const themeSwitch = document.getElementById('themeSwitch');
  const themeSwitchBurger = document.getElementById('themeSwitchBurger');
  const body = document.getElementsByTagName('body')[0];

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme);

    if (savedTheme === 'dark') {
      themeSwitch.classList.add('active');
    }
  }

  themeSwitch.addEventListener('click', function () {
    body.classList.toggle('dark');
    themeSwitch.classList.toggle('active');

    if (body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  themeSwitchBurger.addEventListener('click', function () {
    body.classList.toggle('dark');
    themeSwitchBurger.classList.toggle('active');

    if (body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
});
