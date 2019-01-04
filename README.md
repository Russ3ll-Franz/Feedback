# Feedback project

# Problem

Every team consists of members which are unique personalities.
This difference in personalities offers a variety of problems.
The easiest solution is giving **feedback** to the people you are working with!

## Solution

The solution we offer is a very simple API.
The API itself depens on TypeORM to handle the databases and nestJS to handle the routing.


## What we offer

 

 - Register
 - Login
 - Easy maintenance with **4** different roles
 - Great flexibility of the API
 - Easy storing of feedbacks
 - Easy creation of teams


## Setup
The setup is pretty easy.
After you clone the repository you need to run 
`npm i` and you need to set up your custom .env file.
Here is a sample **.env**:

`JWT_SECRET='input your secret here',
DB_DATABASE_NAME='the db you will connect too'`

The next thing you need to do is to run a migration via **TypeORM**
`npm run migration:generate -- -n"Initial migration"`
The next step is to actually run the migration:
 `npm run migration: run`

## Sample database data
You can use our sample data script which is in `mysqlCommands.txt` which you need to run via query in MySQL Workbench or some other tool.

## Running the API
The last thing you need to do is to run the app
`npm run start:dev` to start in dev mode or 
`npm run start` to start in normal mode!

## Authentication
The four different roles have different access to the routes.

| Banned| User | Team Lead | Admin|
|--|--|--|--|
| No access to any routes other than registration and login | Can create and feedbacks in the context of a team that he is in and can view only his own feedbacks (recieved and sent) | Same as the user but can create a team(project)| Full access to all routes and a custom made admin-panel |

## Register
To register yourself you must make a post request to **localhost:3000/users/register** and send a JSON object which has: 

 - username (between 4 and 20 symbols)
 - password (more than 6 symbols)
 - email
 - firstName
 - lastName

If any of the fields are invalid you will be thrown an appropriate error.

**Sample user:**

		"username": "jorkataGorila",
		"password": "TainoObichamAzis",
		"email": "aaster23@pm.me",
		"firstName": "Georgi",
		"lastName": "Yordanov"

# Login
To login the system you need to get the route **localhost:3000/auth/login** with **username** and **password**


	"username": "jorkataGorila",
	"password": "TainoObichamAzis"

This will return you a JWT token if the user and password you provide are valid.
# Feedbacks routes:
### Get routes:

 - `localhost:3000/feedbacks?id=1` - return a route which 
 - 
