// ============================================================
// WINDOW — the invisible glass (only runs inside Tauri)
// ============================================================

if (window.__TAURI__) {
	const { getCurrentWindow, currentMonitor, cursorPosition,
					PhysicalPosition, PhysicalSize } = window.__TAURI__.window;
	const win = getCurrentWindow();

	// make the window a full-width strip sitting on the taskbar
	async function placeWindow() {
		const mon = await currentMonitor();
		const area = mon.workArea ?? { position: mon.position, size: mon.size };
		const height = Math.round(STRIP_HEIGHT * mon.scaleFactor);
		// await win.setSize(new PhysicalSize(area.size.width, height));
		await win.setSize(new PhysicalSize(area.size.width, area.size.height));
		await win.setPosition(new PhysicalPosition(
			area.position.x,
			// area.position.y + area.size.height - height
			area.position.y
		));
	}

	// click-through everywhere except on the cat
	let ignoring = null;
	async function checkCursor() {
		const p = await cursorPosition();
		const w = await win.outerPosition();
		const s = await win.scaleFactor();
		const cx = (p.x - w.x) / s;               // cursor inside the page
		const cy = (p.y - w.y) / s;
		const r = cat.getBoundingClientRect();
		const overCat = cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
		if (ignoring !== !overCat) {
			ignoring = !overCat;
			await win.setIgnoreCursorEvents(ignoring);
		}
	}

	placeWindow();
	setInterval(() => checkCursor().catch(console.error), 50);
}