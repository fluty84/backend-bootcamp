export default (model, number) => {

    for(let i = 0; i <= number ; i++ ){
        
        setTimeout(()=>{
            model
                .save()
                .then(response =>{ 
                    i = number +1
                    console.log("Success: ", response)
                })
            
            console.log(`retry ${i+1}`)
        }, 5000)
        
    }
}