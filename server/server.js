const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/saveVyroba", (req, res) => {
  const filePath = path.join(__dirname, "../src/assets/vyroba.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    let jsonData = [];

    if (!err && data) {
      try {
        jsonData = JSON.parse(data); // Parsovanie existujúcich dát
        if (!Array.isArray(jsonData)) {
          jsonData = []; // Ak nie je pole, inicializujeme ako prázdne
        }
      } catch (parseError) {
        jsonData = []; // Ak je JSON poškodený, začneme od prázdneho poľa
      }
    }

    jsonData.push(req.body); // Pridanie nových dát

    // Zapísanie aktualizovaných dát späť do súboru
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).send({ message: "Chyba pri ukladaní dát." });
      }
      res.send({ message: "Dáta uložené!" });
    });
  });
});

app.listen(8000, () => console.log(`Server is running on port 8000.`));
