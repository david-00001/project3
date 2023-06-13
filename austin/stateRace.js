// cases line graph based on race
function raceCases (state){
  // calling the data from flask app
  fetch('http://127.0.0.1:5000/api/v1.0/race-by-state')
    .then(function (response) {
      return response.json();
    }).then(function (text) {
      
      // filtering by state
      let r = text.filter(s => s.State == state); 
            
      // setting the variables
      let date = [];
      let casesAsian = [];
      let casesBlack = [];
      let casesWhite = [];
      let casesLatinx = [];
      let casesNative = [];
      let casesPacificIslander = [];
      
      // for loop to get all the dates and race data
      for(i in r) {
        date.push(r[i].Date);
        casesAsian.push(r[i].Cases_Asian)
        casesBlack.push(r[i].Cases_Black)
        casesWhite.push(r[i].Cases_White)
        casesLatinx.push(r[i].Cases_Latinx)
        casesNative.push(r[i].Cases_AIAN)
        casesPacificIslander.push(r[i].Cases_NHPI)
      }



      // building the lines for the chart
      trace1 = {
        x: date,
        y: casesAsian,
        name: "Asian",
        type: "scatter",
        mode: "lines",
      }
      trace2 = {
        x: date,
        y: casesBlack,
        name: "Black",
        type: "scatter",
        mode: "lines",
      }
      trace3 = {
        x: date,
        y: casesWhite,
        name: "White",
        type: "scatter",
        mode: "lines",
      }
      trace4 = {
        x: date,
        y: casesLatinx,
        name: "Latinx",
        type: "scatter",
        mode: "lines",
      }
      trace5 = {
        x: date,
        y: casesNative,
        name: "Native American/Alaskan Native",
        type: "scatter",
        mode: "lines",
      }
      trace6 = {
        x: date,
        y: casesPacificIslander,
        name: "Native Hawaiian/Pacific Islander",
        type: "scatter",
        mode: "lines",
      }

      // creating the variable that contains all the lines
      traceData = [trace1,trace2,trace3,trace4,trace5,trace6]

      // defining the layout of chart
      let layout = {
        title: "Cases by Race",
        width: 700,
        height: 400,
        paper_bgcolor:"rgb(215, 215, 215)",
        plot_bgcolor:"rgb(215, 215, 215)",
      }

      // add the chart to the HTML
      Plotly.newPlot("raceCase",traceData,layout)
    });
}

// deaths line graph based on race
function raceDeath (state){
  // fetching data from flask app
  fetch('http://127.0.0.1:5000/api/v1.0/race-by-state')
    .then(function (response) {
      return response.json();
    }).then(function (text) {
      // filter by state
      let r = text.filter(s => s.State == state); 
      
      // creating the variables
      let date = [];
      let deathsAsian = [];
      let deathsBlack = [];
      let deathsWhite = [];
      let deathsLatinx = [];
      let deathsNative = [];
      let deathsPacificIslander = [];
      
      // for loop to get the dates and race data
      for(i in r) {
        date.push(r[i].Date);
        deathsAsian.push(r[i].Deaths_Asian)
        deathsBlack.push(r[i].Deaths_Black)
        deathsWhite.push(r[i].Deaths_White)
        deathsLatinx.push(r[i].Deaths_Latinx)
        deathsNative.push(r[i].Deaths_AIAN)
        deathsPacificIslander.push(r[i].Deaths_NHPI)
      }



      // building the lines for the chart
      trace1 = {
        x: date,
        y: deathsAsian,
        name: "Asian",
        type: "scatter",
        mode: "lines",
      }
      trace2 = {
        x: date,
        y: deathsBlack,
        name: "Black",
        type: "scatter",
        mode: "lines",
      }
      trace3 = {
        x: date,
        y: deathsWhite,
        name: "White",
        type: "scatter",
        mode: "lines",
      }
      trace4 = {
        x: date,
        y: deathsLatinx,
        name: "Latinx",
        type: "scatter",
        mode: "lines",
      }
      trace5 = {
        x: date,
        y: deathsNative,
        name: "Native American/Alaskan Native",
        type: "scatter",
        mode: "lines",
      }
      trace6 = {
        x: date,
        y: deathsPacificIslander,
        name: "Native Hawaiian/Pacific Islander",
        type: "scatter",
        mode: "lines",
      }

      // variable that contains all the lines
      traceData = [trace1,trace2,trace3,trace4,trace5,trace6]

      // defining the layout of chart
      let layout = {
        title: "Deaths by Race",
        width: 700,
        height: 400,
        paper_bgcolor:"rgb(215, 215, 215))",
        plot_bgcolor:"rgb(215, 215, 215)",
        
      }

      // adding the chart to the HTML
      Plotly.newPlot("raceDeath",traceData,layout)
    });
}

