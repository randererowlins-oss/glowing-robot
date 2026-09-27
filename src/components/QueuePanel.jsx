import React from "react";
import { X, Headphones, Play } from "lucide-react";
import { tracks } from "../data/catalog";
import { ImageWithFallback } from "./ImageWithFallback";

export function QueuePanel({ current, onClose, onPlay }) {
  return (
    <aside className="queue-panel" aria-label="Playback queue">
      <div className="section-heading">
        <h2>Your queue</h2>
        <button aria-label="Close queue" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      <p>A little flow for your day.</p>
      {tracks.map((t, i) => (
        <button
          className={i === current ? "queue-track chosen" : "queue-track"}
          onClick={() => onPlay(i)}
          key={t.title}
          aria-label={`Play ${t.title} by ${t.artist}`}
        >
          <ImageWithFallback src={t.image} alt="" />
          <span>
            <b>{t.title}</b>
            <small>{t.artist}</small>
          </span>
          {i === current ? <Headphones size={17} /> : <Play size={17} />}
        </button>
      ))}
      <p className="preview-note">
        Independent demo audio, not recordings by the displayed artists.
      </p>
    </aside>
  );
}
