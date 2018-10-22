from collections import Counter
import re
filepath = "3txtchallenge.txt"

with open(filepath) as f:
    #print(f.read())
    full_text = f.read()
    found = re.findall('[a-z][A-Z]{3}[a-z][A-Z]{3}[a-z]', full_text, re.MULTILINE)
    print(found)

       

    

    
    