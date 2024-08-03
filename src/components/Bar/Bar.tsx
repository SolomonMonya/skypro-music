"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Bar.module.css";
import { Track } from "@/app/utilities/types";
import ProgressBar from "./ProgressBar/ProgressBar";
import { durationFormat } from "@/app/utilities/durationFormat";
import Volume from "./VolumeBar/VolumeBar";
import { useAppDispatch, useAppSelector } from "@/app/utilities/hooks";
import { setIsLoop, setIsPlaying, setIsShuffle, setNextTrack, setPreviousTrack } from "@/app/utilities/store/features/playlistSlice";
import PlayerBar from "./PlayerBar/PlayerBar";


export default function Bar() {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
  const isLooping = useAppSelector((state) => state.playlist.loop);
  const isShuffle = useAppSelector((state) => state.playlist.isShuffle);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [isPlaying]); 
  const dispatch = useAppDispatch();


  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    const audio = audioRef.current;

    if (audio && currentTrack) {
      audio.src = currentTrack.track_file;
      
      audio.loop = isLooping;
      audio.play();
      dispatch(setIsPlaying(true));
    }    
  }, [currentTrack, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = isLooping;
    }
  }, [isLooping, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    const HandleNextTrack = () => {
        
      if (!currentTrack) {
        return null;
      }
      dispatch(setNextTrack());
    };
    if (audio) {
      audio.addEventListener("ended", HandleNextTrack);
    }
    return () => {
      audio?.removeEventListener("ended", HandleNextTrack);
    };
  }, [audioRef, dispatch]);

  const duration = audioRef.current?.duration || 0;

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setProgress(Number(event.target.value));
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
          }} />
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
            isPlaying={isPlaying}
            isLooping={isLooping}
            isShuffle={isShuffle}
            currentTrack={currentTrack}
            
          />
          <Volume audioRef={audioRef} />
        </div>
      </div>
    </div>
  );
}
