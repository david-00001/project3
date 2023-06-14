// URL to sample data
// const url = "https://api.covidtracking.com/v1/states/daily.json"


// Dictionary to map state acronyms to full names
// const stateDictionary = {
//   AL: "Alabama",
//   AK: "Alaska",
//   AZ: "Arizona",
//   AR: "Arkansas",
//   CA: "California",
//   CO: "Colorado",
//   CT: "Connecticut",
//   DE: "Delaware",
//   FL: "Florida",
//   GA: "Georgia",
//   HI: "Hawaii",
//   ID: "Idaho",
//   IL: "Illinois",
//   IN: "Indiana",
//   IA: "Iowa",
//   KS: "Kansas",
//   KY: "Kentucky",
//   LA: "Louisiana",
//   ME: "Maine",
//   MD: "Maryland",
//   MA: "Massachusetts",
//   MI: "Michigan",
//   MN: "Minnesota",
//   MS: "Mississippi",
//   MO: "Missouri",
//   MT: "Montana",
//   NE: "Nebraska",
//   NV: "Nevada",
//   NH: "New Hampshire",
//   NJ: "New Jersey",
//   NM: "New Mexico",
//   NY: "New York",
//   NC: "North Carolina",
//   ND: "North Dakota",
//   OH: "Ohio",
//   OK: "Oklahoma",
//   OR: "Oregon",
//   PA: "Pennsylvania",
//   RI: "Rhode Island",
//   SC: "South Carolina",
//   SD: "South Dakota",
//   TN: "Tennessee",
//   TX: "Texas",
//   UT: "Utah",
//   VT: "Vermont",
//   VA: "Virginia",
//   WA: "Washington",
//   WV: "West Virginia",
//   WI: "Wisconsin",
//   WY: "Wyoming",
//   AS: "American Samoa",
//   DC: "District of Columbia",
//   GU: "Guam",
//   MP: "Northern Mariana Islands",
//   PR: "Puerto Rico",
//   VI: "Virgin Islands"
// };




// let data;
// init();


// // Function to handle changes in the dropdown selection
// function optionChanged(selectedState) {
//   populateInfo(selectedState)


// }


// function populateInfo(selectedState) {
//   // Filter data for selected state
//   var stateData = data.filter(function(obj) {
//     return obj.state === selectedState;
//   });


//   // Sort the stateData array based on the date in ascending order
//   stateData.sort(function(a, b) {
//     return a.date - b.date;
//   });


//   // Collect state info
//   var stateCount = stateData.length;   // Count the number of occurrences of the selected state
//   var firstDate = stateData[0].date;  // Get the first date from the selected state's data
//   var lastDate = stateData[stateData.length - 1].date;  // Get the first date from the selected state's data
//   var fullName = stateDictionary[selectedState];
     
//   // Display state information
//   var stateInfo = d3.select("#stateInfo");
//   stateInfo.html("");
//   stateInfo.append("p").text(`Records for ${fullName}: ${stateCount}`);
//   stateInfo.append("p").text(`First Date: ${firstDate}`);
//   stateInfo.append("p").text(`Last Date: ${lastDate}`);
// }


// // Fetch JSON data and populate dropdown
// function init() {
//   d3.json(url).then(function(jsonData) {


//   data = jsonData


//   // Retrieve states for dropdown. Start by creating a new set
//   var stateSet = new Set();


//   // Retrieve states and add them to the Set
//   data.forEach(function(obj) {
//     var state = obj.state;
//     stateSet.add(state);
//   });


//   // Convert the Set to an array
//   var states = Array.from(stateSet);


//   // Populate the dropdown menu
//   var dropdown = d3.select("#selState");
//   states.forEach(function(state) {
//     var fullName = stateDictionary[state];
//     dropdown.append("option").text(`${state} - ${fullName}`).property("value", state);
//   });


//   // Start with first state selected
//   var initialSelectedState = states[0];
//   optionChanged(initialSelectedState);


// });


// }


// function StringtoDate(dateStringINT) {
//   var year = dateStringINT.slice(0, 4);
//   var month = dateStringINT.slice(4, 6);
//   var day = dateStringINT.slice(6, 8);
//   var date = new Date(`${year}-${month}-${day}`);
//   return date;
// }


// // OLD CODE


// // Plotting the new chart
// Plotly.newPlot('chart', chartData, layout);


