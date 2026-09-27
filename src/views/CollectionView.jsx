import React from "react";
import { Play, Music2 } from "lucide-react";
import { TrackList } from "../components/TrackList";
import { ImageWithFallback } from "../components/ImageWithFallback";

export function CollectionView({
  selected,
  current,
  playing,
  liked,
  onPlayTrack,
  onToggleLikeTrack,
  onAddToPlaylist,
  onRemoveTrackFromPlaylist,
}) {
  if (!selected) return null;

  const isPlaylist = Boolean(selected.isPlaylist);
  const trackIds = Array.isArray(selected.trackIds) ? selected.trackIds : [0, 1, 2, 3];

  return (
    <>
      <div className="collection-banner">
        <ImageWithFallback
          src={selected.image}
          alt={`${selected.title} artwork`}
          fallbackColor={selected.color || "#5b684d"}
        />
        <div>
          <span className="eyebrow">
            {isPlaylist ? "YOUR PLAYLIST" : "CURATED BY MOSS"}
          </span>
          <h2>
            <em>{selected.title}</em>
          </h2>
          <p>{selected.description || "A thoughtful selection for a slower moment."}</p>
          {trackIds.length > 0 && (
            <button className="olive-btn" onClick={() => onPlayTrack(trackIds[0])}>
              <Play size={16} fill="currentColor" /> Play {isPlaylist ? "playlist" : "collection"}
            </button>
          )}
        </div>
      </div>

      <div className="preview-note">
        Listening preview · Track names are editorial examples. Audio is
        independent SoundHelix demo music.
      </div>

      {trackIds.length > 0 ? (
        <TrackList
          indices={trackIds}
          current={current}
          playing={playing}
          liked={liked}
          onPlay={onPlayTrack}
          onToggleLike={onToggleLikeTrack}
          onAddToPlaylist={onAddToPlaylist}
          onRemoveTrack={isPlaylist ? onRemoveTrackFromPlaylist : undefined}
          playlistMode={isPlaylist}
        />
      ) : (
        <div className="empty" style={{ margin: "30px 0" }}>
          <Music2 size={32} />
          <h3>This playlist is quiet right now.</h3>
          <p>Add songs from any collection or search using the + button on track rows.</p>
        </div>
      )}
    </>
  );
}
