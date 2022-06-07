export default (model, number) => {

    for(let i = 0; i <= number ; i++ ){
        
        setTimeout(()=>{
            model.save()
            console.log(`retry ${i+1}`)
        }, 5000)
        
    }
}