import { describe, it, expect } from "vitest";
import {
  REPEAT_MODES,
  normalizeRepeat,
  nextRepeatMode,
  nextIndex,
  resolveEnded,
} from "../src/utils/queue";

describe("repeat modes", () => {
  it("normalises the legacy boolean schema", () => {
    expect(normalizeRepeat(true)).toBe("one");
    expect(normalizeRepeat(false)).toBe("off");
  });

  it("falls back to off for unknown values", () => {
    expect(normalizeRepeat(undefined)).toBe("off");
    expect(normalizeRepeat(null)).toBe("off");
    expect(normalizeRepeat("sometimes")).toBe("off");
  });

  it("passes through the three supported modes", () => {
    REPEAT_MODES.forEach((mode) => expect(normalizeRepeat(mode)).toBe(mode));
  });

  it("cycles off -> all -> one -> off", () => {
    expect(nextRepeatMode("off")).toBe("all");
    expect(nextRepeatMode("all")).toBe("one");
    expect(nextRepeatMode("one")).toBe("off");
  });
});

describe("queue navigation", () => {
  it("advances and wraps around the end", () => {
    expect(nextIndex({ current: 0, length: 4 })).toBe(1);
    expect(nextIndex({ current: 3, length: 4 })).toBe(0);
  });

  it("steps backwards and wraps around the start", () => {
    expect(nextIndex({ current: 3, length: 4, dir: -1 })).toBe(2);
    expect(nextIndex({ current: 0, length: 4, dir: -1 })).toBe(3);
  });

  it("ignores shuffle when moving backwards", () => {
    // Regression: previous used to jump to a random track while shuffle was on.
    for (let current = 0; current < 4; current += 1) {
      const expected = (current + 3) % 4;
      expect(
        nextIndex({
          current,
          length: 4,
          dir: -1,
          shuffle: true,
          random: () => 0.99,
        })
      ).toBe(expected);
    }
  });

  it("never shuffles onto the current track", () => {
    for (let current = 0; current < 4; current += 1) {
      for (let step = 0; step < 20; step += 1) {
        const index = nextIndex({
          current,
          length: 4,
          shuffle: true,
          random: () => step / 20,
        });
        expect(index).not.toBe(current);
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(4);
      }
    }
  });

  it("covers every other track when shuffling", () => {
    const picks = new Set();
    for (let step = 0; step < 3; step += 1) {
      picks.add(
        nextIndex({ current: 0, length: 4, shuffle: true, random: () => step / 3 })
      );
    }
    expect([...picks].sort()).toEqual([1, 2, 3]);
  });

  it("handles a single-track queue", () => {
    expect(nextIndex({ current: 0, length: 1, shuffle: true })).toBe(0);
  });

  it("handles an empty queue without producing a bad index", () => {
    expect(nextIndex({ current: 0, length: 0 })).toBe(0);
  });
});

describe("what happens when a track ends", () => {
  it("advances to the next track when repeat is off", () => {
    expect(resolveEnded({ current: 1, length: 4, repeat: "off" })).toEqual({
      action: "goto",
      index: 2,
    });
  });

  it("stops after the final track when repeat is off", () => {
    expect(resolveEnded({ current: 3, length: 4, repeat: "off" })).toEqual({
      action: "stop",
      index: 3,
    });
  });

  it("wraps back to the start when repeating all", () => {
    expect(resolveEnded({ current: 3, length: 4, repeat: "all" })).toEqual({
      action: "goto",
      index: 0,
    });
  });

  it("replays the same track when repeating one", () => {
    expect(resolveEnded({ current: 2, length: 4, repeat: "one" })).toEqual({
      action: "replay",
      index: 2,
    });
  });

  it("still shuffles when repeating all", () => {
    const result = resolveEnded({
      current: 3,
      length: 4,
      repeat: "all",
      shuffle: true,
      random: () => 0.5,
    });
    expect(result.action).toBe("goto");
    expect(result.index).not.toBe(3);
  });
});
