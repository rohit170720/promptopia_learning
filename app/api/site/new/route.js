import { connectToDB } from "@utils/database"
import Site from "@models/site";


export const POST = async (req) => {
    const {userId, siteUrl, siteIcon, siteDesc} = await req.json() ; 
    try {
        await connectToDB() ; 
        const newPrompt = new Site({
            creator: userId, 
            siteUrl,
            siteIcon, 
            siteDesc
        })

        await newPrompt.save() ; 
        return new Response(JSON.stringify(newPrompt), {
            status: 201
        }) 

    }
    catch(err){
        console.log(err) ; 
        return new Response("Failed to create new Response", {
            status: 500 
        }) 
    }
}