export interface CommuntiyCreate {
  userId: number;
  categoryId: number;
  title: string;
  content: string;
}

export function isCommunityCreate(obj: CommuntiyCreate) {
  if (typeof obj.categoryId !== 'number' || typeof obj.title !== 'string' || typeof obj.content !== 'string')
    return false;
  return true;
}
