import Queue from "bull"

export default (number) => {

    console.log("returning ", number)
   
    const changeBudget = new Queue("changeBudget", {
        redis: { host: "localhost", port: 6379 }
    });
    
    const main = async () => {
        await changeBudget.add(number, {
            attemps: 4,
            backoff: 5000
        })

    }


    main().catch(console.error)

}