# api docs

## create new user

#### POST `/create-user`

Create a new user by providing user information. The user's password is securely hashed before being stored in the database.

- method: POST
- endpoint: `/create-user``
- headers: `Content-Type: application/json`

- request body:

```
{
  "name": "Dieter Bohlen",
  "email": "dieter@example.com",
  "password": "geil123"
}
```

## authenticate user

#### POST `/authenticate-user`

Authenticate user by providing login credentials. When user is authenticated, a jwt will be sent back to the client.

- method: POST
- endpoint: `/authenticate-user``
- headers: `Content-Type: application/json`
- request body:

```
{
  "name": "Dieter Bohlen",
  "email": "dieter@example.com",
  "password": "geil123"
}
```
