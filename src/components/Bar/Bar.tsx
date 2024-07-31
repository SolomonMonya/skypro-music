"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Bar.module.css";
import { Track } from "@/app/auxiliary/types";
import ProgressBar from "./ProgressBar/ProgressBar";
import {PlayerBar} from "./PlayerBar/PlayerBar";
import { durationFormat } from "@/app/auxiliary/durationFormat";
import Volume from "./VolumeBar/VolumeBar";

type BarType = {
  tracksData: Track[];
};

export default function Bar({ tracksData }: BarType) {
  const [currentTrack, setCurrentTrack] = useState<Track>(tracksData[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(100);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const duration = audioRef.current?.duration || 0;

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleLoop = () => setIsLooping(!isLooping);
  const nextTrack = () => {
    const currentIndex = tracksData.indexOf(currentTrack);
    const nextIndex = currentIndex < tracksData.length - 1 ? currentIndex + 1 : 0;
    setCurrentTrack(tracksData[nextIndex]);
  };
  const prevTrack = () => {
    const currentIndex = tracksData.indexOf(currentTrack);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracksData.length - 1;
    setCurrentTrack(tracksData[prevIndex]);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleTimeUpdate = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      };
      audio.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value, 10);
    setProgress(newProgress);
    if (audioRef.current) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    }
  };

  return (
    <div className={styles.bar}>
      <audio ref={audioRef} src={currentTrack.track_file} />
      <div className={styles.barContent}>
        {/* <TrackPlay
          name={currentTrack.name}
          author={currentTrack.author}
          album={currentTrack.album}
          logo={currentTrack.logo}
        /> */}
        <ProgressBar 
          max={duration}
          value={progress}
          step={0.01}
          onChange={handleProgressChange}
        />
        <PlayerBar
          togglePlay={togglePlay}
          isPlaying={isPlaying}
          toggleLoop={toggleLoop}
          isLooping={isLooping}
          nextTrack={nextTrack}
          prevTrack={prevTrack}
        />
        <Volume
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}