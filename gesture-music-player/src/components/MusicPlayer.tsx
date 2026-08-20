import { useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import type { Song } from "../types/music";

interface MusicPlayerProps {
  songs: Song[];
}

export default function MusicPlayer({ songs }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentSongIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        console.error("Unable to play audio.");
        setIsPlaying(false);
      });

      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((previousIndex) => {
      return (previousIndex + 1) % songs.length;
    });

    setCurrentTime(0);
  };

  const previousSong = () => {
    setCurrentSongIndex((previousIndex) => {
      return previousIndex === 0
        ? songs.length - 1
        : previousIndex - 1;
    });

    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value);

    if (!audioRef.current) return;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSongEnded = () => {
    nextSong();
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <section className="music-player">
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongEnded}
      />

      {/* Album Artwork */}
      <div className="album-container">
        <img
          src={currentSong.cover}
          alt={`${currentSong.title} album cover`}
          className={`album-cover ${isPlaying ? "playing" : ""}`}
        />
      </div>

      {/* Song Information */}
      <div className="song-information">
        <span className="album-name">{currentSong.album}</span>

        <h1>{currentSong.title}</h1>

        <p>{currentSong.artist}</p>
      </div>

      {/* Progress */}
      <div className="progress-container">
        <input
          type="range"
          min="0"
          max={audioRef.current?.duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="progress-bar"
          aria-label="Song progress"
        />

        <div className="time-information">
          <span>{formatTime(currentTime)}</span>

          <span>
            {audioRef.current?.duration
              ? formatTime(audioRef.current.duration)
              : currentSong.duration}
          </span>
        </div>
      </div>

      {/* Player Controls */}
      <div className="player-controls">
        <button
          className="control-button"
          onClick={previousSong}
          aria-label="Previous song"
          title="Previous song"
        >
          <SkipBack size={21} strokeWidth={1.8} />
        </button>

        <button
          className="play-button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={23} strokeWidth={2} />
          ) : (
            <Play size={23} strokeWidth={2} />
          )}
        </button>

        <button
          className="control-button"
          onClick={nextSong}
          aria-label="Next song"
          title="Next song"
        >
          <SkipForward size={21} strokeWidth={1.8} />
        </button>
      </div>

      {/* Volume */}
      <div className="volume-container">
        <Volume2
          size={18}
          strokeWidth={1.8}
          aria-hidden="true"
        />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) =>
            setVolume(Number(event.target.value))
          }
          className="volume-slider"
          aria-label="Volume"
        />
      </div>
    </section>
  );
}