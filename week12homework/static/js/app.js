var ufos = data;

data.filter(x => x.durationMinutes.toString().includes('second') || x.durationMinutes.toString().includes('sec')).map(x => x['timeBin'] = "1: Seconds");
data.filter(x => x.durationMinutes.toString().includes('minute') || x.durationMinutes.toString().includes('min')).map(x => x['timeBin'] = "2: Minutes");
data.filter(x => x.durationMinutes.toString().includes('hour')).map(x => x['timeBin'] = "3: Hours");
data.filter(x => !x.durationMinutes.toString().includes('hour') && !x.durationMinutes.toString().includes('minute') && !x.durationMinutes.toString().includes('min') && !x.durationMinutes.toString().includes('second') && !x.durationMinutes.toString().includes('sec')).map(x => x['timeBin'] = "4: Rest");

var tabl = d3.select('table');
var tbody = d3.select('tbody');
var thead = d3.select('thead');
var submit = d3.select('#filter-btn')

var shapes = data.map(x => x.shape);
var shapeSet = new Set(shapes);
var shapeArr = [...shapeSet]
shapeArr.forEach(x => {
    d3.select('#shapeSelect').append('option').text(x);
})

var states = data.map(x => x.state);
var stateSet = new Set(states);
var stateArr = [...stateSet]
stateArr.forEach(x => {
    d3.select('#stateSelect').append('option').text(x);
})

var cities = data.map(x => x.city);
var citySet = new Set(cities);
var cityArr = [...citySet]
var citySorted = cityArr.sort((a,b) => a > b ? 1 : a === b ? 0 : -1);
//var sorted = cityArr.sort((a,b) => a.localeCompare(b));
citySorted.forEach(x => {
    d3.select('#citySelect').append('option').text(x);
})

var bins = data.map(x => x.timeBin);
var binSet = new Set(bins);
var binArr = [...binSet]
var binSorted = binArr.sort((a,b) => a > b ? 1 : a === b ? 0 : -1);
binSorted.forEach(x => {
    d3.select('#binSelect').append('option').text(x);
})

