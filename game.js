const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const pCanvas = document.getElementById('portrait');
const pCtx = pCanvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = false;
}
window.addEventListener('resize', resize);
resize();

const settings = { sound: true, diff: 'agent', cones: true };
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function sfx(f1, f2, type = 'square', dur = 0.09, vol = 0.09) {
  if (!settings.sound) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f1, audioCtx.currentTime);
  o.frequency.exponentialRampToValueAtTime(f2, audioCtx.currentTime + dur);
  g.gain.setValueAtTime(vol, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
  o.connect(g); g.connect(audioCtx.destination);
  o.start(); o.stop(audioCtx.currentTime + dur);
}

function drawPortrait(who) {
  pCtx.clearRect(0, 0, 16, 16);
  const bg = { ARTHUR: '#2a363b', BOSS: '#4a2c2a', HQ: '#1f3325', PILOT: '#243447', GUARD: '#1b365d', CHEF: '#4a3525', XERXES: '#4a1525', SPINNER: '#3d1e6d' };
  pCtx.fillStyle = bg[who] || '#222';
  pCtx.fillRect(0, 0, 16, 16);

  pCtx.fillStyle = '#0d0a0e'; pCtx.fillRect(3, 2, 10, 12);
  pCtx.fillStyle = (who === 'GUARD' || who === 'XERXES') ? '#c68642' : '#e0ac69';
  pCtx.fillRect(4, 3, 8, 10);

  if (who === 'ARTHUR') {
    pCtx.fillStyle = '#5c3a21'; pCtx.fillRect(3, 1, 10, 3);
    pCtx.fillStyle = '#0d0a0e'; pCtx.fillRect(5, 6, 2, 2); pCtx.fillRect(9, 6, 2, 2);
    pCtx.fillStyle = '#8b1e24'; pCtx.fillRect(7, 13, 2, 3);
  } else if (who === 'BOSS') {
    pCtx.fillStyle = '#777'; pCtx.fillRect(3, 2, 10, 2);
    pCtx.fillStyle = '#ff4d4d'; pCtx.fillRect(5, 6, 2, 2); pCtx.fillRect(9, 6, 2, 2);
    pCtx.fillStyle = '#0d0a0e'; pCtx.fillRect(5, 10, 6, 2);
  } else if (who === 'HQ') {
    pCtx.fillStyle = '#2d3a27'; pCtx.fillRect(3, 2, 10, 3);
    pCtx.fillStyle = '#0d0a0e'; pCtx.fillRect(5, 6, 2, 2); pCtx.fillRect(9, 6, 2, 2);
    pCtx.fillStyle = '#5c3a21'; pCtx.fillRect(5, 10, 6, 2);
  } else if (who === 'PILOT') {
    pCtx.fillStyle = '#111'; pCtx.fillRect(3, 2, 10, 4);
    pCtx.fillStyle = '#5efc82'; pCtx.fillRect(4, 5, 8, 2);
    pCtx.fillStyle = '#0d0a0e'; pCtx.fillRect(6, 10, 4, 1);
  } else if (who === 'SPINNER') {
    pCtx.fillStyle = '#ff6b6b'; pCtx.fillRect(4, 1, 8, 2);
    pCtx.fillStyle = '#fff'; pCtx.fillRect(4, 5, 3, 3); pCtx.fillRect(9, 5, 3, 3);
    pCtx.fillStyle = '#0d0a0e'; pCtx.fillRect(5, 6, 1, 1); pCtx.fillRect(10, 6, 1, 1);
    pCtx.fillStyle = '#0d0a0e'; pCtx.fillRect(6, 10, 4, 3);
  } else if (who === 'CHEF') {
    pCtx.fillStyle = '#ffffff'; pCtx.fillRect(3, 0, 10, 4);
    pCtx.fillStyle = '#0d0a0e'; pCtx.fillRect(5, 6, 2, 2); pCtx.fillRect(9, 6, 2, 2);
  } else if (who === 'GUARD') {
    pCtx.fillStyle = '#f4e8c1'; pCtx.fillRect(3, 1, 10, 4);
    pCtx.fillStyle = '#fff'; pCtx.fillRect(5, 6, 2, 2); pCtx.fillRect(9, 6, 2, 2);
  } else if (who === 'XERXES') {
    pCtx.fillStyle = '#f4d35e'; pCtx.fillRect(3, 0, 10, 4);
    pCtx.fillStyle = '#ff4d4d'; pCtx.fillRect(5, 6, 2, 2); pCtx.fillRect(9, 6, 2, 2);
    pCtx.fillStyle = '#111'; pCtx.fillRect(4, 10, 8, 4);
  }
}

const dialogueQueue = [];
let activeDialogue = null;
const dWrap = document.getElementById('dialogueWrap');
const choicesEl = document.getElementById('dialogueChoices');
const hintEl = document.getElementById('dialogueHint');

function queueDialogue(lines) {
  for (const l of lines) dialogueQueue.push(l);
  if (!activeDialogue) nextDialogue();
}

