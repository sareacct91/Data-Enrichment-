const { queryInteralEndpoint } = require("./API");
const formatePhoto = require("./formatePhoto");

let perfStart;

module.exports = async function queryFilter(queries) {
  const {
    title: queryTitle,
    ["album.title"] : queryAlbum,
    ["album.user.email"] : queryEmail,
  } = queries;
  console.log(queryTitle, queryAlbum, queryEmail);
  const limit = +queries.limit || 25;
  const offset = +queries.offset || 0;
  console.log(offset, limit);

  perfStart = performance.now();

  const [photos, albums, users] = await queryInteralEndpoint();

  console.log(`after fetching: ${(performance.now() - perfStart).toFixed(2)}ms`);
  perfStart = performance.now();

  const results = [];
  const index = {}

  // if there's a filter for album.title OR album.user.email
  // if it's for email - we immediantly get that user's index in the array
  // loop through the albums array
  // only save the index of the album
  // if queryEmail is true and userId matches the user that we found
  // OR
  // if queryAlbum is true and album.title includes queryAlbum
  if (queryEmail || queryAlbum) {
    const userIndex = queryEmail ? users.findIndex(e => e.email === queryEmail) : null;

    for (let i = 0; i < albums.length; i++) {
      const album = albums[i];

      if ( (queryEmail && album.userId === users[userIndex].id) ||
           (queryAlbum && album.title.includes(queryAlbum)) ) {
        index[album.id] = {
          user: userIndex || users.findIndex(e => e.id === album.userId),
          album: i
        };
      }
    }
  }

  if (Object.keys(index).length) {
    for (const photo of photos) {
      if (photo.albumId in index) {
        if (queryTitle && !photo.title.includes(queryTitle)) {
          continue;
        }
        const i = photo.albumId;
        results.push(formatePhoto(photo, albums[index[i].album], users[index[i].user]));
      }
    }
  }
  else {
    const usersIndex = users.reduce((acc, user, index) => acc[user.id] = index);
    const albumsIndex = albums.reduce((acc, album, index) => acc[album.id] = index);
    for (const photo of photos) {
      if (queryTitle && !photo.title.includes(queryTitle)) {
        continue;
      }
      results.push(formatePhoto(
        photo, 
        albums[albumsIndex[photo.albumId]], 
        users[usersIndex[photo.albumId]], 
      ))
    }
  }

  console.log(`after filter: ${(performance.now() - perfStart).toFixed(2)}ms`);
  console.log('after filter', results.length);

  const end = limit + offset;
  return {
    results: results.slice(offset, end),
    isMore: end < results.length
  }
};
