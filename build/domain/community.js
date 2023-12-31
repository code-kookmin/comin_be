export function isCommuntiy(obj) {
    if (typeof obj.categoryId !== 'number' ||
        typeof obj.userId !== 'number' ||
        typeof obj.title !== 'string' ||
        typeof obj.content !== 'string' ||
        typeof obj.like !== 'number')
        return false;
    return true;
}
