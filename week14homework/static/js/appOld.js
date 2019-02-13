// from data.js
var ufos = data;

// YOUR CODE HERE!

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
submit.on("click", function() {
    d3.event.preventDefault();
    var dateElement = d3.select("#datetime");
    var dateValue = dateElement.property("value").replace(/\s+/g, "");
    console.log(`dateValue: ${dateValue}`);
    var dateFilterF = function(dateValue) {
        dateFilter = []
        if (dateValue === "") {
            return dateFilter = ufos;
        } else {
            ufos.filter(x => x.datetime === dateValue);
        }
    }
    var dateFilter = [];
    dateFilter = dateFilterF(dateValue)
    console.log(`dateFilter: ${dateFilter}`);
    var shapeValue = d3.selectAll('#shapeSelect').selectAll("option").filter(function(){return this.selected});
    console.log(`shapeValue: ${shapeValue}`)
    var shapeValArr = shapeValue._groups[0].map(x => x.value)
    //var shapeValArr = d3.select('#shapeSelect').selectAll('options:checked')
    console.log(`shapeValArr: ${shapeValArr}`);
    //var shapeFilter = ufos.map(ufo => shapeValArr.filter(shape => ufo.shape === shape));
    var shapeFilter = []
    shapeValArr.forEach(function(shapeVal){
        ufos.forEach(function(ufo){
            if (ufo.shape === shapeVal) {
                shapeFilter.push(ufo);
            }
        });
    });
    console.log(`shapeFilter: ${shapeFilter}`);
    var stateValue = d3.selectAll('#stateSelect').selectAll("option").filter(function(){return this.selected});
    var stateValArr = stateValue._groups[0].map(x => x.value)
    //var stateValArr = d3.select('#stateSelect').selectAll('options:checked');
    var stateFilter = [];
    stateValArr.forEach(function(stateVal){
        ufos.forEach(function(ufo){
            if (ufo.shape === stateVal) {
                stateFilter.push(ufo);
            }
        });
    });
    console.log(`stateFilter: ${stateFilter}`);
    var subFilter = [];
    dateFilter.forEach(function(dObj){
        shapeFilter.forEach(function(shObj){
            if (dObj === shObj) {
                subFilter.push(dObj);
            }
        });
    });
    console.log(`subFIlter: ${subFilter}`);
    var subFilter2 = [];
    subFilter.forEach(function(fObj){
        stateFilter.forEach(function(stObj){
            if (fObj === stObj) {
                subFilter2.push(fObj);
            }
        });
    });
    console.log(`subFilter2: ${subFilter2}`);
    var finalFilter = subFilter2;
    console.log(`finalFilter: ${finalFilter}`);
    finalFilter.forEach(x => {
        var row = tbody.append('tr');
        Object.entries(x).forEach(([k,v]) => {
            var cell = tbody.append('td');
            cell.text(v);
        })
    })
})

//var selectedIndex = d3.selectAll('#shapeSelect')//.property('selectedIndex');
//var selected = d3.selectAll("option").filter(function (d, i) { return i === selectedIndex });
//var data = selected.datum();
//var shapeValue = d3.selectAll("option").filter(x => x.selected).map(x => x.value);
//var shapeSelect = d3.select('#shapeSelect').selectAll('option')
//console.log(shapeSelect);
//shapeFilter = shapeSelect.filter(option => option.selected).map(option => option.value)

 // var shapeFilter = shapeValArr.forEach((value, index) => {
    //     ufos.filter(ufo => ufo.shape === value)});
    //var shapeFilter = ufos.filter(forufo => ufo.shape === value)});
    // for (var y = 0; y < shapeValArr.length; y++) {
    //     console.log(shapeValArr[y]);
    //     var shapeFilter = ufos.filter(ufo => ufo.shape === shapeValArr[y]);
    // }
    // var shapeFilter = ufos.filter( function (ufo, i) {
    //     for (var i = 0; i < shapeValArr.length; i++) {
    //         ufo.shape === shapeValArr[i];
    //     }
    // })

// function search() {
//     var inputElement = d3.select("#datetime");
//     var inputValue = inputElement.property("value")//.replace(/\s+/g, "");
//     console.log(inputValue);
//     var resultArr = ufos.filter(x => x.dateTime === inputValue);
//     console.log(resultArr);
//     resultArr.forEach(x => {
//         var row = tbody.append('tr');
//         Object.entries(x).forEach(([k,v]) => {
//             var cell = tbody.append('td');
//             cell.text(v);
//         })
//     })
// }