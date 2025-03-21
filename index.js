const express = require("express");
require("dotenv").config(); // import pour les variables d'env
const router = express.Router();
const cors = require("cors");
const axios = require("axios");
const app = express();
const APIKEY = "XChu6AJ0HVQKwaT2";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome on my Marvel server" });
});

// liste de tous les comics
app.get("/comics", async (req, res) => {
  try {
    let filters = "";
    let limit = 100;

    if (req.query.limit) {
      limit = req.query.limit;
    }
    filters += "&limit=" + limit;

    if (req.query.title) {
      filters += "&title=" + req.query.title;
    }

    if (req.query.page - 1) {
      const skip = (req.query.page - 1) * limit;
      filters += "&skip=" + { skip };
    }

    // on recup les data de l'API
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/?apiKey=${APIKEY}${filters}`
    );

    // Renvoi des données récupérées au frontend
    return res.json(response.data);
  } catch (error) {
    if (error.message) {
      console.error("Erreur lors de la requête :", error);
      return res.status(500).json({ message: error.message });
    } else if (error.response) {
      console.error("Erreur lors de la requête :", error);
      return res.status(500).json({ message: error.response });
    }
  }
});

// liste de tous les persos
app.get("/characters", async (req, res) => {
  try {
    let filters = "";
    let limit = 100;

    if (req.query.limit) {
      limit = req.query.limit;
    }
    filters += "&limit=" + limit;

    if (req.query.name) {
      filters += "&name=" + req.query.name;
    }

    if (req.query.page - 1) {
      const skip = (req.query.page - 1) * limit;
      filters += "&skip=" + { skip };
    }

    //console.log(filters);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters/?apiKey=${APIKEY}${filters}`
    );

    return res.json(response.data);
  } catch (error) {
    if (error.message) {
      console.error("Erreur lors de la requête :", error);
      return res.status(500).json({ message: error.message });
    } else if (error.response) {
      console.error("Erreur lors de la requête :", error);
      return res.status(500).json({ message: error.response });
    }
  }
});

// liste de tous les comics pour un perso donné
app.get("/comics/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${APIKEY}`
    );

    return res.json(response.data);
  } catch (error) {
    if (error.message) {
      console.error("Erreur lors de la requête :", error);
      return res.status(500).json({ message: error.message });
    } else if (error.response) {
      console.error("Erreur lors de la requête :", error);
      return res.status(500).json({ message: error.response });
    }
  }
});

// detail d'un comic
app.get("/comic/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${id}?apiKey=${APIKEY}`
    );

    return res.json(response.data);
  } catch (error) {
    if (error.message) {
      console.error("Erreur lors de la requête :", error);
      return res.status(500).json({ message: error.message });
    } else if (error.response) {
      console.error("Erreur lors de la requête :", error);
      return res.status(500).json({ message: error.response });
    }
  }
});

// detail d'un comic
app.get("/character/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${APIKEY}`
    );

    return res.json(response.data);
  } catch (error) {
    if (error.message) {
      console.error("Erreur lors de la requête :", error);
      return res.status(500).json({ message: error.message });
    } else if (error.response) {
      console.error("Erreur lors de la requête :", error);
      return res.status(500).json({ message: error.response });
    }
  }
});

app.all("*", (req, res) => {
  return res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🚀");
});
