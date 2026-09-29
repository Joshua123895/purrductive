// ============================================================
// PLAYER — flips the pages and moves the cat
// ============================================================

const FW = FRAME_W * SCALE;   // one frame on screen
const FH = FRAME_H * SCALE;

const cat = document.getElementById('cat');
cat.style.width = FW + 'px';
cat.style.height = FH + 'px';

// --- memory ---
let current;        // the flipbook playing now
let currentName;    // its name
let pose = 'sit';   // the state the cat is in (or heading into)
let frame = 0;      // which page
let queue = [];     // flipbooks waiting to play
let lastFrameTime = 0;
let lastTime = 0;
let x = 0 * SCALE;        // cat position from the left (-12)
let dir = 1;        // 1 = facing right, -1 = facing left

// --- GPS: find the path between two states, via 'sit' if needed ---
function route(from, to) {
	if (from === to) return [];
	const track = TRACKS[from]?.[to];
	if (track) return [track, to];
	if (from === 'sit' || to === 'sit') return [to];   // no transition drawn: snap
	return [...route(from, 'sit'), ...route('sit', to)];
}

// --- load one flipbook ---
function show(name) {
	current = ANIMS[name];
	currentName = name;
	frame = 0;
	pose = current.loop ? name : (queue[0] ?? pose);
	cat.style.backgroundImage = `url(${current.src})`;
	cat.style.backgroundSize = `${current.frames * FW}px ${FH}px`;
	draw();
}

// --- put the current page on screen (backwards if the flipbook says so) ---
function draw() {
	const page = current.reverse ? current.frames - 1 - frame : frame;
	cat.style.backgroundPosition = `${-page * FW}px 0`;
}

// --- heartbeat: runs ~60 times per second ---
function tick(t) {
	const dt = lastTime ? (t - lastTime) / 1000 : 0;   // seconds since last beat
	lastTime = t;

	// next page, if enough time has passed
	if (t - lastFrameTime >= 1000 / current.fps) {
		lastFrameTime = t;
		frame++;
		if (frame >= current.frames) {            // end of this flipbook
			if (DEMO) demoStep();                   // demo may queue the next move
			if (queue.length) show(queue.shift());  // next step of the route
			else if (current.loop) frame = 0;       // keep looping
			else show(pose);                        // transition done → loop the state
		}
		draw();
	}

	// walking moves the cat and turns it at the edges
	if (currentName === 'walk') {
		x += dir * WALK_SPEED * dt;
		const maxX = window.innerWidth - FW;
		if (x > maxX) { x = maxX; dir = -1; }
		if (x < 0)    { x = 0;    dir = 1;  }
	}
	cat.style.left = x + 'px';
	cat.style.transform = `scaleX(${dir})`;     // drawn facing right

	requestAnimationFrame(tick);
}

// --- remote control: the ONE function the rest of the app calls ---
function goTo(target) {
	if (!ANIMS[target]) return;
	queue = route(pose, target).filter((name) => ANIMS[name]);
}

// --- start ---
show('sit');
requestAnimationFrame(tick);

// petting placeholder: click the cat and it sits
cat.addEventListener('click', () => goTo('sit'));

// demo: sit a few loops → stand up → sit back down → repeat
// runs at the end of every flipbook, so moves never cut an animation short
const DEMO_SIT_LOOPS = 3;
let sitLoops = 0;
function demoStep() {
	if (currentName !== 'sit' || queue.length) return;
	if (++sitLoops < DEMO_SIT_LOOPS) return;
	sitLoops = 0;
	queue = ['standUp', 'sit'];
}