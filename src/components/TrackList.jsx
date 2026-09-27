import React from "react";
import { Heart, Plus, Trash2 } from "lucide-react";
import { tracks } from "../data/catalog";
import { ImageWithFallback } from "./ImageWithFallback";

export function TrackList({
  indices = [],
  current = 0,
  playing = false,
  liked = [],
  onPlay,
  onToggleLike,
  onAddToPlaylist,
  onRemoveTrack,
  playlistMode = false,
}) {
  return (
    <div className="track-list" role="list">
      {indices.map((i, n) => {
        const track = tracks[i];
        if (!track) return null;
        const isCurrent = playing && current === i;
        const isLiked = liked.includes(i);

        return (
          <div
            className={`track-row ${isCurrent ? "active-track" : ""}`}
            key={`${i}-${n}`}
            onClick={() => onPlay(i)}
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPlay(i);
              }
            }}
            aria-label={`Play ${track.title} by ${track.artist}`}
          >
            <span className="track-number">
              {isCurrent ? (
                <span className="equalizer" aria-label="Now playing">ııı</span>
              ) : (
                String(n + 1).padStart(2, "0")
              )}
            </span>
            <ImageWithFallback
              src={track.image}
              alt=""
              className="track-thumb"
            />
            <span className="track-detail">
              <b>{track.title}</b>
              <small>{track.artist}</small>
            </span>
            <span className="track-album">{track.album}</span>
            <span className="track-duration">{track.duration}</span>

            {onAddToPlaylist && (
              <button
                className="track-action-btn"
                title="Add to playlist"
                aria-label={`Add ${track.title} to playlist`}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToPlaylist(i);
                }}
              >
                <Plus size={16} />
              </button>
            )}

            {playlistMode && onRemoveTrack && (
              <button
                className="track-action-btn"
                title="Remove from playlist"
                aria-label={`Remove ${track.title} from playlist`}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveTrack(n);
                }}
              >
                <Trash2 size={15} />
              </button>
            )}

            <button
              className="track-action-btn"
              aria-label={isLiked ? "Unlike track" : "Like track"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(i);
              }}
            >
              <Heart
                size={17}
                fill={isLiked ? "currentColor" : "none"}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
