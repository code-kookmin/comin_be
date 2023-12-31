export function isUser(obj) {
    if (typeof obj.email !== 'string' ||
        typeof obj.password !== 'string' ||
        typeof obj.name !== 'string' ||
        typeof obj.birthday !== 'string' ||
        typeof obj.githubName !== 'string' ||
        typeof obj.baekjoonName !== 'string') {
        return false;
    }
    return true;
}
