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

num = '14506'
for x in range (400):
    
    url = f'http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing={num}'
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        print(url)
        the_page = response.read()
        string = str(the_page)
        num = re.sub('[\D]', '', string)
print(the_page)
