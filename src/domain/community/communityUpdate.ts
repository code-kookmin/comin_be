export interface CommunityUpdate {
  id: number;
  userId?: number;
  title: string;
  content: string;
}

export function isCommunityUpdate(obj: CommunityUpdate) {
  if (typeof obj.id !== "number" || typeof obj.title !== "string" || typeof obj.content !== "string") return false;
  return true;
}
