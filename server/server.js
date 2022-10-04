const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

const {
    getLocations,
    deleteLocation,
    createLocation,
    updateLocation,
  } = require("./controller");
  
app.use("/", express.static(path.join(__dirname, "./client/index.html")));
app.use(express.static(path.join(__dirname, "./client")));

app.get("/api/locations", getLocations);
app.delete("/api/locations/:id", deleteLocation);
app.post("/api/locations", createLocation);
app.put("/api/locations/:id", updateLocation);

const port = process.PORT || 4000;
app.listen(port, () => console.log(`Checking in at port ${port}`));
