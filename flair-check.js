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

function sort_sim(a, b) { return a.d < b.d ? -1 : (a.d > b.d ? 1 : 0); }
function sort_freq(a, b) { if (a.num_posts === 0 && b.num_posts > 0) { return -1 } else if (a.num_posts > 0 && b.num_posts === 0) { return 1 } return b.freq < a.freq ? -1 : (b.freq > a.freq ? 1 : 0); }
function sort_recent(a, b) { if (a.num_posts === 0 && b.num_posts > 0) { return -1 } else if (a.num_posts > 0 && b.num_posts === 0) { return 1 } return a.last_post < b.last_post ? -1 : (a.last_post > b.last_post ? 1 : 0); }
function sort_text(a, b) { return a.text.toLowerCase() < b.text.toLowerCase() ? 1 : (a.text.toLowerCase() > b.text.toLowerCase() ? -1 : 0); }
function sort_user(a, b) { return a.user.toLowerCase() < b.user.toLowerCase() ? 1 : (a.user.toLowerCase() > b.user.toLowerCase() ? -1 : 0); }

function sort_and_show(f, d) {
	f = typeof f !== "undefined" ? f : "sim";
	d = typeof d !== "undefined" ? d : true;
	r.sort(fields[f].func);
	if (d) { r.reverse(); }
	field = f;	//store in the global
	descending = d;

	rname = document.getElementById("rname").value;

	var s = "<table><tr>";
	for (k in fields) {
		s += "<td onclick='sort_and_show(\"" + k + "\", " + (k === f ? !d : true) + ")'>" + fields[k].t.replace("$rname", rname);
		if (k === f) { s += "&nbsp;&#x" + (d ? "25BE" : "25B4") + ";&nbsp;"; }	//▴▾
		s += "</td>";
	}
	s += "</tr>";
	for (x in r) {
		scolor = get_color(r[x].d, 0.3)
		s += "<tr style='background:#eee'><td style='background:#" + scolor + "'>" + (r[x].d*100).toFixed(0) + " %</td>";
		s += "<td style='background:#" + scolor + "'>" + r[x].text + "</td>";
		s += "<td><a href='http://reddit.com/user/" + r[x].user + "'>" + r[x].user + "</a></td>";
		s += "<td><a href='http://reddit.com/r/"+rname+"/about/flair/?name="+r[x].user+"'>[edit]</a></td>";
		if (r[x].num_posts === 0) {
	  		s += "<td style='background:#99f'>none in last 100 comments</td><td style='background:#99f'>less than once per " + timeago(r[x].freq);
		} else if (r[x].num_posts === -1) {
			s += "<td style='background:#ee0'>account deactivated</td><td style='background:#ee0'>";
		} else if (r[x].num_posts === -2) {
			s += "<td style='background:#99f'>user has no comments</td><td style='background:#ee0'>";
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
			if (flairs[rname][x]["num_posts"] < 0) {	//negative counts are error codes from flairgrabber
				freq = Infinity;
				flairs[rname][x]["last_post"] = 0;
			} else if (flairs[rname][x]["num_posts"] === 0) {
				freq = Math.floor(elapsed(flairs[rname][x]["first_post"]));
			} else {
				freq = Math.floor(elapsed(flairs[rname][x]["first_post"])/flairs[rname][x]["num_posts"]);
			}
			r.push({"text":flairs[rname][x]["text"], "d":d, "user":x, "num_posts":flairs[rname][x]["num_posts"], "last_post":flairs[rname][x]["last_post"], "first_post":flairs[rname][x]["first_post"], "freq":freq});
		}
	}
	sort_and_show(field, descending);
}

function onload() {
	var get_vars = {};
	v = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
	for (x in v) {
		y = v[x].split("=");
		get_vars[y[0]] = y[1];
	}

	var rname = document.getElementById("rname");

	var max_num = 0, max_r;
	if (!("rname" in get_vars)) {
		for (var r in flairs) {
			var count = Object.keys(flairs[r]).length;
			if (count > max_num) {
				max_num = count;
				max_r = r;
			}
		}
	}

	var keys = Object.keys(flairs);
	for (var r in keys.sort()) {
		opt = document.createElement("option");
		opt.text = keys[r];
		if ("rname" in get_vars) {
			if (keys[r] === get_vars.rname) { opt.selected = true; }
		} else {
			if (keys[r] === max_r) { opt.selected = true; }
		}
		rname.add(opt, null);
	}

	var agespan = document.getElementById("age_span");
	secs = (new Date()).getTime()/1000 - flairtime
	agespan.innerHTML = "Data updated " + timeago(secs) + " ago";

	fields = {"sim":{"func":sort_sim, "t":"similarity"},
		"text":{"func":sort_text, "t":"flair text"},
		"user":{"func":sort_user, "t":"user"},
		"edit":{"func":null, "t":"edit"},
		"recent":{"func":sort_recent, "t":"last /r/$rname post"},
		"freq":{"func":sort_freq, "t":"/r/$rname post frequency"}}

	field = undefined;	//global
	descending = true;	//global
	if ("showall" in get_vars) { document.getElementById("show_all").checked = true; }
	if ("text" in get_vars) { document.getElementById("newflair").value = get_vars.text; }
	if ("sort" in get_vars) { field = get_vars.sort }
	if ("reverse" in get_vars) { descending = false }
	if ("text" in get_vars || "showall" in get_vars) { go(); }
}
