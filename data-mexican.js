const video = "https://www.youtube.com/watch?v=3Bhd6NcqVJI";
const v = (image, seconds, alt) => ({ image, seconds, alt, video });
const m = (name, tags, description, method, frame) => ({ name, tags, description, method, frame });
const f = {
  tacos: v("/frames/mexican-tacos-670.jpg", 670, "Assembling a pork taco with cabbage slaw"),
  flautas: v("/frames/mexican-flautas-935.jpg", 935, "Finished zucchini and cabbage flautas"),
  tamales: v("/frames/mexican-tamales-1040.jpg", 1040, "Pork tamale plated with crema and onion"),
  chilaquiles: v("/frames/mexican-chilaquiles-1140.jpg", 1140, "Air-fried tortilla chilaquiles with eggs"),
  soup: v("/frames/mexican-black-bean-soup-1232.jpg", 1232, "Black bean soup with masa dumplings"),
};

export const mexicanPlan = {
  video, label: "Mexican", shortLabel: "Mexican", title: "$50 Mexican component week",
  copy: "A complete budget system: one braised pork, beans, masa, salsa, slaw, and crema recombined into tacos, flautas, tamales, chilaquiles, and soup.",
  note: "All dishes and quantities are adapted from the linked recipe document; the pork is scaled down to about 3 lb plus freezer portions.",
  formula: [[1, "chipotle pork braise"], [1, "pot of black beans"], [1, "masa dough system"], [3, "cold toppings"]],
  formulaPlus: "+ five later-week transformations", prepMinutes: "130*", coreCount: 6,
  weekNote: "One grocery basket becomes ten recipes; *130 active minutes plus the unattended pork braise.",
  componentHeading: "Six high-leverage components",
  freezeCopy: "Freeze half the shredded pork and spare tortillas. Use slaw and avocado crema first; beans and salsa carry the late week.",
  equipment: "Air fryer + Dutch oven + blender",
  aside: {
    title: "Let one braise do the heavy lifting.",
    copy: "Pork, beans, salsa, crema, slaw, and masa are the reusable layer. Later recipes mostly reshape them.",
    storage: ["Fridge: slaw + crema, 4 days", "Fridge: pork + beans, 4 days", "Freezer: half pork + tortillas", "Tamales: freeze after steaming"],
    air: ["Chilaquiles chips: 370°F · 10 min", "Flauta reheat: 380°F · 6–8 min"],
  },
  meals: [
    ["MON", "17", m("Chipotle pork tacos", ["pork", "slaw", "crema"], "Corn tortillas, chipotle pork, cabbage-cilantro slaw, salsa, and avocado crema.", "Reheat pork; warm tortillas in the air fryer at 330°F for 1–2 min.", f.tacos), m("Pork + black bean bowl", ["pork", "beans", "salsa"], "Braised pork and beans topped with salsa, cheese, cilantro, and lime.", "Air-fry a tortilla at 370°F for 5–6 min for a crisp side.", f.tacos)],
    ["TUE", "18", m("Black bean tostadas", ["beans", "tortilla", "crema"], "Crisp tortillas with smooth refried bean sauce, slaw, cheese, and crema.", "Air-fry tortillas at 370°F for 6–8 min; spread and top after cooking.", f.flautas), m("Zucchini-cabbage flautas", ["vegetable", "cheese", "salsa"], "Charred zucchini-cabbage filling rolled in tortillas with Jack cheese.", "The source recipe bakes these; air-fry at 380°F for 8–10 min for the same crisp structure.", f.flautas)],
    ["WED", "19", m("Pork taco salad", ["pork", "slaw", "chips"], "Slaw, pork, black beans, crushed air-fried tortilla chips, salsa, and crema.", "Air-fry tortilla triangles at 370°F until crisp.", f.tacos), m("Jalapeño cornbread + beans", ["masa", "corn", "beans"], "Cheesy masa biscuits with black beans, pork, and salsa.", "Re-crisp a biscuit at 350°F for 4–5 min.", f.flautas)],
    ["THU", "20", m("Pork tamales", ["pork", "masa", "crema"], "Pork-filled masa steamed in parchment, with salsa and avocado crema.", "Reheat wrapped; air-fry unwrapped for 3 min to crisp the edges.", f.tamales), m("Tamale + slaw plate", ["tamale", "slaw", "beans"], "A second tamale with cabbage slaw, black beans, cheese, and salsa.", "Warm beans separately so the slaw stays cold.", f.tamales)],
    ["FRI", "21", m("Pork quesadilla", ["pork", "cheese", "tortilla"], "Pork and Jack folded in a corn tortilla with salsa and crema.", "Air-fry at 370°F for 6–8 min, flipping once.", f.tacos), m("Air-fryer chilaquiles", ["chips", "salsa", "eggs"], "Air-fried tortilla chips quickly coated in chipotle salsa and topped with eggs.", "Air-fry chips at 370°F for 10 min; sauce only immediately before eating.", f.chilaquiles)],
    ["SAT", "22", m("Flauta crunch box", ["flautas", "salsa", "slaw"], "Re-crisped flautas with slaw, salsa, crema, and lime.", "Air-fry at 380°F for 6–8 min from chilled.", f.flautas), m("Black bean masa soup", ["beans", "corn", "masa"], "Textured black bean soup with corn, cabbage, chipotle, cheese, and masa dumplings.", "Simmer dumplings covered for 20 min; reheat gently.", f.soup)],
    ["SUN", "23", m("Pork + bean tostadas", ["pork", "beans", "crunch"], "Crisp tortillas layered with bean sauce, pork, remaining toppings, and lime.", "Air-fry the tortilla base at 370°F for 6–8 min.", f.flautas), m("Freezer taco plate", ["freezer pork", "tortillas", "salsa"], "Thawed pork, stored tortillas, salsa, and remaining beans.", "Air-fry pork in a foil parcel at 350°F for 8–10 min; open for the last 2 min.", f.tacos)],
  ],
  components: [
    ["01", "Chipotle braised pork", "The master protein for tacos, bowls, tamales, and soup.", ["10+ portions", "freeze half"]],
    ["02", "Black beans", "Whole for bowls; blended for tostadas; loosened into soup.", ["1 lb dry", "one pot"]],
    ["03", "Masa dough", "Tortillas first; tamales and dumplings later.", ["multi-use", "freezer"]],
    ["04", "Cabbage-cilantro slaw", "Cold acid and crunch for every rich plate.", ["4 days", "no cook"]],
    ["05", "Blender salsa", "Crushed tomato, jalapeño, lime, onion, garlic, and cilantro.", ["one blender", "all week"]],
    ["06", "Avocado crema", "A cool finish for tacos, flautas, tamales, and chilaquiles.", ["use first", "blend"]],
  ],
  timeline: [
    ["0:00", "Start pork + beans", "Sear pork, add aromatics, tomato, chipotle, and water; cover for 3–4 hr. Simmer soaked beans separately."],
    ["0:35", "Blend both sauces", "Make salsa, rinse blender, then make avocado-cilantro sour cream."],
    ["0:55", "Mix and press masa", "Make tortillas; reserve some dough for tamales and soup dumplings."],
    ["1:25", "Build the slaw", "Massage cabbage with cilantro, lime, sour cream, salt, and pepper."],
    ["1:40", "Cook flauta filling", "Char cabbage and zucchini; cool before rolling later."],
    ["1:55", "Make cornbread biscuits", "Mix corn, masa, jalapeño, cheese, sour cream, and eggs; bake while the braise finishes."],
    ["2:10", "Cool + split", "Shred pork. Refrigerate four days; freeze the later-week half."],
  ],
  recipes: [
    ["Chipotle braised pork", "BRAISE", "The master component, scaled to about 3 lb.", ["3 lb pork butt", "1 onion", "3 garlic cloves", "1 jalapeño", "3 chipotles + adobo", "16 oz crushed tomatoes"], ["Cube, season, and brown pork in batches.", "Sauté aromatics; add tomato, chipotle, cilantro stems, water, and pork.", "Cover and simmer 3–4 hr; cool and shred."], 131],
    ["Blender salsa", "BLEND", "A textured all-week salsa.", ["16 oz crushed tomatoes", "½ onion", "2 garlic cloves", "½ jalapeño", "½ cup cilantro", "1 lime"], ["Pulse all ingredients, then blend briefly on low.", "Season and refrigerate."], 510],
    ["Avocado cilantro crema", "BLEND", "A smooth, cool finishing sauce.", ["1 avocado", "⅓ cup cilantro", "¾ cup sour cream", "½ lime", "3 tbsp avocado oil"], ["Blend everything except oil.", "Stream in oil; thin to a squeezeable texture."], 510],
    ["Corn tortillas + masa", "GRIDDLE", "One dough becomes tortillas, then feeds the tamale and dumpling recipes.", ["4 cups masa harina", "1¼ tsp salt", "4 tbsp fat", "3½–4 cups warm water"], ["Knead to soft playdough texture; rest 10–15 min.", "Press and cook 30 sec, 45–60 sec, then 15–30 sec."], 510],
    ["Cabbage-cilantro slaw", "NO COOK", "The fresh counterweight.", ["½ cabbage", "½ lime", "⅓ cup cilantro", "2–3 tbsp sour cream"], ["Slice finely and massage with remaining ingredients.", "Rest at least 1 hr."], 630],
    ["Black beans", "SIMMER", "The second master component.", ["1 lb dried black beans", "½ onion", "3 garlic cloves", "4 cups water"], ["Soak overnight.", "Simmer covered 2–3 hr until tender."], 684],
    ["Jalapeño-cheese cornbread", "BAKE", "Scoopable masa biscuits from the same budget basket.", ["1 cup sour cream", "2 eggs", "1 cup corn", "⅔ cup masa", "½ cup Jack", "1 jalapeño"], ["Whisk wet ingredients; fold in dry, cheese, and jalapeño.", "Bake at 400°F for 30–40 min."], 740],
    ["Zucchini-cabbage flautas", "AIR FRY", "The source recipe bakes these; this air-fryer finish preserves its structure.", ["⅓ cabbage", "2 zucchini", "cumin + paprika", "10 tortillas", "½ cup Jack"], ["Char vegetables and season.", "Roll warm tortillas; add cheese.", "Air-fry at 380°F for 8–10 min."], 830],
    ["Pork tamales", "STEAM", "A later-week transformation of pork and masa.", ["½ cup lard", "3 cups masa", "1 tsp baking powder", "2¾ cups stock", "shredded pork"], ["Whip fat; mix in masa and stock.", "Fill and wrap in parchment.", "Steam 45–60 min."], 948],
    ["Air-fryer chilaquiles", "AIR FRY", "The clearest air-fryer recipe in the Mexican plan.", ["6 tortillas", "1½ cups salsa", "chipotles", "1 lime", "4 eggs"], ["Cut and oil tortillas; air-fry at 370°F for 10 min.", "Blend sauce, fry eggs, then coat chips briefly and top."], 1090],
    ["Black bean masa soup", "SIMMER", "The final fridge-clear recipe.", ["1 cup beans", "1 cup corn", "¼ cabbage", "chipotle", "½ cup tamale dough", "¼ cup cheese"], ["Sauté vegetables; add beans, corn, chipotle, and water.", "Partly blend; add cheese and masa dumplings.", "Cover and cook dumplings 20 min."], 1180],
  ],
  shopping: [
    ["produce", "Pork butt", "3–4 lb", "pork shoulder butt"], ["produce", "Zucchini", "2", "zucchini"], ["produce", "Green cabbage", "1", "green cabbage"], ["produce", "Cilantro", "1 bunch", "cilantro"], ["produce", "Limes", "3", "limes"], ["produce", "Garlic", "1 head", "garlic"], ["produce", "Yellow onions", "4", "yellow onions"], ["produce", "Avocado", "1", "avocado"], ["produce", "Jalapeños", "2", "jalapeno peppers"],
    ["fridge", "Monterey Jack", "8 oz", "Monterey Jack cheese"], ["fridge", "Sour cream", "16 oz", "sour cream 16 oz"], ["fridge", "Eggs", "6", "large eggs"],
    ["pantry", "Canned corn", "1 can", "canned corn"], ["pantry", "Crushed tomatoes", "32 oz", "crushed tomatoes 32 oz"], ["pantry", "Chipotles in adobo", "1 can", "chipotle peppers adobo"], ["pantry", "Dried black beans", "1 lb", "dried black beans 1 lb"], ["pantry", "Masa harina", "4 lb bag", "masa harina"], ["pantry", "Avocado oil", "check pantry", "avocado oil"], ["pantry", "Baking powder + soda", "check pantry", "baking powder baking soda"], ["pantry", "Sugar", "¼ cup", "granulated sugar"], ["pantry", "Parchment paper", "1 roll", "parchment paper"],
  ],
  sources: [{
    title: "The Most Delicious $50 You Will Ever Spend", year: "2026", image: "/frames/mexican-chilaquiles-1140.jpg",
    note: "The entire plan comes from this one budget component system and its public recipe document.", video,
    doc: "https://docs.google.com/document/d/13yEjCRLBeYGfpOtCUOlJAy03eIy-GgRh1Zr_bk78h0c/edit",
    times: [["02:11",131],["08:30",510],["11:24",684],["15:48",948],["18:20",1100],["20:32",1232]],
  }],
  methodNote: "This week takes nearly the whole savory system from the source video: pork, salsa, crema, tortillas, slaw, beans, cornbread, flautas, tamales, chilaquiles, and soup. Quantities are paraphrased from its public recipe document; pork is reduced from 5–6 lb to 3–4 lb for one person.",
};
