const locations = require("./db.json");
let globalId = 4;

//Get, Put, Delete, Push points

module.exports = {
    getLocations: (req, res) => {
        res.status(200).send(locations);
      },
      deleteLocation: (req, res) => {
        let index = locations.findIndex((elem) => elem.id === +req.params.id);
        locations.splice(index, 1);
        res.status(200).send(locations);
      },
      createLocation: (req, res) => {
        const { place, rating, imageURL } = req.body;
        let newLocation = {
          id: globalId,
          place,
          rating: +rating,
          imageURL,
        };
        locations.push(newLocation);
        globalId++;
        res.status(200).send(locations);
      },
      updateLocation: (req, res) => {
        const { id } = req.params;
        const { type } = req.body;
        let index = locations.findIndex((elem) => +elem.id === +id);
        console.log(type);
        if (type === "minus" && locations[index].rating > 100000) {
          locations[index].rating -= 10000;
          res.status(200).send(locations);
        } else if (type === "plus" && locations[index].rating < 1500000) {
          locations[index].rating += 10000;
          res.status(200).send(locations);
        } else {
          res.status(400);
        }
      },
}
