document.addEventListener('DOMContentLoaded', function () {
  var selectedTheme = localStorage.getItem('selectedTheme');
  var body = document.body;
  if (selectedTheme === 'theme2') {
    body.classList.add('theme2');
  } else {
    body.classList.add('theme1'); // Apply default theme if 'theme2' isn't set
  }
});
