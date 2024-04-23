const { queryInteralEndpoint } = require("../utils/API");
const { BadRequestError, NotFoundError } = require("../utils/Errors");
const formatePhoto = require("../utils/formatePhoto");

const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos/';
const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums/';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users/';

module.exports = {
  async getPhotos(req, res, next) {


    res.status(200).json({msg: 'success'}); 
  },

  async getOnePhoto(req, res, next) {
    const { photoId } = req.params;

    try {
      if (isNaN(parseInt(photoId))) {
        throw new BadRequestError(`${photoId} is not a valid number`);
      }

      const p1 = queryInteralEndpoint(PHOTOS_URL + photoId);
      const p2 = queryInteralEndpoint(ALBUMS_URL);
      const p3 = queryInteralEndpoint(USERS_URL);

      const [photo, albumData, userData] = await Promise.all([p1, p2, p3]);
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
