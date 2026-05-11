# Testing Checklist Context

Quick reference for testing iframe integrations in this project.

## Pre-Test Checklist

1. **URL is reachable** — Verify the iframe URL loads standalone in a browser tab
2. **HTTPS vs HTTP** — Mixed content (HTTPS parent, HTTP iframe) will be blocked
3. **X-Frame-Options** — Target site may block embedding via HTTP headers
4. **CSP frame-ancestors** — Content Security Policy may prevent embedding

## Common Issues

### iframe shows blank

- Check browser console for errors
- Verify X-Frame-Options / CSP headers on target site
- Try removing `sandbox` attribute temporarily to isolate the issue

### Camera/microphone not working

- Ensure `allow="camera; microphone"` is set
- Ensure the URL uses HTTPS (required for getUserMedia)
- Check if parent page has the permission granted
- Verify sandbox includes `allow-scripts` (needed for JS API calls)

### Forms not submitting

- Ensure sandbox includes `allow-forms`
- Check if target requires `allow-same-origin` for CSRF tokens

### Popups blocked

- Add `allow-popups` to sandbox
- For popups that need full privileges, add `allow-popups-to-escape-sandbox`

### "Still loading..." message persists

- Target site may be slow or unreachable
- Check network tab for failed requests
- Verify identToken (or other params) are valid

## Testing Matrix

| Feature | Required Attributes |
|---------|-------------------|
| Basic page load | `sandbox="allow-scripts allow-same-origin"` |
| Form submission | + `allow-forms` |
| Camera access | `allow="camera"` + HTTPS |
| Microphone access | `allow="microphone"` + HTTPS |
| Popups | + `allow-popups` |
| Downloads | + `allow-downloads` |
| Clipboard | `allow="clipboard-read; clipboard-write"` |
| Fullscreen | `allow="fullscreen"` + `allowfullscreen` attribute |

## Debug Tips

1. **Remove all restrictions first** — Start with no sandbox, minimal allow
2. **Add back one at a time** — Find the minimum required
3. **Check both parent and iframe console** — Errors may appear in either
4. **Test in incognito** — Rules out extension interference
5. **Verify on mobile** — Some permissions behave differently on mobile

## Docidv-Specific Notes

- Default URL: `https://go.dev8.idnow.de/docidv/channel-chooser/web?identToken=...`
- Requires: camera, microphone (for video identification)
- Uses: postMessage for cross-frame communication
- Sandbox minimum: `allow-same-origin allow-scripts allow-forms`
