import { Schema, model as Model } from "mongoose";

const climateSchema = new Schema({
  climate: {
    type: String,
    enum: ["hot", "humid", "rainy", "cold"],
    },
    
    area_code: {
        type: Number,
        minLength: [ 100, "Please Enter A Valid Area Code" ],
        maxLength:[1000,"Can't exceed area code length"]
    },
    humidity: {
        type:Number
    },
    temperature: {
        type:Number
    },
    chances_of_rain: {
        type:Number
    }
},
    {
        versionKey: false,
        timestamps:true
    }
);


const Climate = Model( 'Climate', climateSchema );
export default Climate;