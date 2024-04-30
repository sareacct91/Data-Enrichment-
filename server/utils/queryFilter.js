const { queryInteralEndpoint } = require('./API');
const formatPhotoData = require('./formatPhotoData');
const reducer = require('./reducer');

module.exports = async function queryFilter(queries) {
	const {
		title: queryTitle,
		['album.title']: queryAlbum,
		['album.user.email']: queryEmail,
	} = queries;
	console.log(queryTitle, queryAlbum, queryEmail);
	const limit = +queries.limit || 25;
	const offset = +queries.offset || 0;
	console.log('offset: ', offset, 'limit: ', limit);

	const [photos, albums, users] = await queryInteralEndpoint();

	const results = [];
	let counter = 0;

	const albumsDict = reducer(albums);
	const usersDict = reducer(users);
	const userIndex = queryEmail
		? users.findIndex((user) => user.email === queryEmail)
		: null;

	if (queryEmail || queryAlbum) {
		const index = {};

		for (let i = 0; i < albums.length; i++) {
			const album = albums[i];

			if (
				(queryEmail && album.userId === users[userIndex].id) ||
				(queryAlbum && album.title.includes(queryAlbum))
			) {
				index[album.id] = {
					user: userIndex ?? usersDict[album.userId],
					album: i,
				};
			}
		}

		if (Object.keys(index).length) {
			for (const photo of photos) {
				if (photo.albumId in index) {
					if (queryTitle && !photo.title.includes(queryTitle)) {
						continue;
					}
					if (results.length === limit || counter < offset) {
						counter++;
						continue;
					}
					const i = photo.albumId;
					results.push(
						formatPhotoData(
							photo,
							albums[index[i].album],
							users[index[i].user],
						),
					);
				}
			}
		}
	} else {
		for (const photo of photos) {
			if (queryTitle && !photo.title.includes(queryTitle)) {
				continue;
			}

			if (results.length === limit || counter < offset) {
				counter++;
				continue;
			}

			const albumIdIndex = albumsDict[photo.albumId];
			const userIdIndex = usersDict[albums[albumIdIndex].userId];

			results.push(
				formatPhotoData(photo, albums[albumIdIndex], users[userIdIndex]),
			);
		}
	}

	console.log('results: ', results.length);
	console.log('total results: ', results.length + counter);

	const TOTALRESULTS = results.length + counter;
	return {
		photos: results,
		pagination: {
			resLength: TOTALRESULTS,
		},
	};
};
