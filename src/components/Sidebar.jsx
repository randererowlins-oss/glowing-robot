import React from "react";
import {
  Home,
  Compass,
  Search,
  Library,
  Heart,
  Plus,
  Leaf,
  Settings2,
  ArrowUpRight,
} from "lucide-react";

export function Sidebar({
  page,
  navigate,
  likedCount = 0,
  playlists = [],
  onOpenPlaylist,
  openModal,
}) {
  const dotColors = ["#8c977d", "#b89a77", "#8a9196"];

  return (
    <aside className="sidebar">
      <button
        className="logo"
        onClick={() => navigate("Home")}
        aria-label="Moss home"
      >
        <span className="logo-mark">
          <i />
          <i />
          <i />
        </span>
        moss<span className="registered">®</span>
      </button>
      <div className="sidebar-caption">A LITTLE CLOSER TO THE MUSIC.</div>

      <nav>
        {[
          [Home, "Home"],
          [Compass, "Discover"],
          [Search, "Search"],
        ].map(([Icon, label]) => (
          <button
            className={page === label ? "nav-item active" : "nav-item"}
            onClick={() => navigate(label)}
            key={label}
          >
            <Icon size={19} />
            {label}
            {page === label && <span className="nav-dot" />}
          </button>
        ))}
      </nav>

      <div className="library-label">
        YOUR SPACE{" "}
        <button
          aria-label="Create playlist"
          onClick={() => openModal("playlist")}
        >
          <Plus size={17} />
        </button>
      </div>

      <nav>
        {[
          [Library, "Your library"],
          [Heart, "Liked songs"],
        ].map(([Icon, label]) => (
          <button
            className={page === label ? "nav-item active" : "nav-item"}
            onClick={() => navigate(label)}
            key={label}
          >
            <Icon size={19} />
            {label}
            {label === "Liked songs" && <small>{likedCount}</small>}
          </button>
        ))}
      </nav>

      <div className="playlist-links">
        {playlists.map((p, i) => (
          <button
            key={p.id || p.name || i}
            onClick={() => onOpenPlaylist(p)}
          >
            <span
              className="playlist-dot"
              style={{ background: dotColors[i % 3] }}
            />
            {p.name}
          </button>
        ))}
        <button
          className="create-playlist"
          onClick={() => openModal("playlist")}
        >
          <Plus size={16} />
          Create playlist
        </button>
      </div>

      <div className="sidebar-bottom">
        <div className="premium-card">
          <span className="premium-icon">
            <Leaf size={19} />
          </span>
          <h3>
            Good music.
            <br />
            No interruptions.
          </h3>
          <p>A little more, with Moss Plus.</p>
          <button onClick={() => openModal("plus")}>
            Explore Plus <ArrowUpRight size={15} />
          </button>
        </div>
        <button className="settings" onClick={() => openModal("settings")}>
          <Settings2 size={17} />
          Settings & preferences
        </button>
      </div>
    </aside>
  );
}
