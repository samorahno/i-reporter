// function to trigger the toggle
function togle_nav_func() {
  const elem = document.getElementById('togle_nav');
  if (elem.currentStyle) {
    displayStyle = elem.currentStyle.display;
  } else if (window.getComputedStyle) {
    displayStyle = window.getComputedStyle(elem, null).getPropertyValue('display');
  }
  if (displayStyle === 'none') {
    elem.style.display = 'block';
  } else {
    elem.style.display = 'none';
  }
}


/*function togle_nav_func(){
	let elem = document.getElementById("togle_nav");

	
		if (elem.currentStyle) {
			displayStyle = elem.currentStyle.display;
		} else if (window.getComputedStyle) {
			displayStyle = window.getComputedStyle(elem, null).getPropertyValue("display");
		}
		if(displayStyle === "none")
		{
			elem.style.display = "block";
		}
		else{
			elem.style.display = "none";
		}
	
}


function togle_nav_func() {
  let elem = document.getElementById("togle_nav");
  //let displayStyle = 'none';
  if (elem.currentStyle) {
    var displayStyle = elem.currentStyle.display;
  } else if (window.getComputedStyle) {
    var displayStyle = window.getComputedStyle(elem, null).getPropertyValue("display");
  }
  if (displayStyle === "none") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
*/
