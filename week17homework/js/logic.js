var starttime = {
    'one':'2009-01-01',
    'two':'2013-01-01',
    'three':'2016-01-01'
}
var endtime = {
    'one':'2012-12-31',
    'two':'2015-12-31',
    'three':'2019-02-05'
}
var minmagnitude = 6
var queryUrl = `http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime.one}&endtime=${endtime.one}` +
`&minmagnitude=${minmagnitude}`;
console.log(queryUrl)
d3.json(queryUrl, function(error, urlData) {
  if (error) {
    console.log("error")
  }
  console.log(urlData)
  // Once we get a response, send the data.features object to the createFeatures function
  d3.json('/js/data.json', function(plateData) {
  	createFeatures(urlData.features, plateData.features, plateData.features2);
  	d3.select('#submit').on('click', function() {
  	  console.log('submit')
  	  var start = d3.select('#startdate').node().value
  	  var end = d3.select('#enddate').node().value
  	  var minmagnitude = d3.select('#minmag').node().value
  	  var maxmagnitude = d3.select('#maxmag').node().value    
  	  var queryUrl = `http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${start}&endtime=${end}` +
  	                `&minmagnitude=${minmagnitude}&maxmagnitude=${maxmagnitude}`;
  		d3.json(queryUrl, function(error, urlData) {
  		  if (error) {
  	    console.log("error")
  		  }
  		  console.log(`start: ${start}`)
  		  map.remove()
  		  d3.select('body').append('div').attr('id', 'map')
  		  d3.json('/js/data.json', function(plateData) {
  		    console.log(plateData)
  		    createFeatures(urlData.features, plateData.features, plateData.features2) 
  		  }) 
  		})
  	})
  })
});
function createFeatures(earthquakeData, plateData, plateData2) {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.on({
      click: function(e) {
        console.log(e.latlng)
      }
    })
    layer.bindPopup("<h3>" + feature.properties.place + "</h3><a id='coords' href='#' onclick='clickZoom()'>[" + feature.geometry.coordinates[0] + ", " + feature.geometry.coordinates[1] +
    "]</a><hr><p>" + new Date(feature.properties.time) + "</p>" +
      "<hr><h3>Magnitude: " + feature.properties.mag +  " | " + "Signficance: " + feature.properties.sig + "</h3>");
  }
  function getSigColor(significance) {
    if (significance <= 650) {return "rgb(134, 201, 121)"} else
    if (significance <= 800) {return "rgb(47, 201, 91)"} else
    if (significance <= 950) {return "rgb(54, 232, 0)"} else
    if (significance <= 1100) {return "rgb(205, 183, 75)"} else
    if (significance <= 1250) {return "rgb(218, 183, 40)"} else
    if (significance <= 1400) {return "rgb(255, 199, 19)"} else
    if (significance <= 1550) {return "rgb(205, 82, 71)"} else
    if (significance <= 1700) {return "rgb(221, 54, 58)"} else
    if (significance <= 3000) {return "rgb(233, 22, 18)"} 
  }
  function getMagColor(magnitude) {
    if (magnitude <= 6.3) {return "rgb(134, 201, 121)"} else
    if (magnitude <= 6.6) {return "rgb(47, 201, 91)"} else
    if (magnitude <= 6.9) {return "rgb(54, 232, 0)"} else
    if (magnitude <= 7.3) {return "rgb(205, 183, 75)"} else
    if (magnitude <= 7.6) {return "rgb(218, 183, 40)"} else
    if (magnitude <= 7.9) {return "rgb(255, 199, 19)"} else
    if (magnitude <= 8.3) {return "rgb(205, 82, 71)"} else
    if (magnitude <= 8.6) {return "rgb(221, 54, 58)"} else
    if (magnitude <= 9) {return "rgb(233, 22, 18)"} 
  }
  function getMagRadius(magnitude) {
    if (magnitude <= 6.3) {return 4} else
    if (magnitude <= 6.6) {return 6} else
    if (magnitude <= 6.9) {return 8} else
    if (magnitude <= 7.3) {return 10} else
    if (magnitude <= 7.6) {return 12} else
    if (magnitude <= 7.9) {return 14} else
    if (magnitude <= 8.3) {return 16} else
    if (magnitude <= 8.6) {return 18} else
    if (magnitude <= 9) {return 20} 
  }
  function geojsonMarkerOptions(feature) {
    var geojsonMarkerOptions = {
      "radius": getMagRadius(feature.properties.mag),
      "fillColor": getSigColor(feature.properties.sig),
      "color": getMagColor(feature.properties.mag),
      "weight": 0,
      "opacity": 1,
      "fillOpacity": 0.5    
    }
    return geojsonMarkerOptions
  }
  function pointToLayer(feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions(feature));
  }
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature
  });
  function janFilt(feature) {
    var month = String(new Date(feature.properties.time)).slice(4,7)
    return month === 'Jan';
  }
  var january = L.geoJson(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature,
    filter: janFilt
  })
  function febFilt(feature) {
    var month = String(new Date(feature.properties.time)).slice(4,7)
    return month === 'Feb';
  }
  var february = L.geoJson(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature,
    filter: febFilt
  })
  function marFilt(feature) {
    var month = String(new Date(feature.properties.time)).slice(4,7)
    return month === 'Mar';
  }
  var march = L.geoJson(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature,
    filter: marFilt
  })
  function aprFilt(feature) {
    var month = String(new Date(feature.properties.time)).slice(4,7)
    return month === 'Apr';
  }
  var april = L.geoJson(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature,
    filter: aprFilt
  })
  function mayFilt(feature) {
    var month = String(new Date(feature.properties.time)).slice(4,7)
    return month === 'May';
  }
  var may = L.geoJson(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature,
    filter: mayFilt
  })
  function junFilt(feature) {
    var month = String(new Date(feature.properties.time)).slice(4,7)
    return month === 'Jun';
  }
  var june = L.geoJson(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature,
    filter: junFilt
  })
  function julFilt(feature) {
    var month = String(new Date(feature.properties.time)).slice(4,7)
    return month === 'Jul';
  }
  var july = L.geoJson(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature,
    filter: julFilt
  })
  function augFilt(feature) {
    var month = String(new Date(feature.properties.time)).slice(4,7)
    return month === 'Aug';
  }
  var august = L.geoJson(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature,
    filter: augFilt
  })
  function sepFilt(feature) {
    var month = String(new Date(feature.properties.time)).slice(4,7)
    return month === 'Sep';
  }
  var september = L.geoJson(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature,
    filter: sepFilt
  })
  function octFilt(feature) {
    var month = String(new Date(feature.properties.time)).slice(4,7)
    return month === 'Oct';
  }
  var october = L.geoJson(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature,
    filter: octFilt
  })
  function novFilt(feature) {
    var month = String(new Date(feature.properties.time)).slice(4,7)
    return month === 'Nov';
  }
  var november = L.geoJson(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature,
    filter: novFilt
  })
  function decFilt(feature) {
    var month = String(new Date(feature.properties.time)).slice(4,7)
    return month === 'Dec';
  }
  var december = L.geoJson(earthquakeData, {
    pointToLayer: pointToLayer,
    onEachFeature: onEachFeature,
    filter: decFilt
  })
  var plates = L.geoJson(plateData, {
    style: function(feature) {
      return {
        color: "red",
        weight: 1.5
      };
    },
  })
  var boundaries = L.geoJson(plateData2, {
    style: function(feature) {
      return {
        color: "orange",
        weight: 1.5
      };
    },
  })
  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes, plates, boundaries, january, february, march, april, may, june, july, august, september, october, november, december);
}
function createMap(earthquakes, plates, boundaries, january, february, march, april, may, june, july, august, september, october, november, december) {
  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  var satstreetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-satellite",
    accessToken: API_KEY
  });
  var piratemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.pirates",
    accessToken: API_KEY
  });
  var bikemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.run-bike-hike",
    accessToken: API_KEY
  });
  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Satellite Street Map": satstreetmap,
    "Pirate Map": piratemap,
    "Run Bike Hike Map": bikemap,
  };
  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "All Earthquakes": earthquakes,
    "Tectonic Plates": plates,
    "Tectonic Plate Boundaries": boundaries,
    "January": january,
    "February": february,
    "March": march,
    "April": april,
    "May": may,
    "June": june,
    "July": july,
    "August": august,
    "September": september,
    "October": october,
    "November": november,
    "December": december
  };
  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 2,
    layers: [streetmap, earthquakes, boundaries]
  });
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(myMap);
  var form = L.control({
    position: "topleft"
  });
  var search = L.easyButton({
    states: [{
      stateName: 'show-search',
      icon: 'fa-search',
      title: 'New query and redraw map',
      onClick: function(control) {
        form.addTo(myMap);
        control.state('collapse-search');
      }
    }, {
			stateName: 'collapse-search',
			icon: 'fa-compress',
      onClick: function(control) {
        form.remove()
        control.state('show-search');
      },
      title: 'Collapse search box'
    }]
  });
  search.addTo(myMap);
  // When the layer control is added, insert a div with the class of "form"
  form.onAdd = function() {
    var div = L.DomUtil.create("div", "form");
    var today = String(new Date().toLocaleDateString('en-US')).split('/')
    today = [today[2], today[0], today[1]].join('-')
    div.innerHTML = `
    <label for="startdate">Enter a Start Date</label>
    <input class="form-control" id="startdate" type="text" placeholder="1905-07-09" aria-label="Enter YYYY/MM/DD to define start date">
    <br>
    <label for="enddate">Enter an End Date</label>
    <input class="form-control" id="enddate" type="text" placeholder="${today}" aria-label="Enter YYYY/MM/DD to define end date">
    <br>
    <label for="minmag">Enter Minimum Magnitude</label>
    <input class="form-control" id="minmag" type="text" placeholder="6.0" aria-label="Enter decimal between 0 and 9 to define minimum magnitude">
    <br>
    <label for="maxmag">Enter Maximum Magnitude</label>
    <input class="form-control" id="maxmag" type="text" placeholder="9.0" aria-label="Enter decimal between 0 and 9 to define maximum magnitude">
    <br>
    <label for="minsig">Enter Minimum Significance</label>
    <input class="form-control" id="minsig" type="text" placeholder="0" aria-label="Enter integer between 0 and 2910 to define minimum significance">
    <br>
    <label for="maxsig">Enter Maximum Significance</label>
    <input class="form-control" id="maxsig" type="text" placeholder="2910" aria-label="Enter decimal between 0 and 2910 to define maximum significance">
    <br>
		<button id="submitMap" type="submit" class="btn btn-default" onclick="redrawMap()"><a href="table.html" target="_blank">Redraw Map and Launch Table in New Window</a></button>`
		// <button id="submitTable" type="submit" class="btn btn-default><a id="tableLink" href="table.html" target="_blank">Open Table in New Window</a></button>
		// <button id="submitTable" type="submit" class="btn btn-default" onclick="redrawTable(queryUrl)"><a id="tableLink" href="table.html" target="_blank">Open Table in New Window</a></button>
    
    return div;
  }
  var legend = L.control({
    position: "bottomright",
    collapsed: true
  });
  // When the layer control is added, insert a div with the class of "form"
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML = `
    <table>
    <thead><tr><th>Magnitude</th><th class="color-col">Color</th><th>Significance</th></tr></thead>
    <tbody>
      <tr><td>up to 6.3</td><td class="color-col col-col" style="background-color: rgb(134, 201, 121)"></td><td>up to 650</td></tr>
      <tr><td>up to 6.6</td><td class="color-col col-col" style="background-color: rgb(47, 201, 91)"></td><td>up to 800</td></tr>
      <tr><td>up to 7.0</td><td class="color-col col-col" style="background-color: rgb(54, 232, 0)"></td><td>up to 950</td></tr>
      <tr><td>up to 7.3</td><td class="color-col col-col" style="background-color: rgb(205, 183, 75)"></td><td>up to 1100</td></tr>
      <tr><td>up to 7.6</td><td class="color-col col-col" style="background-color: rgb(218, 183, 40)"></td><td>up to 1250</td></tr>
      <tr><td>up to 7.9</td><td class="color-col col-col" style="background-color: rgb(255, 199, 19)"></td><td>up to 140</td></tr>
      <tr><td>up to 8.3</td><td class="color-col col-col" style="background-color: rgb(205, 82, 71)"></td><td>up to 1550</td></tr>
      <tr><td>up to 8.6</td><td class="color-col col-col" style="background-color: rgb(221, 54, 58)"></td><td>up to 1700</td></tr>
      <tr><td>up to 9</td><td class="color-col col-col" style="background-color: rgb(233, 22, 18)"></td><td>up to 3000</td></tr>
      <tr><th>Circumference</th><th class="color-col"></th><th>Fill Color</th></tr>
    </tbody>
    </table>    
    `
    return div;
  };
  // Add the info legend to the map
  var legendButton = L.easyButton({
    position: 'topright',
    states: [{
      stateName: 'show-legend',
      icon: 'fa-table',
      title: 'Show Legend',
      onClick: function(control) {
        control.state('collapse-legend');
        legend.addTo(myMap);
      }
    }, {
			stateName: 'collapse-legend',
			icon: 'fa-compress',
      onClick: function(control) {
        legend.remove()
        control.state('show-legend');
      },
      title: 'Collapse Legend'
    }]
  });
  legendButton.addTo(myMap);
}
function redrawMap() {
  var start = d3.select('#startdate').node().value
  var end = d3.select('#enddate').node().value
  var minmagnitude = d3.select('#minmag').node().value
  var maxmagnitude = d3.select('#maxmag').node().value
  var minsignificance = d3.select('#minsig').node().value
  var maxsignificance = d3.select('#maxsig').node().value
  var queryUrl = `http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${start}&endtime=${end}` +
                `&minmagnitude=${minmagnitude}&maxmagnitude=${maxmagnitude}&minsig=${minsignificance}&maxsig=${maxsignificance}`;
  localStorage.setItem('formUrl', queryUrl)
  d3.json(queryUrl, function(error, urlData) {
    if (error) {
      console.log("error")
    }
    console.log(queryUrl)
    // Once we get a response, send the data.features object to the createFeatures function
    d3.json('/js/data.json', function(plateData) {
      map.remove()
			d3.select('body').append('div').attr('id', 'map')
			createFeatures(urlData.features, plateData.features, plateData.features2);			
    })
  })
}
function redrawTable() {
	console.log(queryUrl)
	var start = d3.select('#startdate').node().value
	var end = d3.select('#enddate').node().value
	var minmagnitude = d3.select('#minmag').node().value
	var maxmagnitude = d3.select('#maxmag').node().value
	var queryUrl = `http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${start}&endtime=${end}` +
								`&minmagnitude=${minmagnitude}&maxmagnitude=${maxmagnitude}`;	
	console.log(queryUrl)
  d3.json(queryUrl, function(error, urlData) {
    if (error) {
      console.log("error")
		}
		drawTable(queryUrl)
    console.log(queryUrl)
  })
}

