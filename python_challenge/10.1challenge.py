

# from collections import Counter
# x = Counter([1,1,3,3,4,4,4,5,5,6,7,7,7])
# print (x)

# seed = 1
# reps = 5
# seq = []
# seq.append(str(seed))
# for x in range(reps):
#     this_seq = [y for y in seq[x]]
#     counts = dict()
#     new_seq = ""
#     print(f"this_seq:{this_seq}")
#     for i in this_seq:
#         counts[i] = counts.get(i, 0) + 1
#     print(f"counts:{counts}")
#     for k, v in counts.items():
#         print(f"k:{k}")
#         print(f"v:{v}")
#         new_seq += str(v) + str(k)

#     print(f"new seq: {new_seq}")
#     seq.append(new_seq)
# print(seq)

# seed = 1
# reps = 5
# seq = []
# count = 0
# seq.append(str(seed))
# for x in range(reps):
#     this_seq = [y for y in seq[x]]
#     counts = dict()
#     new_seq = ""
    
#     print(f"this_seq:{this_seq}")
#     for i in range(len(this_seq)):
#         if this_seq[i] == this_seq[i-1] and len(this_seq) == 1:
#             print("if 1")
#             count += 1
#             new_seq += str(count) + str(this_seq[i])
#         elif this_seq[i] == this_seq[i-1]:
#             print("else if")
#             count += 1
#         else: 
#             print('else')
#             new_seq += str(count) + str(this_seq[i-1])
#             count = 0
#     print(f"new seq: {new_seq}")
#     seq.append(new_seq) 
        
# print(seq)

seed = 1
reps = 5
seq = []
count = 0
seq.append(str(seed))
for x in range(reps):
    this_seq = [y for y in seq[x]]
    counts = dict()
    new_seq = ""
    
    print(f"this_seq:{this_seq}")
    counts.setdefault(this_seq[0], 1)
    for i in range(len(this_seq)):
        
        if this_seq[i] == this_seq[i-1] and len(this_seq) == 1:
            print('if')
            counts[this_seq[i]] += 1
            new_seq += str(counts[i]) + str(this_seq[i])
        elif this_seq[i] == this_seq[i-1]:
            print('elif')
            counts[this_seq[i]] += 1

        else:
            print('else')
            new_seq += str(counts[i]) + str(this_seq[i])
            counts.setdefault(this_seq[i+1])
            
    print(f"new seq: {new_seq}")
    seq.append(new_seq) 
        
print(seq)
print(counts)