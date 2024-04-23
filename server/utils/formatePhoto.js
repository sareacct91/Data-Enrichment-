module.exports = function formatePhoto(photo, album, user) {
  return {
    id: photo.id,
    title: photo.title,
    url: photo.url,
    thumbnailUrl: photo.thumbnailUrl,
    album: {
      id: album.id,
      title: album.title,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        address: {
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city, 
          zipcode: user.address.zipcode,
          geo: {
            lat: user.address.geo.lat,
            lng: user.address.geo.lng,
          }
        },
        phone: user.phone,
        website: user.website, 
        company: {
          name: user.company.name,
          catchPhrase: user.company.catchPhrase, 
          bs: user.company.bs,
        }
      }
    }
  }};

  // Thought about using this method but not sure of the performance lost? using delete
  // const data =  {
  //   ...photo,
  //   album: {
  //     ...album,
  //     user
  //   }
  // };
  // delete data.albumId;
  // delete data.album.userId;
  //
  // return data;
