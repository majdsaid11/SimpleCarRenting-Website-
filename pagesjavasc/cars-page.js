let ALL_CARS = [];

function qp(name){
  return new URL(window.location.href).searchParams.get(name) || "";
}
function norm(s){
  return (s || "").toString().trim().toLowerCase();
}

function renderCars(list){
  const grid = document.getElementById("carsGrid");
  if (!grid) return;

if (!list.length) {
  grid.innerHTML = `
    <div data-i18n="noCars" style="color:rgba(234,240,255,.75);font-weight:800;">
      No cars found
    </div>
  `;

  
  if (typeof applyI18n === "function") {
    const lang = localStorage.getItem("autogt_lang") || "en";
    applyI18n(lang);
  }

  return;
}

  grid.innerHTML = list.map(car => {
    const img = car.images?.[0] || "";
    const title = `${car.brand} ${car.model} ${car.year || ""}`.trim();
    const meta = `${car.category} • ${car.transmission} • ${car.seats} seats`;
    const price = `${car.pricePerDay} ${car.currency} / day`;

    return `
      <article class="car-card">
        <img src="${img}" alt="${title}" loading="lazy">
        <div class="car-body">
          <h3 class="car-name">${title}</h3>
          <div class="car-meta">${meta}</div>
          <div class="car-price">${price}</div>

          <div class="car-actions">
            <button onclick="bookCar('${car.id}')">Book</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function applyFilters(){
  const q = norm(document.getElementById("carsSearch")?.value);
  const cat = document.getElementById("carsCategory")?.value || "all";

  const minYear = parseInt(qp("minYear"), 10) || 0;   
  const offerOnly = qp("offers") === "1";       
   const brand = qp("brand"); 

  let list = ALL_CARS.filter(c => c.available !== false);

  if (cat !== "all"){
    list = list.filter(c => c.category === cat);
  }

  if (minYear){
    list = list.filter(c => Number(c.year) >= minYear);
  }

  if (offerOnly){
    list = list.filter(c =>
      c.offer === true);    
    
  }
  if(brand){
    list = list.filter(c => norm(c.brand) === norm(brand));
  }

  if (q){
    list = list.filter(c =>
      norm(`${c.brand} ${c.model} ${c.category} ${c.year}`).includes(q)
    );
  }

  renderCars(list);
}

function bookCar(id){
  window.location.href = `orderpage.html?car=${encodeURIComponent(id)}`;
}

async function init(){
  const res = await fetch("../data/cars.json");
  const data = await res.json();
  const currency = data.currency || "AED";

  ALL_CARS = (data.cars || []).map(c => ({...c, currency}));

  
  const urlCat = qp("cat");
  const sel = document.getElementById("carsCategory");
  if (sel && urlCat) sel.value = urlCat;
const urlQ = qp("q");
const searchInput = document.getElementById("carsSearch");
if (searchInput && urlQ) {
  searchInput.value = urlQ;
}
  applyFilters();
}

document.addEventListener("DOMContentLoaded", () => {
  init().catch(console.error);
  document.getElementById("carsSearch")?.addEventListener("input", applyFilters);
  document.getElementById("carsCategory")?.addEventListener("change", applyFilters);
});