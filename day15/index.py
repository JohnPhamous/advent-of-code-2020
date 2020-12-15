input = [1,20,8,12,0,14]
iteration_target = 2020-1
last = {}
prev = None
for index, x in enumerate(input):
    last[prev] = index - 1
    prev = x
while 1:
    index += 1
    x = 0 if prev not in last else index - 1 - last[prev]
    last[prev] = index - 1
    prev = x
    if index == iteration_target:
        print(x)
        break
