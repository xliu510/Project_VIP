from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_crypto

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/weather_app")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    full_data = mongo.db.collection.find_one()

    # Return template and data
    return render_template("index.html", crypto=full_data)


# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Run the scrape function
    crypto_data = scrape_crypto.scrape_info()

    # Update the Mongo database using update and upsert=True
    mongo.db.collection.update({}, crypto_data, upsert=True)

    # Redirect back to home page
    return redirect("/")




@app.route("/Crypto/<my_currency>/<currency_page>")
def render_currency_info(my_currency,currency_page):
    # Find one record of data from the mongo database
    full_data = mongo.db.collection.find_one()
    my_dict = {"data":full_data,
        "currency":my_currency,
        "currency_page":currency_page,
        "js_file_name": my_currency + "_app.js"}
    # Return template and data
    return render_template("currency_template.html", crypto=my_dict)


if __name__ == "__main__":
    app.run(debug=True)
