## These files are for backend 

1. run local to test through python
 - pip install -r requirements.txt
 - python main.py
 
2. run local to test through docker
 - docker build -t cmp370 .
 - docker run -d -p 5000:5000 --name cmp370api cmp370
 
3. test in clound
 - when you commit the codes to developer branch, the Jenkins will deploy these 
 code to awsl.hestech.cn
 - you can visit the api through api.hestech.cn or hestech.cn:5000
 
 
