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


// Fetch JSON data
d3.json(url).then(function(data) {




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
    var fullName = stateDictionary[state] || state;
    dropdown.append("option").text(`${state} - ${fullName}`).property("value", state);
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








  // Activate function when dropdown changes
  dropdown.on("change", function() {
    var selectedState = dropdown.property("value");
    optionChanged(selectedState);
  });
   


    






  // Start with first state selected
  var initialSelectedState = states[0];
  optionChanged(initialSelectedState);



});