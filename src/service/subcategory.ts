import subcategoryRepository from '../repository/subcategory';

export default class SubCategoryService {
  findAllByPage = async (pageSize: number, pageNumber: number) => {
    const result = subcategoryRepository.findAllByPage(pageSize, pageNumber);
    if (!result) return undefined;
    return result;
  };
}
