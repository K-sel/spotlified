const setItem = (id, value) => localStorage.setItem(id, JSON.stringify(value));
const getItem = (id) => JSON.parse(localStorage.getItem(id));
const getItems = () => Object.keys(localStorage).map(getItem);
const removeItem = (id) => localStorage.removeItem(id);

const setFavorite = (song) => {
  if (!getItem(song.id)) {
    setItem(song.id, song);
    console.log("Ajout -- Favoris mis à jour:", getItems());
  } else {
    removeItem(song.id);
    console.log("Suppression -- Favoris mis à jour:", getItems());
  }
};

export { getItems, getItem, setFavorite };
