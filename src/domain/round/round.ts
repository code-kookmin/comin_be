export interface Round {
  id: number;
  name: string;
  startDate: string;
}

export function isRound(obj: Round) {
  if (typeof obj.id === 'number' && typeof obj.name === 'string' && typeof obj.startDate === 'string') return true;
  return false;
}
