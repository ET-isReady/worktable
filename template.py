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
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
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


class_element = driver.find_element(By.CLASS_NAME, 'cl-goto-account')
class_element.click()
time.sleep(2)


enter_email = driver.find_element(By.ID, 'inputEmailHandle')
email_address = 'etbermuda1@gmail.com'
enter_email.clear()
enter_email.send_keys(email_address)
time.sleep(3)


enter_password = driver.find_element(By.ID, 'inputPassword')
password_text = 'plumkitteN635!'
enter_password.clear()
enter_password.send_keys(password_text)
time.sleep(3)


login = driver.find_element(By.ID, 'login')
login.click()
time.sleep(1)


# verify_login = driver.find_element(By.CLASS_NAME, 'submit-onetime-link-button')
# verify_login.click()
# time.sleep(3)


# driver.get('https://mail.google.com/mail/u/1/#inbox')


make_post = driver.find_element(By.CLASS_NAME, 'postinglist-new-post')
make_post.click()
time.sleep(2)




click_forsale = driver.find_element(By.XPATH, "//input[@value='fso']")
click_forsale.click()
time.sleep(2)


click_forsale = driver.find_element(By.XPATH, "//input[@value='92']")
click_forsale.click()
time.sleep(2)


post_title = driver.find_element(By.ID, 'PostingTitle')
post_text = 'New Idaho 4/Moscow Murders True Crime Noir Novel -- Free!'
post_title.clear()
post_title.send_keys(post_text)
time.sleep(3)




click_price = driver.find_element(By.XPATH, "//input[@name='price']")
click_price.click()
price = '0'
click_price.send_keys(price)
time.sleep(2)


enter_zipcode = driver.find_element(By.ID, 'postal_code')
zipcode = '83706'
enter_zipcode.clear()
enter_zipcode.send_keys(zipcode)
time.sleep(3)


enter_description = driver.find_element(By.ID, 'PostingBody')
description = "New true-crime literary noir novel 'Visual Snow' based on the real-life Idaho 4/Moscow Murders that happened in Moscow, Idaho in 2022. The case is still ongoing, it's trial date set for August 2025. You may read the novel for FREE here: <a href='https://idaho4novel.com'>www.idaho4novel.com</a>"
enter_description.clear()
enter_description.send_keys(description)
time.sleep(10)


submit1 = driver.find_element(By.CLASS_NAME, 'submit-button')
submit1.click()
time.sleep(2)


no_price = driver.find_element(By.XPATH, "//input[@name='why_no_price']")
no_price.click()
time.sleep(2)




# find by visible text
pick1 = driver.find_element(By.XPATH, "//*[text()='continue']")
pick1.click()
time.sleep(2)


pick2 = driver.find_element(By.XPATH, "//*[text()='continue']")
pick2.click()
time.sleep(5)


# IF YOU WANT TO GO CLASSIC, USE THE BELOW CODE
# classic = driver.find_element(By.ID, 'classic')
# classic.click()
# time.sleep(2)


# IF YOU WANT TO GO CLASSIC, DELETE THE BELOW CODE
add_button = driver.find_element(By.ID, 'plupload')
add_button.click()


# DO NOT DELETE THE CODE BELOW, NO MATTER WHAT
upload_image = driver.find_element(By.XPATH, "//input[@type='file']")
image_path = "/Users/erictenaya/Desktop/NovelBot/Idaho4Poster_Dark.jpg"
upload_image.send_keys(image_path)
time.sleep(5)


done_image = driver.find_element(By.ID, 'doneWithImages')
done_image.click()
time.sleep(2)


publish = driver.find_element(By.XPATH, "//*[text()='publish']")
publish.click()




time.sleep(5)




driver.close()


# username: etbermuda1@gmail.com
# password: plumkitteN635!


# posting title
# New Idaho 4/Moscow Murders True Crime Noir Novel -- Free!


# price
# 0


# ZIP code
# 83706


# description
# New true-crime literary noir novel 'Visual Snow' based on the real-life Idaho 4/Moscow Murders that happened in Moscow, Idaho in 2022. The case is still ongoing, it's trial date set for August 2025. You may read the novel for FREE here: https://idaho4novel.com


# Image absolute path
# /Users/erictenaya/Desktop/NovelBot/Idaho4Poster_Light.jpg
