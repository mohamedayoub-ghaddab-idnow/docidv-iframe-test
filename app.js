const iframe = document.getElementById('testFrame');
const loading = document.getElementById('loading');
const iframeInner = document.getElementById('iframeInner');

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
