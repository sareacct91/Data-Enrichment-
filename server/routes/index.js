const { getPhotos, getOnePhoto } = require('../controllers');
const router = require('express').Router();

router.get('/externalapi/photos/', getPhotos);
router.get('/externalapi/photos/:photoId', getOnePhoto);

module.exports = router;
