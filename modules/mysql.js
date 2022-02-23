const mysql = require('mysql');
const data = require('../data/config.json');
const connection = mysql.createConnection({

    host: data.dbhost,
    database: data.dbname,
    user: data.dbuser,
    password: data.dbpasswd,
    port: data.dbport
});

connection.connect((err) => {
    if(err) throw err;
    console.log("A kapcsolódás sikeres!");
});

const harommotor = (callback) => {
    const mySelect =
    `SELECT talnev FROM talalmany WHERE talnev LIKE "%motor%" ORDER BY talnev`;
    connection.query(mySelect, (err, result) => {
        if(err) callback(err, null);
        callback(null, JSON.parse(JSON.stringify(result)));
    });
};

const forgo = (callback) => {
    const mySelect =
    `SELECT talnev FROM talalmany, kutato, kapcsol WHERE kutato.nev = "Forgó László" AND kutato.fkod = kapcsol.fkod AND kapcsol.tkod = talalmany.tkod;`; 
    connection.query(mySelect, (err, result) => {
        if(err) callback(err, null);
        callback(null, JSON.parse(JSON.stringify(result)));
    });
};

const toll = (callback) => {
    const mySelect =
    `SELECT nev, meghal-szul AS 'Élt' FROM kapcsol INNER JOIN kutato ON kapcsol.fkod=kutato.fkod INNER JOIN talalmany ON kapcsol.tkod=talalmany.tkod WHERE talalmany.talnev="golyóstoll";`; 
    connection.query(mySelect, (err, result) => {
        if(err) callback(err, null);
        callback(null, JSON.parse(JSON.stringify(result)));
    });
};

const nevtelen = (callback) => {
    const mySelect =
    `SELECT talnev FROM talalmany WHERE (talalmany.tkod NOT IN (SELECT kapcsol.tkod FROM kapcsol));`; 
    connection.query(mySelect, (err, result) => {
        if(err) callback(err, null);
        callback(null, JSON.parse(JSON.stringify(result)));
    });
};

module.exports = {harommotor, forgo, toll, nevtelen};