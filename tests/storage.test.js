import { describe, it, expect, beforeEach } from "vitest";
import {
  loadLikes,
  saveLikes,
  loadSaved,
  saveSaved,
  loadPlaylists,
  savePlaylists,
  loadSettings,
  saveSetting,
} from "../src/utils/storage";

describe("storage utilities", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("likes", () => {
    it("returns empty array when nothing is stored", () => {
      expect(loadLikes()).toEqual([]);
    });

    it("saves and loads likes correctly", () => {
      saveLikes([0, 2]);
      expect(loadLikes()).toEqual([0, 2]);
    });
  });

  describe("saved collections", () => {
    it("returns empty array when nothing is stored", () => {
      expect(loadSaved()).toEqual([]);
    });

    it("saves and loads saved collections correctly", () => {
      saveSaved([1, 3]);
      expect(loadSaved()).toEqual([1, 3]);
    });
  });

  describe("playlists", () => {
    it("migrates legacy string playlists into rich objects", () => {
      localStorage.setItem(
        "moss-playlists",
        JSON.stringify(["My Road Trip", "Focus Vibes"])
      );
      const loaded = loadPlaylists();
      expect(loaded).toHaveLength(2);
      expect(loaded[0].name).toBe("My Road Trip");
      expect(loaded[0].trackIds).toEqual([0, 1, 2, 3]);
      expect(loaded[1].name).toBe("Focus Vibes");
    });

    it("loads and saves modern structured playlists", () => {
      const custom = [
        { id: "pl-1", name: "Deep Study", trackIds: [0, 3], isCustom: true },
      ];
      savePlaylists(custom);
      const loaded = loadPlaylists();
      expect(loaded).toHaveLength(1);
      expect(loaded[0].id).toBe("pl-1");
      expect(loaded[0].trackIds).toEqual([0, 3]);
    });
  });

  describe("settings", () => {
    it("returns sensible default settings when empty", () => {
      const settings = loadSettings();
      expect(settings.compact).toBe(false);
      expect(settings.repeat).toBe("off");
      expect(settings.volume).toBe(0.65);
    });

    it("persists individual settings", () => {
      saveSetting("compact", true);
      saveSetting("repeat", "all");
      saveSetting("volume", 0.85);

      const settings = loadSettings();
      expect(settings.compact).toBe(true);
      expect(settings.repeat).toBe("all");
      expect(settings.volume).toBe(0.85);
    });

    it("migrates the legacy boolean repeat flag to a repeat mode", () => {
      localStorage.setItem("moss-repeat", JSON.stringify(true));
      expect(loadSettings().repeat).toBe("one");

      localStorage.setItem("moss-repeat", JSON.stringify(false));
      expect(loadSettings().repeat).toBe("off");
    });

    it("falls back to defaults for unusable stored values", () => {
      localStorage.setItem("moss-repeat", JSON.stringify("nonsense"));
      localStorage.setItem("moss-volume", JSON.stringify("loud"));
      localStorage.setItem("moss-compact", JSON.stringify("yes"));

      const settings = loadSettings();
      expect(settings.repeat).toBe("off");
      expect(settings.volume).toBe(0.65);
      expect(settings.compact).toBe(true);
    });
  });
});
