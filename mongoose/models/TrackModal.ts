import { Int32 } from "mongodb";
import { Schema,model, models } from "mongoose";

const TrackSchema=new Schema({
    TrackId:{
        type:String,
        required:true,
        trim:true
    },Title:{
        type:String,
        required:true,
        trim:true
    },Artist:{
        type:[String],
    },Album:{
        type:String,
        trim:true
    },Genre:{
        type:[String],
        required:true
    },Duration:{
        type:String,
        required:true,
        trim:true
    },ReleaseDate:{
        type:Date,
        required:true
    },FileImageAttributes:{
        ImageName:{
            type:String,
            required:true,
            trim:true,
            default:'defaultTrack'
        },
        FileType:{
            type:String,
            required:true,
            trim:true,
            default:'png'
        }
    },FilePathAttributes:{
        FileName:{
            type:String,
            require:true,
            trim:true
        },
        FileType:{
            type:String,
            required:true,
            trim:true
        }
    },  Rating:{
        type:Number,
        default:0
    },playCount:{
        type:Number,
        default:0
    }

},{ timestamps: true },);

export default models.TrackData || model("TrackData",TrackSchema) 