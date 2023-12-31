import userRepository from '../repository/user';
import { getHashedPassword } from '../util/hashPassword';
async function signIn(user) {
    const result = await userRepository.findByEmail(user.email);
    if (result) {
        return undefined;
    }
    user.password = await getHashedPassword(user.password);
    const queryResult = await userRepository.save(user);
    return queryResult;
}
const signinService = { signIn };
export default signinService;
