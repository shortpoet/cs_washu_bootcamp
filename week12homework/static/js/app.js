var ufos = data;

var tbody = d3.select('tbody');
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
            var shapeFilter = []
            shapeValArr.forEach(function(shapeVal){
                ufos.forEach(function(ufo){
                    if (ufo.shape === shapeVal) {
                        shapeFilter.push(ufo);
                    }
                });
            });
            return shapeFilter;
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
            var cityFilter = []
            cityValArr.forEach(function(cityVal){
                ufos.forEach(function(ufo){
                    if (ufo.city === cityVal) {
                        cityFilter.push(ufo);
                    }
                });
            });
            return cityFilter;
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
            var stateFilter = []
            stateValArr.forEach(function(stateVal){
                ufos.forEach(function(ufo){
                    if (ufo.state === stateVal) {
                        stateFilter.push(ufo);
                    }
                });
            });
            return stateFilter;
        }

    }
    var stateFilter = stateFilterF(stateValArr)
    console.log(`stateFilter: `);
    console.log(stateFilter);
    var commentElement = d3.select("#commentSearch");
    var commentValue = commentElement.property("value")
    var commentFilterF = function(commentValue) {
        commentValue = " " + commentValue;
        return data.filter(x => x.comments.includes(commentValue))
    }
    var commentFilter = commentFilterF(commentValue);
    console.log(`commentFilter: `);
    console.log(commentFilter);
    var subFilter = [];
    dateFilter.forEach(function(dObj){
        shapeFilter.forEach(function(shObj){
            if (dObj === shObj) {
                subFilter.push(dObj);
            }
        });
    });
    console.log(`subFilter: `);
    console.log(subFilter);
    var subFilter2 = [];
    subFilter.forEach(function(fObj){
        stateFilter.forEach(function(stObj){
            if (fObj === stObj) {
                subFilter2.push(fObj);
            }
        });
    });
    console.log(`subFilter2: `);
    console.log(subFilter2);
    var subFilter3 = [];
    subFilter2.forEach(function(f2Obj){
        countryFilter.forEach(function(coObj){
            if (f2Obj === coObj) {
                subFilter3.push(coObj);
            }
        });
    });
    console.log(`subFilter3: `);
    console.log(subFilter3);
    var subFilter4 = [];
    subFilter3.forEach(function(f3Obj){
        commentFilter.forEach(function(cmObj){
            if (f3Obj === cmObj) {
                subFilter4.push(cmObj);
            }
        });
    });
    console.log(`subFilter4: `);
    console.log(subFilter4);
    var subFilter5 = [];
    subFilter4.forEach(function(f4Obj){
        cityFilter.forEach(function(ctObj){
            if (f4Obj === ctObj) {
                subFilter5.push(ctObj);
            }
        });
    });
    console.log(`subFilter5: `);
    console.log(subFilter5);
    var finalFilter = subFilter5;
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
        case 'Sort by Comment':
            finalFilter.sort((a,b) => a.comments > b.comments ? 1 : a.comments === b.comments ? 0 : -1);
            break;
    }
    console.log(finalFilter);
    
    tbody.append('tr')
    tbody.append('td').style('white-space', 'nowrap').text(`Search for: Date: [...${dateValue}], Country:[...${countryValue}], Shape:[...${shapeValArr}], State:[...${stateValArr}], Comment:[...${commentValue}]`);
    tbody.append('tr')
    tbody.append('td').text(`        -------- --------`);
    finalFilter.forEach(x => {
        var row = tbody.append('tr');
        Object.entries(x).forEach(([k,v]) => {
            var cell = tbody.append('td');
            cell.text(v);
        })
    })
    tbody.append('tr')
    tbody.append('td').style('white-space', 'nowrap').text(`-------- End Results --------`);
})