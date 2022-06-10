import { Message, MessageBackup } from "../models/message.js"
import cleanPendingProcess from "../utils/cleanPendingProcess.js"

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

        cleanPendingProcess(dbs)

      } catch (error) {

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
