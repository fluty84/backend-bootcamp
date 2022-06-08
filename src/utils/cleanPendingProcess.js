

export default async (databases) => { //recives an array of databases


    databases.forEach( async (database) => {

        const dataPendingFiles = await database.find({status:"PENDING"}) 
        const completeTasks = await database.find({"$or":[{status:"ERROR"},{status:"OK"}]})

        dataPendingFiles.forEach( data => {

           completeTasks.forEach( completeTask => {
            if (data.taskId === completeTask.taskId) {
                database
                    .findByIdAndDelete({_id:data._id})
                    .then(response => console.log(`Process complete with id ${data.taskId}`))
                    .catch(error => console.log(error))
            }
           }) 

        })
        


    });


}
