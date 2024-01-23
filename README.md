# Backend for AI Chatting Chrome Extension

**Tech stack and main packages**
- Node.js
- Express.js
- Sequelize

## Endpoints

### Conversation
Allows for creation and querying of conversations by user and their id
```
GET /ai_chat/conversation
```
```
POST /ai_chat/conversation
```


### Messages
Returns 3 options of the message that fits the context, while checking if the user has enough money on their balance
```
PUT /ai_chat/message
```

Allows slightly change the meaning of the message
```
PUT /ai_chat/sl_message
```

Allows completely change the meaning of the message
```
PUT /ai_chat/cmpl_message
```

Saves message of the subscriber to db, endpoint is hit when sub's message appear on the screen (ofc managed by frontend)
```
POST /ai_chat/sub_message
```

Saves message of the model (chatter) to db, endpoint is hit when chatter chooses one of 3 options on his screen (options provided by `PUT /message` endpoint).
```
PUT /ai_chat/model_message
```

### Authentication
Creates new user, checking if there is already user registered with this email. 

Returns jwt token and some user information.
```
POST /auth/signup
```

Logs the user in.

Returns jwt token and some user information.
```
POST /auth/login
```

Sends the verification email to the user with a link that the user can use to verify the email address.
```
GET /auth/verify
```

Checks if the user already verified and returns the status.
```
GET /auth/check_verification
```

Verifies the JWT token and and changes user's status to verified
```
GET /auth/verify/:token
```

### Payment
Creates checkout session in coinbase and sends unique link to the client
```
POST /payment/create-checkout
```

Returns user's balance
```
GET /payment/balance
```

Webhook for Coinbase, used to update the amount on the user's wallet, when user has checked out already.
```
GET /payment/webhook
```

