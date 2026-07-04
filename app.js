// ═══════════════════════════════════════
// HAGA TRITON — SYSTÈME DE CLONAGE
// ═══════════════════════════════════════

const CLONES_INITIAUX = [
  { id: 'CLN-001', nom: 'BULBIZARRE', type: 'Plante / Poison', statut: 'STABLE', dna: 96, note: 'Clone parfait. Comportement docile observé.' },
  { id: 'CLN-002', nom: 'SALAMÈCHE', type: 'Feu', statut: 'STABLE', dna: 94, note: 'Flamme caudale légèrement plus intense que l\'original.' },
  { id: 'CLN-003', nom: 'CARAPUCE', type: 'Eau', statut: 'STABLE', dna: 95, note: 'Carapace 12% plus résistante. Anomalie positive.' },
  { id: 'CLN-004', nom: 'GOINFREX', type: 'Normal', statut: 'STABLE', dna: 91, note: 'Appétit anormalement élevé. Surveillance recommandée.' },
  { id: 'CLN-005', nom: 'DARDARGNAN', type: 'Insecte / Poison', statut: 'STABLE', dna: 88, note: 'Aiguillon légèrement modifié. Dard plus acéré.' },
  { id: 'CLN-006', nom: 'TÉNÉFIX', type: 'Ténèbres', statut: 'CRITIQUE', dna: 61, note: 'Instabilité génétique détectée. Observation renforcée.' },
  { id: 'CLN-007', nom: 'PIKACHU', type: 'Électrik', statut: 'STABLE', dna: 97, note: 'Puissance électrique x2.3 par rapport à l\'original.' },
];

const LOGS_INITIAUX = [
  { time: '00:00:01', msg: 'Initialisation système HAGA TRITON MK.III', type: 'success' },
  { time: '00:00:04', msg: 'Connexion ADN Mew confirmée — MEWTWO en cuve', type: 'success' },
  { time: '02:14:33', msg: 'ALERTE : Niveau rouge détecté dans la cuve', type: 'error' },
  { time: '02:14:41', msg: 'Stabilisation en cours — intervention Estra', type: 'warn' },
  { time: '08:22:10', msg: 'CLN-001 BULBIZARRE — séquence complète', type: 'success' },
  { time: '09:45:17', msg: 'CLN-002 SALAMÈCHE — séquence complète', type: 'success' },
  { time: '11:03:55', msg: 'CLN-003 CARAPUCE — séquence complète', type: 'success' },
  { time: '13:30:02', msg: 'CLN-004 GOINFREX — anomalie appétit notée', type: 'warn' },
  { time: '15:12:44', msg: 'CLN-005 DARDARGNAN — séquence complète', type: 'success' },
  { time: '17:44:08', msg: 'CLN-006 TÉNÉFIX — instabilité génétique !!', type: 'error' },
  { time: '19:58:31', msg: 'CLN-007 PIKACHU — puissance anormale détectée', type: 'warn' },
  { time: '21:00:00', msg: 'MEWTWO sorti de cuve — armure installée', type: 'success' },
];

let clones = [...CLONES_INITIAUX];
let cloneCounter = clones.length + 1;

// ═══ DNA ANIMATION ASCII ═══
const DNA_FRAMES = [
  `A─T  C─G
  ╲  ╱  ╲  ╱
   ╲╱    ╲╱
   ╱╲    ╱╲
  ╱  ╲  ╱  ╲
G─C  T─A`,
  ` C─G  A─T
  ╲  ╱  ╲  ╱
   ╲╱    ╲╱
   ╱╲    ╱╲
  ╱  ╲  ╱  ╲
T─A  G─C`,
  ` T─A  G─C
  ╲  ╱  ╲  ╱
   ╲╱    ╲╱
   ╱╲    ╱╲
  ╱  ╲  ╱  ╲
A─T  C─G`,
  ` G─C  T─A
  ╲  ╱  ╲  ╱
   ╲╱    ╲╱
   ╱╲    ╱╲
  ╱  ╲  ╱  ╲
C─G  A─T`,
];

let dnaFrame = 0;
function animateDNA() {
  const el = document.getElementById('dna');
  if (el) el.textContent = DNA_FRAMES[dnaFrame % DNA_FRAMES.length];
  dnaFrame++;
}
setInterval(animateDNA, 600);
animateDNA();

