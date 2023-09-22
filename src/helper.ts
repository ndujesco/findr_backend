import { UserI } from './models';

export class Helper {
  static modifyUserInfo(users: UserI[]) {
    let maleCount = 0;
    let femaleCount = 0;

    users.forEach((user) => {
      if (user.gender === 'male') {
        maleCount++;
      } else {
        femaleCount++;
      }
    });

    return {
      total: maleCount + femaleCount,
      maleCount,
      femaleCount,
      users
    };
  }

  static enumValidator(field: string, values: string[]) {
    return (value) => {
      if (!values.includes(value))
        throw new Error(
          `${field} must be one of the one of the following: ${values}`
        );
      return true;
    };
  }
}
