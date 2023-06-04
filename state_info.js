// URL to sample data
const url = "https://api.covidtracking.com/v1/states/daily.json"

// Fetch JSON data
d3.json(url).then(function(data) {

  // Retrieve states for dropdown
  //var states = data.map(obj => obj.state);
  var stateSet = new Set();

  // Retrieve states and add them to the Set
  data.forEach(function(obj) {
    var state = obj.state;
    stateSet.add(state);
  });

  // Convert the Set to an array
  var states = Array.from(stateSet);

  // Populate the dropdown menu
  var dropdown = d3.select("#selState");
  states.forEach(function(state) {
    dropdown.append("option").text(state).property("value", state);
  });








  // Function to handle changes in the dropdown selection
  function optionChanged(selectedState) {

    // Filter data for selected state
    var stateData = data.filter(function(obj) {
      return obj.state === selectedState;
    });

    // Sort the stateData array based on the date in ascending order
    stateData.sort(function(a, b) {
      return a.date - b.date;
    });
 
    var stateCount = stateData.length;   // Count the number of occurrences of the selected state
    var firstDate = stateData[0].date;  // Get the first date from the selected state's data
    var lastDate = stateData[stateData.length - 1].date;  // Get the first date from the selected state's data
        
    // Display state information
    var stateInfo = d3.select("#stateInfo");
    stateInfo.html("");
    stateInfo.append("p").text(`Records for ${selectedState}: ${stateCount}`);
    stateInfo.append("p").text(`First Date: ${firstDate}`);
    stateInfo.append("p").text(`Last Date: ${lastDate}`);
  }




  // Activate function when dropdown changes
  dropdown.on("change", function() {
    var selectedState = dropdown.property("value");
    optionChanged(selectedState);
  });
   


    







  var initialSelectedState = states[0];
  optionChanged(initialSelectedState);
});