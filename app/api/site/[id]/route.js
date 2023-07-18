import { connectToDB } from "@utils/database"
import Site from "@models/site";

export const DELETE = async (request, {params})=>{
    try {
        await connectToDB() ; 
        await Site.findByIdAndRemove(params.id) ; 
        return new Response("Site deleted successfully",{status:200})
    } catch (error) {
        return new Response("Failed to Delete Site status 500",{status:200})
    }
}