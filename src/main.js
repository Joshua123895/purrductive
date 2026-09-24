const { getCurrentWindow, currentMonitor, PhysicalPosition } = window.__TAURI__.window;

async function sitOnTaskbar() {
  const win = getCurrentWindow();
  const mon = await currentMonitor();
  const size = await win.outerSize();
  // workArea = screen minus taskbar; fall back to the full screen if missing
  const area = mon.workArea ?? { position: mon.position, size: mon.size };
  const x = area.position.x + area.size.width - size.width - 40;
  const y = area.position.y + area.size.height - size.height;
  await win.setPosition(new PhysicalPosition(x, y));
}

sitOnTaskbar();