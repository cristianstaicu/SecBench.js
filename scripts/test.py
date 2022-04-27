import re
import json
lst = ["prototype-pollution", "ace-breakout", "command-injection", "path-traversal", "redos"]
for _path in lst:
    print(_path)
    line_list=[]
    with open("../analyses/graphs/vuln-versions_"+_path+"_detail_old.txt") as in_file:
        for line in in_file:
            if len(line.strip())>0:
                line_list.append(line)

    # print(line_list)
    main_list = [[] for i in range(200)]
    package_name_list=[]
    k=0
    output_list=[]
    done_list = []
    for i in range(len(line_list)):
        if i != len(line_list)-1:
            line = line_list[i]
            parts = line.split("->")
            if "101" in line:
                continue
            # print(parts)
            package_part = parts[0]
            first_digit = re.search('-\d', package_part)
            if first_digit:
                package = package_part[:first_digit.start()]
                if package not in done_list:
                    first_package_vulnerability = parts[1]
                    version_number = package_part[first_digit.start()+1:]
                    # print(package,version_number)
                    if "." not in version_number:
                        json_file_path = "../analyses/graphs/all-versions_"+_path+".json"
                        f = open(json_file_path)
                        data_ = json.load(f)

                        print(package,"======>>>>>", data_[package])
                        # yypsulie11-1->PASSED
                        new_line = package+"-"+data_[package]+"->"+parts[1]
                        # print(new_line)
                        done_list.append(package)
                        output_list.append(new_line)
                    else:
                        output_list.append(line)

        else:
            output_list.append(line)

    out_file = open("../analyses/graphs/vuln-versions_"+_path+"_detail.txt","a+")
    for line in output_list:
        out_file.write(line)
    out_file.flush()
    out_file.close()