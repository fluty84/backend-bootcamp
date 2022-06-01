const axios = require('axios')

class MessageAppService {
    constructor() {
        this.api = axios.create({
            baseURL: "http://messageapp:3000",
        })
    }

    saveMessage = (destination, body) => {
        console.log('destination:',destination, 'body:', body)
        return this.api.post('/message', { destination, body })
    }

}

const messageAppService = new MessageAppService()
module.exports = messageAppService

