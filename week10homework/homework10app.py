import numpy as np

import re, string

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

import datetime as dt


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite", connect_args={'check_same_thread': False}, echo=True)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"<a href=/api/v1.0/precipitation>/api/v1.0/precipitation</a> --&gt Return a dictionary with date as key and prcp (precipitation) as value<br/>"
        f"<a href=/api/v1.0/stations>/api/v1.0/stations</a> --&gt Return a JSON list of stations<br/>"
        f"<a href=/api/v1.0/tobs>/api/v1.0/tobs</a>  --&gt Return a JSON list of tobs (Temperature Observations) for the previous year<br/>"
        f"<a href=/api/v1.0/20100101>/api/v1.0/&ltstart&gt</a> --&gt Return a JSON list of the minimum temperature, average temperature, and maximum temperature for a given start date in YYYYMMDD format<br/>"
        f"<a href=/api/v1.0/20100101/20170823>/api/v1.0/&ltstart&gt/&ltend&gt</a> --gt Return a JSON list of the minimum temperature, average temperature, and maximum temperature for given start and end dates in YYYYMMDD format"
    )


@app.route("/api/v1.0/precipitation")
def precipitation():
    """Return a dictionary with date as key and prcp (precipitation) as value"""
    # Query all dates
    results = session.query(Measurement.date, Measurement.prcp).all()

    # Convert list of tuples into normal list
    all_precipitation = list(np.ravel(results))

    return jsonify(all_precipitation)


@app.route("/api/v1.0/stations")
def stations():
    """Return a JSON list of stations"""
    # Query all stations
    results = session.query(Station.station).all()

    return jsonify(results)


@app.route("/api/v1.0/tobs")
def tobs():
    """Return a JSON list of tobs (Temperature Observations) for the previous year"""
    # Find last data point date, convert to string, remove non-digit characters using regex, format into datetime
    last_date = session.query(func.max(Measurement.date)).all()
    last_date_str = re.sub(r'\D', '', str(last_date))
    last_date_frmt = dt.datetime.strptime(last_date_str, "%Y%m%d")

    # Calculate 1 year prior to last
    query_date = last_date_frmt - dt.timedelta(days=365)

    # Query to retreve dates and tobs

    results = session.query(Measurement.date, Measurement.tobs).\
    filter(Measurement.date >= query_date).\
    all()

    # Return JSON list of tobs for previous year

    return jsonify(results)

@app.route("/api/v1.0/<start>")
def startdate(start):
    """Return a JSON list of the minimum temperature, average temperature, and maximum temperature for a given start date in YYYYMMDD format"""

    # Query for results and filter according to date
    
    sel =[func.min(Measurement.tobs), 
          func.avg(Measurement.tobs), 
          func.max(Measurement.tobs)]
    results = session.query(*sel).\
              filter(func.strftime("%Y%m%d", Measurement.date) >= start).all()

    # Return JSON list of tobs

    return jsonify(results)

@app.route("/api/v1.0/<start>/<end>")
def startenddate(start, end):
    """Return a JSON list of the minimum temperature, average temperature, and maximum temperature for given start and end dates in YYYYMMDD format"""

# Query for results and filter according to date
    
    sel =[func.min(Measurement.tobs), 
          func.avg(Measurement.tobs), 
          func.max(Measurement.tobs)]
    results = session.query(*sel).\
              filter(func.strftime("%Y%m%d", Measurement.date) >= start).\
              filter(func.strftime("%Y%m%d", Measurement.date) <= end).all()

    # Return JSON list of tobs

    return jsonify(results)



if __name__ == '__main__':
    app.run(host='192.168.1.118', port='5000', debug=True)
    #app.run(debug=True)
