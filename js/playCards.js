/* ══════════════════════════
   PLAY CARDS — WAR
══════════════════════════ */
const SUITS = ['♠','♥','♦','♣'];
const RANKS = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const RANK_VAL = {2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,J:11,Q:12,K:13,A:14};

let playerDeck=[], cpuDeck=[], round=0, pWins=0, cWins=0, gameOver=false;

function buildDeck() {
  const d = [];
  for(let s of SUITS) for(let r of RANKS) d.push({suit:s,rank:r,val:RANK_VAL[r],red:s==='♥'||s==='♦'});
  return d;
}
function shuffle(a) {
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function initWarGame() {
  const deck = shuffle(buildDeck());
  playerDeck = deck.slice(0,26);
  cpuDeck = deck.slice(26);
  round=0; pWins=0; cWins=0; gameOver=false;
  updateWarUI();
  document.getElementById('battleLog').innerHTML = '';
  document.getElementById('pCardSlot').innerHTML = '<span style="font-size:.65rem;letter-spacing:1px;">DRAW</span>';
  document.getElementById('cCardSlot').innerHTML = '<span style="font-size:.65rem;letter-spacing:1px;">DRAW</span>';
  setWarResult('— DRAW A CARD —','idle');
  document.getElementById('drawBtn').disabled = false;
  document.getElementById('roundNum').textContent = `Round 1 / 26`;
}
function updateWarUI() {
  document.getElementById('pScore').textContent = pWins;
  document.getElementById('cScore').textContent = cWins;
  document.getElementById('pCardsLeft').textContent = `${playerDeck.length} cards left`;
  document.getElementById('cCardsLeft').textContent = `${cpuDeck.length} cards left`;
}
function setWarResult(txt, cls) {
  const el = document.getElementById('warResult');
  el.textContent = txt;
  el.className = `war-result ${cls}`;
}
function cardHTML(card) {
  return `<div class="playing-card ${card.red?'red':'black'} flip-anim">
    <div class="card-rank">${card.rank}${card.suit}</div>
    <div class="card-center">${card.suit}</div>
    <div class="card-rank-bot">${card.rank}${card.suit}</div>
  </div>`;
}
function addLog(txt, cls) {
  const log = document.getElementById('battleLog');
  const el = document.createElement('div');
  el.className = 'log-item';
  el.innerHTML = txt.replace(/WIN/g,'<span class="win">WIN</span>').replace(/LOSE/g,'<span class="lose">LOSE</span>').replace(/TIE/g,'<span class="tie">TIE</span>');
  log.insertBefore(el, log.firstChild);
  if(log.children.length > 12) log.removeChild(log.lastChild);
}

document.getElementById('drawBtn').addEventListener('click', () => {
  if(gameOver || playerDeck.length===0 || cpuDeck.length===0) return;
  round++;
  const pc = playerDeck.pop();
  const cc = cpuDeck.pop();
  document.getElementById('pCardSlot').innerHTML = cardHTML(pc);
  document.getElementById('cCardSlot').innerHTML = cardHTML(cc);
  document.getElementById('roundNum').textContent = `Round ${round} / 26`;

  let result;
  if(pc.val > cc.val){ pWins++; result='win'; setWarResult('🏆 YOU WIN!','win'); }
  else if(cc.val > pc.val){ cWins++; result='lose'; setWarResult('💀 CPU WINS','lose'); }
  else { result='tie'; setWarResult('🤝 TIE!','tie'); }

  addLog(`R${round}: You ${pc.rank}${pc.suit} vs CPU ${cc.rank}${cc.suit} — ${result.toUpperCase()}`);
  updateWarUI();

  if(playerDeck.length===0) endWarGame();
});

function endWarGame() {
  gameOver = true;
  document.getElementById('drawBtn').disabled = true;
  if(pWins > cWins) setWarResult(`🏆 YOU WIN! ${pWins}-${cWins}`,'win');
  else if(cWins > pWins) setWarResult(`💀 CPU WINS ${cWins}-${pWins}`,'lose');
  else setWarResult(`🤝 DRAW! ${pWins}-${cWins}`,'tie');
  addLog(`— GAME OVER — You: ${pWins} · CPU: ${cWins}`);
}

document.getElementById('newGameBtn').addEventListener('click', initWarGame);
initWarGame();

