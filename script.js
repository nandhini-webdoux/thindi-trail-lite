
"use strict";

// ========================================
// 1. DISH DATA
// ========================================

const dishes = [
  {
    id: 1,
    name: "Idli",
    area: "Mylapore",
    price: 40,
    spice: "Mild",
    category: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600",
    alt: "Traditional South Indian idli served with chutney"
  },
  {
    id: 2,
    name: "Masala Dosa",
    area: "Triplicane",
    price: 80,
    spice: "Medium",
    category: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600",
    alt: "Crispy masala dosa served on a plate"
  },
  {
    id: 3,
    name: "Medu Vada",
    area: "T. Nagar",
    price: 40,
    spice: "Medium",
    category: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600",
    alt: "Golden fried Indian snack"
  },
  {
    id: 4,
    name: "Sundal",
    area: "Marina Beach",
    price: 30,
    spice: "Mild",
    category: "Snacks",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    alt: "Fresh snack bowl with vegetables and legumes"
  },
  {
    id: 5,
    name: "Bajji",
    area: "T. Nagar",
    price: 40,
    spice: "Medium",
    category: "Snacks",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=600",
    alt: "Crispy Indian fried snack"
  },
  {
    id: 6,
    name: "Pani Puri",
    area: "Anna Nagar",
    price: 50,
    spice: "Hot",
    category: "Snacks",
    image:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600",
    alt: "Indian street food snack served with chutneys"
  },
  {
    id: 7,
    name: "Jigarthanda",
    area: "Parrys Corner",
    price: 60,
    spice: "Mild",
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600",
    alt: "A chilled sweet treat"
  },
  {
    id: 8,
    name: "Filter Coffee",
    area: "Mylapore",
    price: 25,
    spice: "Mild",
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600",
    alt: "Hot coffee served in a cup"
  },
  {
    id: 9,
    name: "Kesari",
    area: "Triplicane",
    price: 35,
    spice: "Mild",
    category: "Sweets",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600",
    alt: "Traditional Indian sweet"
  }
];

// ========================================
// 2. GET HTML ELEMENTS
// ========================================

const dishContainer = document.getElementById("dishContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");

const stampCountElement = document.getElementById("stampCount");
const totalDishesElement = document.getElementById("totalDishes");
const progressFill = document.getElementById("progressFill");
const foodLevelElement = document.getElementById("foodLevel");

// ========================================
// 3. LOAD SAVED STAMPS
// ========================================

const STORAGE_KEY = "thindiTrailStamps";

function loadSavedStamps() {
  try {
    const savedData = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    if (!Array.isArray(savedData)) {
      return new Set();
    }

    // Keep only valid IDs from the current dish list.
    return new Set(
      savedData.filter(id =>
        dishes.some(dish => dish.id === Number(id))
      ).map(Number)
    );
  } catch (error) {
    console.error("Could not load saved stamps:", error);
    return new Set();
  }
}

const stampedDishes = loadSavedStamps();

// ========================================
// 4. DISPLAY DISH CARDS
// ========================================

function displayDishes(dishList) {
  dishContainer.innerHTML = "";

  if (dishList.length === 0) {
    dishContainer.innerHTML =
      "<p class='no-results'>No dishes found. Try another search!</p>";
    return;
  }

  dishList.forEach(dish => {
    const card = document.createElement("article");
    card.className = "dish-card";

    const image = document.createElement("img");
    image.src = dish.image;
    image.alt = dish.alt;
    image.loading = "lazy";

    const category = document.createElement("p");
    category.className = "dish-category";
    category.textContent = dish.category;

    const name = document.createElement("h3");
    name.textContent = dish.name;

    const area = document.createElement("p");
    area.textContent = `📍 ${dish.area}`;

    const price = document.createElement("p");
    price.className = "dish-price";
    price.textContent = `₹${dish.price}`;

    const spice = document.createElement("p");
    spice.textContent = `Spice: ${dish.spice}`;

    const stampButton = document.createElement("button");
    stampButton.type = "button";
    stampButton.className = "stamp-btn";
    stampButton.dataset.id = dish.id;

    if (stampedDishes.has(dish.id)) {
      stampButton.textContent = "✓ Stamped";
      stampButton.disabled = true;
    } else {
      stampButton.textContent = "Stamp this dish";
    }

    card.append(
      image,
      category,
      name,
      area,
      price,
      spice,
      stampButton
    );

    dishContainer.appendChild(card);
  });
}

// ========================================
// 5. SEARCH AND CATEGORY FILTERS
// ========================================

let selectedCategory = "All";
let selectedSpice = "All";

const categories = [
  "All",
  ...new Set(dishes.map(dish => dish.category))
];

