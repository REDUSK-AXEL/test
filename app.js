const defaultIngredients = [
  "lait",
  "oeufs",
  "tomates",
  "épinards",
  "fromage",
  "poulet",
  "citron",
];

const recipeTemplates = {
  healthy: [
    {
      title: "Bowl protéiné poulet",
      detail: "Poulet, épinards, citron — riche en protéines.",
      calories: 520,
    },
    {
      title: "Omelette légère",
      detail: "Oeufs, tomates, herbes — 15 min.",
      calories: 360,
    },
  ],
  snack: [
    {
      title: "Wrap minute",
      detail: "Fromage, tomates, épinards — snack rapide.",
      calories: 280,
    },
    {
      title: "Salade express",
      detail: "Tomates, citron, herbes — fraîcheur.",
      calories: 190,
    },
  ],
  family: [
    {
      title: "Gratin familial",
      detail: "Poulet, fromage, lait — généreux.",
      calories: 740,
    },
    {
      title: "Pâtes crémeuses",
      detail: "Lait, fromage, tomates — 25 min.",
      calories: 610,
    },
  ],
};

const ingredientContainer = document.getElementById("ingredients");
const recipeContainer = document.getElementById("recipes");
const editButton = document.getElementById("edit-ingredients");
const dialog = document.getElementById("ingredient-dialog");
const dialogInput = document.getElementById("ingredient-input");
const fileInput = document.getElementById("photo-input");
const preview = document.getElementById("preview");
const previewImage = document.getElementById("preview-image");
const modeSelect = document.getElementById("mode-select");
const generateButton = document.getElementById("generate");
const aiStatus = document.getElementById("ai-status");
const themeToggle = document.getElementById("theme-toggle");
const geminiDialog = document.getElementById("gemini-dialog");
const geminiInput = document.getElementById("gemini-key-input");

let ingredients = [...defaultIngredients];
let hasImage = false;

const renderIngredients = () => {
  ingredientContainer.innerHTML = "";
  ingredients.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item;
    ingredientContainer.appendChild(chip);
  });
};

const renderRecipes = (recipes) => {
  recipeContainer.innerHTML = "";
  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <div class="recipe-header">
        <h4>${recipe.title}</h4>
        <span class="kcal">${recipe.calories} kcal</span>
      </div>
      <p>${recipe.detail}</p>
    `;
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
    hasImage = true;
  };
  reader.readAsDataURL(file);
};

const getStoredKey = () => localStorage.getItem("geminiApiKey");

const updateAiStatus = (message) => {
  aiStatus.textContent = message;
};

const setTheme = (theme) => {
  document.body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeToggle.textContent =
    theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre";
};

const toggleTheme = () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
};

const buildPrompt = () => {
  const mode = modeSelect.value;
  return `Tu es un chef. Propose 3 recettes pour le mode "${mode}".
Ingredients disponibles: ${ingredients.join(", ")}
Donne pour chaque recette: titre, description courte, calories estimées.`;
};

const parseGeminiResponse = (text) => {
  try {
    const json = JSON.parse(text);
    if (Array.isArray(json)) {
      return json;
    }
  } catch (error) {
    return null;
  }
  return null;
};

const callGemini = async () => {
  const apiKey = getStoredKey();
  if (!apiKey) {
    updateAiStatus("Ajoutez une clé Gemini pour activer les suggestions IA.");
    geminiDialog.showModal();
    return null;
  }

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: buildPrompt() }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json",
    },
  };

  updateAiStatus("Génération des recettes avec Gemini...");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Erreur Gemini");
  }

  const data = await response.json();
  const text =
    data.candidates?.[0]?.content?.parts?.map((part) => part.text).join("") ||
    "";
  return parseGeminiResponse(text);
};

const getFallbackRecipes = () => {
  const mode = modeSelect.value;
  return recipeTemplates[mode] || recipeTemplates.healthy;
};

const generateRecipes = async () => {
  if (!hasImage) {
    updateAiStatus("Ajoutez une photo pour lancer la génération.");
    return;
  }

  try {
    const aiRecipes = await callGemini();
    if (aiRecipes) {
      renderRecipes(aiRecipes);
      updateAiStatus("Suggestions Gemini affichées.");
      return;
    }
  } catch (error) {
    updateAiStatus("Gemini indisponible, affichage des recettes simulées.");
  }

  renderRecipes(getFallbackRecipes());
  updateAiStatus("Suggestions simulées affichées.");
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

generateButton.addEventListener("click", generateRecipes);

themeToggle.addEventListener("click", toggleTheme);

geminiDialog.addEventListener("close", () => {
  if (geminiDialog.returnValue === "confirm") {
    const key = geminiInput.value.trim();
    if (key) {
      localStorage.setItem("geminiApiKey", key);
      updateAiStatus("Clé Gemini enregistrée. Cliquez sur générer.");
    }
    geminiInput.value = "";
  }
});

const storedTheme = localStorage.getItem("theme") || "light";
setTheme(storedTheme);
renderIngredients();
renderRecipes(getFallbackRecipes());
updateAiStatus("Mode simulation actif.");
