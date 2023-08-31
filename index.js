const express = require("express");
const app = express();
const port = 5020;
const crud = require("./route/CRUDRoute/CRUDRoute"); 
const cors = require("cors");
app.use(cors());
const DBconnect = require("./db/dbConnect");
app.use(express.json());

const url = "mongodb://localhost:27017/DRE_DATABASE";
// "mongodb+srv://sagarvavadiya:Fresh2512@cluster0.tc4j2fe.mongodb.net/ScreenShot";
DBconnect(url); 
app.use(crud);
app.listen(port, () => {
  console.log(`Running on ${port} port`);
});