function createCategoryFilters() {
  categoryFilters.innerHTML = "";

  categories.forEach(category => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "filter-btn";
    button.textContent = category;

    if (category === selectedCategory) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      selectedCategory = category;

      document.querySelectorAll(".filter-btn").forEach(filterButton => {
        filterButton.classList.toggle(
          "active",
          filterButton.textContent === selectedCategory
        );
      });

      filterDishes();
    });

    categoryFilters.appendChild(button);
  });
}


function filterDishes() {
  const searchText = searchInput.value.toLowerCase().trim();

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch =
      dish.name.toLowerCase().includes(searchText) ||
      dish.area.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      dish.category === selectedCategory;

    const matchesSpice =
      selectedSpice === "All" ||
      dish.spice === selectedSpice;

    return matchesSearch && matchesCategory && matchesSpice;
  });

  displayDishes(filteredDishes);
}


const spiceFilters = document.getElementById("spiceFilters");

spiceFilters.addEventListener("click", event => {
  const button = event.target.closest(".spice-btn");

  if (!button) return;

  selectedSpice = button.dataset.spice;

  document.querySelectorAll(".spice-btn").forEach(spiceButton => {
    spiceButton.classList.toggle(
      "active",
      spiceButton.dataset.spice === selectedSpice
    );
  });

  filterDishes();
});


// ========================================
// 6. SAVE STAMPS
// ========================================

function saveStamps() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...stampedDishes])
    );
  } catch (error) {
    console.error("Could not save stamps:", error);
  }
}

// ========================================
// 7. STAMP A DISH
// ========================================

dishContainer.addEventListener("click", event => {
  const button = event.target.closest(".stamp-btn");

  if (!button || button.disabled) {
    return;
  }

  const dishId = Number(button.dataset.id);

  // Do not stamp the same dish twice.
  if (stampedDishes.has(dishId)) {
    return;
  }

  stampedDishes.add(dishId);

  saveStamps();
  updatePassport();

  button.textContent = "✓ Stamped";
  button.disabled = true;
});

// ========================================
// 8. UPDATE FOOD PASSPORT
// ========================================

function updatePassport() {
  const count = stampedDishes.size;
  const total = dishes.length;

  const percentage =
    total === 0 ? 0 : (count / total) * 100;

  stampCountElement.textContent = count;
  totalDishesElement.textContent = total;
  progressFill.style.width = `${percentage}%`;

  if (count >= total) {
    foodLevelElement.textContent = "Master";
  } else if (count >= 5) {
    foodLevelElement.textContent = "Foodie";
  } else {
    foodLevelElement.textContent = "Beginner";
  }

  progressFill.setAttribute("role", "progressbar");
  progressFill.setAttribute("aria-valuemin", "0");
  progressFill.setAttribute("aria-valuemax", String(total));
  progressFill.setAttribute("aria-valuenow", String(count));
}

// ========================================
// 9. INITIALIZE THE WEBSITE
// ========================================

createCategoryFilters();
displayDishes(dishes);
updatePassport();


"use strict";

// ========================================
// 10. CALCULATE TRAIL TOTAL
// ========================================

const trailPrices = document.querySelectorAll(".trail-price");
const trailTotal = document.getElementById("trailTotal");

if (trailTotal) {
  const totalPrice = [...trailPrices].reduce((total, cell) => {
    return total + Number(cell.textContent.replace(/[^\d.]/g, ""));
  }, 0);

  trailTotal.textContent = `₹${totalPrice}`;
}

// ========================================
// 11. CONTACT FORM VALIDATION
// ========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = contactForm.querySelector('[name="name"]');
    const email = contactForm.querySelector('[name="email"]');
    const phone = contactForm.querySelector('[name="phone"]');
    const date = contactForm.querySelector('[name="date"]');
    const trailType = contactForm.querySelector(
      'input[name="trailType"]:checked'
    );

    let errors = [];

    if (!name || name.value.trim() === "") {
      errors.push("Please enter your name.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email.value.trim())) {
      errors.push("Please enter a valid email address.");
    }

    if (!phone || !/^[0-9]{10}$/.test(phone.value.trim())) {
      errors.push("Please enter a valid 10-digit phone number.");
    }

    if (!date || date.value === "") {
      errors.push("Please select your preferred date.");
    } else {
      const selectedDate = new Date(`${date.value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errors.push("Please choose today or a future date.");
      }
    }

    if (!trailType) {
      errors.push("Please select a trail type.");
    }

    let messageBox = document.getElementById("formMessage");

    if (!messageBox) {
      messageBox = document.createElement("p");
      messageBox.id = "formMessage";
      messageBox.setAttribute("role", "status");
      contactForm.appendChild(messageBox);
    }

    if (errors.length > 0) {
      messageBox.textContent = errors.join(" ");
      messageBox.className = "form-error";
      return;
    }

    messageBox.textContent =
      `Thank you, ${name.value.trim()}! Your enquiry has been validated successfully.`;
    messageBox.className = "form-success";

    contactForm.reset();
  });
}
