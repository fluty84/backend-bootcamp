import sendMessage from "./src/controllers/sendMessage.js"
import  ReadLine  from "readline"
import bodyParser from "body-parser"

const readline = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question('how many messages do you want to send? => ', number => {
    multiple(number)
    readline.close();
})

const multiple = (number) => {
    for(let i = 0; i < number; i++){
        sendMessage(bodyParser.json({ destination: "algun lugar", body: "blahblah" }))
        console.log("message sent")
    }
}
