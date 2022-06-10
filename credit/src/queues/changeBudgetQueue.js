import Queue from "bull";
import changeBudgetBy from "../controllers/changeBudgetBy.js";

export default () => {

    const changeBudget = new Queue("changeBudget", {
        redis: { host: "localhost", port: 6379 }
    });


    changeBudget.process((task, done) => {
        console.log(task.data, "es la pasta que voy a recargar")
        changeBudgetBy(task.data.amount)
        done()
    })


}


