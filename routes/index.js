
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const sliceController = require('../controllers/home_controller');
  
console.log('router loaded');
router.get('/',homeController.home);
router.get('/slice',sliceController.home);

module.exports = router;