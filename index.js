const express = require("express");
require("dotenv").config(); // import pour les variables d'env
const router = express.Router();
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT;
const APIKEY = "OF5qaR0iaX3hYOtz";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome on my vinted server" });
});

// liste de tous les comics
app.get("/comics", async (req, res) => {
  try {
    // on recup les data de l'API
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=" + APIKEY
    );

    // Renvoi des données récupérées au frontend
    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// liste de tous les persos
app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=" + APIKEY
    );

    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// liste de tous les comics pour un perso donné
app.get("/comics/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${APIKEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(PORT, () => {
  console.log("Server started 🚀");
});
