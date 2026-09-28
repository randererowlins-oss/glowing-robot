import { normalizeRepeat } from "./queue";

export function getStoredJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setStoredJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or private mode
  }
}

export function loadLikes() {
  const data = getStoredJSON("moss-likes", []);
  return Array.isArray(data) ? data : [];
}

export function saveLikes(likes) {
  setStoredJSON("moss-likes", likes);
}

export function loadSaved() {
  const data = getStoredJSON("moss-saved", []);
  return Array.isArray(data) ? data : [];
}

export function saveSaved(saved) {
  setStoredJSON("moss-saved", saved);
}

/**
 * Normalizes stored playlists to support both legacy string[] format
 * and rich objects with trackIds.
 */
export function loadPlaylists() {
  const data = getStoredJSON("moss-playlists", []);
  if (!Array.isArray(data)) return [];

  return data.map((item, i) => {
    if (typeof item === "string") {
      return {
        id: `pl-legacy-${i}-${encodeURIComponent(item)}`,
        name: item,
        trackIds: [0, 1, 2, 3],
        isCustom: true,
      };
    }
    return {
      id: item.id || `pl-${i}`,
      name: item.name || "Untitled Playlist",
      trackIds: Array.isArray(item.trackIds) ? item.trackIds : [0, 1, 2, 3],
      isCustom: true,
    };
  });
}

export function savePlaylists(playlists) {
  setStoredJSON("moss-playlists", playlists);
}

export function loadSettings() {
  const storedVolume = getStoredJSON("moss-volume", null);
  return {
    compact: Boolean(getStoredJSON("moss-compact", false)),
    // Migrates the legacy boolean (true -> "one") to the three-state mode.
    repeat: normalizeRepeat(getStoredJSON("moss-repeat", "off")),
    volume: typeof storedVolume === "number" ? storedVolume : 0.65,
  };
}

export function saveSetting(key, val) {
  setStoredJSON(`moss-${key}`, val);
}
