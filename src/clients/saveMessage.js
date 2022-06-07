import Message from "../models/message.js";
import locks from "locks"

export default async (messageParams) => {

  const mutex = locks.createMutex()

  const message = new Message(messageParams);
  
  try {
    
    const doc = async() => await message.save();

    mutex.lock(function () {
      console.log('We got the lock!');
      doc()
      console.log("Message saved succesfully:", message);
      mutex.unlock();
    });

    return message;
  } catch (err) {
    mutex.unlock();
    console.log("Error while saving", err);
  }
}
