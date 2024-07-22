const cookieParser = require("cookie-parser");

const express = require("express")
const app = express()


//config
if(process.env.NODE_ENV !== "PRODUCTION "){
    require("dotenv").config({
        path: "config/.env"
    })
};

app.use(express.json());
app.use(cookieParser());
app.use("/test", (req, res) =>{
    res.send("Hello Keith")
})

//Error handling

module.exports = app;