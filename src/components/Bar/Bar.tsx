"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Bar.module.css";
import { Track } from "@/app/Utilities/types";
import ProgressBar from "./ProgressBar/ProgressBar";
import { PlayerBar } from "./PlayerBar/PlayerBar";
import { durationFormat } from "@/app/Utilities/durationFormat";
import Volume from "./VolumeBar/VolumeBar";

type BarType = {
  tracksData: Track[];
  index: number | null
  track: Track | null
};

export default function Bar({ tracksData, track, index }: BarType) {
  if (index === null || track === null) return
  const [currentTrack, setCurrentTrack] = useState<Track>(track);
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
      <div className={styles.barContent}>
        <audio ref={audioRef} src={currentTrack.track_file} />
        <ProgressBar
          max={duration}
          value={progress}
          step={0.01}
          onChange={handleProgressChange}
        />
        <div className={styles.trackTimeBlock}>
          <div>{durationFormat(progress)}</div>
          &nbsp; / &nbsp;
          <div>{durationFormat(duration)}</div>
        </div>
        <div className={styles.barPlayerBlock}>
          <PlayerBar
            togglePlay={togglePlay}
            isPlaying={isPlaying}
            toggleLoop={toggleLoop}
            isLooping={isLooping}
            nextTrack={nextTrack}
            prevTrack={prevTrack}
            trackName={currentTrack.name}
            trackAuthor={currentTrack.author}
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
    </div>
  );
}
