const cors = require("cors");
const express = require("express");
const { postRouter, userRouter } = require("./routes/");
const cookieParser = require('cookie-parser');

const app = express();


app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
app.use(express.json());
app.use("/", postRouter, userRouter);

app.listen(5001, async () => {
    console.log("Listening on port 5001");
});
