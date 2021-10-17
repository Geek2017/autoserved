from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from joblib import load
from dotenv import load_dotenv
import os
from waitress import serve
load_dotenv()

app = Flask(__name__)

PORT=5000
# HOST = os.environ.get("HOST_NAME")
pipe = load('ml_classifier.joblib')

@app.route("/")
def hello():
    return "Hello, World!"

@app.route("/recommend", methods=["POST"])
def score_inputs():
    auth_token = request.headers.get('Authorization')
    if auth_token != "Bearer {}".format(os.environ['SECRET_TOKEN']):
      return jsonify({ "status": "Unauthorized" }), 401

    serv_cats = ['Accessories (Gauges, Power Accessories, Vision & Air Bag)', 'Brakes',
       'Change Oil', 'Complete Vehicle Inspection', 'Cooling System',
       'Drive Train (Final Drive, Transaxle, Differential & Transfer Case)',
       'Driveability (Fuel, Ignition & Emission Systems)',
       'Electrical (Belts, Lighting, Starting & Charging Systems)', 'Engine',
       'Engine Oil / Oil Filter', 'Fuel Filter / Air Filter',
       'HVAC (Heating, Ventilation & Air Conditioning)',
       'Major Preventive Maintenance Service',
       'Minor Preventive Maintenance Service', 'Tires & Wheels',
       'Transmission & Clutch']

    content = request.json
    samp = content["values"]
    input_series = pd.Series(samp, index=['Make', 'Year', 'Model', 'Mileage In'])
    input_to_df = input_series.values.reshape(1,4)
    input_df = pd.DataFrame(input_to_df, columns=['Make', 'Year', 'Model', 'Mileage In'])
    print(input_df)
    result = pipe.predict(input_df).todense().tolist()
    print(result)
    binar = np.array(result).reshape(-1)
    result_df = pd.DataFrame({"binar":binar, "serv_cats":serv_cats})
    recomms = result_df[ result_df['binar']==1 ]['serv_cats'].values.tolist()

    return jsonify({"result": recomms})

if __name__ == '__main__':
  serve(app,port=PORT, host='0.0.0.0')
