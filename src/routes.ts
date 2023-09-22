import { Router } from 'express';
import { Controllers } from './controllers';
import { Validator } from './middleware/validator';

const router = Router();

router.get('/', Controllers.sayHello);

router.get('/user/all', Controllers.getAllUsers);

router.post(
  '/user',
  Validator.addUserValidator(),
  Validator.validate,
  Controllers.addUser
);

router.post('/questionnaire');

export default router;
