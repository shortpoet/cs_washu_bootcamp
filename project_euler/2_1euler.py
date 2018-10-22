numbers = [1,2]
#numbers = []
evens = [2]
#numbers[0] = 1
#numbers[1] = 2
f = 0
total = 0
print(numbers)
print(numbers[-1])



#while total <= 4000000:
#    total = sum(evens)
#    
#    f = numbers[-1] + numbers[-2]
#    numbers.append(f)
#    if f % 2 == 0:
#        evens.append(f)
#
#        
#    
#print(total, evens)

while f <= 4000000:
    total = sum(evens)
    
    f = numbers[-1] + numbers[-2]
    numbers.append(f)
    if f % 2 == 0:
        evens.append(f)

        
    
print(total, evens)
 