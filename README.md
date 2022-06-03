# Readme


## Contract 

### Models
- MESSAGE: 
     
  - destination:String
  - message:String
  - number:String
  - status:Boolean => becomes true when everything is ok
  - sent:Enum => can be "Message Sent" or "Message not sent"
  - confirmed:Boolean => becomes true when getting a response from messageapp

### Express endpoint table

- /messages 
  - Method POST => 
  - Response: 200 
  - Error responses:

     - 400 "Need destination & message keys"
     - 400 "Need destination key"
     - 400 "Need message key"
     - 500 "Temporal Server Error"

- /messages 
  - Method GET => 
  - Response: a JSON with database's messages

### Business Decisions



---



###
[POSTMAN tests Link](test_messages.postman_collection.json)








