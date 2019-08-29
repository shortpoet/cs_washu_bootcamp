import os
import re, zipfile

filename = zipfile.ZipFile('/home/shortpoet/Downloads/channel.zip')
num = '90052'
comments = []

#cur_file = f'{num}.txt'
#content = filename.read(cur_file).decode('utf-8')
#comment = filename.getinfo(cur_file).comment.decode('utf-8')
#comments.append(comment)
#content = "Next nothing is 94191 Next nothing is 88888"
#match = re.search("Next nothing is (\d+)+", content)
#num = match.group(1)
#print(num)



while True:
    cur_file = f'{num}.txt'
    content = filename.read(cur_file).decode('utf-8')
    comment = filename.getinfo(cur_file).comment.decode('utf-8')
    comments.append(comment)
    match = re.search("Next nothing is (\d+)", content)
    if match == None:
        break
    num = match.group(1)
print("".join(comments))

#for x in range(909):
#    cur_file = f'{num}.txt'
#    content = filename.read(cur_file).decode('utf-8')
#    comment = filename.getinfo(cur_file).comment.decode('utf-8')
#    comments.append(comment)
#    num = re.sub('[\D]', '', content)
#    print(content, comment)
#result = "".join(comments)
#print(result)


#path = '/Users/soria/Downloads/channel'
#file_list = []
#num_list = []
#num = '90052'
#for x in range(910):
#    filename = f'{path}/{num}.txt'
#    current = open(filename)
#    content = current.read()
#    comment = cu.comment
#    print(comment)
#    num = re.sub('[\D]', '', string)
#
#    print(num)

#https://stackoverflow.com/questions/18262293/how-to-open-every-file-in-a-folder
#for filename in os.listdir(path):
#   
#   current = open(f'{path}/{filename}')
#   string = current.read()
#   file_string = re.sub('[\D]', '', filename)
#   num = re.sub('[\D]', '', string)
#   print(filename, file_string, string, num)
#   file_list.append(file_string)
#   num_list.append(num)
#print(file_list)
#print("-------------------------------------\r\n---------------------------------------\r\n-------------------------")
#print(num_list)
#zipper = zip(file_list, num_list)
#print(zipper)