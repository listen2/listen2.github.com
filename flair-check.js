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

function timeago(sec) {
	n = Math.floor(sec / 31536000)
	if (n) { return n + " year" + (n > 1 ? "s" : "") }
	n = Math.floor(sec / 2592000)
	if (n) { return n + " month" + (n > 1 ? "s" : "") }
	n = Math.floor(sec / 86400)
	if (n) { return n + " day" + (n > 1 ? "s" : "") }
	n = Math.floor(sec / 3600)
	if (n) { return n + " hour" + (n > 1 ? "s" : "") }
	n = Math.floor(sec / 60)
	if (n) { return n + " minute" + (n > 1 ? "s" : "") }
	return sec + " second" + (sec > 1 ? "s" : "")
}

function nowago(sec) {
	return timeago(elapsed(sec));
}

function elapsed(sec) {
	var dt = new Date();
	return dt.getTime()/1000 + dt.getTimezoneOffset()*60 - sec;
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

function sort_sim(a, b) { return a.d < b.d ? 1 : (a.d > b.d ? -1 : 0); }
function sort_freq(a, b) { return a.freq < b.freq ? 1 : (a.freq > b.freq ? -1 : 0); }
function sort_freq_r(a, b) { return b.freq < a.freq ? 1 : (b.freq > a.freq ? -1 : 0); }
function sort_recent(a, b) { return a.last_post < b.last_post ? 1 : (a.last_post > b.last_post ? -1 : 0); }
function sort_recent_r(a, b) { return b.last_post < a.last_post ? 1 : (b.last_post > a.last_post ? -1 : 0); }

function sort_and_show(sfunc) {
	sfunc = typeof sfunc !== "undefined" ? sfunc : sort_sim;
	r.sort(sfunc);

	var s = "<table><tr><td onclick='sort_and_show(sort_sim)'>similarity</td><td>flair text</td><td>user</td><td onclick='sort_and_show(sort_recent)'>last /r/"+rname+" post</td><td onclick='sort_and_show(sort_freq_r)'>/r/"+rname+" post frequency</td></tr>";
	for (x in r) {
		scolor = get_color(r[x].d, 0.3)
		s += "<tr style='background:#eee'><td style='background:#" + scolor + "'>" + (r[x].d*100).toFixed(0) + " %</td><td style='background:#" + scolor + "'>" + r[x].text + "</td><td><a href='http://reddit.com/user/" + r[x].user + "'>" + r[x].user + "</a></td>";
		if (r[x].num_posts === 0) {
			s += "<td style='background:#99f'>none in last 100 comments</td><td style='background:#99f'>";
		} else if (r[x].num_posts === -1) {
			s += "<td style='background:#99f'>error checking comments</td><td style='background:#99f'>";
		} else {
	  		s += "<td style='background:#" + get_color(elapsed(r[x].last_post) / 7776000, 0.6) + "'>" + nowago(r[x].last_post) + " ago</td><td style='background:#" + get_color(r[x].freq / 5184000, 0.5) + "'>once every " + timeago(r[x].freq) /*+ " (over the last " + nowago(r[x].first_post) + ")"*/;
		}
		s += "</td></tr>";
	}
	s += "</table>";

	var out = document.getElementById("out");
	out.innerHTML = s;
}

function go() {
	var newflair = document.getElementById("newflair").value;
	var show_all = document.getElementById("show_all");
	rname = document.getElementById("rname").value;

	var len_div = document.getElementById("len_span");
	len_span.innerHTML = newflair.length + "/42 characters";
	len_span.style.background = "#"+get_color(newflair.length/42, 0.6)

	//r = [Array(a, dice_coefficient(a, newflair)) for each (a in flairs[rname])];
	r = Array();	//global
	for (var x in flairs[rname]) {
		var d = dice_coefficient(flairs[rname][x]["text"], newflair);
		if (show_all.checked || d !== 0) {
			if (flairs[rname][x]["num_posts"] === -1) {
				freq = Infinity;
				flairs[rname][x]["last_post"] = 0;
			} else {
				freq = Math.floor(elapsed(flairs[rname][x]["first_post"])/flairs[rname][x]["num_posts"]);
			}
			r.push({"text":flairs[rname][x]["text"], "d":d, "user":x, "num_posts":flairs[rname][x]["num_posts"], "last_post":flairs[rname][x]["last_post"], "first_post":flairs[rname][x]["first_post"], "freq":freq});
		}
	}
	sort_and_show();
}

function onload() {
	var select = document.getElementById("rname");

	var max_num = 0, max_r;
	for (var r in flairs) {
		var count = Object.keys(flairs[r]).length;
		if (count > max_num) {
			max_num = count;
			max_r = r;
		}
	}

	var keys = Object.keys(flairs);
	for (var r in keys.sort()) {
		opt = document.createElement("option");
		opt.text = keys[r];
		if (keys[r] === max_r) {
			opt.selected = true;
		}
		select.add(opt, null);
	}

	var agespan = document.getElementById("age_span");
	agespan.innerHTML = flairtime;
}
