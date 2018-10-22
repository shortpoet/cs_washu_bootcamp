# Python Program to find the factors of a number
factors = []
# define a function
def print_factors(x):
   # This function takes a number and prints the factors

    print("The factors of",x,"are:")
    for i in range(1, int(x ** 0.5 + 1)):
        if x % i == 0:
            factors.append(i)
    print(factors)


# change this value for a different result.
num = 600851475143
#num = 13195

# uncomment the following line to take input from the user
#num = int(input("Enter a number: "))

print_factors(num)

# Initialize a list
primes = []
for possiblePrime in factors:
    
    # Assume number is prime until shown it is not. 
    isPrime = True
    for num in range(2, int(possiblePrime ** 0.5) + 1):
        if possiblePrime % num == 0:
            isPrime = False
            break
      
    if isPrime:
        primes.append(possiblePrime)
print(primes)