// Creating the scatter plot
function createScatterPlot(selectedState) {
  // Filtering the data for the specific state
  var stateData = data.filter(function(obj) {
    return obj.state === selectedState;
  });


  // Sorting the data in ascending order
  stateData.sort(function(a, b) {
    return a.date - b.date;
  });


  // Extracting the date and cumulative hospitalizations
  var dates = stateData.map(function(obj) {
    // previously new Date
    return dateStringToDate(obj.date);
  });
  var hospitalizations = stateData.map(function(obj) {
    return obj.hospitalizedCumulative;
  });
  var deaths = stateData.map(function(obj) {
    return obj.death;
  });
  var hospitalizedCumulative = stateData.map(function(obj) {
    return obj.hospitalized;
  });
  var positiveCases = stateData.map(function(obj) {
    return obj.positive;
  });


 // Scatter plot data
var scatterData = [{
  x: dates,
  y: hospitalizations,
  mode: 'markers',
  type: 'scatter',
  name: 'Hospitalized Cumulative',
  marker: {
    color: '#FFC869',
    symbol: 'circle',
    size: 6
  }
}, {
  x: dates,
  y: positiveCases,
  type: 'scatter',
  mode: 'none',
  fill: 'tonexty',
  name: 'Positive Cases',
  line: {
    color: '#FF6969'
  }
}];


// Scatter plot layout
var scatterLayout = {
  title: `Cumulative Hospitalizations in ${selectedState}`,
  xaxis: {
    title: 'Date',
    type: 'date',
    tickformat: '%d-%m-%Y'
  },
  yaxis: {
    title: 'Hospitalized Cumulative'
  },
};


// Plotting the scatter plot
Plotly.newPlot('scatterChart', scatterData, scatterLayout);






// Creating an area graph


// // Area graph data
var areaData = [{
  x: dates,
  y: deaths,
  type: 'scatter',
  mode: 'none',
  fill: 'tozeroy',
  name: 'Deaths',
  line: {
    color: '#000000'
  }
}, {
  x: dates,
  y: hospitalizedCumulative,
  type: 'scatter',
  mode: 'none',
  fill: 'tonexty',
  name: 'Hospitalized',
  line: {
    color: '#B9E9FC'
  }
}, {
  x: dates,
  y: positiveCases,
  type: 'scatter',
  mode: 'none',
  fill: 'tonexty',
  name: 'Positive Cases',
  line: {
    color: '#FF6969'
  }
}];


// Area graph layout
var areaLayout = {
  title: `COVID-19 Spread in ${selectedState}`,
  xaxis: {
    title: 'Date',
    type: 'date',
    tickformat: '%d-%m-%Y'
  },
  yaxis: {
    title: 'Number of Cases'
  }
};


// Plotting the area graph
Plotly.newPlot('areaGraph', areaData, areaLayout);
}


// Creating the stacked bar graph
function createStackedBarGraph(selectedState) {
  // Filtering the data for the specific state
  var stateData = data.filter(function(obj) {
    return obj.state === selectedState;
  });


  // Sorting the data in ascending order
  stateData.sort(function(a, b) {
    return a.date - b.date;
  });


  // Extracting the date, positive cases, deaths, and recoveries
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
  var recoveries = stateData.map(function(obj) {
    return obj.recovered;
  });


  // Stacked bar graph data
  var stackedBarData = [{
    x: dates,
    y: positiveCases,
    type: 'bar',
    name: 'Positive Cases',
    marker: {
      color: '#FF6969'
    }
  }, {
    x: dates,
    y: deaths,
    type: 'bar',
    name: 'Deaths',
    marker: {
      color: '#000000'
    }
  }, {
    x: dates,
    y: recoveries,
    type: 'bar',
    name: 'Recoveries',
    marker: {
      color: '#B9E9FC'
    }
  }];


  // Stacked bar graph layout
  var stackedBarLayout = {
    title: 'COVID-19 Data: Positive Cases, Deaths, and Recoveries ${selectedState}',
    xaxis: {
      title: 'Date',
      type: 'date',
      tickformat: '%d-%m-%Y'
    },
    yaxis: {
      title: 'Number of Cases'
    },
    barmode: 'stack'
  };


  // Creating the stacked bar graph
  Plotly.newPlot('stackedBarGraph', stackedBarData, stackedBarLayout);
}
