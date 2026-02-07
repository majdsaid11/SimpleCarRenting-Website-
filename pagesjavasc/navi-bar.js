function navigateToHomePage() {
    // Check if we are already on the home page
    if (window.location.pathname.endsWith('/pages/index.html')) {
        alert('You are already on the home page.');
    } else {
        // Redirect to the home page
      window.location.href = 'index.html';
    }
}


function navigateToBrandPage() {
 if (window.location.pathname.endsWith('/pages/brands.html')) {
        alert('You are already on the brands page.');
    } else {
        // Redirect to the brands page
      window.location.href = 'brands.html';
    }
}


function navigateTolocationPage() {
    // Check if we are already on the home page
 if (window.location.pathname.endsWith('/pages/maplocations.html')) {
        alert('You are already on the maplocations page.');
    } else {
        // Redirect to the home page
      window.location.href = 'maplocations.html';
    }
}
function navigateTocontactPage() {
 if (window.location.pathname.endsWith('/pages/contact.html')) {
        alert('You are already on the contact page.');
    } else {
        // Redirect to the contact page
      window.location.href = 'contact.html';

    }
}
function navigateToOrderPage() {
  if (window.location.pathname.endsWith('/pages/orderpage.html')) {
    alert('You are already on the order page.');
  } else {
    window.location.href = 'orderpage.html';
  }
}
function navigateToCarsPage(){
    if (window.location.pathname.endsWith('/pages/cars.html')) {
    alert('You are already on the cars page.');
  } else {
    window.location.href = 'cars.html';
  }
}
function navigateToAboutPage() {
  if (window.location.pathname.endsWith('/pages/about.html')) {
    alert('You are already on the about page.');
  } else {
    window.location.href = 'about.html';
  }
}
function handleNavSearch(e){
  e.preventDefault();

  const desktopInput = document.getElementById("navSearchInput");
  const mobileInput  = document.getElementById("navSearchInputMobile");

  const q = (mobileInput?.value || desktopInput?.value || "").trim();

  if (!q) {
    navigateToCarsPage();
    return;
  }

  window.location.href = `cars.html?q=${encodeURIComponent(q)}`;
}
function toggleMobileSearch(open){
  const box = document.getElementById("mobileSearchBox");
  const overlay = document.getElementById("mobileSearchOverlay");
  if (!box || !overlay) return;

  const isOpen = (open !== undefined) ? open : !box.classList.contains("show");
  box.classList.toggle("show", isOpen);
  overlay.classList.toggle("show", isOpen);
  box.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen) {
    const main = document.getElementById("navSearchInput");
    const mobile = document.getElementById("navSearchInputMobile");
    if (mobile) {
      mobile.value = main ? main.value : "";
      mobile.focus();
    }
  }
}