function nextDialogue() {
  if (activeDialogue && activeDialogue.choices && activeDialogue.choices.length > 0) return;
  if (dialogueQueue.length === 0) {
    activeDialogue = null;
    dWrap.style.display = 'none';
    return;
  }
  activeDialogue = dialogueQueue.shift();
  document.getElementById('speakerName').textContent = activeDialogue.name;
  document.getElementById('speakerLine').textContent = activeDialogue.text;
  drawPortrait(activeDialogue.portrait || 'HQ');
  choicesEl.innerHTML = '';

  if (activeDialogue.choices && activeDialogue.choices.length > 0) {
    hintEl.style.display = 'none';
    for (const c of activeDialogue.choices) {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = c.label;
      btn.onclick = (ev) => {
        ev.stopPropagation();
        activeDialogue.choices = null;
        if (c.reply) dialogueQueue.unshift(...c.reply);
        nextDialogue();
      };
      choicesEl.appendChild(btn);
    }
  } else {
    hintEl.style.display = 'block';
  }
  dWrap.style.display = 'flex';
  sfx(340, 500, 'triangle', 0.06, 0.07);
}
dWrap.addEventListener('click', nextDialogue);

const loadout = {
  slot: 1, primary: 'pistol', gadget: 'rug', gadgetCount: 2, baklavaCount: 1,
  weapons: {
    pistol: { name: 'SILENCED PPK', maxAmmo: 8, cd: 0.34, spread: 0.03, pellets: 1, quiet: true },
    smg: { name: 'TACTICAL MP5', maxAmmo: 18, cd: 0.14, spread: 0.11, pellets: 1, quiet: false },
    shotgun: { name: 'BREACHER 12G', maxAmmo: 4, cd: 0.75, spread: 0.28, pellets: 5, quiet: false }
  }
};

function selectSlot(n) {
  loadout.slot = n;
  for (let i = 1; i <= 4; i++) document.getElementById('slot' + i).classList.toggle('active', i === n);
  sfx(460, 560, 'sine', 0.04, 0.05);
}

function refreshHotbarLabels() {
  if (currentMission === 0) {
    document.getElementById('slot1').textContent = ' CLIPBOARD';
    document.getElementById('slot2').textContent = ' RED STAPLER';
    document.getElementById('slot3').textContent = ' COFFEE MUG';
    document.getElementById('slot4').textContent = ' DONUT (x1)';
    return;
  }
  document.getElementById('slot1').textContent = ` ${loadout.weapons[loadout.primary].name}`;
  document.getElementById('slot2').textContent = ' TAC-SPATULA';
  document.getElementById('slot3').textContent = ` ${loadout.gadget === 'rug' ? 'PERSIAN RUG' : 'PISTACHIO COIN'} (x${loadout.gadgetCount})`;
  document.getElementById('slot4').textContent = ` BAKLAVA (x${loadout.baklavaCount})`;
}

let paused = true, gameStarted = false, currentMission = 0, onChopperRoof = false, rotorAngle = 0, secretsFound = 0;
const foundSecretIds = new Set();

const player = {
  x: 240, y: 240, r: 16, angle: 0, hp: 100, ammo: 8, fireCd: 0, reloading: 0,
  hasKeycard: false, alerted: false, alarmTimer: 0, meleeSwing: 0, muzzleFlash: 0,
  walkCycle: 0, hiddenInBasket: false, disguised: false, civilian: false, printerFixed: false, reportsDone: false
};

let mapData = null, walls = [], props = [], guards = [], npcs = [], interactables = [], bullets = [], thrownGadgets = [];

window.startAtMission = function(num) {
  document.getElementById('titleScreen').style.display = 'none';
  document.getElementById('missionScreen').style.display = 'none';
  gameStarted = true; paused = false; player.hp = 100;
  loadMission(num);
};

