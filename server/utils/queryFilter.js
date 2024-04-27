const { queryInteralEndpoint } = require("./API");
const formatePhoto = require("./formatePhoto");
const fs = require('fs');
const path = require('path');
const reducer = require("./reducer");

module.exports = async function queryFilter(queries) {
  const {
    title: queryTitle,
    ["album.title"] : queryAlbum,
    ["album.user.email"] : queryEmail,
  } = queries;
  console.log(queryTitle, queryAlbum, queryEmail);
  const limit = +queries.limit || 25;
  const offset = +queries.offset || 0;
  console.log('offset: ', offset, 'limit: ', limit);

  let perfStart = performance.now();
  const [photos, albums, users] = await queryInteralEndpoint();
  console.log(`after fetching: ${(performance.now() - perfStart).toFixed(2)}ms`);
  perfStart = performance.now();

  const results = [];
  let counter = 0;

  const albumsDict = reducer(albums);
  const usersDict = reducer(users);
  const userIndex = queryEmail ? users.findIndex(user => user.email === queryEmail) : null;

  // if there's a filter for album.title OR album.user.email
  // if it's for email - we immediantly get that user's index in the array
  // loop through the albums array
  // only save the index of the album
  // if queryEmail is true and userId matches the user that we found
  // OR
  // if queryAlbum is true and album.title includes queryAlbum
  if (queryEmail || queryAlbum) {
    const index = {};

    for (let i = 0; i < albums.length; i++) {
      const album = albums[i];

      if ( (queryEmail && album.userId === users[userIndex].id) ||
        (queryAlbum && album.title.includes(queryAlbum)) ) {
        index[album.id] = {
          user: userIndex ?? usersDict[album.userId],
          album: i
        };
      }
    }

    if (Object.keys(index).length) {
      for (const photo of photos) {
        if (photo.albumId in index) {
          if (queryTitle && !photo.title.includes(queryTitle)) {
            continue;
          }
          if ( (results.length === (limit)) ||
            (counter < offset) ) {
            counter++;
            continue;
          }
          const i = photo.albumId;
          results.push(formatePhoto(photo, albums[index[i].album], users[index[i].user]));
        }
      }
    }
  }
  else {
    for (const photo of photos) {
      if (queryTitle && !photo.title.includes(queryTitle)) {
        continue;
      }

      if ( (results.length === (limit)) ||
           (counter < offset) ) {
        counter++;
        continue;
      }

      const albumIdIndex = albumsDict[photo.albumId];
      const userIdIndex = usersDict[albums[albumIdIndex].userId];

      results.push(formatePhoto(
        photo,
        albums[albumIdIndex],
        users[userIdIndex],
      ))
    }
  }

  console.log(`after filter: ${(performance.now() - perfStart).toFixed(2)}ms`);
  console.log('results: ', results.length);
  console.log('total results: ', results.length + counter);

  const TOTALRESULTS = results.length + counter;
  return {
    photos: results,
    pagination: {
      endIndex: limit + offset,
      resLength: TOTALRESULTS,
    }
  }
};
