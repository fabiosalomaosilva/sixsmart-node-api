import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import authController from '../../controllers/authController';
import sorteiosController from '../../controllers/sorteiosController';
import AutorizeAuth from '../../middlewares/authorizeAuth';
import swaggerDocument from '../../swagger.json';

const router = Router();

router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.get('/', (req, res) => res.send('Server is running 🔥🔥'));
router.get('/failed', (req, res) => res.send('Erro de login!'));
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post(
  '/auth/changepassword',
  AutorizeAuth,
  authController.changePassword,
);
router.post('/auth/forgotpassword', authController.forgotPassword);
router.get('/verifyemail', authController.verifyEmail);
router.get('/sorteios/:quantidade', sorteiosController.get);
router.get('/auth/existsuser', authController.existsUser);

export default router;
