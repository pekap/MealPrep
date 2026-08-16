const video = "https://www.youtube.com/watch?v=3oppqhMEy2I";
const v = (image, seconds, alt) => ({ image, seconds, alt, video });
const m = (name, tags, description, method, frame) => ({ name, tags, description, method, frame });
const f = {
  meatballs: v("/frames/meal-meatballs-07-30.jpg", 450, "Pesto protein portions being shaped"),
  potatoes: v("/frames/meal-harissa-potatoes-09-50.jpg", 590, "Harissa sweet potatoes on the prep tray"),
  bowlSauce: v("/frames/meal-bowl-sauce-14-48.jpg", 888, "Finished modular bowl with herbed sauce"),
  bowl: v("/frames/meal-bowl-finished-14-50.jpg", 890, "Finished Mediterranean modular bowl"),
  rice: v("/frames/meal-rice-bowl-14-52.jpg", 892, "Rice bowl assembled from prepared components"),
  chopped: v("/frames/meal-chopped-salad-14-58.jpg", 898, "Chopped salad build with herbed sauce"),
  green: v("/frames/meal-green-salad-15-00.jpg", 900, "Fresh green salad portioned for the week"),
  later: v("/frames/meal-week-two-bowl-18-00.jpg", 1080, "A later modular bowl assembled from prepared components"),
};

