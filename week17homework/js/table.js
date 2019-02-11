
queryUrl = localStorage.getItem("formUrl")

function drawTable(queryUrl) {
	console.log(queryUrl)
	d3.json(queryUrl, function(error, quakeData) {
		console.log(queryUrl)
		console.log(quakeData)
		if (error) {
			console.log("error")
		}
		console.log(queryUrl)
        var headers = d3.keys(quakeData.features[0].properties);
        latlng = ['lat', 'lng']
        console.log(headers)
		headers = headers.slice(0,4).concat(latlng).concat(headers.slice(6,8)).concat(headers.slice(10,14)).concat(headers.slice(24,26))
		// console.log(headers)
		var dataTable = d3.select('#table').append('table').attr('class', 'datatable table table-striped');
		var header = dataTable.append('thead').selectAll('th').data(headers).enter()
			.append('th')
			.attr('class', 'sortable')
			.attr('value', d => d)
			.attr('id', d => `${d}-header`)
			.text(d => d)
		var tbody = dataTable.append('tbody')
		var content = tbody.selectAll('tr').data(quakeData.features).enter().append('tr').html((data, i) => `<td 
			class="col_0 row_${i + 1}">${data.properties.mag}</td><td class="col_1 row_${i + 1}">${data.properties.place}</td>
			<td class="col_2 row_${i + 1}">${new Date(data.properties.time)}</td><td class="col_3 row_${i + 1}">${new Date(data.properties.updated)}</td>
			<td class="col_4 row_${i + 1}">${data.geometry.coordinates[0]}</td><td class="col_5 row_${i + 1}">${data.geometry.coordinates[1]}</td>
			<td class="col_6 row_${i + 1}">${data.properties.detail}</td><td class="col_7 row_${i + 1}">${data.properties.felt}</td>
			<td class="col_8 row_${i + 1}">${data.properties.alert}</td><td class="col_9 row_${i + 1}">${data.properties.status}</td>
			<td class="col_10 row_${i + 1}">${data.properties.tsunami}</td><td class="col_11 row_${i + 1}">${data.properties.sig}</td>
			<td class="col_12 row_${i + 1}">${data.properties.type}</td><td class="col_13 row_${i + 1}">${data.properties.title}</td>`)
			.on('mouseover', function(d, i) {
				d3.select(this).style('background-color', 'rgb(0, 14, 142').style('color', 'silver')
			})
			.on('mouseout', function(d, i) {
				d3.select(this).style('background-color', null).style('color', null)
				d3.select('.data').append('table').classed('table table-striped table-sortable', true)
		})
		var sortAscending = true
		header.on('click',function(d, i) {
			var sort_value = d3.select(this).attr('value')
			console.log(sort_value)
			if (sortAscending === true) {
				 content.sort((a,b) => d3.ascending(a.properties[sort_value], b.properties[sort_value]))
				 sortAscending = false
				 d3.select(this).attr('class', 'asc')
			} else {
				 content.sort((a,b) => d3.descending(a.properties[sort_value], b.properties[sort_value]))
				 sortAscending = true
				 d3.select(this).attr('class', 'desc')
			}
		})
		})
}
drawTable(queryUrl)


  