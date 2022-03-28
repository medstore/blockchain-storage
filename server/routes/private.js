const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const {getuser , storeFiles} = require('../controllers/private');
const {retriveData} = require('../controllers/auth');
const {protect} = require('../middleware/auth');

router.route("/getuser").get(protect, getuser);
router.route("/retrive").post(retriveData);

module.exports = router;