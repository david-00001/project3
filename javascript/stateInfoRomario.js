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

  console.log(stateData)
  // Scatter plot data
  var scatterData = [{
    x: dates,
    y: hospitalizations,
    mode: 'markers',
    type: 'scatter',
    name: 'Hospitalized Cumulative',
    marker: {
      color: '#e3a302',
      symbol: 'circle',
      size: 6
    }
  }];

  // Scatter plot layout
  var scatterLayout = {
    title: `Cumulative Hospitalizations in ${selectedState}`,
    paper_bgcolor:"rgb(215, 215, 215)",
    plot_bgcolor:"rgb(215, 215, 215)",
    xaxis: {
      title: 'Date',
      type: 'date',
      tickformat: '%d-%m-%Y'
    },
    yaxis: {
      title: 'Hospitalized Cumulative'
    },
    width: 700,
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
  y: positiveCases,
  type: 'scatter',
  mode: 'none',
  fill: 'tonexty',
  name: 'Positive Cases',
  line: {
    color: '#FF6969'
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
}];

// Area graph layout
var areaLayout = {
  title: `COVID-19 Spread in ${selectedState}`,
  paper_bgcolor:"rgb(215, 215, 215)",
  plot_bgcolor:"rgb(215, 215, 215)",
  xaxis: {
    title: 'Date',
    type: 'date',
    tickformat: '%d-%m-%Y'
  },
  yaxis: {
    title: 'Number of Cases'
  },
  width: 700,
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
      color: '#4bbcdb'
    }
  }];

  // Stacked bar graph layout
  var stackedBarLayout = {
    title: `COVID-19 Data: Positive Cases, Deaths, and Recoveries ${selectedState}`,
    xaxis: {
      title: 'Date',
      type: 'date',
      tickformat: '%d-%m-%Y'
    },
    yaxis: {
      title: 'Number of Cases'
    },
    barmode: 'stack',
    paper_bgcolor:"rgb(215, 215, 215)",
    plot_bgcolor:"rgb(215, 215, 215)",
  };

  // Creating the stacked bar graph
  Plotly.newPlot('stackedBarGraph', stackedBarData, stackedBarLayout);
}