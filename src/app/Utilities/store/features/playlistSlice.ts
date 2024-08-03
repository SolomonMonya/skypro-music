import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../../types";

type PlaylistStateType = {
  currentTrack: null | Track;
  currentPlaylist: Track[];
  shuffledPlaylist: Track[];
  isShuffle: boolean;
  isPlaying: boolean;
  loop: boolean;

};

const initialState: PlaylistStateType = {
  currentTrack: null,
  currentPlaylist: [],
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
    setCurrentPlaylist: (state, action: PayloadAction<Track[]>) => {
      state.currentPlaylist = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      console.log(currentTrackIndex)

      const nextIndex = playlist[currentTrackIndex + 1];
      if (nextIndex) {
        console.log("currentTrackIndex")
        state.currentTrack = nextIndex;
      }
    },
    setPreviousTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const prevIndex = playlist[currentTrackIndex - 1];
      if (prevIndex) {
        state.currentTrack = prevIndex;
      }
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
      if (state.isShuffle) {
        state.currentPlaylist = state.currentPlaylist.sort(
          () => 0.5 - Math.random()
        );
      }
    },
                  // state.playlist = action.payload.tracksData;
              // state.shuffledPlaylist = [...action.payload.tracksData].sort(
              // () => 0.5 - Math.random()
              // );
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setIsLoop: (state, action: PayloadAction<boolean>) => {
      state.loop = action.payload;
    },
  },
});

export const { setIsLoop, setCurrentTrack, setCurrentPlaylist, setNextTrack, setPreviousTrack, setIsShuffle, setIsPlaying } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
