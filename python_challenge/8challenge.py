import bz2
import urllib.request as ur


un1 = 'BZh91AY&SYA\xaf\x82\r\x00\x00\x01\x01\x80\x02\xc0\x02\x00 \x00!\x9ah3M\x07<]\xc9\x14\xe1BA\x06\xbe\x084'
un = b'BZh91AY&SYA\xaf\x82\r\x00\x00\x01\x01\x80\x02\xc0\x02\x00 \x00!\x9ah3M\x07<]\xc9\x14\xe1BA\x06\xbe\x084'
pw = b'BZh91AY&SY\x94$|\x0e\x00\x00\x00\x81\x00\x03$ \x00!\x9ah3M\x13<]\xc9\x14\xe1BBP\x91\xf08'
#b_un = bytearray(un, 'utf-8', 'OSError')

username = bz2.decompress(un)
password = bz2.decompress(pw)
un_c = bz2.compress(username)
print(un)
print(username)
print(un_c)
print(password)

username1 = un1.decode('bz2')
print(username1)