# SHIFT - Technical Interview Challenge - How To Run Solution

#### Author Bachir Diop ( diopisemou@gmail.com )
Here is my full solution to the shift technical challenge i added all the functionnalities
i think necessary and solved the main tasks.
Basically it's a crud app enabling the user to take a quizz or manage quizzs and it's related questions
Some improvements can be done but since time to deliver is taken into account
I prefer to deliver this mvp



# Spec

### Front-End
On the front-end i used shift stack which is react app with typescrip

### Backend
On the backend i used php/laravel and mysql as a database


## How to Run the App

You have two solutions :

Either run 

```
sh install-script.sh 
```


```
sh start-script.sh 
```

file inside runscript folder if you are using linux or mac

Use this script to stop the backend and frontend application
```
sh stop-script.sh 
```

NB : 
```
Make sure all 3 scripts have the good permission in order to run it ( eg : chmod 777 install-script.sh)
```

or do the next step one by one

### 1. Migrate the Database
Navigate to backend/app_backend folder
Run this command

```
['php artisan migrate:fresh']
```

### 2. Seed the Database
Navigate to backend/app_backend folder
Run this command

```
['php artisan db:seed ']
```

### 3. Initialize passport
Navigate to backend/app_backend folder
Run this command

```
['php artisan passport:client --personal']
```

Copy Client secret: (xxxxx-string to copy) and paste it to 
backend/app_backend/.env file 
PERSONAL_CLIENT_SECRET=(xxxxx-string to copy)

### 4. Run the back-end app
Navigate to backend/app_backend folder
Run this command

```
['php artisan serve ']
```

The back-end app should be running to http://127.0.0.1:8000 or the adddress and port you 
have specified

Default Credentials

```
email: 'adminuser@gmail.com' 
password: 'Azerty123@#'
```

### 5. Run the front-end app
Navigate to frontend/perspective_app folder
Run this command

```
['npm start']
```

The front-end app should be running to http://127.0.0.1:3000 or the adddress and port you 
have specified

Default Credentials

```
email: 'adminuser@gmail.com' 
password: 'Azerty123@#'
```

### MBTI Test data

The default test data are entered while seeding the database so no need to create a new quizz.

---

I hope this work is will be well appreciated also feel free to ask me any question if needed
And i hope to start working with the shift team asap