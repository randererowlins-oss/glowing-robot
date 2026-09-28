/**
 * Pure playback-order logic.
 *
 * Keeping this separate from the React component tree makes queue navigation
 * and repeat behaviour unit-testable, which the launch roadmap calls for
 * ("Automate unit tests for filtering, queue navigation, repeat...").
 */

export const REPEAT_MODES = ["off", "all", "one"];

/**
 * Accepts both the current string schema and the legacy boolean that earlier
 * builds persisted to localStorage, so returning visitors keep their setting.
 */
export function normalizeRepeat(value) {
  if (value === true) return "one";
  return REPEAT_MODES.includes(value) ? value : "off";
}

export function nextRepeatMode(mode) {
  const index = REPEAT_MODES.indexOf(normalizeRepeat(mode));
  return REPEAT_MODES[(index + 1) % REPEAT_MODES.length];
}

function clamp01(value) {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value >= 1) return 0.999999;
  return value;
}

/**
 * Resolves the index to move to when stepping through the queue.
 *
 * Shuffle only affects forward navigation — pressing "previous" while shuffle
 * is on should still walk backwards, not jump somewhere random. The shuffled
 * pick also never lands on the current track, so "next" always advances.
 */
export function nextIndex({
  current,
  length,
  dir = 1,
  shuffle = false,
  random = Math.random,
}) {
  if (!Number.isFinite(length) || length <= 0) return 0;
  const from = Number.isFinite(current) ? current : 0;

  if (shuffle && dir > 0) {
    if (length === 1) return 0;
    const pick = Math.floor(clamp01(random()) * (length - 1));
    return pick >= from ? pick + 1 : pick;
  }

  return (((from + dir) % length) + length) % length;
}

/**
 * Decides what happens when a track finishes.
 *
 * - "one" replays the same track.
 * - "all" advances and wraps back to the start at the end of the queue.
 * - "off" advances, but stops once the last track finishes.
 */
export function resolveEnded({ current, length, repeat, shuffle = false, random = Math.random }) {
  const mode = normalizeRepeat(repeat);

  if (mode === "one") {
    return { action: "replay", index: current };
  }

  if (mode === "off" && current >= length - 1) {
    return { action: "stop", index: current };
  }

  return {
    action: "goto",
    index: nextIndex({ current, length, dir: 1, shuffle, random }),
  };
}
