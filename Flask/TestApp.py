#from example 10.1
import pymysql
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
import pandas as pd
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


#Create Database (Make sure to change credentials & load SQL file)
 
Base = automap_base()
engine = create_engine('mysql://root:Maggie1ne@localhost:3306/CryptoStockAnalysis')
Base.prepare(engine, reflect=True)

Base.metadata

#Read Database - Tablenames 
engine.table_names()

#Setup Flask 

