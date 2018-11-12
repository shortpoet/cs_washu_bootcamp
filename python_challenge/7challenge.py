from PIL import Image
import PIL, re

sol = PIL.Image.open('/Users/soria/Downloads/oxygen.png').tobytes()[108188:110620:28]

print(sol)

#img = Image.open('/Users/soria/Downloads/oxygen.png')
#width = img.width
#height = img.height
#size = img.size
#w, h = img.size
#print(width, height)
#print(size)
#print(w, h)
#
#row = [img.getpixel((x, height / 2)) for x in range(width)]
#row = row[::7]
#ords = [r for r, g, b, a in row if r == g == b]
#solution1 = "".join(map(chr, ords))
#print(ords)
#print(solution1)
#ords2 = solution1[-45:]
#print(ords2)
#ords3 = [n for n in solution1 if n.isdigit()]
#print(len(ords3))
#ords4 = re.sub('\d+', solution1)
#
#solution1 = "".join(map(chr, ords3))
#print(ords2)
#solution2 = [105, 110, 116, 101, 103, 114, 105, 116, 121]
#print("".join(map(chr, solution2)))

#print(row)

#pixel = img.getpixel((45,0))
#print(pixel)
#all_pixels = []
#pixels = img.load()
#for x in range(width):
#    for y in range(height):
#        cpixel = pixels[x, y]
#        all_pixels.append(cpixel)
#print(all_pixels)


#PIL.Image.eval(img)