// function to trigger the toggle
// eslint-disable-next-line no-unused-vars
function togle_nav_func() {
  const elem = document.getElementById('togle_nav');
  if (elem.currentStyle) {
    // eslint-disable-next-line no-undef
    displayStyle = elem.currentStyle.display;
  } else if (window.getComputedStyle) {
    // eslint-disable-next-line no-undef
    displayStyle = window.getComputedStyle(elem, null).getPropertyValue('display');
  }
  // eslint-disable-next-line no-undef
  if (displayStyle === 'none') {
    elem.style.display = 'block';
  } else {
    elem.style.display = 'none';
  }
}
