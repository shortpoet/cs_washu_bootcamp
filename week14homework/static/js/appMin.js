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
    // var countryElement = [...document.forms[0].elements.countrySelect]
    // var countryElement = countryElement.filter(x => x.checked);
    // var countryValue = countryElement[0].labels[0].innerText;
    var countryValue = document.querySelector('input[name = "countrySelect"]:checked').labels[0].innerText;
    var shapeValue = d3.select("#shapeSelect").selectAll("option").filter(function(){return this.selected});
    var shapeValArr = shapeValue._groups[0].map(x => x.value)
    //var shapeValArr = d3.select('#shapeSelect').selectAll('options:checked')
    var cityValue = d3.select('#citySelect').selectAll("option").filter(function(){return this.selected});
    var cityValArr = cityValue._groups[0].map(x => x.value)
    var stateValue = d3.select('#stateSelect').selectAll("option").filter(function(){return this.selected});
    var stateValArr = stateValue._groups[0].map(x => x.value)
    var binValue = d3.select('#binSelect').selectAll("option").filter(function(){return this.selected});
    var binValArr = binValue._groups[0].map(x => x.value)
    var commentElement = d3.select("#commentSearch");
    var commentValue = commentElement.property("value")
    var commentRegex = new RegExp(commentValue, "gi")
    
    function autocomplete(inp, arr) {
        var currentFocus;
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              currentFocus++;
              addActive(x);
            } else if (e.keyCode == 38) { 
              currentFocus--;
              addActive(x);
            } else if (e.keyCode == 13) {
              e.preventDefault();
              if (currentFocus > -1) {
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          if (!x) return false;
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      document.addEventListener("click", function (e) {
          closeAllLists(e.target);
      });
      }
    
    autocomplete(document.getElementById('citySearch'), citySorted);
    autocomplete(document.getElementById('stateSearch'), stateSorted);
    

    var selections = {
        dateValue: dateValue,
        shapeValArr: shapeValArr,
        cityValArr: cityValArr,
        stateValArr: stateValArr,
        binValArr: binValArr,
        commentValue: commentRegex,
        countryValue: countryValue
    }
    console.log(selections)
    var filterF = function(selections) {
        if (selections.dateValue === "" && selections.shapeValArr === [] && selections.cityValArr === [] && selections.stateValArr === [] && selections.binValArr === [] && selections.countryValue === "All Countries") {
            return ufos
        } else {
            return ufos.filter(ufo => selections.dateValue === ufo.datetime) ||
                                    selections.shapeValArr.reduce((a,b) => a || b === ufo.shape, false) ||
                                    selections.cityValArr.reduce((a,b) => a || b === ufo.city, false) ||
                                    selections.stateValArr.reduce((a,b) => a || b === ufo.state, false) ||
                                    selections.binValArr.reduce((a,b) => a || b === ufo.timeBin, false) ||
                                    selections.commentRegex.test(ufo.comments) === true ||
                                    selections.countryValue === ufo.country
        }
    }

    var finalFilter = filterF(selections);
    console.log("Final Filter:")
    console.log(finalFilter)
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