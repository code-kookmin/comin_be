export interface Communtiy {
  userId: number;
  categoryId: number;
  title: string;
  content: string;
  like: number;
}

export function isCommuntiy(obj: Communtiy) {
  if (
    typeof obj.categoryId !== 'number' ||
    typeof obj.userId !== 'number' ||
    typeof obj.title !== 'string' ||
    typeof obj.content !== 'string' ||
    typeof obj.like !== 'number'
  )
    return false;
  return true;
}
