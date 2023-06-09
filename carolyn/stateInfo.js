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
  createPositiveCasesBarChart(selectedState)
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

// convert interger for date to string
function dateStringToDate(DateStringINT) {
    var dateString = DateStringINT.toString();
    var year = dateString.substring(0, 4);
    var month = dateString.substring(4, 6);
    var day = dateString.substring(6, 8);
    var date = new Date(year, month - 1, day);
    return date;
}

function createPositiveCasesBarChart(selectedState) {
  // Filter data for selected state
  var stateData = data.filter(function(obj) {
    return obj.state === selectedState;
  });

  // Sort the stateData array based on the date in ascending order
  stateData.sort(function(a, b) {
    return a.date - b.date;
  });

  // Extract date and positive cases values for the chart
  var dates = stateData.map(function(obj) {
    // previously new Date
    return dateStringToDate(obj.date);
  });

  var positiveCases = stateData.map(function(obj) {
    return obj.positive;
  });

  var deaths = stateData.map(function(obj) {
    return obj.death;
  });

var totalTestResults = stateData.map(function(obj) {
  return obj.totalTestResults;
});

var positiveTestsViral = stateData.map(function(obj) {
  return obj.positiveTestsViral;
});

var negativeTestsViral = stateData.map(function (obj) {
  return obj.negativeTestsViral;
});

 // Create the chart data
 var chartData1 = [
  {
    x: dates,
    y: positiveCases,
    type: "bar",
    name: "Positive Cases",
    marker: {
      color: "#B9E9FC",
    },
  },
  {
    x: dates,
    y: deaths,
    type: "line",
    name: "Deaths",
    yaxis: "y2",
    marker: {
      color: "#FF6969",
    },
  },
];

// Create the chart data for the pie chart
var chartData2 = [
  {
    labels: [
      "Total Test Results",
      "Number of Positive Test Results",
      "Number of Negative Test Results",
    ],
    values: [
      positiveTestsViral[positiveTestsViral.length - 1],
      negativeTestsViral[negativeTestsViral.length - 1],
    ],
    type: "pie",
    marker: {
      colors: ["#D4F1F4", "#F79489"],
    },
  },
];

// Create chart data for third graph
var chartData3 = [
  {
    x: dates,
    y: deaths,
    type: "bar",
    name: "COVID Deaths",
    marker: {
      color: "#",
    },
  },
  {
    x: dates,
    y: positiveTestsViral,
    type: "line",
    name: "Positive COVID Test Results",
    yaxis: "y2",
    marker: {
      color: "#FF6969",
    },
  },
  {
    x: dates,
    y: positiveCases,
    type: "line",
    name: "Positive COVID cases",
    yaxis: "y2",
    marker: {
      color: "#FF6969",
    },
  },
];

// Create the chart layout
var layout1 = {
  title: `Positive Cases and Deaths in ${selectedState}`,
  xaxis: {
    title: "Date",
    type: "date",
    tickformat: "%Y-%m-%d",
  },
  yaxis: {
    title: "Positive Cases",
  },
  yaxis2: {
    title: "Deaths",
    overlaying: "y",
    side: "right",
  },
};

// Create the chart layout
var layout2 = {
  title: `COVID Tests Results in ${selectedState}`,
};

// Create chart layout
var layout3 = {
  title: `Positive Test Results and Deaths in ${selectedState}`,
  xaxis: {
    title: "Date",
    type: "date",
    tickformat: "%Y-%m-%d",
  },
  yaxis: {
    title: "Positive Test Results",
  },
  yaxis2: {
    title: "Deaths",
    overlaying: "y",
    side: "right",
  },
};

// Plot the chart
Plotly.newPlot("chart1", chartData1, layout1);
Plotly.newPlot("chart2", chartData2, layout2);
Plotly.newPlot("chart3", chartData3, layout3);
}