function loadMission(num) {
  currentMission = num; onChopperRoof = false;
  walls = []; props = []; guards = []; npcs = []; interactables = []; bullets = []; thrownGadgets = [];
  player.alerted = false; player.alarmTimer = 0; player.hasKeycard = false;
  player.hiddenInBasket = false; player.disguised = false; player.civilian = false;
  player.printerFixed = false; player.reportsDone = false;
  player.ammo = loadout.weapons[loadout.primary].maxAmmo;
  loadout.gadgetCount = 2;

  if (num === 4) {
    mapData = MISSIONS_PERSIA[4];
    document.getElementById('missionTitle').textContent = mapData.title;
    document.getElementById('objText').textContent = mapData.obj;
    player.x = 380; player.y = 310;
    walls = [
      { x: 220, y: 180, w: 360, h: 24 }, { x: 220, y: 420, w: 360, h: 24 },
      { x: 220, y: 180, w: 24, h: 264 }, { x: 556, y: 180, w: 24, h: 264 }
    ];
    props = [
      { type: 'heli_floor', x: 244, y: 204, w: 312, h: 216 },
      { type: 'crate', x: 270, y: 220, w: 64, h: 44 },
      { type: 'table', x: 400, y: 220, w: 80, h: 42 },
      { type: 'ladder', x: 260, y: 350, w: 44, h: 44 },
      { type: 'rope_hatch', x: 470, y: 345, w: 60, h: 60 }
    ];
    interactables = [
      { type: 'armory', x: 302, y: 242, r: 55, label: 'ARMORY' },
      { type: 'roof_ladder', x: 282, y: 372, r: 55, label: 'CLIMB ROOF' },
      { type: 'pilot', x: 525, y: 295, r: 55, label: 'PILOT' },
      { type: 'drop', x: 500, y: 375, r: 55, label: 'FAST-ROPE' }
    ];
    refreshHotbarLabels();
    queueDialogue([
      { name: 'PILOT DAVE', portrait: 'PILOT', text: "Entering Persian airspace, Arthur! Check the Armory Crate [E] to pick your weapon, or climb the Roof Ladder [E] if you're brave." }
    ]);
    return;
  }

  const src = num <= 3 ? MISSIONS_USA[num] : MISSIONS_PERSIA[num];
  mapData = src;
  document.getElementById('missionTitle').textContent = src.title;
  document.getElementById('objText').textContent = src.obj;
  player.x = src.spawn.x; player.y = src.spawn.y;
  player.civilian = !!src.isCivilian;
  if (src.autoUnlockExit) player.hasKeycard = true;

  walls = src.walls.map(w => ({ ...w }));
  props = src.props.map(p => ({ ...p }));
  npcs = (src.npcs || []).map(n => ({ ...n }));
  interactables = src.interactables.map(it => ({ ...it }));
  guards = src.guards.map(g => ({
    ...g, toB: true, r: g.role === 'boss' ? 28 : 16,
    hp: g.role === 'boss' ? 22 : (g.role === 'immortal' ? 4 : 2),
    angle: Math.PI / 2, shootCd: 1.0, stunTimer: 0, flash: 0, walkCycle: 0
  }));

  refreshHotbarLabels();
  if (src.intro && STORY_DIALOGUE[src.intro]) queueDialogue(STORY_DIALOGUE[src.intro]);
  else if (src.customIntro) queueDialogue(src.customIntro);
}
const keys = {};
const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

document.addEventListener('keydown', e => {
  keys[e.code] = true;
  if (e.code === 'Digit1') selectSlot(1);
  if (e.code === 'Digit2') selectSlot(2);
  if (e.code === 'Digit3') selectSlot(3);
  if (e.code === 'Digit4') selectSlot(4);
  if (e.code === 'KeyF' && activeDialogue) nextDialogue();
  if (e.code === 'KeyR' && !paused && !activeDialogue && !player.civilian) {
    const w = loadout.weapons[loadout.primary];
    if (player.ammo < w.maxAmmo && player.reloading <= 0) { player.reloading = 1.25; sfx(240, 150, 'triangle', 0.14); }
  }
  if ((e.code === 'KeyE' || e.code === 'Space') && !paused && !activeDialogue) handleInteract();
  if (e.code === 'Escape' && gameStarted) {
    paused = !paused;
    document.getElementById('settingsScreen').style.display = paused ? 'flex' : 'none';
  }
});
document.addEventListener('keyup', e => keys[e.code] = false);
document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

document.getElementById('playBtn').onclick = () => startAtMission(0);
document.getElementById('missionSelectBtn').onclick = () => {
  document.getElementById('titleScreen').style.display = 'none';
  document.getElementById('missionScreen').style.display = 'flex';
};
document.getElementById('backFromMissionBtn').onclick = () => {
  document.getElementById('missionScreen').style.display = 'none';
  document.getElementById('titleScreen').style.display = 'flex';
};
document.getElementById('openSettingsBtn').onclick = () => {
  document.getElementById('titleScreen').style.display = 'none';
  document.getElementById('settingsScreen').style.display = 'flex';
};
document.getElementById('menuBtn').onclick = () => {
  if (!gameStarted) return;
  paused = true; document.getElementById('settingsScreen').style.display = 'flex';
};
document.getElementById('closeSettingsBtn').onclick = () => {
  settings.sound = document.getElementById('optSound').checked;
  settings.diff = document.getElementById('optDiff').value;
  settings.cones = document.getElementById('optCones').checked;
  document.getElementById('settingsScreen').style.display = 'none';
  if (!gameStarted) document.getElementById('titleScreen').style.display = 'flex';
  else paused = false;
};
document.getElementById('saveLoadoutBtn').onclick = () => {
  loadout.primary = document.getElementById('pickPrimary').value;
  loadout.gadget = document.getElementById('pickGadget').value;
  player.ammo = loadout.weapons[loadout.primary].maxAmmo;
  refreshHotbarLabels();
  document.getElementById('loadoutScreen').style.display = 'none';
  paused = false; sfx(440, 720, 'triangle', 0.15);
};

function recordSecret(id) {
  if (!foundSecretIds.has(id)) {
    foundSecretIds.add(id);
    secretsFound += 1;
    document.getElementById('secretsHud').textContent = `${secretsFound}/8`;
    sfx(580, 980, 'sine', 0.22);
  }
  queueDialogue(STORY_DIALOGUE.tpose_secret);
}

