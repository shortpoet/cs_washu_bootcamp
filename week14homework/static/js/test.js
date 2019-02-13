
var data = require('./data.json');


// function search(str) {
//     resultArr = [];
//     data.forEach(x =>  {  
//         Object.entries(x).forEach(([k,v]) => {
//             //console.log(k);
//             if (x.datetime === str) {
//                 resultArr.push(v);
//             }
//         })
// })
//     return resultArr;
// }



function search(str) {
    return data.filter(x => x.datetime === str);
    }


var cities = data.map(x => x.city);
var citySet = new Set(cities);
var cityArr = [...citySet]
var states = data.map(x => x.state);
var stateSet = new Set(states);
var stateArr = [...stateSet]
var countries = data.map(x => x.country);
var countrySet = new Set(countries);
var countryArr = [...countrySet]
var shapes = data.map(x => x.shape);
var shapeSet = new Set(shapes);
var shapeArr = [...shapeSet]
var durations = data.map(x => x.durationMinutes);
var durationSet = new Set(durations);
var durationArr = [...durationSet]

var miniArr = [ 'leatherwood','sacramento','ackerman','alma','anderson','ben wheeler','atlanta','bakersfield','albuquerque','baker','aspen','anchorage','antioch','benton','cedar rapids','el cajon','boca raton','falcon','crestview','ceres','deep run','fresno','eugene','fayetteville','fairfield','fort myers','butler','eunice','cary','cincinnati','buffalo','freedom (watsonville)','francis creek','boulder','fort worth','edgartown','bonita','glen spey','grants pass','cleveland','clinton','colonia','chula vista','gulf breeze','lakeland','la mesa','jasper','haverhill','ingleside (canada)','joplin','hancock','pasadena','loveland','london (canada)','lompoc','lemon grove','park city']

var miniSort = miniArr.sort((a,b) => a > b);
//console.log(miniSort)

//var sorted = cityArr.sort((a,b) => a.localeCompare(b));
//var sorted = cityArr.sort((a,b) => a > b ? 1 : a === b ? 0 : -1);
var sorted = data.sort((a,b) => a.shape > b.shape ? 1 : a.shape === b.shape ? 0 : -1);
//var sorted = sorted.sort((a,b) => a > b);
// var sorted = [];
// var sorted2 = []
// for (var x = 0; x < 1000000; x++) {
//     sorted = miniArr.sort((a,b) => a > b);
// }
// for (var x = 0; x < 1000000; x++) {
//     sorted2 = sorted.sort((a,b) => a > b);
// }
//console.log(cityArr);
//console.log(sorted);
// console.log(stateArr);
// console.log(countryArr);
// console.log(shapeArr);
//console.log(durationArr);

//var durSort = finalFilter.sort((a,b) => parseInt(a.timeBin) > parseInt(b.timeBin) ? 1 : parseInt(a.timeBin) === parseInt(b.timeBin) ? 0 : -1);
//durSort.sort((a,b) => parseInt(a.durationMinutes.toString().replace(/[A-Za-z]+/g, "")) > parseInt(b.durationMinutes.toString().replace(/[A-Za-z]+/g, "")) ? 1 : parseInt(a.durationMinutes.toString().replace(/[A-Za-z]+/g, "")) === parseInt(b.durationMinutes.toString().replace(/[A-Za-z]+/g, "")) ? 0 : -1);
    // finalFilter.sort(function(a, b) {
//     if (parseInt(a.timeBin) > parseInt(b.timeBin)) {
//         return 1;
//     } else if (parseInt(a.timeBin) === parseInt(b.timeBin)) {
//         return 0;
//     } else if (parseInt(a.timeBin) < parseInt(b.timeBin)) {
//         return -1;
//     } else if (parseInt(a.durationMinutes.toString().replace(/[A-Za-z]+/g, "")) > parseInt(b.durationMinutes.toString().replace(/[A-Za-z]+/g, ""))) {
//         return 1;
//     } else if (parseInt(a.durationMinutes.toString().replace(/[A-Za-z]+/g, "")) === parseInt(b.durationMinutes.toString().replace(/[A-Za-z]+/g))) {
//         return 0;
//     } else if (parseInt(a.durationMinutes.toString().replace(/[A-Za-z]+/g, "")) < parseInt(b.durationMinutes.toString().replace(/[A-Za-z]+/g, ""))) {
//         return -1
//     }
// })


var dateString = "1/8/2010"

var dateFilterF = function(dateValue) {
    if (dateValue === "") {
        return data;
    } else {
        return data.filter(x => x.datetime === dateValue);
    }
}

// var dateFilter = dateFilterF(dateString)
// console.log(`dateFilter: ${dateFilter}`);
// console.log(dateFilter)

shapeValArr = ["triangle", "fireball"];
stateValArr = ['ca'];
//console.log(stateValArr.length)
var stateFilterF = function(stateValArr) {
    if (stateValArr.length === 0) {
        return data;
    } else {
        var stateFilter = []
        stateValArr.forEach(function(stateVal){
            data.forEach(function(ufo){
                if (ufo.state === stateVal) {
                    stateFilter.push(ufo);
                }
            });
        });
        return stateFilter;
    }

}

