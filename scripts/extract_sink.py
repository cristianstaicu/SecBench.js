# import re

# main_list =[]
# mainStr =""
# out_file = open("./sink_locations_command-injection.txt","w")
# with open("scripts/sink_log.txt","r+") as in_line:
#     for line in in_line:
#         # print(line)
#         m = re.search(r"^command-injection\/.+\.test\.js", line)
#         if m:
#             main_list.append(mainStr)
#             mainStr=""
#             mainStr+=line
#         else:
#             mainStr+=line

# main_list.append(mainStr)
# count=0
# out_str =""
# for x in main_list:
#     print(x)
#     print("\n\n\n")

# for x in main_list:
#     if len(x.strip())>0:
#         if "sink ==>" not in x:
#             print("new================>>>>>>>>>>")
#             print(x)
#             print("\n\n\n")
#             count+=1
#         else:
#             # index = x.find("sink ==>")
#             indexs = [m.start() for m in re.finditer('sink ==>', x)]
#             if len(indexs)==1:
#                 end_index = x.find('\\n', indexs[0])
#                 sink = x[indexs[0]:end_index]
#                 # print(sink)
#                 arrow_index = sink.find(">")
#                 sink_location = sink[arrow_index:].strip()

#                 start_index = x.find("PASS")
#                 end_index = x.find("\n", start_index)
#                 file_path = x[start_index+4:end_index]
#                 slash_index = file_path.find("/")
#                 file_name = file_path[:slash_index]
#                 out_str += file_name+" "+sink_location+"\n"
                
#             else:
#                 found = False
#                 for index in indexs:
#                     end_index = x.find('\\n', index)
#                     sink = x[index:end_index]
#                     if "Error" not in sink:
#                         arrow_index = sink.find(">")
#                         sink_location = sink[arrow_index:].strip()

#                         start_index = x.find("PASS")
#                         end_index = x.find("\n", start_index)
#                         file_path = x[start_index+4:end_index]
#                         slash_index = file_path.find("/")
#                         file_name = file_path[:slash_index]
#                         # print(file_name," ", sink_location)
#                         out_str += file_name+" "+sink_location+"\n"
#                         found = True
#                     if found:
#                         break
                
#                 # print("found ===>> ", found)
#                 # if not found:
#                     # print("Nooooooooooooo ============================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
#             # print(index)

# out_file.write(out_str)
# out_file.flush()
# out_file.close()
# print(count)


## for prototype pollution

import re

main_list =[]
mainStr =""
out_file = open("./sink_locations_prototype_pollution.txt","w")
with open("./error_response_prototype_pollution.txt","r+") as in_line:
    for line in in_line:
        # print(line)
        m = re.search(r"^FAIL.+\.test\.js", line)
        if m:
            main_list.append(mainStr)
            mainStr=""
            mainStr+=line
        else:
            mainStr+=line

main_list.append(mainStr)
count=0
t_found = 0
out_str =""
# for x in main_list:
#     print(x)
#     print("\n\n\n")

for x in main_list:
    if len(x.strip())>0:
        if "sink ==>" not in x:
            # print("new================>>>>>>>>>>")
            # print(x)
            # print("\n\n\n")
            count+=1
        else:
            # index = x.find("sink ==>")
            indexs = [m.start() for m in re.finditer('sink ==>', x)]
            if len(indexs)==1:
                end_index = x.find('at Object', indexs[0])
                sink = x[indexs[0]:end_index]
                if "l2);" not in sink:
                    arrow_index = sink.find(">")
                    sink_location = sink[arrow_index+1:].strip()
                    # print(sink_location)
                    t_found+=1
                    start_index = x.find("FAIL")
                    end_index = x.find("\n", start_index)
                    file_path = x[start_index+4:end_index]
                    slash_index = file_path.find("/")
                    file_name = file_path[:slash_index].strip()
                    # print(file_name)
                    out_str += file_name+" > "+sink_location+"\n"
                else:
                    print(x)
                    count+=1
                
                # print(out_str)
                
            else:
                found = False
                for index in indexs:
                    end_index = x.find("\n", index)
                    sink = x[index:end_index]
                    # print(sink)
                    if "Error" not in sink:
                        arrow_index = sink.find(">")
                        sink_location = sink[arrow_index:].strip()

                        start_index = x.find("FAIL")
                        end_index = x.find("\n", start_index)
                        file_path = x[start_index+4:end_index]
                        slash_index = file_path.find("/")
                        file_name = file_path[:slash_index]
                        # print(file_name," ", sink_location)
                        out_str += file_name+" "+sink_location+"\n"
                        t_found+=1
                        found = True
                    if found:
                        break
                
        #         # print("found ===>> ", found)
        #         # if not found:
        #             # print("Nooooooooooooo ============================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        #     # print(index)

