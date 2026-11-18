const MISSIONS_USA = {
  0: {
    title: "CH 0: MEGACORP LOGISTICS (USA)",
    obj: "Fix Printer [E], Finish TPS Reports at Desk [E], Exit Alley [E]",
    bg: "#1e1b24", floor: "#7c7267", w: 960, h: 960,
    spawn: { x: 240, y: 240 },
    isCivilian: true,
    walls: [
      { x: 0, y: 0, w: 960, h: 36 }, { x: 0, y: 924, w: 960, h: 36 },
      { x: 0, y: 0, w: 36, h: 960 }, { x: 924, y: 0, w: 36, h: 960 },
      { x: 36, y: 460, w: 340, h: 28 }, { x: 584, y: 460, w: 340, h: 28 }
    ],
    props: [
      { type: 'carpet', x: 380, y: 40, w: 200, h: 880 },
      { type: 'table', x: 160, y: 180, w: 120, h: 52 },
      { type: 'table', x: 640, y: 180, w: 120, h: 52 },
      { type: 'table', x: 160, y: 660, w: 120, h: 52 },
      { type: 'crate', x: 680, y: 340, w: 64, h: 48 },
      { type: 'palm', x: 80, y: 80, w: 40, h: 40 },
      { type: 'palm', x: 840, y: 80, w: 40, h: 40 }
    ],
    npcs: [
      { x: 330, y: 200, angle: Math.PI, role: 'boss' },
      { x: 610, y: 210, angle: 0, role: 'chef' }
    ],
    interactables: [
      { type: 'printer', x: 712, y: 364, r: 55, done: false, label: 'FIX PRINTER' },
      { type: 'desk_pc', x: 220, y: 210, r: 58, done: false, label: 'DO TPS REPORTS' },
      { type: 'coworker', x: 610, y: 210, r: 58, label: 'TALK TO LINDA' },
      { type: 'tpose_secret', id: 'sec_0', x: 850, y: 840, r: 50, taken: false, label: 'SPINNING JANITOR' },
      { type: 'exit', x: 480, y: 885, r: 65, label: 'CLOCK OUT (ALLEY)' }
    ],
    guards: [],
    intro: 'm0_intro'
  },

  1: {
    title: "CH 1: THE KIDNAPPING ALLEY (USA)",
    obj: "Sneak past CIA Agents to the Black Van [E]",
    bg: "#12151f", floor: "#3c414d", w: 960, h: 1080,
    spawn: { x: 480, y: 140 },
    walls: [
      { x: 0, y: 0, w: 960, h: 36 }, { x: 0, y: 1044, w: 960, h: 36 },
      { x: 0, y: 0, w: 36, h: 1080 }, { x: 924, y: 0, w: 36, h: 1080 },
      { x: 240, y: 420, w: 480, h: 36 }, { x: 40, y: 720, w: 380, h: 36 }
    ],
    props: [
      { type: 'crate', x: 140, y: 260, w: 72, h: 52 },
      { type: 'crate', x: 740, y: 560, w: 72, h: 52 },
      { type: 'basket', x: 300, y: 560, w: 44, h: 44 },
      { type: 'van', x: 400, y: 900, w: 160, h: 90 }
    ],
    interactables: [
      { type: 'basket_hide', x: 322, y: 582, r: 48, label: 'HIDE IN DUMPSTER' },
      { type: 'tpose_secret', id: 'sec_1', x: 110, y: 940, r: 50, taken: false, label: 'SPINNING HOBO' },
      { type: 'exit', x: 480, y: 945, r: 80, label: 'ENTER BLACK VAN' }
    ],
    guards: [
      { x: 320, y: 310, ax: 160, ay: 310, bx: 780, by: 310, role: 'guard' },
      { x: 640, y: 630, ax: 480, ay: 630, bx: 840, by: 630, role: 'guard' }
    ],
    intro: 'm1_intro',
    autoUnlockExit: true
  },

  2: {
    title: "CH 2: AREA-52 STEALTH BOOTCAMP (USA)",
    obj: "Knock out Dummy [E] & Grab Clearance Badge [E]",
    bg: "#161a1d", floor: "#525b66", w: 960, h: 1080,
    spawn: { x: 480, y: 960 },
    walls: [
      { x: 0, y: 0, w: 960, h: 36 }, { x: 0, y: 1044, w: 960, h: 36 },
      { x: 0, y: 0, w: 36, h: 1080 }, { x: 924, y: 0, w: 36, h: 1080 },
      { x: 36, y: 540, w: 380, h: 36 }, { x: 544, y: 540, w: 380, h: 36 }
    ],
    props: [
      { type: 'carpet', x: 410, y: 60, w: 140, h: 960 },
      { type: 'table', x: 160, y: 300, w: 120, h: 52 },
      { type: 'table', x: 680, y: 300, w: 120, h: 52 },
      { type: 'basket', x: 260, y: 740, w: 44, h: 44 },
      { type: 'crate', x: 680, y: 740, w: 64, h: 48 }
    ],
    interactables: [
      { type: 'basket_hide', x: 282, y: 762, r: 48, label: 'PRACTICE HIDE' },
      { type: 'keycard', x: 740, y: 325, r: 50, taken: false, label: 'CLEARANCE BADGE' },
      { type: 'tpose_secret', id: 'sec_2', x: 100, y: 940, r: 50, taken: false, label: 'SPINNING ALIEN' },
      { type: 'exit', x: 480, y: 80, r: 65, label: 'LANGLEY HELIPAD' }
    ],
    guards: [
      { x: 480, y: 680, ax: 340, ay: 680, bx: 620, by: 680, role: 'guard' },
      { x: 480, y: 240, ax: 300, ay: 240, bx: 660, by: 240, role: 'immortal' }
    ],
    intro: 'm2_intro'
  },

  3: {
    title: "CH 3: LANGLEY INTEL HEIST (USA)",
    obj: "Grab Guard Disguise [E], Steal Blueprints [E], Reach Roof [E]",
    bg: "#141824", floor: "#8c96a6", w: 1000, h: 1160,
    spawn: { x: 500, y: 1060 },
    walls: [
      { x: 0, y: 0, w: 1000, h: 36 }, { x: 0, y: 1124, w: 1000, h: 36 },
      { x: 0, y: 0, w: 36, h: 1160 }, { x: 964, y: 0, w: 36, h: 1160 },
      { x: 36, y: 600, w: 400, h: 36 }, { x: 564, y: 600, w: 400, h: 36 }
    ],
    props: [
      { type: 'carpet', x: 420, y: 60, w: 160, h: 1040 },
      { type: 'table', x: 740, y: 820, w: 120, h: 54 },
      { type: 'table', x: 440, y: 260, w: 120, h: 54 },
      { type: 'basket', x: 200, y: 820, w: 44, h: 44 }
    ],
    interactables: [
      { type: 'disguise', x: 800, y: 845, r: 52, taken: false, label: 'AGENT DISGUISE' },
      { type: 'basket_hide', x: 222, y: 842, r: 48, label: 'HIDE' },
      { type: 'keycard', x: 500, y: 285, r: 55, taken: false, label: 'PALACE BLUEPRINTS' },
      { type: 'tpose_secret', id: 'sec_3', x: 900, y: 110, r: 50, taken: false, label: 'SPINNING SENATOR' },
      { type: 'exit', x: 500, y: 80, r: 65, label: 'BOARD BLACKHAWK' }
    ],
    guards: [
      { x: 500, y: 740, ax: 260, ay: 740, bx: 740, by: 740, role: 'guard' },
      { x: 320, y: 420, ax: 200, ay: 420, bx: 800, by: 420, role: 'immortal' },
      { x: 680, y: 180, ax: 300, ay: 180, bx: 700, by: 180, role: 'immortal' }
    ],
    intro: 'm3_intro'
  }
};
