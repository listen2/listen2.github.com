function dice_coefficient(string1, string2) {
	string1 = string1.toLowerCase()
	string2 = string2.toLowerCase()
	var intersection = 0;
	var length1 = string1.length - 1;
	var length2 = string2.length - 1;
	if(length1 < 1 || length2 < 1) return 0;
	var bigrams2 = [];
	for(var i = 0; i < length2; i++) {
		bigrams2.push(string2.substr(i,2));
	}
	for(var i = 0; i < length1; i++) {
		var bigram1 = string1.substr(i, 2);
		for(var j = 0; j < length2; j++) {
			if(bigram1 == bigrams2[j]) {
				intersection++;
				bigrams2[j] = null;
				break;
	}}}
	return (2.0 * intersection) / (length1 + length2);  
}

flairs = {
	"helcat":"A Gentleman",
	"ChicagoMemoria":"Cassie",
	"Mystic11":"Numfar",
	"handsopen":"Invisible Girl",
	"LarsP":"Watcher",
	"GMLiddell":"Loo",
	"douchebag_karren":"Willow",
	"oreogasm":"Tara",
	"mariah_a":"Kendra",
	"Cincinnatiriot":"Rogue Demon Hunter",
	"nantes89":"Anne",
	"nbcaffeine":"Mustard Guy",
	"BigGreenYamo":"The Mayor",
	"Tesatire":"Inca Mummy Girl",
	"drew3000":"Xander",
	"Liberal_Will":"Quentin",
	"Catalinahx":"Loan Shark",
	"V2Blast":"The Judge",
	"naljorpa108":"Olaf",
	"ComingUpMilhouse":"The Bunny",
	"coffee_IV":"Emily Dickens",
	"peacockfeathers2":"Gwendolyn's Glove",
	"aslaveobeys":"Ben",
	"ace-89":"SlayerFest 98",
	"redkoala":"Miss Kitty Fantastico",
	"aagavin":"Kennedy",
	"IzzySawicki":"Tucker's Brother",
	"WookieeWookiee":"The Big Bad",
	"ProfessorSomething":"Randy Giles",
	"Pudie":"Animal Cracker with Pants",
	"Aiderak":"Angel",
	"robotzz":"five by five",
	"tedtutors":"Principal Flutie",
	"Kirby3":"Giles",
	"Wintertree":"I wear the cheese",
	"MalevolentDragon":"White Hat",
	"EnigmaClan":"Chao-Ahn",
	"lost1alaskan":"Veruca",
	"a_sonic_screwdriver":"Dracula",
	"wash42":"Richard Wilkins I",
	"clockworklycanthrope":"Faith",
	"RedWindmillQ":"Halfrek",
	"inmediasres_":"Little Miss Muffet",
	"PaulDoe":"Overweight vamp who calls himself Lestat",
	"acedebaser":"Mr. Pointy",
	"Psychosonic":"Vi",
	"lobstahfi":"Harmony",
	"Sparky678348":"Illyria",
	"mezzit":"Sunday",
	"Nixon74":"Manny the Manager",
	"joczie":"Nikki Wood",
	"alafolie29":"Anya",
	"Lord_KermiT":"Chanterelle",
	"avoidingusefulwork":"Gachnar",
	"PRIME96":"Demon Magnet",
	"aroomacanvas":"Whistler",
	"rainbowblight":"Destructo Girl",
	"bright_ephemera":"Spike",
	"riqk":"Lorne",
	"GTUD":"Clem",
	"gabdeslys":"Joan",
	"FrazzledTwinkleTart":"Love's Bitch",
	"Icecastle12":"Kakistos",
	"leaffall":"Sweet",
	"Cajoled":"Dingoes Ate My Baby",
	"Hepcat10":"The Dark Master-bater",
	"mandamoolah":"The Slayer",
	"gamb1t":"Just a friend of Xanderrr's",
	"fishundead":"Oz",
	"listen2":"Watchers Council",
	"Voldys_gone_mouldy":"Darla",
	"coolbeaNs92":"Caleb",
	"Dot_Matrix":"Luke",
	"FigmentofImagination":"Kathy",
	"dampierp":"Foamy!",
	"Desparia":"Rack",
	"Becca5002":"Miss Edith",
	"YouJellyFish":"The One Who Isn't Chosen",
	"Ashton42":"Prophecy Girl",
	"tsukemono":"Lovebot",
	"RadRhino":"Mr. Trick",
	"anyesuki":"Glory",
	"UnholyDemigod":"The Bloody",
	"WadePool":"Evil Bunny",
	"CommanderFemShep":"Little Bit",
	"PiperLenox":"guy with the cheese",
	"fysu":"Ethan Rayne",
	"KindHeartsandCoronet":"The First",
	"jbuie":"Anointed One",
	"bleuwillow":"Tall, Dark, and Forehead",
	"Zemiakovy":"Mr. Gordo",
	"hmousley":"Ted",
	"plushpikachu":"Umad",
	"BadLittleBear":"Bringer",
	"Tutenstein":"The Brie Cat",
	"yedstar":"Not a Demon",
	"miss_salacious_crumb":"The Wiggins",
	"oxymoronisanoxymoron":"Grr, argh!",
	"aithnemae":"Effulgent",
	"k_m_w":"A Gentleman",
	"Sid_Arthur":"Dawn",
	"2Clever4You":"Cookie Dough",
	"TheDylanJacobson":"Nighthawk",
	"theincrediblerug":"Insane Troll Logician",
	"brittafiltaperry":"The Key",
	"britta_perry":"Class Protector",
	"sallowmoon":"Duchess of Buffonia",
	"twoforjoy":"of the Deathwok Clan",
	"outforawalk":"Hostile 17",
	"CatRoulette":"Cold-Blooded Jelly Doughnut",
	"mihoutao_xiangjiao":"Cordette",
	"sarah-bellum":"Sineya",
	"liltrixxy":"D'Hoffryn",
	"shesrightyouknow":"Niblit",
	"shaytom":"Desparate for a Shag Giles",
	"verifiedbatmanspenis":"Out. For. A. Walk... Bitch.",
	"aliceinsunnydale":"Kinda Gay",
	"suddenly_awkward":"Strawberry",
	"xQoSx":"The Future Slayer",
	"snthomson":"Fray",
	"GloryisBen":"Saga Vasuki",
	"echofayth":"7-3-0"};



