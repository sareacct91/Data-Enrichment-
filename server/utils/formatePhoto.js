module.exports = function formatePhoto(photo, album, user) {
  const data =  {
    ...photo,
    album: {
      ...album,
      user
    }
  };
  delete data.albumId;
  delete data.album.userId;

  return data;
};

