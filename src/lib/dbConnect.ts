import mongoose, { ConnectOptions } from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {

}

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("DB already connected")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!)
        connection.isConnected = db.connections[0].readyState

        console.log("DB connected successfully")
    } catch (error) {
        console.log(error, "DB connection failed")
        process.exit(1)
    }
}

export default dbConnect