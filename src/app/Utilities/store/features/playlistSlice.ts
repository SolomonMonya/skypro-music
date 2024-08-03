import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../../types";

type PlaylistStateType = {
  currentTrack: null | Track;
  playlist: Track[];
  shuffledPlaylist: Track[];
  isShuffle: boolean;
  isPlaying: boolean;
  loop: boolean;

};

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  isPlaying: false,
  loop: false,

};

// Auth мне показалось не корректно использовать
const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
              // state.playlist = action.payload.tracksData;
              // state.shuffledPlaylist = [...action.payload.tracksData].sort(
              // () => 0.5 - Math.random()
              // );
    setCurrentTrack: (
      state,
      action: PayloadAction<{
        track: Track;
      }>
    ) => {
      state.currentTrack = action.payload.track;

    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const nextIndex = currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0;
      const newTrack = playlist[nextIndex];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setPreviousTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1;
      const newTrack = playlist[prevIndex];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsLoop: (state, action: PayloadAction<boolean>) => {
      state.loop = action.payload;
    },
  },
});

export const { setIsLoop, setCurrentTrack, setNextTrack, setPreviousTrack, setIsShuffle, setIsPlaying } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
