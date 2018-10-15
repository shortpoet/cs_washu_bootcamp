def fibonacciSum(end):
    total = 0
    numbers = []
    numbers2 = []
    for i in range(end):               
        
        numbers.append(i)
        
            
        i = numbers[i-1] + numbers [i]
        #numbers.append(i)
       
        
        #numbers2.append(i)       
        total += i
        print(numbers, i, total, numbers2)

fibonacciSum(10)