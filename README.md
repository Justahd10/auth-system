# Objectives
A default authentication arquitecture development that will be used by diferents  
auth feature from applications.  

# Components
1. Frontend Server
2. Authentication Server
3. Resource Server
4. DataBase
5. Google

# Responsibilitys
## Frontend Server
1. Provide the user interface structure and functionalyts from a application  
(this example, a ecommerce web site)

## Authentication Server
1. Manage access token content (validation time, role, scopes and user ID)
2. Use Access tokens collection from data base for storage or validation
3. Provide access token management routes
4. Manage google social accounts datas to integrate into authentication system

## Resource Server
1. Protect application resources by validating the requester's authorization.

## Data base
1. Storage the services (for example, user primary datas, addresses and payment methods)  
and user session (tokens)

## Google
1. Provide the google social login service for the centrelized authentication system

# Data base
- Selected Postgres as data base tecnologay because i am alredy have installed
- Integration: installed pg-promise library for the express.js framework

```shell
npm install pg-promise
```