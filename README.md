# How to Install

## 1. Install tools

You need **Git**, **Node.js (LTS)** and **Rust**, plus one system package that depends on your OS.

### macOS

```bash
# 1. Apple's compiler tools (a popup appears — click Install)
xcode-select --install
 
# 2. Rust
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
# press Enter for the default install, then restart the terminal
 
# 3. Node.js LTS — download the installer from https://nodejs.org
```

### Windows

1. **Microsoft C++ Build Tools**: install "Build Tools for Visual Studio" from Microsoft and tick **Desktop development with C++**.
2. **Rust**: download and run `rustup-init.exe` from https://rustup.rs, accepting the defaults.
3. **Node.js LTS**: download the installer from https://nodejs.org.
4. **WebView2**: already included in Windows 10 and 11, so there's nothing to do.
   Restart your terminal after installing.

### Check everything is installed

```bash
git --version
node --version
rustc --version
```

All three should print a version number. If one says "command not found", install that tool again and restart the terminal.

---

## 2. Get the project and run it

```bash
git clone <YOUR-REPO-URL>
cd purrductive
npm install
npm run tauri dev
```

The **first run takes 3–10 minutes** while Rust compiles everything. After that it starts in seconds.
When it's ready, the cat appears in the bottom-right corner, sitting on your taskbar or Dock.

To stop it, press `Ctrl + C` in the terminal.

---

## 3. Build an installer (optional)

```bash
npm run tauri build
npm run tauri dev # running the apps
```

The installer ends up in `src-tauri/target/release/bundle/`:

| OS      | You get                          |
| ------- | -------------------------------- |
| Windows | `.msi` and `.exe` installers |
| macOS   | `.app` and `.dmg`            |

You can only build for the OS you're on: build the Mac version on a Mac and the Windows version on Windows.

The app isn't code-signed yet, so the first time you open it:

- **macOS:** right-click the app → **Open** → **Open**.
- **Windows:** on the SmartScreen warning, click **More info** → **Run anyway**.

---

## Troubleshooting

| Problem                                                           | Fix                                                                                                                                               |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `linker 'link.exe' not found` (Windows)                         | The C++ Build Tools are missing. See step 1.                                                                                                      |
| `xcrun: error` (macOS)                                          | Run`xcode-select --install` again.                                                                                                              |
| Nothing appears on screen                                         | Temporarily give`<body>` in `src/index.html` a red background to find the window, then right-click → **Inspect** → **Console**. |
| Console says`... not allowed on window "cat"`                   | In`src-tauri/capabilities/default.json`, the `"windows"` list must include `"cat"`. Restart the app after changing it.                      |
| Window has a black/white box instead of being see-through (macOS) | `src-tauri/tauri.conf.json` needs `"macOSPrivateApi": true` inside `"app"`.                                                                 |
| Build is huge / git is slow                                       | Make sure`node_modules/` and `src-tauri/target/` are in `.gitignore`.                                                                       |
