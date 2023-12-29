export interface Category {
  name: string;
}

export function isCategory(obj: Category) {
  if (typeof obj.name !== 'string') return false;
  return true;
}
