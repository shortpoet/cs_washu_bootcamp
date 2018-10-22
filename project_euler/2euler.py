def fibonacciSum(end):
    total = 3
    numbers = [1,2,]
    numbers2 = []
    for i in range(2, end):             
           
        i = numbers[i-2] + numbers [i-1]
        numbers.append(i)            
           
    #print(numbers, i, total, numbers2)
    #print(total)
    for j in numbers:
        if j%2 == 0:
            numbers2.append(j)

    new_total = sum(numbers2)
    num_max = max(numbers)    
    print(numbers, numbers2, new_total, num_max)
fibonacciSum(10)