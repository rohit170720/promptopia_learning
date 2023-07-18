import mongoose,{ Schema, model, models } from "mongoose";

const SiteSchema = new Schema({
    creator:{
        type : Schema.Types.ObjectId , 
        ref:'User'
    },
    siteUrl:{
        type: String, 
        required: [true, 'url is required.']
        
    },
    siteIcon:{
        type: String , 
        required: [true, 'icon is required.']      
      },
    siteDesc:{
      type: String , 
      required: [true, 'Desc is required.']      
    }
}); 

const Site = models.Site || model("Site",SiteSchema) ;

export default Site ;