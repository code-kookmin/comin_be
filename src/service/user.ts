import { User, isUser } from '../domain/user';
import userRepository from '../repository/user';
import { getHashedPassword } from '../util/hashPassword';

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

async function findByEmail(email: string) {
  return await userRepository.findByEmail(email);
}

async function findPassword(email: string) {
  if (typeof email !== 'string') return undefined;
  const result: User | undefined = await userRepository.findByEmail(email);
  return result?.password;
}

async function signIn(user: User) {
  const result = await userRepository.findByEmail(user.email);
  if (result) {
    return undefined;
  }
  user.password = await getHashedPassword(user.password);
  const queryResult = await userRepository.save(user);
  return queryResult;
}

const userService = { editProfile, findPassword, findByEmail, signIn };

export default userService;
