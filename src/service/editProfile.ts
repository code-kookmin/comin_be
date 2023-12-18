import { User, isUser } from '../domain/user';
import userRepository from '../repository/user';

async function editProfile(user: User) {
  if (!isUser(user)) return undefined;
  try {
    const result = await userRepository.update(user);
    console.log(result);
    if (result === 0) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const editProfileService = { editProfile };

export default editProfileService;
