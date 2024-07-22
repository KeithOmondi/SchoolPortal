const app = require("./app");
const connectDatabase = require("./Db/Database");
const cloudinary = require("cloudinary")


//Handling uncaught exemption
process.on("uncaughtException", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server for handling uncaught exception`)
})

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "config/.env"
    })
};


//Db Connect
connectDatabase();

//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINAR_NAME,
    api_key: process.env.CLOUDINAR_API_KEY,
    api_secret: process.env.CLOUDINAR_API_SECRET,
})

//server
const server = app.listen (process.env.PORT, () =>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
});

//Handling promise rejection
process.on("unhandledRejection", (err) =>{
    console.log(`Shutting down server for ${err.message}`);
    console.log(`Shutting doen server for unhandled promise rejection`);

    server.close(() =>{
        process.exit(1);
    })
}) 