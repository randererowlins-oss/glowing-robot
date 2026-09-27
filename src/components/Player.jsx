import React from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat2,
  Volume2,
  VolumeX,
  ListMusic,
  MonitorSpeaker,
  Heart,
} from "lucide-react";
import { formatTime } from "../utils/format";
import { ImageWithFallback } from "./ImageWithFallback";

export function Player({
  track,
  current,
  playing,
  setPlaying,
  onNext,
  onPrev,
  shuffle,
  setShuffle,
  repeat,
  setRepeat,
  time,
  duration,
  onSeek,
  volume,
  setVolume,
  isLiked,
  onToggleLike,
  queueOpen,
  setQueueOpen,
  onOutputInfo,
}) {
  if (!track) return null;

  return (
    <div className="player">
      <div className="now-playing">
        <ImageWithFallback src={track.image} alt="Current track artwork" />
        <div>
          <strong>{track.title}</strong>
          <span>
            {track.artist}
            <small> · Demo audio</small>
          </span>
        </div>
        <button
          className={isLiked ? "liked" : ""}
          onClick={() => onToggleLike(current)}
          aria-label={isLiked ? "Unlike current song" : "Like current song"}
        >
          <Heart
            size={19}
            fill={isLiked ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="playback">
        <div className="transport">
          <button
            className={shuffle ? "enabled" : ""}
            aria-label="Toggle shuffle"
            aria-pressed={shuffle}
            onClick={() => setShuffle(!shuffle)}
          >
            <Shuffle size={17} />
          </button>
          <button aria-label="Previous track" onClick={onPrev}>
            <SkipBack size={19} fill="currentColor" />
          </button>
          <button
            className="main-play"
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause size={19} fill="currentColor" />
            ) : (
              <Play size={19} fill="currentColor" />
            )}
          </button>
          <button aria-label="Next track" onClick={onNext}>
            <SkipForward size={19} fill="currentColor" />
          </button>
          <button
            className={repeat ? "enabled" : ""}
            aria-label="Toggle repeat"
            aria-pressed={repeat}
            onClick={() => setRepeat(!repeat)}
          >
            <Repeat2 size={18} />
          </button>
        </div>
        <div className="progress">
          <span>{formatTime(time)}</span>
          <input
            aria-label="Seek playback"
            type="range"
            min="0"
            max={duration || 1}
            value={time}
            onChange={(e) => onSeek(+e.target.value)}
            style={{ "--progress": `${(time / (duration || 1)) * 100}%` }}
          />
          <span>{duration ? formatTime(duration) : track.duration}</span>
        </div>
      </div>

      <div className="player-extras">
        <span className="hi-fi">DEMO</span>
        <button
          aria-label="Open queue"
          className={queueOpen ? "enabled" : ""}
          onClick={() => setQueueOpen(!queueOpen)}
        >
          <ListMusic size={20} />
        </button>
        <button
          aria-label="Audio output information"
          onClick={onOutputInfo}
        >
          <MonitorSpeaker size={19} />
        </button>
        <div className="volume">
          <button
            aria-label={volume ? "Mute" : "Unmute"}
            onClick={() => setVolume(volume ? 0 : 0.65)}
          >
            {volume ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step=".01"
            value={volume}
            onChange={(e) => setVolume(+e.target.value)}
            aria-label="Volume"
            style={{ "--progress": `${volume * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
