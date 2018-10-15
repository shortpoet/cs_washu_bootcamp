def fibonacciSum(end):
    total = 0
    numbers = [1,2,]
    numbers2 = []
    for i in range(2, end):               
        
        #numbers.append(i)
        
            
        i = numbers[i-2] + numbers [i-1]
        numbers.append(i)
       
        
        #numbers2.append(i)       
        total += i
        print(numbers, i, total, numbers2)

fibonacciSum(10)