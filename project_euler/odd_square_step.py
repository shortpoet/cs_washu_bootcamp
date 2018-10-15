def fibonacciSum(end):
    total = 0
    numbers = []
    for i in range(end):
        numbers.append(i)
        i = numbers[i-1] + numbers [i]
        total += i
        print(numbers, i, total)

fibonacciSum(10)