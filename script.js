// Chennai Street Food Dishes
const dishes = [
    {
        id: 1,
        name: "Idli",
        area: "Mylapore",
        price: 40,
        spice: "Mild",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
        alt: "Indian food served on a plate"
    },
    {
        id: 2,
        name: "Masala Dosa",
        area: "Triplicane",
        price: 80,
        spice: "Medium",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976",
        alt: "Crispy South Indian dosa"
    },
    {
        id: 3,
        name: "Medu Vada",
        area: "T. Nagar",
        price: 35,
        spice: "Mild",
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        alt: "Indian fried snack"
    },
    {
        id: 4,
        name: "Sundal",
        area: "Marina Beach",
        price: 30,
        spice: "Mild",
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
        alt: "Fresh chickpea and vegetable salad"
    },
    {
        id: 5,
        name: "Bajji",
        area: "Besant Nagar",
        price: 40,
        spice: "Medium",
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7",
        alt: "Golden fried Indian snack"
    },
    {
        id: 6,
        name: "Pani Puri",
        area: "Anna Nagar",
        price: 50,
        spice: "Hot",
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84",
        alt: "Indian street food snack"
    },
    {
        id: 7,
        name: "Jigarthanda",
        area: "George Town",
        price: 60,
        spice: "Mild",
        category: "Sweets",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
        alt: "A chilled sweet dessert"
    },
    {
        id: 8,
        name: "Filter Coffee",
        area: "Mylapore",
        price: 25,
        spice: "Mild",
        category: "Breakfast",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        alt: "A cup of freshly brewed coffee"
    },
    {
        id: 9,
        name: "Kesari",
        area: "West Mambalam",
        price: 35,
        spice: "Mild",
        category: "Sweets",
        image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7",
        alt: "A traditional Indian sweet"
    }
];

// Display the dish cards
const dishContainer = document.getElementById("dishContainer");

function displayDishes(dishList) {
    dishContainer.innerHTML = "";

    dishList.forEach(function (dish) {
        const card = document.createElement("article");
        card.className = "dish-card";

        card.innerHTML = `
            <img
                src="${dish.image}"
                alt="${dish.alt}"
                loading="lazy"
            >

            <div class="dish-info">
                <span class="dish-category">${dish.category}</span>
                <h3>${dish.name}</h3>
                <p>📍 ${dish.area}</p>
                <p class="dish-price">₹${dish.price}</p>
                <p>🌶️ Spice: ${dish.spice}</p>

                <button type="button" class="stamp-btn"
                    data-id="${dish.id}">
                    Stamp this dish
                </button>
            </div>
        `;

        dishContainer.appendChild(card);
    });
}

// Show all dishes when the page loads
displayDishes(dishes);


const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");

let selectedCategory = "All";

// Create category filter buttons
const categories = ["All", ...new Set(dishes.map(dish => dish.category))];

categories.forEach(category => {
  const button = document.createElement("button");

  button.textContent = category;
  button.className = "filter-btn";

  if (category === "All") {
    button.classList.add("active");
  }

  button.addEventListener("click", () => {
    selectedCategory = category;

    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    filterDishes();
  });

  categoryFilters.appendChild(button);
});

// Search dishes by name or area
searchInput.addEventListener("input", filterDishes);

function filterDishes() {
  const searchText = searchInput.value.toLowerCase().trim();

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch =
      dish.name.toLowerCase().includes(searchText) ||
      dish.area.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      dish.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  displayDishes(filteredDishes);
}
