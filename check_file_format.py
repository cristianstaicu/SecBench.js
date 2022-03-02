# import glob
# import os
# folder_list = glob.glob("command-injection/*")
# # print(folder_list)
# for folder in folder_list:
#     if os.path.isdir(folder):
#        file_list = glob.glob(folder+"/*.test.js")
#        if len(file_list)!=0:
#             line_list=[]
#             with open(file_list[0],"r+") as in_file:
#                for line in in_file:
#                    line_list.append(line)
#             # print(line_list)
#             index_list = []
#             # print(folder)
#             for index in range(len(line_list)):
#                 if "file_exist = " in line_list[index]:
#                     index_list.append(index)
#             # print(index_list)
#             if len(index_list)==2:
#                for i in range(index_list[0], index_list[1]+1):
#                    if "fs.unlinkSync" in line_list[i]:
#                        print(folder)
#                        print("Error!!!!")

line_list = []
with open("run_stat.txt") as in_file:
    for line in in_file:
        if(len(line.strip())>0):
            line_list.append(line)

# print(line_list)
count = 0
for index in range(len(line_list)):
    if "PASS" in line_list[index]:
        if index+1<len(line_list):
            if "PASS" not in line_list[index+1]:
                print(line_list[index])
                print(line_list[index+1])
                count+=1

print(count)
    
