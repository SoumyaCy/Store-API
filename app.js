require('dotenv').config();
//async errors
require("express-async-errors");

const express=require("express");
const connectDB = require('./db/connect');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const prodRouter = require('./routes/products');
const app=express();


app.get('/',(req,res)=>{
    res.send('<a href ="api/v1/products">product info</a>')
})

app.use("/api/v1/products",prodRouter);

//middleware
app.use(express.json())
app.use(notFound);
app.use(errorHandlerMiddleware);



const port=process.env.PORT||3000;

const startServer=async ()=>{
try {
 await connectDB(process.env.MONGO_URI)
    app.listen(port,()=>{
        console.log(`server started on port ${port}`);
    })
} catch(error) {
    console.log=(error)
}
}
startServer();