function handleInteract() {
  if (player.hiddenInBasket) { player.hiddenInBasket = false; sfx(220, 320, 'triangle', 0.1); return; }

  if (!onChopperRoof && !player.civilian) {
    for (let i = guards.length - 1; i >= 0; i--) {
      const g = guards[i];
      if (g.role === 'boss') continue;
      if (Math.hypot(player.x - g.x, player.y - g.y) < 52 && (!player.alerted || g.stunTimer > 0)) {
        guards.splice(i, 1); player.meleeSwing = 0.28; sfx(150, 60, 'triangle', 0.15);
        const list = STORY_DIALOGUE.spatula_kills;
        queueDialogue([{ name: 'ARTHUR (Ghost-7)', portrait: 'ARTHUR', text: list[Math.floor(Math.random() * list.length)] }]);
        return;
      }
    }
  }

  for (const it of interactables) {
    if (Math.hypot(player.x - it.x, player.y - it.y) > it.r) continue;
    if (it.type === 'printer' && !it.done) {
      it.done = true; player.printerFixed = true; sfx(300, 500, 'square', 0.15);
      queueDialogue(STORY_DIALOGUE.m0_printer);
    } else if (it.type === 'desk_pc' && !it.done) {
      if (!player.printerFixed) {
        queueDialogue([{ name: 'DESKTOP PC', portrait: 'BOSS', text: "ERROR: Fix the jammed Office Printer across the hall [E] before submitting TPS reports!" }]);
      } else {
        it.done = true; player.hasKeycard = true; sfx(500, 800, 'sine', 0.18);
        document.getElementById('objText').textContent = "Clock out through the Back Alley Door [E]";
        queueDialogue(STORY_DIALOGUE.m0_desk);
      }
    } else if (it.type === 'coworker') {
      queueDialogue(STORY_DIALOGUE.m0_coworker);
    } else if (it.type === 'tpose_secret') {
      recordSecret(it.id);
    } else if (it.type === 'armory' && !onChopperRoof) {
      paused = true; document.getElementById('loadoutScreen').style.display = 'flex';
    } else if (it.type === 'roof_ladder') {
      onChopperRoof = !onChopperRoof; sfx(300, 520, 'triangle', 0.16);
      if (onChopperRoof) { player.x = 320; player.y = 310; recordSecret('sec_4'); }
      else { player.x = 290; player.y = 365; }
    } else if (it.type === 'pilot' && !onChopperRoof) {
      queueDialogue([{ name: 'PILOT DAVE', portrait: 'PILOT', text: "Don't climb the Roof Ladder unless you want to see Dave Jr. spinning on the rotor blades." }]);
    } else if (it.type === 'drop' && !onChopperRoof) {
      sfx(300, 120, 'sawtooth', 0.25); loadMission(5);
    } else if (it.type === 'basket_hide') {
      player.hiddenInBasket = true; player.x = it.x; player.y = it.y; sfx(180, 120, 'triangle', 0.12);
      queueDialogue([{ name: 'ARTHUR', portrait: 'ARTHUR', text: "Hidden inside! Press [E] again to hop back out." }]);
    } else if (it.type === 'disguise' && !it.taken) {
      it.taken = true; player.disguised = true; sfx(420, 680, 'sine', 0.16);
      queueDialogue([{ name: 'ARTHUR', portrait: 'GUARD', text: "Disguise equipped! Vision cones will ignore me unless I fire a loud weapon." }]);
    } else if (it.type === 'keycard' && !it.taken) {
      it.taken = true; player.hasKeycard = true; sfx(520, 880, 'sine', 0.16);
      document.getElementById('objText').textContent = "Proceed to Chapter Exit [E]";
      queueDialogue([{ name: 'COLONEL MUSTARD', portrait: 'HQ', text: `Secured ${it.label}! Head to the exit door.` }]);
    } else if (it.type === 'chef' && !it.talked) {
      it.talked = true; player.hasKeycard = true; sfx(480, 760, 'triangle', 0.16);
      document.getElementById('objText').textContent = "Take Throne Lift North [E]";
      queueDialogue([
        { name: 'HEAD CHEF', portrait: 'CHEF', text: "Emperor Xerxes hasn't tipped me in three years, so I unplugged his Golden Peacock Mech's battery charger!" },
        { name: 'HEAD CHEF', portrait: 'CHEF', text: "Take my elevator keycard and go ruin his brunch!" }
      ]);
    } else if (it.type === 'exit') {
      if (player.hasKeycard) { sfx(400, 800, 'triangle', 0.2); loadMission(currentMission + 1); }
      else queueDialogue([{ name: 'LOCKED EXIT', portrait: 'GUARD', text: "Complete your current objective first!" }]);
    }
  }
}
canvas.addEventListener('mousedown', () => {
  if (paused || activeDialogue || player.hp <= 0 || player.hiddenInBasket || player.civilian) return;
  if (loadout.slot === 1) {
    const w = loadout.weapons[loadout.primary];
    if (player.reloading > 0 || player.fireCd > 0) return;
    if (player.ammo <= 0) { player.reloading = 1.25; sfx(180, 120, 'sawtooth', 0.12); return; }
    player.ammo -= 1; player.fireCd = w.cd; player.muzzleFlash = 0.07; player.disguised = false;
    sfx(loadout.primary === 'shotgun' ? 220 : 540, 80, 'sawtooth', 0.09);
    for (let p = 0; p < w.pellets; p++) {
      const ang = player.angle + (Math.random() - 0.5) * w.spread;
      bullets.push({ x: player.x + Math.cos(player.angle) * 20, y: player.y + Math.sin(player.angle) * 20, vx: Math.cos(ang) * 700, vy: Math.sin(ang) * 700, fromPlayer: true, life: 0.9 });
    }
    if (!w.quiet) for (const g of guards) if (Math.hypot(g.x - player.x, g.y - player.y) < 420) triggerAlarm(g);
  } else if (loadout.slot === 2) {
    if (player.meleeSwing > 0) return;
    player.meleeSwing = 0.28; sfx(260, 140, 'triangle', 0.1);
    for (let i = guards.length - 1; i >= 0; i--) {
      const g = guards[i];
      if (Math.hypot(player.x - g.x, player.y - g.y) < 56) {
        if (g.role === 'boss') { g.hp -= 2; g.flash = 0.1; triggerAlarm(g); }
        else {
          guards.splice(i, 1);
          const list = STORY_DIALOGUE.spatula_kills;
          queueDialogue([{ name: 'ARTHUR (Ghost-7)', portrait: 'ARTHUR', text: list[Math.floor(Math.random() * list.length)] }]);
        }
      }
    }
  } else if (loadout.slot === 3 && loadout.gadgetCount > 0) {
    loadout.gadgetCount -= 1; refreshHotbarLabels(); sfx(380, 620, 'sine', 0.12);
    thrownGadgets.push({ type: loadout.gadget, x: player.x + Math.cos(player.angle) * 140, y: player.y + Math.sin(player.angle) * 140, timer: 4.5 });
  } else if (loadout.slot === 4 && loadout.baklavaCount > 0 && player.hp < 100) {
    loadout.baklavaCount -= 1; player.hp = Math.min(100, player.hp + 40); refreshHotbarLabels(); sfx(440, 880, 'sine', 0.16);
  }
});

