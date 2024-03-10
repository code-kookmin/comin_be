export interface CommuntiyCreate {
  userId: number;
  subcategoryId: number;
  title: string;
  content: string;
}

export function isCommunityCreate(obj: CommuntiyCreate) {
  if (typeof obj.subcategoryId !== "number" || typeof obj.title !== "string" || typeof obj.content !== "string") return false;
  return true;
}
