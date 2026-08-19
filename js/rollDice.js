/* ══════════════════════════
   ROLL DICE
══════════════════════════ */
let diceCount = 2, rolling = false, rollHistory = [];

const FACE_DOTS = {
  1: [[1,1]],
  2: [[0,0],[2,2]],
  3: [[0,0],[1,1],[2,2]],
  4: [[0,0],[0,2],[2,0],[2,2]],
  5: [[0,0],[0,2],[1,1],[2,0],[2,2]],
  6: [[0,0],[0,2],[1,0],[1,2],[2,0],[2,2]]
};

function dotGrid(n) {
  const cls = ['','face-1','face-2','face-3','face-4','face-5','face-6'][n];
  const dots = Array(n).fill(0).map((_, i) =>
    n===5 && i===2 ? '<div class="dot center-dot"></div>' : '<div class="dot"></div>'
  ).join('');
  return `<div class="die-face ${cls}">${dots}</div>`;
}

function buildDieFaces(val) {
  // Build all 6 faces; face showing val will be front after transform
  return [1,2,3,4,5,6].map(n => dotGrid(n)).join('');
}

// Rotation maps: face n facing viewer
const FACE_ROTS = {
  1: {rx:0,  ry:0},
  2: {rx:0,  ry:180},
  3: {rx:0,  ry:-90},
  4: {rx:0,  ry:90},
  5: {rx:-90,ry:0},
  6: {rx:90, ry:0}
};

function buildTray() {
  const tray = document.getElementById('diceTray');
  tray.innerHTML = '';
  for(let i=0;i<diceCount;i++){
    const wrap = document.createElement('div');
    wrap.className = 'die-wrap';
    wrap.innerHTML = `<div class="die" id="die-${i}">${buildDieFaces(1)}</div>`;
    tray.appendChild(wrap);
  }
}

function updateCountDisplay() {
  document.getElementById('diceCountDisplay').textContent = diceCount;
  buildTray();
}

document.getElementById('diceDown').addEventListener('click', () => {
  if(diceCount>1){diceCount--;updateCountDisplay();}
});
document.getElementById('diceUp').addEventListener('click', () => {
  if(diceCount<6){diceCount++;updateCountDisplay();}
});

document.getElementById('rollBtn').addEventListener('click', () => {
  if(rolling) return;
  rolling = true;
  const results = Array.from({length:diceCount}, () => Math.floor(Math.random()*6)+1);

  // animate each die
  results.forEach((val, i) => {
    const die = document.getElementById(`die-${i}`);
    const extra = Math.floor(Math.random()*3)*360;
    const rot = FACE_ROTS[val];
    die.style.setProperty('--rx', `${rot.rx + extra}deg`);
    die.style.setProperty('--ry', `${rot.ry + extra}deg`);
    die.classList.remove('rolling');
    void die.offsetWidth; // reflow
    die.classList.add('rolling');
  });

  setTimeout(() => {
    // Show stats
    const total = results.reduce((a,b)=>a+b,0);
    const high = Math.max(...results);
    const avg = (total/results.length).toFixed(1);
    document.getElementById('diceResults').textContent = results.join(' · ');
    document.getElementById('diceTotal').textContent = total;
    document.getElementById('diceHigh').textContent = high;
    document.getElementById('diceAvg').textContent = avg;
    document.getElementById('sumPanel').style.display = 'flex';

    // History
    rollHistory.unshift(total);
    if(rollHistory.length>10) rollHistory.pop();
    const chips = document.getElementById('historyChips');
    chips.innerHTML = rollHistory.map(t => `<div class="h-chip">Total: ${t}</div>`).join('');
    document.getElementById('rollHistoryPanel').style.display = 'block';

    rolling = false;
  }, 900);
});

document.getElementById('clearHistBtn').addEventListener('click', () => {
  rollHistory = [];
  document.getElementById('historyChips').innerHTML = '';
  document.getElementById('rollHistoryPanel').style.display = 'none';
  document.getElementById('sumPanel').style.display = 'none';
});

// init tray
buildTray();
