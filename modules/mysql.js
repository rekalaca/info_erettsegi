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
    `SELECT talnev FROM talalmany, kutato, kapcsol WHERE kutato.nev = "Forgó László" AND kutato.fkod = kapcsol.fkod AND kapcsol.tkod = talalmany.tkod;`; //A 3-as találmány hiányzik a listából., mert z ingyenes appok max 50 sort importálnak txt file-ból
    connection.query(mySelect, (err, result) => {
        if(err) callback(err, null);
        callback(null, JSON.parse(JSON.stringify(result)));
    });
};

const toll = (callback) => {
    const mySelect =
    `SELECT nev, meghal-szul AS 'Élt' FROM kutato,talalmany,kapcsol WHERE talalmany.talnev="golyóstoll" AND talalmany.tkod=kapcsol.tkod AND kapcsol.fkod=kutato.fkod;`; // mert itt is kiesik az 50 sorból...
    connection.query(mySelect, (err, result) => {
        if(err) callback(err, null);
        callback(null, JSON.parse(JSON.stringify(result)));
    });
};

module.exports = {harommotor, forgo, toll};