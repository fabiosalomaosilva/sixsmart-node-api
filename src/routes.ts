import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import authController from './controllers/authController';
import sorteiosController from './controllers/sorteiosController';
import AutorizeAuth from './middlewares/authorizeAuth';
import swaggerDocument from './swagger.json';

const router = Router();

router.get('/', (req, res) => res.send('Server is running 🔥🔥'));
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/changepassword', AutorizeAuth, authController.changePassword);
router.get('/verifyemail', authController.verifyEmail);
router.get('/sorteios/:quantidade', sorteiosController.get);

//router.use('/api-docs', swaggerUi.serve);
router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;
