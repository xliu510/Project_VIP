#from example 10.1
import pymysql
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, Column, Integer, String, ForeignKey
#More fun Modules 
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy
from config import Config
app = Flask(__name__)

#connect to Database 
#https://docs.sqlalchemy.org/en/latest/core/engines.html
import pymysql
pymysql.install_as_MySQLdb()
engine = create_engine('mysql://root:Maggie1ne@localhost:3306/CryptoStockAnalysis')
#Session.configure(bind=engine)
#SQLDataBase = engine.execute("SELECT * FROM currency_daily_btc_usd")
#for record in SQLDataBase:
 #    print(record)
#app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/data.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = "False"
app.config['SQLALCHEMY_DATABASE_URI'] = engine
db = SQLAlchemy(app)

class data(db.Model):
    __tablename__= 'data'
    
    id = db.Column(db.Integer, primary_key=True)
    Date = db.Column(db.Integer)
    Open = db.Column(db.Integer)
    High = db.Column(db.Integer)
    Low = db.Column(db.Integer)
    Close = db.Column(db.Integer)
    Volume = db.Column(db.Integer)
    Market_Cap = db.Column(db.Integer)
    def __repr__(self):
        return '<data %r>' % (self.nickname)

@app.before_first_request
def setup():
    db.create_all()

@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)






