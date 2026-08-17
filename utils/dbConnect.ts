import mongoose from "mongoose";

type ConnectionObject =  {
    isConnected? : number
}

const connection : ConnectionObject = {}

async function dbConnect() : Promise<void> {
    if(connection.isConnected){
        console.log('db already connect');
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!)
        connection.isConnected = db.connections[0].readyState
        console.log('db is connected on prot ::', db.connection.port)
    } catch (error) {
        console.log('db connection failed in utils/dbConnect', error)
        process.exit(1)
    }
}

export default dbConnect