import bcrypt from 'bcrypt';
export async function getHashedPassword(password) {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
