export default async (req, res) => {

    const serviceWorker = process.env.SERVICE_NAME
    console.log(serviceWorker)
    
    res.status(200).json(serviceWorker);
};