// stacked bar graph comparing proportions of population/cased/deaths based on race
function stackedBar (state){
  // fetching the state summary stat data from the flask app
  fetch('http://127.0.0.1:5000/api/v1.0/state-stats')
    .then(function (response) {
      return response.json();
    }).then(function (text) {
      
      // filter by state
      let r = text.filter(s => s.State == state)[0]

      // data for Asian
      let asianCases = r.Asian_Cases_per
      let asianDeaths = r.Asian_Deaths_per
      let asianPop = r.Asian_per

      // data for black
      let blackCases = r.Black_Cases_per
      let blackDeaths = r.Black_Deaths_per
      let blackPop = r.Black_per

      // data for white
      let whiteCases = r.White_Cases_per
      let whiteDeaths = r.White_Deaths_per
      let whitePop = r.White_per

      // data for Latinx
      let latinxCases = r.Latinx_Cases_per
      let latinxDeaths = r.Latinx_Deaths_per
      let latinxPop = r.Latinx_per

      // data for Native
      let nativCases = r.Native_Cases_per
      let nativeDeaths = r.Native_Deaths_per
      let nativePop = r.Native_American_or_Alaskan_Native_per

      // data for Pacific Islander
      let piCases = r.Pacific_Islander_Cases_per
      let piDeaths = r.Pacific_Islander_Deaths_per
      let piPop = r.Pacific_Islander_per

      // data for other/mixed/unknown
      let otherCases = 1 - (whiteCases+blackCases+asianCases+latinxCases+nativCases+piCases)
      let otherDeaths = 1 - (whiteDeaths+blackDeaths+asianDeaths+latinxDeaths+nativeDeaths+piDeaths)
      let otherPop = 1 - (whitePop+blackPop+asianPop+latinxPop+nativePop+piPop)


      // data for all the stacked bars
      trace1 = {
        x: [whiteDeaths, whiteCases, whitePop],
        y: ["Deaths", "Cases","Population"],
        type: "bar",
        name: "White", 
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'green'}
      }

      trace2 = {
        x: [blackDeaths, blackCases, blackPop],
        y: ["Deaths", "Cases", "Population"],
        type: "bar",
        name: "Black", 
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'orange'}
      }

      trace3 = {
        x: [asianDeaths, asianCases, asianPop],
        y: ["Deaths", "Cases", "Population"],
        type: "bar",
        name: "Asian", 
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'blue'}
      }

      trace4 = {
        x: [latinxDeaths, latinxCases, latinxPop],
        y: ["Deaths", "Cases", "Population"],
        type: "bar",
        name: "Latinx",
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'redorange'}
      }

      trace5 = {
        x: [nativeDeaths, nativCases, nativePop],
        y: ["Deaths", "Cases", "Population"],
        type: "bar",
        name: "Native American or Alaskan Native", 
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'purple'}
      }

      trace6 = {
        x: [piDeaths, piCases, piPop],
        y: ["Deaths", "Cases", "Population"],
        type: "bar",
        name: "Pacific Islander", 
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'rgb(138, 100, 62)'}
      }

      trace7 = {
        x: [otherDeaths, otherCases, otherPop],
        y: ["Deaths", "Cases", "Population"],
        type: "bar",
        name: "Other/Mixed/Unknown", 
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'gray'}
      }

      // variable for stacked bars
      traceData = [trace1,trace2,trace3,trace4,trace5,trace6,trace7]

      // defining layout
      let layout = {
        title: "Population Percentages",
        barmode: "stack",
        xaxis: {tickformat: '%'},
        paper_bgcolor: "rgb(215, 215, 215)",
        plot_bgcolor: "rgb(215, 215, 215)",
        height: 400,
      }

      // adding chart to HTML
      Plotly.newPlot("stateSummary",traceData,layout)

    })
}

