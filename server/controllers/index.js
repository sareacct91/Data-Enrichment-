const { queryInteralEndpoint } = require("../utils/API");
const { BadRequestError } = require("../utils/Errors");
const formatPhotoData = require("../utils/formatPhotoData");
const queryFilter = require("../utils/queryFilter");

module.exports = {
  async getPhotos(req, res, next) {
    try {
      const { photos, pagination } = await queryFilter(req.query);

      res.status(200).json({ photos, pagination });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  async getOnePhoto(req, res, next) {
    const { photoId } = req.params;

    try {
      if (isNaN(+photoId)) {
        throw new BadRequestError(`${photoId} is not a valid number`);
      }

      const [photo, albumData, userData] = await queryInteralEndpoint(photoId);
      const album = albumData.find(e => e.id === photo.albumId);
      const user = userData.find(e => e.id === album.userId);

      const data = formatPhotoData(photo, album, user);
      const pagination = {
        resLength: 1,
      }

      res.status(200).json({ photos: [data], pagination });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
