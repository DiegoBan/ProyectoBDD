const { Router } = require('express'); 
const router = Router();

const { getCamioneroByrutaID, 
        createAyudantes, 
        updateCliente, 
        delCamiones, 
        comProveedor,
        createRuta,
        getCamiones,
        createCamionero,
        delAyudantes,
        updateStatus } = require('../controllers/index.controller');

router.get('/camioneros/ruta/:id', getCamioneroByrutaID);
router.get('/proveedor/comuna/:id', comProveedor);
router.post('/ayudantes', createAyudantes);
router.put('/clientes/:id', updateCliente);
router.delete('/camiones', delCamiones);

router.get('/camiones/:id', getCamiones);
router.post('/rutas', createRuta);
router.post('/camioneros', createCamionero);
router.put('/rutas/:id', updateStatus);
router.delete('/ayudantes', delAyudantes);

module.exports = router;