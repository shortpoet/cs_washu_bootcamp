
with open ('ascii.txt', 'w+', encoding='utf-16') as filename:
    for i in range(256):
        char = chr(i)
        #ordi = ord(chr)
        filename.write(f'{i}: {char}\n\r')