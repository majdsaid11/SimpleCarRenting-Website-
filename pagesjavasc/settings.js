(() => {
  const STORAGE_THEME = "autogt_theme";
  const STORAGE_LANG  = "autogt_lang";

  function qs(id){ return document.getElementById(id); }

  window.toggleSettingsDrawer = function (open) {
    const drawer  = qs("settingsDrawer");
    const overlay = qs("settingsOverlay");
    if (!drawer || !overlay) return;

    const isOpen = (open !== undefined) ? open : !drawer.classList.contains("open");
    drawer.classList.toggle("open", isOpen);
    overlay.classList.toggle("show", isOpen);
    drawer.setAttribute("aria-hidden", String(!isOpen));

    if (isOpen) {
      const focusEl = drawer.querySelector("button,select,input");
      focusEl && focusEl.focus();
    }
  };

  const DICT = {
  en: {
    home: "Home",
    cars: "Cars",
    brands: "Brands",
    about: "About Us",
    contact: "Contact",
    locations: "Locations",
    // drawer/settings
    settings: "Settings",
    language: "Language",
    theme: "Theme",
    darkTheme: "Dark theme",     
    english: "English",
    arabic: "Arabic",
    light: "Light",
    dark: "Dark",
    // nav / buttons
    browseCars: "Browse Cars",   
    book: "Book",               
    go: "Go",                    
    searchPlaceholder: "Search (SUV, Toyota, Sport...)",
    // home cards
    exploreNewest: "Explore Newest Models",
    viewDetails: "view details",
    specialOffers: "Special Offers",
    sport: "Sport",
    offroad: "OFF-ROAD",
    // cars page dynamic
    perDay: "day",
    seats: "seats",
    noCars: "No cars found",
    allcategories: "All Categories",
  },

  ar: {
    home: "الرئيسية",
    cars: "السيارات",
    brands: "الماركات",
    about: "من نحن",
    contact: "تواصل معنا",
    locations: "المواقع",

    // drawer/settings
    settings: "الإعدادات",
    language: "اللغة",
    theme: "المظهر",
    darkTheme: "الوضع الداكن",   
    english: "English",
    arabic: "العربية",
    light: "فاتح",
    dark: "داكن",

    // nav / buttons
    browseCars: "تصفح السيارات",
    book: "احجز",
    go: "بحث",
    searchPlaceholder: "ابحث (SUV، Toyota، Sport...)",

    // home cards
    exploreNewest: "استكشف أحدث الموديلات",
    viewDetails: "عرض التفاصيل",
    specialOffers: "عروض خاصة",
    sport: "رياضي",
    offroad: "طرق وعرة",
    allcategories: "كل الفئات",

    // cars page dynamic
    perDay: "يوم",
    seats: "مقاعد",
    noCars: "لا توجد سيارات"
  }
};


  function applyI18n(lang){
    const dict = DICT[lang] || DICT.en;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
  }

  function setTheme(theme){
  theme = (theme === "light" || theme === "dark") ? theme : "dark";

  const html = document.documentElement;

  if (theme === "light") {
    html.dataset.theme = "light";
  } else {
    html.removeAttribute("data-theme"); // dark = default in :root
  }

  localStorage.setItem(STORAGE_THEME, theme);

  
  const tgl = qs("themeToggle");
  if (tgl) tgl.checked = (theme === "dark");
}

document.addEventListener("DOMContentLoaded", () => {
  
  const savedThemeRaw = localStorage.getItem(STORAGE_THEME);
  const savedTheme = (savedThemeRaw === "dark" || savedThemeRaw === "light") ? savedThemeRaw : "dark";
  setTheme(savedTheme);

  const savedLangRaw = localStorage.getItem(STORAGE_LANG);
  const savedLang = (savedLangRaw === "ar" || savedLangRaw === "en") ? savedLangRaw : "en";
  setLang(savedLang);
  const tgl = qs("themeToggle");
  if (tgl) {
    tgl.addEventListener("change", () => {
      setTheme(tgl.checked ? "dark" : "light");
    });
  }

  const sel = qs("langSelect");
  if (sel) sel.addEventListener("change", () => setLang(sel.value));
});



  function setLang(lang){
    const html = document.documentElement;
    if (lang === "ar") {
      html.lang = "ar";
      html.dir  = "rtl";
    } else {
      html.lang = "en";
      html.dir  = "ltr";
    }
    localStorage.setItem(STORAGE_LANG, lang);

    const sel = qs("langSelect");
    if (sel) sel.value = lang;

    applyI18n(lang);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") window.toggleSettingsDrawer(false);
  });

 document.addEventListener("DOMContentLoaded", () => {
  const tgl = qs("themeToggle");
  if (tgl) {
    tgl.addEventListener("change", () => {
      setTheme(tgl.checked ? "dark" : "light"); 
    });
  }

  const sel = qs("langSelect");
  if (sel) sel.addEventListener("change", () => setLang(sel.value));

  const savedThemeRaw = localStorage.getItem(STORAGE_THEME);
  const savedTheme = (savedThemeRaw === "dark" || savedThemeRaw === "light") ? savedThemeRaw : "dark";

  const savedLangRaw = localStorage.getItem(STORAGE_LANG);
  const savedLang = (savedLangRaw === "ar" || savedLangRaw === "en") ? savedLangRaw : "en";

  setTheme(savedTheme);
  setLang(savedLang);
});
})();