const iframe = document.getElementById('testFrame');
const loading = document.getElementById('loading');
const iframeInner = document.getElementById('iframeInner');

// ── Panel toggles ──────────────────────────────────────────
const sidebar = document.getElementById('sidebar');
const postmessagePanel = document.getElementById('postmessagePanel');
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
const togglePostMessageBtn = document.getElementById('togglePostMessageBtn');

// Set initial active state
toggleSidebarBtn.classList.add('active');
togglePostMessageBtn.classList.add('active');

toggleSidebarBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  toggleSidebarBtn.classList.toggle('active');
});

togglePostMessageBtn.addEventListener('click', () => {
  postmessagePanel.classList.toggle('collapsed');
  togglePostMessageBtn.classList.toggle('active');
});

// ── Collapsible sections ────────────────────────────────────
document.querySelectorAll('.section-header').forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    header.classList.toggle('collapsed');
    body.classList.toggle('hidden');
  });
});

// ── Loading state ───────────────────────────────────────────
function showLoading() {
  loading.classList.remove('hidden');
  loading.innerHTML = '<div class="spinner"></div><p>Loading…</p>';
}

function showPlaceholder() {
  loading.classList.remove('hidden');
  loading.innerHTML = '<p>Enter the URL of the app/site you want to embed into the iframe in the source text area.</p>';
}

iframe.addEventListener('load', () => {
  if (iframe.src && iframe.src !== 'about:blank' && iframe.src !== globalThis.location.href) {
    loading.classList.add('hidden');
  }
});

// Fallback: clear loading after 10 s if still visible
let loadingTimer;
function startLoadingTimer() {
  clearTimeout(loadingTimer);
  loadingTimer = setTimeout(() => {
    if (!loading.classList.contains('hidden')) {
      loading.innerHTML = '<p style="color:#e67e22;">Still loading… Check if the URL is reachable.</p>';
    }
  }, 10000);
}

// ── URL Settings ────────────────────────────────────────────
const urlInput = document.getElementById('urlInput');
const applyUrlBtn = document.getElementById('applyUrlBtn');

function applyUrl() {
  const url = urlInput.value.trim();
  if (!url) return;
  showLoading();
  startLoadingTimer();
  iframe.src = url;
}

applyUrlBtn.addEventListener('click', applyUrl);
urlInput.addEventListener('keydown', e => { if (e.key === 'Enter') applyUrl(); });

// ── Dimensions ──────────────────────────────────────────────
const heightInput = document.getElementById('heightInput');
const widthInput = document.getElementById('widthInput');
const applyDimBtn = document.getElementById('applyDimBtn');

function applyDimensions() {
  const h = Number.parseInt(heightInput.value, 10);
  const w = Number.parseInt(widthInput.value, 10);
  iframeInner.style.height = h > 0 ? h + 'px' : '';
  iframeInner.style.width  = w > 0 ? w + 'px' : '';
}

applyDimBtn.addEventListener('click', applyDimensions);

// ── Sandbox controls ────────────────────────────────────────
const enableSandboxCb = document.getElementById('enableSandbox');
const sandboxAttrList = document.getElementById('sandboxAttrList');
const applySandboxBtn = document.getElementById('applySandboxBtn');

function buildSandboxValue() {
  return [...sandboxAttrList.querySelectorAll('input[type="checkbox"]:checked')]
    .map(cb => cb.value)
    .join(' ');
}

function applyCurrentSandbox() {
  if (!enableSandboxCb.checked) {
    iframe.removeAttribute('sandbox');
    return;
  }
  const val = buildSandboxValue();
  if (val) {
    iframe.setAttribute('sandbox', val);
  } else {
    iframe.setAttribute('sandbox', '');
  }
}

enableSandboxCb.addEventListener('change', () => {
  sandboxAttrList.classList.toggle('disabled', !enableSandboxCb.checked);
  applyCurrentSandbox();
});

applySandboxBtn.addEventListener('click', applyCurrentSandbox);

// ── Allow attributes ────────────────────────────────────────
const applyAllowBtn = document.getElementById('applyAllowBtn');

function applyAllowAttr() {
  const val = [...document.querySelectorAll('.allow-cb:checked')]
    .map(cb => cb.value)
    .join('; ');
  if (val) {
    iframe.setAttribute('allow', val);
  } else {
    iframe.removeAttribute('allow');
  }
}

applyAllowBtn.addEventListener('click', applyAllowAttr);

// ── Init ────────────────────────────────────────────────────
applyDimensions();

// If the iframe already has a src, show loading; otherwise placeholder
if (iframe.getAttribute('src')) {
  showLoading();
  startLoadingTimer();
} else {
  showPlaceholder();
}

// ── PostMessage listener ────────────────────────────────────
const messageList = document.getElementById('messageList');
const messageCount = document.getElementById('messageCount');
const clearMessagesBtn = document.getElementById('clearMessagesBtn');
let messages = [];
let expandedIndex = null;

function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3
  });
}

function truncate(str, maxLen = 80) {
  if (typeof str !== 'string') str = JSON.stringify(str);
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
}

function getMessagePreview(data) {
  if (typeof data === 'string') return truncate(data);
  if (typeof data === 'object' && data !== null) {
    const str = JSON.stringify(data);
    return truncate(str);
  }
  return String(data);
}

function renderMessages() {
  messageCount.textContent = messages.length;

  if (messages.length === 0) {
    messageList.innerHTML = `
      <div class="empty-state">
        <p>Listening for postMessage events from the iframe…</p>
      </div>
    `;
    return;
  }

  messageList.innerHTML = messages.map((msg, idx) => {
    const isExpanded = expandedIndex === idx;
    if (isExpanded) {
      return `
        <div class="message-expanded" data-index="${idx}">
          <div class="message-meta">
            <span class="message-time">${msg.time}</span>
            <span class="message-origin" title="${msg.origin}">${msg.origin}</span>
          </div>
          <pre>${JSON.stringify(msg.data, null, 2)}</pre>
        </div>
      `;
    }
    return `
      <div class="message-item" data-index="${idx}">
        <div class="message-meta">
          <span class="message-time">${msg.time}</span>
          <span class="message-origin" title="${msg.origin}">${msg.origin}</span>
        </div>
        <div class="message-preview">${getMessagePreview(msg.data)}</div>
      </div>
    `;
  }).join('');
}

function addMessage(event) {
  const iframeSrc = new URL(iframe.src);
  const eventOrigin = event.origin || '';

  // Only capture messages from the iframe's origin
  if (iframeSrc.origin !== eventOrigin) return;

  messages.unshift({
    time: formatTime(new Date()),
    origin: eventOrigin,
    data: event.data
  });

  // Keep max 100 messages
  if (messages.length > 100) {
    messages = messages.slice(0, 100);
  }

  renderMessages();
}

window.addEventListener('message', addMessage);

messageList.addEventListener('click', (e) => {
  const item = e.target.closest('[data-index]');
  if (!item) return;

  const idx = parseInt(item.dataset.index, 10);
  if (expandedIndex === idx) {
    expandedIndex = null;
  } else {
    expandedIndex = idx;
  }
  renderMessages();
});

clearMessagesBtn.addEventListener('click', () => {
  messages = [];
  expandedIndex = null;
  renderMessages();
});
