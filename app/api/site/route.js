import { connectToDB } from "@utils/database"
import Site from "@models/site";

export const GET = async (request)=>{
    try{
        await connectToDB() ; 

        const sites = await Site.find({}).populate('creator');  
        return new Response(JSON.stringify(sites), {
            status: 200
        })


    }
    catch(error)
    {
        console.log(error)
        return new Response("Failed to fetch sites", {
            status: 500
        })

    }
}