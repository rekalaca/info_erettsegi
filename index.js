const express = require('express');
const path = require('path');
const app = express();
const { harommotor, forgo, toll } = require("./modules/mysql");
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

app.get("/forgo", (req, res) => {
    forgo((err, forgo) => {
        if (err) throw err;
        res.render("forgo", { forgo });
    });
});

app.get("/toll", (req, res) => {
    toll((err, toll) => {
        if (err) throw err;
        res.render("toll", { toll });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public/error.html"))
});

app.listen(port);