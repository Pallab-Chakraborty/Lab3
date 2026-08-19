/* ══════════════════════════
   IMAGE SIZER
══════════════════════════ */
const imgInput = document.getElementById('imgInput');
const uploadZone = document.getElementById('uploadZone');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const lockBtn = document.getElementById('lockBtn');
const lockLabel = document.getElementById('lockLabel');
const formatSelect = document.getElementById('formatSelect');
const qualityRange = document.getElementById('qualityRange');
const qualityVal = document.getElementById('qualityVal');
const resizeBtn = document.getElementById('resizeBtn');
const downloadBtn = document.getElementById('downloadBtn');
const previewCanvas = document.getElementById('previewCanvas');
const previewPlaceholder = document.getElementById('previewPlaceholder');
const sizerInfo = document.getElementById('sizerInfo');

let origImg = null, aspectRatio = 1, locked = true, origFileSize = 0;

qualityRange.addEventListener('input', () => qualityVal.textContent = qualityRange.value + '%');

// drag & drop
uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag'); });
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag'));
uploadZone.addEventListener('drop', e => {
  e.preventDefault(); uploadZone.classList.remove('drag');
  if(e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0]);
});
imgInput.addEventListener('change', e => { if(e.target.files[0]) loadImage(e.target.files[0]); });

function loadImage(file) {
  origFileSize = file.size;
  const reader = new FileReader();
  reader.onload = ev => {
    const img = new Image();
    img.onload = () => {
      origImg = img;
      aspectRatio = img.width / img.height;
      widthInput.value = img.width;
      heightInput.value = img.height;
      resizeBtn.disabled = false;
      resizeBtn.click();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

lockBtn.addEventListener('click', () => {
  locked = !locked;
  lockBtn.textContent = locked ? '🔒' : '🔓';
  lockBtn.classList.toggle('locked', locked);
  lockLabel.textContent = locked ? 'Aspect ratio locked' : 'Aspect ratio free';
});

widthInput.addEventListener('input', () => {
  if(locked && origImg) heightInput.value = Math.round(widthInput.value / aspectRatio);
});
heightInput.addEventListener('input', () => {
  if(locked && origImg) widthInput.value = Math.round(heightInput.value * aspectRatio);
});

resizeBtn.addEventListener('click', () => {
  if(!origImg) return;
  const w = parseInt(widthInput.value) || origImg.width;
  const h = parseInt(heightInput.value) || origImg.height;
  previewCanvas.width = w; previewCanvas.height = h;
  const ctx = previewCanvas.getContext('2d');
  ctx.drawImage(origImg, 0, 0, w, h);
  previewCanvas.style.display = 'block';
  previewPlaceholder.style.display = 'none';
  downloadBtn.disabled = false;

  // estimate output size
  const dataURL = previewCanvas.toDataURL(formatSelect.value, qualityRange.value/100);
  const outBytes = Math.round((dataURL.length * 3/4));
  const saved = Math.round((1 - outBytes/origFileSize)*100);
  document.getElementById('origSize').textContent = fmtBytes(origFileSize);
  document.getElementById('outSize').textContent = fmtBytes(outBytes);
  document.getElementById('outDims').textContent = `${w}×${h}`;
  document.getElementById('savedPct').textContent = saved > 0 ? `${saved}% smaller` : `${-saved}% larger`;
  sizerInfo.style.display = 'flex';
});

downloadBtn.addEventListener('click', () => {
  const fmt = formatSelect.value;
  const ext = fmt.split('/')[1];
  const dataURL = previewCanvas.toDataURL(fmt, qualityRange.value/100);
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = `resized-image.${ext}`;
  a.click();
});

function fmtBytes(b) {
  if(b < 1024) return b + ' B';
  if(b < 1024*1024) return (b/1024).toFixed(1) + ' KB';
  return (b/1024/1024).toFixed(2) + ' MB';
}

