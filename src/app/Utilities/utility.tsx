import { Track } from "./types";

export const transformTrackData = (data: any[]): Track[] => {
  return data.map(item => ({
    id: item._id,
    name: item.name,
    author: item.author,
    album: item.album,
    logo: item.logo,
    track_file: item.track_file,
    duration_in_seconds: item.duration_in_seconds,
    genre: item.genre,
    release_date: item.release_date,
    staredUser: item.staredUser,
  }));
};