// cases line graph based on ethnicity
function hispanicCases (state){
  // calling the data from flask app
  fetch('http://127.0.0.1:5000/api/v1.0/race-by-state')
    .then(function (response) {
      return response.json();
    }).then(function (text) {
      
      // filtering by state
      let r = text.filter(s => s.State == state); 
            
      // setting the variables
      let date = [];
      let hispanic = [];
      let nonHispanic = [];
      let unknown = [];
      
      
      // for loop to get all the dates and race data
      for(i in r) {
        date.push(r[i].Date);
        hispanic.push(r[i].Cases_Ethnicity_Hispanic)
        nonHispanic.push(r[i].Cases_Ethnicity_NonHispanic)
        unknown.push(r[i].Cases_Ethnicity_Unknown)
        
      }



      // building the lines for the chart
      trace1 = {
        x: date,
        y: hispanic,
        name: "Hispanic",
        type: "scatter",
        mode: "lines",
      }
      trace2 = {
        x: date,
        y: nonHispanic,
        name: "Non-Hispanic",
        type: "scatter",
        mode: "lines",
      }
      trace3 = {
        x: date,
        y: unknown,
        name: "Unknown",
        type: "scatter",
        mode: "lines",
      }
      

      // creating the variable that contains all the lines
      traceData = [trace1,trace2,trace3]

      // defining the layout of chart
      let layout = {
        title: "Cases by Ethnicity",
        width: 700,
        height: 400,
        paper_bgcolor:"rgb(215, 215, 215)",
        plot_bgcolor:"rgb(215, 215, 215)",
      }

      // add the chart to the HTML
      Plotly.newPlot("ethnicityCase",traceData,layout)
    });
}

// deaths line graph based on ethnicity
function hispanicDeath (state){
  // fetching data from flask app
  fetch('http://127.0.0.1:5000/api/v1.0/race-by-state')
    .then(function (response) {
      return response.json();
    }).then(function (text) {
      // filter by state
      let r = text.filter(s => s.State == state); 
      
      // creating the variables
      let date = [];
      let hispanic = [];
      let nonHispanic = [];
      let unknown = [];
      
      
      // for loop to get the dates and ethnicity data
      for(i in r) {
        date.push(r[i].Date);
        hispanic.push(r[i].Deaths_Ethnicity_Hispanic)
        nonHispanic.push(r[i].Deaths_Ethnicity_NonHispanic)
        unknown.push(r[i].Deaths_Ethnicity_Unknown)
        
      }



      // building the lines for the chart
      trace1 = {
        x: date,
        y: hispanic,
        name: "Hispanic",
        type: "scatter",
        mode: "lines",
      }
      trace2 = {
        x: date,
        y: nonHispanic,
        name: "Non-Hispanic",
        type: "scatter",
        mode: "lines",
      }
      trace3 = {
        x: date,
        y: unknown,
        name: "Unknown",
        type: "scatter",
        mode: "lines",
      }
    

      // variable that contains all the lines
      traceData = [trace1,trace2,trace3]

      // defining the layout of chart
      let layout = {
        title: "Deaths by Ethnicity",
        width: 700,
        height: 400,
        paper_bgcolor:"rgb(215, 215, 215))",
        plot_bgcolor:"rgb(215, 215, 215)",
        
      }

      // adding the chart to the HTML
      Plotly.newPlot("ethnicityDeath",traceData,layout)
    });
}