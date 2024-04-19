import { Schema,model, models } from "mongoose";

const ArtistSchema=new Schema({
        artistId:{
            type:String,
            required:true
        },
        artistName:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        }
},{ timestamps: true },);

export default models.Artist ||  model("Artist",ArtistSchema) 