function triggerAlarm(g) {
  player.disguised = false;
  if (!player.alerted) {
    player.alerted = true; sfx(680, 920, 'square', 0.22);
    if (currentMission === 1) {
      queueDialogue([{ name: 'AGENT VANCE', portrait: 'PILOT', text: "You got spotted during your kidnapping audition! Resetting alley position..." }]);
      player.x = 480; player.y = 140; player.alerted = false; return;
    }
  }
  player.alarmTimer = 8.0;
}

function drawCharacter25D(x, y, angle, style, flash, stunned, walkCycle, meleeSwing, muzzleFlash, disguised, civilian) {
  const px = Math.round(x), py = Math.round(y);
  const bob = Math.sin(walkCycle * 10) * 2;
  ctx.save(); ctx.translate(px, py);
  ctx.fillStyle = 'rgba(0,0,0,0.38)'; ctx.fillRect(-14, 11, 28, 8);
  const b = (gx, gy, gw, gh, col) => {
    ctx.fillStyle = flash > 0 ? '#ffffff' : col;
    ctx.fillRect(Math.round(gx * 3), Math.round(gy * 3), Math.round(gw * 3), Math.round(gh * 3));
  };

  if (style === 'boss') {
    b(-9, -11, 18, 17, '#0d0a0e'); b(-8, -10, 16, 15, '#f4d35e');
    b(-11, -9, 3, 12, '#1d4e89'); b(8, -9, 3, 12, '#00a896');
    b(-5, -9, 10, 6, '#c68642'); b(-5, -12, 10, 3, '#f4d35e'); b(-4, -5, 8, 4, '#111');
    return ctx.restore();
  }

  b(-4, 2 + Math.sin(walkCycle * 10) * 2, 3, 3, '#0d0a0e');
  b(1, 2 - Math.sin(walkCycle * 10) * 2, 3, 3, '#0d0a0e');
  b(-5, -10 + bob * 0.3, 10, 13, '#0d0a0e');

  if (style === 'player' && civilian) {
    b(-4, -3 + bob * 0.3, 8, 5, '#e8e8e8'); b(-1, -3 + bob * 0.3, 2, 4, '#8b1e24');
    b(-4, -9 + bob * 0.3, 8, 6, '#e0ac69'); b(-4, -10 + bob * 0.3, 8, 2, '#5c3a21');
    return ctx.restore();
  } else if (style === 'player' && !disguised) {
    b(-4, -3 + bob * 0.3, 8, 5, '#4a5d3f'); b(-4, -9 + bob * 0.3, 8, 6, '#e0ac69');
    b(-4, -10 + bob * 0.3, 8, 3, '#263020'); b(-3, -7 + bob * 0.3, 6, 2, '#5efc82');
  } else {
    const tunic = style === 'boss_npc' ? '#4a2c2a' : (style === 'immortal' ? '#6a1b9a' : '#1d4e89');
    b(-4, -3 + bob * 0.3, 8, 5, tunic); b(-4, -9 + bob * 0.3, 8, 6, '#c68642');
    b(-4, -10 + bob * 0.3, 8, 3, style === 'immortal' ? '#f4d35e' : '#f4e8c1');
  }

  ctx.rotate(angle);
  if (meleeSwing > 0) {
    ctx.rotate((0.28 - meleeSwing) * 8 - 1.1);
    ctx.fillStyle = '#ddd'; ctx.fillRect(6, -3, 22, 6);
  } else if (!civilian) {
    ctx.fillStyle = '#1f2421'; ctx.fillRect(6, -2, 16, 4);
    if (muzzleFlash > 0) { ctx.fillStyle = '#f4d35e'; ctx.fillRect(22, -5, 10, 10); }
  }
  ctx.restore();
}

