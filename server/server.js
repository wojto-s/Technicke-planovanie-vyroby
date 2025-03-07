const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

//const mongoUri = "mongodb://localhost:27017"; // URI pre lokálne bežiaci MongoDB
const db =
  "mongodb+srv://admin:admin@cluster0.br6yi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "tpvDB";

const client = new MongoClient(db);
let database;

async function connectToMongoDB() {
  try {
    /*
    const client = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    database = client.db(dbName);
    console.log("Pripojenie k MongoDB bolo úspešné");
    */

    await client.connect();
    database = client.db("TPV");

    const collections = await database.collections();
    console.log("current tables:");
    collections.forEach((collection) =>
      console.log(collection.s.namespace.collection)
    );

    console.log("Pripojenie k MongoDB bolo úspešné");
  } catch (error) {
    console.error("Chyba pri pripojení k MongoDB:", error);
  }
}

connectToMongoDB();
/*
app.get("/getVyrobky", async (req, res) => {
  try {
    const collection = database.collection("vyrobky");
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error("Chyba pri získavaní dát z DB:", error);
    res.status(500).json({ error: "Chyba pri získavaní dát" });
  }
});
*/
app.post("/setVyrobky", async (req, res) => {
  try {
    const collection = database.collection("vyrobkySpecs");
    const newData = req.body;
    const result = await collection.insertMany(newData);
    res.status(201).json(result);
    console.log("insert success");
  } catch (error) {
    console.error("Chyba pri ukladaní dát:", error);
    res.status(500).json({ error: "Chyba pri ukladaní dát" });
  }
});

app.post("/updateVyroba", (req, res) => {
  const filePath = path.join(__dirname, "../src/assets/vyroba.json");

  fs.writeFile(filePath, JSON.stringify(req.body), (writeErr) => {
    if (writeErr) {
      return res.status(500).send({ message: "Chyba pri upravovaní dát." });
    }
    res.send({ message: "Dáta upravené!" });
  });
});

app.listen(8000, () => console.log(`Server is running on port 8000.`));