export const mediterraneanPlan = {
  video, label: "Mediterranean", shortLabel: "Med", title: "Mediterranean component week",
  copy: "Mike’s 14-day lunch system, compressed into one week: five flexible components, a fresh crunch kit, and fast air-fryer finishes.",
  note: "Source-video frames show Mike’s original turkey build; each timestamp opens the matching moment.",
  formula: [[1, "protein mix, two shapes"], [2, "vegetable builds"], [1, "golden rice"], [1, "herby sauce"]],
  formulaPlus: "+ fresh crunch & pantry pivots", prepMinutes: "90", coreCount: 5,
  weekNote: "Same components, different geometry: bowl, pita, plate, salad, and snack box.",
  componentHeading: "Five prep components",
  freezeCopy: "Freeze half the turkey portions. Keep rice, sauce, and crunch separate so textures stay sharp.",
  equipment: "Air fryer + 2 burners",
  aside: {
    title: "Shape one turkey mix two ways.",
    copy: "Make four thin patties and twelve small meatballs from the same pesto–sun-dried tomato mixture. One bowl, two meal formats.",
    storage: ["Fridge: Mon–Thu portions", "Freezer: Fri–Sun turkey", "Sauce: jar, 5 days", "Crunch: dry, undressed"],
    air: ["Turkey from raw/frozen: 380°F · 10–12 min", "Sweet potato reheat: 380°F · 8–10 min"],
  },
  meals: [
    ["MON", "17", m("Turkey mezze bowl", ["turkey", "rice", "crunch"], "Golden rice, pesto turkey meatballs, cucumber-tomato crunch, feta, and herbed yogurt sauce.", "Air-fry 3 meatballs at 380°F for 8–10 min. Heat rice; add cold crunch and sauce last.", f.bowl), m("Crispy chickpea pita", ["chickpea", "pita", "hummus"], "Za’atar chickpeas and cauliflower in pita with hummus, cabbage crunch, and herbs.", "Air-fry chickpea-cauliflower at 390°F for 6 min; warm pita for the final minute.", f.chopped)],
    ["TUE", "18", m("Pesto turkey pita", ["patty", "greens", "sauce"], "A thin pesto turkey patty, cabbage, tomato, and yogurt-feta sauce in pita.", "Air-fry at 380°F for 8–10 min; rest 2 min.", f.meatballs), m("Harissa power bowl", ["turkey", "sweet potato", "crunch"], "Turkey meatballs over harissa sweet potatoes with cucumber, herbs, and cool sauce.", "Reheat turkey and potatoes together at 380°F for 8 min.", f.bowlSauce)],
    ["WED", "19", m("Hummus crunch box", ["hummus", "veg", "pita"], "Hummus, crisp vegetables, feta, pita wedges, and roasted chickpeas.", "Keep pita dry and hummus separate until lunch.", f.green), m("Golden rice turkey bowl", ["rice", "turkey", "sauce"], "Golden raisin rice, turkey meatballs, cauliflower, yogurt sauce, and sumac.", "Air-fry turkey and cauliflower at 380°F for 7–8 min.", f.rice)],
    ["THU", "20", m("Air-fryer chickpea salad", ["chickpea", "greens", "feta"], "Hot crisp chickpeas and cauliflower over cold cabbage-cucumber crunch with feta.", "Air-fry warm components at 390°F for 6 min, then add to salad.", f.chopped), m("Turkey burger plate", ["patty", "sweet potato", "salad"], "Pesto turkey patty, harissa sweet potatoes, chopped salad, and herbed yogurt.", "Air-fry patty and potatoes at 380°F for 9 min; flip once.", f.bowl)],
    ["FRI", "21", m("Mediterranean leftover box", ["rice", "hummus", "crunch"], "Cold rice and herb salad with hummus, vegetables, feta, and remaining protein.", "Loosen rice with lemon and yogurt sauce; eat cold.", f.green), m("Harissa turkey pita", ["turkey", "pita", "sweet potato"], "Pita with sliced meatballs, smashed harissa sweet potato, crunch, and sauce.", "Air-fry frozen turkey at 380°F for 11–12 min; add pita for the final minute.", f.potatoes)],
    ["SAT", "22", m("Crispy chickpea rice bowl", ["chickpea", "rice", "hummus"], "Golden rice with crisp chickpea-cauliflower, hummus, herbs, and lemon.", "Heat rice and air-fry chickpeas separately.", f.bowlSauce), m("Meatballs + harissa veg", ["turkey", "sweet potato", "sauce"], "Air-fried pesto turkey meatballs, sweet potatoes, and cucumber salad.", "Cook frozen meatballs at 380°F for 11–12 min; add potatoes for the final 7 min.", f.meatballs)],
    ["SUN", "23", m("Fridge-clear chopped salad", ["crunch", "protein", "pita"], "Remaining vegetables, toasted pita, herbs, feta, and protein in one chopped salad.", "Toast pita at 350°F for 3–4 min; toss just before eating.", f.green), m("Freezer rescue bowl", ["freezer", "rice", "sauce"], "Frozen patty or meatballs with the final rice or potatoes and remaining sauce.", "Air-fry from frozen at 380°F for 11–12 min.", f.later)],
  ],
  components: [
    ["01", "Pesto turkey, two ways", "One mixture becomes patties and meatballs; freeze half raw.", ["8 portions", "air fryer"]],
    ["02", "Za’atar chickpea + cauli", "The crisp vegetarian anchor for pita, salad, or rice.", ["5 portions", "air fryer"]],
    ["03", "Harissa sweet potatoes", "A sturdy spicy-sweet side, base, or pita filling.", ["6 portions", "air fryer"]],
    ["04", "Golden raisin rice", "Works hot in bowls or cold as a Friday salad.", ["7 portions", "one pot"]],
    ["05", "Herbed yogurt–feta", "A drizzle, dip, and instant rice dressing.", ["10 portions", "blend"]],
  ],
  timeline: [
    ["0:00", "Start the slow things", "Cook rice with broth, raisins, and butter; preheat air fryer."],
    ["0:10", "Mix one protein base", "Mix turkey, pesto, sun-dried tomatoes, crumbs, salt, and pepper; shape patties and meatballs."],
    ["0:25", "Run two air-fryer batches", "Cook harissa sweet potatoes, then za’atar cauliflower and chickpeas."],
    ["0:45", "Cook four days of protein", "Air-fry half; freeze the later-week portions raw."],
    ["0:58", "Blend the sauce", "Blend yogurt, feta, tahini, lemon, garlic, oil, and herbs."],
    ["1:08", "Build the crunch kit", "Slice cabbage, cucumber, and tomatoes; keep dry."],
    ["1:20", "Cool, portion, label", "Refrigerate four days; freeze the rest with the prep date."],
  ],
  recipes: [
    ["Pesto–sun-dried turkey", "AIR FRY", "Mike’s pesto turkey burger mixture, split into two shapes.", ["2 lb ground turkey", "1 cup pesto", "¼ cup sun-dried tomatoes", "½ cup breadcrumbs", "salt + pepper"], ["Mix gently and shape 4 patties plus 12 meatballs.", "Air-fry at 380°F for 10–12 min to 165°F.", "Freeze uncooked extras in one layer, then bag."], 295],
    ["Za’atar chickpea + cauliflower", "AIR FRY", "A speed-adjusted version of Mike’s crisp tray.", ["2 cans chickpeas", "1 cauliflower", "2 tbsp za’atar", "1 tsp sumac", "3 tbsp olive oil"], ["Dry chickpeas; cut cauliflower small.", "Toss and air-fry in loose batches at 390°F for 15–18 min."], 122],
    ["Harissa sweet potatoes", "AIR FRY", "The sturdy vegetable component.", ["5 sweet potatoes", "⅓ cup harissa", "2 tbsp olive oil", "salt"], ["Cut into ¾-inch pieces and coat.", "Air-fry at 390°F for 18–22 min; shake twice."], 545],
    ["Golden raisin rice", "ONE POT", "Fragrant grain for hot and cold meals.", ["2 cups basmati rice", "2 cups broth", "1 cup water", "½ cup golden raisins", "3 tbsp butter"], ["Rinse, cook covered, rest 10 min, and fluff.", "Cool quickly before portioning."], 733],
    ["Herbed yogurt–feta", "BLEND", "One cool, acidic sauce for the entire week.", ["1 cup Greek yogurt", "¼ cup feta", "2 tbsp tahini", "2 lemons", "2 garlic cloves", "parsley + mint"], ["Blend smooth; stream in olive oil.", "Thin with water and season."], 837],
  ],
  shopping: [
    ["produce", "Cauliflower", "1 large", "large cauliflower"], ["produce", "Sweet potatoes", "5 large", "sweet potatoes"], ["produce", "English cucumber", "1", "English cucumber"], ["produce", "Cherry tomatoes", "1 pint", "cherry tomatoes"], ["produce", "Red cabbage", "1 small", "red cabbage"], ["produce", "Parsley", "1 bunch", "flat leaf parsley"], ["produce", "Mint", "1 bunch", "fresh mint"], ["produce", "Lemons", "3", "lemons"], ["produce", "Garlic", "1 head", "garlic"],
    ["fridge", "Ground turkey", "2 lb", "ground turkey 2 lb"], ["fridge", "Greek yogurt", "16 oz", "plain Greek yogurt"], ["fridge", "Feta", "8 oz", "feta cheese"], ["fridge", "Pesto", "6–8 oz", "basil pesto"], ["fridge", "Hummus", "16 oz", "classic hummus"],
    ["pantry", "Chickpeas", "2 cans", "canned chickpeas"], ["pantry", "Pita", "1 pack", "pita bread"], ["pantry", "Basmati rice", "16 oz", "basmati rice"], ["pantry", "Sun-dried tomatoes", "1 jar", "sun dried tomatoes"], ["pantry", "Harissa", "1 jar", "harissa paste"], ["pantry", "Golden raisins", "1 bag", "golden raisins"], ["pantry", "Breadcrumbs", "1 canister", "plain breadcrumbs"], ["pantry", "Tahini", "1 jar", "tahini"], ["pantry", "Za’atar + sumac", "1 each", "zaatar sumac"],
  ],
  sources: [{
    title: "The 14-Day Lunch System That Never Gets Boring", year: "2026", image: "/frames/week-one-meals-14-47.png",
    note: "Primary source for the shared flavor profile, flexible components, salad base, and sauce.", video,
    doc: "https://docs.google.com/document/d/1IFc2-IpskptjlD1AdKpjfxwOmUQKZ033iMwToDx2btI/edit",
    times: [["02:02",122],["04:55",295],["09:05",545],["14:47",887]],
  }],
  methodNote: "Mike’s 14-day lunch video supplies the component system. The beef toggle is a clearly labeled adaptation; the source uses turkey. Air-fryer finishes are used throughout to keep weekday cleanup low.",
};
