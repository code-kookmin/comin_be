import categoryRepository from '../repository/category';
import communityRepository from '../repository/community';

async function save(title: string, category: string, content: string) {
  if (title === undefined || category === undefined || content === undefined)
    return undefined;
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

const communityService = { save };

export default communityService;
