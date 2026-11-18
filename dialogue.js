const STORY_DIALOGUE = {
  // CHAPTER 0: MEGACORP DAY JOB
  m0_intro: [
    { name: 'ARTHUR (Inner Monologue)', portrait: 'ARTHUR', text: "Another glorious Tuesday at MegaCorp Logistics. Four hundred spreadsheets to copy-paste before 5 PM, and the breakroom ran out of creamer." },
    {
      name: 'MANAGER GREG', portrait: 'BOSS',
      text: "Arthur! Why are you standing by the potted fern?! Those Q3 Stapler Inventory TPS reports won't file themselves!",
      choices: [
        { label: "1. 'Yes sir, heading to my desk right now!'", reply: [{ name: 'MANAGER GREG', portrait: 'BOSS', text: "Good! And fix the jammed printer on your way—I'm not paying IT overtime." }] },
        { label: "2. 'Have you ever noticed our stapler budget is higher than payroll?'", reply: [{ name: 'MANAGER GREG', portrait: 'BOSS', text: "Less questioning, more typing, Pendelton! Get to your computer!" }] },
        { label: "3. 'I'm actually training to become an international secret agent.'", reply: [{ name: 'MANAGER GREG', portrait: 'BOSS', text: "Haha, hilarious. If those reports aren't done in two minutes, you're fired." }] }
      ]
    }
  ],
  m0_coworker: [
    {
      name: 'LINDA (Accounting)', portrait: 'CHEF',
      text: "Psst, Arthur! Did you hear on the radio? Pistachio prices just hit $900 a pound because some Persian Emperor bought every farm on Earth!",
      choices: [
        { label: "1. 'Sounds like a problem for rich people. I eat peanut butter.'", reply: [{ name: 'LINDA (Accounting)', portrait: 'CHEF', text: "True! Anyway, watch out—there's a creepy black van idling outside the alley exit." }] },
        { label: "2. 'Someone ought to sneak over there and stop him.'", reply: [{ name: 'LINDA (Accounting)', portrait: 'CHEF', text: "Yeah, like a trained spy! Definitely not a guy in a cheap tie like you." }] }
      ]
    }
  ],
  m0_printer: [
    { name: 'OFFICE PRINTER', portrait: 'GUARD', text: "BEEP BOOP. PC LOAD LETTER. TRAY 2 EMPTY. PLEASE APPLY PERCUSSIVE MAINTENANCE [E]." },
    { name: 'ARTHUR', portrait: 'ARTHUR', text: "*WHACK!* There. Fixed it with a stapler. Now back to my desk computer." }
  ],
  m0_desk: [
    { name: 'DESKTOP PC', portrait: 'ARTHUR', text: "Uploading TPS Reports... 100% Complete! Time to clock out through the Back Alley Exit Door [E] at the bottom!" },
    { name: 'MANAGER GREG', portrait: 'BOSS', text: "Good work, Arthur! Lock the alley door behind you—oh, and ignore the guys in black ski masks parked by the dumpster." }
  ],

  // CHAPTER 1: THE KIDNAPPING ALLEY
  m1_intro: [
    { name: 'AGENT VANCE (Kidnapper)', portrait: 'PILOT', text: "Hold it right there, Arthur Pendelton! Don't scream—we're the CIA's Ultra-Secret Snack Division!" },
    {
      name: 'COLONEL MUSTARD', portrait: 'HQ',
      text: "Get in the black van, kid! Your unmatched ability to remain completely unnoticed in a boring office makes you the ONLY man capable of infiltrating Emperor Xerxes IV's palace!",
      choices: [
        { label: "1. 'I'm an accountant! I don't even know how to hold a gun!'", reply: [{ name: 'COLONEL MUSTARD', portrait: 'HQ', text: "That's why we're giving you a tactical spatula first! Now sneak past our rookie agents to the Black Van [E]—if they catch you, it counts as failing your audition!" }] },
        { label: "2. 'Does this secret agent gig come with dental insurance?'", reply: [{ name: 'COLONEL MUSTARD', portrait: 'HQ', text: "Full dental AND unlimited baklava! Sneak past the perimeter agents and hop in the Black Van [E]!" }] }
      ]
    }
  ],

  // CHAPTER 2: AREA-52 STEALTH TRAINING
  m2_intro: [
    { name: 'COLONEL MUSTARD', portrait: 'HQ', text: "Welcome to Sub-Level 9 in Nevada! Before we fly you to Persia, you need to pass our 3-part Stealth Ops Bootcamp." },
    { name: 'COLONEL MUSTARD', portrait: 'HQ', text: "Step 1: Hide in the wicker Laundry Basket [E]. Step 2: Knock out the training dummy from behind with your Tactical Spatula [E]. Step 3: Grab the Clearance Badge off the table!" }
  ],

  // CHAPTER 3: LANGLEY INTEL HEIST
  m3_intro: [
    { name: 'COLONEL MUSTARD', portrait: 'HQ', text: "Bad news, Arthur. Before we deploy, we need Xerxes's secret palace blueprints—and the Pentagon locked them in the Archives Wing across the hall." },
    {
      name: 'ARCHIVIST BOB', portrait: 'GUARD',
      text: "Halt! Nobody enters the Restricted Intel Vault without the Director's permission!",
      choices: [
        { label: "1. [Bluff] 'I'm here to audit your stapler inventory.'", reply: [{ name: 'ARCHIVIST BOB', portrait: 'GUARD', text: "Oh, carry on then! Just don't touch the glowing blue blueprints on the north table!" }] },
        { label: "2. [Sneak] 'Uh, wrong floor!' (Duck behind cover)", reply: [{ name: 'COLONEL MUSTARD', portrait: 'HQ', text: "Smooth. Put on the spare Guard Disguise on the east table or sneak around his vision cone to grab the Blueprints [E]!" }] }
      ]
    }
  ],

  // T-POSE SPINNER SECRET (APPEARS IN EVERY CHAPTER!)
  tpose_secret: [
    { name: 'MYSTERY SPINNING MAN', portrait: 'SPINNER', text: "I is spinning!!!" }
  ],

  // RANDOM SPATULA TAKEDOWN QUIPS
  spatula_kills: [
    "Bonk! Right in the ceremonial turban. That's what happens when you skip helmet day.",
    "Silent spatula takedown! Somewhere, a short-order cook sheds a single proud tear.",
    "Night-night! Honestly, he looked like he needed a nap anyway.",
    "Thwack! Non-stick tactical cookware claims another victim.",
    "Lights out! Remind me to sanitize this spatula before we hit the breakroom."
  ]
};
