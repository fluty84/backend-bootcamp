
# Cabify Message APP

Cabify's Bootcamp Backend project 


## Deployement

Once downloaded, go to project's folder an run: .

(If you need to install Doker go to => [link](https://www.docker.com/get-started/) )

```bash
  $ docker compose build
  $ docker compose up
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
| `status` | `enum` | JSON with the result of the call |







#### Send message

```http
  POST /message
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `destination` | `string` | destination of the message |
| `message` | `string` | message content |
| `number` | `number` | phone number |

| Error | Code    | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Need destination key` | 400 | destination key is not provided or is null |
| `Need message key` | 400 | message key is not provided or is null |
| `Need number key` | 400 | number key is not provided or is null|
| `Need destination and message [...]` | 400 | destination & message are not provided or are null|
| `values only can be strings` | 400 | destination & message must be String|
| `Message sent but not confirmed` | 504 | messageapp timeouts response|
| `Message not sent` | 500 | messageapp fails |


[POSTMAN tests collection](test_messages.postman_collection.json) 

Run on CLI

```
   $ docker exec -it cabify_exercisecabify_1 node postman-test
```









