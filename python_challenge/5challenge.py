import urllib.request
from urllib.request import urlopen
import re
import pickle

raw = urlopen('http://www.pythonchallenge.com/pc/def/banner.p').read()
print(raw.decode())
data = pickle.load(urlopen('http://www.pythonchallenge.com/pc/def/banner.p'))
print(data)
for line in data:
    print("".join([k * v for k, v in line]))


#req = urllib.request.Request('http://www.pythonchallenge.com/pc/def/banner.p')
#with urllib.request.urlopen(req) as response:
#    the_page = response.read()
#    peak_hell = pickle.dumps(the_page)
#    again = pickle.dumps(peak_hell)
#    
#print(the_page)
#print('----------------------------\n\r--------------------------\n\r----------------------------')
#print(peak_hell)
#print('----------------------------\n\r--------------------------\n\r----------------------------')
#print(again)

#num = '14506'
#for x in range (400):
#    
#    url = f'http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing={num}'
#    req = urllib.request.Request(url)
#    with urllib.request.urlopen(req) as response:
#        print(url)
#        the_page = response.read()
#        string = str(the_page)
#        num = re.sub('[\D]', '', string)
#print(the_page)