function drawTPoseSpinner(x, y, spinAngle) {
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(spinAngle);
  ctx.fillStyle = '#0d0a0e'; ctx.fillRect(-24, -6, 48, 12); ctx.fillRect(-8, -14, 16, 28);
  ctx.fillStyle = '#ff6b6b'; ctx.fillRect(-21, -4, 42, 8);
  ctx.fillStyle = '#e0ac69'; ctx.fillRect(-24, -4, 4, 8); ctx.fillRect(20, -4, 4, 8); ctx.fillRect(-6, -12, 12, 10);
  ctx.fillStyle = '#f4d35e'; ctx.fillRect(-6, -14, 12, 3);
  ctx.restore();
}

function draw25DProp(p) {
  ctx.fillStyle = '#0d0a0e';
  if (p.type === 'heli_floor') { ctx.fillStyle = '#2b303a'; ctx.fillRect(p.x, p.y, p.w, p.h); }
  else if (p.type === 'carpet') { ctx.fillStyle = '#8b1e24'; ctx.fillRect(p.x, p.y, p.w, p.h); ctx.strokeStyle = '#f4d35e'; ctx.lineWidth = 4; ctx.strokeRect(p.x + 6, p.y + 6, p.w - 12, p.h - 12); }
  else if (p.type === 'table') { ctx.fillRect(p.x - 3, p.y - 3, p.w + 6, p.h + 14); ctx.fillStyle = '#8d5524'; ctx.fillRect(p.x, p.y, p.w, p.h); ctx.fillStyle = '#5c3310'; ctx.fillRect(p.x, p.y + p.h, p.w, 10); }
  else if (p.type === 'crate') { ctx.fillRect(p.x - 3, p.y - 3, p.w + 6, p.h + 12); ctx.fillStyle = '#4a5d3f'; ctx.fillRect(p.x, p.y, p.w, p.h); }
  else if (p.type === 'basket') { ctx.fillRect(p.x - 3, p.y - 3, p.w + 6, p.h + 10); ctx.fillStyle = '#c68642'; ctx.fillRect(p.x, p.y, p.w, p.h); }
  else if (p.type === 'palm') { ctx.fillStyle = '#8b1e24'; ctx.fillRect(p.x + 8, p.y + 18, 24, 20); ctx.fillStyle = '#2e7d32'; ctx.fillRect(p.x, p.y, 40, 18); }
  else if (p.type === 'van') { ctx.fillStyle = '#111'; ctx.fillRect(p.x, p.y, p.w, p.h); ctx.strokeStyle = '#5efc82'; ctx.lineWidth = 3; ctx.strokeRect(p.x, p.y, p.w, p.h); }
  else if (p.type === 'rope_hatch') { ctx.fillStyle = '#111'; ctx.fillRect(p.x, p.y, p.w, p.h); ctx.strokeStyle = '#ff6b6b'; ctx.lineWidth = 3; ctx.strokeRect(p.x, p.y, p.w, p.h); }
  else if (p.type === 'ladder') { ctx.fillStyle = '#3b303f'; ctx.fillRect(p.x, p.y, p.w, p.h); ctx.fillStyle = '#f4d35e'; ctx.fillRect(p.x + 6, p.y + 10, p.w - 12, 4); ctx.fillRect(p.x + 6, p.y + 26, p.w - 12, 4); }
}
function collideWall(cx, cy, r) {
  if (onChopperRoof) return cx < 235 || cx > 565 || cy < 195 || cy > 425;
  for (const w of walls) {
    const kx = Math.max(w.x, Math.min(cx, w.x + w.w)), ky = Math.max(w.y, Math.min(cy, w.y + w.h));
    if ((cx - kx) ** 2 + (cy - ky) ** 2 < r * r) return true;
  }
  for (const p of props) {
    if (p.type === 'table' || p.type === 'crate') {
      const kx = Math.max(p.x, Math.min(cx, p.x + p.w)), ky = Math.max(p.y, Math.min(cy, p.y + p.h));
      if ((cx - kx) ** 2 + (cy - ky) ** 2 < r * r) return true;
    }
  }
  return false;
}

