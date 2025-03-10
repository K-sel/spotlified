// Importer une fois le code des custom elements pour que customElements.define soit appelé au moins une fois
// et fasse le lien entre le tag html (p.ex: artist-cover) avec la classe qui lui correspond (p.ex: ArtistCover)
import "./components/artist-cover.js";
import "./components/song-item.js";

// Les helpers pour cacher/afficher une section et colorier les liens du menu
import { displaySection, activateLink } from "./utils/helpers.js";

// Code des sections
import { displayArtists } from "./controllers/artists.js";
import {
  displayArtistSongs,
  displayFavorites,
  displaySearchSongs,
} from "./controllers/songs.js";



window.addEventListener('offline',() => {document.querySelector("body").classList.add("offline")})
window.addEventListener('online', () => {document.querySelector("body").classList.remove("offline")})

const router = () => {
  const hash = window.location.hash || "#home";
  const hashSplit = hash.split("-");

  // Colorie le lien (la première partie de l'url match toujours avec un élément du menu,
  // par choix de consistence dans le nommage)
  activateLink(hashSplit[0]);

  switch (hashSplit[0]) {
    case "#home":
      displaySection("#home");
      break;

    case "#player":
      displaySection("#player");
      break;

    case "#artists":
      // S'il y a un id qui suit, c'est qu'il faut afficher les chansons d'un artiste
      if (hashSplit[1]) {
        displaySection("#list");
        displayArtistSongs(hashSplit[1]);
      } else {
        displaySection("#artists");
        displayArtists();
      }
      break;

    case "#search":
      displaySection("#list");
      displaySearchSongs(hashSplit[1]);
      break;

    case "#favorites":
      displaySection("#list");
      displayFavorites();
      break;
  }
};

window.addEventListener("hashchange", router);

// Appelé une fois dans le vide, pour mettre à jour l'état de l'app selon l'url demandée au chargement de la page
router();
navigator.serviceWorker.register("/service-workers.js")