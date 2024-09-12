require('dotenv').config();
const express =require("express")
const app=express()
const port = 3000
const cookieParser = require("cookie-parser");
const path=require("path")
const index=require("./routes/index.js")
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")
const expressSession=require("express-session")
const flash = require("connect-flash")
const db=require("./config/mongoose.connection")

//*MIDDLEWARE
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine', 'ejs')
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }));
app.use(flash());

//* Routes
app.use("/",index)
app.use("/owners",ownersRouter)
app.use("/users", usersRouter);
app.use("/products",productsRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
