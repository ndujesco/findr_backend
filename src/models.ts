import { Schema, model, connect } from 'mongoose';

enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}
export interface User {
  name: string;
  email: string;
  gender: Gender;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: Gender, required: true }
});

export default model<User>('User', userSchema);
