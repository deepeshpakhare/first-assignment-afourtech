import { Express } from "express";
import cors from "cors";
//import unnnamed from "./api/somename.route.js"

const app = express();
app.use(cors);
app.use(express.jason());
app.use("./api/somename",unnamed);
app.use('*',(req,res)=>{
    res.status(404).jason({error:"not found"});
});

export default app;