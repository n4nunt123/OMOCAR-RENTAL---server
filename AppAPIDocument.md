## Endpoints

List of Available Endpoints:
- `GET /transportations`
- `GET /transportations/:id`
- `POST /transportations/`
- `DELETE /transportations/:id`
- `GET /transportations/:id`
- `PUT /transportations/:id`
- `PATCH /transportations/:id`
- `GET /types`
- `POST /types`
- `DELETE /types/:id`
- `POST /register`
- `POST /login`
- `POST /login/google`
- `GET /histories`

## Deployed Link
### Client
  - AJAX ver.
    - https://omocar58.web.app
  - Vue ver.
    - https://omocarh8.web.app

### Server
  - https://omocarh8.herokuapp.com

### GET /transportations
#### Description
- Get all data from all entity table

#### Response
_200 - OK_

- Body
    ```json
    [
      {
        "id": Integer,
        "name": String,
        "description": String,
        "imgUrl": String,
        "location": String,
        "price": Integer,
        "typeId": Integer,
        "authorId": Integer,
        "createdAt": String,
        "updatedAt": String,
        "User": {
            "id": Integer,
            "email": String,
            "username": String,
            "role": String,
            "phoneNumber": String,
            "address": String,
            "createdAt": String,
            "updatedAt": String
        },
        "Type": {
            "id": Integer,
            "name": String,
            "createdAt": String,
            "updatedAt": String
        }
      },...
    ]
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Invalid Token"
    }
    OR
    {
      "message": "Please Login First"
    }
    ```

### GET /transportations/:id
#### Description
- Get data from Transportation table based on given id

#### Response
_200 - OK_

- Body
    ```json
    {
      "id": Integer,
      "name": String,
      "description": String,
      "imgUrl": String,
      "location": String,
      "price": Integer,
      "typeId": Integer,
      "authorId": Integer,
      "createdAt": String,
      "updatedAt": String,
    },...
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Invalid Token"
    }
    OR
    {
      "message": "Please Login First"
    }
    ```


### POST /transportations
#### Description
- Create a new Transportation data

#### Request
- Body
    ```json
    {
      "name": String,
      "description": String,
      "imgUrl": String,
      "location": String,
      "price": String,
      "typeId": Integer,
      "authorId": Integer
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "message": "SUCCESS input data with name: ${data.name} and id ${id}"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "Name is required" 
    }
    OR
    {
      "message": "Description is required" 
    }
    OR
    {
      "message": "Price is required" 
    }
    OR
    {
      "message": "Minimal price is 250000" 
    }
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Invalid Token"
    }
    OR
    {
      "message": "Please Login First"
    }
    ```

### DELETE /transportations/:id
#### Description
- Destrpy a Transportation data based on given id

#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "SUCCESS delete data with id ${id}"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Error Data Not Found"
    }
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Invalid Token"
    }
    OR
    {
      "message": "Please Login First"
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "message": "Forbidden Authorization"
    }
    ```
    
### GET /transportations/:id
#### Description
- Get spesific data from transporations based on given id

#### Response
_200 - OK_
- Body
    ```json
    {
      "id": Integer,
      "name": String,
      "description": String,
      "imgUrl": String,
      "location": String,
      "price": Integer,
      "typeId": Integer,
      "authorId": Integer,
      "createdAt": String,
      "updatedAt": String,
    }
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Invalid Token"
    }
    OR
    {
      "message": "Please Login First"
    }
    ```
### PUT /transportations/:id
#### Description
- Update a existing Transportation data given by Id

#### Request
- Body
    ```json
    {
      "name": String,
      "description": String,
      "imgUrl": String,
      "location": String,
      "price": String,
      "typeId": Integer,
      "authorId": Integer
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "message": "SUCCESS update data with name: ${name} and id ${id}"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "Name is required" 
    }
    OR
    {
      "message": "Description is required" 
    }
    OR
    {
      "message": "Price is required" 
    }
    OR
    {
      "message": "Minimal price is 250000" 
    }
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Invalid Token"
    }
    OR
    {
      "message": "Please Login First"
    }
    ```
### PATCH /transportations/:id
#### Description
- Update a spesific field Status in table Transportation given by Id

#### Request
- Body
    ```json
    {
      "string": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "message": "SUCCESS update data with name: ${name} and id ${id}"
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": "Status is required" 
    }
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Invalid Token"
    }
    OR
    {
      "message": "Please Login First"
    }
    ```
### GET /types
#### Description
- Get all data from type table

#### Response
_200 - OK_
- Body
    ```json
    [
      {
        "id": Integer,
        "name": String
      },
    ]
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Invalid Token"
    }
    OR
    {
      "message": "Please Login First"
    }
    ```


### POST /types
#### Description
- Create new Type data

### Request
- Body
    ```json
    {
      "name": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
      "message": "SUCCESS input data with id ${id}"
    }
    ```
_400 - Bad Request_
- Body
    ```json
    {
      "message": "Name is required" 
    }
    ```

### DELETE /types/:id
#### Description
- Destroy a Type data based on given id


#### Response
_200 - OK_
- Body
    ```json
    {
      "message": "SUCCESS delete data with id ${id}"
    }
    ```
_404 - Not Found_
- Body
    ```json
    {
      "message": "Error Data Not Found"
    }
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Invalid Token"
    }
    OR
    {
      "message": "Please Login First"
    }
    ```
_403 - Forbidden_
- Body
    ```json
    {
      "message": "Forbidden Authorization"
    }
    ```

### POST /register
#### Description
- Create a new User data
- Implement Hooks hashing with bcryptjs on data password
- Set static data role as Admin

#### Request
- Body
    ```json
    {
      "username": String,
      "password": String,
      "email": String,
      "phoneNumber": String,
      "address": String,
      "role": "Admin",
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    {
        "massage": "SUCCESS input data with email: ${email} with id ${input.id}"
    }
    ```
_400 - Bad Request_
- Body
    ```json
    {
      "message": "Email is required" 
    }
    OR
    {
      "message": "Input must be email" 
    }
    OR
    {
      "message": "Password is required" 
    }
    OR
    {
      "message": "Password minimal 5 character" 
    }
    ```
_200 - OK_
- Body
    ```json
    {
      "message": "SUCCESS input data with email: ${email} with id ${input.id}"
    }
    ```

### POST /login
#### Description
- Get data from User table based on given email
- Validation input password must be same as encoded password on database
- Generate token based on payload as inputed id User

### Request
- Body
    ```json
    {
      "email": String,
      "password": String
    }
    ```
### Response
_200 - OK_
- Body
    ```json
    {
      "access_token": String
    }
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Error Email or Password Invalid"
    }
    ```

### POST /login/google
#### Description
- AOuth login via google account
- Generate data user on local database
- Generate token based on payload from google and make local payload

### Response
_200 - OK_
- Body
    ```json
    {
      "access_token": String
    }
    ```
### GET /histories
#### Description
- Get all data from Histories table

#### Response
_200 - OK_

- Body
    ```json
    {
      "id": Integer,
      "description": String,
      "updatedBy": Integer,
      "createdAt": String,
      "updatedAt": String,
    },...
    ```
_401 - Unauthorized_
- Body
    ```json
    {
      "message": "Invalid Token"
    }
    OR
    {
      "message": "Please Login First"
    }
    ```



### Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
      "message": "Internal Server Error" 
    }
    ```