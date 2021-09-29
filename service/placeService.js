const ApiError = require("../error/ApiError");
const { Place } = require("../models/models");
const fs = require("fs");
const { generateFileName } = require("../utils/functions");
const path = require("path");

class PlaceService {
  static update = async (placeData) => {
    let { name, averageBill, type, img, address, description, id } = placeData;
    console.log("*****************", placeData);

    const place = await Place.findOne({ where: { id } });
    if (!place) throw ApiError.BadRequest("Place not found");

    name = name || place.name;
    averageBill = averageBill || place.averageBill;
    type = type || place.type;
    address = address || place.address;
    description = description || place.description;
    img = img || place.img;

    // fileName = place.img;

    // if (img) {
    //   if (fileName) {
    //     fs.unlinkSync(path.resolve("static", fileName));
    //   }
    //   const newFileName = generateFileName(img.mimetype);
    //   img.mv(path.resolve("static", newFileName));
    //   fileName = newFileName;
    // }

    return await Place.update(
      { name, averageBill, type, img, address, description },
      { where: { id } }
    );
  };
}

module.exports = PlaceService;
