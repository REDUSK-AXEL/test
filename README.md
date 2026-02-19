# IA Frigo Recettes

Une application qui prend en photo le contenu du réfrigérateur et propose des idées de recettes adaptées aux ingrédients détectés.

## Statut du projet

Prototype local disponible dans ce dépôt. Il s’agit d’une interface front‑end avec
ingrédients et recettes simulés pour illustrer l’expérience, avec option Gemini.

## Comment l’utiliser

1. Ouvrez `index.html` dans votre navigateur **ou** lancez un serveur local :

   ```bash
   python -m http.server 8000
   ```

2. Allez sur `http://localhost:8000`.
3. Uploadez une photo pour visualiser l’aperçu et les suggestions simulées.
4. Choisissez un mode (gym/healthy, snack, famille) puis cliquez sur Générer.

## Activer Gemini (optionnel)

Pour utiliser Gemini, ajoutez votre propre clé d’API dans l’interface (elle est
stockée uniquement dans votre navigateur via localStorage).

> Ne commitez jamais une clé d’API dans Git.

## Objectif

Simplifier la planification des repas et réduire le gaspillage alimentaire en suggérant des recettes à partir des ingrédients disponibles.

## Fonctionnalités clés (MVP)

- **Scan du frigo** : prise de photo depuis l’application.
- **Détection d’ingrédients** : reconnaissance d’objets et de produits alimentaires.
- **Suggestions de recettes** : propositions adaptées aux ingrédients détectés.
- **Filtres** : préférences alimentaires (végétarien, sans gluten, etc.).
- **Liste de courses** : ingrédients manquants pour une recette donnée.

## Parcours utilisateur (exemple)

1. L’utilisateur ouvre l’application et prend une photo de son frigo.
2. L’IA détecte les ingrédients et affiche la liste reconnue.
3. L’utilisateur confirme/édite la liste.
4. L’application propose des recettes classées par pertinence.
5. L’utilisateur sélectionne une recette et obtient les étapes de préparation.

## Pistes techniques

- **Vision** : modèle de détection d’objets (ex. YOLO, Detectron2).
- **Backend** : service qui mappe les ingrédients à des recettes.
- **Frontend** : mobile (iOS/Android) ou web responsive.
- **Données recettes** : API publique ou base interne.

## Prochaines étapes

- Définir le scope du MVP (app mobile ou web).
- Prototyper la reconnaissance d’ingrédients.
- Tester l’expérience utilisateur avec un petit panel.

## Idée de roadmap MVP (téléchargeable ensuite)

1. **MVP Web** : upload d’une photo + détection d’ingrédients + suggestions.
2. **Validation** : tests utilisateurs + correction des erreurs de détection.
3. **App mobile** : caméra intégrée + compte utilisateur.
4. **Publication** : store iOS/Android ou PWA installable.

## Exemple de stack minimale (pour un prototype rapide)

- **Front** : Next.js ou React + composant upload photo.
- **Backend** : API Python (FastAPI) pour l’inférence.
- **Vision** : modèle pré‑entraîné (YOLOv8) adapté aux aliments.
- **Recettes** : base interne ou API publique.
