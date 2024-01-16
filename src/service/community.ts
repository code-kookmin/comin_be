import categoryRepository from '../repository/category';
import communityRepository from '../repository/community';

async function save(title: string, category: string, content: string, userId: number) {
  const categoryId = await categoryRepository.findCategoryIdByName(category);
  if (categoryId === undefined) return undefined;
  const result = await communityRepository.save(title, categoryId, content, userId);
  if (result === undefined) return undefined;
  return result;
}

async function findById(id: number) {
  const result = await communityRepository.findById(id);
  if (result === undefined) return undefined;
  return result;
}

async function deleteById(id: number) {
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

const communityService = { save, findById, deleteById, update };

export default communityService;
