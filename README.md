# Docidv iframe Test

A simple web application for testing iframe integrations with a dynamic URL control panel.

## Features

- **Side Panel Control**: A left-side panel with URL input field and apply button
- **Dynamic URL Loading**: Change the iframe source URL on the fly
- **Real-time Header Updates**: The header displays the currently loaded URL
- **Loading Indicators**: Visual feedback while the iframe loads
- **Keyboard Support**: Press Enter in the input field to apply the URL

## Usage

1. Enter a URL in the input field on the left panel
2. Click "Apply URL" or press Enter to load the URL in the iframe
3. The header will update to show the current URL being tested

## Default URL

The application loads with the default URL:

```
https://go.dev7.idnow.de/docidv?identToken=DV7-RHULQ
```

## Deployment

This project is deployed on GitHub Pages at:
https://mohamedayoub-ghaddab-idnow.github.io/docidv-iframe-test/

## Technical Details

- Pure HTML, CSS, and JavaScript (no frameworks required)
- Responsive flexbox layout
- iframe with full permissions for camera, microphone, geolocation, etc.
- Sandbox attributes for security

## Local Development

Simply open `index.html` in a web browser:

```bash
open index.html
```

Or use a local server:

```bash
python -m http.server 8000
# Then visit http://localhost:8000
```
