import formatTimestamp from "../lib/formatTimestamp.js";

let list = [];
let playing = null;
const player = document.querySelector("audio#audio-player");
const timebar = document.querySelector("input#player-progress-bar");
const playpauseButton = document.querySelector("button#player-control-play");
const nextButton = document.querySelector("button#player-control-next");
const previousButton = document.querySelector("button#player-control-previous");
timebar.min = 0;

const initializePlayerListeners = () => {
  player.removeAttribute("controls");
  player.addEventListener("ended", next);
  player.addEventListener("durationchange", setTimebar);
  player.addEventListener("timeupdate", updatePlayer);
  playpauseButton.addEventListener("click", toggleButton);
  nextButton.addEventListener("click", next);
  previousButton.addEventListener("click", previous);
  timebar.addEventListener("change", (e) => {
    player.currentTime = e.currentTarget.value;
  });
};

const playSong = (song) => {
  // D'abord mettre à jour l'interface avec les informations de la chanson
  document.querySelector("span#player-infos-song-title").textContent =
    song.title;
  document.querySelector("span#player-infos-artist-name").textContent =
    song.artist.name;
  document.querySelector("img#player-thumbnail-image").src =
    song.artist.image_url;

  // Ensuite, définir la source
  player.src = song.audio_url;

  // Charger le média avant de tenter la lecture
  player.load();

  // Tenter la lecture et gérer la promesse
  const playPromise = player.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Garder en mémoire la musique actuelle
        playing = song;
        // Mettre à jour l'interface pour indiquer la lecture
        document.querySelector(
          "button#player-control-play > span.material-icons"
        ).textContent = "pause";
      })
      .catch((error) => {
        // Mettre à jour l'interface pour indiquer la pause
        document.querySelector(
          "button#player-control-play > span.material-icons"
        ).textContent = "play_arrow";
      });
  }
};

const toggleButton = () => {
  const span = document.querySelector(
    "button#player-control-play > span.material-icons"
  );
  if (player.paused) {
    player.play();
    span.textContent = "pause"; // Changer en "pause" quand la lecture démarre
  } else {
    player.pause();
    span.textContent = "play_arrow"; // Changer en "play_arrow" quand la lecture est en pause
  }
};

const previous = () => {
  if (!list || !playing) return; // Protection contre les appels sans contexte

  // Trouver l'index actuel dans le tableau
  const currentIndex = list.findIndex((song) => song.id === playing.id);

  if (currentIndex === -1) return; // La chanson actuelle n'est pas dans la liste

  // Calculer l'index précédent (avec boucle)
  const previousIndex = currentIndex === 0 ? list.length - 1 : currentIndex - 1;

  // Jouer la chanson précédente
  playSong(list[previousIndex]);
};

const next = () => {
  if (!list || !playing) return; // Protection contre les appels sans contexte

  // Trouver l'index actuel dans le tableau
  const currentIndex = list.findIndex((song) => song.id === playing.id);

  if (currentIndex === -1) return; // La chanson actuelle n'est pas dans la liste

  // Calculer l'index suivant (avec boucle)
  const nextIndex = currentIndex === list.length - 1 ? 0 : currentIndex + 1;

  // Jouer la chanson suivante
  playSong(list[nextIndex]);
};

const playerAdd = (song) => {
  list.push(song);
};

const setTimebar = () => {
  document.querySelector("span#player-time-duration").textContent =
    formatTimestamp(player.duration);
  timebar.max = player.duration;
};

const updatePlayer = () => {
  document.querySelector("span#player-time-current").textContent =
    formatTimestamp(player.currentTime);
  timebar.value = player.currentTime;
};

export { initializePlayerListeners, playSong, toggleButton, playerAdd };
