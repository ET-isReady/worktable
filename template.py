# remember to use python3 or pip3 since you have a mac


# username: etbermuda1@gmail.com
# password: plumkitteN635!


import os
import time
import datetime
from collections import namedtuple
from selenium import webdriver 
from selenium.webdriver.chrome.service import Service 
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By 
from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import ElementNotInteractableException 
from bs4 import BeautifulSoup 
import pandas as pd


user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'


# https://sites.google.com/chromium.org/driver/


service = Service(executable_path="/Users/erictenaya/Desktop/NovelBot/chromedriver")
chrome_option = Options()
chrome_option.add_argument('general.useragent.override')
driver = webdriver.Chrome(service=service, options=chrome_option)
driver.implicitly_wait(7)


driver.get('https://boise.craigslist.org/')


# click a hyperlink
# class_element = driver.find_element(By.CLASS_NAME, 'cl-goto-account')
# class_element.click()


# alternatively you may use 'XPATH' to find any html element
xpath_element = driver.find_element(By.XPATH, "//a[@data-alltitle='all for sale']")


# print(class_element.text)
# print(class_element.location)
# print(class_element.is_enabled())


xpath_element.click()


# select from dropdown
dropdown_arrow = driver.find_element(By.CLASS_NAME, 'bd-arrow-down')
dropdown_arrow.click()


# select city from dropdown
select_city = driver.find_element(By.CLASS_NAME, 'elko')
select_city.click()


# select computers from dropdown
dropdown_arrow = driver.find_element(By.CLASS_NAME, "sss")
dropdown_arrow.click()




element = driver.find_element(By.XPATH, "//*[text()='all']")
element.click()
product = driver.find_element(By.XPATH, "//*[text()='computers']")
product.click()
time.sleep(2)
# search query (enter your info into the search box)
search_query = 'laptop'
specific_product = driver.find_element(By.XPATH, "//input[@enterkeyhint='search']")
specific_product.clear()
specific_product.send_keys(search_query)
time.sleep(2)
specific_product.send_keys(Keys.ENTER)




driver.close()