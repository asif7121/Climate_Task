import mongoose from "mongoose";


const connectDatabase = () => {
    const dbURL = process.env.DB_URL
    mongoose.connect( dbURL )
    const db = mongoose.connection;
    db.once( "open", () => {
        console.log("Database Connected Successfully");
    })
}

export default connectDatabase;