let last = performance.now();
function loop(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now; rotorAngle += dt * 16;

  if (!paused && !activeDialogue && player.hp > 0) {
    if (player.fireCd > 0) player.fireCd -= dt;
    if (player.meleeSwing > 0) player.meleeSwing -= dt;
    if (player.muzzleFlash > 0) player.muzzleFlash -= dt;
    if (player.reloading > 0) {
      player.reloading -= dt;
      if (player.reloading <= 0) { player.ammo = loadout.weapons[loadout.primary].maxAmmo; sfx(420, 620, 'sine', 0.08); }
    }
    if (player.alerted) { player.alarmTimer -= dt; if (player.alarmTimer <= 0) player.alerted = false; }

    if (!player.hiddenInBasket) {
      const spd = (keys['ShiftLeft'] || keys['ShiftRight']) ? 135 : 235;
      let dx = 0, dy = 0;
      if (keys['KeyW'] || keys['ArrowUp']) dy -= 1;
      if (keys['KeyS'] || keys['ArrowDown']) dy += 1;
      if (keys['KeyA'] || keys['ArrowLeft']) dx -= 1;
      if (keys['KeyD'] || keys['ArrowRight']) dx += 1;
      if (dx && dy) { dx *= 0.7071; dy *= 0.7071; }
      if (dx !== 0 || dy !== 0) {
        player.walkCycle += dt;
        if (!collideWall(player.x + dx * spd * dt, player.y, player.r)) player.x += dx * spd * dt;
        if (!collideWall(player.x, player.y + dy * spd * dt, player.r)) player.y += dy * spd * dt;
      }
    }

    const camX = player.x - canvas.width / 2, camY = player.y - canvas.height / 2;
    player.angle = Math.atan2((mouse.y + camY) - player.y, (mouse.x + camX) - player.x);

    for (let i = thrownGadgets.length - 1; i >= 0; i--) {
      const tg = thrownGadgets[i]; tg.timer -= dt;
      for (const g of guards) {
        if (Math.hypot(g.x - tg.x, g.y - tg.y) < 120) {
          if (tg.type === 'rug') g.stunTimer = 2.0;
          else if (tg.type === 'coin' && !player.alerted) g.angle = Math.atan2(tg.y - g.y, tg.x - g.x);
        }
      }
      if (tg.timer <= 0) thrownGadgets.splice(i, 1);
    }

    const sightRange = settings.diff === 'ghost' ? 340 : (settings.diff === 'casual' ? 220 : 280);
    for (const g of guards) {
      if (g.flash > 0) g.flash -= dt;
      if (g.stunTimer > 0) { g.stunTimer -= dt; continue; }
      const dist = Math.hypot(player.x - g.x, player.y - g.y);
      const angleToP = Math.atan2(player.y - g.y, player.x - g.x);
      let diff = Math.abs(angleToP - g.angle);
      if (diff > Math.PI) diff = 2 * Math.PI - diff;

      if (!player.hiddenInBasket && !player.disguised && dist < sightRange && diff < 0.52) triggerAlarm(g);

      if (player.alerted && !player.hiddenInBasket && dist < 480) {
        g.angle = angleToP; g.shootCd -= dt;
        if (g.shootCd <= 0) {
          g.shootCd = g.role === 'boss' ? 0.85 : 1.75; sfx(210, 90, 'square', 0.08);
          bullets.push({ x: g.x + Math.cos(g.angle) * (g.r + 6), y: g.y + Math.sin(g.angle) * (g.r + 6), vx: Math.cos(g.angle) * 340, vy: Math.sin(g.angle) * 340, fromPlayer: false, life: 1.8 });
        }
      } else {
        const tx = g.toB ? g.bx : g.ax, ty = g.toB ? g.by : g.ay;
        if (Math.hypot(tx - g.x, ty - g.y) < 10) g.toB = !g.toB;
        else { g.walkCycle += dt; g.angle = Math.atan2(ty - g.y, tx - g.x); g.x += Math.cos(g.angle) * 75 * dt; g.y += Math.sin(g.angle) * 75 * dt; }
      }
    }

    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i]; b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
      let hit = b.life <= 0 || collideWall(b.x, b.y, 3);
      if (!hit && b.fromPlayer) {
        for (let j = guards.length - 1; j >= 0; j--) {
          const g = guards[j];
          if (Math.hypot(b.x - g.x, b.y - g.y) < g.r) {
            g.hp -= 1; g.flash = 0.08; hit = true; triggerAlarm(g);
            if (g.hp <= 0) {
              guards.splice(j, 1);
              if (g.role === 'boss') {
                queueDialogue([
                  { name: 'EMPEROR XERXES IV', portrait: 'XERXES', text: "NOOO! Defeated by an accountant from Ohio! Tell the Chef... I'm sorry about the tip..." },
                  { name: 'COLONEL MUSTARD (HQ)', portrait: 'HQ', text: `CAMPAIGN COMPLETE! You found ${secretsFound}/8 T-Pose Secrets! Use Chapter Select to replay any mission.` }
                ]);
              }
            }
            break;
          }
        }
      } else if (!hit && !b.fromPlayer && !player.hiddenInBasket && Math.hypot(b.x - player.x, b.y - player.y) < player.r) {
        player.hp = Math.max(0, player.hp - 15); hit = true;
        if (player.hp <= 0) queueDialogue([{ name: 'COLONEL MUSTARD', portrait: 'HQ', text: "Arthur is down! Open Chapter Select or refresh to retry." }]);
      }
      if (hit) bullets.splice(i, 1);
    }
  }

  const wMax = loadout.weapons[loadout.primary].maxAmmo;
  document.getElementById('hp').textContent = player.hp;
  document.getElementById('ammo').textContent = player.civilian ? 'N/A' : (player.reloading > 0 ? 'RELOAD' : `${player.ammo}/${wMax}`);
  const stEl = document.getElementById('stealthState');
  if (player.civilian) { stEl.textContent = 'CLERK'; stEl.style.color = '#f4d35e'; }
  else if (player.hiddenInBasket) { stEl.textContent = 'HIDDEN'; stEl.style.color = '#5efc82'; }
  else if (player.disguised) { stEl.textContent = 'DISGUISED'; stEl.style.color = '#4ea8de'; }
  else if (player.alerted) { stEl.textContent = `ALERT (${Math.ceil(player.alarmTimer)}s)`; stEl.style.color = '#ff6b6b'; }
  else { stEl.textContent = 'STEALTH'; stEl.style.color = '#5efc82'; }

  ctx.fillStyle = (mapData && mapData.bg) ? mapData.bg : '#1b263b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(Math.round(canvas.width / 2 - player.x), Math.round(canvas.height / 2 - player.y));

  if (currentMission === 4 && onChopperRoof) {
    ctx.fillStyle = '#2d3a27'; ctx.fillRect(220, 180, 360, 264);
    ctx.strokeStyle = '#f4d35e'; ctx.lineWidth = 4; ctx.strokeRect(220, 180, 360, 264);
    draw25DProp({ type: 'ladder', x: 260, y: 350, w: 44, h: 44 });
    ctx.save(); ctx.translate(400, 310); ctx.rotate(rotorAngle);
    ctx.fillStyle = '#111'; ctx.fillRect(-230, -10, 460, 20); ctx.fillRect(-10, -230, 20, 460);
    ctx.restore();
    drawTPoseSpinner(400, 310, rotorAngle);
    ctx.fillStyle = '#f4d35e'; ctx.font = 'bold 14px Courier New'; ctx.fillText('"I is spinning!!!"', 330, 255);
    drawCharacter25D(player.x, player.y, player.angle, 'player', 0, 0, player.walkCycle, 0, 0, false, false);
  } else {
    if (mapData && mapData.w) { ctx.fillStyle = mapData.floor; ctx.fillRect(0, 0, mapData.w, mapData.h); }
    for (const p of props) draw25DProp(p);
    for (const tg of thrownGadgets) { ctx.fillStyle = tg.type === 'rug' ? '#8b1e24' : '#f4d35e'; ctx.fillRect(tg.x - 16, tg.y - 10, 32, 20); }

    for (const it of interactables) {
      if (it.taken) continue;
      if (it.type === 'tpose_secret') {
        drawTPoseSpinner(it.x, it.y, rotorAngle * 0.7);
      } else {
        ctx.fillStyle = '#f4d35e'; ctx.fillRect(it.x - 7, it.y - 7, 14, 14);
      }
      if (Math.hypot(player.x - it.x, player.y - it.y) < it.r + 14) {
        ctx.fillStyle = '#fff'; ctx.font = 'bold 12px Courier New';
        ctx.fillText(`[E] ${it.label}`, it.x - 46, it.y - 22);
      }
    }

    if (settings.cones && guards.length > 0) {
      const range = settings.diff === 'ghost' ? 340 : (settings.diff === 'casual' ? 220 : 280);
      for (const g of guards) {
        if (g.stunTimer > 0) continue;
        ctx.fillStyle = player.alerted ? 'rgba(255, 70, 70, 0.22)' : 'rgba(244, 211, 94, 0.20)';
        ctx.beginPath(); ctx.moveTo(g.x, g.y); ctx.arc(g.x, g.y, range, g.angle - 0.52, g.angle + 0.52); ctx.closePath(); ctx.fill();
      }
    }

    for (const w of walls) {
      ctx.fillStyle = '#1d4e89'; ctx.fillRect(w.x, w.y, w.w, w.h);
      ctx.fillStyle = '#102c4e'; ctx.fillRect(w.x, w.y + w.h, w.w, 12);
      ctx.strokeStyle = '#0d0a0e'; ctx.lineWidth = 3; ctx.strokeRect(w.x, w.y, w.w, w.h);
    }

    if (currentMission === 4) drawCharacter25D(525, 295, Math.PI, 'guard', 0, 0, 0, 0, 0, false, false);
    for (const n of npcs) drawCharacter25D(n.x, n.y, n.angle, n.role === 'boss' ? 'boss_npc' : 'guard', 0, 0, 0, 0, 0, false, true);
    for (const g of guards) drawCharacter25D(g.x, g.y, g.angle, g.role, g.flash, g.stunTimer, g.walkCycle, 0, 0, false, false);
    if (!player.hiddenInBasket) drawCharacter25D(player.x, player.y, player.angle, 'player', 0, 0, player.walkCycle, player.meleeSwing, player.muzzleFlash, player.disguised, player.civilian);

    for (const b of bullets) { ctx.fillStyle = b.fromPlayer ? '#5efc82' : '#ff4d4d'; ctx.fillRect(Math.round(b.x - 4), Math.round(b.y - 4), 8, 8); }
    if (currentMission === 4) {
      ctx.save(); ctx.translate(400, 310); ctx.rotate(rotorAngle);
      ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.fillRect(-230, -8, 460, 16); ctx.fillRect(-8, -230, 16, 460);
      ctx.restore();
    }
  }

  ctx.restore();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
