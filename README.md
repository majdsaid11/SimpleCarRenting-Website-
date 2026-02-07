# AutoGT — *Experimental* Car Renting Frontend Website by majd elbah 

AutoGT is a responsive **car rental front-end website** built with **HTML, CSS, and Vanilla JavaScript**.  
It loads cars from a JSON file, supports **search & filtering**, and allows users to **book a car** by generating a **WhatsApp order message**.

*Since there is no backend implementation for this website it uses reliable third-party services where possible.  
For booking requests, it uses a WhatsApp direct link to send a well-structured message to the rental office.
for more info about implementation please check orderpagejs.js*
---

## Features

- Home page with quick category shortcuts (Newest, Sport, Special Offers, Off-Road)
- Cars listing page (data-driven)
  - Search by brand / model / category / year
  - Filter by category
  - Supports URL query filters (category, offers, min year, brand, search)
- Booking (Order) page
  - Shows selected car details
  - Select pickup/return dates
  - Live calculation of **rental days + total price**
  - Opens WhatsApp with a pre-filled booking message
- Settings drawer
  - **Language switch (EN / AR)** with RTL support
  - **Dark / Light theme**
  - Saved in `localStorage`
- Locations page with embedded Google Map

---

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- External:
  - Google Fonts + Material Symbols
  - Bootstrap CDN (used in `maplocations.html`)

---

## Project Structure

```bash
car-Renting-main/
├─ index.html                  # Redirects to pages/index.html
├─ pages/
│  ├─ index.html               # Home
│  ├─ cars.html                # Cars listing + filters
│  ├─ orderpage.html           # Booking form + WhatsApp order
│  ├─ brands.html              # Brands page
│  ├─ about.html               # About page
│  ├─ contact.html             # Contact page
│  ├─ maplocations.html        # Map / locations
├─ pagesjavasc/
│  ├─ cars-page.js             # Loads cars.json + filtering + render
│  ├─ orderpagejs.js           # Selected car + pricing + WhatsApp
│  ├─ navi-bar.js              # Navigation + search routing
│  ├─ settings.js              # Theme + language (i18n)
├─ styles/
│  ├─ elements.css
│  ├─ pages.css
├─ data/
│  ├─ cars.json                # Fleet data source
└─ carPhotos/                  # Car images
