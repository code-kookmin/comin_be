import { Communtiy } from '../domain/community';
import categoryRepository from '../repository/category';
import communityRepository from '../repository/community';

async function save(community: Communtiy) {
  const result = await communityRepository.save(community);
  if (result === undefined) return undefined;
  return result;
}

async function findById(id: number) {
  const result = await communityRepository.findById(id);
  if (result === undefined) return undefined;
  return result;
}

async function findByUserId(userId: number) {
  const result = await communityRepository.findByUserId(userId);
  if (result === undefined) return undefined;
  return result;
}

async function deleteById(userId: number, id: number) {
  const community = await communityRepository.findById(id);
  if (userId !== community?.userId) return undefined;
  const result = await communityRepository.deleteById(id);
  if (result === undefined || result === 0) return undefined;
  return result;
}

async function update(id: number, userId: number, title: string, content: string) {
  const community = await communityRepository.findById(id);
  if (!community || community?.userId !== userId) return undefined;
  const result = await communityRepository.update(id, title, content);
  return result;
}

const communityService = { save, findById, deleteById, update, findByUserId };

export default communityService;
