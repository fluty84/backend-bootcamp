#Adding a message
time curl --location --request POST 'http://localhost:9003/message' \
--header 'Content-Type: application/json' \
--data-raw '{
  "body": "this is a body 1",
 "destination": "madrid"
}'

time curl --location --request POST 'http://localhost:9003/message' \
--header 'Content-Type: application/json' \
--data-raw '{
  "body": "this is a body 2",
 "destination": "madrid"
}'

time curl --location --request POST 'http://localhost:9003/message' \
--header 'Content-Type: application/json' \
--data-raw '{
  "body": "this is a body 3",
 "destination": "madrid"
}'

time curl --location --request POST 'http://localhost:9003/message' \
--header 'Content-Type: application/json' \
--data-raw '{
  "body": "this is a body 4",
 "destination": "madrid"
}'

echo "\n POST made new record added \n"

# Getting a list of messages
time curl --location --request GET 'http://localhost:9003/messages' \
--header 'Content-Type: application/json' \
--data-raw '{
  "destination": "STRING",
  "body": "STRING"
}'


