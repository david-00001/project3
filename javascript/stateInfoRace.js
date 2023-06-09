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
  raceCases(selectedState)
  raceDeath(selectedState)
  stackedBar(selectedState)
  hispanicCases(selectedState)
  hispanicDeath(selectedState)

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
  var firstDate = dateStringToDate(stateData[0].date).toDateString();  // Get the first date from the selected state's data
  var lastDate = dateStringToDate(stateData[stateData.length - 1].date).toDateString();  // Get the first date from the selected state's data
  var fullName = stateDictionary[selectedState];
  var deaths = stateData[stateData.length-1].death;
  var hospitalized = stateData[stateData.length-1].hospitalized;
  var totalPositive = stateData[stateData.length-1].total;
  
  
     
  // Display state information
  var stateInfo = d3.select("#stateInfo");
  stateInfo.html("");
  stateInfo.append("p").html(`<p><b>Records for ${fullName}: </b></p>`);
  stateInfo.append("p").text(`${stateCount}`)
  stateInfo.append("hr")
  // stateInfo.append("p").html(`<p><b>Total Positive Cases: </b></p>`);
  // stateInfo.append("p").text(`${totalPositive}`)
  // stateInfo.append("hr")
  // stateInfo.append("p").html(`<p><b>Total Hospitalization: </b></p>`);
  // stateInfo.append("p").text(`${hospitalized}`)
  // stateInfo.append("hr")
  // stateInfo.append("p").html(`<p><b>Total Deaths: </b></p>`);
  // stateInfo.append("p").text(`${deaths}`)
  // stateInfo.append("hr")
  stateInfo.append("p").text(`First Date: ${firstDate}`);
  stateInfo.append("p").text(`Last Date: ${lastDate}`);

  var caseData = [{
    type: "indicator",
    mode: "number",
    title: "Positive Cases",
    value: totalPositive,
    domain: { row: 0, column: 1 },
    
  }];
  var caseLayout = {
    width: 150,
    height: 105,
    paper_bgcolor: "rgb(235, 235, 235)",
    margin: { t: 25, b: 5, l: 25, r: 25 },
    grid: { rows: 1, columns: 1, pattern: "independent" },
  };
  
  var hospitalData = [{
    type: "indicator",
    mode: "number",
    title: "Hospitalizations",
    value: hospitalized,
    domain: { row: 0, column: 1 },
    
  }];
  var hospitalLayout = {
    width: 170,
    height: 105,
    paper_bgcolor: "rgb(235, 235, 235)",
    margin: { t: 25, b: 5, l: 25, r: 25 },
    grid: { rows: 1, columns: 1, pattern: "independent" },
  };

  var deathData = [{
    type: "indicator",
    mode: "number",
    title: "Total Deaths",
    value: deaths,
    domain: { row: 0, column: 1 },
    
  }];
  var deathLayout = {
    width: 150,
    height: 105,
    paper_bgcolor: "rgb(235, 235, 235)",
    margin: { t: 25, b: 5, l: 25, r: 25 },
    grid: { rows: 1, columns: 1, pattern: "independent" },
  };



  Plotly.newPlot('stateCases', caseData, caseLayout);
  Plotly.newPlot('stateHospital', hospitalData, hospitalLayout);
  Plotly.newPlot('stateDeaths', deathData, deathLayout);

  

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
  // optionChanged(initialSelectedState)   - Carolyn has this not-commented
  populateInfo(initialSelectedState)
  raceCases(initialSelectedState);
  raceDeath(initialSelectedState)
  stackedBar(initialSelectedState)
  hispanicCases(initialSelectedState)
  hispanicDeath(initialSelectedState)


});

}

// convert interger for date to string
function dateStringToDate(DateStringINT) {
    var dateString = DateStringINT.toString();
    var year = dateString.substring(0, 4);
    var month = dateString.substring(4, 6);
    var day = dateString.substring(6, 8);
    var date = new Date(year, month - 1, day);
    return date;
}
