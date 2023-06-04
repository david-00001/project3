// // Create map
// var myMap = L.map("map", {
//     center: [40.1381,-99.8264],
//     zoom:4

// });

// // Add tile layer
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
//     attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// URL to data
const url = "https://api.covidtracking.com/v1/states/daily.json"

let data;






// Function to handle changes in the dropdown selection
function optionChanged(selectedState) {




    // Display state information
    var dateInfo = d3.select("#dateInfo");
    dateInfo.html("");  // Clear the existing content before appending the selected date
    dateInfo.append("p").text(`Selected Date: ${selectedDate}`);
}




// Fetch JSON data
d3.json(url).then(function(jsonData) {

    data = jsonData;


    // Retrieve dates for dropdown. Start by creating a new set
    var dateSet = new Set();

    // Retrieve dates and add them to the Set
    data.forEach(function(obj) {
    var date = obj.date;
    dateSet.add(date);
    });

    // Convert the Set to an array
    var datesArray = Array.from(dateSet);

    // Sort the dates array in ascending order
    datesArray.sort(function(a, b) {
        return a - b;
    });

    // Populate the dropdown menu
    var dropdown = d3.select("#selDate");
    datesArray.forEach(function(date) {
    dropdown.append("option").text(date).property("value", date);
    });



    

    // // Activate function when dropdown changes
    // dropdown.on("change", function() {
    //     var selectedDate = dropdown.property("value");
    //     optionChanged(selectedDate);
    // });


    // Start with first state selected
    var initialSelectedDate = datesArray[0];
    optionChanged(initialSelectedDate);


});