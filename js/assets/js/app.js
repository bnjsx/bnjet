document.querySelectorAll('#close-alert').forEach((button) => {
  button.addEventListener('click', function () {
    const parentDiv = this.closest('#alert-box'); // Get the parent by ID
    if (parentDiv) parentDiv.remove(); // Removes the parent div
  });
});

const openBtn = document.getElementById('nav-open');
const closeBtn = document.getElementById('nav-close');

if (openBtn) {
  openBtn.addEventListener('click', function () {
    const navbar = document.getElementById('nav-menu');
    navbar && (navbar.style.display = 'block');
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', function () {
    const navbar = document.getElementById('nav-menu');
    navbar && (navbar.style.display = 'none');
  });
}
