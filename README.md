# Readme


## Contract 

### Express endpoint table

- /messages 
  - Method POST => 
  - Response: 200 
  - Error responses:

     - 400 "Need destination & message keys"
     - 400 "Need destination key"
     - 400 "Need message key"
     - 500 "Temporal Server Error"

### Business Decisions

In addition to testing user's data sent, I listen messsageapp error response to translate it to a more "user-friendly" language with error details, In case you have made a successful call, but the messageapp does not work properly internally. 

---



###
[POSTMAN tests Link](test_messages.postman_collection.json)








