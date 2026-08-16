const video = "https://www.youtube.com/watch?v=qGb2rObZC7k";
const v = (image, seconds, alt) => ({ image, seconds, alt, video });
const m = (name, tags, description, method, frame) => ({ name, tags, description, method, frame });
const f = {
  tots: v("/frames/air-tots-135.jpg", 135, "Crisp homemade tater tot split open"),
  nuggets: v("/frames/air-nuggets-460.jpg", 460, "Tasting the chicken nuggets"),
  burrito: v("/frames/air-burrito-640.jpg", 640, "Steak and bean burrito cut open"),
  taquitos: v("/frames/air-taquitos-805.jpg", 805, "Chicken taquitos served with green sauce"),
  falafel: v("/frames/air-falafel-870.jpg", 870, "Frozen falafel cooking in the air fryer"),
  polenta: v("/frames/air-polenta-1005.jpg", 1005, "Cheesy stuffed polenta stick split open"),
  pizza: v("/frames/air-pizza-rolls-1165.jpg", 1165, "Crisp homemade pizza roll after air frying"),
};

export const airFryerPlan = {
  video, label: "Air fryer", shortLabel: "Air fryer", title: "Freezer → air-fryer week",
  copy: "All seven savory freezer recipes from the source air-fryer video, prepped once and cooked straight from frozen on demand.",
  note: "Maximum air fryer: every lunch and dinner has an air-fried main. French toast sticks are omitted because this planner excludes breakfast.",
  formula: [[7, "source freezer builds"], [1, "overnight freeze"], [1, "air fryer"], [0, "weekday pans"]],
  formulaPlus: "+ salad, dips, and slaw as fresh sides", prepMinutes: "165*", coreCount: 7,
  weekNote: "Every savory recipe in the source video appears twice; *active prep is split across one batch session plus overnight freezing.",
  componentHeading: "Seven direct-from-frozen mains",
  freezeCopy: "Freeze in one layer or molds, transfer to labeled bags, and cook only what you need. This week is intentionally air-fryer-heavy.",
  equipment: "Air fryer + food processor + freezer",
  aside: {
    title: "Freeze the shape; cook on demand.",
    copy: "The mold-and-bag method makes each component individually portionable. The week has almost no weekday cleanup.",
    storage: ["Freeze solid before bagging", "Label item + temp + time", "Keep raw chicken items separate", "Fresh sides: prep only 3–4 days"],
    air: ["350°F: nuggets, burritos, taquitos", "360°F: tots · 380°F: falafel, polenta, pizza rolls"],
  },
  meals: [
    ["MON", "17", m("Chicken nuggets + crunch", ["nuggets", "slaw", "dip"], "Food-processor chicken nuggets with cabbage-cucumber crunch and dip.", "Spray and air-fry from frozen at 350°F for 9–10 min.", f.nuggets), m("Steak + bean burrito", ["steak", "beans", "cheddar"], "Skirt steak, corn, black beans, and cheddar in a crisp tortilla.", "Air-fry from frozen at 350°F for 10–15 min.", f.burrito)],
    ["TUE", "18", m("Falafel pita plate", ["falafel", "pita", "hummus"], "Parsley falafel with pita, hummus, cucumber, and lemon.", "Spray and air-fry from frozen at 380°F for 10 min.", f.falafel), m("Cheesy polenta + salad", ["polenta", "mozzarella", "tomato"], "Tomato-and-mozzarella stuffed polenta with a simple green salad.", "Air-fry at 380°F for 10 min per side.", f.polenta)],
    ["WED", "19", m("Tater tot salad bowl", ["tots", "greens", "dip"], "Crisp homemade tots over chopped greens with cucumber, tomato, and yogurt dip.", "Spray; air-fry from frozen at 360°F for 18 min without over-shaking.", f.tots), m("Chicken taquitos", ["chicken", "chile", "tortilla"], "Chile-braised shredded chicken rolled in corn tortillas with salsa and slaw.", "Spray and air-fry from frozen at 350°F for 10 min.", f.taquitos)],
    ["THU", "20", m("Nugget wrap", ["nuggets", "tortilla", "slaw"], "Air-fried nuggets sliced into a tortilla with slaw and yogurt sauce.", "Air-fry at 350°F for 9–10 min; warm tortilla in the final minute.", f.nuggets), m("Homemade pizza rolls", ["dough", "pepperoni", "mozzarella"], "From-scratch freezer pizza rolls with a dressed salad.", "Air-fry from frozen at 380°F for 10 min.", f.pizza)],
    ["FRI", "21", m("Burrito + chopped salad", ["burrito", "greens", "lime"], "A crisp steak-bean burrito with lime-dressed chopped vegetables.", "Air-fry at 350°F for 10–15 min; rest 3 min before cutting.", f.burrito), m("Falafel + tots plate", ["falafel", "tots", "hummus"], "Two freezer components with hummus and crunchy vegetables.", "Start tots at 360°F; add falafel after 8 min and finish together.", f.tots)],
    ["SAT", "22", m("Polenta sticks + marinara", ["polenta", "tomato", "cheese"], "Crisp stuffed polenta with extra reduced tomato sauce and salad.", "Air-fry at 380°F for 10 min per side.", f.polenta), m("Taquito crunch plate", ["taquitos", "slaw", "salsa"], "Crisp chicken taquitos with cabbage slaw, salsa, and lime.", "Air-fry at 350°F for 10 min; serve immediately.", f.taquitos)],
    ["SUN", "23", m("Pizza roll snack box", ["pizza rolls", "veg", "dip"], "Pizza rolls, cucumber, cherry tomatoes, and a cool dip.", "Air-fry pizza rolls at 380°F for 10 min.", f.pizza), m("Freezer sampler basket", ["nuggets", "tots", "falafel"], "Use the open bags: a small mixed basket with fresh slaw and dips.", "Group by temperature; cook at 350–380°F and pull each item at its listed time.", f.nuggets)],
  ],
  components: [
    ["01", "Tater tots", "Par-cooked grated russets pressed and frozen.", ["360°F", "18 min"]],
    ["02", "Chicken nuggets", "Ground chicken, frozen, breaded, then frozen again.", ["350°F", "9–10 min"]],
    ["03", "Steak-bean burritos", "A complete handheld meal in one freezer parcel.", ["350°F", "10–15 min"]],
    ["04", "Chicken taquitos", "Chile-braised chicken rolled in corn tortillas.", ["350°F", "10 min"]],
    ["05", "Falafel", "Soaked chickpeas, parsley, and onion pressed into molds.", ["380°F", "10 min"]],
    ["06", "Stuffed polenta", "Tomato and mozzarella sealed inside cooked polenta.", ["380°F", "20 min"]],
    ["07", "Pizza rolls", "From-scratch dough, sauce, mozzarella, and pepperoni.", ["380°F", "10 min"]],
  ],
  timeline: [
    ["DAY −1", "Soak + mix dough", "Soak chickpeas. Mix pizza dough and refrigerate overnight."],
    ["0:00", "Par-cook potatoes", "Boil halved russets 10–15 min, cool, grate, press into molds, and freeze."],
    ["0:25", "Shape nuggets", "Process chicken, scoop and flatten, then freeze before breading."],
    ["0:45", "Cook two fillings", "Cook steak for burritos; start chile-braised chicken for taquitos."],
    ["1:15", "Press falafel + polenta", "Process soaked chickpeas. Cook sauce and polenta; fill molds with mozzarella."],
    ["1:45", "Roll handhelds", "Assemble burritos and taquitos; roll and cut pizza rolls."],
    ["2:25", "Bread, freeze, label", "Bread firm nuggets. Freeze everything solid, then bag with each item’s time and temperature."],
  ],
  recipes: [
    ["Tater tots", "AIR FRY", "A one-ingredient freezer tot.", ["4 large russets", "oil spray"], ["Boil halved potatoes 10–15 min; cool, peel, and grate.", "Press firmly into molds and freeze overnight.", "Spray; air-fry at 360°F for 18 min."], 38],
    ["Chicken nuggets", "AIR FRY", "A ground chicken nugget built for freezing.", ["2 chicken breasts", "2 boneless thighs", "garlic powder", "2 cups flour", "2 eggs", "breadcrumbs + cornflakes"], ["Process chicken with seasoning and oil; scoop and flatten.", "Freeze, then coat flour → egg → crumb mix; freeze again.", "Spray; air-fry at 350°F for 9–10 min."], 286],
    ["Steak + bean burritos", "AIR FRY", "A complete freezer meal.", ["1 lb skirt steak", "1 cup corn", "1 cup black beans", "1 cup cheddar", "10-inch tortillas"], ["Cook and cool steak; mix with corn, beans, and cheese.", "Roll ½ cup filling per tortilla and freeze.", "Air-fry at 350°F for 10–15 min."], 572],
    ["Chicken taquitos", "AIR FRY", "Chile-braised chicken in a freezer-ready roll.", ["4 leg quarters", "guajillo + ancho + árbol chiles", "2 cups tomato puree", "1 cup stock", "1 onion", "3 garlic cloves"], ["Toast chiles; brown chicken; blend and add sauce.", "Braise 20–30 min, shred, and reduce.", "Roll in corn tortillas; freeze; air-fry at 350°F for 10 min."], 676],
    ["Falafel", "AIR FRY", "A moldable dried-chickpea falafel.", ["1 cup dried chickpeas", "½ onion", "1 cup parsley", "lemon", "salt + pepper"], ["Soak chickpeas overnight; process with remaining ingredients.", "Press into small molds and freeze.", "Spray; air-fry at 380°F for 10 min."], 814],
    ["Cheesy polenta sticks", "AIR FRY", "Tomato and mozzarella sealed inside polenta.", ["½ onion", "2 qt tomato puree", "1 cup polenta", "3 cups water", "1 lb mozzarella"], ["Reduce onion and tomato 15–20 min; cook polenta 10 min.", "Line molds with polenta; fill with sauce and cheese; seal and freeze.", "Air-fry at 380°F for 10 min per side."], 898],
    ["Pizza rolls", "AIR FRY", "A from-scratch freezer pizza roll.", ["550 g flour", "225 g water", "2 tsp yeast", "12 g salt", "tomato sauce", "mozzarella + pepperoni"], ["Mix, knead, and rest dough overnight.", "Roll two sheets; add filling, egg-wash seams, top, cut, vent, and freeze.", "Air-fry at 380°F for 10 min."], 1027],
  ],
  shopping: [
    ["produce", "Russet potatoes", "4 large", "russet potatoes"], ["produce", "Chicken breasts", "2", "boneless chicken breasts"], ["produce", "Chicken thighs", "2 boneless", "boneless chicken thighs"], ["produce", "Chicken leg quarters", "4", "chicken leg quarters"], ["produce", "Skirt steak", "1 lb", "skirt steak 1 lb"], ["produce", "Yellow onions", "2", "yellow onions"], ["produce", "Garlic", "1 head", "garlic"], ["produce", "Parsley", "1 bunch", "flat leaf parsley"], ["produce", "Lemons + limes", "3 total", "lemons limes"], ["produce", "Cabbage slaw mix", "1 bag", "cabbage slaw mix"], ["produce", "Cucumber", "1", "English cucumber"], ["produce", "Cherry tomatoes", "1 pint", "cherry tomatoes"],
    ["fridge", "Eggs", "6", "large eggs"], ["fridge", "Cheddar", "8 oz", "cheddar cheese"], ["fridge", "Mozzarella", "1½ lb", "low moisture mozzarella"], ["fridge", "Hummus", "16 oz", "hummus"], ["fridge", "Yogurt dip", "16 oz", "plain Greek yogurt"],
    ["pantry", "Flour", "5 lb", "all purpose flour"], ["pantry", "Breadcrumbs", "1 canister", "breadcrumbs"], ["pantry", "Cornflakes", "1 box", "corn flakes cereal"], ["pantry", "Black beans", "1 can", "black beans canned"], ["pantry", "Corn", "1 can", "canned corn"], ["pantry", "Dried chickpeas", "1 lb", "dried chickpeas"], ["pantry", "Polenta", "1 lb", "polenta"], ["pantry", "Tomato puree", "2 qt", "tomato puree"], ["pantry", "Flour tortillas", "1 pack", "large flour tortillas"], ["pantry", "Corn tortillas", "1 pack", "corn tortillas"], ["pantry", "Pita", "1 pack", "pita bread"], ["pantry", "Pepperoni", "1 pack", "sliced pepperoni"], ["pantry", "Dried guajillo chiles", "1 bag", "dried guajillo peppers"], ["pantry", "Dried ancho + árbol", "1 bag each", "dried ancho arbol peppers"], ["pantry", "Yeast", "1 packet", "active dry yeast"], ["pantry", "High-heat oil spray", "1", "avocado oil spray"],
  ],
  sources: [{
    title: "Air Fryer Cooking Has Changed Forever", year: "2026", image: "/frames/air-pizza-rolls-1165.jpg",
    note: "All seven savory recipes, freezer instructions, and exact reheat settings come from this video and its public recipe document.", video,
    doc: "https://docs.google.com/document/d/1M7TcyxLkLDyh3XSRIczZj0ySyVEnp8NNFV6DeRm2Kf0/edit",
    times: [["00:38",38],["04:46",286],["09:32",572],["11:16",676],["13:34",814],["14:58",898],["17:07",1027]],
  }],
  methodNote: "This plan uses every savory recipe in the source freezer-to-air-fryer video. French toast sticks are the only omission because you requested lunch and dinner only. Recipe text is paraphrased from the video’s public recipe document; time and temperature targets are preserved.",
};
