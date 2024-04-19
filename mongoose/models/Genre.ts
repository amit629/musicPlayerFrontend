import { Schema,model, models } from "mongoose";

const GenreSchema=new Schema({
        genreId:{
            type:String,
            required:true
        },
        genreName:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        }
},{ timestamps: true },);

export default models.Genre || model("Genre",GenreSchema) 