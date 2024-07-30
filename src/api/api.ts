const apiUrlGetTracks = "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/";

export async function getTracks() {
  const res = await fetch(apiUrlGetTracks);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await res.json();
  return data.data
}
