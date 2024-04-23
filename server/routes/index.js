const { getPhotos } = require('../controllers');
const router = require('express').Router();

router.get('/externalapi/photos/:photoId', getPhotos);

module.exports = router;
