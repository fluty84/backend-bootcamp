import { Message, MessageBackup } from "../models/message.js"
import retry from "../utils/retry.js"

import locks from "locks"

export default async (messageParams) => {

  const mutex = locks.createMutex()

  const message = new Message(messageParams)
  const backup = new MessageBackup(messageParams)

  try {

    const doc = async () => {

      await message.save()

      try {
        await backup.save()

      } catch (error) {

        retry(backup, 3)
        console.log(error)
      }
    }

    mutex.lock(function () {

      console.log('We got the lock!')
      doc()
      console.log("Message saved succesfully:", message)

      //mutex.unlock()

    });

    return message
  } catch (err) {
    //mutex.unlock()
    console.log("Error while saving", err)
  
  } finally {
     mutex.unlock()
  }
}
