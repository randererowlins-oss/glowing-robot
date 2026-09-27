import React from "react";
import { Heart } from "lucide-react";
import { TrackList } from "../components/TrackList";

export function LikedSongsView({
  liked = [],
  current,
  playing,
  onPlayTrack,
  onToggleLikeTrack,
  onAddToPlaylist,
  navigate,
}) {
  if (!liked.length) {
    return (
      <div className="empty">
        <Heart size={32} />
        <h3>A place for your favorites.</h3>
        <p>Tap the heart on any track to keep it close.</p>
        <button className="olive-btn" onClick={() => navigate("Home")}>
          Discover your next favorite
        </button>
      </div>
    );
  }

  return (
    <TrackList
      indices={liked}
      current={current}
      playing={playing}
      liked={liked}
      onPlay={onPlayTrack}
      onToggleLike={onToggleLikeTrack}
      onAddToPlaylist={onAddToPlaylist}
    />
  );
}
