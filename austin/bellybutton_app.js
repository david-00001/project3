//Data source URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
//Calling the initial function
init();

//Function to set the dashbaord
function init() {
    //Data pull
    d3.json(url).then(function(data) {
        console.log(data.metadata);
        
        //for drop down menu
        let ids = data.names;
        dropDown(ids);
        //initial ID
        let firstId = ids[0];
        //Dashboard object functions
        demoInfo(firstId);
        bar(firstId);
        bubble(firstId);
        guage(firstId);
       
      });
}

//Creating the drop down
function dropDown(ids) {
    //locating the dropdown HTML element
    var selectData = document.getElementById("selDataset");

    //for loop to add each id to the drop down
    for(let i = 0; i<ids.length; i++) {
        let opt = ids[i];
        let el = document.createElement("option");
        el.textContent = String(opt);
        el.value = opt;
        selectData.appendChild(el);
    }
}

//creating the bar graph
function bar(id) {
    d3.json(url).then(function(data) {
        //drilling to the correct data
        let samples = data.samples;
        //filter data by ID
        let r = samples.filter(s => s.id==id);
        let r1 = r[0];
        //identifying variables of bar graph
        let otu_ids = r1.otu_ids;
        let otu_labels = r1.otu_labels;
        let sample_values = r1.sample_values;

        trace1 = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).reverse().map(id => `OTU ${id}`),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h",
        }
        
        traceData = [trace1]
    
        let layout = {
            title: "Top 10 OTUs Found"
        }

        Plotly.newPlot("bar",traceData, layout)
    })
}

//reading when the dropdown changes
function optionChanged(option) {
    console.log(option);
    //calling dashboard functions and running the new ID selection through
    demoInfo(option);
    bar(option);
    bubble(option);
    guage(option);
}

//filtering and adding demographic data
function demoInfo (id) {
    d3.json(url).then(function(data) {
        //identifying correct data
        let participants = data.metadata;
        //filter by ID
        let r = participants.filter(s => s.id==id);
        let r1 = r[0];
        //locating the HTML id location
        let p = d3.select("#sample-metadata");
        p.html("");
        //adding all the elements of the demographic data
        for(k in r1) {
            p.append("h6").text(`${k.toUpperCase()}: ${r1[k]}`);
        }
    })
}
//filtering data and creating bubble chart
function bubble (id) {
    d3.json(url).then(function(data) {
        let samples = data.samples;
        let r = samples.filter(s => s.id==id);
        let r1 = r[0];
        let otu_ids = r1.otu_ids;
        let otu_labels = r1.otu_labels;
        let sample_values = r1.sample_values;

        trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            }
        }
        
        traceData = [trace1]
    
        let layout = {
            title: "Samples"
        }

        Plotly.newPlot("bubble",traceData, layout)
    })
}

//creating bubble chart
function guage (id) {
    d3.json(url).then(function(data) {
        let samples = data.metadata;
        let r = samples.filter(s => s.id==id);
        let r1 = r[0];
        let wfreq = r1.wfreq;
        

        var data = [
            {
              value: wfreq,
              title: { text: "Belly Button Washing Frequency" },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9],
                    tickmode: "array",
                    tickval: [1,2,3,4,5,6,7,8,9],
                    ticktext: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9"]
                    
                },
                steps: [
                  { range: [0, 1], color: "rgb(255, 255, 255)", label:"0-1" },
                  { range: [1, 2], color: "rgb(232, 226, 202)" },
                  { range: [2, 3], color: "#B4C424" },
                  { range: [3, 4], color: "#8A9A5B" },
                  { range: [4, 5], color: "#C1E1C1" },
                  { range: [5, 6], color: "#AFE1AF" },
                  { range: [6, 7], color: "gray" },
                  { range: [7, 8], color: "#4CBB17" },
                  { range: [8, 9], color: "rgb(14, 127, 0)" },
                ],
              }
            }
          ];
        
    
        let layout = {
            title: "Samples"
        }

        Plotly.newPlot("gauge",data, layout)
    })    
}