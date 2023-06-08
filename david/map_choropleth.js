// URL to sample data
const url = "https://api.covidtracking.com/v1/states/daily.json"




function buildMap(data, selectedDate) {
    // Filter data for selected date
    var dateData = data.filter(function(obj) {
        return obj.date == selectedDate;
    });

    // Extract the state acronyms and corresponding values
    const locations = dateData.map(entry => entry.state);
    const values = dateData.map(entry => entry.positive);

    console.log(locations)
    console.log(values)
    // Create the choropleth trace
    const trace = {
    type: 'choropleth',
    //geojson: geojson,
    locationmode: 'USA-states',
    locations: locations,
    z: values,
    colorscale: [[0, 'rgb(255,200,200)'], [1, 'rgb(255,0,0)']],
    // cmin: 0,
    // cmax: 3000000,
    autocolorscale: false,
    marker: {
        line: {
        color: 'rgb(255,255,255)',
        width: 2
        }
    }
    };

    // Configure the layout for the choropleth map
    const layout = {
    title: 'Positive COVID Cases',
    geo: {
        scope: 'usa',
        showlakes: false,
        lakecolor: 'rgb(255,255,255)'
    }
    };

    // Render the choropleth map
    Plotly.newPlot('map', [trace], layout);
}






let data;
init();



// Function to handle changes in the dropdown selection
function optionChanged(selectedDate) {
    populateInfo(selectedDate)
    buildMap(data, selectedDate);
}



// Populate date information
function populateInfo(selectedDate) {

    var dateData = data.filter(function(obj) {
        return obj.date == selectedDate;
    });

    var numStates = dateData.length;

    // Display date information
    var dateInfo = d3.select("#dateInfo");
    dateInfo.html("");   // Needed to reset text
    dateInfo.append("p").text(`Selected Date: ${selectedDate}`);
    dateInfo.append("p").text(`Number of States: ${numStates}`);
}





// Fetch data and populate dropdown
function init() {
    // Fetch JSON data
    d3.json(url).then(function(jsonData) {

    data = jsonData

    // Retrieve dates for dropdown. Start by creating a new set
    var dateSet = new Set();

    // Retrieve dates and add them to the Set
    data.forEach(function(obj) {
        var date = obj.date;
        if (date >= 20200128) {  // Exclude dates before 20200128
            dateSet.add(date);
        }
    });

    // Convert the Set to an array
    var dates = Array.from(dateSet);

    // Sort the dates array in ascending order
    dates.sort(function(a, b) {
        return a - b;
    });

    // Populate the dropdown menu
    var dropdown = d3.select("#selState");
    dates.forEach(function(date) {
        dropdown.append("option").text(`${date}`).property("value", date);
    });


    // Start with first date selected
    var initialSelectedDate = dates[0];
    optionChanged(initialSelectedDate);

});
}