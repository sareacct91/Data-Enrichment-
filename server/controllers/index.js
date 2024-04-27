const { queryInteralEndpoint } = require("../utils/API");
const { BadRequestError } = require("../utils/Errors");
const formatePhoto = require("../utils/formatePhoto");
const queryFilter = require("../utils/queryFilter");

let fstart, nstart;

module.exports = {
  async getPhotos(req, res, next) {
    try {
      const { photos, pagination } = await queryFilter(req.query);

      res.status(200).json({
        msg: `success`, 
        photos,
        pagination
      });
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

      const data = formatePhoto(photo, album, user);

      res.status(200).json({msg: 'success', data });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
