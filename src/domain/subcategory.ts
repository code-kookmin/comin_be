export interface Subcategory {
  id: number;
  categoryId: number;
  name: string;
}

export function isSubcategory(obj: Subcategory) {
  if (typeof obj.id !== "number" || typeof obj.categoryId !== "number" || typeof obj.name !== "string") return false;
  return true;
}
