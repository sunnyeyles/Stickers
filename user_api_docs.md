# user api docs

## post

### create new user

#### POST `/create-user`

Create a new user by providing user information. The user's password is securely hashed before being stored in the database.

- request body:

```
{
  "name": "Dieter Bohlen",
  "email": "dieter@example.com",
  "password": "geil123"
}
```

### authenticate user with password

Authenticates the user when they put their password in.

#### POST `/authenticate-user`

Authenticate user with, a jwt will be sent back to the client.

- request body:

```
{
  "name": "Dieter Bohlen",
  "email": "dieter@example.com",
  "password": "geil123"
}
```

## get

### authenticate user with google

#### GET `/auth/google`

Authenticate user using google oAuth 2.0, once the user authenticates themself, they will be routed to `/auth/google/calback` and a callback function will be triggered, the client will receive a JWT inside a cookie, as well as information on the user, name, email, etc.

- environment variables:

```
process.env.GOOGLE_CLIENT_ID
process.env.GOOGLE_CLIENT_SECRET
```

- response body:

```
{
"userData": {
"id": "10324343870",
"displayName": "Dieter Bohlen",
"name": {
"familyName": "Bohlen",
"givenName": "Dieter"
},
"photos": [
{
"value": "https://lh3.googleusercontent.com/a/ACq6ZYz=s96-c"
}
],
"provider": "google",
"\_raw": "{\n \"sub\": \"105518870\",\n \"name\": \"Dieter\",\n \"given_name\": \"Dieter\",\n \"family_name\": \"Bohlen\",\n \"picture\": \"https://lh3.googleusercontent.com/a/ACg8oc8cX6ZYz\\u00336-c\",\n \"locale\": \"en-GB\"\n}",
"\_json": {
"sub": "10551873241342470",
"name": "Dieter Bohlen",
"given_name": "Dieter",
"family_name": "Bohlen",
"picture": "https://lh3.googleusercontent.com/a/ACg8oDIjIUIX6ZYz=s94-c",
"locale": "en-GB"
}
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.jgEwNTsdfiIHUhuidODAzMTMyNDI4ODg3MUidcUHuiuidscdjscnzLuEbU0Mjo2eX8jwihzE"
}

```

## put

#### PUT `/user/change-user-password`

Change users password.

- request body:

```
{_id: "sdafiu23hu4i72183y872d", password: "pasword123", newPassword: "newpass123}
```
