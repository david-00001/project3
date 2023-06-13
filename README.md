# project3 - Tracking COVID in the US
## Team Members
Austin McClain, Carolyn Chu, David Rodgers, Romario Leal

## Objective
We wanted to create a dashboard that allowed a user to explore the spread of COVID in the US both geographically and by race/ethnicity.

## Tools used
JavaScript, D3, Plotly (charts and choropleth map), web scrapping, Flask, and a lot of CSS. We also used a JS library called RangeSlider



## Index files

index.html - Homepage of dashboard

Cases - Contains general charts about positive cases, deaths, and test results

Race/Ethnicity - Contains charts related to race/ethnicity

US Map - Contains map with slider



## JavaScript files

Javascript files are located in /javascript

stateInfo.js - Contains javascript for Cases page

stateInfoRace.js - This is a duplicate of the stateInfo.js that was designated for the race.html. With the structure of stateInfo.js, it was producing errors based on the page that was being viewed. This was the quickest solution without reformating everyone's code.

stateRace.js - Contains the javascript for the race.html charts

map_choropleth.js - Contains javascript for Plotly map and rangeslider



## race_data directory

covid_data.db- database for the two different datasets used for the Race/Ethnicity page

race_data.csv- data downloaded from https://covidtracking.com/race/about#download-the-data and cleaned in the race_data.ipynb kernel

race_data.ipynb- python script to clean downloaded data and to create a csv to be used with the database

sqlite.ipynb- python script that builds covid_data.db using race_data.csv and summary_stats.csv

state_pop.csv- csv containing the data scrapped in webscrapping.ipynb

state_summary.ipynb- script to clean data from state_pop.csv and create summary_stats.csv 

summary_stats.csv- script to merge the final data recorded for each state from race_data.csv with the population statistics in state_summary.csv

web_scrapping.ipynb- scrapping data from https://en.m.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_race/ethnicity and creates state_pop.csv



##flask app
app.py- creates a call from covid_data.db and adds data to a flask app.



## Resources Used
Used this article to understand how to use a set to contain unique values for dropdown and then to convert it into an array:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

Used this site to use the rangeslider js library and how to create it:
https://rangeslider.js.org/
https://www.w3schools.com/howto/howto_js_rangeslider.asp

Used this site to better understand layout in CSS:
https://codeburst.io/how-to-position-html-elements-side-by-side-with-css-e1fae72ddcc
