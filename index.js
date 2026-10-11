
const flavourSelect = document.getElementById("flavour");
const cakeTop = document.getElementById("cakeTop");
const cakeBody = document.getElementById("cakeBody");
const cakeDrip = document.getElementById("cakeDrip");
const cakeToppings = document.getElementById("cakeToppings");

const previewName = document.getElementById("previewName");
const previewDescription = document.getElementById("previewDescription");
const previewPrice = document.getElementById("previewPrice");
const summaryName = document.getElementById("summaryName");
const summaryPrice = document.getElementById("summaryPrice");
const cakeSize = document.getElementById("cakeSize");

const toppingInputs = [
  document.getElementById("berries"),
  document.getElementById("sprinkles"),
  document.getElementById("chocolateChips"),
  document.getElementById("cream")
];

const toppingPrices = {
  berries: 80,
  sprinkles: 30,
  chocolateChips: 50,
  cream: 40
};

const cakeFlavours = {
  red: {
    name: "Red Velvet Dream",
    price: 899,
    top: "#c84d56",
    border: "#e77c7f",
    body: "linear-gradient(90deg,#a93342,#d65760 30%,#c84d56 70%,#a93342)",
    description: "A little drama, a lot of delicious."
  },

  chocolate: {
    name: "Chocolate Cloud",
    price: 849,
    top: "#573127",
    border: "#805044",
    body: "linear-gradient(90deg,#42231f,#79483a 30%,#63392e 70%,#42231f)",
    description: "For your chocolate kind of day."
  },

  vanilla: {
    name: "Vanilla Daydream",
    price: 799,
    top: "#f1dcb6",
    border: "#fff0d4",
    body: "linear-gradient(90deg,#d7b986,#f4dfb7 30%,#ead0a1 70%,#d7b986)",
    description: "Simple, soft, and always lovely."
  },

  strawberry: {
    name: "Strawberry Blush",
    price: 879,
    top: "#e99da7",
    border: "#f6c6cb",
    body: "linear-gradient(90deg,#ce7b89,#f0b4bc 30%,#e99da7 70%,#ce7b89)",
    description: "A berry-sweet little daydream."
  }
};

let treatList = [];

function drawToppings() {
  cakeToppings.innerHTML = "";

  // Fresh berries
  if (document.getElementById("berries").checked) {
    const positions = [
      [15, 25], [36, 5], [58, 19], [76, 6]
    ];

    positions.forEach(([left, top]) => {
      const berry = document.createElement("span");
      berry.className = "berry";
      berry.style.left = left + "%";
      berry.style.top = top + "px";
      cakeToppings.appendChild(berry);
    });
  }

  // Rainbow sprinkles
  if (document.getElementById("sprinkles").checked) {
    const colours = [
      "#f8cb55", "#67b7a2", "#d879a3",
      "#8c9fe0", "#f19b65"
    ];

    for (let i = 0; i < 22; i++) {
      const sprinkle = document.createElement("span");

      sprinkle.className = "sprinkle";
      sprinkle.style.left = (9 + (i * 37) % 82) + "%";
      sprinkle.style.top = (9 + (i * 13) % 38) + "px";
      sprinkle.style.background = colours[i % colours.length];
      sprinkle.style.transform =
        `rotate(${(i * 29) % 160}deg)`;

      cakeToppings.appendChild(sprinkle);
    }
  }

  // Chocolate chips
  if (document.getElementById("chocolateChips").checked) {
    const positions = [
      [24, 18], [47, 32], [68, 10], [84, 34], [9, 43]
    ];

    positions.forEach(([left, top]) => {
      const chip = document.createElement("span");

      chip.className = "chip";
      chip.style.left = left + "%";
      chip.style.top = top + "px";

      cakeToppings.appendChild(chip);
    });
  }

  // Whipped cream
  if (document.getElementById("cream").checked) {
    const positions = [
      [5, 8], [30, 0], [54, 2], [80, 13]
    ];

    positions.forEach(([left, top]) => {
      const cream = document.createElement("span");

      cream.className = "cream-dot";
      cream.style.left = left + "%";
      cream.style.top = top + "px";

      cakeToppings.appendChild(cream);
    });
  }
}

function updateCake() {
  const flavour = cakeFlavours[flavourSelect.value];

  // Update cake colours and flavour information
  cakeTop.style.background = flavour.top;
  cakeTop.style.borderColor = flavour.border;
  cakeBody.style.background = flavour.body;
  cakeDrip.style.background = flavour.border;

  previewName.textContent = flavour.name;
  previewDescription.textContent = flavour.description;

  // Render the selected decorations
  drawToppings();

  // Calculate the estimated price
  let total = flavour.price;

  toppingInputs.forEach(input => {
    if (input.checked) {
      total += toppingPrices[input.id];
    }
  });

  total += Number(cakeSize.value);

  previewPrice.textContent = `₹${total}`;
  summaryPrice.textContent = `₹${total}`;

  const sizeText =
    cakeSize.options[cakeSize.selectedIndex].text.split(" — ")[0];

  summaryName.textContent = `${flavour.name} · ${sizeText}`;
}

// Update preview when flavour changes
flavourSelect.addEventListener("change", updateCake);

// Update preview when a topping is selected or removed
toppingInputs.forEach(input => {
  input.addEventListener("change", updateCake);
});

// Update price when cake size changes
cakeSize.addEventListener("change", updateCake);

// Treat list for ordinary products and customized cakes
function addToTreatList(name, price) {
  treatList.push({ name, price });
  renderTreatList();
}

function renderTreatList() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  if (treatList.length === 0) {
    cartItems.innerHTML = "<li>No treats added yet.</li>";
    cartTotal.textContent = "Total: ₹0";
    return;
  }

  let total = 0;

  treatList.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.textContent =
      `${item.name} — ₹${item.price} `;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.type = "button";
    removeButton.style.marginLeft = "12px";
    removeButton.style.border = "0";
    removeButton.style.background = "transparent";
    removeButton.style.color = "#b94c58";
    removeButton.style.fontWeight = "bold";

    removeButton.addEventListener("click", () => {
      treatList.splice(index, 1);
      renderTreatList();
    });

    li.appendChild(removeButton);
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: ₹${total}`;
}

// Add regular bakery products
document.querySelectorAll(".add-btn").forEach(button => {
  button.addEventListener("click", () => {
    addToTreatList(
      button.dataset.name,
      Number(button.dataset.price)
    );

    button.textContent = "Added ✓";

    setTimeout(() => {
      button.textContent = "Add to Treat List +";
    }, 1000);
  });
});

// Add the customized cake
document.getElementById("addCustomCake").addEventListener("click", () => {
  const flavour = cakeFlavours[flavourSelect.value];

  const toppings = toppingInputs
    .filter(input => input.checked)
    .map(input => {
      const names = {
        berries: "Fresh berries",
        sprinkles: "Rainbow sprinkles",
        chocolateChips: "Chocolate chips",
        cream: "Whipped cream"
      };

      return names[input.id];
    });

  const sizeText =
    cakeSize.options[cakeSize.selectedIndex].text.split(" — ")[0];

  const total =
    Number(previewPrice.textContent.replace("₹", ""));

  const toppingText = toppings.length
    ? toppings.join(", ")
    : "No extra toppings";

  const customCakeName =
    `${flavour.name} (${sizeText}; ${toppingText})`;

  addToTreatList(customCakeName, total);

  document.getElementById("cartItems").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// Initialize the cake preview and treat list
updateCake();
renderTreatList();
