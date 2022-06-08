import 'dotenv/config'

import { createClient } from 'redis'

export default async() => {

    const client = createClient({
        url: `redis://${process.env.REDISDOKER}:6379` //REVISA EN DOCKER
    })

    client.on('error', (err) => console.log('Redis Client Error', err))

    await client.connect()

    await client.set('status', 'REDIS ON');
    const value = await client.get('status')

    console.log("redis conection", value)

}