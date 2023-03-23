const connectToMongo=require("./db");
const express = require('express')
var cors = require('cors')
require('dotenv').config()

connectToMongo();
const app = express();
const port = process.env.PORT|| 5000;

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials","true");
  res.send("API is running..");
});
// available routes
app.use('/auth',require('./routes/auth'))
app.use('/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

