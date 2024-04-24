const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos/';
const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums/';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users/';

module.exports = {
  /**
   * @param {String} [id] photoId use to query specific photo
   * if not provided, query all photos
   * @returns {Promise<Object[]>}
   *  queries the 3 internal endpoints
   *  return the results in an array with the of order
   *  [photos, albums, users]
   * */
  async queryInteralEndpoint(id = "") {
    const promisePhotos = fetch(PHOTOS_URL + id);
    const promiseAlbums = fetch(ALBUMS_URL);
    const promiseUsers = fetch(USERS_URL);

    const responseArr = await Promise.all(
          [promisePhotos, promiseAlbums, promiseUsers]
    );

    const dataArr = [];
    for (const response of responseArr) {
      if (!response.ok) {
        throw {
          code: response.status,
          message: `${response.statusText} ${id ? '- id ' + id : ""}`
        }
      }
      dataArr.push(response.json());
    }

    return await Promise.all(dataArr);
  },
};
