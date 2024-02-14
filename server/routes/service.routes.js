const Router = require('express');
const router = new Router();
const serviceController = require('../controller/service.controller');

router.post('/service', serviceController.createService);
router.get('/service', serviceController.getServices);
router.get('/service/:id', serviceController.getOneService);
router.get('/tarif_services/:tarif_id', serviceController.getTarifServices);
router.put('/service', serviceController.updateService);
router.delete('/service/:id', serviceController.deleteService);

module.exports = router;