// ═══ RENDER CLONES ═══
function renderClones() {
  const grid = document.getElementById('clones-grid');
  if (!grid) return;
  grid.innerHTML = '';
  clones.forEach(c => {
    const statusClass = c.statut.replace(' ', '-');
    const dnaColor = c.dna >= 90 ? '#00FF41' : c.dna >= 70 ? '#FFD700' : '#CC2222';
    const card = document.createElement('div');
    card.className = `clone-card status-${c.statut}`;
    card.innerHTML = `
      <div class="clone-top">
        <div>
          <div class="clone-id">${c.id} — ${new Date().toLocaleDateString('fr-FR')}</div>
          <div class="clone-name">${c.nom}</div>
          <div class="clone-type">TYPE : ${c.type}</div>
        </div>
        <div class="clone-status ${statusClass}">${c.statut}</div>
      </div>
      <div class="clone-dna">
        <span class="clone-dna-label">ADN</span>
        <div class="clone-dna-track">
          <div class="clone-dna-fill" style="width:${c.dna}%; background:${dnaColor}; box-shadow:0 0 6px ${dnaColor}"></div>
        </div>
        <span class="clone-dna-pct">${c.dna}%</span>
      </div>
      ${c.note ? `<div class="clone-note">// ${c.note}</div>` : ''}
    `;
    grid.appendChild(card);
  });

  // update counter
  const countEl = document.querySelector('.count-num');
  if (countEl) countEl.textContent = clones.length;
}

// ═══ RENDER LOGS ═══
let logs = [...LOGS_INITIAUX];

function renderLogs() {
  const body = document.getElementById('terminal-body');
  if (!body) return;
  body.innerHTML = logs.map(l => `
    <div class="log-line">
      <span class="log-time">[${l.time}]</span>
      <span class="log-msg ${l.type || ''}">» ${l.msg}</span>
    </div>
  `).join('');
  body.scrollTop = body.scrollHeight;
}

function addLog(msg, type = '') {
  const now = new Date();
  const time = now.toTimeString().slice(0, 8);
  logs.push({ time, msg, type });
  renderLogs();
}

// ═══ MODAL ═══
function openModal() {
  document.getElementById('modal').style.display = 'flex';
}
function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('input-name').value = '';
  document.getElementById('input-type').value = '';
  document.getElementById('input-dna').value = '';
  document.getElementById('input-note').value = '';
}

function addClone() {
  const nom = document.getElementById('input-name').value.trim().toUpperCase();
  const type = document.getElementById('input-type').value.trim();
  const statut = document.getElementById('input-status').value;
  const dna = parseInt(document.getElementById('input-dna').value) || 90;
  const note = document.getElementById('input-note').value.trim();

  if (!nom) {
    alert('Nom du Pokémon requis.');
    return;
  }

  const id = `CLN-${String(cloneCounter).padStart(3, '0')}`;
  cloneCounter++;

  clones.push({ id, nom, type: type || 'INCONNU', statut, dna: Math.min(100, Math.max(0, dna)), note });
  addLog(`${id} ${nom} — séquence de clonage initiée`, statut === 'CRITIQUE' ? 'error' : statut === 'EN COURS' ? 'warn' : 'success');

  renderClones();
  closeModal();
}

// ═══ CLOSE MODAL ON OVERLAY CLICK ═══
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ═══ LIVE CLOCK IN TICKER ═══
function updateTicker() {
  // already handled by CSS animation
}

// ═══ INIT ═══
renderClones();
renderLogs();

// Random log every 30s for atmosphere
const AMBIENT_LOGS = [
  { msg: 'Synchronisation ADN en cours...', type: 'warn' },
  { msg: 'Vérification intégrité génétique — OK', type: 'success' },
  { msg: 'Température cuve : 37.2°C — normale', type: '' },
  { msg: 'Signal psychique de MEWTWO détecté', type: 'warn' },
  { msg: 'Surveillance renforcée — niveau ROUGE', type: 'error' },
  { msg: 'Calibration télékinésique en cours', type: '' },
  { msg: 'Backup séquence ADN — complété', type: 'success' },
  { msg: 'Fluctuation énergie psychique détectée', type: 'warn' },
];

setInterval(() => {
  const l = AMBIENT_LOGS[Math.floor(Math.random() * AMBIENT_LOGS.length)];
  addLog(l.msg, l.type);
}, 30000);
