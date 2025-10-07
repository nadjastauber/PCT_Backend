const express = require('express'); //express ist middleware für Weiterverarbeitung von http-Anfragen an Datenbank und zurück
const cors = require('cors');       //erlaubt verwendung von Ressourcen aus verschiedenen Servern (Backend läuft auf render/Frontend auf vercel)
const routes = require('./routes');         //bindet Datei routes.js ein --> werden weiter unten genutzt
const mongoose = require('mongoose');       // damit sich Backend und MonogDB verbinden können 
require('dotenv').config();                 //in dotenv sind Logindaten gespeichert

const app = express();
const PORT = 3000;

app.use(express.json());            // alle Javascript-Objekte der response werden in JSON umgewandelt
app.use(cors());        //cors für alle requests erlauben
app.use('/', routes);  //hier können Weichen gestellt werden

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE });
const db = mongoose.connection;
db.on('error', err => {
  console.log(err);
});
db.once('open', () => {
    console.log('connected to DB');
});


app.listen(PORT, (error) => {           //Starten des Webservers durch listen-Funktion von express
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);
    }
});