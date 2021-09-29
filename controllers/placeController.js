const uuid = require("uuid");
const path = require("path");
const { Place, PlaceInfo } = require("../models/models.js");
const ApiError = require("../error/ApiError");
const PlaceService = require("../service/placeService.js");
const { Op } = require("sequelize");

class placeController {
  //!create
  async create(req, res, next) {
    try {
      let { name, averageBill, type, address, description, img } = req.body;
      const place = await Place.create({
        name,
        averageBill,
        type,
        img,
        address,
        description,
      });

      return res.json(place);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  //!get all
  async getAll(req, res, next) {
    let { type, limit, page, q } = req.query;

    page = page || 1;
    limit = limit || 40;
    let offset = page * limit - limit;
    let places;

    if (q) {
      places = await Place.findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: "%" + q + "%",
              },
            },
            {
              address: {
                [Op.iLike]: "%" + q + "%",
              },
            },
          ],
        },
      });
      return res.json(places);
    }

    if (!type) {
      places = await Place.findAndCountAll({ limit, offset });
    } else {
      places = await Place.findAndCountAll({
        where: { type },
        limit,
        offset,
      });
    }
    return res.json(places);
  }

  //!get one
  async getOne(req, res) {
    const { id } = req.params;
    const place = await Place.findOne({
      where: { id },
      //   include: [{ model: PlaceInfo, as: "info" }],
    });
    return res.json(place);
  }

  ///!delete
  async delete(req, res, next) {
    const { id } = req.params;
    const place = await Place.findOne({ where: { id } });
    if (!place) throw ApiError.BadRequest("Place not found");
    return (
      (await Place.destroy({ where: { id } })) &&
      res.json({ message: "deleted" })
    );
  }

  //////////////////!update
  async update(req, res, next) {
    console.log("Updated started **************");
    try {
      let { name, averageBill, type, img, address, description } = req.body;
      const { id } = req.params;
      console.log(req.params);
      // let { img } = req.files;
      // let fileName = uuid.v4() + ".jpg";
      await PlaceService.update({
        name,
        averageBill,
        type,
        img,
        address,
        description,
        id,
      });
      console.log(req.params);
      return res.json({ message: "updated" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new placeController();
