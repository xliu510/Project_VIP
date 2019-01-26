from splinter import Browser
from bs4 import BeautifulSoup as bs
import time
import urllib.request
from urllib.request import urlopen

def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "chromedriver.exe"}
    return Browser("chrome", **executable_path, headless=False)


def scrape_info():
    browser = init_browser()

    # Visit Crypto Nasa website
   
    crypto_currency_news = "https://cointelegraph.com/tags/cryptocurrencies"
    browser.visit(crypto_currency_news)

    time.sleep(1)

    # Scrape page into Soup
    html_crypto = browser.html
    soup_crypto = bs(html_crypto, "html.parser")

    # Geting headline
    news_full = soup_crypto.select(".post-preview-item-inline__title-link")
    news_title1 = [x.text for x in news_full][0]

    news_full = soup_crypto.select(".post-preview-item-inline__title-link")
    news_title2 = [x.text for x in news_full][1]

    news_full = soup_crypto.select(".post-preview-item-inline__title-link")
    news_title3 = [x.text for x in news_full][2]

    news_full = soup_crypto.select(".post-preview-item-inline__title-link")
    news_title4 = [x.text for x in news_full][3]

    news_full = soup_crypto.select(".post-preview-item-inline__title-link")
    news_title5 = [x.text for x in news_full][4]


    news_t = soup_crypto.select(".post-preview-item-inline__text")
    news_paragraph1 = [x.text for x in news_t][0]

    news_t = soup_crypto.select(".post-preview-item-inline__text")
    news_paragraph2 = [x.text for x in news_t][1]    

    news_t = soup_crypto.select(".post-preview-item-inline__text")
    news_paragraph3 = [x.text for x in news_t][2]

    news_t = soup_crypto.select(".post-preview-item-inline__text")
    news_paragraph4 = [x.text for x in news_t][3]

    news_t = soup_crypto.select(".post-preview-item-inline__text")
    news_paragraph5 = [x.text for x in news_t][4]


    # Close the browser after scraping
    browser.quit()


    url = "https://cointelegraph.com/tags/cryptocurrencies"

    # Getting the webpage, creating a Response object.
    response = requests.get(url)

    # Extracting the source code of the page.
    data = response.text

    # Passing the source code to BeautifulSoup to create a BeautifulSoup object for it.
    soup = BeautifulSoup(data, 'lxml')

    # Extracting all the <a> tags into a list.
    tags = soup.select('.post-preview-item-inline__title-link')

    # Extracting URLs from the attribute href in the <a> tags.
    
    link_list = [tag.get("href") for tag in tags[0:5]]

    # Close the browser after scraping
    browser.quit()


    # Store data in a dictionary
    crypto_data = {
        "news_title1": news_title1,
        "news_paragraph1": news_paragraph1,
        "link_list1": link_list[0],
        "news_title2": news_title2,
        "news_paragraph2": news_paragraph2,
        "link_list2": link_list[1],        
        "news_title3": news_title3,
        "news_paragraph3": news_paragraph3,
        "link_list3": link_list[2],        
        "news_title4": news_title4,
        "news_paragraph4": news_paragraph4,
        "link_list4": link_list[3],
        "news_title5": news_title5,
        "news_paragraph5": news_paragraph5,
        "link_list5": link_list[4],

        }

    # Return results
    return crypto_data
