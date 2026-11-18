const MISSIONS_PERSIA = {
  4: {
    title: "CH 4: BLACKHAWK CHOPPER (EN ROUTE)",
    obj: "Customize Loadout [E], Check Roof Ladder [E], Fast-Rope [E]",
    isChopper: true,
    spawn: { x: 380, y: 310 }
  },

  5: {
    title: "CH 5: PALACE OUTER COURTYARD (PERSIA)",
    obj: "Steal Courtyard Gate Key [E] & Reach North Gate [E]",
    bg: "#141013", floor: "#d49b54", w: 1000, h: 1240,
    spawn: { x: 500, y: 1120 },
    walls: [
      { x: 0, y: 0, w: 1000, h: 40 }, { x: 0, y: 1200, w: 1000, h: 40 },
      { x: 0, y: 0, w: 40, h: 1240 }, { x: 960, y: 0, w: 40, h: 1240 },
      { x: 40, y: 580, w: 380, h: 36 }, { x: 580, y: 580, w: 380, h: 36 }
    ],
    props: [
      { type: 'carpet', x: 420, y: 60, w: 160, h: 1120 },
      { type: 'table', x: 140, y: 860, w: 110, h: 54 },
      { type: 'table', x: 740, y: 740, w: 110, h: 54 },
      { type: 'basket', x: 340, y: 780, w: 44, h: 44 },
      { type: 'basket', x: 640, y: 420, w: 44, h: 44 },
      { type: 'palm', x: 120, y: 1080, w: 40, h: 40 },
      { type: 'palm', x: 840, y: 1080, w: 40, h: 40 },
      { type: 'palm', x: 120, y: 460, w: 40, h: 40 },
      { type: 'palm', x: 840, y: 460, w: 40, h: 40 }
    ],
    interactables: [
      { type: 'keycard', x: 795, y: 765, r: 48, taken: false, label: 'GATE KEY' },
      { type: 'basket_hide', x: 362, y: 802, r: 48, label: 'HIDE' },
      { type: 'basket_hide', x: 662, y: 442, r: 48, label: 'HIDE' },
      { type: 'tpose_secret', id: 'sec_5', x: 95, y: 110, r: 48, taken: false, label: 'SPINNING GARDENER' },
      { type: 'exit', x: 500, y: 80, r: 65, label: 'NORTH GATE' }
    ],
    guards: [
      { x: 340, y: 900, ax: 220, ay: 900, bx: 620, by: 900, role: 'guard' },
      { x: 720, y: 680, ax: 560, ay: 680, bx: 860, by: 680, role: 'guard' },
      { x: 500, y: 320, ax: 300, ay: 320, bx: 700, by: 320, role: 'immortal' }
    ],
    customIntro: [
      { name: 'COLONEL MUSTARD (HQ)', portrait: 'HQ', text: "Boots on Persian soil, Arthur! Hide in wicker Laundry Baskets [E] to dodge patrols, and swipe the Courtyard Gate Key off the east table." },
      { name: 'PALACE GUARD', portrait: 'GUARD', text: "Ugh, third night guarding potted palms. If an accountant in night-vision goggles sneaks past me, I'm pretending I didn't see him." }
    ]
  },

  6: {
    title: "CH 6: ROYAL KITCHENS (PERSIA)",
    obj: "Grab Guard Disguise [E], Talk to Chef [E], Reach Lift [E]",
    bg: "#141013", floor: "#c9c2b8", w: 1000, h: 1240,
    spawn: { x: 500, y: 1120 },
    walls: [
      { x: 0, y: 0, w: 1000, h: 40 }, { x: 0, y: 1200, w: 1000, h: 40 },
      { x: 0, y: 0, w: 40, h: 1240 }, { x: 960, y: 0, w: 40, h: 1240 },
      { x: 260, y: 760, w: 480, h: 36 }, { x: 260, y: 380, w: 480, h: 36 }
    ],
    props: [
      { type: 'carpet', x: 430, y: 60, w: 140, h: 1120 },
      { type: 'table', x: 110, y: 900, w: 120, h: 56 },
      { type: 'table', x: 760, y: 900, w: 120, h: 56 },
      { type: 'table', x: 420, y: 540, w: 160, h: 64 },
      { type: 'basket', x: 180, y: 640, w: 44, h: 44 },
      { type: 'crate', x: 120, y: 200, w: 64, h: 48 },
      { type: 'crate', x: 810, y: 200, w: 64, h: 48 }
    ],
    interactables: [
      { type: 'disguise', x: 170, y: 925, r: 52, taken: false, label: 'GUARD DISGUISE' },
      { type: 'basket_hide', x: 202, y: 662, r: 48, label: 'HIDE' },
      { type: 'chef', x: 500, y: 510, r: 58, talked: false, label: 'TALK TO CHEF' },
      { type: 'tpose_secret', id: 'sec_6', x: 900, y: 110, r: 48, taken: false, label: 'SPINNING DISHWASHER' },
      { type: 'exit', x: 500, y: 80, r: 65, label: 'THRONE LIFT' }
    ],
    guards: [
      { x: 200, y: 620, ax: 120, ay: 620, bx: 880, by: 620, role: 'immortal' },
      { x: 800, y: 480, ax: 150, ay: 480, bx: 850, by: 480, role: 'immortal' },
      { x: 500, y: 220, ax: 260, ay: 220, bx: 740, by: 220, role: 'immortal' }
    ],
    customIntro: [
      { name: 'COLONEL MUSTARD (HQ)', portrait: 'HQ', text: "You're inside the Royal Kitchens! Grab the spare Guard Uniform off the west table [E] to walk straight through vision cones!" },
      { name: 'HEAD CHEF', portrait: 'CHEF', text: "Psst! Over here by the center banquet table! I have a secret about Emperor Xerxes's mech!" }
    ]
  },

  7: {
    title: "CH 7 (FINALE): PEACOCK THRONE ROOM",
    obj: "Defeat Emperor Xerxes IV!",
    bg: "#141013", floor: "#d49b54", w: 1000, h: 1200,
    spawn: { x: 500, y: 1080 },
    walls: [
      { x: 0, y: 0, w: 1000, h: 40 }, { x: 0, y: 1160, w: 1000, h: 40 },
      { x: 0, y: 0, w: 40, h: 1200 }, { x: 960, y: 0, w: 40, h: 1200 },
      { x: 240, y: 660, w: 140, h: 60 }, { x: 620, y: 660, w: 140, h: 60 }
    ],
    props: [
      { type: 'carpet', x: 400, y: 60, w: 200, h: 1080 },
      { type: 'table', x: 110, y: 880, w: 100, h: 52 },
      { type: 'table', x: 790, y: 880, w: 100, h: 52 },
      { type: 'basket', x: 160, y: 520, w: 44, h: 44 },
      { type: 'palm', x: 120, y: 200, w: 40, h: 40 },
      { type: 'palm', x: 840, y: 200, w: 40, h: 40 }
    ],
    interactables: [
      { type: 'basket_hide', x: 182, y: 542, r: 48, label: 'HIDE' },
      { type: 'tpose_secret', id: 'sec_7', x: 905, y: 1080, r: 48, taken: false, label: 'SPINNING JESTER' }
    ],
    guards: [
      { x: 300, y: 520, ax: 220, ay: 520, bx: 440, by: 520, role: 'immortal' },
      { x: 700, y: 520, ax: 560, ay: 520, bx: 780, by: 520, role: 'immortal' },
      { x: 500, y: 220, ax: 320, ay: 220, bx: 680, by: 220, role: 'boss' }
    ],
    customIntro: [
      { name: 'EMPEROR XERXES IV', portrait: 'XERXES', text: "SO! You are the former data-entry clerk ruining my Tuesday brunch! Behold my Golden Peacock Exosuit!" },
      { name: 'EMPEROR XERXES IV', portrait: 'XERXES', text: "Wait... why is the battery blinking at 2%?! Did the Chef unplug my charger?! NO MATTER—PREPARE TO BE PECKED!" },
      { name: 'COLONEL MUSTARD (HQ)', portrait: 'HQ', text: "The Chef sabotaged his battery! Take him down, Arthur!" }
    ]
  }
};
