"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Bar.module.css";
import { Track } from "@/app/auxiliary/types";
import ProgressBar from "./ProgressBar/ProgressBar";
import VolumeBar from "./VolumeBar/VolumeBar";
import PlayerBar from "./PlayerBar/PlayerBar";
import { durationFormat } from "@/app/auxiliary/durationFormat";
import { useAppDispatch, useAppSelector } from "@/app/auxiliary/hooks";
import { setIsPlaying, setNextTrack } from "@/app/auxiliary/store/features/PlaylistSlice";
import PlayerTrackPlay from "./PlayingTrack/PlayingTrack";
import PlayingTrack from "./PlayingTrack/PlayingTrack";

type BarTracks = { 
  tracks: Track
}

export default function Bar({ tracks }: BarTracks) {

  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
 
  const dispatch = useAppDispatch();

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const duration = audioRef.current?.duration || 0;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    const handdleEnded = () => {
      dispatch(setNextTrack());
    };

    audio?.addEventListener("ended", handdleEnded);

    return () => audio?.removeEventListener("ended", handdleEnded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, audioRef.current]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
    audioRef.current?.addEventListener("ended", () => {
  
      setCurrentTime(0);
    });
  }, [volume, duration]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(setIsPlaying(false));
      } else {
        audioRef.current.play();
        dispatch(setIsPlaying(true));
      }
  
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      if (isLooping) {
        audioRef.current.loop = false;
      } else {
        audioRef.current.loop = true;
      }
    }
    setIsLooping((prev) => !prev);
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value));
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(event.target.value);
      setVolume(audioRef.current.volume);
    }
  };

  if (!currentTrack) return

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio
          ref={audioRef}
          src={tracks.track_file}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        ></audio>
        <div className={styles.trackTimeBlock}>
          <div>{durationFormat(currentTime)}</div>
          &nbsp; / &nbsp;
          <div>{durationFormat(duration)}</div>
        </div>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleSeek}
        />
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
          <PlayerBar
            togglePlay={togglePlay}
            isPlaying={isPlaying}
            toggleLoop={toggleLoop}
            isLooping={isLooping}
            track={tracks}
          />
          <PlayingTrack track={currentTrack} />
          </div>

          <VolumeBar
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
          />
        </div>
      </div>
    </div>
  );
}
