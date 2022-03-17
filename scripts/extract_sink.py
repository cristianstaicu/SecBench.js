import re

main_list =[]
mainStr =""
out_file = open("./sink_locations_command-injection.txt","w")
with open("scripts/sink_log.txt","r+") as in_line:
    for line in in_line:
        # print(line)
        m = re.search(r"^command-injection\/.+\.test\.js", line)
        if m:
            main_list.append(mainStr)
            mainStr=""
            mainStr+=line
        else:
            mainStr+=line

main_list.append(mainStr)
count=0
out_str =""
for x in main_list:
    print(x)
    print("\n\n\n")

for x in main_list:
    if len(x.strip())>0:
        if "sink ==>" not in x:
            print("new================>>>>>>>>>>")
            print(x)
            print("\n\n\n")
            count+=1
        else:
            # index = x.find("sink ==>")
            indexs = [m.start() for m in re.finditer('sink ==>', x)]
            if len(indexs)==1:
                end_index = x.find('\\n', indexs[0])
                sink = x[indexs[0]:end_index]
                # print(sink)
                arrow_index = sink.find(">")
                sink_location = sink[arrow_index:].strip()

                start_index = x.find("PASS")
                end_index = x.find("\n", start_index)
                file_path = x[start_index+4:end_index]
                slash_index = file_path.find("/")
                file_name = file_path[:slash_index]
                out_str += file_name+" "+sink_location+"\n"
                
            else:
                found = False
                for index in indexs:
                    end_index = x.find('\\n', index)
                    sink = x[index:end_index]
                    if "Error" not in sink:
                        arrow_index = sink.find(">")
                        sink_location = sink[arrow_index:].strip()

                        start_index = x.find("PASS")
                        end_index = x.find("\n", start_index)
                        file_path = x[start_index+4:end_index]
                        slash_index = file_path.find("/")
                        file_name = file_path[:slash_index]
                        # print(file_name," ", sink_location)
                        out_str += file_name+" "+sink_location+"\n"
                        found = True
                    if found:
                        break
                
                # print("found ===>> ", found)
                # if not found:
                    # print("Nooooooooooooo ============================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            # print(index)

out_file.write(out_str)
out_file.flush()
out_file.close()
print(count)