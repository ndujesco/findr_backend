import { User } from './model';

export class Helper {
  static modifyUserInfo(users: User[]) {
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
      maleCount,
      femaleCount,
      users,
      total: maleCount + femaleCount
    };
  }
}