//console.log(stateFilterF(stateValArr))

countryValue = 'All Countries'
var countryFilterF = function(countryValue) {
    if (countryValue === "All Countries") {
        return data;
    } else if (countryValue === "United States") {
        return data.filter(x => x.country === 'us');
    } else {
        return data.filter(x => x.country === 'ca');;
    }
}
var countryFilter = countryFilterF(countryValue);
// console.log(`countryFilter: `);
// console.log(countryFilter.length);

var searchF = function(str) {
    //str = " " + str;
    var regex = new RegExp(str, "gi")
    console.log(regex);
    return data.filter(x => regex.test(x.comments) === true)
}

searchStr = 'red';
//console.log(searchF(searchStr).length);
var shapeFilter = data.filter(ufo => shapeValArr.reduce((a,b) => a || b === ufo.shape, false));
var stateFilter = data.filter(ufo => stateValArr.reduce((a,b) => a || b === ufo.state, false));
// var shapeFilter = data.filter(function(ufo) {
//     shapeValArr.map(function(shape) {
//         return ufo.shape === shape
//     })
// })

//console.log(shapeFilter);


//console.log(data);
//console.log(search("1/8/2010"));

var durationF = function(data) {
    return data.map(x => x.durationMinutes.toString().replace(/[A-Za-z]+/g, ""))
}
//console.log(durationF(data));

timeArr = []
boolArr = []
data.forEach(x => {
    var str = x.durationMinutes.toString();
    str.replace(/[A-Za-z]+/g, "");
    //x['duration'] = parseInt(str);
    //var bool = str.includes('minute');
    timeArr.push(str);
    //boolArr.push(bool);
})
//console.log(timeArr)

data.map(x => x['duration'] = parseInt(x.durationMinutes.toString().replace(/[A-Za-z]+/g, "")));


var second = data.filter(x => x.durationMinutes.toString().includes('second') || x.durationMinutes.toString().includes('sec'));
var minute = data.filter(x => x.durationMinutes.toString().includes('minute') || x.durationMinutes.toString().includes('min'));
var hour = data.filter(x => x.durationMinutes.toString().includes('hour'));
var rest = data.filter(x => !x.durationMinutes.toString().includes('hour') && !x.durationMinutes.toString().includes('minute') && !x.durationMinutes.toString().includes('min') && !x.durationMinutes.toString().includes('second') && !x.durationMinutes.toString().includes('sec'));

data.filter(x => x.durationMinutes.toString().includes('second') || x.durationMinutes.toString().includes('sec')).map(x => x['timeBin'] = "second")

var secondArr = second.map(x => x.durationMinutes)
var minuteArr = minute.map(x => x.durationMinutes)
var hourArr = hour.map(x => x.durationMinutes)
var restArr = rest.map(x => x.durationMinutes)

second.map(x => x['timeBin'] = "1: Seconds")
minute.map(x => x['timeBin'] = "2: Minutes")
hour.map(x => x['timeBin'] = "3: Hours")
rest.map(x => x['timeBin'] = "4: Rest")


var data2 = second + minute + hour + rest;

data.sort((a,b) =>{
    if (data.timeBin === "second") {
        if (a.durationMinutes > b.durationMinutes) {
            return 1;
        } else if (a.durationMinutes === b.durationMinutes) {
            return 0;
        } else {
            return -1;
        }
    }
})

//console.log(data)
var stateFilter = data.filter(ufo => stateValArr.reduce((a,b) => a || b === ufo.state, false));

var subFilter2 = stateFilter.filter(ufo => shapeFilter.reduce((a,b) => a || b === ufo, false));

var selections = {
    stateValArr: [],
    shapeValArr: [],
    dateString: ""
}

var subFilter = [];
    stateFilter.forEach(function(stObj){
        shapeFilter.forEach(function(shObj){
            if (stObj === shObj) {
                subFilter.push(stObj);
            }
        });
    });
// console.log(`subFilter: `);
// console.log(stateFilter.length);
// console.log(shapeFilter.length);
// console.log(subFilter.length);
// console.log(subFilter2.length);
console.log(selections)
// Object.entries(selections).forEach((k, v) => {
//     return data.filter(ufo => k.reduce((a,b) => a || b === ufo, false))
// })

var filterF = function(selections) {
    return data.filter(ufo => selections.stateValArr.reduce((a,b) => a || b === ufo.state, false) ||
                              selections.shapeValArr.reduce((a,b) => a || b === ufo.shape, false) ||
                              selections.dateString === ufo.datetime)
}
var filterF2 = function(selections) {
    if (selections.stateValArr === [] || selections.shapeValArr === []) {
        return data;
    } else {
        return data.filter(ufo => selections.stateValArr.reduce((a,b) => a || b === ufo.state, false) ||
                                  selections.shapeValArr.reduce((a,b) => a || b === ufo.shape, false) ||
                                  selections.dateString === ufo.datetime);
    }
}

console.log(filterF2(selections).length)

// var filterF = function(selections) {
//     if (selections.stateValArr) {

//     }
// }

function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate
}
console.log(stringToDate(dateString, "dd/MM/yyyy", "/"))