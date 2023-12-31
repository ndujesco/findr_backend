import { Router } from 'express';
import { Controllers } from './controllers';
import { Validator } from './middleware/validator';

const router = Router();

router.get('/', Controllers.sayHello);

router.get('/user/all', Controllers.getAllUsers);

router.get('/questionnaire/all', Controllers.getSurveyResponses);

router.post(
  '/user',
  Validator.addUserValidator(),
  Validator.validate,
  Controllers.addUser
);

router.post(
  '/questionnaire',
  Validator.addQuestionnaireValidator(),
  Validator.validate,
  Controllers.postQuestionnaire
);

export default router;
