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
  index: number | null;
  track: Track | null;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean
};

export default function Bar({ tracksData, track, index, setIsPlaying, isPlaying }: BarType) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(track);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(100);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (track !== currentTrack) {
      setCurrentTrack(track);
    }
  }, [track]);

  const duration = audioRef.current?.duration || 0;
  if (isPlaying === undefined || isPlaying === null) {
    return;
  }
  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleLoop = () => setIsLooping(!isLooping);

  const nextTrack = () => {
    if (currentTrack) {
      const currentIndex = tracksData.indexOf(currentTrack);
      const nextIndex = currentIndex < tracksData.length - 1 ? currentIndex + 1 : 0;
      setCurrentTrack(tracksData[nextIndex]);
    }
  };

  const prevTrack = () => {
    if (currentTrack) {
      const currentIndex = tracksData.indexOf(currentTrack);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracksData.length - 1;
      setCurrentTrack(tracksData[prevIndex]);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement> ) => {

    if (audioRef.current) {    
      audioRef.current.currentTime = Number(event.target.value);
    }

  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.playerBar}>
          <audio ref={audioRef} src={currentTrack.track_file} onTimeUpdate={(e) => {
            setProgress(e.currentTarget.currentTime);
          }}/>
          <ProgressBar
            max={duration}
            value={progress}
            step={0.01}
            onChange={handleSeek}
          />
          <div className={styles.trackTimeBlock}>
            <div>{durationFormat(progress)}</div>
            &nbsp; / &nbsp;
            <div>{durationFormat(duration)}</div>
          </div>
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
