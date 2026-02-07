//whatsapp number for receiving orders 
const OFFICE_WA = "971561008664";

function qp(name){
  return new URL(window.location.href).searchParams.get(name) || "";
}
function safe(v){ return (v ?? "").toString().trim(); }
function calcTotal(car, days){
  const pricePerDay = Number(car?.pricePerDay) || 0;
  return days > 0 ? pricePerDay * days : 0;
}

function updateSummary(car){
  const summaryEl = document.getElementById("rentSummary");
  const daysEl = document.getElementById("rentDays");
  const totalEl = document.getElementById("rentTotal");
  const noteEl = document.getElementById("rentNote");

  const pickup = document.getElementById("pickupDate")?.value || "";
  const ret = document.getElementById("returnDate")?.value || "";

  if (!summaryEl || !daysEl || !totalEl) return;

  if (!car){
    summaryEl.style.display = "none";
    return;
  }

  if (!pickup || !ret){
    summaryEl.style.display = "none";
    return;
  }

  const days = daysBetween(pickup, ret);

  summaryEl.style.display = "block";

  if (days <= 0){
    daysEl.textContent = "-";
    totalEl.textContent = "-";
    if (noteEl) noteEl.textContent = "Return Date لازم تكون بعد Pickup Date.";
    return;
  }

  const total = calcTotal(car, days);
  daysEl.textContent = String(days);
  totalEl.textContent = `${total} ${car.currency || ""}`.trim();
  if (noteEl) noteEl.textContent = `Price per day: ${car.pricePerDay} ${car.currency} / day`;
}

function daysBetween(pickup, ret){
  // pickup و ret format YYYY-MM-DD
  if (!pickup || !ret) return 0;

  const a = new Date(pickup + "T00:00:00");
  const b = new Date(ret + "T00:00:00");
  const ms = b - a;
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return Number.isFinite(days) ? days : 0;
}

async function loadSelectedCar(){
  const carId = qp("car");
  if (!carId) return null;

  const res = await fetch("../data/cars.json");
  const data = await res.json();

  const currency = data.currency || "AED";
  const cars = data.cars || [];
  const car = cars.find(c => String(c.id) === String(carId));
  if (!car) return null;

  return { ...car, currency };
}

function renderSelectedCar(car){
  const info = document.getElementById("selectedCarInfo");
  const imgEl = document.getElementById("selectedCarImg");
  if (!info) return;

  if (!car){
    if (imgEl) imgEl.style.display = "none";
    info.innerHTML = `<span style="opacity:.8">No car selected. Please go back and choose a car.</span>`;
    return;
  }

  const img = (car.images && car.images[0]) ? car.images[0] : (car.image || "");
  const base = "../";
  const finalSrc =
    !img ? "" :
    (img.startsWith("http") || img.startsWith("data:")) ? img :
    img.startsWith("../") ? img :
    base + img;

  if (imgEl){
    if (!finalSrc){
      imgEl.style.display = "none";
    } else {
      imgEl.style.display = "block";
      imgEl.src = finalSrc;
      imgEl.onerror = () => { imgEl.style.display = "none"; };
    }
  }

  const title = `${safe(car.brand)} ${safe(car.model)} ${safe(car.year)}`.trim();
  const meta = [safe(car.category), safe(car.transmission), safe(car.seats) ? `${safe(car.seats)} seats` : ""]
    .filter(Boolean).join(" • ");
  const price = `${safe(car.pricePerDay)} ${safe(car.currency)} / day`.trim();

  info.innerHTML = `
    <div class="car-title">${title}</div>
    <div class="car-meta">${meta}</div>
    <div class="car-price">${price}</div>
  `;
}

function buildWhatsAppMessage(car, form){
  const name = safe(form.get("name"));
  const phone = safe(form.get("phone"));
  const email = safe(form.get("email"));

  const pickupDate = safe(form.get("pickupDate"));
  const returnDate = safe(form.get("returnDate"));

  const days = daysBetween(pickupDate, returnDate);

  const pricePerDay = Number(car.pricePerDay) || 0;
  const total = days > 0 ? (pricePerDay * days) : 0;

  const carTitle = `${safe(car.brand)} ${safe(car.model)} ${safe(car.year)}`.trim();

  return (
`طلب حجز سيارة 🚗
-----------------------
السيارة: ${carTitle}
عدد الأيام: ${days > 0 ? days : "-"}
الإجمالي: ${days > 0 ? total : "-"} ${safe(car.currency)}
-----------------------
الاسم: ${name || "-"}
${phone ? `الهاتف: ${phone}\n` : ""}${email ? `الإيميل: ${email}\n` : ""}استلام: ${pickupDate || "-"}
تسليم: ${returnDate || "-"}`
  );
}

document.addEventListener("DOMContentLoaded", async () => {
  const car = await loadSelectedCar();
  renderSelectedCar(car);

/*Date update after choose */
  const pickupEl = document.getElementById("pickupDate");
  const returnEl = document.getElementById("returnDate");

  if (pickupEl) pickupEl.addEventListener("change", () => updateSummary(car));
  if (returnEl) returnEl.addEventListener("change", () => updateSummary(car));

// first time render summary (in case dates are pre-filled by browser)
  updateSummary(car);

  const formEl = document.getElementById("carRentalForm");
  if (!formEl) return;

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!car){
      alert("No car selected. Please go back and choose a car first.");
      window.location.href = "cars.html";
      return;
    }

    const formData = new FormData(formEl);
    const pickupDate = safe(formData.get("pickupDate"));
    const returnDate = safe(formData.get("returnDate"));
    const days = daysBetween(pickupDate, returnDate);

    if (days <= 0){
      alert("Return Date لازم تكون بعد Pickup Date (على الأقل يوم واحد).");
      return;
    }

//Whatsapp message build and open
    const msg = buildWhatsAppMessage(car, formData);
    const waUrl = `https://wa.me/${OFFICE_WA}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  });
});
