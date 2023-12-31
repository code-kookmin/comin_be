import userRepository from '../repository/user';
async function findPassword(email) {
    if (typeof email !== 'string')
        return undefined;
    const result = await userRepository.findByEmail(email);
    return result === null || result === void 0 ? void 0 : result.password;
}
const findPasswordService = { findPassword };
export default findPasswordService;
