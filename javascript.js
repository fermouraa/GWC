var ourLoc;
var view;
var map;

function init() {

	ourLoc = ol.proj.fromLonLat([41.043316, 28.862457]);

	view = new ol.View({
		center: ourLoc,
		zoom: 6
	});

	map = new ol.Map({
		target: 'map',
		layers: [
		  new ol.layer.Tile({
		    source: new ol.source.OSM()
		  })
		],
		
		loadTilesWhileAnimating: true,
		view: view
	});
}

function panHome() {
	view.animate({
		center: ourLoc, // "Home" Location
		duration: 2000  // Two seconds
	});
}


function makeCountryRequest() {
	var countryName = document.getElementById("country-name").value;

	if(countryName === "") {
	 	alert("You didn't enter a country name!");
	 	return;
	}

	var query = "https://restcountries.eu/rest/v2/name/"+countryName+"?fullText=true"

	query = query.replace(/ /g, "%20")

	countryRequest = new XMLHttpRequest();

	// Step 1: Switch this last condition to TRUE
	// This changes the call from synchronous to
	// an asynchronous call.
	countryRequest.open('GET', query, true);

	// Step 2: Add an onload function to process
	// what happens when we send the HTTP Request.
	countryRequest.onload = processCountryRequest

	countryRequest.send();
}

function processCountryRequest() {


	if(countryRequest.readyState != 4) {
		return;
	}

	if (countryRequest.status != 200 || countryRequest.responseText === "") {
	 	alert("We were unable to find your requested country!");
	 	return;
	}


	var countryInformation = JSON.parse(countryRequest.responseText);
	var lon = countryInformation[0].latlng[1];
	var lat = countryInformation[0].latlng[0];

	
	var location = ol.proj.fromLonLat([lon, lat]);



	view.animate({
		center: location, // Location
		duration: 2000  // Two seconds
	});
}

window.onload = init
