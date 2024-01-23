# Backend for AI Chatting Chrome Extension

**Tech stack and main packages**
- Node.js
- Express.js
- Sequelize

## Endpoints

### Conversation
Allows for creation and querying of conversations by user and their id
```
GET /conversation
```
```
POST /conversation
```


### Messages
Returns 3 options of the message that fits the context, while checking if the user has enough money on their balance
```
PUT /message
```

Allows slightly change the meaning of the message
```
PUT /sl_message
```

Allows completely change the meaning of the message
```
PUT /cmpl_message
```

Saves message of the subscriber to db, endpoint is hit when sub's message appear on the screen (ofc managed by frontend)
```
POST /sub_message
```

Saves message of the model (chatter) to db, endpoint is hit when chatter chooses one of 3 options on his screen (options provided by `PUT /message` endpoint).
```
PUT /model_message
```

### Authentication
Creates new user, checking if there is already user registered with this email. 

Returns jwt token and some user information.
```
POST /signup
```

Logs the user in.

Returns jwt token and some user information.
```
POST /signup
```

Sends the verification email to the user with a link that the user can use to verify the email address.
```
GET /verify
```

Checks if the user already verified and returns the status.
```
GET /check_verification
```

Verifies the JWT token and and changes user's status to verified
```
GET /verify/:token
```
