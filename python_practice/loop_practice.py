user_play = "y"
count = 0
while user_play == "y":
    user_number = int(input("How many numbers? "))
    for number in range(count, user_number + count):
        print(number)
    count = user_number + count
    user_play = input("Do you want to keep on playing (y)es or (n)o ? ")




user_play = "y
while user_play == "y":
    user_number = input("How many numbers? ")
    for x in range(int(user_number)):
        print(x)
    user_play = input("Continue: (y)es or (n)o? ")


user_play = "y"
start_number = 0
while user_play == "y":
    user_number = input("How many numbers? ")
    for x in range(start_number, int(user_number) + start_number):
        print(x)
    start_number = start_number + int(user_number)
    user_play = input("Continue the chain: (y)es or (n)o? ")
