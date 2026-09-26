const { getCurrentWindow, currentMonitor, PhysicalPosition } = window.__TAURI__.window;

async function sitOnTaskbar() {
	const win = getCurrentWindow();
	const mon = await currentMonitor();
	const size = await win.outerSize();
	// workArea = screen minus taskbar; fall back to the full screen if missing
	const area = mon.workArea ?? { position: mon.position, size: mon.size };
	console.log(size);
	console.log(area);
	console.log(mon);
	const x = area.position.x + Math.floor((area.size.width - size.width) * 0) + 40;
	const y = area.position.y + Math.floor((area.size.height - size.height) * 1);
	await win.setPosition(new PhysicalPosition(x, y));
}

sitOnTaskbar();

function resizeAllImages() {
	const SCALE = 4; // 4 times bigger
	const img = document.querySelector("img");
	img.width = img.naturalWidth * SCALE;
	img.height = img.naturalHeight * SCALE;
}

resizeAllImages();
