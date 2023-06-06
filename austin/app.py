#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import json
import flask
from flask import Flask, jsonify


# In[2]:


csv = "race_data.csv"
df = pd.read_csv(csv)


# In[3]:


json_records = df.to_json(orient ='records')
json_records


# In[4]:


json_object = json.loads(json_records)
json_object


# In[5]:


app = flask.Flask(__name__)
app.config["DEBUG"] = True


# In[6]:


app = Flask(__name__)

@app.route("/api/v1.0/race-by-state")
def race_data():
    """Return Group 5's data as a json"""

    return jsonify(json_object)


# In[7]:


@app.route("/")
def welcome():
    return (
        f"Welcome to Group 5's Flask API<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/race-by-state<br/>"
    )
if __name__ == "__main__":
    app.run(debug=True, port=8000)


# In[ ]:




