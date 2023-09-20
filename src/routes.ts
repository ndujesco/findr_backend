import { Router } from 'express';
import { Controllers } from './controllers';
import { Validator } from './middleware/validator';

const router = Router();

router.get('/', Controllers.sayHello);

router.post(
  '/user',
  Validator.addUserValidator(),
  Validator.validateUser,
  Controllers.addUser
);

router.get('/user/all', Controllers.getAllUsers);

export default router;
