import { ChangeEvent } from "react";

export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
} 

export type Track = {
  map: any;
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
}

export type PlayerControlsType = {
  togglePlay: () => void;
  isPlaying: boolean;
  toggleLoop: () => void;
  isLooping: boolean;
  track: Track;
};

export type VolumeType = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}