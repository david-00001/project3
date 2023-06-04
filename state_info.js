// URL to sample data
const url = "https://api.covidtracking.com/v1/states/daily.json"

// Fetch JSON data
d3.json(url).then(function(data) {

  // Retrieve states for dropdown
  var states = data.map(obj => obj.state);

  // Populate the dropdown menu
  var dropdown = d3.select("#selState");
  states.forEach(function(state) {
    dropdown.append("option").text(state).property("value", state);
  });


  console.log(data);


});