from opcode import opname
import shutil
import os
import json
import glob
import traceback
import subprocess

folder_name = "redos"
project_root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
# print(project_root)


TARGET_FOLDER = project_root+"/"+folder_name
TMP_FOLDER = "/tmp/versions-analysis"
shutil.copyfile("/Users/masudulhasanmasudbhuiyan/Music/vulns4js/redos/utils.js", "/tmp/utils.js")
newResult = []

if not os.path.isdir(TMP_FOLDER):
    os.mkdir(TMP_FOLDER)

outFile = open("./vuln-versions_"+folder_name+".csv","a+")
detailResultFile = open("./vuln-versions_"+folder_name+"_detail.txt","a+")
# versions = json.loads(open("./all-versions_"+folder_name+".json", encoding='utf-8'))

with open("./all-versions_"+folder_name+".json", "rb") as read_file:
   versions = json.load(read_file)
# print(data)
count = 0

# // console.log(versions)
keys = []
for k in sorted(versions, key=lambda k: len(versions[k])):
    # print(k,"==>", len(versions[k]))
    keys.append(k)
step = 5
done_so_far = 80

main_list=[]
lst = glob.glob(TARGET_FOLDER+"/*")
for folder in lst:
    try:
        file_list = glob.glob(folder+"/*.test.js")
        # print(file_list)
        if len(file_list)>0:
            main_list.append(file_list[0])
    except:
        print(folder)


def findTest(substr):
    test =""
    for folder_ in main_list:
        if substr in folder_:
            return folder_
    return test
# // try{
# //     let currResult = fs.readFileSync(outFile).toString().split("\n")
# //     done_so_far = currResult.length
# //     // console.log(done_so_far)
# // }catch(e){
# //     console.log(e)
# // }
for index in range(done_so_far, len(keys), step):
    print("done_so_far", done_so_far)
    result_str = ""
    for i in range(done_so_far, done_so_far + step):
        entry = keys[i]
        if "@uifabric/utilities" in entry:
             continue
        if "remarkable" in entry: 
            continue
        if "method-override" in entry:
            continue
        try:
            currResult = versions[entry]
            test = findTest(entry)
            # print(test)
            if test=="":
                print("Unable to find test for " + entry)
                continue
            shutil.copyfile(test, TMP_FOLDER+"/poc.test.js")
            currVs = versions[entry]
            os.chdir(TMP_FOLDER)
            cwd = os.getcwd()
            
            countVuln = 0
            results = []
            for j in range(len(currVs)):
                # output
                try:
                    print("installing.................", currVs[j])
                    command = f"timeout -k 10 2m npm install {entry}@{currVs[j]}"
                    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
                    process.wait()
                    # print ("output====>>",process.stdout.read())
                    print("Done installing.................")

                    command = f"jest --json ./poc.test.js"
                    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
                    process.wait()
                    # print ("output====>>",process.stdout.read())
                    try:
                        output = json.loads(process.stdout.read().decode('utf-8'))
                        num = int(output['numPassedTests'])
                        if num>0:
                            results.append(entry+"-"+currVs[j]+"->"+"PASSED")
                            countVuln+=1
                        else:
                            results.append(entry+"-"+currVs[j]+"->"+"FAILED")
                    except:
                        traceback.print_exc()
                except:
                    traceback.print_exc()
                    results.append(entry+"-"+currVs[j]+"->"+"FAILED")
                

            result_str +=entry + "," + str(len(currVs) - countVuln) + "," + str(countVuln) + "\n"
            details_str =""
            for k in range(len(results)):
                details_str+=results[k]+"\n"
            print("writing details......")
            detailResultFile.write(details_str)
            print("writing details done......")
        except:
            traceback.print_exc()
            print()
  
    print("writing to csv......")
    outFile.write(result_str)
    done_so_far += step