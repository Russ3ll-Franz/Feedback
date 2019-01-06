
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
`npm run migration:generate -- -n="Initial migration"`
The next step is to actually run the migration:
 `npm run migration:run`

## Sample database data
You can use our sample data script which is in `mysqlCommands.txt` which you need to run via query in MySQL Workbench or some other tool.

## Running the API
The last thing you need to do is to run the app
`npm run start:dev` to start in dev mode or 
`npm run start` to start in normal mode!

## Authentication
The four different roles have different access to the routes.

| Banned| User | Team Lead | Admin |
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
#### `localhost:3000/feedbacks?id=1`
 -  returns feedback with ID If you are a normal User and are either the sender or the reciever of the feedback, you will be able to see it in the following format: 
` {
    "Sender": "pesho@abv.bg",
    "Reciever": "ivan@abv.bg",
    "Feedback": "Obicham da qm zadusheni puiki s oriz..."
}`
- If you are neither the sender or the reciever of the feedback you will get the following message: `You can not view this feedback because it's not sent to you or you aren't the sender!`
- The last case is that there is no feedback with the ID you have provided which will give you the following message `Sorry we were unable to find any feedbacks with the parameters you gave us, if you want you can use ?all to find all teams!`

#### `localhost:3000/feedbacks/all`
- If you hit this route and are an **Admin** or **Team Lead** you will gett all of the feedbacks as objects. 
`    {
        "id": 5,
        "Feedback": "Obicham da qm zadusheni puiki s oriz...",
        "Sender": "pesho@abv.bg",
        "Reciever": "ivan@abv.bg"
    }`
- Otherwise you will get `{
    "statusCode": 401,
    "error": "Unauthorized"
}`

### Post routes:
#### ` localhost:3000/feedbacks/new`
- The only restricted role to this route is 'Banned'
- The body must be in the following format: 
`{
	"feedback": "the feedback text here",
	"reciever": "ivan123",
	"teamID": "1"
}`
- If you and the reciever are not in the same team you will get the following error: `{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "You and the person you want to vote for are not in the team you have specified!"
}`
- If there is no such user you will get the following error: `{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "There is no such user!"
}`
- If you have already given the user a feedback in the context of a team and try to give him feedback one more time you will get the following error: 
`{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "You have already given a feedback to this user!"
}`
- If you try to give yourself a feedback you will get the following error: 
`{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "You can not give feedback to yourself!"
}
`
- If you give an ID of a team that is nonexistent you will get the same error as if you and the person you want to vote for are not in the same team.

# Projects (Teams) routes:
### Get routes:
#### `localhost:3000/projects?id=1&username=pesho123`
- If the id of the project and the username are correct you will get all of the user's feedbacks in the context of the project you have specified in the following format: `{
    "firstName": "Ivan",
    "lastName": "Ivanov",
    "received": [
        {
            "feedback": "eogubhfnoamdfgnbmvnkmasgbhnipoehnjemqfboiklaemfdsv",
            "teamID": 1
        }
    ],
    "sent": [
        {
            "feedback": "Kvo da ti kaja chovek, luda rabota! Idva na rabota piqn na kirka...",
            "teamID": 1
        }
    ]
}`
- If your role is user you can request only your own feedbacks in the context of a team and if you try to get another user's feedbacks you will get the following error: `{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "You are only allowed to see your feedbacks!"
}`
- If there is no such user or team you will get the following error: `{
    "statusCode": 400,
    "error": "User with username: gogoP does not exist or is not in team with id 1",
    "message": "Check username"
}`
- If your role is **Administrator** or **Team Lead** you can request every member's feedbacks in the context of a project and will get the same errors as above if you don't provide correct data!

#### `localhost:3000/projects/all`
You will get all of the projects with their members in the following format: `[
    {
        "projectName": "NativeScript",
        "teamMembers": 4,
        "users": [
            "Lachezar Dimitrov - lacho.jokera@abv.bg",
            "Pesho Peshev - pesho@abv.bg",
            "Ivan Ivanov - ivan@abv.bg",
            "Maria Diby - mariq@abv.bg"
        ]
    },
    {
        "projectName": "Kinvey",
        "teamMembers": 4,
        "users": [
            "Hristo Hristov - hristo@abv.bg",
            "Pesho Peshev - anna@abv.bg",
            "Pesho Peshev - peshoVtori@abv.bg",
            "Kiki Towe - kiki@abv.bg"
        ]
    }
]`

#### `localhost:3000/projects/1`
Will return you the specified project with all of it's members the in the same format as above or throw `BadRequestException('Invalid team id')`

### Post routes:
 #### `localhost:3000/project/new` 
 Adds a new project. The data in the body must be in the following format: 

    "projectName":  "NewProject",
    
    "startDate":  "2017-04-15",
    
    "endDate":  "2018-04-15",
    
    "teamMembers":  "4"; 
- If the date is in the wrong format yyyy.mm.dd you will be thrown an error!
- If there is a project with the name you have specified, you will be thrown `BadRequestException('There is already such project added!')`
- If you provide good data you will create a new project and will get the following message `Project ${project.projectName} with start date ${project.startDate}, end date ${project.endDate} was successfully created!`


#### `localhost:3000/projects/manage-members/`
You can use this route to add or remove a user from a given team.
This route accepts three parameters where the first must be either **add** or **remove** the second is the **username** and the third is the **teamID**
`
	"action": "add",
	"teamMember": "aaster23",
	"teamID": "1"
`
- This route is accessible only to **Admins** and **Team Leads!**
- If the teamMember's username is wrong you will be thrown `BadRequestException(There is no user with username ${username})`
- If the teamID is wrong you will be thrown `BadRequestException(There is no team with ID ${teamID});`
- If the member you are trying to add is already in the team you will get `BadRequestException(The member you are trying to add is already in the team!)`
- If the member you are trying to remove is not in the team you will get `BadRequestException(There is no such member in the team you have specified!);`
- If the team is empty and you try to remove a member you will get `BadRequestException(The team is empty!);`
- If the data you provide is right on add action you will get `Successfully added user ${username} to project ${projectName}`
- If the data you provide is right on remove action you will get `Successfully removed user ${username} to project ${projectName}`
# Admin-panel routes:
### Post routes:

### `localhost:3000/admin-panel/role`
In the body you must give the username and the role you want to give to the user: `"username": "pesho123",
"role": "Banned"`
The allowed roles are: **Banned, User, Team Lead, Admin**

 - If there is no such user you will get the following error : `BadRequestException('There is no such user with this username')`
 - If the user's role is the same as the role you provide, you will get the following error: `BadRequestException('Cannot change user\'s role with same role')`
 - If the user's role is **Admin** you won't be able to change it and get the following error: 	`BadRequestException('Cannot change user\'s admin role with another')`
 - If you have provided accurate data you will get the following output: `pesho123's role has been sucessfully changed to Banned!`
### Get routes: 

### `localhost:3000/admin-panel/role?username=aaster23`
Will return either `${user.username} is a/an ${user.role}` if the data is correct or `BadRequestException(No user with nickname ${username}!)`


# Thanks for using our API

### Creators: 
### Martin Bechev - martinbechev@gmail.com and  Georgi Yordanov - aaster23@protonmail.com


##### This is a training project made for the Telerik Academy Alpha