const Router = require('express');
const router = new Router();
const tarifController = require('../controller/tarif.controller');

router.post('/tarif', tarifController.createTarif);
router.get('/tarif', tarifController.getTarifs);
router.get('/tarif/:id', tarifController.getOneTarif);
router.put('/tarif', tarifController.updateTarif);
router.delete('/tarif/:id', tarifController.deleteTarif);

module.exports = router;