submit.on("click", function() {
    d3.event.preventDefault();
    var dateElement = d3.select("#datetime");
    var dateValue = dateElement.property("value").replace(/\s+/g, "").replace(/\/0/, "/");
    console.log(`dateValue: ${dateValue}`);
    var dateFilterF = function(dateValue) {
        if (dateValue === "") {
            return ufos;
        } else {
            return ufos.filter(x => x.datetime === dateValue);
        }
    }
    var dateFilter = dateFilterF(dateValue);
    console.log(`dateFilter: `);
    console.log(dateFilter);
    // var countryElement = [...document.forms[0].elements.countrySelect]
    // var countryElement = countryElement.filter(x => x.checked);
    // var countryValue = countryElement[0].labels[0].innerText;
    var countryValue = document.querySelector('input[name = "countrySelect"]:checked').labels[0].innerText;
    var countryFilterF = function(countryValue) {
        if (countryValue === "All Countries") {
            return ufos;
        } else if (countryValue === "United States") {
            return ufos.filter(x => x.country === 'us');
        } else {
            return ufos.filter(x => x.country === 'ca');;
        }
    }
    var countryFilter = countryFilterF(countryValue);
    console.log(`countryFilter: `);
    console.log(countryFilter);
    var shapeValue = d3.select("#shapeSelect").selectAll("option").filter(function(){return this.selected});
    console.log(`shapeValue: `)
    console.log(shapeValue)
    var shapeValArr = shapeValue._groups[0].map(x => x.value)
    //var shapeValArr = d3.select('#shapeSelect').selectAll('options:checked')
    console.log(`shapeValArr: `);
    console.log(shapeValArr);
    var shapeFilterF = function(shapeValArr) {
        if (shapeValArr.length === 0) {
            return ufos;
        } else {
            return data.filter(ufo => shapeValArr.reduce((a,b) => a || b === ufo.shape, false));
        }
    }
    var shapeFilter = shapeFilterF(shapeValArr)
    console.log(`shapeFilter: `);
    console.log(shapeFilter);
    
    var cityValue = d3.select('#citySelect').selectAll("option").filter(function(){return this.selected});
    var cityValArr = cityValue._groups[0].map(x => x.value)
    console.log(`cityValArr: `);
    console.log(cityValArr);
    var cityFilterF = function(cityValArr) {
        if (cityValArr.length === 0) {
            return ufos;
        } else {
            return data.filter(ufo => cityValArr.reduce((a,b) => a || b === ufo.city, false));
        }
    }
    var cityFilter = cityFilterF(cityValArr)
    console.log(`cityFilter: `);
    console.log(cityFilter);

    var stateValue = d3.select('#stateSelect').selectAll("option").filter(function(){return this.selected});
    var stateValArr = stateValue._groups[0].map(x => x.value)
    console.log(`stateValArr: `);
    console.log(stateValArr);
    var stateFilterF = function(stateValArr) {
        if (stateValArr.length === 0) {
            return ufos;
        } else {
            return data.filter(ufo => stateValArr.reduce((a,b) => a || b === ufo.state, false));
        }
    }
    var stateFilter = stateFilterF(stateValArr)
    console.log(`stateFilter: `);
    console.log(stateFilter);
    var binValue = d3.select('#binSelect').selectAll("option").filter(function(){return this.selected});
    var binValArr = binValue._groups[0].map(x => x.value)
    console.log(`binValArr: `);
    console.log(binValArr);
    var binFilterF = function(binValArr) {
        if (binValArr.length === 0) {
            return ufos;
        } else {
            return data.filter(ufo => binValArr.reduce((a,b) => a || b === ufo.timeBin, false));
        }
    }
    var binFilter = binFilterF(binValArr)
    console.log(`binFilter: `);
    console.log(binFilter);
    var commentElement = d3.select("#commentSearch");
    var commentValue = commentElement.property("value")
    var commentFilterF = function(commentValue) {
        var regex = new RegExp(commentValue, "gi")
        return data.filter(x => regex.test(x.comments) === true);
    }
    var commentFilter = commentFilterF(commentValue);
    console.log(`commentFilter: `);
    console.log(commentFilter);
    var subFilter = dateFilter.filter(ufo => shapeFilter.reduce((a,b) => a || b === ufo, false));
    console.log(`subFilter: `);
    console.log(subFilter);
    var subFilter2 = subFilter.filter(ufo => stateFilter.reduce((a,b) => a || b === ufo, false));
    console.log(`subFilter2: `);
    console.log(subFilter2);
    var subFilter3 = subFilter2.filter(ufo => countryFilter.reduce((a,b) => a || b === ufo, false));
    console.log(`subFilter3: `);
    console.log(subFilter3);
    var subFilter4 = subFilter3.filter(ufo => commentFilter.reduce((a,b) => a || b === ufo, false));
    console.log(`subFilter4: `);
    console.log(subFilter4);
    var subFilter5 = subFilter4.filter(ufo => cityFilter.reduce((a,b) => a || b === ufo, false));
    console.log(`subFilter5: `);
    console.log(subFilter5);
    var subFilter6 = subFilter5.filter(ufo => binFilter.reduce((a,b) => a || b === ufo, false));
    console.log(`subFilter6: `);
    console.log(subFilter6);
    var finalFilter = subFilter6;
    var sortValue = document.querySelector('input[name = "sortSelect"]:checked').labels[0].innerText;

    switch (sortValue) {
        case 'Sort by Date':
            finalFilter.sort((a,b) => a.datetime > b.datetime ? 1 : a.datetime === b.datetime ? 0 : -1);
            break;
        case 'Sort by Country':
            finalFilter.sort((a,b) => a.country > b.country ? 1 : a.country === b.country ? 0 : -1);
            break;
        case 'Sort by Shape':
            finalFilter.sort((a,b) => a.shape > b.shape ? 1 : a.shape === b.shape ? 0 : -1);
            break;
        case 'Sort by City':
            finalFilter.sort((a,b) => a.city > b.city ? 1 : a.city === b.city ? 0 : -1);
            break;
        case 'Sort by State':
            finalFilter.sort((a,b) => a.state > b.state ? 1 : a.state === b.state ? 0 : -1);
            break;
        case 'Sort by Duration':
            finalFilter.sort(function(a, b) {
                if (parseInt(a.timeBin) > parseInt(b.timeBin)) return 1;
                if (parseInt(a.timeBin) < parseInt(b.timeBin)) return -1;
                if (parseInt(a.durationMinutes.toString().replace(/[A-Za-z]+/g, "")) > parseInt(b.durationMinutes.toString().replace(/[A-Za-z]+/g, ""))) return 1;
                if (parseInt(a.durationMinutes.toString().replace(/[A-Za-z]+/g, "")) < parseInt(b.durationMinutes.toString().replace(/[A-Za-z]+/g, ""))) return -1;
                return 0;
            })
            break;
        case 'Sort by Comment':
            finalFilter.sort((a,b) => a.comments > b.comments ? 1 : a.comments === b.comments ? 0 : -1);
            break;
        case 'Sort by Duration Group':
            finalFilter.sort((a,b) => a.timeBin > b.timeBin ? 1 : a.timeBin === b.timeBin ? 0 : -1);
            break;

    }
    console.log(finalFilter);
    
    var modeValue = document.querySelector('input[name = "modeSelect"]:checked').labels[0].innerText;

    switch (modeValue) {
        case 'Append Results':
            tbody.append('tr')
            tbody.append('td').style('white-space', 'nowrap').text(`${dateValue}`);
            tbody.append('td').style('white-space', 'nowrap').text(`${cityValArr}`);
            tbody.append('td').style('white-space', 'nowrap').text(`${stateValArr}`);
            tbody.append('td').style('white-space', 'nowrap').text(`${countryValue}`);
            tbody.append('td').style('white-space', 'nowrap').text(`${shapeValArr}`);
            tbody.append('td').style('white-space', 'nowrap').text(``);
            tbody.append('td').style('white-space', 'nowrap').text(`${commentValue}`);
            tbody.append('td').style('white-space', 'nowrap').text(`${binValArr}`);
            finalFilter.forEach(x => {
                var row = tbody.append('tr');
                Object.entries(x).forEach(([k,v]) => {
                    var cell = tbody.append('td');
                    cell.text(v);
                })
            })
            tbody.append('tr');
            tbody.append('td').style('white-space', 'nowrap').text(`-------- End Results --------`);
            break;
        case 'Rewrite Results':
            tbody.selectAll('tr').remove()
            tbody.selectAll('td').remove()

            tbody.append('tr')
            tbody.append('td').style('white-space', 'nowrap').text(`${dateValue}`);
            tbody.append('td').style('white-space', 'nowrap').text(`${cityValArr}`);
            tbody.append('td').style('white-space', 'nowrap').text(`${stateValArr}`);
            tbody.append('td').style('white-space', 'nowrap').text(`${countryValue}`);
            tbody.append('td').style('white-space', 'nowrap').text(`${shapeValArr}`);
            tbody.append('td').style('white-space', 'nowrap').text(``);
            tbody.append('td').style('white-space', 'nowrap').text(`${commentValue}`);
            tbody.append('td').style('white-space', 'nowrap').text(`${binValArr}`);
            finalFilter.forEach(x => {
                var row = tbody.append('tr');
                Object.entries(x).forEach(([k,v]) => {
                    var cell = tbody.append('td');
                    cell.text(v);
                })
            })
            tbody.append('tr');
            tbody.append('td').style('white-space', 'nowrap').text(`-------- End Results --------`);
            break;
        }
})