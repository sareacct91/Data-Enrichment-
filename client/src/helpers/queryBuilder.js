export default function queryBuilder(state) {
  const tmp = [];
  const {
    photoId,
    title,
    albumTitle,
    email,
    limit,
    offset,
  } = state;

  // query just one specific photoId
  if (photoId) {
    tmp.push(`/${photoId}`);
    return tmp.join('');
  }

  tmp.push('?');

  if (limit) {
    tmp.push(`limit=${limit}`)
  }

  if (offset) {
    tmp.push(`offset=${offset}`)
  }

  // no search terms, query all photos
  // if (!(title || albumTitle || email)) {
  //   return tmp.join('&'); 
  // }
  // build the query params with the given data
  if (title) {
    tmp.push(`title=${title}`);
  }
  if (albumTitle) {
    tmp.push(`album.title=${albumTitle}`);
  }
  if (email) {
    tmp.push(`album.user.email=${email}`);
  }

  console.log(tmp.join('&'));
  return tmp.join('&');
}

