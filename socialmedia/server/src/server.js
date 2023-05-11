const cors = require("cors");
const express = require("express");
const { postRouter } = require("./routes/");

const app = express();


app.use(cors());
app.use(express.json());
app.use("/", postRouter);

app.listen(5001, async () => {
    console.log("Listening on port 5001");
});
