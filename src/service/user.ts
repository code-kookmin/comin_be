import { User, isUser } from '../domain/user/user';
import { UserCreate } from '../domain/user/userCreate';
import userRepository from '../repository/user';
import { getHashedPassword } from '../util/hashPassword';

async function editProfile(sessionUserId: number, user: UserCreate) {
  const originProfile = await userRepository.findByEmail(user.email);
  if (originProfile && originProfile.id != sessionUserId) return undefined;
  const result = await userRepository.update(user);
  if (result === 0) return undefined;
  return result;
}

async function findByEmail(email: string) {
  return await userRepository.findByEmail(email);
}

async function findPassword(email: string) {
  if (typeof email !== 'string') return undefined;
  const result: User | undefined = await userRepository.findByEmail(email);
  return result?.password;
}

async function findAll() {
  const result = await userRepository.findAll();
  if (!result) return undefined;
  return result;
}

async function signIn(user: UserCreate) {
  const result = await userRepository.findByEmail(user.email);
  if (result) return undefined;
  user.password = await getHashedPassword(user.password);
  const queryResult = await userRepository.save(user);
  return queryResult;
}

const userService = { editProfile, findPassword, findByEmail, findAll, signIn };

export default userService;
