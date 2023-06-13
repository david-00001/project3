// URL to sample data
const url = "https://api.covidtracking.com/v1/states/daily.json"

// Dictionary to map state acronyms to full names
const stateDictionary = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  AS: "American Samoa",
  DC: "District of Columbia",
  GU: "Guam",
  MP: "Northern Mariana Islands",
  PR: "Puerto Rico",
  VI: "Virgin Islands"
};


let data;
init();

// Function to handle changes in the dropdown selection
function optionChanged(selectedState) {
  populateInfo(selectedState)

}





function populateInfo(selectedState) {
  // Filter data for selected state
  var stateData = data.filter(function(obj) {
    return obj.state === selectedState;
  });

  // Sort the stateData array based on the date in ascending order
  stateData.sort(function(a, b) {
    return a.date - b.date;
  });

  // Collect state info
  var stateCount = stateData.length;   // Count the number of occurrences of the selected state
  var firstDate = stateData[0].date;  // Get the first date from the selected state's data
  var lastDate = stateData[stateData.length - 1].date;  // Get the first date from the selected state's data
  var fullName = stateDictionary[selectedState];
      
  // Display state information
  var stateInfo = d3.select("#stateInfo");
  stateInfo.html("");
  stateInfo.append("p").text(`Records for ${fullName}: ${stateCount}`);
  stateInfo.append("p").text(`First Date: ${firstDate}`);
  stateInfo.append("p").text(`Last Date: ${lastDate}`);
}




// Fetch JSON data and populate dropdown
function init() {
  d3.json(url).then(function(jsonData) {

  data = jsonData

  // Retrieve states for dropdown. Start by creating a new set
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
    var fullName = stateDictionary[state];
    dropdown.append("option").text(`${state} - ${fullName}`).property("value", state);
  });




  // Start with first state selected
  var initialSelectedState = states[0];
  optionChanged(initialSelectedState);



});

}

function createCovidSpreadChart(selectedState) {
  // Filtering the data for each specific state
  var StateData = data.filter(function(obj) {
    return obj.state === selectedState;
  });

  // Sorting the data in ascending order
  StateData.sort(function(a, b) {
    return a.date - b.date;
  })

  // Extracting the date and positive cases values for the chart
  var dates = StateData.map(function(obj) {
    return new Date(obj.date);
  });
  var positiveCases = StateData.map(function(obj) {
    return obj.positive;
  });

  // Extracting the death cases values for the chart
  var deaths = StateData.map(function(obj) {
    return obj.death;
  });
  
  // Create the line chart data
  var lineChart = new Chart( {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Positive Cases',
          data: positiveCases,
          borderColor: 'blue',
          fill: false
        },
        {
          label: 'Deaths',
          data: deaths,
          borderColor: 'red',
          fill: false
        }
      ]
    },
    options: {
      responsive: true
    }
  });
}
