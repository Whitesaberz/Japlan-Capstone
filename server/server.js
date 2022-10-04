const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const {
    getLocations,
    deleteLocation,
    createLocation,
    updateLocation,
  } = require("./controller");
  
//Endpoints

app.get("/api/locations", getLocations);
app.delete("/api/locations/:id", deleteLocation);
app.post("/api/locations", createLocation);
app.put("/api/locations/:id", updateLocation);

//

app.listen(4040, () => console.log("Checking in at port 4040"));
