import categoryRepository from '../repository/category';

export default class CategoryService {
  findAllByPage = async (pageSize: number, pageNumber: number) => {
    const result = categoryRepository.findAllByPage(pageSize, pageNumber);
    if (!result) return undefined;
    return result;
  };
}
