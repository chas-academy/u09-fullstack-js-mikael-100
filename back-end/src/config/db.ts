import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MongoDbConnect:  string = process.env.MONGODBCONNECT as string;

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MongoDbConnect);
        console.log("Ansluten till Mongoose Fungerar Fint");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Problem Med Anslutning Till Monggose", error.message)
        } else {
            console.error("Unexpected error med connection till MongoDB", error)
        }
        // Avslutar process vid fel
        process.exit(1);
    }
}

export default connectDB;