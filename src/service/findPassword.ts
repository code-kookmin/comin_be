import userRepository from '../repository/user';
import { isUser, User } from '../domain/user';

async function findPassword(email: string) {
  if (typeof email !== 'string') return undefined;
  const result: User | undefined = await userRepository.findByEmail(email);
  return result?.password;
}

const findPasswordService = { findPassword };

export default findPasswordService;
