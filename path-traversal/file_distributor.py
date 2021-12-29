from os import walk
import subprocess

filenames = next(walk('./'), (None, None, []))[2]
dirnames = next(walk('.'))[1]

for files in filenames:
    for dirs in dirnames:
        file_name = files.split('.test')[0]
        dir_name = dirs.split('_')[0]
        if (file_name == dir_name):
            print("yes! ",files, ' --', dirs)
            subprocess.Popen(['mv','./' + files,'./'+ dirs + '/' ])#creating package.json in the subdirectory            
            break
            
        