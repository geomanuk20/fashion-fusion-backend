import mongoose from "mongoose";

const mongodb = () => {
    mongoose
        .connect(process.env.MONGODB_CONNECTION_STRING)
        .then(() => console.log("Database connected"))
        .catch((error) => console.log("Database not connected: ", error));
};

export default mongodb;