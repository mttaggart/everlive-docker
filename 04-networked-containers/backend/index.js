const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const DATAFILE = "./data.json";
const app = express();

app.get("/", (req,res) => {
    fs.readFile(DATAFILE, (err, data) => {
        if (err) throw err;
        res.status(200).send(data.toString());
    })
});

app.listen(PORT, () => {
   console.log(`Listening on port ${PORT}`);
});

