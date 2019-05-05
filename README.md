# API NODE JS 

Base API REST developed in NodeJS with just auth

## Installation :

### Use Docker :

```bash
$ git clone https://github.com/Clement-Molotkoff/Home-Sweet-Home.git
```
Build image docker :
```bash
$ docker build -t apijs
```
Start docker container :
```bash
$ docker run -d -p 3000:3000 <your name>
```

### Usage
Nothing.
You can connect to your API with : <ip>/api/<route>
 
But if you want enter in your docker :
```bash
$ docker exec -it nifty_germain /bin/bash
```

### Configuration API : 
In /API/config.json
You can modify database or listening port 
```json
{
    "server": {
        "database": "mongodb://[...]",
        "port": 3000
        }
    }
```

### Route : 

|METHOD          |ROUTE                          |Auth                         |
|----------------|-------------------------------|-----------------------------|
|POST            |/register/                     |guest                        |
|POST            |/login/                        |guest                        |
|POST            |/logout/                       |member/admin                 |
|                |                               |                             |
|GET             |/users/                        |member                       |
|GET             |/users/<users_id>              |member                       |
|GET             |/users/<email>                 |member                       |
|                |                               |                             |
|PATCH           |/users/edit/:users_id          |admin                        |
|PUT             |/users/edit/:users_id          |admin                        |
|                |                               |                             |
|GET             |/api/ping/                     |admin                        |

## Author
Clement Molotkoff
Copyright - 2019



