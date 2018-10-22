# Python Program to find the prime factors of a number and also the largest
# Initialize a list
factors = []
primes = []
largest = 0
# uncomment the following line to take input from the user
num = int(input("Enter a number: "))
# change this value for a different result.
#num = 600851475143
#num = 13195

# define a function

def print_prime_factors(x):
   # This function takes a number and prints the factors

    print("The factors of",x,"are:")
    for i in range(1, int(x ** 0.5 + 1)):
        if x % i == 0:
            factors.append(i)
    
    for possiblePrime in factors:
    
    # Assume number is prime until shown it is not. 
        isPrime = True
        for num in range(2, int(possiblePrime ** 0.5) + 1):
            if possiblePrime % num == 0:
                isPrime = False
                break

        if isPrime:
                primes.append(possiblePrime)
        largest = max(primes)
    print(f"All factors: {factors}\nAll prime factors: {primes}\nLargest prime factor: {largest}")
    #print(factors, primes)
    #print(f"All factors: {factors}\nAll prime factors: {primes}\n")

print_prime_factors(num)


