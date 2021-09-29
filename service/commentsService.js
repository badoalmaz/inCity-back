const ApiError = require("../error/ApiError");
const { Comments } = require("../models/models");

class CommentsService {
  static create = async ({ message, userId, postId }) => {
    return await Comments.create({ message, userId, postId });
  };

  static getAll = async (offset, limit, q) => {
    if (q) {
      return await Comments.findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: q + "%",
              },
            },
            {
              address: {
                [Op.iLike]: q + "%",
              },
            },
          ],
        },
        limit,
        offset,
      });
    }

    return await Comments.findAndCountAll({ limit, offset });
  };

  static delete = async (id) => {
    const comments = await Comments.findOne({ where: { id } });
    if (!comments) throw ApiError.BadRequest("Comment not found");
    return await Comments.destroy({ where: { id } });
  };
}

module.exports = CommentsService;
