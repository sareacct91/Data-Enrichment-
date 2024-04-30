const formatPhotoData = require("../formatPhotoData");
const { ALBUMS, albumsMap } = require("./data/ALBUMS");
const { PHOTOS, enrichedPhoto1 } = require("./data/PHOTOS");
const { USERS, usersMap } = require("./data/USERS");


test('enrich photo 1', () => {
  const photo = PHOTOS[0];
  const album = ALBUMS[albumsMap[photo.albumId]];
  const user = USERS[usersMap[album.userId]];

  expect(formatPhotoData(photo, album, user)).toEqual(enrichedPhoto1);
});
