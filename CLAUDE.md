# Claude Instructions for NanoArcade Manager

**READ THIS FILE AFTER EVERY CONTEXT COMPACTION**

## Project Overview

NanoArcade Manager is a browser-based retro game collection manager supporting multiple handheld operating systems. It runs entirely client-side with no backend server.

## Technology Stack

- **Frontend**: Vanilla JavaScript, jQuery, HTML5, SCSS/CSS
- **APIs Used**:
  - TheGamesDB (box art)
  - GameFAQs (box art + game info)
- **Browser APIs**: File System Access API (Chrome/Edge only)
- **Styling**: SCSS with FontAwesome icons, Press Start 2P font

## Project Structure

```
NanoArcade Manager/
├── index.html          # Main application entry point
├── assets/
│   ├── css/           # Compiled CSS
│   ├── js/            # JavaScript files (main.js is core logic)
│   ├── sass/          # SCSS source files
│   ├── images/        # Logo and assets
│   └── webfonts/      # FontAwesome fonts
├── icons/             # Console icons (nes.png, snes.png, etc.)
├── .config.json       # Configuration file
└── README.md          # User documentation
```

## Supported Operating Systems

| OS | Image Path Pattern | Box Art Size |
|----|-------------------|--------------|
| **MustardOS** | `MUOS/info/catalogue/<System>/box/` | 324px/380px/450px |
| **Onion OS** | `Roms/<Console>/Imgs/` | 250px |
| **DrUm78** | `ROMs/<Console>/` (next to ROM) | 240px |
| **MinUI** | `Roms/<Console>/.res/` | 200px/300px |
| **NextUI** | `Roms/<Console>/.media/` | 200px/300px/500px |

## Key Files

- **`assets/js/main.js`** - Core application logic
- **`assets/css/main.css`** - Compiled styles
- **`assets/sass/main.scss`** - SCSS entry point
- **`index.html`** - Application shell and UI structure

## Development Notes

- **No build process required** - Static HTML/JS/CSS
- **Browser compatibility** - Chrome, Edge, Opera only (requires File System Access API)
- **Firefox not supported** - Shows friendly warning modal

## GitHub Repository

- **Repo URL**: https://github.com/audioslayer/NanoArcade
- **Live Demo**: https://audioslayer.github.io/NanoArcade/
- **Branch**: main

## Common Tasks

### Testing Changes
Open `index.html` directly in Chrome/Edge or use a local server:
```bash
npx serve .
```

### Compiling SCSS (if needed)
```bash
sass assets/sass/main.scss assets/css/main.css
```

## Server Information

- **Unraid Server IP**: 192.168.189.190
- **User**: root

### Check CPU Usage
```bash
ssh root@192.168.189.190 "top -bn1 | head -20"
```

### Common Docker Commands
```bash
# List running containers
ssh root@192.168.189.190 "docker ps"

# View container logs
ssh root@192.168.189.190 "docker logs -f <container-name>"

# Restart a container
ssh root@192.168.189.190 "docker restart <container-name>"
```

---

**Last Updated**: January 31, 2026
