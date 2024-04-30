const reducer = require('../reducer');
const { ALBUMS, albumsMap } = require('./data/ALBUMS');
const { USERS, usersMap } = require('./data/USERS');

test('reduce USERS to object {"userId: "indexInAray",...}', () => {
	expect(reducer(USERS)).toEqual(usersMap);
});

test('reduce ALBUMS to object {"albumId: "indexInAray",...}', () => {
	expect(reducer(ALBUMS)).toEqual(albumsMap);
});
