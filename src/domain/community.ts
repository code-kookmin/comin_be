export interface Communtiy {
  user_id: number;
  category_id: number;
  title: string;
  content: string;
  like: number;
}

export function isCommuntiy(obj: Communtiy) {
  if (
    typeof obj.category_id !== 'number' ||
    typeof obj.user_id !== 'number' ||
    typeof obj.title !== 'string' ||
    typeof obj.content !== 'string' ||
    typeof obj.like !== 'number'
  )
    return false;
  return true;
}
