
# Cabify Message APP

Cabify's Bootcamp Backend project 


## Deployement

Once downloaded, go to project's folder an run: .

(If you need to install Doker go to => [link](https://www.docker.com/get-started/) )

```bash
  docker compose up
```

### Docker-Compose structure

```bash
---
version: '3'
services:
  messageapp:
    image: "cabify/backend-bootcamp-messageapp:latest"
    expose:
      - "3000"
    ports:
      - "3000:3000"

  mongodb:
    image: "mongo:5.0.8-focal"
    volumes:
      - ./data/db:/data/db
    ports:
      - "27017:27017"
    command: 
      - '--logpath'
      - '/var/log/mongodb/mongod.log'
  
  exercisecabify:
    depends_on:
      - mongodb
      - messageapp
    build: .
    expose:
      - "9001"
    ports:
      - "9001:9001"
    links:
      - "messageapp:messageDB"


```

    
## API Reference

#### Get all items

```http
  GET /messages
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `destination` | `string` | destination of the message |
| `message` | `string` | message content |
| `number` | `number` | ?? |
| `status` | `enum` | json with the result |







#### Send message

```http
  POST /message
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `destination` | `string` | destination of the message |
| `message` | `string` | message content |
| `number` | `number` | phone number |


#### add(num1, num2)

Takes two numbers and returns the sum.

