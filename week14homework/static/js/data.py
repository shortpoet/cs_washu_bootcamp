import json
from pprint import pprint

with open('data.json') as f:
    data = json.load(f)

cityList = []

for x in data:
    for k, v in x.items():
        if k == 'city':
            #print(v)
            cityList.append(v)

citySet = set(cityList)
uniqueCities = list(citySet)
citySort = uniqueCities.sort()
print(uniqueCities)

