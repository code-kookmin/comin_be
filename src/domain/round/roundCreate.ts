export interface RoundCreate {
  name: string;
}

export function isRoundCreate(obj: RoundCreate) {
  if (typeof obj.name === 'string') return true;
  return false;
}
