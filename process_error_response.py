working = []
killed = []
error = []
with open("error_response_path_traversal.txt","r+") as in_file:
    for line in in_file:
        if "PASS" in line:
            parts = line.split(" ")
            working.append(parts[1].strip("\n"))
        if "subprocess.CalledProcessError" in line:
           parts = line.split("]")
           print(line)
           index = parts[0].find("/")
        #    print(parts[0][index+1:].strip("'"))
           killed.append(parts[0][index+1:].strip("'"))
        if "FAIL" in line:
            print(line)
            parts = line.split(" ")
            error.append(parts[1].strip("\n"))


killed =  [i for i in killed if i not in error]

print(len(working))
print(len(killed))
print(len(error))
for item in killed:
    print(item)