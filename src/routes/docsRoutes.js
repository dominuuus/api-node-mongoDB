const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('../../swagger.json');


router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerJSDoc));

module.exports = router;