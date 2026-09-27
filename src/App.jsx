import React, { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, ArrowUpRight } from "lucide-react";
import { collections, tracks, defaultPlaylists, moods } from "./data/catalog";
import { formatTime, filterCollections } from "./utils/format";
import {
  loadLikes,
  saveLikes,
  loadSaved,
  saveSaved,
  loadPlaylists,
  savePlaylists,
  loadSettings,
  saveSetting,
} from "./utils/storage";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Player } from "./components/Player";
import { QueuePanel } from "./components/QueuePanel";
import { Modals } from "./components/Modals";
import { Toast } from "./components/Toast";

import { HomeView } from "./views/HomeView";
import { DiscoverView } from "./views/DiscoverView";
import { SearchView } from "./views/SearchView";
import { LibraryView } from "./views/LibraryView";
import { LikedSongsView } from "./views/LikedSongsView";
import { CollectionView } from "./views/CollectionView";

export function App() {
  const initialSettings = loadSettings();

  const [page, setPage] = useState("Home");
  const [mood, setMood] = useState("For you");
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(() => loadLikes());
  const [saved, setSaved] = useState(() => loadSaved());
  const [customPlaylists, setCustomPlaylists] = useState(() => loadPlaylists());
  const [modal, setModal] = useState(null);
  const [addToPlaylistTrackId, setAddToPlaylistTrackId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [queue, setQueue] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(initialSettings.volume);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(initialSettings.repeat);
  const [compact, setCompact] = useState(initialSettings.compact);
  const [toast, setToast] = useState("");

  const audio = useRef(null);
  const track = tracks[current] || tracks[0];

  const allPlaylists = [...defaultPlaylists, ...customPlaylists];

  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document.querySelector(".search-box input")?.focus();
      }
      if (e.key === "Escape") {
        setModal(null);
        setQueue(false);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    saveLikes(liked);
  }, [liked]);

  useEffect(() => {
    saveSaved(saved);
  }, [saved]);

  useEffect(() => {
    savePlaylists(customPlaylists);
  }, [customPlaylists]);

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = volume;
    }
    saveSetting("volume", volume);
  }, [volume]);

  useEffect(() => {
    saveSetting("repeat", repeat);
  }, [repeat]);

  useEffect(() => {
    saveSetting("compact", compact);
  }, [compact]);

  useEffect(() => {
    if (!audio.current) return;
    if (playing) {
      audio.current.play().catch(() => {
        setPlaying(false);
        notify("Audio could not load. Please try again.");
      });
    } else {
      audio.current.pause();
    }
  }, [playing, current]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  function notify(text) {
    setToast(text);
  }

  function navigate(p) {
    setPage(p);
    setSelected(null);
    if (p !== "Search") {
      setQuery("");
    }
  }

  function play(i = current) {
    setCurrent(i);
    setPlaying(true);
  }

  function next(dir = 1) {
    setCurrent((v) =>
      shuffle
        ? Math.floor(Math.random() * tracks.length)
        : (v + dir + tracks.length) % tracks.length
    );
    setTime(0);
  }

  function handleSeek(newTime) {
    if (audio.current) {
      audio.current.currentTime = newTime;
    }
    setTime(newTime);
  }

  function toggleLike(i) {
    setLiked((v) => (v.includes(i) ? v.filter((x) => x !== i) : [...v, i]));
  }

  function toggleSaveCollection(id) {
    setSaved((v) =>
      v.includes(id) ? v.filter((x) => x !== id) : [...v, id]
    );
  }

  function openCollection(c) {
    setSelected({
      ...c,
      isPlaylist: false,
    });
    setPage("Collection");
  }

  function openPlaylist(p) {
    const playlistIndex = allPlaylists.findIndex((x) => x.id === p.id);
    setSelected({
      id: p.id,
      title: p.name,
      description: p.description || "Your own little corner of sound.",
      image: collections[Math.abs(playlistIndex) % collections.length].image,
      trackIds: p.trackIds || [0, 1, 2, 3],
      isPlaylist: true,
      isCustom: p.isCustom,
    });
    setPage("Collection");
  }

  function handleCreatePlaylist(name) {
    const newPl = {
      id: `pl-${Date.now()}`,
      name,
      trackIds: [],
      isCustom: true,
    };
    setCustomPlaylists((prev) => [...prev, newPl]);
    notify("Your new playlist is ready.");
    navigate("Your library");
  }

  function handleDeletePlaylist(id) {
    setCustomPlaylists((prev) => prev.filter((p) => p.id !== id));
    if (selected && selected.id === id) {
      navigate("Your library");
    }
    notify("Playlist deleted.");
  }

  function handleOpenAddToPlaylist(trackId) {
    setAddToPlaylistTrackId(trackId);
    setModal("addToPlaylist");
  }

  function handleAddTrackToPlaylist(playlistId, trackId) {
    setCustomPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          const currentTracks = pl.trackIds || [];
          if (currentTracks.includes(trackId)) return pl;
          return { ...pl, trackIds: [...currentTracks, trackId] };
        }
        return pl;
      })
    );
    notify("Added to playlist.");
  }

  function handleRemoveTrackFromPlaylist(itemIndex) {
    if (!selected || !selected.isPlaylist) return;
    const newTrackIds = [...selected.trackIds];
    newTrackIds.splice(itemIndex, 1);

    setSelected({
      ...selected,
      trackIds: newTrackIds,
    });

    setCustomPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === selected.id) {
          return { ...pl, trackIds: newTrackIds };
        }
        return pl;
      })
    );
    notify("Removed track from playlist.");
  }

  const filtered = filterCollections(collections, mood, query);

  return (
    <div className={compact ? "app compact" : "app"}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <audio
        ref={audio}
        src={`https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(track.audioIndex || current + 1)}.mp3`}
        onTimeUpdate={() => audio.current && setTime(audio.current.currentTime)}
        onLoadedMetadata={() => audio.current && setDuration(audio.current.duration)}
        onEnded={() => {
          if (repeat) {
            if (audio.current) {
              audio.current.currentTime = 0;
              audio.current.play();
            }
          } else {
            next();
          }
        }}
        onError={() => {
          if (playing) {
            setPlaying(false);
            notify("Preview unavailable. Check your connection and retry.");
          }
        }}
      />

      <Sidebar
        page={page}
        navigate={navigate}
        likedCount={liked.length}
        playlists={allPlaylists}
        onOpenPlaylist={openPlaylist}
        openModal={setModal}
      />

      <div className="workspace">
        <Header
          query={query}
          setQuery={setQuery}
          navigate={navigate}
          openModal={setModal}
        />

        <main id="main">
          <div className="greeting">
            <div>
              <div className="eyebrow">YOUR DAILY DOSE OF GOOD SOUND</div>
              <h1>
                {page === "Home" ? (
                  <>
                    Find your natural <em>rhythm.</em>
                  </>
                ) : page === "Discover" ? (
                  <>
                    A world to <em>discover.</em>
                  </>
                ) : page === "Search" ? (
                  <>
                    Find your next <em>favorite.</em>
                  </>
                ) : page === "Your library" ? (
                  <>
                    Your little <em>collection.</em>
                  </>
                ) : page === "Liked songs" ? (
                  <>
                    Close to your <em>heart.</em>
                  </>
                ) : (
                  <em>{selected?.title}</em>
                )}
              </h1>
              <p>
                {page === "Home"
                  ? "A familiar favorite. A new discovery. A moment, just for you."
                  : page === "Liked songs"
                    ? `${liked.length} songs you keep coming back to.`
                    : page === "Your library"
                      ? "The sounds you’ve made your own."
                      : page === "Collection"
                        ? selected?.description
                        : "Follow your curiosity. See where the music takes you."}
              </p>
            </div>
            <span className="date-note">
              <span className="tiny-sun">☼</span> Less noise. More feeling.
            </span>
          </div>

          {["Home", "Discover", "Search"].includes(page) && (
            <div className="moods">
              {moods.map((m) => (
                <button
                  className={mood === m ? "selected" : ""}
                  onClick={() => setMood(m)}
                  key={m}
                >
                  {m}
                </button>
              ))}
              <button
                className="tune"
                onClick={() => setModal("settings")}
                aria-label="Customize listening"
              >
                <SlidersHorizontal size={17} />
              </button>
            </div>
          )}

          {page === "Home" && (
            <HomeView
              filteredCollections={filtered}
              mood={mood}
              saved={saved}
              onToggleSaveCollection={toggleSaveCollection}
              onOpenCollection={openCollection}
              onPlayTrack={play}
              current={current}
              playing={playing}
              liked={liked}
              onToggleLikeTrack={toggleLike}
              onAddToPlaylist={handleOpenAddToPlaylist}
              onOpenQueue={() => setQueue(true)}
              navigate={navigate}
              setMood={setMood}
              notify={notify}
            />
          )}

          {page === "Discover" && (
            <DiscoverView
              filteredCollections={filtered}
              mood={mood}
              saved={saved}
              onToggleSaveCollection={toggleSaveCollection}
              onOpenCollection={openCollection}
              setMood={setMood}
            />
          )}

          {page === "Search" && (
            <SearchView
              query={query}
              setQuery={setQuery}
              filteredCollections={filtered}
              saved={saved}
              onToggleSaveCollection={toggleSaveCollection}
              onOpenCollection={openCollection}
              current={current}
              playing={playing}
              liked={liked}
              onPlayTrack={play}
              onToggleLikeTrack={toggleLike}
              onAddToPlaylist={handleOpenAddToPlaylist}
              setMood={setMood}
            />
          )}

          {page === "Your library" && (
            <LibraryView
              savedCollections={collections.filter((c) => saved.includes(c.id))}
              onOpenCollection={openCollection}
              onToggleSaveCollection={toggleSaveCollection}
              saved={saved}
              playlists={allPlaylists}
              onOpenPlaylist={openPlaylist}
              onDeletePlaylist={handleDeletePlaylist}
              navigate={navigate}
            />
          )}

          {page === "Liked songs" && (
            <LikedSongsView
              liked={liked}
              current={current}
              playing={playing}
              onPlayTrack={play}
              onToggleLikeTrack={toggleLike}
              onAddToPlaylist={handleOpenAddToPlaylist}
              navigate={navigate}
            />
          )}

          {page === "Collection" && selected && (
            <CollectionView
              selected={selected}
              current={current}
              playing={playing}
              liked={liked}
              onPlayTrack={play}
              onToggleLikeTrack={toggleLike}
              onAddToPlaylist={handleOpenAddToPlaylist}
              onRemoveTrackFromPlaylist={handleRemoveTrackFromPlaylist}
            />
          )}

          <footer>
            <span className="footer-logo">moss.</span>
            <span>Music for being human.</span>
            <button onClick={() => setModal("about")}>
              About this experience <ArrowUpRight size={13} />
            </button>
          </footer>
        </main>
      </div>

      <Player
        track={track}
        current={current}
        playing={playing}
        setPlaying={setPlaying}
        onNext={() => next(1)}
        onPrev={() => next(-1)}
        shuffle={shuffle}
        setShuffle={setShuffle}
        repeat={repeat}
        setRepeat={setRepeat}
        time={time}
        duration={duration}
        onSeek={handleSeek}
        volume={volume}
        setVolume={setVolume}
        isLiked={liked.includes(current)}
        onToggleLike={toggleLike}
        queueOpen={queue}
        setQueueOpen={setQueue}
        onOutputInfo={() =>
          notify("Playing through your browser’s selected audio output.")
        }
      />

      {queue && (
        <QueuePanel
          current={current}
          onClose={() => setQueue(false)}
          onPlay={play}
        />
      )}

      <Toast message={toast} />

      <Modals
        modal={modal}
        onClose={() => setModal(null)}
        onCreatePlaylist={handleCreatePlaylist}
        playlists={allPlaylists}
        addToPlaylistTrackId={addToPlaylistTrackId}
        onAddTrackToPlaylist={handleAddTrackToPlaylist}
        compact={compact}
        setCompact={setCompact}
        repeat={repeat}
        setRepeat={setRepeat}
        likedCount={liked.length}
        savedCount={saved.length}
        onVisitLibrary={() => navigate("Your library")}
        notify={notify}
      />
    </div>
  );
}

export default App;
