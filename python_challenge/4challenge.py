import urllib.request
import re
#req = urllib.request.Request('http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing=12345')
#with urllib.request.urlopen(req) as response:
#    the_page = response.read()
#    string = str(the_page)
#    num = re.sub('[\D]', '', string)
#print(the_page)
#print(string[-6:-1])
#print(num)

# num = '14506'
# for x in range (400):
    
#     url = f'http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing={num}'
#     req = urllib.request.Request(url)
#     with urllib.request.urlopen(req) as response:
#         print(url)
#         the_page = response.read()
#         string = str(the_page)
#         num = re.sub('[\D]', '', string)
# print(the_page)

import urllib.request
import re

def get_source(url):
    with urllib.request.urlopen(url) as response:
        html = response.read()
    return html

def print_source(url):
    print(get_source(url).decode())



nothing = "12345"
while True:
    source = get_source("http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing={0}".format(nothing))
    try:
        nothing = re.findall(b"and the next nothing is ([0-9]+)", source)[0].decode()
    except:
        if source == b"Yes. Divide by two and keep going.":
            nothing = int(nothing)//2
        else:
            print(source)
            break