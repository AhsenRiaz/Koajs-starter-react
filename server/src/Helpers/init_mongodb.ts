import * as mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017", {dbName : "auth_tutorial"})
.then(() => {
    console.log("mongodb connected")
}).catch((err) => {
    console.log(err)
})

mongoose.connection.on('connected' , () => {
    console.log("mongoose connected to database");
});

mongoose.connection.on("error" , (err:mongoose.Error) => {
    console.log(err.message);
})

mongoose.connection.on("disconnected" , () => {
    console.log("mongoose connection is disconnected");
})

process.on('SIGINT' , async () => {
    await mongoose.connection.close();
    process.exit(0);
})

