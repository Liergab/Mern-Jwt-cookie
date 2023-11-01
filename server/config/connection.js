import mongoose from "mongoose";

const db = async() => {
    try {

        const dbconnect = await mongoose.connect(process.env.MONGODB_URL_STRING)
        console.log(`Connected: ${dbconnect.connection.host}/${dbconnect.connection.name}`)

    } catch (error) {

        console.log(error)
        process.exit(1)
        
    }
}

export default db