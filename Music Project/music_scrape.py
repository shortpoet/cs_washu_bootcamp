# Import Splinter and BeautifulSoup
from splinter import Browser
from bs4 import BeautifulSoup as bs
import pandas as pd
import pymongo
from pprint import pprint
from datetime import datetime
import re

def dateFixer(str):
    date_list = []
    str = re.sub(r'[.]', ':', str)
    parts = str.split()
    parts[2] = parts[2].strip("stndrh")
    str = " ".join(parts)
    date = re.search(r'^(.*?)\d\d\d\d', str).group(0)
    start_time = re.search(r'.+?(?=–)', str).group(0)
    end_time = date + " " + re.search(r'(?<=–).*', str).group(0)
    start_dt_obj = datetime.strptime(start_time, '%a %b %d %Y %I:%M%p')
    end_dt_obj = datetime.strptime(end_time, '%a %b %d %Y %I:%M%p')
    date_list.append(start_time)
    date_list.append(start_dt_obj)
    date_list.append(end_time)
    date_list.append(end_dt_obj)
    return date_list

executable_path = {'executable_path': '/Users/soria/Anaconda3/Scripts/chromedriver'}
browser = Browser('chrome', **executable_path)

# Get genres of each program and write to dictionary, match character cases
url = 'http://kdhx.org/shows/schedule'
browser.visit(url)
browser.is_element_present_by_css("p.plhead", wait_time=1)

html = browser.html
schedule_soup = bs(html, 'html.parser')

weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
kdhx_genres = {}
for day in weekdays:
    schedule = schedule_soup.find('div', class_='day', dow=day).find_all('a')
    program_list = []
    for item in schedule:
        program = item.find('div', class_='show-title').find('span', style='margin-right:5px').get_text().strip()
        program_list.append(program)
        #print(program)
        try:
            program = re.search(r'.+?(?=\s\s)', program).group(0)
        except:
            program = program
        kdhx_genres.setdefault(program, {})
        genre_elements = item.find('div', class_='show-genres').find_all('span')
        genres = []
        for element in genre_elements:
            genres.append(element.get_text())
        kdhx_genres[program] = genres

kdhx_genres['No Time To Tarry Here'] = kdhx_genres.pop('No Time to Tarry Here')
kdhx_genres['Music from the Hills'] = kdhx_genres.pop('Music From the Hills')
kdhx_genres['Boogie On Down'] = kdhx_genres.pop('Boogie on Down')
kdhx_genres['Howzit Bayou'] = kdhx_genres.pop('Howzit Bayou?')
kdhx_genres['Cure For Pain'] = kdhx_genres.pop('Cure for Pain')
kdhx_genres["Shake 'em on Down"] = kdhx_genres.pop("Shake 'Em on Down")


# code to get playlists

url = "https://spinitron.com/radio/playlist.php?station=kdhx&show=schedule&sv=l#here"
browser.is_element_present_by_css("p.plhead", wait_time=1)
browser.visit(url)

html = browser.html
schedule_soup = bs(html, 'html.parser')

schedule_tables = schedule_soup.find_all('tbody')
schedule_tables = schedule_tables[2:8]

program_list = []
for day in schedule_tables:
    day_list = []
    day_list = day.find_all('p')
    for program in day_list:
        program_list.append(program.get_text())

program_url_list = []
for day in schedule_tables:
    day_list = []
    day_list = day.find_all('a')
    for program in day_list:
        program_url_list.append('https://spinitron.com/radio/' + program['href'])
program_url_list = program_url_list[::2]

all_playlist_urls = []
for program_url in program_url_list:
    print(program_url)
    browser.visit(program_url)
    html = browser.html
    program_soup = bs(html, 'html.parser')
    playlist_table = program_soup.find('table', id='pltable')
    playlist_anchors = playlist_table.find_all('a', title='Click for the playlist')
    playlist_url_list = []
    for anchor in playlist_anchors:
        all_playlist_urls.append('https://spinitron.com/radio/' + anchor['href'])
all_playlist_urls = all_playlist_urls[::2]

all_url_df = pd.DataFrame(all_playlist_urls)
all_url_df.to_csv("all_playlist_urls.csv")

