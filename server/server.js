const express = require("express");
const app = express();
const router = require("./Router");
const session = require("express-session");
// const path = require("path");
const port = 5000;
const cors = require("cors");

app.use(cors());
app.use(session({secret: "Shh, its a secret!"}));
app.use(express.json({ extended: true }));
app.use("/", router);

// to serve build
// app.use(express.static(path.join(__dirname + "\\..\\client", 'build')));
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname + "\\..\\client\\public", "index.html"));
// });

app.listen(port, () => {
    return `Server running on port: ${port}`;
});