function get_color(d) {
	thresh = 0.3
	if (d > thresh) {
		d = Math.floor((1 - (d - thresh)/(1 - thresh)) * 255);
		return "ff" + ("00" + d.toString(16)).slice(-2) + ("00" + d.toString(16)).slice(-2);
	} else if (d < thresh) {
		d = Math.floor(d/thresh * 255);
		return ("00" + d.toString(16)).slice(-2) + "ff" + ("00" + d.toString(16)).slice(-2);
	} else {
		return "ffffff";
	}
}



function go() {
	newflair = document.getElementById("newflair").value;
	out = document.getElementById("out");
	//r = [Array(a, dice_coefficient(a, newflair)) for each (a in flairs)];
	r = Array();
	for (x in flairs) {
		r.push(Array(flairs[x], dice_coefficient(flairs[x], newflair), x));
	}
	r.sort(function(a, b) { return a[1] < b[1] ? 1 : (a[1] > b[1] ? -1 : 0); });

	s = "<table>";
	for (x in r) {
		if (r[x][1] !== 0) {
			s += "<tr style='background:#" + get_color(r[x][1]) + "'><td>" + r[x][1].toFixed(2) + "</td><td>" + r[x][0] + "</td><td>" + r[x][2] + "</td></tr>";
		}
	}
	s += "</table>";
	out.innerHTML = s;
}