out_file.write(out_str)
out_file.flush()
out_file.close()
print(count)
print(t_found)

## for ace breakout

# import re

# main_list =[]
# mainStr =""
# out_file = open("./sink_locations_ace_breakout.txt","w")
# with open("./error_response_ace_breakout.txt","r+") as in_line:
#     for line in in_line:
#         # print(line)
#         m = re.search(r"FAIL.+\.test\.js", line)
#         m1 = re.search(r"PASS.+\.test\.js", line)
#         if m or m1:
#             main_list.append(mainStr)
#             mainStr=""
#             mainStr+=line
#         else:
#             mainStr+=line

# main_list.append(mainStr)
# count=0
# t_found = 0
# out_str =""
# # for x in main_list:
# #     print(x)
# #     print("\n\n\n")

# # print(len(main_list))

# for x in main_list:
#     if len(x.strip())>0:
#         if "sink ==>" not in x:
#             # print("new================>>>>>>>>>>")
#             # print(x)
#             # print("\n\n\n")
#             count+=1
#         else:
#             # index = x.find("sink ==>")
#             indexs = [m.start() for m in re.finditer('sink ==>', x)]
#             if len(indexs)==1:
#                 end_index = x.find('\n', indexs[0])
#                 sink = x[indexs[0]:end_index]
#                 # print(sink)
#                 arrow_index = sink.find(">")
#                 sink_location = sink[arrow_index:].strip()
#                 # print(sink_location)
#                 if "Error" not in sink_location:
#                     m = re.search(r"FAIL.+\.test\.js", x)
#                     m1 = re.search(r"PASS.+\.test\.js", x)

#                     if m:
#                         file_line = m.group(0)
#                     if m1:
#                         file_line = m1.group(0)

#                     parts = file_line.split(" ")
#                     # print(parts)
#                     file_name = parts[2].strip()
#                     slash_index = file_name.find("/")
#                     file_name = file_name[:slash_index]
#                     out_str += file_name+" "+sink_location+"\n"
#                     # print(out_str)
#                     t_found+=1
                
#             else:
#                 found = False
#                 for index in indexs:
#                     end_index = x.find("\n", index)
#                     sink = x[index:end_index]
#                     arrow_index = sink.find(">")
#                     sink_location = sink[arrow_index+1:].strip()
#                     if len(sink_location.strip())>0:
#                         if "Error" not in sink:
#                             m = re.search(r"FAIL.+\.test\.js", x)
#                             m1 = re.search(r"PASS.+\.test\.js", x)

#                             if m:
#                                 file_line = m.group(0)
#                             if m1:
#                                 file_line = m1.group(0)

#                             parts = file_line.split(" ")
#                             # print(parts)
#                             file_name = parts[2].strip()
#                             slash_index = file_name.find("/")
#                             file_name = file_name[:slash_index]
#                             out_str += file_name+" > "+sink_location+"\n"
#                             # print(out_str)
#                             t_found+=1
#                             found = True
#                     if found:
#                         break
                
# out_file.write(out_str)
# out_file.flush()
# out_file.close()
# print(count)
# print(t_found)