// Create map
var myMap = L.map("map", {
    center: [40.1381,-99.8264],
    zoom:4
});

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// URL to sample data
const url = "https://api.covidtracking.com/v1/states/daily.json"


// Geographically-centered Lat and Lon for each state
const stateCoordinates = {
    "AL": [32.806671, -86.791130],
    "AK": [61.370716, -152.404419],
    "AZ": [33.729759, -111.431221],
    "AR": [34.969704, -92.373123],
    "CA": [36.116203, -119.681565],
    "CO": [39.059811, -105.311104],
    "CT": [41.597782, -72.755371],
    "DE": [39.318523, -75.507141],
    "FL": [27.766279, -81.686783],
    "GA": [33.040619, -83.643074],
    "HI": [21.094318, -157.498337],
    "ID": [44.240459, -114.478828],
    "IL": [40.349457, -88.986137],
    "IN": [39.849426, -86.258285],
    "IA": [42.011539, -93.210526],
    "KS": [38.526600, -96.726486],
    "KY": [37.668140, -84.670067],
    "LA": [31.169546, -91.867805],
    "ME": [44.693947, -69.381927],
    "MD": [39.063946, -76.802101],
    "MA": [42.230171, -71.530106],
    "MI": [43.326618, -84.536095],
    "MN": [45.694454, -93.900192],
    "MS": [32.741646, -89.678697],
    "MO": [38.456085, -92.288368],
    "MT": [46.921925, -110.454355],
    "NE": [41.125370, -98.268082],
    "NV": [38.313515, -117.055374],
    "NH": [43.452492, -71.563896],
    "NJ": [40.298904, -74.521011],
    "NM": [34.840515, -106.248482],
    "NY": [42.165726, -74.948051],
    "NC": [35.630066, -79.806419],
    "ND": [47.528912, -99.784012],
    "OH": [40.388783, -82.764915],
    "OK": [35.565342, -96.928917],
    "OR": [44.572021, -122.070938],
    "PA": [40.590752, -77.209755],
    "RI": [41.680893, -71.511780],
    "SC": [33.856892, -80.945007],
    "SD": [44.299782, -99.438828],
    "TN": [35.747845, -86.692345],
    "TX": [31.054487, -97.563461],
    "UT": [40.150032, -111.862434],
    "VT": [44.045876, -72.710686],
    "VA": [37.769337, -78.170400],
    "WA": [47.400902, -121.490494],
    "WV": [38.491000, -80.954570],
    "WI": [44.268543, -89.616508],
    "WY": [42.755966, -107.302490],
    "AS": [-14.270972, -170.132217],
    "DC": [38.897438, -77.026817],
    "GU": [13.444304, 144.793731],
    "MP": [15.0979, 145.6739],
    "PR": [18.2208, -66.5901],
    "VI": [18.3358, -64.8963]
};


let data;
init();



// Function to handle changes in the dropdown selection
function optionChanged(selectedDate) {
    populateInfo(selectedDate)
    buildMap(selectedDate);
}







function buildMap(selectedDate) {

    // Filter data for selected date
    var dateData = data.filter(function(obj) {
        return obj.date == selectedDate;
    });

    // Clear any existing markers
    myMap.eachLayer(function(layer) {
        if(layer instanceof L.CircleMarker) {
            myMap.removeLayer(layer);
        }
    });

    // Add circle markers for each state in dateData
    dateData.forEach(function(obj) {
        var state = obj.state;
        var positive = obj.positive;
        var coordinates = stateCoordinates[state];
        if(coordinates) { // check if state exists in stateCoordinates
            var lat = coordinates[0];
            var lon = coordinates[1];

            const minSize = 5;  // minimum size for circle
            const maxSize = 100;  // maximum size for circle

            let radius = positive / 500;  // adjust this factor as per your data
            radius = Math.max(radius, minSize);  // if radius is smaller than minSize, set it to minSize
            radius = Math.min(radius, maxSize);  // if radius is larger than maxSize, set it to maxSize

            // create circle marker
            var marker = L.circleMarker([lat, lon], {
                radius: radius, // adjust this for your data
                color: "black",
                fillColor:"red",
                weight: 1,
                opacity: 100,
                fillOpacity: 0.5
            });

            // add marker to map
            marker.addTo(myMap);
        }
    });
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
        dateSet.add(date);
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