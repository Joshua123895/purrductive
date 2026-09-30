// ============================================================
// SETTINGS — the only file you'll edit often
// ============================================================

// --- sizes and speeds ---
const SCALE = 4;              // pixel art drawn 4× bigger
const FRAME_W = 45;           // one frame in your drawing (px)
const FRAME_H = 32;
const STRIP_HEIGHT = 200;     // height of the invisible window (px)
const WALK_SPEED = 60;        // px per second
const DEMO = true;            // cat changes mood on its own — set false later

// --- every flipbook: file, number of frames, speed, loop or play-once ---
// not drawn yet? leave it out — the cat will snap instead
const ANIMS = {
	sit:     { src: 'assets/duck/white/sit.png',     frames: 6, fps: 8,  loop: true  },
	walk:    { src: 'assets/duck/white/walk.png',    frames: 4, fps: 8,  loop: true  },
	quack:   { src: 'assets/duck/white/quack.png',   frames: 3, fps: 8,  loop: false },
	// sleep:   { src: 'assets/cat/orange/sleep.png',   frames: 2, fps: 2,  loop: true  },
	// standUp: { src: 'assets/cat/orange/standup.png', frames: 3, fps: 10, loop: false },
	// sitDown: { src: 'assets/cat/orange/sitdown.png', frames: 3, fps: 10, loop: false },
	// lieDown: { src: 'assets/cat/orange/liedown.png', frames: 4, fps: 8,  loop: false },
	// wakeUp:  { src: 'assets/cat/orange/wakeup.png',  frames: 4, fps: 8,  loop: false },
};

// --- the tracks: from state → to state = which transition plays between ---
const TRACKS = {
	sit:   { walk: 'standUp', sleep: 'lieDown' },
	walk:  { sit: 'sitDown' },
	sleep: { sit: 'wakeUp' },
};