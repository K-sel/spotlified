# Spotlified - Application Web Mobile

Une application de streaming musical développée avec du JavaScript vanilla, démontrant les concepts modernes du développement web. 

## 🎓 But du projet
Ce projet a été développé entièrement en JavaScript vanilla dans le but de recréer manuellement les fonctionnalités que les frameworks modernes (React, Vue, Angular) nous offrent automatiquement - comme la gestion d'état, le routage, les composants réactifs et la liaison de données - afin de mieux comprendre les défis qu'ils résolvent et d'apprécier la valeur qu'ils apportent en termes de productivité et de maintenabilité.

## 📋 Vue d'ensemble

Spotlified est une Progressive Web App (PWA) qui simule une plateforme de streaming musical. L'application permet de naviguer entre artistes, écouter des chansons, gérer des favoris et effectuer des recherches.

## 🎯 Concepts développés

### 1. Architecture modulaire ES6
- **Modules JavaScript** : Organisation du code en modules séparés avec import/export
- **Structure claire** : Séparation entre contrôleurs, utilitaires et composants
- **Bundling avec Vite** : Configuration moderne pour le développement et la production

### 2. Custom Elements (Web Components)
**Localisation** : `src/components/`

```javascript
// artist-cover.js - Composant réutilisable pour afficher un artiste
class ArtistCover extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <a href="${this.getAttribute('href')}">
        <img src="${this.getAttribute('image_url')}" />
        <div class="artist-list-item-title">${this.getAttribute('name')}</div>
      </a>
    `
  }
}
customElements.define("artist-cover", ArtistCover)
```

**Fonctionnalités développées** :
- Composants réactifs avec `observedAttributes`
- Lifecycle hooks (`connectedCallback`, `attributeChangedCallback`)
- Custom events pour la communication parent-enfant
- Encapsulation des comportements UI

### 3. Système de routage SPA
**Localisation** : `src/index.js`

```javascript
const router = () => {
  const hash = window.location.hash || "#home";
  const hashSplit = hash.split("-");
  
  switch (hashSplit[0]) {
    case "#artists":
      if (hashSplit[1]) {
        displaySection("#list");
        displayArtistSongs(hashSplit[1]);
      } else {
        displaySection("#artists");
        displayArtists();
      }
      break;
    // ...autres routes
  }
};
```

**Concepts maîtrisés** :
- Navigation sans rechargement de page
- Gestion des paramètres d'URL
- État de l'application synchronisé avec l'URL
- Activation dynamique des sections et liens de navigation

### 4. Gestion d'état et stockage local
**Localisation** : `src/utils/local-storage.js`

```javascript
const setFavorite = (song) => {
  if (!getItem(song.id)) {
    setItem(song.id, song);
  } else {
    removeItem(song.id);
  }
};
```

**Implémentation** :
- Persistance des favoris avec localStorage
- Synchronisation entre l'état local et l'affichage
- Gestion des modifications d'état en temps réel

### 5. Lecteur audio avec contrôles personnalisés
**Localisation** : `src/controllers/player.js`

**Fonctionnalités développées** :
- Interface de contrôle personnalisée (play/pause/suivant/précédent)
- Synchronisation avec l'API Web Audio
- Gestion des playlists et navigation entre pistes
- Barre de progression interactive
- Gestion des raccourcis clavier système

```javascript
audioPlayer.addEventListener('timeupdate', () => {
  playerProgress.value = audioPlayer.currentTime;
  playerTimeCurrent.innerText = formatTimestamp(audioPlayer.currentTime);
});
```

### 6. Communication avec API REST
**Localisation** : `src/utils/api.js`

```javascript
const loadArtists = () => loadJson(`${BASE_URL}/api/artists`)
const loadSongs = (id) => loadJson(`${BASE_URL}/api/artists/${id}/songs`)
const loadSearch = (query) => loadJson(`${BASE_URL}/api/songs/search/${query}`)
```

**Patterns utilisés** :
- Fonctions asynchrones avec async/await
- Gestion centralisée des appels API
- Transformation et formatage des données

### 7. Interface utilisateur responsive
**Localisation** : `src/css/`

**Technologies CSS maîtrisées** :
- **Flexbox** : Layout principal et composants
- **CSS Grid** : Organisation des listes d'artistes
- **Custom Properties** : Système de variables CSS cohérent
- **Media queries** : Adaptation mobile
- **Animations CSS** : Transitions et keyframes
- **Architecture CSS** : Fichiers modulaires et maintenables

### 8. Progressive Web App (PWA)
**Fichiers** : `manifest.webmanifest`, service worker

**Fonctionnalités** :
- Installation sur l'écran d'accueil
- Mode hors ligne basique
- Notifications push (OneSignal)
- Interface fullscreen sur mobile

### 9. Gestion des événements avancée
**Custom Events pour les composants** :
```javascript
// Dans song-item.js
const playClick = new CustomEvent("play_click");
this.dispatchEvent(playClick);

// Dans songs.js
songItem.addEventListener("play_click", () => {
  playSong(song, songs);
});
```

**Patterns d'événements** :
- Délégation d'événements
- Custom events pour découpler les composants
- Gestion des événements système (online/offline)

### 10. Fonctionnalités de recherche
**Implémentation complète** :
- Interface de recherche avec animation
- Encodage URL pour caractères spéciaux
- Intégration avec le système de routage
- Affichage des résultats dans la même interface que les listes

## 🗂️ Structure du projet

```
src/
├── components/           # Web Components réutilisables
│   ├── artist-cover.js  # Composant artiste
│   └── song-item.js     # Composant chanson
├── controllers/         # Logique métier
│   ├── artists.js       # Gestion des artistes
│   ├── player.js        # Lecteur audio
│   └── songs.js         # Gestion des chansons
├── css/                 # Styles modulaires
│   ├── index.css        # Point d'entrée
│   ├── structure.css    # Layout principal
│   ├── typography.css   # Typographie
│   ├── buttons.css      # Composants boutons
│   ├── lists.css        # Listes et grilles
│   ├── player.css       # Interface lecteur
│   └── variables.css    # Variables CSS
├── utils/               # Utilitaires
│   ├── api.js          # Communication serveur
│   ├── helpers.js      # Fonctions d'aide
│   ├── local-storage.js # Gestion stockage
│   └── formatTimestamp.js # Formatage temps
└── index.js            # Point d'entrée et routeur
```

## 🚀 Technologies utilisées

- **JavaScript ES6+** : Modules, classes, async/await
- **Web Components** : Custom Elements API
- **CSS3** : Flexbox, Grid, Custom Properties, Animations
- **Vite** : Build tool moderne
- **Web APIs** : Audio, LocalStorage, History, Service Workers
- **PWA** : Manifest, Service Worker, Notifications

## 🎓 Compétences démontrées

1. **Développement frontend moderne** sans framework lourd
2. **Architecture componentisée** avec Web Components natifs
3. **Gestion d'état** simple et efficace
4. **Interface responsive** et accessible
5. **Intégration d'APIs** externes
6. **Optimisation performance** et expérience utilisateur
7. **Progressive Enhancement** pour le web mobile

Ce projet illustre une approche pragmatique du développement web moderne, privilégiant les standards web natifs tout en créant une expérience utilisateur riche et performante.
