#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import json
import flask
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import sqlite3


# In[2]:


conn = sqlite3.connect('race_data/covid_data.db')
c = conn.cursor()
race_df = pd.read_sql_query("SELECT * FROM state_race",conn)
state_df = pd.read_sql_query("SELECT * FROM state_summary",conn)

# In[3]:


json_race = race_df.to_json(orient ='records')
json_state = state_df.to_json(orient='records')


# In[4]:


race_object = json.loads(json_race)
state_object = json.loads(json_state)


# In[5]:


app = flask.Flask(__name__)
app.config["DEBUG"] = True


# In[6]:


app = Flask(__name__)
CORS(app)

@app.route("/api/v1.0/race-by-state")
def race_data():
    """Return Group 5's data as a json"""

    return jsonify(race_object)

@app.route("/api/v1.0/state-stats")
def state_data():
    """Return Group 5's data as a json"""

    return jsonify(state_object)

# In[7]:


@app.route("/")
def welcome():
    return (
        f"Welcome to Group 5's Flask API<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/race-by-state<br/>"
        f"/api/v1.0/state-stats"
    )
if __name__ == "__main__":
    app.run(debug=True)


# In[ ]:




