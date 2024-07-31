import { ChangeEvent } from "react";

export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type Track = {
  id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  stared_user: User;
  isPlaying: boolean;
  setCurrentTrack: (track: any) => void;
  onClick: () => void;
};

export type Tracks = {
  isLoading?: boolean;
  setCurrentTrack: (track: any) => void;
  tracks: Array<{
    id: number;
    name: string;
    author: string;
    album: string;
    genre: string;
    duration_in_seconds: number;
    isLiked: boolean;
    track_file: string;
  }>;
};

export type SimplifiedTrack = {
  id: number;
  name: string;
  author: string;
  album: string;
  genre: string;
  duration_in_seconds: number;
  isLiked: boolean;
  track_file: string;
};

export type PlayerControlsType = {
  togglePlay: () => void;
  isPlaying: boolean;
  toggleLoop: () => void;
  isLooping: boolean;
  track: SimplifiedTrack; // Changed to simplified track
};

export type VolumeType = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};