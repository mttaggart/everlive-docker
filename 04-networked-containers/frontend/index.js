const express = require("express");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 3001;
const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT || 3000;
const app = express();

function queryDatabase(callback) {
    const URL = `http://${DATABASE_HOST}:${DATABASE_PORT}`;
    fetch(URL)
    .then(res => res.json())
    .then(json => callback(json));
}


app.use(express.json());

app.get("/", (req,res) => {
    queryDatabase(json => {
        let msg = "<h1>Starships</h1>";
        const starships = json.data.starships;
        
        for(var i=0; i<starships.length; i++) {
            msg += `<h2>${starships[i]}</h2>`;
        }
        res.status(200).send(msg);
    });
});

app.listen(PORT, () => {
   console.log(`Listening on port ${PORT}`);
   console.log(`Database is at ${DATABASE_HOST}:${DATABASE_PORT}`);
});

