const express = require('express');
const path = require('path');
const app = express();
const { harommotor } = require("./modules/mysql");
const port = 4444;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/harommotor", (req, res) => {
    harommotor((err, harommotor) => {
        if (err) throw err;
        res.render("harommotor", { harommotor });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public/error.html"))
});

app.listen(port);