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
	"A Gentleman":"helcat",
	"Cassie":"ChicagoMemoria",
	"Numfar":"Mystic11",
	"Invisible Girl":"handsopen",
	"Watcher":"LarsP",
	"Loo":"GMLiddell",
	"Willow":"douchebag_karren",
	"Tara":"oreogasm",
	"Kendra":"mariah_a",
	"Rogue Demon Hunter":"Cincinnatiriot",
	"Anne":"nantes89",
	"Mustard Guy":"nbcaffeine",
	"The Mayor":"BigGreenYamo",
	"Inca Mummy Girl":"Tesatire",
	"Xander":"drew3000",
	"Quentin":"Liberal_Will",
	"Loan Shark":"Catalinahx",
	"The Judge":"V2Blast",
	"Olaf":"naljorpa108",
	"The Bunny":"ComingUpMilhouse",
	"Emily Dickens":"coffee_IV",
	"Gwendolyn's Glove":"peacockfeathers2",
	"Ben":"aslaveobeys",
	"SlayerFest 98":"ace-89",
	"Miss Kitty Fantastico":"redkoala",
	"Kennedy":"aagavin",
	"Tucker's Brother":"IzzySawicki",
	"The Big Bad":"WookieeWookiee",
	"Randy Giles":"ProfessorSomething",
	"Animal Cracker with Pants":"Pudie",
	"Angel":"Aiderak",
	"five by five":"robotzz",
	"Principal Flutie":"tedtutors",
	"Giles":"Kirby3",
	"I wear the cheese":"Wintertree",
	"White Hat":"MalevolentDragon",
	"Chao-Ahn":"EnigmaClan",
	"Veruca":"lost1alaskan",
	"Dracula":"a_sonic_screwdriver",
	"Richard Wilkins I":"wash42",
	"Faith":"clockworklycanthrope",
	"Halfrek":"RedWindmillQ",
	"Little Miss Muffet":"inmediasres_",
	"Overweight vamp who calls himself Lestat":"PaulDoe",
	"Mr. Pointy":"acedebaser",
	"Vi":"Psychosonic",
	"Harmony":"lobstahfi",
	"Illyria":"Sparky678348",
	"Sunday":"mezzit",
	"Manny the Manager":"Nixon74",
	"Nikki Wood":"joczie",
	"Anya":"alafolie29",
	"Chanterelle":"Lord_KermiT",
	"Gachnar":"avoidingusefulwork",
	"Demon Magnet":"PRIME96",
	"Whistler":"aroomacanvas",
	"Destructo Girl":"rainbowblight",
	"Spike":"bright_ephemera",
	"Lorne":"riqk",
	"Clem":"GTUD",
	"Joan":"gabdeslys",
	"Love's Bitch":"FrazzledTwinkleTart",
	"Kakistos":"Icecastle12",
	"Sweet":"leaffall",
	"Dingoes Ate My Baby":"Cajoled",
	"The Dark Master-bater":"Hepcat10",
	"The Slayer":"mandamoolah",
	"Just a friend of Xanderrr's":"gamb1t",
	"Oz":"fishundead",
	"Watchers Council":"listen2",
	"Darla":"Voldys_gone_mouldy",
	"Caleb":"coolbeaNs92",
	"Luke":"Dot_Matrix",
	"Kathy":"FigmentofImagination",
	"Foamy!":"dampierp",
	"Rack":"Desparia",
	"Miss Edith":"Becca5002",
	"The One Who Isn't Chosen":"YouJellyFish",
	"Prophecy Girl":"Ashton42",
	"Lovebot":"tsukemono",
	"Mr. Trick":"RadRhino",
	"Glory":"anyesuki",
	"The Bloody":"UnholyDemigod",
	"Evil Bunny":"WadePool",
	"Little Bit":"CommanderFemShep",
	"guy with the cheese":"PiperLenox",
	"Ethan Rayne":"fysu",
	"The First":"KindHeartsandCoronet",
	"Anointed One":"jbuie",
	"Tall, Dark, and Forehead":"bleuwillow",
	"Mr. Gordo":"Zemiakovy",
	"Ted":"hmousley",
	"Umad":"plushpikachu",
	"Bringer":"BadLittleBear",
	"The Brie Cat":"Tutenstein",
	"Not a Demon":"yedstar",
	"The Wiggins":"miss_salacious_crumb",
	"Grr, argh!":"oxymoronisanoxymoron",
	"Effulgent":"aithnemae",
	"A Gentleman":"k_m_w",
	"Dawn":"Sid_Arthur",
	"Cookie Dough":"2Clever4You",
	"Nighthawk":"TheDylanJacobson",
	"Insane Troll Logician":"theincrediblerug",
	"The Key":"brittafiltaperry",
	"Class Protector":"britta_perry",
	"Duchess of Buffonia":"sallowmoon",
	"of the Deathwok Clan":"twoforjoy",
	"Hostile 17":"outforawalk",
	"Cold-Blooded Jelly Doughnut":"CatRoulette",
	"Cordette":"mihoutao_xiangjiao",
	"Sineya":"sarah-bellum",
	"D'Hoffryn":"liltrixxy",
	"Niblit":"shesrightyouknow",
	"Desparate for a Shag Giles":"shaytom",
	"Out. For. A. Walk... Bitch.":"verifiedbatmanspenis",
	"Kinda Gay":"aliceinsunnydale",
	"Strawberry":"suddenly_awkward",
	"The Future Slayer":"xQoSx",
	"Fray":"snthomson",
	"Saga Vasuki":"GloryisBen",
	"7-3-0":"echofayth",
	"a demon":"ay",
	"hst 17":"ay"};



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
		r.push(Array(x, dice_coefficient(x, newflair), flairs[x]));
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

