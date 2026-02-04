const defaultIngredients = [
  "lait",
  "oeufs",
  "tomates",
  "épinards",
  "fromage",
  "poulet",
  "citron",
];

const defaultRecipes = [
  {
    title: "Omelette aux épinards",
    detail: "Oeufs, épinards, fromage — 15 min.",
  },
  {
    title: "Salade de poulet citronnée",
    detail: "Poulet, tomates, citron — 20 min.",
  },
  {
    title: "Pâtes crémeuses",
    detail: "Lait, fromage, tomates — 25 min.",
  },
];

const ingredientContainer = document.getElementById("ingredients");
const recipeContainer = document.getElementById("recipes");
const editButton = document.getElementById("edit-ingredients");
const dialog = document.getElementById("ingredient-dialog");
const dialogInput = document.getElementById("ingredient-input");
const fileInput = document.getElementById("photo-input");
const preview = document.getElementById("preview");
const previewImage = document.getElementById("preview-image");

let ingredients = [...defaultIngredients];

const renderIngredients = () => {
  ingredientContainer.innerHTML = "";
  ingredients.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item;
    ingredientContainer.appendChild(chip);
  });
};

const renderRecipes = () => {
  recipeContainer.innerHTML = "";
  defaultRecipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `<h4>${recipe.title}</h4><p>${recipe.detail}</p>`;
    recipeContainer.appendChild(card);
  });
};

const openDialog = () => {
  dialogInput.value = ingredients.join(", ");
  dialog.showModal();
};

const updateIngredients = () => {
  const value = dialogInput.value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  if (value.length > 0) {
    ingredients = value;
    renderIngredients();
  }
};

const showPreview = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    previewImage.src = reader.result;
    preview.classList.add("has-image");
  };
  reader.readAsDataURL(file);
};

editButton.addEventListener("click", openDialog);

dialog.addEventListener("close", () => {
  if (dialog.returnValue === "confirm") {
    updateIngredients();
  }
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    showPreview(file);
  }
});

renderIngredients();
renderRecipes();
