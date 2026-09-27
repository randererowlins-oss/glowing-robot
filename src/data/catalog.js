export const img = (id, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const collections = [
  {
    id: 0,
    title: "Slow mornings",
    description: "No rush. Just a little rhythm.",
    tag: "MOSS ORIGINAL",
    image: img("photo-1441974231531-c6227db76b6e"),
    count: 32,
    color: "#5b684d",
    mood: "Focus",
    trackIds: [0, 1, 2],
  },
  {
    id: 1,
    title: "Golden hour",
    description: "For the light that lingers.",
    tag: "MADE FOR THE MOMENT",
    image: img("photo-1470252649378-9c29740c9fa8"),
    count: 28,
    color: "#a58a55",
    mood: "Chill",
    trackIds: [1, 2, 3],
  },
  {
    id: 2,
    title: "A softer kind of indie",
    description: "Independent sounds. Open hearts.",
    tag: "MOSS ORIGINAL",
    image: img("photo-1472396961693-142e6e269027"),
    count: 45,
    color: "#748071",
    mood: "Indie",
    trackIds: [0, 2, 3],
  },
  {
    id: 3,
    title: "After the rain",
    description: "Clear your head. Find your calm.",
    tag: "TAKE A BREATHER",
    image: img("photo-1518837695005-2083093ee35b"),
    count: 24,
    color: "#697d85",
    mood: "Chill",
    trackIds: [0, 1, 3],
  },
  {
    id: 4,
    title: "Somewhere, nowhere",
    description: "A soundtrack for getting lost.",
    tag: "THE WANDERING KIND",
    image: img("photo-1464822759023-fed622ff2c3b"),
    count: 36,
    color: "#897864",
    mood: "Adventure",
    trackIds: [1, 3],
  },
];

export const tracks = [
  {
    id: 0,
    title: "Weightless",
    artist: "Marconi Union",
    album: "Ambient reflections",
    image: img("photo-1518837695005-2083093ee35b", 160),
    duration: "4:32",
    audioIndex: 1,
  },
  {
    id: 1,
    title: "Bloom",
    artist: "The Paper Kites",
    album: "Woodland",
    image: img("photo-1441974231531-c6227db76b6e", 160),
    duration: "3:30",
    audioIndex: 2,
  },
  {
    id: 2,
    title: "Holocene",
    artist: "Bon Iver",
    album: "Bon Iver",
    image: img("photo-1464822759023-fed622ff2c3b", 160),
    duration: "5:36",
    audioIndex: 3,
  },
  {
    id: 3,
    title: "A Walk",
    artist: "Tycho",
    album: "Dive",
    image: img("photo-1470252649378-9c29740c9fa8", 160),
    duration: "5:16",
    audioIndex: 4,
  },
];

export const defaultPlaylists = [
  {
    id: "default-sunday",
    name: "Sunday state of mind",
    description: "Your own little corner of sound.",
    trackIds: [0, 1, 2],
    isCustom: false,
  },
  {
    id: "default-road",
    name: "On the road",
    description: "Wide open horizons and easy tempo.",
    trackIds: [1, 2, 3],
    isCustom: false,
  },
  {
    id: "default-focus",
    name: "A little focus",
    description: "Quiet spaces for busy minds.",
    trackIds: [0, 3],
    isCustom: false,
  },
];

export const moods = [
  "For you",
  "Chill",
  "Focus",
  "Indie",
  "Adventure",
  "All music",
];
