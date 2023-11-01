import  express  from "express";
import 'dotenv/config'
import UserRoutes from './routes/UserRoutes.js'
import db from './config/connection.js'
import { PageNotFound } from "./middleware/ErrorHandler.js";
import { error } from "./middleware/ErrorHandler.js";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
const PORT = process.env.PORT || 3001
app.use('/api/', UserRoutes)
app.use(PageNotFound)
app.use(error)


db()
app.listen(PORT, () => {
    console.log(`listening on PORT: http://localhost:${PORT}`)
})