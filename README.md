# Docidv iframe Integration Tester

A fullscreen, dark-themed browser tool for testing iframe integrations. Configure the source URL, dimensions, sandbox permissions, and feature permissions from a collapsible left sidebar — no build step required.

## Features

- **URL Settings** — change the iframe source on the fly (button or Enter key)
- **Dimensions** — set a custom pixel width/height; the wrapper scrolls if the iframe exceeds the viewport
- **Sandbox controls** — toggle the `sandbox` attribute on/off and pick individual permissions from a full 12-item checklist
- **Allow attributes** — toggle feature permissions (camera, microphone, geolocation, fullscreen, clipboard-read, clipboard-write, web-share) via checkboxes
- **Collapsible sections** — each sidebar section can be folded/unfolded
- **Fullscreen responsive layout** — fills the viewport; stacks vertically on mobile (≤ 768 px)

## Usage

1. Open `index.html` in a browser (or serve with a local server — see below)
2. Use the left sidebar to configure the iframe:
   - **URL Settings** → enter a URL and click *Apply URL*
   - **Dimensions** → enter height/width in px and click *Apply* (leave blank to fill the viewport)
   - **Sandbox controls** → enable the sandbox attribute, check the desired permissions, click *Apply*
   - **Allow attributes** → check the desired feature permissions, click *Apply*

## Default URL

```
https://go.dev8.idnow.de/docidv/channel-chooser/web?identToken=DV8-CQGVP
```

## Project Structure

```
docidv-iframe-test/
├── index.html      # HTML shell — sidebar markup + iframe
├── styles.css      # All styles
├── app.js          # All JavaScript
└── README.md
```

## Local Development

Open directly:

```bash
open index.html
```

Or serve via a local server:

```bash
python -m http.server 8000
# visit http://localhost:8000
```

## Deployment

Hosted on GitHub Pages:

```
https://mohamedayoub-ghaddab-idnow.github.io/docidv-iframe-test/
```

To deploy:

```bash
git remote add pages https://github.com/mohamedayoub-ghaddab-idnow/docidv-iframe-test.git
git push pages main
```

## Technical Details

- Pure HTML, CSS, and JavaScript — no frameworks or build process
- Fullscreen flexbox layout (`100vh`), dark theme
- iframe `allow` and `sandbox` attributes are rebuilt dynamically from checkbox state
