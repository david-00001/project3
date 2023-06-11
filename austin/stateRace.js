function raceCases (state){
  fetch('http://127.0.0.1:5000/api/v1.0/race-by-state')
    .then(function (response) {
      return response.json();
    }).then(function (text) {
      
      
      let r = text.filter(s => s.State == state); 
      let r1 = r[1];
      // let date = r1.Date;
      // let casesAsian = r1.Cases_Asian;

      let date = [];
      let casesAsian = [];
      let casesBlack = [];
      let casesWhite = [];
      let casesLatinx = [];
      let casesNative = [];
      let casesPacificIslander = [];
      for(i in r) {
        
        date.push(r[i].Date);
        casesAsian.push(r[i].Cases_Asian)
        casesBlack.push(r[i].Cases_Black)
        casesWhite.push(r[i].Cases_White)
        casesLatinx.push(r[i].Cases_Latinx)
        casesNative.push(r[i].Cases_AIAN)
        casesPacificIslander.push(r[i].Cases_NHPI)
      }




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

      traceData = [trace1,trace2,trace3,trace4,trace5,trace6]

      let layout = {
        title: "Cases by Race",
        width: 700,
        height: 400,
        paper_bgcolor:"rgb(215, 215, 215)",
        plot_bgcolor:"rgb(215, 215, 215)",
      }

      Plotly.newPlot("raceCase",traceData,layout)
    });
}


function raceDeath (state){
  fetch('http://127.0.0.1:5000/api/v1.0/race-by-state')
    .then(function (response) {
      return response.json();
    }).then(function (text) {
      
      
      let r = text.filter(s => s.State == state); 
      let r1 = r[1];
      // let date = r1.Date;
      // let casesAsian = r1.Cases_Asian;

      let date = [];
      let deathsAsian = [];
      let deathsBlack = [];
      let deathsWhite = [];
      let deathsLatinx = [];
      let deathsNative = [];
      let deathsPacificIslander = [];
      for(i in r) {
        
        date.push(r[i].Date);
        deathsAsian.push(r[i].Deaths_Asian)
        deathsBlack.push(r[i].Deaths_Black)
        deathsWhite.push(r[i].Deaths_White)
        deathsLatinx.push(r[i].Deaths_Latinx)
        deathsNative.push(r[i].Deaths_AIAN)
        deathsPacificIslander.push(r[i].Deaths_NHPI)
      }




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

      traceData = [trace1,trace2,trace3,trace4,trace5,trace6]

      let layout = {
        title: "Deaths by Race",
        width: 700,
        height: 400,
        paper_bgcolor:"rgb(215, 215, 215))",
        plot_bgcolor:"rgb(215, 215, 215)",
        
      }

      Plotly.newPlot("raceDeath",traceData,layout)
    });
}

function stackedBar (state){
  fetch('http://127.0.0.1:5000/api/v1.0/state-stats')
    .then(function (response) {
      return response.json();
    }).then(function (text) {
      
      let r = text.filter(s => s.State == state)[0]
      // let asianTotal = r.Asian_Cases_per + r.Asian_Deaths_per + r.Asian_per
      let asianCases = r.Asian_Cases_per
      let asianDeaths = r.Asian_Deaths_per
      let asianPop = r.Asian_per

      // let blackTotal = r.Black_Cases_per + r.Black_Deaths_per + r.Black_per
      let blackCases = r.Black_Cases_per
      let blackDeaths = r.Black_Deaths_per
      let blackPop = r.Black_per

      // let whiteTotal = r.White_Cases_per + r.White_Deaths_per + r.White_per
      let whiteCases = r.White_Cases_per
      let whiteDeaths = r.White_Deaths_per
      let whitePop = r.White_per

      let latinxCases = r.Latinx_Cases_per
      let latinxDeaths = r.Latinx_Deaths_per
      let latinxPop = r.Latinx_per

      let nativCases = r.Native_Cases_per
      let nativeDeaths = r.Native_Deaths_per
      let nativePop = r.Native_American_or_Alaskan_Native_per

      let piCases = r.Pacific_Islander_Cases_per
      let piDeaths = r.Pacific_Islander_Deaths_per
      let piPop = r.Pacific_Islander_per

      let otherCases = 1 - (whiteCases+blackCases+asianCases+latinxCases+nativCases+piCases)
      let otherDeaths = 1 - (whiteDeaths+blackDeaths+asianDeaths+latinxDeaths+nativeDeaths+piDeaths)
      let otherPop = 1 - (whitePop+blackPop+asianPop+latinxPop+nativePop+piPop)


      trace1 = {
        x: [whiteDeaths, whiteCases, whitePop],
        y: ["Deaths", "Cases","Population"],
        type: "bar",
        name: "White", 
        // xaxis: 'x1',
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'green'}
      }

      trace2 = {
        x: [blackDeaths, blackCases, blackPop],
        y: ["Deaths", "Cases", "Population"],
        type: "bar",
        name: "Black", 
        // xaxis: 'x1',
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'orange'}
      }

      trace3 = {
        x: [asianDeaths, asianCases, asianPop],
        y: ["Deaths", "Cases", "Population"],
        type: "bar",
        name: "Asian", 
        // xaxis: 'x1',
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'blue'}
      }

      trace4 = {
        x: [latinxDeaths, latinxCases, latinxPop],
        y: ["Deaths", "Cases", "Population"],
        type: "bar",
        name: "Latinx", 
        // xaxis: 'x1',
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'redorange'}
      }

      trace5 = {
        x: [nativeDeaths, nativCases, nativePop],
        y: ["Deaths", "Cases", "Population"],
        type: "bar",
        name: "Native American or Alaskan Native", 
        // xaxis: 'x1',
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'purple'}
      }

      trace6 = {
        x: [piDeaths, piCases, piPop],
        y: ["Deaths", "Cases", "Population"],
        type: "bar",
        name: "Pacific Islander", 
        // xaxis: 'x1',
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'rgb(138, 100, 62)'}
      }

      trace7 = {
        x: [otherDeaths, otherCases, otherPop],
        y: ["Deaths", "Cases", "Population"],
        type: "bar",
        name: "Other/Mixed/Unknown", 
        // xaxis: 'x1',
        barmode: 'stack',
        orientation: "h", 
        marker: {color: 'gray'}
      }

      traceData = [trace1,trace2,trace3,trace4,trace5,trace6,trace7]

      let layout = {
        title: "Population Percentages",
        barmode: "stack",
        xaxis: {tickformat: '%'},
        paper_bgcolor: "rgb(215, 215, 215)",
        plot_bgcolor: "rgb(215, 215, 215)",
        height: 400,
        // yaxis: {
        //   domain: [0, 0.33],
        //   anchor: 'x1', 
        // }
      }

      Plotly.newPlot("stateSummary",traceData,layout)

    })
}