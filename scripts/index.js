// ----------- Constanta -----------
const MOBILE_WIDTH_BREAKPOINT = 640;

// ----------- Final Elements -----------
const navbar = document.querySelector('.navbar');
const toggleMenu = document.querySelector('#toggleMenu');

// ----------- Functions -----------
/**
 * Set Navbar background to transparent.
 */
const setNavbarBgTransparant = () => {
  if (!navbar.classList.contains('transparent')) {
    navbar.classList.add('transparent');
  }
};

/**
 * Set Navbar background to colored.
 */
const resetNavbarBg = () => {
  if (navbar.classList.contains('transparent')) {
    navbar.classList.remove('transparent');
  }
};

/**
 * Changes the navbar background to transparent on some conditions.
 */
const setNavbarBg = () => {
  if (
    window.scrollY <= navbar.clientHeight &&
    window.innerWidth > MOBILE_WIDTH_BREAKPOINT
  ) {
    setNavbarBgTransparant();
  } else {
    resetNavbarBg();
  }
};

// ----------- Events -----------
// Event when the window scrolls.
window.addEventListener('scroll', () => {
  setNavbarBg();
});

// Event when the window load.
window.addEventListener('load', () => {
  setNavbarBg();
});

// Event when the window resize.
window.addEventListener('resize', () => {
  setNavbarBg();
});

// Event when the toggle menu is clicked.
toggleMenu.addEventListener('click', () => {
  const menus = document.querySelector('.navbar__menus');

  menus.classList.toggle('active');
  toggleMenu.classList.toggle('cross');
});
