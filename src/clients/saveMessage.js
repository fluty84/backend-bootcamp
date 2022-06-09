import { Message, MessageBackup } from "../models/message.js"
import retry from "../utils/retry.js"
import cleanPendingProcess from "../utils/cleanPendingProcess.js"
import queue from "../utils/queue.js"

import locks from "locks"

export default async (messageParams) => {


  const dbs = [Message, MessageBackup]

  const mutex = locks.createMutex()

  const message = new Message(messageParams)
  const backup = new MessageBackup(messageParams)
  try {

    const doc = async () => {

      await message.save()

      try {
        await backup.save()

        queue(cleanPendingProcess(dbs))

      } catch (error) {

        retry(backup, 3)
        console.log(error)
      }
    }

    mutex.lock(function () {

      console.log('We got the lock!')
      doc()
      console.log("Message saved succesfully:", message)

    })

    return message
  } catch (err) {
  
    console.log("Error while saving", err)
  
  } finally {
     mutex.unlock()
  }
}
