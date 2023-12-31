export function isCategory(obj) {
    if (typeof obj.name !== 'string')
        return false;
    return true;
}
