// URL to sample data
const url = "https://api.covidtracking.com/v1/states/daily.json"

const territories = ["AS","DC","GU","MP","PR","VI"];





// Function to build map
function buildMap(data, selectedDate) {
    // Filter data for selected date
    var dateData = data.filter(function(obj) {
        return obj.date == selectedDate && obj.positive !==0;
    });

    // Extract the state acronyms and corresponding values
    const locations = dateData.map(entry => entry.state);
    const values = dateData.map(entry => entry.positive);

    // Confirm values are correct
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
    title: {
        text: 'Positive COVID Cases',
        font: {
            size:20,
            family: 'Arial',
            weight: 'bold'
        },
        y:0.95, // For vertical alignment
    },
    geo: {
        scope: 'usa',
        showlakes: false,
        lakecolor: 'rgb(255,255,255)'
    },
    legend: {
        x:1,
        y:1,
        xanchor:'right',
        yanchor:'top',
        pad: {
            r:100
        }
    },
    margin: {
        t: 20,
        r: 20,
        b: 20,
        l: 20
    }
    };

    // Render the choropleth map
    Plotly.newPlot('map', [trace], layout);
}


// Function to handle changes in the dropdown selection
function optionChanged(selectedDate) {
    populateInfo(selectedDate)
    buildMap(data, selectedDate);
    buildTable(data, selectedDate);


}


// Function to populate date information
function populateInfo(selectedDate) {
    var dateData = data.filter(function(obj) {
        return obj.date == selectedDate && obj.positive !== null && !territories.includes(obj.state) && obj.positive !==0;
    });

    document.getElementById("numOfStates").innerHTML = dateData.length;
}




// Function to build table
function buildTable(data, selectedDate) {
    // Filter data for selected date
    var dateData = data.filter(function(obj) {
        return obj.date == selectedDate && obj.positive !==null && !territories.includes(obj.state) && obj.positive !==0;
    });

    // Sort data based on positive cases in descending order
    dateData.sort(function(a, b) {
        return b.positive - a.positive;
    });

    // Select the top ten states
    var topTenData = dateData.slice(0, 10);

    // Print to console for testing purposes
    console.log(topTenData);

    // Create the table HTML
    var tableHTML = "<table><tr><th>State</th><th>Positive Cases</th></tr>";

    // Populate the table rows with state and positive case data
    topTenData.forEach(function(obj) {
        var formattedPositive = obj.positive.toLocaleString();
        tableHTML += "<tr><td>" + obj.state + "</td><td>" + formattedPositive + "</td></tr>";
    });

    tableHTML += "</table>";

    // Display the table
    document.getElementById("table").innerHTML = tableHTML;
}






// Fetch data and populate dates
function init() {
    // Fetch JSON data
    d3.json(url).then(function(jsonData) {

    data = jsonData

    // Retrieve dates for dropdown. Start by creating a new set
    var dateSet = new Set();

    // Retrieve dates and add them to the Set
    data.forEach(function(obj) {
        var date = obj.date;
        if (date >= 20200128) {  // Exclude dates before 20200128 because those values were null for positive cases
            dateSet.add(date);
        }
    });

    // Convert the Set to an array
    dates = Array.from(dateSet);

    // Sort the dates array in ascending order
    dates.sort(function(a, b) {
        return a - b;
    });

    slider.max = dates.length -1;

    // Start with first date selected
    var initialSelectedDate = dates[0];
    dateInfo1.innerHTML = initialSelectedDate;
    dateInfo2.innerHTML = initialSelectedDate;
    optionChanged(initialSelectedDate);

});
}









// Declare global variables (so they can be accessible by functions)
let data;
let dates;
init();

// Initialize the rangeslider
var slider = document.getElementById('slider');
var dateInfo1 = document.getElementById("dateInfo1");
dateInfo1.innerHTML = slider.value;
dateInfo2.innerHTML = slider.value;

slider.oninput = function() {
    dateInfo1.innerHTML = this.value;
    dateInfo2.innerHTML = this.value;
    // Convert the slider value to a date from the dates array
    var selectedDate = dates[this.value];

    // Output the selected date
    dateInfo1.innerHTML = selectedDate;
    dateInfo2.innerHTML = selectedDate;

    // Call the optionChanged() function with the selected date
    optionChanged(selectedDate);
}