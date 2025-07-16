const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(require("cors")());

app.get("/visits/:placeId", async (req, res) => {
  try {
    const placeId = req.params.placeId;
    const uniRes = await fetch(
      `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
    );
    const uniJson = await uniRes.json();
    const uni = uniJson.universeId;

    const gameRes = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${uni}`
    );
    const gameJson = await gameRes.json();
    const visits = gameJson.data[0].visits;

    res.json({ visits });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server läuft auf Port", port));
