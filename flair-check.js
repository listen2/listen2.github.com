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

function get_color(d, thresh) {
	d = Math.min(d, 1.0);
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
	var newflair = document.getElementById("newflair").value;
	var out = document.getElementById("out");

	var len_div = document.getElementById("len_span");
	len_span.innerHTML = newflair.length + "/42 characters";
	len_span.style.background = "#"+get_color(newflair.length/42, 0.6)

	//r = [Array(a, dice_coefficient(a, newflair)) for each (a in flairs)];
	var r = Array();
	for (var x in flairs) {
		var d = dice_coefficient(flairs[x], newflair);
		if (d !== 0) {
			r.push(Array(flairs[x], d, x));
		}
	}
	r.sort(function(a, b) { return a[1] < b[1] ? 1 : (a[1] > b[1] ? -1 : 0); });

	var s = "<table>";
	for (x in r) {
		s += "<tr style='background:#" + get_color(r[x][1], 0.3) + "'><td>" + r[x][1].toFixed(2) + "</td><td>" + r[x][0] + "</td><td><a href='http://reddit.com/user/" + r[x][2] + "'>" + r[x][2] + "</a></td></tr>";
	}
	s += "</table>";
	out.innerHTML = s;
}

