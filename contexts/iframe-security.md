# iframe Security Context

Reference for iframe `sandbox` and `allow` attributes used in this project.

## Sandbox Attribute Values

The `sandbox` attribute restricts iframe capabilities. When present without values, it applies maximum restrictions. Values *relax* specific restrictions.

### Available Values

| Value | Effect |
|-------|--------|
| `allow-downloads` | Allows downloads via `<a download>` or programmatic download |
| `allow-forms` | Allows form submission |
| `allow-modals` | Allows `alert()`, `confirm()`, `prompt()` and `beforeunload` |
| `allow-orientation-lock` | Allows locking screen orientation |
| `allow-pointer-lock` | Allows Pointer Lock API |
| `allow-popups` | Allows `window.open()`, `target="_blank"` |
| `allow-popups-to-escape-sandbox` | Allows popups to open without sandbox restrictions |
| `allow-presentation` | Allows Presentation API |
| `allow-same-origin` | Allows the iframe content to be treated as same-origin |
| `allow-scripts` | Allows JavaScript execution |
| `allow-top-navigation` | Allows navigation of top-level window |
| `allow-top-navigation-by-user-activation` | Allows top navigation only via user gesture |

### Common Combinations

**For embedded apps with forms and scripts:**
```
sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
```

**For untrusted content (maximum security):**
```
sandbox=""
```

**Important:** `allow-same-origin` + `allow-scripts` together can bypass sandbox via DOM manipulation. Only use this combination for trusted content.

## Allow Attribute (Permissions Policy)

The `allow` attribute grants access to browser features/permissions.

### Supported Features

| Value | Permission |
|-------|------------|
| `camera` | Camera access |
| `microphone` | Microphone access |
| `geolocation` | Geolocation API |
| `fullscreen` | Fullscreen API |
| `clipboard-read` | Read from clipboard |
| `clipboard-write` | Write to clipboard |
| `web-share` | Web Share API |
| `autoplay` | Autoplay media |
| `encrypted-media` | EME for DRM content |
| `picture-in-picture` | PiP mode |
| `screen-wake-lock` | Prevent screen sleep |

### Syntax

Semicolon-separated list:
```html
allow="camera; microphone; geolocation; fullscreen"
```

### Per-Origin Control

You can restrict features to specific origins:
```html
allow="camera https://trusted.example.com; microphone https://trusted.example.com"
```

## Security Considerations

1. **sandbox="allow-same-origin allow-scripts"** — The iframe can access parent DOM if same-origin. Use carefully.

2. **Permissions are inherited** — If parent doesn't have camera permission, iframe can't get it either.

3. **postMessage is always allowed** — Even with sandbox, `window.postMessage` works.

4. **Not all combinations make sense** — `allow-popups-to-escape-sandbox` without `allow-popups` has no effect.

5. **Default sandbox behavior** — Without `allow-scripts`, no JS runs. Without `allow-forms`, forms can't submit.

## Browser Support

All modern browsers support these attributes. For legacy IE11:
- `sandbox` supported (IE10+)
- `allow` attribute not supported (permissions handled differently)

## References

- MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox
- Permissions Policy: https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy
