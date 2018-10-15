#mult_3_5 = []
#for i in range (1000):
#    
#    
#    if (i%3 == 0) or (i%5 == 0):
#        
#        mult_3_5.append(i)
#        #print(mult_3_5)
#total = sum(mult_3_5)
#print(total)


def sumOfMultiples(first, second, end):
    sum = 0
    for i in range(end):
        if (i % first == 0) or (i % second == 0):
            sum += i
    print(sum)
first = int(input("What is the first multiple?"))
second = int(input("What is the second multiple?"))
end = int(input("Up to what number do we calculate?"))
sumOfMultiples(first, second, end)