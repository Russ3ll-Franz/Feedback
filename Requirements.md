# Web applications and Databases Teamwork Assignment - JavaScript Alpha Aug'18

## Project Description

Create a project of your choice and implement it using Nest.js (Express.js) and TypeORM (data access).

- Project examples:
  - Sports ranking
  - Online store
  - Movie ranking
  - Book store
  
The application should have:

- **public part** (Must) (accessible without authentication)
- **private part** (Must) (available for registered users)
- **administrative part** (Should) (available for administrators only)

### Public Part

The **public part** of your projects should be **visible without authentication**.

This public part could be the application start page, the user login and user registration forms, as well as the public data of the users, e.g. the blog posts in a blog system, the public offers in a bid system, the products in an e-commerce system, etc.

### Private Part (Users only)

**Registered users** should have private part in the web application accessible after **successful login**.

This part could hold for example the user's profiles management functionality, the user's offers in a bid system, the user's posts in a blog system, the user's photos in a photo sharing system, the user's contacts in a social network, etc.

### Administration Part

**System administrators** should have administrative access to the system and permissions to administer all major information objects in the system, e.g. to create/edit/delete users and other administrators, to edit/delete offers in a bid system, to edit/delete photos and album in a photo sharing system, to edit/delete posts in a blogging system, edit/delete products and categories in an e-commerce system, etc.

## Preliminary Requirements

Before you start writing code, please take your time to write a simple project specification. Together with your team member, read the requirements below and answer the following questions in a (README in your repo) in a style of your choosing.

- Who are your team members?
- What is your project going to be about?
- What features will it consist of? Explain their purpose. (Try to be as granular as possible.)
- Create a kanban board with the following data, fill it and keep it updated:
  - Name of Feature
  - Feature Owner (who will write it?)
  - Estimated time it would take (in hours, **don't overthink it**)
  - Actual time it took (in hours)
  - Estimated time it would take to unit test (in hours)
  - Actual time it took to unit test (in hours)
- For the board you could use Trello or GitLab's project system.
  - If your selected tool does not support time estimation (for example Trello), just write it in the card's description or use an addon.

Try to adhere to this project specification and make your project as close to it as possible. As you implement each feature, write down the time it really took you and compare them with the estimate. Do not be surprised if the difference between them is great, that's completely normal when you do something like this for the first time. Also, don't go crazy on features, implement a few but implement them amazingly! 

## General Requirements

- Completely finished project is not obligatory required. It will not be a big problem if your project is not completely finished or is not working greatly
  - This team work project is for educational purposes
- Always remember, quality over quantity!

## Must Requirements

- Use **TypeScript**
- Use **Nest.js or pure Express.js**
- Must have **Public** and **Private** parts
  - Use JWT to control the application authorization
- Must apply proper **data validation** (both client-side if any and server-side)
- Must apply proper **error handling** (both client-side if any and server-side)
- Write **unit tests** for the majority of your application's features. Unisolated tests are not considered valid.
- Follow the SOLID principles and the OOP principles. The lack of SRP or DI will be punished by death.
- Use **PostgreSQL/MySQL/MariaDB** etc.
- At least five tables in the database
- Provide at least two type of relations in the database
- The user should be able to manipulate the database through the client (Postman) (basic CRUD)
- Use services and repositories for the data access and the business logic
- Write unit tests for the majority of your application's features. Unisolated tests are not considered valid.
- Follow the SOLID principles and the OOP principles. The lack of SRP or DI will be punished by death.

## Should Requirements

* Should have **Administrative** part
  * Your registered users should have at least one of the two roles: **user** and **administrator**

## Could Requirements

- Write end-to-end tests
- Generate PDF reports based on your application's data. The PDF doesn't have to be pretty.
  - For PDF reports use a non-commercial free library of your choice.
- Provide some usable user interface for the client
- Could have **usable and responsive UI**

## Project Defense

Each team member will have around 30 minutes to:

* Present the project overall
* Explain how they have contributed to the project
* Explain the source code of their teammates
* Answer some theoretical questions related to this course and all the previous ones.

## Give Feedback about Your Teammate

You will be invited to provide feedback about all your teammate, his/her attitude to this project, his/her technical skills, his/her team working skills, his/her contribution to the project, etc. **The feedback is important part of the project evaluation so take it seriously and be honest.**
