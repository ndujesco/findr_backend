import { Schema, model, connect } from 'mongoose';

enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

enum Complexion {
  LIGHT = 'light',
  DARK = 'dark'
}

enum Height {
  SHORT = 'short',
  MEDIUM = 'medium',
  TALL = 'tall'
}

enum BodyType {
  SLIM = 'slim',
  BUILT = 'built',
  CHUBBY = 'chubby'
}

enum AgeRange {
  TWENTY_PLUS = '20-30',
  THIRTY_PLUS = '30-40',
  FORTY_PLUS = '40-50'
}

export interface UserI {
  name: string;
  email: string;
  gender: Gender;
}

export interface QuestionnaireI {
  complexion: Complexion;
  height: Height;
  bodyType: BodyType;
  ageRange: AgeRange;
}

const userSchema = new Schema<UserI>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: Gender, required: true }
});

const questionnaireSchema = new Schema<QuestionnaireI>({
  complexion: { type: String, enum: Complexion, required: true },
  height: { type: String, enum: Height, required: true },
  bodyType: { type: String, enum: BodyType, required: true },
  ageRange: { type: String, enum: AgeRange, required: true }
});

const User = model<UserI>('User', userSchema);
const Questionnaire = model<QuestionnaireI>(
  'Questionnaire',
  questionnaireSchema
);

export { User, Questionnaire };
