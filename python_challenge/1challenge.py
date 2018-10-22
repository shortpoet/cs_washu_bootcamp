import string
from string import ascii_lowercase as ALPHABET

def shift(message, offset):
    trans = str.maketrans(ALPHABET, ALPHABET[offset:] + ALPHABET[:offset])
    return message.lower().translate(trans)

x = "g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc spj"
y = "http://www.pythonchallenge.com/pc/def/map.html"

print(shift("map", 2))

#alphabet = list(string.ascii_lowercase)

#print(alphabet)