
from collections import Counter
filepath = "2txtchallenge.txt"

with open(filepath) as f:
    #print(f.read())
    full_text = f.read()
    fUll_set = set(full_text)
    print(fUll_set)    

    

    c = Counter(full_text)
    print(c.most_common())