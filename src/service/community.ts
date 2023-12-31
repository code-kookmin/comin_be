import categoryRepository from '../repository/category';
import communityRepository from '../repository/community';

async function save(title: string, category: string, content: string) {
  try {
    const categoryId = await categoryRepository.findCategoryIdByName(category);
    if (categoryId === undefined) return undefined;
    const result = await communityRepository.save(title, categoryId, content);
    if (result === undefined) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function findById(id: number) {
  try {
    const result = await communityRepository.findById(id);
    if (result === undefined) return undefined;
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

async function deleteById(id: number) {
  try {
    const result = await communityRepository.deleteById(id);
    if (result === undefined || result === 0) return undefined;
    return result;
  } catch (err) {
    return undefined;
  }
}

async function update(id: number, title: string, content: string) {
  try {
    const result = await communityRepository.update(id, title, content);
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const communityService = { save, findById, deleteById, update };

export default communityService;
