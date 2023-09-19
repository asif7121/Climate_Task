import dotenv from 'dotenv'
dotenv.config({path: 'config/config.env'})
import express from "express";
import connectDatabase from './config/dbConnection.js'
import indexRouter from './app.router.js'

const app = express();
const port = process.env.PORT

// Handling Uncaught Execption
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Execption`);
    process.exit(1);
} )

// Connecting Database
connectDatabase();





app.use(express.json());
app.use( express.urlencoded( { extended: true } ) );

// routes
app.use('/api/v2', indexRouter)



const server = app.listen( port, () => {
    console.log(`Sever is running on port: ${port}`);
})

// Unhandled Promise Rejections
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
})