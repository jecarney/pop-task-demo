var express = require('express');
var router = new express.Router();
var controller = require('./controller');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.get('/delete/:id', controller.delete);
router.delete('/:id', controller.delete);

module.exports = router;