# limited to a few playlists per show
'''
test_url_df = pd.DataFrame(test_playlist_urls)
test_url_df.to_csv("test_playlist_urls.csv")


test_url_df = pd.read_csv("test_playlist_urls.csv")

test_url_list = test_url_df['0'].tolist()

all_url_df = pd.read_csv("all_playlist_urls.csv")
'''
all_url_list = all_url_df[0].tolist()

main_df = pd.DataFrame({'program': '', 'start_time': '', 'start_dt_object': '', 'end_time': '',
                        'end_dt_object': '', 'description': '', 'play_time': '', 'artist': '',       
                        'artist_url': '', 'track': '', 'album': '', 'album_url': '', 'label': '', 
                        'label_url': '', 'type': '', 'notes': '', 'play_duration': ''}, index=[x for x in range(0)])
kdhx_dict = {}
for playlist_url in all_url_list:
    print(playlist_url)
    browser.visit(playlist_url)
    browser.is_element_present_by_css("p.plhead", wait_time=1)
    html = browser.html
    playlist_soup = bs(html, 'html.parser')
    try:
        if playlist_soup.find('p', class_='plhead').find('a').get_text() == 'Chicken Shack' or 'Chicken Shack Alley':
            program_name = 'Chicken Shack'
        else:
            program_name = playlist_soup.find('p', class_='plhead').find('a').get_text()
    except:
        program_name = ''
    try:
        play_date = playlist_soup.find('p', class_='plheadsub').get_text()
    except:
        play_date = ''
    try:
        dj = playlist_soup.find('div', class_='infoblock').find('p', class_='plhead').find('a').get_text()
    except:
        dj = ''
    kdhx_dict.setdefault(program_name, {}).setdefault(dateFixer(play_date)[0], {}).setdefault(dj, {})
    kdhx_dict[program_name]['genre'] = kdhx_genres[program_name]
    kdhx_dict[program_name]['end time'] = dateFixer(play_date)[2]
    kdhx_dict[program_name]['start_dt_object'] = dateFixer(play_date)[1]
    kdhx_dict[program_name]['end_dt_object'] = dateFixer(play_date)[3]
    try:
        kdhx_dict[program_name]['description'] = playlist_soup.find('div', id='playlisthead').find('p', class_='indent').get_text()
    except:
        kdhx_dict[program_name]['description'] = ""
    play_dict = {}
    playlist_div = playlist_soup.find('div', class_='plblock')
    play_divs = playlist_div.find_all('div', class_='f2row')
    for index, play in enumerate(play_divs):
        try:
            play_time = play.find('p', class_='st').get_text()
        except:
            play_time = ''
        try:
            if index == len(play_divs) - 1:
                time_delta = datetime.strptime(re.search(r'(?<=\d\d\d\d\s).*', dateFixer(play_date)[2]).group(0), '%I:%M%p') - datetime.strptime(play_time,'%I:%M%p')
            else:
                time_delta = datetime.strptime(play_divs[index+1].find('p', class_='st').get_text(),'%I:%M%p') - datetime.strptime(play_time,'%I:%M%p')
            play_duration = time_delta.total_seconds() / 60
        except:
            play_duration = ''
        kdhx_dict[program_name][dateFixer(play_date)[0]][dj].setdefault(play_time, {})
        play_dict = {'artist': '', 'artist_url': '', 'track': '', 'album': '', 'album_url': '',    
                     'label': '', 'label_url': '', 'type': '', 'notes': '', 'play_duration': ''}
        play_dict['play_duration'] = play_duration        
        try:
            play_dict['artist'] = play.find('span', class_='aw').get_text()
        except:
            play_dict['artist'] = ''
        try:
            play_dict['artist_url'] = "https://spinitron.com/radio/" + play.find('span', class_='aw').find('a')['href']
        except:
            play_dict['artist_url'] = ''
        try:
            play_dict['track'] = play.find('span', class_='sn').get_text()
        except:
            play_dict['track'] = ''
        try:
            play_dict['album'] = play.find('span', class_='dn').get_text()
        except:
            play_dict['album'] = ''
        try:
            play_dict['album_url'] = "https://spinitron.com/radio/" + play.find('span', class_='dn').find('a')['href']
        except:
            play_dict['album_url'] = ''
        try:
            play_dict['label'] = play.find('span', class_='ld').get_text()
        except:
            play_dict['label'] = ''
        try:
            play_dict['label_url'] = "https://spinitron.com/radio/" + play.find('span', class_='ld').find('a')['href']
        except:
            play_dict['label_url'] = ''
        try:
            play_dict['type'] = play.find('span', class_='fg').get_text()
        except:
            play_dict['type'] = ''
        try:
            play_dict['notes'] = play.find('span', class_='so').get_text()
        except:
            play_dict['notes'] = ''
        kdhx_dict[program_name][dateFixer(play_date)[0]][dj][play_time] = play_dict
    for index, play in enumerate(play_divs):
        this_df = pd.DataFrame({'program': '', 'start_time': '', 'start_dt_object': '', 'end_time': '',
                        'end_dt_object': '', 'description': '', 'play_time': '', 'artist': '',       
                        'artist_url': '', 'track': '', 'album': '', 'album_url': '', 'label': '', 
                        'label_url': '', 'type': '', 'notes': '', 'play_duration': ''}, index=[x for x in range(1)])
        try:
            play_time = play.find('p', class_='st').get_text()
        except:
            play_time = ''
        try:
            if index == len(play_divs) - 1:
                time_delta = datetime.strptime(re.search(r'(?<=\d\d\d\d\s).*', dateFixer(play_date)[2]).group(0), '%I:%M%p') - datetime.strptime(play_time,'%I:%M%p')
            else:
                time_delta = datetime.strptime(play_divs[index+1].find('p', class_='st').get_text(),'%I:%M%p') - datetime.strptime(play_time,'%I:%M%p')
            play_duration = time_delta.total_seconds() / 60
        except:
            play_duration = ''
        for index, row in this_df.iterrows():
            this_df.loc[index, 'program'] = program_name
            this_df.loc[index, 'start_time'] = dateFixer(play_date)[0]
            this_df.loc[index, 'start_dt_object'] = dateFixer(play_date)[1]
            this_df.loc[index, 'end_time'] = dateFixer(play_date)[2]
            this_df.loc[index, 'end_dt_object'] = dateFixer(play_date)[3]
            try:
                this_df.loc[index, 'description'] = playlist_soup.find('div', id='playlisthead').find('p', class_='indent').get_text()
            except:
                this_df.loc[index, 'description'] = ""
            this_df.loc[index, 'play_time'] = play_time
            this_df.loc[index, 'play_duration'] = play_duration
            try:
                this_df.loc[index, 'artist'] = play.find('span', class_='aw').get_text()
            except:
                this_df.loc[index, 'artist'] = ''
            try:
                this_df.loc[index, 'artist_url'] = "https://spinitron.com/radio/" + play.find('span', class_='aw').find('a')['href']
            except:
                this_df.loc[index, 'artist_url'] = ''
            try:
                this_df.loc[index, 'track'] = play.find('span', class_='sn').get_text()
            except:
                this_df.loc[index, 'track'] = ''
            try:
                this_df.loc[index, 'album'] = play.find('span', class_='dn').get_text()
            except:
                this_df.loc[index, 'album'] = ''
            try:
                this_df.loc[index, 'album_url'] = "https://spinitron.com/radio/" + play.find('span', class_='dn').find('a')['href']
            except:
                this_df.loc[index, 'album_url'] = ''
            try:
                this_df.loc[index, 'label'] = play.find('span', class_='ld').get_text()
            except:
                this_df.loc[index, 'label'] = ''
            try:
                this_df.loc[index, 'label_url'] = "https://spinitron.com/radio/" + play.find('span', class_='ld').find('a')['href']
            except:
                this_df.loc[index, 'label_url'] = ''
            try:
                this_df.loc[index, 'type'] = play.find('span', class_='fg').get_text()
            except:
                this_df.loc[index, 'type'] = ''
            try:
                this_df.loc[index, 'notes'] = play.find('span', class_='so').get_text()
            except:
                this_df.loc[index, 'notes'] = ''
        main_df = pd.concat([main_df, this_df])

browser.quit()

main_df = main_df.reset_index().drop(columns='index')
main_df.to_csv('kdhx_shows.csv')
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.kdhx_shows
collection = db.scrape2
collection.insert_one(kdhx_dict)


